# Moonlight Pizza Co. — React Web App (Project 03)

This project rebuilds **Moonlight Pizza Co. Project 02** using **React** while keeping the **same UI, same API, and same data**.

The goal of this project is **not** to add new features — it’s to understand how a real-world vanilla JavaScript app translates into a modern React architecture.

> If Project 02 taught you *how the browser works*, this project teaches you *how teams actually build frontend apps*.

## Important Deployment Structure Update

For this project, you should use **two separate folders**:

1. A **client** folder for your **React application**
2. A **server** folder for your **json-server API**

These two folders exist because this project is meant for **two separate deployments**.

- The **client** folder is deployed to a frontend cloud service such as **Vercel**
- The **server** folder is deployed to a backend cloud service such as **Render** or **Railway**

This is different from a simple local setup where everything may feel like one project. In deployment, the frontend and backend are treated as **two separate apps**.

## What Stayed the Same

This React version intentionally preserves everything that already worked:

- Same visual design (100% UI parity)
- Same responsive behavior (mobile-first)
- Same REST API
- Same endpoints
- Same data flow
- Same user experience

The backend still uses [`json-server`](https://github.com/typicode/json-server) as a mock REST API.

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

**Vanilla JS**  
> "Find elements → update them manually"

**React**  
> "Describe what the UI should look like for a given state"

You no longer *tell* the DOM what to do.  
You *declare* what the UI should look like — React handles the updates.

## 🧱 Tech Stack

- Vite + React
- React Router
- React Context
- styled-components
- json-server

## 📁 Project Structure (Separated for Deployment)

```text
moonlight-pizza-project/
├── client/
│   ├── public/
│   │   └── images/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Menu.jsx
│   │   │   ├── Specials.jsx
│   │   │   ├── Order.jsx
│   │   │   └── Contact.jsx
│   │   ├── context/
│   │   │   └── CartContext.jsx
│   │   ├── styles/
│   │   │   └── GlobalStyles.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
└── server/
    ├── db.json
    ├── server.js
    └── package.json
```

## Why There Is a `server.js` File

Inside the **server** folder, you will create a new file called `server.js`.

This file uses **json-server's built-in capabilities** so the API can run as its **own Node server**.

That matters because your backend needs to be deployed separately from your React app.

Instead of only running json-server from a command like this:

```bash
json-server --watch db.json --port 3001
```

you can create a real Node entry file like this:

```js
import jsonServer from "json-server";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3001;

server.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`);
});
```

This allows the backend to behave more like a deployable server application.

## HTML Pages → React Components

### Before (Vanilla JS)

- `index.html`
- `menu.html`
- `specials.html`
- `order.html`
- `contact.html`

### Now (React)

Each page is a **React component**:

| Page | Component |
|------|-----------|
| Home | `Home.jsx` |
| Menu | `Menu.jsx` |
| Specials | `Specials.jsx` |
| Order | `Order.jsx` |
| Contact | `Contact.jsx` |

All pages render inside a **single HTML file** (`index.html`), which React controls.

## Navigation → React Router

### Before

```html
<a href="menu.html">Menu</a>
```

### Now

```jsx
<Link to="/menu">Menu</Link>
```

Routes are defined once in the app:

```jsx
<Route path="/menu" element={<Menu />} />
```

Navigation happens **without reloading the page**.

## CSS → styled-components

### Before

- Global CSS files loaded with `<link>`
- Styles applied by class names

### Now

- Styles live next to components
- Components encapsulate structure + styles
- Visual output remains **identical**

```js
import styled from "styled-components";

const Card = styled.article`
  background: white;
  padding: 1rem;
`;
```

A `GlobalStyles` file injects the original CSS rules so spacing, fonts, and breakpoints match exactly.

## DOM Manipulation → State

### Before

```js
container.innerHTML += pizzaHTML;
```

### Now

```jsx
{pizzas.map((pizza) => (
  <PizzaCard key={pizza.id} {...pizza} />
))}
```

React updates the DOM automatically whenever state changes.

## Global Variables → React Context

Shared state (cart / order data) is handled with **React Context** instead of global variables.

```jsx
<CartProvider>
  <App />
</CartProvider>
```

This allows:

- Shared state across pages
- Predictable data flow
- No manual syncing
- Cleaner architecture

##  How the App Runs (Frontend + Backend)

This project runs as **two separate applications**:

| App | Purpose | Example Local Port | Deployment Target |
|-----|---------|--------------------|-------------------|
| Client | React frontend | `5173` | Vercel |
| Server | json-server API | `3001` | Render or Railway |

Locally, these work together during development.

In production, they are deployed **separately**, and your React app must make requests to the deployed backend URL instead of localhost.

##  Environment Variables (Local vs Production API)

Because your backend runs on a different URL in production, you should use an **environment variable** to manage your API base URL.

### Local Development

Create a `.env` file inside your **client** folder:

```bash
VITE_API_URL=http://localhost:3001
```

### Use It in Your React App

```js
fetch(`${import.meta.env.VITE_API_URL}/pizzas`)
```

### Production (Vercel)

When you deploy your React app to **Vercel**, your `.env` file is **not included automatically**.

You must manually add the environment variable in the Vercel dashboard:

- Go to your project settings in Vercel
- Add:
  - Key: `VITE_API_URL`
  - Value: your deployed backend URL (example below)

```text
https://your-server-name.onrender.com
```

### Important Notes

- Your local `.env` uses `localhost`
- Your production environment variable must use your **live backend URL**
- After adding or updating environment variables in Vercel, you must **redeploy** your app
- If this is not set correctly, your frontend will fail to connect to your API

Using environment variables ensures your app works correctly in both **local development** and **production deployments**.

## 📜 Example npm Scripts

### Client `package.json`

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview"
}
```

### Server `package.json`

```json
"scripts": {
  "start": "node server.js"
}
```

## ▶️ Running the Project Locally

### Start the frontend

```bash
cd client
npm install
npm run dev
```

### Start the backend

```bash
cd server
npm install
npm start
```

Open in browser:

- Frontend → http://localhost:5173
- API → http://localhost:3001

## API Endpoints (Unchanged)

```text
http://localhost:3001/pizzas
http://localhost:3001/specials
http://localhost:3001/contactCards
http://localhost:3001/cart
http://localhost:3001/orders
http://localhost:3001/testimonials
```

Each page fetches **only the data it needs**.

## Example Fetch in React

```js
useEffect(() => {
  fetch("http://localhost:3001/pizzas")
    .then((res) => res.json())
    .then(setPizzas)
    .catch(console.error);
}, []);
```

## Deployment Reminder

When deployed, your React app will **not** use `http://localhost:3001`.

Instead, it should use the **live deployed backend URL** from your Render or Railway service.

That means your frontend should eventually make requests to something like:

```js
fetch("https://your-server-name.onrender.com/pizzas")
```

or by using an environment variable for the API base URL.

## Why This Project Exists

This project is the **bridge**:

- From static pages → component architecture
- From scripts → applications
- From DOM manipulation → state-driven UI
- From beginner projects → professional frontend patterns
- From local development → separate frontend/backend deployment

Nothing magical happened — React simply organizes what you already know.

## What Comes Next

In future projects, you will:

- Build new features directly in React
- Replace `json-server` with a real backend
- Add authentication and persistence
- Deploy frontend and backend separately

By then, React should feel **familiar**, not confusing.
