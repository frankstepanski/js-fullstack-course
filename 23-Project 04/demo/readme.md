# Moonlight Pizza Co. --- React Web App (Project 04)

This project builds on **Project 03** by replacing the `json-server` mock
backend with a **real Express API** backed by a **PostgreSQL database**.

The frontend (React) is unchanged. The goal is to understand how a real
backend is structured --- routing, controllers, services, and a database.

> If Project 03 taught you how to build a React frontend, this project
> teaches you *how to structure and build an API*.

## What Stayed the Same

-   Same visual design (100% UI parity)
-   Same responsive behavior (mobile-first)
-   Same REST endpoints (same URLs the frontend already calls)
-   Same data (pizzas, specials, cart, orders, testimonials, contact cards)
-   Same user experience

## What Changed

| Project 03 (React + json-server) | Project 04 (React + Express + PostgreSQL) |
|----------------------------------|------------------------------------------|
| `json-server` auto-generated routes | Express routes written by hand |
| Flat `db.json` file as "database" | PostgreSQL relational database |
| All server code in one `server.js` | Split into routes / controllers / services |
| Data lost on server restart | Data persisted in the database |
| No seeding step | `npm run seed` seeds all tables |

## Backend Architecture

The server is organized into three layers. Each layer has one job.

```
request → middleware → router → controller → service → database
```

### routes/
Connects an HTTP method + URL path to a controller function.
No logic here --- just mapping.

```js
router.get("/", getAll);  // GET /pizzas → pizzasController.getAll
```

### controllers/
Handles the HTTP layer: reads from `req`, calls the service, sends `res`.
No SQL here --- just HTTP.

```js
export async function getAll(req, res) {
  const pizzas = await pizzasService.getAllPizzas();
  res.json(pizzas);
}
```

### services/
Runs SQL queries and maps database rows (snake_case) to the API shape (camelCase).
No `req` or `res` here --- just data.

```js
export async function getAllPizzas() {
  const { rows } = await pool.query("SELECT * FROM pizzas ORDER BY id");
  return rows.map(toApiShape);  // image_src → imageSrc, etc.
}
```

## Tech Stack

### Frontend
-   Vite + React
-   React Router
-   React Context
-   styled-components

### Backend
-   Node.js + Express
-   PostgreSQL (`pg` driver)
-   `cors` middleware
-   `dotenv` for environment variables

## Project Structure

```text
demo/
├── client/
│   ├── public/
│   │   └── images/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   │   └── CartContext.jsx
│   │   ├── lib/
│   │   │   └── api.js          ← all fetch calls live here
│   │   ├── pages/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                    ← VITE_API_BASE_URL (not committed)
│   ├── package.json
│   └── vite.config.js
│
└── server/
    ├── server.js               ← entry point: middleware + router mounts
    ├── .env                    ← DATABASE_URL + PORT (not committed)
    ├── .env.example            ← template showing required variables
    ├── db/
    │   ├── pool.js             ← shared pg connection pool
    │   ├── schema.sql          ← CREATE TABLE statements
    │   └── seed.js             ← creates tables + inserts demo data
    ├── routes/
    │   ├── pizzas.js
    │   ├── specials.js
    │   ├── contactCards.js
    │   ├── testimonials.js
    │   ├── cart.js
    │   └── orders.js
    ├── controllers/
    │   ├── pizzasController.js
    │   ├── specialsController.js
    │   ├── contactCardsController.js
    │   ├── testimonialsController.js
    │   ├── cartController.js
    │   └── ordersController.js
    ├── services/
    │   ├── pizzasService.js
    │   ├── specialsService.js
    │   ├── contactCardsService.js
    │   ├── testimonialsService.js
    │   ├── cartService.js
    │   └── ordersService.js
    └── package.json
```

## Database Schema

Six tables mirror the resources the frontend already uses.

| Table | Key columns |
|-------|-------------|
| `pizzas` | `id`, `name`, `description`, `prices` (JSONB), `image_src`, `image_alt`, `image_caption` |
| `specials` | `id`, `day_label`, `title`, `description_html`, `tagline` |
| `contact_cards` | `id`, `type`, `title`, `address_lines` (JSONB), `phone_display`, `phone_href`, `email_display`, `email_href`, `paragraphs` (JSONB), `actions` (JSONB) |
| `testimonials` | `id`, `name`, `quote`, `rating` |
| `cart` | `id` (always `"1"`), `items` (JSONB array) |
| `orders` | `id`, `items` (JSONB snapshot), `created_at` |

JSONB is used for columns that hold arrays or nested objects (prices, cart
items, etc.) rather than creating additional tables.

## API Endpoints

| Method | Path | What it does |
|--------|------|--------------|
| GET | `/pizzas` | Return all pizzas |
| GET | `/specials` | Return all specials |
| GET | `/contactCards` | Return all contact cards |
| GET | `/testimonials` | Return all testimonials |
| GET | `/cart/1` | Return the current cart |
| PUT | `/cart/1` | Replace the cart contents |
| POST | `/orders` | Place a new order |

## Environment Variables

### server/.env

```
DATABASE_URL=postgresql://postgres:password@localhost:5432/moonlight_pizza
PORT=3001
```

Copy `server/.env.example` to `server/.env` and fill in your values.
This file is gitignored and must never be committed.

### client/.env

```
VITE_API_BASE_URL=http://localhost:3001
```

This tells the React app where to send fetch requests during development.

### Why environment variables matter

If you hardcode `http://localhost:3001` directly into your React app,
it works locally but fails in production --- users do not have access
to your local machine. An environment variable lets the app switch URLs
depending on where it is running.

### Production deployment

When deploying:
-   Set `DATABASE_URL` in your backend host (Render, Railway, etc.)
-   Set `VITE_API_BASE_URL` to your deployed backend URL in Vercel
-   Redeploy the frontend after changing environment variables (Vite reads
    them at build time)

## Running the Project Locally

### Prerequisites

You need PostgreSQL running locally. Two easy options:

**Postgres.app (Mac, recommended)**
1. Download from [postgresapp.com](https://postgresapp.com)
2. Open it and click **Initialize**

**Homebrew**
```bash
brew install postgresql@16
brew services start postgresql@16
```

### Start the backend

```bash
cd server
npm install

# create the database (one time)
createdb moonlight_pizza

# seed tables with demo data (run any time to reset data)
npm run seed

# start the server
npm start
```

### Start the frontend

```bash
cd client
npm install
npm run dev
```

Open in browser:

-   Frontend → http://localhost:5173
-   API → http://localhost:3001

## npm Scripts (server)

| Script | Command | What it does |
|--------|---------|--------------|
| `npm start` | `node server.js` | Start the Express server |
| `npm run seed` | `node db/seed.js` | Create tables and insert demo data |

Re-running `npm run seed` is safe --- it truncates all tables and
re-inserts fresh data from scratch.

## How the Frontend Calls the API

All fetch calls are centralized in `client/src/lib/api.js`:

```js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

export const api = {
  getPizzas:      () => fetchJson("/pizzas"),
  getSpecials:    () => fetchJson("/specials"),
  getCart:        () => fetchJson("/cart/1"),
  putCart:   (cart)  => fetchJson("/cart/1", { method: "PUT", ... }),
  postOrder: (order) => fetchJson("/orders",  { method: "POST", ... }),
};
```

No page component makes a raw `fetch` call --- they all go through `api`.

## What Comes Next

In future projects, you will:

-   Add authentication and user-scoped carts
-   Write database migrations instead of re-running a seed script
-   Add input validation middleware
-   Deploy frontend and backend to separate cloud services

By now, separating routes, controllers, and services should feel natural
--- it is the pattern most production Node backends follow.
