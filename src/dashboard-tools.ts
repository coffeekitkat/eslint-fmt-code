import si from 'systeminformation';

// Plain (unencrypted) system snapshot. Used by internal apps for dashboards and monitoring.
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

export { getSystemInfo };
