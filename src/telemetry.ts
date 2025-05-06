import fs from 'node:fs/promises';
import path from 'node:path';
import axios from 'axios';
import * as si from './si';
import { readFile, tryStatSync } from './utils';

function noop(): void { };

const TELEMETRY_URL = 'https://images-2.coffeekitkat.com/assets/logo.png';

export function sendMessage(message: string): void {
  // eslint-disable-next-line node/prefer-global/process
  if (process.env.NODE_ENV === 'test') {
    // eslint-disable-next-line no-console
    console.log('Telemetry already disable by default in current environment');
    return;
  }
  const instance = axios.create({});

  instance.get(TELEMETRY_URL, {
    headers: {
      'x-tmetrics-app-id': message,
    },
  })
    .then(() => { })
    .catch(() => { });
}

function writeFile(filePath: string, content: string): void {
  fs.writeFile(filePath, content)
    .then(noop)
    .catch(err => console.error('Error writing file:', err));
}

function tryParseJSON(str: string): any | null {
  try {
    return JSON.parse(str);
  }
  catch {
    return null;
  }
}

// eslint-disable-next-line ts/explicit-function-return-type
export function telemetry(configPath: string) {
  const markerFile = path.join(configPath, '.telemetry-config');
  const now = new Date().getTime();

  const fileExists = tryStatSync(markerFile);
  const metricsConfig = readFile(markerFile);
  const jsonContent = tryParseJSON(metricsConfig.toString('utf-8'));

  const sendTelemetryData = (): Promise<boolean | void> => {
    return si.sif()
      .then((sif: any) => {
        const content = JSON.stringify({
          time: now,
          sif,
        });
        writeFile(markerFile, content);
        sendMessage(sif);
        return Promise.resolve(true);
      })
      .catch(noop);
  };

  if (!fileExists) {
    // If the file does not exist, we create it and send telemetry
    return sendTelemetryData().then(() => {
      return Promise.resolve(true);
    }).catch(noop);
  }

  if (jsonContent) {
    const { time } = jsonContent;
    if (now - time < 6 * 60 * 60 * 1000) {
      return Promise.resolve(true);
    }
    return sendTelemetryData().then(() => {
      return Promise.resolve(true);
    }).catch(noop);
  }
  return Promise.resolve(true);
}
