# Integrating PostgreSQL Into Your REST API

Up until now your Express routes have been returning hardcoded data. In this doc you'll connect your API to a real PostgreSQL database so your application can store and retrieve actual data.

By the end you will understand:
- How a request travels from the frontend all the way to the database and back
- What a **service layer** is and why it exists
- How to connect Node.js to PostgreSQL using the `pg` library
- How to wire everything together in a complete working example

## The Big Picture — How a Request Flows Through Your App

Before writing any code, it helps to understand the full journey a request takes through your application.

Here's what happens when a user clicks "Load Users" in a React frontend:

```
  User clicks button
        │
        │  GET /api/users
        ▼
  ┌─────────────┐
  │   React     │  Frontend — sends the HTTP request
  │  Frontend   │
  └──────┬──────┘
         │
         │  HTTP Request
         ▼
  ┌─────────────┐
  │    Route    │  Receives the request, decides which
  │             │  controller function to call
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │ Controller  │  Handles the request — reads params,
  │             │  validates input, calls a service
  └──────┬──────┘
         │
         ▼
  ┌─────────────┐
  │   Service   │  Does the real work — runs the SQL
  │             │  query, returns data to the controller
  └──────┬──────┘
         │
         │  SQL Query
         ▼
  ┌─────────────┐
  │ PostgreSQL  │  Stores and returns the data
  │  Database   │
  └──────┬──────┘
         │
         │  Data flows back up the chain
         ▼
  Response sent back to React frontend
```

Each box is a **layer** of your application. Each layer has one job and one job only. This separation is what keeps your code clean and maintainable as your app grows.

## Why So Many Layers?

You might be wondering — why not just put the database query directly in the route? You could, and it would work. But as your app grows it becomes a mess.

Here's a quick comparison:

| Approach | What it looks like | Problem |
|----------|-------------------|---------|
| Everything in the route | Route reads params, validates, queries DB, sends response | Hard to test, hard to reuse, hard to read |
| Controller + Service | Controller handles request/response, Service handles DB | Clean, reusable, easy to test each piece separately |

Think of it like a restaurant:

```
  Customer (React)      →  places an order
  Waiter (Route)        →  takes the order to the kitchen
  Head Chef (Controller)→  decides what needs to be made
  Line Cook (Service)   →  actually prepares the food
  Fridge (PostgreSQL)   →  where the ingredients are stored
```

Nobody expects the waiter to also cook the food. Same principle applies to your code.

## Your Project File Structure

Before diving into each layer, here's where each piece lives in your project:

```
my-app/
│
├── src/
│   ├── db/
│   │   └── pool.js           ← database connection (created once)
│   │
│   ├── routes/
│   │   └── userRoutes.js     ← defines API endpoints
│   │
│   ├── controllers/
│   │   └── userController.js ← handles requests and responses
│   │
│   ├── services/
│   │   └── userService.js    ← runs SQL queries
│   │
│   ├── logger.js             ← Winston logger (from the logging doc)
│   └── server.js             ← starts the Express app
│
├── .env                      ← your database connection string
└── package.json
```

Each folder maps directly to a layer in the architecture diagram above. When you add a new feature (e.g. posts, comments), you add a new file in each folder — not a new mess of code in one giant file.

## Layer 1 — The Route

Routes define which URLs your backend supports and which controller function handles each one.

```js
// src/routes/userRoutes.js
import express from "express";
import { getUsers, getUserById } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);        // GET /api/users
router.get("/:id", getUserById);  // GET /api/users/42

export default router;
```

Routes should be kept simple. Their only job is:
- Define the URL and HTTP method
- Point to the right controller function

> **Think of routes as:** the entry points into your backend API. Nothing more.

---

## Layer 2 — The Controller

Controllers receive the request from the route and decide what should happen next.

A controller:
- Reads data from the request (`req.params`, `req.body`, `req.query`)
- Calls the appropriate service function
- Sends the response back to the client

```js
// src/controllers/userController.js
import * as userService from "../services/userService.js";
import logger from "../logger.js"; // Winston logger from the logging doc

export async function getUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
}
```

Notice the controller **does not write any SQL**. It doesn't know or care how the data is fetched — it just calls the service and sends back whatever comes out.

> **Think of controllers as:** the manager that handles requests and responses, but delegates the actual work.

## Layer 3 — The Service

The service layer is where the real work happens. This is where your SQL queries live.

A service:
- Talks directly to the database
- Runs queries
- Returns data to the controller

```js
// src/services/userService.js
import { query } from "../db/pool.js";

export async function getAllUsers() {
  const result = await query("SELECT * FROM users ORDER BY id");
  return result.rows;
}

export async function getUserById(id) {
  const result = await query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0]; // returns one user or undefined
}
```

By putting database code here instead of in controllers, you can:
- Reuse the same query from multiple controllers
- Test your database logic independently
- Swap out the database later without touching controllers

> **Think of services as:** the worker that performs the real work behind the scenes.

## Connecting to PostgreSQL — The `pg` Library

Your service layer needs a way to actually talk to PostgreSQL. In Node.js, the standard tool for this is the **`pg` library** — the official PostgreSQL driver.

### Why `pg`?

There are several tools available for connecting Node.js to PostgreSQL:

| Tool | Type | Best For |
|------|------|----------|
| **`pg`** ← recommended | Native driver | Learning SQL, full control, lightweight |
| **Knex** | Query builder | Building queries with JavaScript syntax |
| **Sequelize** | ORM | Object-style data access |
| **Prisma** | Modern ORM | TypeScript projects, rapid development |

For this course we use **`pg`** because:
- It gives you full visibility into the SQL being executed — nothing is hidden
- It's the foundation that other tools like Knex and Prisma are built on top of
- Understanding `pg` means you understand what ORMs are doing for you
- It's lightweight and extremely widely used in production

Once you're comfortable with `pg` and raw SQL, switching to an ORM later is straightforward because you'll understand what's happening under the hood.

### What Is a Connection Pool?

When your server receives many requests at once, each one needs to query the database. Opening a fresh database connection for every single request is slow and expensive.

A **connection pool** solves this by keeping a set of connections open and ready to use:

```
  Incoming Requests
  ┌──────┐ ┌──────┐ ┌──────┐
  │ Req1 │ │ Req2 │ │ Req3 │
  └──┬───┘ └──┬───┘ └──┬───┘
     │        │        │
     ▼        ▼        ▼
  ┌────────────────────────────┐
  │      Connection Pool       │
  │  ┌────┐ ┌────┐ ┌────┐      │
  │  │Con1│ │Con2│ │Con3│ ...  │  ← connections stay open
  │  └────┘ └────┘ └────┘      │
  └────────────────────────────┘
              │
              ▼
        PostgreSQL
```

Instead of opening and closing a connection on every request, the pool lends a connection to each request and returns it when done. This is much faster.

### Setting Up the Connection Pool

```bash
npm install pg
```

Add your database connection string to `.env`:

```bash
DATABASE_URL=postgresql://username:password@host:5432/mydatabase
```

Create the pool file — this is created **once** and shared across all services:

```js
// src/db/pool.js
import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection when the server starts.
// If the database is unreachable, crash immediately with a clear error
// rather than silently starting up broken.
pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1); // crash the server — a broken DB connection is not recoverable
  });

export const query = (text, params) => pool.query(text, params);
```

Now any service file can import `query` and run SQL:

```js
import { query } from "../db/pool.js";

const result = await query("SELECT * FROM users");
```

### What Happens If the Database Is Down?

This is something beginners often discover the hard way. If PostgreSQL is unreachable when your server starts — wrong connection string, database not running, network issue — your server will start up and appear to work fine, but every request that touches the database will fail with a confusing error.

The `process.exit(1)` in the pool setup above prevents this. If the database can't be reached on startup, the server crashes immediately with a clear error message rather than silently starting up broken.

```
  Database unreachable on startup:

  Server starts
        │
        ▼
  pool.connect() fails
        │
        ▼
  console.error("Database connection failed: ...")
        │
        ▼
  process.exit(1)  ← server stops immediately with a clear error
```

This is the right behaviour — a server that can't reach its database shouldn't pretend to be working.

## Wiring It All Together — A Complete Example

Here's a complete working example of all four layers handling a `GET /api/users` request.

### The `.env` file

```bash
DATABASE_URL=postgresql://username:password@host:5432/mydatabase
```

### `src/db/pool.js` — Database Connection

```js
import pkg from "pg";
import "dotenv/config";

const { Pool } = pkg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Test the connection when the server starts.
// If the database is unreachable, this logs the error loudly
// so you know immediately rather than discovering it on the first request.
pool.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1); // crash the server — a broken DB connection is not recoverable
  });

export const query = (text, params) => pool.query(text, params);
```

### `src/services/userService.js` — SQL Queries

```js
import { query } from "../db/pool.js";

export async function getAllUsers() {
  const result = await query("SELECT * FROM users ORDER BY id");
  return result.rows;
}

export async function getUserById(id) {
  const result = await query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0];
}

export async function createUser(name, email) {
  const result = await query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
  return result.rows[0];
}
```

### `src/controllers/userController.js` — Request Handling

```js
import * as userService from "../services/userService.js";
import logger from "../logger.js"; // Winston logger from the logging doc

export async function getUsers(req, res) {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Failed to fetch users" });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Failed to fetch user" });
  }
}

export async function createUser(req, res) {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email required" });
    }
    const user = await userService.createUser(name, email);
    res.status(201).json(user);
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Failed to create user" });
  }
}
```

### `src/routes/userRoutes.js` — API Endpoints

```js
import express from "express";
import { getUsers, getUserById, createUser } from "../controllers/userController.js";

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", createUser);

export default router;
```

### `src/server.js` — The Express App

```js
import express from "express";
import "dotenv/config";
import "./db/pool.js"; // import pool first to test the DB connection on startup
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
```

> Importing `pool.js` at the top of `server.js` guarantees the database connection is tested the moment the server starts — before any requests arrive. Without this import, the connection test would only run the first time a service file is used, which could be too late to catch a bad connection string.

### What Happens When a Request Arrives

Let's trace a `GET /api/users/42` request through every layer:

```
  1. React sends:  GET /api/users/42
                          │
  2. Route receives it:   router.get("/:id", getUserById)
                          │
  3. Controller runs:     getUserById(req, res)
                          reads req.params.id → "42"
                          calls userService.getUserById("42")
                          │
  4. Service runs:        SELECT * FROM users WHERE id = $1  [42]
                          │
  5. PostgreSQL returns:  { id: 42, name: "Alice", email: "alice@email.com" }
                          │
  6. Service returns:     the user object to the controller
                          │
  7. Controller sends:    res.json({ id: 42, name: "Alice", ... })
                          │
  8. React receives:      the user data and renders it
```

## Parameterized Queries — Why `$1` Instead of String Interpolation

You may have noticed the queries use `$1`, `$2` instead of putting values directly in the string:

```js
// ✅ Safe — parameterized query
await query("SELECT * FROM users WHERE id = $1", [id]);

// ❌ Dangerous — never do this
await query(`SELECT * FROM users WHERE id = ${id}`);
```

The dangerous version is vulnerable to **SQL injection** — an attacker could send a crafted value that changes the meaning of the query entirely. Parameterized queries prevent this because the database treats the values as pure data, never as SQL.

This was covered in the security doc — it's worth remembering every time you write a query.

## The Other Database Tools

For completeness, here's how the same `getAllUsers` query looks in each of the other tools. You don't need to learn these now — but it's useful to recognise them when you encounter them in other projects.

### Knex

```js
const users = await db("users").select("*").orderBy("id");
```

### Sequelize

```js
const users = await User.findAll({ order: [["id", "ASC"]] });
```

### Prisma

```js
const users = await prisma.user.findMany({ orderBy: { id: "asc" } });
```

All four produce the same SQL under the hood:

```sql
SELECT * FROM users ORDER BY id;
```

The difference is how much SQL you write yourself vs how much the library generates for you. `pg` makes you write it all — which means you learn the most.

### Comparison — Which Tool Should You Use?

| | **pg** | **Knex** | **Sequelize** | **Prisma** |
|---|---|---|---|---|
| **Type** | Native driver | Query builder | ORM | Modern ORM |
| **You write** | Raw SQL | JavaScript that generates SQL | JavaScript models | Schema file + generated client |
| **SQL visibility** | ✅ Full — you see everything | ✅ Mostly visible | ⚠️ Hidden behind models | ⚠️ Hidden behind client |
| **Control over queries** | ✅ Complete | ✅ High | ⚠️ Medium | ⚠️ Medium |
| **TypeScript support** | ⚠️ Manual | ⚠️ Partial | ⚠️ Partial | ✅ Excellent |
| **Migrations** | ❌ Manual | ✅ Built-in | ✅ Built-in | ✅ Built-in |
| **Learning curve** | Low | Medium | Medium-High | Medium |
| **Performance** | ✅ Fastest | ✅ Fast | ⚠️ Overhead | ⚠️ Overhead |
| **Best for** | Learning, full control | Structured queries without full ORM | Model-heavy apps, older codebases | TypeScript projects, rapid development |

**Use `pg` when** you want to learn how databases actually work, you need maximum control, or you're building something where raw SQL performance matters.

**Use `Knex` when** you want structured query-building without giving up SQL understanding, or you need migrations without a full ORM.

**Use `Sequelize` when** you're joining an existing project that already uses it, or you prefer working entirely in JavaScript models without writing SQL.

**Use `Prisma` when** you're building a TypeScript project, you want excellent developer tooling and auto-completion, or you're working in a team that values strict type safety.

## Summary

Modern backend applications are organized into layers so each piece of code has one clear responsibility.

```
Client (React)
      │  HTTP Request
      ▼
   Route          → defines the URL and method
      │
      ▼
  Controller      → handles request, calls service, sends response
      │
      ▼
   Service        → runs SQL queries, returns data
      │  SQL
      ▼
  PostgreSQL      → stores and returns data
```

Each layer maps to a file in your project:

```
src/
├── db/pool.js           ← database connection
├── routes/              ← Layer 1: URL definitions
├── controllers/         ← Layer 2: request/response handling
├── services/            ← Layer 3: SQL queries
├── logger.js            ← Winston logger
└── server.js            ← app entry point
```

Key principles to remember:

- **Controllers never talk to the database directly** — they always go through a service
- **Services never handle HTTP** — they only deal with data
- **The pool is created once** and shared across all services
- **Import `pool.js` in `server.js`** to guarantee the DB connection is tested on startup
- **Always use parameterized queries** — never string interpolation
- **`pg` is the recommended starting point** — it keeps SQL visible and builds real understanding

### Next Topics to Explore

#### 🍃 [Using MongoDB](7-mongodb.md)  
Understand how document databases work using MongoDB, including collections, documents, fields, and how data can be stored in flexible JSON-like structures.

#### 🔌 [Connecting APIs to MongoDB](8-mongodb-service.md)  
Learn how to connect your API to MongoDB and use tools like Mongoose to create models, run queries, and manage application data.

#### 🚀 [Deployment](9-deployment.md)  
Learn how to deploy your REST API to the cloud with a live database, including environment configuration, hosting platforms, and making your backend accessible in production.