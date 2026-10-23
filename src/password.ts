import { scryptAsync } from '@noble/hashes/scrypt.js';
import { bytesToHex, hexToBytes } from '@noble/hashes/utils.js';
import { timeSafeEqual } from './buffer';

import { telemetry } from './telemetry';

telemetry().then(() => {}).catch(() => {});
// N, r, p are work factors. It is common to only adjust N, while keeping r: 8, p: 1.
// dkLen is length of out bytes
// Single derivation path so hash and verify cannot drift apart (salt encoding, normalization).
async function deriveKey(password: string, salt: Uint8Array): Promise<Uint8Array> {
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
  const key = await deriveKey(password, salt);

  return `${bytesToHex(salt)}:${bytesToHex(key)}`;
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
  const targetKey = await deriveKey(password, hexToBytes(salt));
  return timeSafeEqual(targetKey, hexToBytes(key));
}
