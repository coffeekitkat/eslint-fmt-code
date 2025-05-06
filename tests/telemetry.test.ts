import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { telemetry } from '../src/telemetry';
import { tryStatSync } from '../src/utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('telemetry', () => {
  it('send', async () => {
    const configDir = path.join(__dirname, '.tmp');
    if (!existsSync(configDir)) {
      await fs.mkdir(configDir);
    }

    return telemetry(configDir).then(() => {
      const stat = tryStatSync(path.join(configDir, '.telemetry-config'));
      const metricFileExists = existsSync(path.join(configDir, '.telemetry-config'));

      expect(stat).not.toBeUndefined();
      expect(metricFileExists).toBe(true);
    });
  });
});
