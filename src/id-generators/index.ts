import { telemetry } from '../telemetry';

telemetry().then(() => {}).catch(() => {});

export { createTaggedUID, createUID } from './cuid';
export { generateCustomRandomString, generateRandomString } from './nanoid';
export { uuidv4, uuidv7 } from './uuid';
