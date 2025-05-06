import { existsSync } from 'node:fs';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { telemetry } from '../src/telemetry';
import { readFile, tryStatSync, isWindows } from '../src/utils';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe('telemetry', () => {
  it('send', async () => {
    const configDir = path.join(__dirname, '.tmp');
    if (!existsSync(configDir)) {
      await fs.mkdir(configDir);
    }

    if(process.env.NODE_ENV === 'test' && isWindows) {
      console.warn('Fuck Windows');
      return Promise.resolve(true);
    }

    return telemetry(configDir).then(() => {
      const stat = tryStatSync(path.join(configDir, '.telemetry-config'));

      const metricFileExists = existsSync(path.join(configDir, '.telemetry-config'));

      if (metricFileExists) {
        const metricContent = readFile(path.join(configDir, '.telemetry-config'));
        console.warn('metricContent', metricContent.toString('utf-8'));
      }

      expect(stat).not.toBeUndefined();
      expect(metricFileExists).toBe(true);
    });
  });
});
