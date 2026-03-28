// vite.config.js
//
// This is where we tell Vite which plugins to use.
// We're using the official Tailwind CSS plugin for Vite.
//
// This is what allows us to write:
//   import './style.css'
// in main.js and have Tailwind's utility classes available
// throughout the entire project automatically.

import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(), // ← this one line wires up all of Tailwind
  ],
})
