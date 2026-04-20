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
| All server code in one `server.js` | Split into feature modules |
| Data lost on server restart | Data persisted in the database |
| No seeding step | `001_create_tables.sql` and `002_seed_data.sql` set up the database |

## Backend Architecture

The server is organized into three layers. Each layer has one job.

```
request → middleware → router → controller → service → database
```

These three layers live together inside a `features/` folder, grouped by
resource rather than by type. More on why below.

### router.ts
Connects an HTTP method + URL path to a controller function.
No logic here --- just mapping.

```ts
router.get("/", getAll);  // GET /pizzas → controller.getAll
```

### controller.ts
Handles the HTTP layer: reads from `req`, calls the service, sends `res`.
No SQL here --- just HTTP.

```ts
export async function getAll(req, res) {
  const pizzas = await service.getAllPizzas();
  res.json(pizzas);
}
```

### service.ts
Runs SQL queries and maps database rows (snake_case) to the API shape (camelCase).
No `req` or `res` here --- just data.

```ts
export async function getAllPizzas() {
  const { rows } = await pool.query<PizzaRow>("SELECT * FROM pizzas ORDER BY id");
  return rows.map(toApiShape);  // image_src → imageSrc, etc.
}
```

## Why Feature-Based Instead of Layer-Based?

The most common beginner structure organizes files by what type of file they
are — all routes together, all controllers together, all services together:

❌ Layer-based (avoid)
```
routes/
  pizzas.ts
  cart.ts
  orders.ts
controllers/
  pizzasController.ts
  cartController.ts
  ordersController.ts
services/
  pizzasService.ts
  cartService.ts
  ordersService.ts
```

This works fine for small apps, but it has a hidden cost: **when you work on
one feature, your files are spread across three different folders.** If you
want to add a new route to the cart, you need to open `routes/cart.ts`,
`controllers/cartController.ts`, and `services/cartService.ts` — jumping
between directories every time.

The feature-based approach groups everything related to one resource together:

✅ Feature-based (this project)
```
features/
  pizzas/
    router.ts
    controller.ts
    service.ts
  cart/
    router.ts
    controller.ts
    service.ts
  orders/
    router.ts
    controller.ts
    service.ts
```

Now when you work on the cart, all three files are in `features/cart/`. The
same three-layer separation still exists — it's just organized around *what
it does* rather than *what kind of file it is*.

This also scales better as the project grows. Adding a new resource means
adding a new folder with three files, rather than adding one file to each of
three separate folders. It is the pattern most production Node backends follow.

## Tech Stack

### Frontend
-   Vite + React
-   React Router
-   React Context
-   styled-components

### Backend
-   Node.js + Express
-   TypeScript
-   PostgreSQL (`pg` driver)
-   `zod` for runtime input validation
-   `cors` middleware
-   `dotenv` for environment variables
-   `chalk` for terminal output coloring

## TypeScript

This project uses TypeScript for the entire backend. TypeScript is a superset
of JavaScript that adds optional type annotations, which help catch bugs at
compile time rather than at runtime.

### Why TypeScript?

In large production backends, TypeScript is the standard. It helps because:

-   **Catches bugs early** — type errors show up in your editor before you even run the code
-   **Better autocomplete** — your editor knows exactly what properties are available on every object
-   **Self-documenting** — types describe the shape of your data without needing separate docs
-   **Safer refactoring** — if you rename a function or change a data shape, TypeScript tells you everywhere that breaks

### Additional packages installed

TypeScript itself doesn't know what Express, pg, or cors look like — it needs
separate type definition packages that describe the shape of those libraries:

```bash
npm install -D typescript tsx
npm install -D @types/node @types/express @types/pg @types/cors @types/swagger-ui-express
```

- **`typescript`** — the TypeScript compiler (`tsc`)
- **`tsx`** — runs TypeScript files directly without compiling to disk (used in development)
- **`@types/*`** — type definitions for third-party libraries that don't include their own

### What we actually typed (and what we didn't)

Not every file needed type annotations added. Here's the breakdown:

**Service files — fully typed**

Service files are where the data contracts live, so these got the most
attention. Each service file has two type definitions:

- A `Row` type that matches the raw PostgreSQL column names (snake_case)
- An API type that matches the camelCase shape returned to the frontend

```ts
// The raw shape coming out of the database
type PizzaRow = {
  id:            string;
  name:          string;
  image_src:     string | null;  // snake_case, matches the DB column
};

// The shape we return to the frontend
type Pizza = {
  id:      string;
  name:    string;
  imageSrc: string | null;  // camelCase, matches what the frontend expects
};
```

This makes the mapping between the two explicit and type-safe.

**Controller files — minimal changes**

Controllers handle `req` and `res` which are already typed by `@types/express`.
Since we set `"noImplicitAny": false` in `tsconfig.json`, we don't need to
explicitly annotate `req` and `res` — TypeScript infers them automatically.

**Router files — no changes**

Routers just map URLs to controller functions. No type annotations were needed.

### How TypeScript traces data through a POST route

The POST routes are the best example of TypeScript adding real value because
data passes through three distinct shapes on its way through the server. Using
the `POST /orders` route as an example:

**Step 1 — The request body arrives from the frontend**

The frontend sends a JSON body that looks like this:
```json
{ "items": ["pizza_1", "pizza_2"] }
```

We define a type for this so TypeScript knows exactly what shape to expect:
```ts
type OrderBody = {
  items: unknown[];  // an array of items — we use unknown[] because the items
                     // can be any shape (objects with pizzaId, size, price, etc.)
};
```

If the controller tries to pass something with the wrong shape to the service,
TypeScript catches it before the code even runs.

**Step 2 — The data comes back from PostgreSQL**

PostgreSQL returns rows in snake_case, matching the column names in the database:
```ts
type OrderRow = {
  id:         string;   // the order ID we generated
  items:      unknown[]; // the items stored as JSONB
  created_at: Date;     // snake_case — this is how PostgreSQL names it
};
```

**Step 3 — We return a clean shape to the frontend**

Before sending the response, we map the database row to a camelCase shape
that matches what the frontend expects:
```ts
type Order = {
  id:        string;
  items:     unknown[];
  createdAt: Date;      // camelCase — this is what the frontend receives
};
```

**Putting it all together in the service:**

```ts
export async function createOrder(body: OrderBody) {
  const id    = String(Date.now());
  const items = body.items ?? [];  // TypeScript knows body.items exists because of OrderBody

  const { rows } = await pool.query<OrderRow>(  // tells pg what shape the rows are
    `INSERT INTO orders (id, items) VALUES ($1, $2)
     RETURNING id, items, created_at`,
    [id, JSON.stringify(items)]
  );

  const row = rows[0]!;  // ! tells TypeScript we know a row was returned

  return {
    id:        row.id,
    items:     row.items,
    createdAt: row.created_at,  // snake_case in → camelCase out
  };
}
```

The three types act as checkpoints — if you accidentally typo a property name
or return the wrong shape, TypeScript flags it immediately in your editor
rather than letting it become a runtime bug.

### Changes that had to be made even without adding types

Even though we turned off the rule that forces you to type everything, a few
changes were still required. These are things TypeScript enforces regardless
of your settings:

**1. Error objects in catch blocks**

In JavaScript, you can write:
```js
} catch (err) {
  console.error(err.message);  // works fine in JS
}
```

In TypeScript, the `err` in a catch block is always typed as `unknown` — because
anything can be thrown in JavaScript (a string, a number, an object), not just
Error objects. TypeScript refuses to assume it has a `.message` property.

The fix is to tell TypeScript explicitly that you know it's an Error:
```ts
} catch (err) {
  console.error((err as Error).message);  // tell TS: "trust me, this is an Error"
}
```

This was required in every controller and in `server.ts`.

**2. Array index access**

With `"noUncheckedIndexedAccess": true` in the config, TypeScript knows that
accessing an array by index (like `rows[0]`) might return `undefined` if the
array is empty. In service files where we do `return rows[0]` after a SQL
query, we added a `!` to tell TypeScript the value is guaranteed to exist:

```ts
return rows[0]!;  // the ! means "I know this won't be undefined"
```

This is safe in these cases because the SQL `RETURNING` clause guarantees a
row comes back if the query succeeds.

### The build process

Node.js cannot run TypeScript directly — it only understands JavaScript. So
TypeScript files need to be compiled to JavaScript before Node can run them.

**How it works (big picture):**

```
┌─────────────────────────────────────────────────────────────────┐
│                        YOUR PROJECT                             │
│                                                                 │
│   src/                        dist/                             │
│   ├── app.ts        tsc  →    ├── app.js                        │
│   ├── server.ts     ───────►  ├── server.js   ──►  Node runs    │
│   └── features/               └── features/                     │
│       └── *.ts                    └── *.js                      │
│                                                                 │
│   ✏️  You write here          ⚙️  Node runs this                │
│   (TypeScript)                (JavaScript)                      │
└─────────────────────────────────────────────────────────────────┘
```

- **`src/`** — where you write your TypeScript source files
- **`tsc`** — the TypeScript compiler that converts `.ts` → `.js`
- **`dist/`** — where the compiled JavaScript files land (do not edit these)

**Development vs Production:**

In development you don't want to wait for a compile step every time you save
a file. That's where `tsx` comes in — it compiles TypeScript in memory and
runs it directly, without writing anything to `dist/`:

```
┌──────────────────────────────────────────────────────────────────────┐
│  DEVELOPMENT (npm run dev)                                           │
│                                                                      │
│  src/*.ts  →  tsx compiles in memory  →  server running              │
│               (nothing written to disk)    (auto-restarts on save)   │
└──────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────┐
│  PRODUCTION (npm start)                                              │
│                                                                      │
│  src/*.ts  →  tsc  →  dist/*.js  →  node dist/server.js              │
│               (writes to disk)       (runs the compiled output)      │
└──────────────────────────────────────────────────────────────────────┘
```

This is why there are two scripts:

```json
"dev":   "tsx watch src/server.ts",   // compiles in memory, auto-restarts on save
"start": "npm run build && node dist/server.js"  // compiles to disk, then runs
```

**Why `src/` was added:**

Before TypeScript, all source files sat at the root of the server folder.
Once you add a build step, you need a clear separation between:

- **Source files** (what you write) → `src/`
- **Compiled output** (what Node runs) → `dist/`

```
❌ Without src/ separation (confusing):        ✅ With src/ separation (clean):
server/                                        server/
  app.ts      ← you write this                  src/
  app.js      ← tsc generated this                app.ts    ← you write this
  server.ts   ← you write this                  dist/
  server.js   ← tsc generated this                app.js    ← tsc generated this
```

Without this separation, the compiled `.js` files would end up mixed in with
your `.ts` source files, which gets confusing fast. The `src/` folder keeps
your source clean, and `dist/` is treated as a throwaway build artifact —
it's in `.gitignore` and gets regenerated every time you build.

## Input Validation with Zod

This project uses **Zod** for runtime input validation on routes that accept
a request body (`POST /orders` and `PUT /cart/1`).

### Why Zod?

TypeScript protects you from yourself — it catches type errors while you are
writing code. But TypeScript types disappear at runtime. Once the server is
actually running, TypeScript has no way to stop bad data coming in from the
outside world.

Zod fills that gap:

```
TypeScript  →  catches bugs in your own code while writing (design time)
Zod         →  catches bad data coming into your API while running (runtime)
```

Without Zod, if someone sends a `POST /orders` with no `items` field, or
sends `items` as a string instead of an array, that bad data passes straight
through to your service and potentially causes a confusing database error.
With Zod, you catch it immediately at the entry point and return a clear
`400 Bad Request` before anything else runs.

### Install

```bash
npm install zod
```

### How Zod checks data at runtime

You define a **schema** — a description of what shape you expect:

```ts
import { z } from "zod";

const OrderSchema = z.object({
  items: z.array(z.unknown()),  // must be an array
});
```

Then call `safeParse` on the incoming request body:

```ts
const result = OrderSchema.safeParse(req.body);
```

Zod checks every field against the schema and returns one of two shapes:

```ts
// If valid:
{ success: true, data: { items: [...] } }

// If invalid:
{ success: false, error: ZodError }
```

### What errors it returns to the client

If validation fails, you send back a `400 Bad Request` with a description
of exactly what was wrong:

```ts
if (!result.success) {
  res.status(400).json({ error: result.error.format() });
  return;
}
```

For example, if someone sends `{ "items": "not an array" }`, the client gets:

```json
{
  "error": {
    "items": {
      "_errors": ["Expected array, received string"]
    }
  }
}
```

This is much more useful than a generic `500 Internal Server Error` — the
client knows exactly what they did wrong and how to fix it.

There are two different error types in this project, and they are handled
separately:

```
Bad input from the client  →  Zod catches it  →  returns 400 (client's fault)
Something broke on server  →  try/catch        →  returns 500 (server's fault)
```

### How it's used in this project

Zod is used in the controller, before the request body is passed to the
service. The schema is defined at the top of the controller file:

```ts
import { z } from "zod";
import * as service from "./service.js";

const OrderSchema = z.object({
  items: z.array(z.unknown()),
});

export async function createOrder(req, res) {
  // 1. Validate the request body first
  const result = OrderSchema.safeParse(req.body);
  if (!result.success) {
    res.status(400).json({ error: result.error.format() });
    return;  // stop here — don't pass bad data to the service
  }

  // 2. Only reaches here if validation passed
  try {
    const order = await service.createOrder(result.data);
    res.status(201).json(order);
  } catch (err) {
    console.error("createOrder error:", (err as Error).message);
    res.status(500).json({ error: "Failed to create order" });
  }
}
```

### Zod + TypeScript together

One of the biggest benefits of Zod with TypeScript is that you can infer a
TypeScript type directly from the schema — so you don't need to define the
type separately:

```ts
// Without Zod — you define the type manually:
type OrderBody = {
  items: unknown[];
};

// With Zod — TypeScript infers the type from the schema automatically:
const OrderSchema = z.object({
  items: z.array(z.unknown()),
});
type OrderBody = z.infer<typeof OrderSchema>;  // same result, no duplication
```

This means your schema and your TypeScript type are always in sync — if you
change the schema, the type updates automatically.

### Where to use Zod in a project

Zod is worth adding anywhere data enters your server from the outside:

- **POST and PUT request bodies** — the most important place, used in this project
- **URL parameters** — e.g. validating `:id` is the right format before hitting the DB
- **Query strings** — e.g. `?page=1&limit=10` where you need numbers not strings
- **Environment variables** — validating your `.env` has all required values at startup

GET routes with no body don't need Zod since there's no incoming data to validate.

## API Documentation (Swagger)

This project uses **swagger-autogen** and **swagger-ui-express** to generate
and serve interactive API documentation at `/docs`.

![swagger screenshot](./server/images/swagger.png)

### How it works

swagger-autogen scans all route files and automatically generates a
`swagger-output.json` spec file. swagger-ui-express then serves that spec
as an interactive UI where you can browse and test every endpoint.

For simple GET routes, autogen handles everything automatically. For POST
and PUT routes — where the request body shape matters — manual `#swagger`
comments are added directly in the route handler to document what data is
expected and what comes back.

```ts
// Example of a manually documented POST route
router.post("/", (req, res) => {
  /*
    #swagger.summary = 'Create a new order'
    #swagger.requestBody = {
      required: true,
      content: {
        "application/json": {
          schema: {
            type: "object",
            properties: {
              items: { type: "array", example: ["pizza_1", "pizza_2"] }
            }
          }
        }
      }
    }
  */
  createOrder(req, res);
});
```

![swagger manual screenshot](./server/images/swagger-manual.png)

### Generating the docs

Run this script whenever you add a new route or update a manual comment:

```bash
npm run swagger
```

This regenerates `swagger-output.json`. The server reads that file at
startup — no need to restart after regenerating.

### Viewing the docs

Start the server and open:

```
http://localhost:3000/docs
```

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
    ├── src/                    ← all TypeScript source files live here
    │   ├── app.ts              ← Express app: middleware + router mounts
    │   ├── server.ts           ← entry point: DB check + start listening
    │   ├── swagger.ts          ← generates swagger-output.json
    │   ├── db/
    │   │   └── pool.ts         ← shared pg connection pool
    │   └── features/
    │       ├── pizzas/
    │       ├── specials/
    │       ├── contactCards/
    │       ├── testimonials/
    │       ├── cart/
    │       └── orders/
    ├── dist/                   ← compiled JS output (do not edit, gitignored)
    ├── swagger-output.json     ← auto-generated API spec (do not edit manually)
    ├── .env                    ← DATABASE_URL + PORT (not committed)
    ├── .env.example            ← template showing required variables
    ├── db/
    │   ├── 001_create_tables.sql  ← CREATE TABLE statements
    │   └── 002_seed_data.sql     ← truncates tables + inserts demo data
    ├── tsconfig.json           ← TypeScript compiler configuration
    └── package.json
```

### Why app.ts and server.ts are separate

`app.ts` creates and configures the Express app and exports it. `server.ts`
imports that app, verifies the database connection, and starts listening on
a port. The benefit is that `app.ts` can be imported in a test suite without
actually binding to a port — tests get a fully configured app they can send
requests to without starting a real server.

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
PORT=3000
```

Copy `server/.env.example` to `server/.env` and fill in your values.
This file is gitignored and must never be committed.

### client/.env

```
VITE_API_BASE_URL=http://localhost:3000
```

This tells the React app where to send fetch requests during development.

### Why environment variables matter

If you hardcode `http://localhost:3000` directly into your React app,
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

You need a PostgreSQL database. You have two options:

**Option A: Use a cloud database (Render, Supabase, Neon, Railway, etc.)**
Just set `DATABASE_URL` in your `server/.env` and skip the local install steps below.

**Option B: Install PostgreSQL locally**

*Postgres.app (Mac, recommended)*
1. Download from [postgresapp.com](https://postgresapp.com)
2. Open it and click **Initialize**

*Homebrew*
```bash
brew install postgresql@16
brew services start postgresql@16
```

### Start the backend

```bash
cd server
npm install
```

You need to run the SQL files to create the tables and seed the data. You have two options:

**Option A: Command line**

For a local database:
```bash
createdb moonlight_pizza
psql -d moonlight_pizza -f db/001_create_tables.sql
psql -d moonlight_pizza -f db/002_seed_data.sql
```

For a cloud database like Neon, use the full connection string instead:
```bash
psql $DATABASE_URL -f db/001_create_tables.sql
psql $DATABASE_URL -f db/002_seed_data.sql
```

**Option B: Query editor**

Copy the contents of each file and paste into your database tool's query editor
— Neon's built-in SQL editor, TablePlus, or any other PostgreSQL client.
Run `001_create_tables.sql` first, then `002_seed_data.sql`.

```bash
# generate the swagger docs (run any time routes change)
npm run swagger

# start the server (use npm run dev for auto-restart during development)
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
-   API → http://localhost:3000
-   API Docs → http://localhost:3000/docs

## npm Scripts (server)

| Script | Command | What it does |
|--------|---------|--------------|
| `npm start` | `npm run build && node dist/server.js` | Compile TypeScript then start the server |
| `npm run build` | `tsc` | Compile all `.ts` files in `src/` to `.js` files in `dist/` |
| `npm run dev` | `tsx watch src/server.ts` | Run TypeScript directly in memory with auto-restart on file changes |
| `npm run swagger` | `tsx src/swagger.ts` | Regenerate swagger-output.json from routes |

## How the Frontend Calls the API

All fetch calls are centralized in `client/src/lib/api.js`:

```js
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

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
-   Write integration tests for the API routes (Jest + Supertest)
-   Write end-to-end tests to verify the frontend and backend work together (Playwright)