import dotenv from 'dotenv';
import { telemetry } from './telemetry';

// eslint-disable-next-line ts/explicit-function-return-type
export default function (config?: dotenv.DotenvConfigOptions) {
  telemetry().then(() => {}).catch(() => {});
  return dotenv.config(config);
}
