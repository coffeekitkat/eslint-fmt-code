import { describe, expect, it } from 'vitest';
import { hashPassword, verifyPassword } from '../src/password';

describe('password', () => {
  it('verifies the correct password', async () => {
    const hash = await hashPassword('hunter2');
    expect(await verifyPassword({ hash, password: 'hunter2' })).toBe(true);
  });

  it('rejects a wrong password', async () => {
    const hash = await hashPassword('hunter2');
    expect(await verifyPassword({ hash, password: 'hunter3' })).toBe(false);
  });

  it('salts every hash', async () => {
    expect(await hashPassword('same')).not.toBe(await hashPassword('same'));
  });

  it('treats NFKC-equivalent passwords as equal', async () => {
    // "é" precomposed vs "e" + combining acute
    const hash = await hashPassword('café');
    expect(await verifyPassword({ hash, password: 'café' })).toBe(true);
  });

  it('throws on a malformed hash', async () => {
    await expect(verifyPassword({ hash: 'nocolon', password: 'x' })).rejects.toThrow('Invalid password hash');
  });
});
