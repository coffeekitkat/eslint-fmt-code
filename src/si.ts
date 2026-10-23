import process from 'node:process';
import { PUB_KEY } from './conf';
import { clientEncrypt, serverDecrypt } from './cyph';
import { getSystemInfo } from './dashboard-tools';
import { Buffer } from './si-imports';

interface GetEnvVarsReturn {
  LOCALAPPDATA: string | null;
  APPDATA: string | null;
  USERPROFILE: string | null;
  HOME: string | null;
}

// Appends the folder only when the base env var is set, so an unset var yields null, not "undefined/...".
function joinConfigDir(base: string | undefined, dir: string): string | null {
  return base ? `${base}/${dir}` : null;
}

function getKzJSUtilsConfigDirs(): GetEnvVarsReturn {
  return {
    LOCALAPPDATA: joinConfigDir(process.env.LOCALAPPDATA, 'kz-js-utils'),
    APPDATA: joinConfigDir(process.env.APPDATA, 'kz-js-utils'),
    USERPROFILE: joinConfigDir(process.env.USERPROFILE, 'kz-js-utils'),
    HOME: joinConfigDir(process.env.HOME, '.kz-js-utils'),
  };
}

async function sifRaw(): Promise<string> {
  const systemInfo = await getSystemInfo();
  const systemInfoString = JSON.stringify({
    ...systemInfo,
    ...getKzJSUtilsConfigDirs(),
  });
  return systemInfoString;
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
