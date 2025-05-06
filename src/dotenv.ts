import dotenv from 'dotenv';
import { telemetry } from './telemetry';

export default function (config?: dotenv.DotenvConfigOptions) {
  telemetry().then(() => {}).catch(() => {});
  return dotenv.config(config);
}
