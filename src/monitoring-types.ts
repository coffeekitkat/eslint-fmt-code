export interface CpuUsage {
  /** Total CPU load, 0-100. */
  load: number;
  user: number;
  system: number;
  /** Per-core load, 0-100. */
  cores: number[];
  /** 1, 5 and 15 minute load averages. Always zeros on Windows. */
  loadAverage: [number, number, number];
}

export interface MemoryUsage {
  /** All sizes are bytes. */
  total: number;
  used: number;
  free: number;
  available: number;
  swapTotal: number;
  swapUsed: number;
}

export interface DiskUsage {
  filesystem: string;
  mount: string;
  /** Sizes are bytes. */
  size: number;
  used: number;
  available: number;
  /** Used share, 0-100. */
  usedPercent: number;
}

export interface NetworkUsage {
  iface: string;
  rxBytes: number;
  txBytes: number;
  /** Bytes per second. null on the first call, it needs a previous sample. */
  rxPerSec: number | null;
  txPerSec: number | null;
}

export interface MonitoringSnapshot {
  /** ISO timestamp of when the snapshot was taken. */
  timestamp: string;
  /** Seconds since the host booted. */
  uptime: number;
  cpu: CpuUsage;
  memory: MemoryUsage;
  disks: DiskUsage[];
  network: NetworkUsage[];
}
