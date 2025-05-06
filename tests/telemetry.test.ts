import fs from 'node:fs/promises';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { telemetry } from '../src/telemetry';
import { tryStatSync } from '../src/utils';

describe('telemetry', () => {
  it('send', async () => {
    const configDir = path.join('.tmp', '.telemetry-config');

    await fs.mkdir(path.join(__dirname, '.tmp'));
    const resolvedPath = path.resolve(__dirname, configDir);
    telemetry(resolvedPath);

    const stat = tryStatSync(resolvedPath);
    expect(stat).not.toEqual('');
  });
});
