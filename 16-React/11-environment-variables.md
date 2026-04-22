# Environment Variables

Whenever you build a new app that communicates with an API — whether it is a **3rd-party API** or an **API your own team built in-house** — you should create environment variables early in the project.

This is a standard development practice because API-related configuration usually changes depending on where your app is running.

For example:

- local development might use a localhost API
- staging might use a testing server
- production might use the live API

Instead of hard-coding those values directly in your source code, developers store them in environment variables.

### Why This Matters

Environment variables help separate:

```text
application code
vs
application configuration
```

Your code stays the same, but the configuration can change depending on the environment.

That means you can write your fetch logic once, while changing the API location when needed.

Without environment variables, developers often hard-code values like this:

```js
fetch("http://localhost:3000/posts");
```

That may work locally, but it becomes a problem later when the app is deployed and the API is no longer running on your machine.

A better pattern is to store that API base URL in configuration and reference it from your code.

## How They Are Used in Frontend Development

In frontend development, environment variables are commonly used for things like:

- API base URLs
- public API keys
- feature flags
- app mode or deployment-specific settings

Example idea:

```text
development  → http://localhost:3000
production   → https://api.myapp.com
```

Your frontend code can read the correct value depending on where the app is running.

This is especially important in React apps because the frontend often needs to know:

- where to send fetch requests
- which backend it should talk to
- whether it is running locally or in production

For frontend projects, these values should be planned from the beginning whenever the app depends on external data.

> If your frontend is going to call an API, you should expect to create environment variables.

## How They Are Used in Backend Development

Environment variables are also important in backend development.

Backend apps often need configuration such as:

- database connection URLs
- API base URLs for external services
- ports
- authentication settings
- tokens or credentials
- environment mode such as development or production

Unlike the frontend, the backend can safely use private values because backend code runs on the server, not in the browser.

So both frontend and backend projects use environment variables, but they use them a little differently:

```text
Frontend → public configuration the browser can use
Backend  → server-side configuration, including private values
```

That is why environment variables are considered a normal part of full-stack application setup.

## Using Environment Variables

For a React app using **Vite**, you do **not** need to install anything extra just to use `.env` files.

Vite already supports environment variables.

That means in a Vite React project:

- create a `.env` file
- add your variables
- restart the dev server
- access them in your code with `import.meta.env`

### Important Vite Rule

Any environment variable you want to use in your React frontend must start with:

```text
VITE_
```

Example:

```env
VITE_API_URL=http://localhost:3000
```

If the variable does **not** start with `VITE_`, your React app will not be able to read it in the browser.

### Example: Basic `.env` Setup in React

### `.env`

```env
VITE_API_URL=http://localhost:3000
VITE_APP_NAME=My React App
VITE_ENABLE_REVIEWS=true
```

### React code

```js
const apiUrl = import.meta.env.VITE_API_URL;
const appName = import.meta.env.VITE_APP_NAME;
const enableReviews = import.meta.env.VITE_ENABLE_REVIEWS;

console.log(apiUrl);
console.log(appName);
console.log(enableReviews);
```

You can then use that variable in a fetch request:

```js
const apiUrl = import.meta.env.VITE_API_URL;

async function getPosts() {
  const response = await fetch(`${apiUrl}/posts`);
  const data = await response.json();
  return data;
}
```

This lets the same code work in different environments without rewriting the URL by hand.

> In older React setups or a Node backend, you normally have to install `dotenv` package.

## Examples of When You Would Use Environment Variables

Here are common examples of when environment variables are useful in frontend development.

### 1. API base URL

This is the most common example.

```env
VITE_API_URL=http://localhost:3000
```

Use this when your app needs to talk to a backend.

### 2. Public API key

Some 3rd-party APIs provide a **public key** that is specifically designed to be safe in the browser. These keys usually come with built-in protections like domain restrictions or rate limits.

```env
VITE_MAPS_API_KEY=abc123publickey
```

You might use this with a maps, weather, or search API.

> ⚠️ **Important:** Not every API key is "public." Keys for services like Anthropic, OpenAI, and most LLM providers are **private** and must NEVER go in a frontend `.env` file. See the security section at the bottom of this page for the full explanation.

### 3. Feature flags

You may want to turn features on or off without changing the app code.

```env
VITE_ENABLE_CHAT=false
VITE_ENABLE_REVIEWS=true
```

Then in React:

```js
const enableChat = import.meta.env.VITE_ENABLE_CHAT === "true";

if (enableChat) {
  console.log("Show chat feature");
}
```

This is useful when a feature is still being tested.

### 4. App mode or branding

You may want different values for different environments or deployments.

```env
VITE_APP_NAME=Student Dashboard
VITE_BRAND_COLOR=blue
```

This can help with reusable apps or multiple deployments of the same codebase.

### 5. Frontend URL talking to backend URL

You may have:

- React frontend on one domain
- API backend on another domain

Example:

```env
VITE_API_URL=https://backend.example.com
```

This is especially common when frontend and backend are deployed separately.

---

### Example Project Setup

A React project might look like this:

```text
my-app/
├── .env
├── .env.development
├── .env.production
├── src/
├── public/
├── package.json
└── vite.config.js
```

### What each one is for

- `.env` → shared defaults
- `.env.development` → development-only values
- `.env.production` → production-only values

Example:

### `.env`
```env
VITE_APP_NAME=My App
```

### `.env.development`
```env
VITE_API_URL=http://localhost:3000
VITE_APP_MODE=development
```

### `.env.production`
```env
VITE_API_URL=https://api.myapp.com
VITE_APP_MODE=production
```

## Development vs Production Setup in Vite

When using a Vite React app, the simplest way to think about environment variables is:

- use the **same variable names**
- give them **different values**
- let Vite load the correct values depending on how the app is running

For most beginner and intermediate React apps, there are two practical ways to set this up:

1. **one `.env` file** for a simple project
2. **two files**: one for local development and one for production

### Option 1: One `.env` File

This is the easiest setup when your app is still small and you are just learning.

### Example

#### `.env`

```env
VITE_API_URL=http://localhost:3000
VITE_APP_MODE=development
VITE_SHOW_DEBUG=true
```

This works well when:
- you are still building locally
- you are learning how env vars work
- you do not yet have a deployed backend
- your project is simple

### How React uses it

You can read those values anywhere in your React app using `import.meta.env`:

```js
const apiUrl = import.meta.env.VITE_API_URL;
const appMode = import.meta.env.VITE_APP_MODE;
const showDebug = import.meta.env.VITE_SHOW_DEBUG === "true";
```

Then use them in your code:

```js
async function getPosts() {
  if (showDebug) {
    console.log("Mode:", appMode);
    console.log("API URL:", apiUrl);
  }

  const response = await fetch(`${apiUrl}/posts`);
  return response.json();
}
```
---

### Where You Usually Put the Code

Most of the time, you read environment variables in one of these places:

- `src/App.jsx`
- `src/main.jsx`
- `src/api.js`
- `src/config.js`

A very common pattern is to put API-related values in a helper file.

### Example: `src/api.js`

```js
const apiUrl = import.meta.env.VITE_API_URL;
const showDebug = import.meta.env.VITE_SHOW_DEBUG === "true";
const appMode = import.meta.env.VITE_APP_MODE;

export async function getPosts() {
  if (showDebug) {
    console.log("Running in:", appMode);
    console.log("Calling API:", apiUrl);
  }

  const response = await fetch(`${apiUrl}/posts`);
  return response.json();
}
```

Then in a component:

### Example: `src/App.jsx`

```jsx
import { useEffect, useState } from "react";
import { getPosts } from "./api";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function loadPosts() {
      const data = await getPosts();
      setPosts(data);
    }

    loadPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {posts.map((post) => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}

export default App;
```

## Vite’s Built-In Values

Besides your own variables like `VITE_API_URL`, Vite also gives you built-in values under `import.meta.env`.

### `import.meta.env.DEV`
This is `true` when the app is running in development.

```js
if (import.meta.env.DEV) {
  console.log("Running locally in development");
}
```

Use this for:
- extra logging
- debugging helpers
- development-only behavior

---

### `import.meta.env.PROD`
This is `true` when the app is running in production.

```js
if (import.meta.env.PROD) {
  console.log("Running in production");
}
```

Use this for:
- production-only logic
- disabling development-only logs
- checking whether the deployed version is running

`DEV` and `PROD` are opposites.

---

### `import.meta.env.MODE`
This gives you the current mode as a string.

```js
console.log(import.meta.env.MODE);
```

Examples:
- `"development"`
- `"production"`

Use this when:
- you want to display the current environment
- you want more descriptive checks than just `DEV` or `PROD`

Example:

```js
if (import.meta.env.MODE === "development") {
  console.log("Development mode is active");
}
```

---

### `import.meta.env.BASE_URL`
This tells you the base URL the app is being served from.

```js
console.log(import.meta.env.BASE_URL);
```

This is helpful when:
- your app is not deployed at `/`
- your assets or links need the correct base path


## Best Practical Advice

For a beginner React app with Vite:

- use **one `.env` file** if the project is still very small
- use **`.env.development` and `.env.production`** once you have both a local and deployed setup
- use **`VITE_` variables** for your own frontend config
- use **Vite’s built-in values** like `DEV`, `PROD`, and `MODE` when you need quick checks in code

### Recommended beginner setup

#### `.env.development`

```env
VITE_API_URL=http://localhost:3000
VITE_SHOW_DEBUG=true
```

#### `.env.production`

```env
VITE_API_URL=https://api.myapp.com
VITE_SHOW_DEBUG=false
```

#### React code

```js
const apiUrl = import.meta.env.VITE_API_URL;
const showDebug = import.meta.env.VITE_SHOW_DEBUG === "true";

if (import.meta.env.DEV && showDebug) {
  console.log("Using local API:", apiUrl);
}
```

This gives you:
- one codebase
- one set of variable names
- different values for local and deployed environments
- built-in Vite checks for development vs production


## Important Setup Notes

### 1. Restart the dev server
If you add or change environment variables, restart your React dev server.

For example:

```bash
npm run dev
```

again after editing `.env`.

### 2. Strings only
Environment variables are read as strings.

So this:

```env
VITE_ENABLE_CHAT=true
```

is actually read as:

```js
"true"
```

That is why developers often compare values like this:

```js
const enableChat = import.meta.env.VITE_ENABLE_CHAT === "true";
```

### 3. Do not put secrets in the frontend

> **This is the most important rule on this page.**

Anything used by React in the browser can be inspected by users — even if you put it in a `.env` file.

This is one of the most common mistakes beginners make, so it deserves its own deep explanation.

## Why Frontend Environment Variables Are NOT Secret

A lot of beginners assume that `.env` files are "hidden" or "secret." They are not. At least not on the frontend.

Here is what actually happens when you use `VITE_` variables in a React app:

```text
┌────────────────────────────────────────────────────────────────┐
│                    BUILD TIME (npm run build)                  │
│                                                                │
│   .env file              Vite build process                    │
│   ┌────────────┐          ┌────────────────┐                   │
│   │ VITE_KEY=  │   ──▶    │  Replaces      │                   │
│   │ secret123  │          │  VITE_KEY with │                   │
│   └────────────┘          │  "secret123"   │                   │
│                           │  in your JS    │                   │
│                           └────────────────┘                   │
│                                   │                            │
│                                   ▼                            │
│                           ┌────────────────┐                   │
│                           │   dist/        │                   │
│                           │   bundle.js    │ ◀── secret123     │
│                           │                │     is now inside │
│                           └────────────────┘                   │
└────────────────────────────────────────────────────────────────┘
                                   │
                                   ▼
┌────────────────────────────────────────────────────────────────┐
│                         IN THE BROWSER                         │
│                                                                │
│   User opens DevTools → Sources tab → finds bundle.js          │
│   User searches the file → sees "secret123" in plain text      │
│                                                                │
│                 🔓 The "secret" is exposed                     │
└────────────────────────────────────────────────────────────────┘
```

### Proof You Can See For Yourself

You can verify this right now:

1. In a Vite project, add a variable to `.env`:
   ```env
   VITE_SECRET=my-super-secret-value
   ```
2. Use it somewhere in React:
   ```js
   const secret = import.meta.env.VITE_SECRET;
   ```
3. Run `npm run build`
4. Open the generated `dist/assets/` folder
5. Search any `.js` file inside for `my-super-secret-value`
6. You will find it sitting there in plain text

## The Common Misconception About Hosting Platforms

A lot of beginners think that setting environment variables in their hosting platform (Vercel, Netlify, etc.) automatically keeps them secret.

**This is NOT true for frontend variables.**

```text
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│   Vercel Dashboard                                              │
│   ┌──────────────────────────────────┐                          │
│   │  Environment Variables           │                          │
│   │  VITE_API_KEY = sk-ant-xxxxx     │   ❌ Still exposed       │
│   │                                  │      in the browser      │
│   └──────────────────────────────────┘                          │
│                    │                                            │
│                    │  During build                              │
│                    ▼                                            │
│   ┌──────────────────────────────────┐                          │
│   │  Built JS files                  │                          │
│   │  const key = "sk-ant-xxxxx";     │   🔓 Visible in          │
│   └──────────────────────────────────┘      DevTools            │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

The `VITE_` prefix tells Vite: "make this available in the browser." That means it **must** be shipped to the browser. There is no way around it. It does not matter where the value comes from — a local `.env` file, Vercel's dashboard, or Netlify's dashboard — if it starts with `VITE_`, it ends up in the browser.

## The Security Rule: A Simple Table

| Where the variable lives                        | Secure? | Why                                               |
| ----------------------------------------------- | :-----: | ------------------------------------------------- |
| `.env` in a **React/Vite** project              |   ❌    | Bundled into browser JS at build time             |
| **Hosting platform** env vars (for frontend)    |   ❌    | Still bundled into browser JS                     |
| `.env` in a **Node/Express** backend            |   ✅    | Stays on the server, never sent to browser        |
| **Serverless functions** (Vercel/Netlify funcs) |   ✅    | Runs server-side, browser never sees it           |
| **Hosting platform** env vars (for backend)     |   ✅    | Read by server code only                          |

## What Counts as a "Public" vs "Private" Key

Not every API key is dangerous to expose. Some 3rd-party services give you **public keys** that are specifically designed to be safe in the browser. They usually come with built-in restrictions (like domain allowlists or rate limits).

Here is how to tell the difference:

| Key type                      | Example                      | Safe in frontend? |
| ----------------------------- | ---------------------------- | :---------------: |
| Google Maps API key           | `AIza...` (domain-locked)    |        ✅         |
| Stripe **publishable** key    | `pk_live_...`                |        ✅         |
| Stripe **secret** key         | `sk_live_...`                |        ❌         |
| Anthropic / Claude API key    | `sk-ant-...`                 |        ❌         |
| OpenAI API key                | `sk-...`                     |        ❌         |
| Google Gemini API key         | `AIza...` (not domain-locked)|        ❌         |
| Database connection string    | `postgres://user:pass@host`  |        ❌         |
| JWT signing secret            | any random string            |        ❌         |

> **Rule of thumb:** If the provider's docs call it a "secret key," "private key," or "server-side key" — it must stay on the backend.

## The Solution: Use a Backend as a Proxy

If your app needs a secret API key (like an LLM API key), you cannot call the API directly from React. You need a backend that sits between your React app and the 3rd-party service.

```text
❌ WRONG: React calls the API directly

┌──────────┐                              ┌───────────────┐
│  React   │  ───── API key exposed ────▶ │   AI API      │
│ (browser)│         in the browser       │  (Anthropic)  │
└──────────┘                              └───────────────┘


✅ RIGHT: React calls YOUR backend, backend calls the API

┌──────────┐         ┌──────────┐         ┌───────────────┐
│  React   │  ────▶  │  Node    │  ────▶  │   AI API      │
│ (browser)│         │ Express  │         │  (Anthropic)  │
│          │  ◀────  │ (server) │  ◀────  │               │
└──────────┘         └──────────┘         └───────────────┘
                          │
                          │  Reads secret key from
                          ▼  server-side .env file
                     ┌──────────┐
                     │  .env    │
                     │  KEY=... │
                     └──────────┘
```

### Example: Backend Proxy Pattern

**Frontend (React) — no secrets:**

```js
// src/api.js
const apiUrl = import.meta.env.VITE_API_URL;

export async function askAI(message) {
  const response = await fetch(`${apiUrl}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return response.json();
}
```

**Backend (Node/Express) — secret stays here:**

```js
// server.js
import express from "express";
import "dotenv/config";

const app = express();
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  const aiResponse = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "x-api-key": process.env.ANTHROPIC_API_KEY, // 🔒 safe on server
      "anthropic-version": "2023-06-01",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 1024,
      messages: [{ role: "user", content: req.body.message }],
    }),
  });

  const data = await aiResponse.json();
  res.json({ reply: data.content[0].text });
});

app.listen(3000);
```

**Backend `.env` file (never shipped to the browser):**

```env
ANTHROPIC_API_KEY=sk-ant-your-real-secret-key
```

## Quick Reference: What Goes Where

| Variable                   | Frontend `.env` | Backend `.env` |
| -------------------------- | :-------------: | :------------: |
| `VITE_API_URL`             |       ✅        |       —        |
| `VITE_APP_NAME`            |       ✅        |       —        |
| `VITE_ENABLE_CHAT`         |       ✅        |       —        |
| Maps / Stripe public key   |       ✅        |       —        |
| `ANTHROPIC_API_KEY`        |       ❌        |       ✅       |
| `OPENAI_API_KEY`           |       ❌        |       ✅       |
| `DATABASE_URL`             |       ❌        |       ✅       |
| `JWT_SECRET`               |       ❌        |       ✅       |
| `STRIPE_SECRET_KEY`        |       ❌        |       ✅       |

## The Mental Model for Beginners

```text
╔════════════════════════════════════════════════════╗
║                                                    ║
║   Ask yourself:                                    ║
║                                                    ║
║   "Does the browser need this value to run?"       ║
║                                                    ║
║   ├─ YES → Frontend env var (public only)          ║
║   │                                                ║
║   └─ NO  → Backend env var (secrets live here)     ║
║                                                    ║
╚════════════════════════════════════════════════════╝
```

If the value is a secret, the browser **must not** be the thing using it. The backend uses it on the browser's behalf and only sends back the safe result.

## Next Up: Deployment
Deployment is the process of taking your app from your local computer and making it available on the internet through a hosting platform. 

In a React app, that usually means building the project into browser-ready files and letting a cloud service host them. But deployment is not just about uploading code. You also have to think about production setup, especially the values your live app needs in order to work correctly, such as API URLs, public keys, feature flags, and app mode settings.

Before deploying, you should make sure the app builds and works locally first. Then you need to add the correct production environment variable values to your cloud hosting platform, because the deployed app will not automatically use the .env files from your computer. 

**Things to consider:**

- Build the app locally first and make sure it works before deploying.
- Identify which production environment variables the app needs.
- Confirm that production values point to real deployed services, not localhost
- Redeploy the app after adding or changing environment variables
- Test the deployed site is connecting to the correct production API (with Network tab)
- Use the browser console to check for errors