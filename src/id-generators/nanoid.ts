import { customAlphabet } from 'nanoid';

export function generateRandomString(length: number = 16): string {
  const n = customAlphabet(
    '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
    length,
  );
  return n();
}

export function generateCustomRandomString({
  length = 32,
  alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
}: { length?: number; alphabet?: string } = {}): string {
  const n = customAlphabet(alphabet, length);
  return n();
}
