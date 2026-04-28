// vite.config.js
//
// Vite + Vitest configuration for the component testing project.
//
// Key settings:
//   environment: "jsdom"  →  simulates a browser DOM so React components can render
//   globals: true         →  use describe/it/expect without importing each time
//   setupFiles            →  runs our setup file before every test

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/setup.js",
  },
});
