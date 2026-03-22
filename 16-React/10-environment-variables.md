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

Some 3rd-party APIs require a public key that is safe to expose in the browser.

```env
VITE_MAPS_API_KEY=abc123publickey
```

You might use this with a maps, weather, or search API.

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

### Limitation of one `.env` file

If you only use one `.env` file, then you must manually change the values before deploying.

For example, you would have to change:

```env
VITE_API_URL=http://localhost:3000
VITE_APP_MODE=development
VITE_SHOW_DEBUG=true
```

to:

```env
VITE_API_URL=https://api.myapp.com
VITE_APP_MODE=production
VITE_SHOW_DEBUG=false
```

That is why one file is simple, but usually best only for smaller projects.

---

### Option 2: Two Files — Local vs Production

This is usually the better setup once your app has both:
- a local development environment
- a deployed production environment

### Local file

#### `.env.development`

```env
VITE_API_URL=http://localhost:3000
VITE_APP_MODE=development
VITE_SHOW_DEBUG=true
```

### Production file

#### `.env.production`

```env
VITE_API_URL=https://api.myapp.com
VITE_APP_MODE=production
VITE_SHOW_DEBUG=false
```

Now your React code stays exactly the same:

```js
const apiUrl = import.meta.env.VITE_API_URL;
const appMode = import.meta.env.VITE_APP_MODE;
const showDebug = import.meta.env.VITE_SHOW_DEBUG === "true";
```

But the values change automatically depending on whether Vite is running in development mode or production mode.

### Mental model

```text
same code
same variable names
different file loaded
different values used
```

This is the cleanest pattern for apps that will actually be deployed.

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

---

### `import.meta.env.SSR`
This tells you whether the app is running on the server side.

```js
if (import.meta.env.SSR) {
  console.log("Running in SSR");
}
```

For most beginner React + Vite apps, you usually will **not** need this right away, but it exists for server-side rendering setups.


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
Anything used by React in the browser can be inspected by users.

So these are okay in frontend `.env` files:

- API URLs
- public keys
- feature flags

These are **not** okay in frontend `.env` files:

- database passwords
- private API keys
- secret tokens

If something must stay secret, put it in the backend.

## Key Takeaways

- Deploying a React app means building it into browser-ready files and hosting those files on a cloud platform.
- Your React code can stay the same across environments, while environment variables provide different values for local development and production.
- In Vite, frontend environment variables must start with `VITE_` to be available in your React code.
- For small apps, one `.env` file may be enough to get started.
- For apps that run both locally and in production, `.env.development` and `.env.production` are usually a cleaner and more realistic setup.
- Vite’s built-in values like `import.meta.env.DEV`, `import.meta.env.PROD`, and `import.meta.env.MODE` help you check how the app is running.
- Local `.env` files stay on your machine. When you deploy, your cloud hosting service needs its own copy of the production environment variable values.
- If the cloud platform does not have the correct environment variable values, your deployed app may fail or try to call the wrong API.

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