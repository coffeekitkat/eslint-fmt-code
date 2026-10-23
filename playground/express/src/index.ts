import process from 'node:process';
import express from 'express';
import { getSystemInfo } from 'kz-js-utils/dashboard-tools';
import { getMonitoringSnapshot } from 'kz-js-utils/monitoring';
import { DEFAULT_PORT } from './constants';

const app = express();

// Static host info (hardware, OS). Fetch once.
app.get('/api/system', async (_req, res, next): Promise<void> => {
  try {
    res.json(await getSystemInfo());
  }
  catch (error) {
    next(error);
  }
});

// Live host stats (cpu, memory, disk, network, uptime). Safe to poll.
app.get('/api/monitoring', async (_req, res, next): Promise<void> => {
  try {
    res.json(await getMonitoringSnapshot());
  }
  catch (error) {
    next(error);
  }
});

const port = Number(process.env.PORT ?? DEFAULT_PORT);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`playground-express listening on http://localhost:${port}`);
});
