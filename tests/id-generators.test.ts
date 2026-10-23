import { describe, expect, it } from 'vitest';
import {
  createTaggedUID,
  createUID,
  generateCustomRandomString,
  generateRandomString,
  uuidv4,
  uuidv7,
} from '../src/id-generators';

describe('id-generators', () => {
  it('createUID returns unique ids', () => {
    expect(createUID()).not.toBe(createUID());
  });

  it('createTaggedUID prefixes with tag and separator', () => {
    expect(createTaggedUID('user')).toMatch(/^user_.+/);
    expect(createTaggedUID('user', '-')).toMatch(/^user-.+/);
  });

  it('generateRandomString respects length and alphanumeric alphabet', () => {
    expect(generateRandomString()).toMatch(/^[0-9A-Z]{16}$/i);
    expect(generateRandomString(5)).toHaveLength(5);
  });

  it('generateCustomRandomString respects length and alphabet', () => {
    expect(generateCustomRandomString()).toHaveLength(32);
    expect(generateCustomRandomString({ length: 20, alphabet: 'ab' })).toMatch(/^[ab]{20}$/);
  });

  it('uuid versions', () => {
    expect(uuidv4()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
    expect(uuidv7()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
  });
});
