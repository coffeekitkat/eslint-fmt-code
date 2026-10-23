import type {
  CpuUsage,
  DiskUsage,
  MemoryUsage,
  MonitoringSnapshot,
  NetworkUsage,
} from './monitoring-types';
import os from 'node:os';
import si from 'systeminformation';

// Live, frequently polled host stats for dashboards. Static hardware info stays in dashboard-tools.

const round = (value: number): number => Math.round(value * 100) / 100;

async function getCpuUsage(): Promise<CpuUsage> {
  const load = await si.currentLoad();
  const [one, five, fifteen] = os.loadavg();
  return {
    load: round(load.currentLoad),
    user: round(load.currentLoadUser),
    system: round(load.currentLoadSystem),
    cores: load.cpus.map(core => round(core.load)),
    loadAverage: [round(one), round(five), round(fifteen)],
  };
}

async function getMemoryUsage(): Promise<MemoryUsage> {
  const mem = await si.mem();
  return {
    total: mem.total,
    used: mem.used,
    free: mem.free,
    available: mem.available,
    swapTotal: mem.swaptotal,
    swapUsed: mem.swapused,
  };
}

async function getDiskUsage(): Promise<DiskUsage[]> {
  const disks = await si.fsSize();
  return disks.map(disk => ({
    filesystem: disk.fs,
    mount: disk.mount,
    size: disk.size,
    used: disk.used,
    available: disk.available,
    usedPercent: round(disk.use),
  }));
}

// Per-second rates come from the delta since the previous call, so the first call returns null rates.
async function getNetworkUsage(): Promise<NetworkUsage[]> {
  const stats = await si.networkStats();
  return stats.map(iface => ({
    iface: iface.iface,
    rxBytes: iface.rx_bytes,
    txBytes: iface.tx_bytes,
    rxPerSec: iface.rx_sec == null ? null : round(iface.rx_sec),
    txPerSec: iface.tx_sec == null ? null : round(iface.tx_sec),
  }));
}

function getUptime(): number {
  return Math.floor(si.time().uptime);
}

async function getMonitoringSnapshot(): Promise<MonitoringSnapshot> {
  const [cpu, memory, disks, network] = await Promise.all([
    getCpuUsage(),
    getMemoryUsage(),
    getDiskUsage(),
    getNetworkUsage(),
  ]);
  return {
    timestamp: new Date().toISOString(),
    uptime: getUptime(),
    cpu,
    memory,
    disks,
    network,
  };
}

export {
  getCpuUsage,
  getDiskUsage,
  getMemoryUsage,
  getMonitoringSnapshot,
  getNetworkUsage,
  getUptime,
};
