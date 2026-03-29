// vitest.config.js
//
// Vitest configuration.
// globals: true  →  use describe/it/expect without importing them every time.

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true,
  },
});
