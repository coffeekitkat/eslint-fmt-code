import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Importing any src module fires telemetry(); keep it off in tests.
    env: { SENTINEL_OPT_OUT_TELEMETRY: 'true' },
  },
});
