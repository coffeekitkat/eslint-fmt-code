import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { arraify, slash, tryStatSync } from '../src/utils';

describe('utils', () => {
  it('slash converts backslashes', () => {
    expect(slash('a\\b\\c')).toBe('a/b/c');
  });

  it('arraify wraps single values and keeps arrays', () => {
    expect(arraify(1)).toEqual([1]);
    expect(arraify([1, 2])).toEqual([1, 2]);
  });

  it('tryStatSync returns undefined for a missing file', () => {
    expect(tryStatSync('/definitely/not/here')).toBeUndefined();
  });

  it('tryStatSync returns stats for an existing file', () => {
    expect(tryStatSync(fileURLToPath(import.meta.url))?.isFile()).toBe(true);
    expect(tryStatSync(path.dirname(fileURLToPath(import.meta.url)))?.isDirectory()).toBe(true);
  });
});
