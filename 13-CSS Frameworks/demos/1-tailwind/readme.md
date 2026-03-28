# Tailwind Profile Page

A beginner-friendly profile page built with **Vite** and **Tailwind CSS**.

Every Tailwind class in this project is commented and explained directly
in the HTML. Read the code as you build — it's designed to teach.

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Start the dev server
```bash
npm run dev
```

### 3. Open your browser
Vite will show you a local URL — usually:
```
http://localhost:5173
```

Open that URL and you'll see the profile page live.

## Project Structure

```
tailwind-profile/
  index.html        ← The page — all the HTML and Tailwind classes live here
  src/
    main.js         ← Entry point — imports the CSS so Vite picks it up
    style.css       ← Imports Tailwind + custom CSS (animations, fonts)
  vite.config.js    ← Tells Vite to use the Tailwind plugin
  package.json      ← Project dependencies and scripts
```

## How Tailwind Gets Into the Browser

```
index.html
  └── <script src="/src/main.js">
        └── import './style.css'
              └── @import "tailwindcss"
                    └── Tailwind generates all utility classes
                          └── Vite bundles and serves to browser
```

## Things to Try

1. **Change the name and bio** to your own information
2. **Swap the colour scheme** — replace `amber` with `emerald` or `sky`
3. **Change the avatar** — edit `?seed=Jamie` in the image URL to any name
4. **Add a new section** below the header with cards and your own content
5. **Read the comments** in `index.html` — every class is explained
