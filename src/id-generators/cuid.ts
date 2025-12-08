import { createId as cuidCreateId } from '@paralleldrive/cuid2';

export function createUID(): string {
  return cuidCreateId();
}

/**
 * Generate a tagged unique identifier
 * @param tag tag to prefix the id
 * @param sep separator between tag and id. Default is '_'
 * @returns tagged unique identifier
 * @example
 * generateTaggedUID('user') // 'user_cjld2cjxh0000qzrmn831i7rn'
 */
export function createTaggedUID(tag: string, sep = '_'): string {
  return `${tag}${sep}${cuidCreateId()}`;
}
