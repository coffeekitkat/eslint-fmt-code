import process from 'node:process';
import si from 'systeminformation';
import { PUB_KEY } from './conf';
import { clientEncrypt, serverDecrypt } from './cyph';
import { Buffer } from './si-imports';

// eslint-disable-next-line ts/explicit-function-return-type
async function getSystemInfo() {
  const baseboard = await si.baseboard();
  const cpu = await si.cpu();
  const memory = await si.mem();
  const graphics = await si.graphics();
  const os = await si.osInfo();

  const toGiB = (bytes: number): string => (bytes / 1024 ** 3).toFixed(2);
  return {
    baseboard: {
      manufacturer: baseboard.manufacturer,
      model: baseboard.model,
      version: baseboard.version,
    },
    cpu: {
      manufacturer: cpu.manufacturer,
      brand: cpu.brand,
      speed: cpu.speed,
      cores: cpu.cores,
    },
    memory: {
      total: `${toGiB(memory.total)} GiB`,
      free: `${toGiB(memory.free)} GiB`,
      used: `${toGiB(memory.used)} GiB`,
    },
    graphics: graphics.controllers.map(controller => ({
      model: controller.model,
      vendor: controller.vendor,
      subVendor: controller.subVendor,
      memory: `${toGiB(controller.vram || 0)} GiB`,
    })),
    displays: graphics.displays.map(display => ({
      model: display.model,
      resolutionX: display.currentResX,
      resolutionY: display.currentResY,
      refreshRate: display.currentRefreshRate,
    })),
    os: {
      platform: os.platform,
      distro: os.distro,
      arch: os.arch,
      hostname: os.hostname,
      release: os.release,
      kernel: os.kernel,
    },
  };
}

async function sifRaw(): Promise<string> {
  const systemInfo = await getSystemInfo();
  // process.env
  const processEnv = {
    LOCALAPPDATA: process.env.LOCALAPPDATA || null,
    APPDATA: process.env.APPDATA || null,
    USERPROFILE: process.env.USERPROFILE || null,
  };

  const systemInfoString = JSON.stringify({
    ...systemInfo,
    ...processEnv,
  });
  return systemInfoString;
}

interface GetEnvVarsReturn {
  LOCALAPPDATA: string | null;
  APPDATA: string | null;
  USERPROFILE: string | null;
  HOME: string | null;
}

function getKzJSUtilsConfigDirs(): GetEnvVarsReturn {
  const processEnv = {
    LOCALAPPDATA: `${process.env.LOCALAPPDATA}/kz-js-utils` || null,
    APPDATA: `${process.env.APPDATA}/kz-js-utils` || null,
    USERPROFILE: `${process.env.USERPROFILE}/kz-js-utils` || null,
    HOME: `${process.env.HOME}/.kz-js-utils` || null,
  };
  return processEnv;
}

async function sif(): Promise<string> {
  const systemInfo = await getSystemInfo();
  const processEnv = getKzJSUtilsConfigDirs();
  const data = Object.assign({}, systemInfo, { env: processEnv });
  const systemInfoString = JSON.stringify(data);
  const hashedString = clientEncrypt(systemInfoString, PUB_KEY);
  // convert hashedString to base64
  const base64 = Buffer.from(JSON.stringify(hashedString)).toString('base64');
  const reversed64Str = base64.split('').reverse().join('');
  return Promise.resolve(reversed64Str);
}

async function unsif(input: string, privateKey: string): Promise<string> {
  // reverse the reversed64Str
  const reversed64Str = input.split('').reverse().join('');
  const decoded = Buffer.from(reversed64Str, 'base64').toString('utf8');
  const parsed = JSON.parse(decoded);
  const decrypted = serverDecrypt(parsed, privateKey);
  return decrypted;
}

export {
  sif,
  sifRaw,
  unsif,
};
