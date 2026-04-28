// vite.config.js
//
// Vite + Vitest configuration for the integration testing project.
//
// Same setup as Project 02 — jsdom environment so React can render,
// plus a setupFiles path that starts the MSW mock server.

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
