import { describe, expect, it } from 'vitest';
import { timeSafeEqual } from '../src/buffer';

describe('timeSafeEqual', () => {
  it('matches equal strings', () => {
    expect(timeSafeEqual('abc', 'abc')).toBe(true);
  });

  it('matches a string against equal bytes', () => {
    expect(timeSafeEqual('abc', new TextEncoder().encode('abc'))).toBe(true);
  });

  it('rejects different content', () => {
    expect(timeSafeEqual('abc', 'abd')).toBe(false);
  });

  it('rejects different lengths, including a zero-padded prefix', () => {
    expect(timeSafeEqual(new Uint8Array([1, 2]), new Uint8Array([1, 2, 0]))).toBe(false);
  });
});
