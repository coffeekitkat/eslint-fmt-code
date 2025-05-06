/* eslint-disable node/prefer-global/process */
/* eslint-disable ts/explicit-function-return-type */
import fs from 'node:fs';
import path from 'node:path';

export const isWindows = typeof process !== 'undefined' && process.platform === 'win32';

export const windowsSlashRE = /\\/g;

export function readFile(filePath: string) {
  if (!tryStatSync(filePath)?.isFile()) {
    return '';
  }

  return fs.readFileSync(filePath);
}

export function slash(p: string): string {
  return p.replace(windowsSlashRE, '/');
}

export function normalizePath(id: string) {
  return path.posix.normalize(isWindows ? slash(id) : id);
}

export function arraify<T>(target: T | T[]): T[] {
  return Array.isArray(target) ? target : [target];
}

export function tryStatSync(file: string): fs.Stats | undefined {
  try {
    // The "throwIfNoEntry" is a performance optimization for cases where the file does not exist
    return fs.statSync(file, { throwIfNoEntry: false });
  }
  catch {
    // Ignore errors
  }
}
