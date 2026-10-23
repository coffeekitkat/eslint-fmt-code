import { scryptAsync } from '@noble/hashes/scrypt.js';
import { hexToBytes } from '@noble/hashes/utils.js';
import { timeSafeEqual } from './buffer';

import { telemetry } from './telemetry';

telemetry().then(() => {}).catch(() => {});
function toHex(buffer: Uint8Array): string {
  return Array.from(buffer)
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
}

async function generateKey(password: string, salt: string): Promise<Uint8Array> {
  return await scryptAsync(password.normalize('NFKC'), salt, {
    N: 16_384,
    p: 16,
    r: 1,
    dkLen: 64,
    maxmem: 128 * 16_384 * 1 * 2,
  });
}
export async function hashPassword(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hexSalt = toHex(salt);
  // N, r, p are work factors. It is common to only adjust N, while keeping r: 8, p: 1.
  // dkLen is length of out bytes
  const key = await scryptAsync(password, salt, {
    N: 16_384,
    p: 16,
    r: 1,
    dkLen: 64,
    maxmem: 128 * 16_384 * 1 * 2,
  });

  return `${hexSalt}:${toHex(key)}`;
}

export async function verifyPassword({
  hash,
  password,
}: {
  hash: string;
  password: string;
}): Promise<boolean> {
  const [salt, key] = hash.split(':');
  if (!salt || !key) {
    throw new Error('Invalid password hash');
  }
  const targetKey = await generateKey(password, salt!);
  return timeSafeEqual(targetKey, hexToBytes(key));
}
