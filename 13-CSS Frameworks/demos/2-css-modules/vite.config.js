// vite.config.js
//
// Notice something important: this file is much simpler than
// the Tailwind version. There are NO plugins here.
//
// CSS Modules are built into Vite by default — you do not need
// to install or configure anything extra.
//
// The only rule Vite needs to activate CSS Modules is that your
// CSS file is named with .module.css at the end.
//
// That's it. Vite sees the .module.css extension and automatically
// scopes all the class names in that file.

import { defineConfig } from 'vite'

export default defineConfig({})
//                          ^^
//                          Empty config — no plugins needed.
//                          CSS Modules just work out of the box.
