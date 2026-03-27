# What Does Vite Do?

Vite (pronounced **"veet"**) is a **build tool and dev server** that helps you write modern JavaScript, CSS, and HTML — and then turns it into something the browser can actually run efficiently.

> **New to this?** If you've only worked with plain HTML, CSS, and JavaScript files so far, start here. This guide explains *why* a tool like Vite exists, *when* you actually need it, and *when you don't*.

## Do You Even Need Vite Yet?

**Short answer: not always.**

If you're building something like this, you probably don't need Vite at all:

```text
index.html
styles.css
script.js
```

Open `index.html` in a browser, it works, you're done. That's perfectly valid for:

- A simple personal webpage or portfolio
- A homework assignment or practice project
- A static page with a bit of interactivity

**Vite starts to matter when your project grows** — when you start pulling in third-party libraries, splitting code across multiple files, or building something more like an app than a page.

## The Wall You'll Eventually Hit

You've been building with plain HTML, CSS, and JavaScript. Things are working fine. Then you want to add a third-party library — maybe Bootstrap for styling, or Lodash for utility functions. You find it on npm and read:

```bash
npm install bootstrap
```

You run it. A folder called `node_modules` appears. Great. Now how do you actually use it in your HTML?

You try this in your JavaScript:

```js
import "bootstrap/dist/css/bootstrap.min.css";
```

You open the browser and see this in the console:

```
Uncaught TypeError: Failed to resolve module specifier "bootstrap/dist/css/bootstrap.min.css".
Relative references must start with either "/", "./", or "../".
```

>**That error is the wall.** The browser has no idea what `"bootstrap"` means. It only understands file paths like `./styles.css` or `https://example.com/bootstrap.css`. It doesn't know anything about your `node_modules` folder.

## Why the Browser Can't Do This Alone

When you link a script in your HTML like this:

```html
<script src="script.js"></script>
```

The browser fetches that one file and runs it. Simple.

But modern JavaScript uses a system called **ES Modules** where files can import from each other:

```js
// main.js
import { formatDate } from "./utils.js";
import confetti from "canvas-confetti";
```

The first import (`./utils.js`) works fine — the browser can follow that relative path. The second one (`"canvas-confetti"`) breaks immediately, because the browser doesn't know where to look for it.

The browser also can't:

- Look inside `node_modules` for you
- Bundle dozens of files into fewer requests
- Strip out unused code to reduce file size
- Automatically refresh when you save changes

**Vite does all of that.** It sits between your source code and the browser, translating modern JavaScript into something browsers understand.

## When You DON'T Need Vite

Before going further, here are situations where Vite would be overkill:

| Situation | Use Vite? |
|---|---|
| Simple static webpage | ❌ No — just open the HTML file |
| Portfolio site with a little JS | ❌ No — maybe a CDN link for any library |
| Learning JavaScript fundamentals | ❌ No — keep it simple |
| Multi-file app using npm packages | ✅ Yes |
| React, Vue, or Svelte app | ✅ Yes |
| Anything going to production with optimization | ✅ Yes |

For quick library use without npm, you can use a **CDN link** in your HTML instead:

```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

This works fine for simple or personal projects, but is very limited for production.


## Vite Has Two Big Jobs

When your project does need Vite, it really does **two main things**:

1. Runs a **dev server** for local development
2. Produces a **production build** ready to deploy

### **Job #1 – Dev Server (For Local Development)**

When you run:

```bash
npm run dev
```

Vite starts a **local dev server**, usually at:

```
http://localhost:5173/
```

This dev server:

- Serves your `index.html`
- Processes your JavaScript and CSS imports
- Resolves files from `src/` and `node_modules/`
- Provides **HMR (Hot Module Replacement)**

#### Understanding ES Module Imports

In modern JavaScript, you might write:

```js
// main.js
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
```

The browser **cannot** understand these imports on its own, especially the ones that don't start with `./` or `../`.

These:

```js
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
```

are called **bare module specifiers** (because they don't start with a path).
The browser doesn't know where `bootstrap` lives — but Vite does.

Vite:

- Finds `bootstrap` in `node_modules`
- Rewrites the paths to actual files
- Serves them in a way the browser understands

So, thanks to Vite, you can write clean modern imports without worrying about where the files physically live.

#### Hot Module Replacement (HMR)

Without Vite, you'd have to:

- Save a file
- Manually refresh the browser
- Scroll back to where you were

With Vite's dev server and HMR:

- You save a file
- The browser automatically updates
- Only the changed modules reload (not always the whole page)

This makes the feedback loop **fast** and helps you iterate quickly.

#### Dev vs. Production Code

In dev mode, Vite focuses on:

- Speed
- Fast rebuilds
- Quick reloads

The code is **not yet optimized** for deployment — just convenient for editing and testing.

The optimization happens in the **build step**.

### **Job #2 – Production Build (For Deployment)**

When you run:

```bash
npm run build
```

Vite creates a **production-ready version** of your app in a folder called `dist/`.

Example:

```text
dist/
  index.html
  assets/
    main-abc123.js
    style-def456.css
```

#### What Happens During the Build?

Vite (under the hood, using a tool called Rollup):

- Reads your source files in `src/`
- Follows your imports (`import` / `export`)
- Bundles JavaScript into fewer files
- Extracts and bundles CSS
- Minifies the code (removes spaces, shortens names)
- Removes dead/unreachable code (**tree-shaking** — code you imported but never used gets removed automatically)
- Renames files with hashes (e.g. `main-abc123.js`) for **cache-busting** — so browsers always load the newest version

The result is:

- Smaller files
- Fewer HTTP requests
- Faster load times
- Code that works reliably across browsers

#### What You Deploy

You **do not** deploy your entire project (with `src`, `node_modules`, etc.).

You deploy **only** what's inside `dist/`.

For example, to deploy to GitHub Pages, Netlify, or another static host, you upload the `dist/` folder contents.

## What Problems Does Vite Solve Compared to "Just HTML & JS"?

### Without Vite (or a bundler):

- You can't directly use imports from `node_modules`
- You have to manually manage `<script>` tags in the correct order
- Large apps become messy with many scripts and CSS files
- No automatic bundling or minification
- No dev server with hot reload
- More manual work for production builds

### With Vite:

- You can write modern JS with imports and exports
- You can import from `node_modules` with simple statements
- You get a fast dev server
- You get automatic bundling, minification, and optimizations
- You get an easy build step for deployment

## Where Does Vite Fit in a Fullstack or Frontend Workflow?

Vite is typically used for the **frontend** part of your app. For example:

- React app
- Vue app
- Vanilla JS SPA
- Component-based UI

It can be used in:

- **Frontend-only projects**, deployed as static files
- **Fullstack projects**, where the backend is an API (Node/Express, Django, Rails, etc.) and the Vite-built frontend talks to it

In both cases, the job of Vite is the same:

> Take your modern frontend code and output browser-ready assets.


## A Real Working Example

Let's build a small card-drawing app using the [Deck of Cards API](https://deckofcardsapi.com/) — it's free, needs no API key, and has a natural two-step flow that makes for a realistic fetch example. We'll import `axios` from npm to make the requests, which is something you simply can't do without a tool like Vite.

### What We're Building

A single webpage that:
- On load, calls the API to create a new shuffled deck
- Has a "Draw a Card" button
- Displays the drawn card's value and suit each time you click

### Step 1: Create the Project

In your terminal, run:

```bash
npm create vite@latest card-draw -- --template vanilla
cd card-draw
npm install
```

This creates a new Vite project using plain JavaScript (no framework). Your folder structure will look like:

```text
card-draw/
  index.html
  src/
    main.js
    style.css
  package.json
  vite.config.js
```

### Step 2: Install axios

This is the moment plain HTML/JS would break. We're going to install a real npm package and import it directly in our code:

```bash
npm install axios
```

Vite will handle resolving it from `node_modules` automatically.

### Step 3: Update index.html

Replace the contents of `index.html` with:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Card Draw</title>
    <link rel="stylesheet" href="/src/style.css" />
  </head>
  <body>
    <div id="app">
      <h1>🃏 Card Draw</h1>
      <p id="status">Shuffling deck...</p>
      <button id="draw-btn" disabled>Draw a Card</button>
      <div id="card-output"></div>
    </div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

The button starts disabled — we'll enable it once the deck is ready.

### Step 4: Write the JavaScript

Replace the contents of `src/main.js` with:

```js
import axios from "axios";

const button = document.querySelector("#draw-btn");
const status = document.querySelector("#status");
const output = document.querySelector("#card-output");

let deckId = null;

// Step 1: On load, create a new shuffled deck
async function createDeck() {
  const response = await axios.get(
    "https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  deckId = response.data.deck_id;
  status.textContent = `Deck ready — ${response.data.remaining} cards remaining.`;
  button.disabled = false;
}

// Step 2: On click, draw one card from that deck
button.addEventListener("click", async () => {
  const response = await axios.get(
    `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
  );

  const card = response.data.cards[0];
  const remaining = response.data.remaining;

  output.innerHTML = `
    <img src="${card.image}" alt="${card.value} of ${card.suit}" />
    <p>${card.value} of ${card.suit}</p>
  `;

  status.textContent = `${remaining} cards remaining.`;

  if (remaining === 0) {
    button.disabled = true;
    status.textContent = "Deck is empty!";
  }
});

createDeck();
```

Notice the first line: `import axios from "axios"`. Without Vite, this would throw the same browser error we saw earlier. With Vite running, it just works.

The two-step flow here — create a deck first, then draw from it — is also a good early taste of how real APIs work: one call sets something up, and subsequent calls act on it using the ID returned from the first.

### Step 5: Add Some Basic Styles

Replace `src/style.css` with:

```css
body {
  font-family: sans-serif;
  display: flex;
  justify-content: center;
  padding: 4rem 2rem;
  background: #f0f4f8;
}

#app {
  max-width: 400px;
  text-align: center;
}

button {
  padding: 0.6rem 1.4rem;
  font-size: 1rem;
  cursor: pointer;
  margin: 1rem 0;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

#card-output img {
  width: 120px;
  margin-top: 1rem;
}

#card-output p {
  font-size: 1.1rem;
  margin-top: 0.5rem;
}
```

### Step 6: Run It

```bash
npm run dev
```

Open `http://localhost:5173` in your browser. The deck shuffles on load, then each button click draws and displays a new card — complete with the card image served directly from the API.

Try editing the CSS or changing the heading text while the dev server is running. The browser updates instantly thanks to HMR, without you touching the refresh button.

### Step 7: Build for Production

When you're happy with it:

```bash
npm run build
```

Check the `dist/` folder. You'll see your JavaScript and CSS have been bundled, minified, and renamed with hashes — ready to upload to any static host.

### What This Example Showed

| Thing we did | Why Vite made it possible |
|---|---|
| `import axios from "axios"` | Vite resolved it from `node_modules` |
| Two-step API flow (create, then draw) | Real-world async pattern, works cleanly with `async/await` |
| Instant browser updates while editing | HMR — no manual refresh needed |
| `npm run build` → `dist/` | Bundled, minified, production-ready output |

Without Vite, that `import` line on its own would have crashed the browser immediately.

## Summary

Vite is a tool that fills the gap between writing modern JavaScript and what the browser can actually run. You don't need it for simple projects — a plain HTML, CSS, and JS setup is still the right starting point. But once you need npm packages, multiple files, or a production build, Vite handles all of that for you.

Its two core jobs are running a fast dev server with hot reloading during development, and producing a bundled, minified dist/ folder when you're ready to ship. Everything in between — resolving imports, stripping unused code, cache-busting filenames — happens automatically.

The moment you write `import axios from "axios"` and it just works, that's Vite doing its job.