# Moonlight Pizza Co. --- React Web App (Project 03)

This project rebuilds **Moonlight Pizza Co. Project 02** using **React**
while keeping the **same UI, same API, and same data**.

The goal of this project is **not** to add new features --- it's to
understand how a real-world vanilla JavaScript app translates into a
modern React architecture.

> If Project 02 taught you *how the browser works*, this project teaches
> you *how teams actually build frontend apps*.

## What Stayed the Same

This React version intentionally preserves everything that already
worked:

-   Same visual design (100% UI parity)
-   Same responsive behavior (mobile-first)
-   Same REST API
-   Same endpoints
-   Same data flow
-   Same user experience

The backend still uses
[`json-server`](https://github.com/typicode/json-server) as a mock REST
API.

## What Changed (High-Level)

| Vanilla JS (Project 02) | React (Project 03) |
|------------------------|-------------------|
| Multiple HTML files | One HTML file |
| File-based navigation | Client-side routing |
| Manual DOM updates | State-driven rendering |
| Global variables | React Context |
| `querySelector` / `innerHTML` | JSX |
| Script tags | ES module imports |
| Event listeners | JSX event handlers |
## Key Conceptual Shift

**Vanilla JS**\
\> "Find elements → update them manually"

**React**\
\> "Describe what the UI should look like for a given state"

You no longer *tell* the DOM what to do.\
You *declare* what the UI should look like --- React handles the
updates.

## 🧱 Tech Stack

-   Vite + React
-   React Router
-   React Context
-   CSS Modules
-   json-server

## 📁 Project Structure (Separated for Deployment)

``` text
moonlight-pizza-project/
├── client/
│   ├── public/
│   │   └── images/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Home.module.css
│   │   │   ├── Menu.jsx
│   │   │   ├── Menu.module.css
│   │   │   ├── Specials.jsx
│   │   │   ├── Specials.module.css
│   │   │   ├── Order.jsx
│   │   │   ├── Order.module.css
│   │   │   ├── Contact.jsx
│   │   │   └── Contact.module.css
│   │   ├── context/
│   │   │   └── CartContext.jsx
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── server/
    ├── db.json
    ├── server.js
    ├── public/
    └── package.json
```

## Why There Is a Separate `server/` Folder

In earlier example apps, you have run `json-server` inside the same
folder as your frontend.

That works for local development, but not for deployment.

For this project, the backend is in its own **server folder** because:

-   frontend and backend are deployed separately
-   each needs its own package.json
-   each runs independently in the cloud

So you now have:

-   client → deployed to Vercel
-   server → deployed to Render or Railway

This mirrors real-world apps.

------------------------------------------------------------------------

### Why There Is a `server.js` File

The `server.js` file allows json-server to run as a real Node server.

You must also include an empty:

    server/public/

This is required because json-server expects a public folder when using
default middleware.

---

### Important json-server Version

Use this version only:

``` json
"json-server": "^0.17.4"
```

>Do NOT use the latest version --- it may break this setup.

----

### Important Server Script

``` json
"scripts": {
  "start": "node server.js"
}
```
## Environment Variables (Local vs Production API)

When your app is running locally, your frontend talks to your backend
using a local URL such as:

http://localhost:3000

But once your backend is deployed to a cloud service like Render or
Railway, that backend is no longer running on your computer.

That means your React app cannot keep using localhost in production.

Instead, it needs a way to switch between:

-   a local API URL during development
-   a deployed API URL after the app goes live

That is why this project should use an environment variable.

### Local Development

Create a .env file inside your client folder:

VITE_API_BASE_URL=http://localhost:3000

This stores your local backend URL for development.

### Using the Variable in React

In your React code, read the value like this:

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL \|\|
"http://localhost:3000";

Then use it in your fetch requests:

fetch(`${API_BASE_URL}/pizzas`)

### Why This Matters

If you hardcode http://localhost:3000 directly into your React app,
everything may work locally, but once the frontend is deployed, the
browser will still try to call your own computer.

That will fail, because users visiting your deployed app do not have
access to your local machine.

Using an environment variable solves this by letting the app use a
different base URL depending on where it is running.

### Production Deployment

When your frontend is deployed to Vercel, your local .env file is not
automatically used.

You must manually add the same variable inside the Vercel dashboard.

Add this environment variable in Vercel:

`VITE_API_BASE_URL=https://your-render-or-railway-url.com`

Example:

`VITE_API_BASE_URL=https://project3-hbsa.onrender.com`

### Redeploy Required

After adding or changing the environment variable in Vercel, you must
redeploy your frontend.

This is important because Vite reads environment variables during the
build process.

If you do not redeploy, your app may still use the old value.

## HTML Pages → React Components

### Before (Vanilla JS)

-   `index.html`
-   `menu.html`
-   `specials.html`
-   `order.html`
-   `contact.html`

### Now (React)

Each page is a **React component** with its own CSS Module:

  Page       Component         Styles
  ---------- ---------------- --------------------
  Home       `Home.jsx`        `Home.module.css`
  Menu       `Menu.jsx`        `Menu.module.css`
  Specials   `Specials.jsx`    `Specials.module.css`
  Order      `Order.jsx`       `Order.module.css`
  Contact    `Contact.jsx`     `Contact.module.css`

All pages render inside a **single HTML file** (`index.html`), which
React controls.

## Navigation → React Router

### Before

``` html
<a href="menu.html">Menu</a>
```

### Now

``` jsx
<Link to="/menu">Menu</Link>
```

Routes are defined once in the app:

``` jsx
<Route path="/menu" element={<Menu />} />
```

Navigation happens **without reloading the page**.

## CSS → CSS Modules

### Before

-   Global CSS files loaded with `<link>`
-   Styles applied by class names

### Now

-   **Global styles** live in `src/styles/global.css` and are imported
    once in `main.jsx` for things like resets, fonts, and CSS variables
-   **Page-scoped styles** live in a `.module.css` file next to each
    page component
-   Class names are imported as an object and applied via JSX, which
    automatically scopes them to avoid conflicts
-   Visual output remains **identical**

``` css
/* Home.module.css */
.hero {
  background: var(--color-primary);
  padding: 2rem;
}
```

``` jsx
/* Home.jsx */
import styles from "./Home.module.css";

function Home() {
  return <section className={styles.hero}>...</section>;
}
```

``` css
/* src/styles/global.css */
*, *::before, *::after {
  box-sizing: border-box;
}

:root {
  --color-primary: #c0392b;
  --font-main: "Georgia", serif;
}

body {
  margin: 0;
  font-family: var(--font-main);
}
```

``` jsx
/* main.jsx */
import "./styles/global.css";
```

## DOM Manipulation → State

### Before

``` js
container.innerHTML += pizzaHTML;
```

### Now

``` jsx
{pizzas.map((pizza) => (
  <PizzaCard key={pizza.id} {...pizza} />
))}
```

React updates the DOM automatically whenever state changes.


## ▶️ Running the Project Locally

### Start the frontend

``` bash
cd client
npm install
npm run dev
```

### Start the backend

``` bash
cd server
npm install
npm start
```

Open in browser:

-   Frontend → http://localhost:5173
-   API → http://localhost:3000


Each page fetches **only the data it needs**.

## Example Fetch in React

``` js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

useEffect(() => {
  fetch(`${API_BASE_URL}/pizzas`)
    .then((res) => res.json())
    .then(setPizzas)
    .catch(console.error);
}, []);
```

## What Comes Next

In future projects, you will:

-   Build new features directly in React
-   Replace `json-server` with a real backend
-   Add authentication and persistence
-   Deploy frontend and backend separately

By then, React should feel **familiar**, not confusing.
