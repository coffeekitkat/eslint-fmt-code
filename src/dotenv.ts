import * as dotenv from 'dotenv';
import { telemetry } from './telemetry';

telemetry().then(() => {}).catch(() => {});
export { dotenv as default };
