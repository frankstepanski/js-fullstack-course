# Connecting Your API to PostgreSQL

You already know how routes, controllers, services, and models fit together. Now it's time to replace the in-memory arrays with a real database. This document walks you through connecting to PostgreSQL step by step — starting from "does it even connect?" all the way to a full working API.

## Why You Need a Library to Talk to a Database

You might wonder — why can't Node.js just talk to PostgreSQL directly? Can't you just open a connection somehow and send SQL?

The short answer is: PostgreSQL is a completely separate program running on your computer (or a server). It has its own network protocol — its own language for sending and receiving data over a connection. Node.js has no built-in understanding of that protocol.

A **database library** sits in between and handles all of that for you:

```
WITHOUT a library
══════════════════════════════════════════════════════════

  Your Node app                    PostgreSQL
  ─────────────────                ─────────────────────
  "I want all users"               speaks its own binary
                                   network protocol
        │
        │   ❌ Node has no idea how to speak
        │      PostgreSQL's protocol
        │
        ✖ no connection possible


WITH a library (e.g. pg)
══════════════════════════════════════════════════════════

  Your Node app       pg library           PostgreSQL
  ─────────────────   ──────────────────   ─────────────────
  pool.query(         translates your      receives proper
  "SELECT *           JS call into         protocol message,
   FROM users"  ───►  PostgreSQL's    ───► runs the query,
  )                   binary protocol      sends results back
        │                                        │
        │             translates the    ◄────────┘
        │◄──────────  results back
        │             into JS objects
  result.rows
  [{ id: 1, name: "Alice" }]
```

The library also manages the connection itself — opening it, keeping it alive, handling errors, and closing it cleanly. Without it you'd have to implement all of that yourself.

## Which Library Should You Use?

There are four main libraries the Node.js community uses to talk to PostgreSQL. They sit at very different levels of abstraction — from writing raw SQL yourself all the way to never writing SQL at all.

```
ABSTRACTION LEVELS
══════════════════════════════════════════════════════════

  Raw SQL                                    No SQL
  (you write everything)          (library writes everything)
       │                                          │
       ▼                                          ▼
  ┌─────────┐   ┌─────────────┐   ┌────────────────┐   ┌────────┐
  │   pg    │   │    Knex     │   │   Sequelize    │   │ Prisma │
  └─────────┘   └─────────────┘   └────────────────┘   └────────┘
  Raw driver    Query builder      Full ORM               Modern ORM
```

### pg — Raw SQL Driver

`pg` is the lowest-level option. It's just a thin layer that connects to PostgreSQL and lets you send raw SQL strings. You write every query yourself.

```js
// pg — you write the SQL
const result = await pool.query(
  "SELECT * FROM users WHERE id = $1",
  [id]
);
```

**When to use it:**
- Learning — seeing the exact SQL helps you understand what's happening
- Simple scripts or tools where you want full control
- Projects where the SQL is highly complex and you don't want a library interfering

**When not to use it in production:**
- You have to write every query by hand — tedious for large apps
- No built-in protection against common mistakes
- Managing lots of queries across many files gets messy fast

---

### Knex — Query Builder

Knex sits one level above `pg`. Instead of writing SQL strings, you use JavaScript methods that *build* SQL for you. It still generates raw SQL under the hood, but you compose it in a more readable way.

```js
// Knex — JavaScript methods that build SQL
const users = await knex("users")
  .where("id", id)
  .select("*");

// Knex translates this to: SELECT * FROM users WHERE id = ?
```

**When to use it:**
- You want more safety than raw `pg` but still want to stay close to SQL
- Your queries are complex but you don't want to write raw strings
- You need to support multiple databases (Knex works with PostgreSQL, MySQL, SQLite)
- You want built-in query building with migrations included

**When not to use it:**
- If you want full abstraction and don't want to think about SQL at all (use an ORM instead)

---

### Sequelize — Traditional ORM

Sequelize is a full **ORM** (Object-Relational Mapper). You define JavaScript classes that represent your database tables, and Sequelize generates all the SQL automatically. You rarely write SQL at all.

```js
// Sequelize — define a model as a JS class
const User = sequelize.define("User", {
  name:  DataTypes.STRING,
  email: DataTypes.STRING,
});

// Then query using methods — no SQL written
const user = await User.findByPk(id);
const users = await User.findAll();
```

**When to use it:**
- You have a large app with many models and want everything managed for you
- Your team is more comfortable with JavaScript objects than SQL
- You need associations between models (hasMany, belongsTo, etc.) handled automatically
- You want built-in validation, hooks, and migrations

**When not to use it:**
- It has a steep learning curve and a large API surface
- Generated SQL can be inefficient for complex queries
- Harder to optimise when you know exactly what SQL you need

---

### Prisma — Modern ORM

Prisma is the newest of the four and has become extremely popular. You define your database schema in a dedicated `schema.prisma` file, and Prisma generates a fully type-safe client. It's designed to work seamlessly with TypeScript.

```prisma
// schema.prisma — define your schema here
model User {
  id        Int      @id @default(autoincrement())
  name      String
  email     String   @unique
  createdAt DateTime @default(now())
}
```

```js
// Then query with a generated client — full autocomplete, type safety
const user = await prisma.user.findUnique({ where: { id } });
const users = await prisma.user.findMany();
```

**When to use it:**
- You're using TypeScript (Prisma is built for it)
- You want the best developer experience — autocomplete, type safety, readable syntax
- You're starting a new project and want modern tooling
- You want schema-first design where the schema file is the single source of truth

**When not to use it:**
- Legacy projects already using another ORM
- Projects where raw SQL performance is critical
- Teams not using TypeScript (Prisma works with JS but shines with TS)

---

### Side-by-Side Comparison

| | `pg` | Knex | Sequelize | Prisma |
|--|------|------|-----------|--------|
| **What you write** | Raw SQL strings | JS methods that build SQL | JS model methods | JS methods on generated client |
| **SQL knowledge needed** | ✅ Yes — you write it all | Partial — helps you build it | Minimal | Minimal |
| **Type safety** | ❌ None | Partial | Partial | ✅ Full (TypeScript) |
| **Schema definition** | In the database | In the database + migrations | In JS model files | In `schema.prisma` file |
| **Best for** | Learning, scripts, full control | Complex queries, multi-DB apps | Large JS apps with many models | Modern TypeScript projects |
| **Learning curve** | Low | Medium | High | Medium |

---

### Why This Document Uses `pg`

Even though you'd likely use Prisma or Sequelize in a real project, this document uses `pg` deliberately — because it makes the connection between your code and the database completely transparent.

When you write `pool.query("SELECT * FROM users WHERE id = $1")` you can see exactly what SQL is running. There's no magic, no generated code, no abstraction to see through. You write SQL, it runs SQL.

Once you understand how raw queries work — what `SELECT`, `INSERT`, `UPDATE`, and `DELETE` actually do, how parameterized queries protect you, how `result.rows` comes back — switching to Prisma or Sequelize becomes much easier. You'll understand what those libraries are doing for you instead of just copying patterns you don't understand.

```
Learn with pg               Then move to Prisma / Sequelize
════════════════════         ════════════════════════════════

  You see every query         Library generates queries for you
  You understand the SQL      You understand what it's doing
  No magic                    The magic makes sense
```

In short: **use `pg` to learn, use Prisma or Sequelize to ship**.

## 1. Installing the pg Library

Node.js talks to PostgreSQL through a library called **pg** (short for node-postgres). It's the standard way to send SQL queries from a Node app.

```bash
npm install pg
```

That's the only package you need for now.

## 2. Creating a Database Connection

The `pg` library gives you two ways to connect: a single `Client` or a `Pool`. You almost always want a **Pool**.

```
Single Client                    Pool
─────────────────────────        ─────────────────────────
One connection                   Multiple connections ready
You manage open/close            Managed automatically
Fine for scripts                 Right choice for APIs

When your API handles many requests at the same time,
a Pool keeps several connections open and reuses them.
A single Client would make every request wait in line.
```

Create a file called `db.js` in the root of your project:

```js
// db.js
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host:     "localhost",
  port:     5432,
  database: "myapp",       // your database name
  user:     "postgres",    // your postgres username
  password: "yourpassword" // your postgres password
});

export default pool;
```

This file creates one pool and exports it. Every other file that needs to talk to the database imports this same pool — you never create multiple pools.

```
your project
     │
     ├── db.js              ← one pool, created once
     │
     ├── models/User.js     ← imports pool from db.js
     ├── models/Post.js     ← imports pool from db.js
     └── models/Product.js  ← imports pool from db.js

One pool. Many importers. Never re-created.
```

## 3. Testing the Connection

Before writing any routes, verify that your app can actually reach the database. Add this to the bottom of `db.js`:

```js
// db.js
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  host:     "localhost",
  port:     5432,
  database: "myapp",
  user:     "postgres",
  password: "yourpassword"
});

// Test the connection when the file is first loaded
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Failed to connect to PostgreSQL:", err.message);
  } else {
    console.log("✅ Connected to PostgreSQL");
    release(); // return the connection back to the pool
  }
});

export default pool;
```

Now start your server:

```bash
node server.js
```

You should see one of two things in your terminal:

```
✅ Connected to PostgreSQL
```

or

```
❌ Failed to connect to PostgreSQL: password authentication failed for user "postgres"
```

**If you see an error**, the message tells you what's wrong:

| Error message | What it means | Fix |
|--------------|---------------|-----|
| `password authentication failed` | Wrong username or password | Check your postgres credentials |
| `database "myapp" does not exist` | Database hasn't been created yet | Run `CREATE DATABASE myapp;` in psql |
| `connect ECONNREFUSED` | PostgreSQL isn't running | Start the PostgreSQL service |
| `role "postgres" does not exist` | Wrong username | Check your postgres username with `\du` in psql |

Don't move forward until you see the green checkmark. Everything else depends on this working.

## 4. Sending Your First Query

Once connected, the next step is sending a real SQL query and confirming it ran — even before worrying about routes or responses.

Add a test query directly in `db.js` just to prove it works:

```js
// db.js — temporary test, remove this after confirming it works
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Failed to connect:", err.message);
    return;
  }

  console.log("✅ Connected to PostgreSQL");

  // Send a test query
  client.query("SELECT NOW() AS current_time", (queryErr, result) => {
    release(); // always release the client back to the pool

    if (queryErr) {
      console.error("❌ Query failed:", queryErr.message);
    } else {
      console.log("✅ Query worked. Database time:", result.rows[0].current_time);
    }
  });
});
```

`SELECT NOW()` asks the database for its current time. It's harmless, needs no table, and proves your queries are actually reaching PostgreSQL.

When you start your server you should now see:

```
✅ Connected to PostgreSQL
✅ Query worked. Database time: 2024-01-15T10:32:45.123Z
```

Once you see both lines, remove the test query from `db.js`. You've confirmed the connection works — now you don't need it anymore.

## 5. Setting Up a Test Table

Before writing routes, create a simple table to work with. Open `psql` or any PostgreSQL client and run:

```sql
CREATE TABLE users (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  email      VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Add some test data
INSERT INTO users (name, email) VALUES
  ('Alice', 'alice@example.com'),
  ('Bob',   'bob@example.com'),
  ('Carol', 'carol@example.com');
```

Now you have something real to query.

---

## 6. All HTTP Methods in One Route File

> 📝 **Note to reader:** The examples below put all the database logic directly inside the route handlers — no controllers, services, or models. This is intentional. Mixing everything together in one place makes it easier to see the direct connection between an HTTP request and its SQL query without jumping between files. Once you understand how each pairing works, the final section shows you how to split it all out properly.

### Folder structure for this section:

```
my-api/
├── db.js
├── server.js
└── routes/
    └── users.js    ← everything goes here for now
```

**server.js**
```js
import express from "express";
import userRoutes from "./routes/users.js";

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
```

---

### GET all users → SELECT *

The most basic query — get everything from the table.

```js
// routes/users.js
import express from "express";
import pool from "../db.js";

const router = express.Router();

// GET /api/users
// SQL: SELECT * FROM users
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows); // result.rows is always an array
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

`result.rows` is the array of records the database returned. If the table is empty, it's `[]`. If there are three users, it's an array of three objects.

```
GET /api/users
      │
      ▼
SELECT * FROM users
      │
      ▼
result.rows → [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob",   email: "bob@example.com"   },
  { id: 3, name: "Carol", email: "carol@example.com" }
]
      │
      ▼
res.json(result.rows) ✅
```

---

### GET one user → SELECT WHERE id

To get a single record, you filter by ID using a `WHERE` clause.

```js
// GET /api/users/:id
// SQL: SELECT * FROM users WHERE id = $1
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id] // ← the $1 gets replaced with this value
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]); // rows[0] because we only expect one user
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

**What is `$1`?**

`$1` is a **parameterized query** placeholder. Instead of building the SQL string yourself like `"WHERE id = " + id` (which is dangerous — it opens you up to SQL injection attacks), you pass the value separately in an array. PostgreSQL replaces `$1` with the first value in that array, `$2` with the second, and so on.

```
Never do this:
  "SELECT * FROM users WHERE id = " + req.params.id  ❌ SQL injection risk

Always do this:
  "SELECT * FROM users WHERE id = $1", [req.params.id]  ✅ safe
```

---

### GET with query parameter → SELECT WHERE field

Query parameters (`?name=alice`) are used for filtering, searching, or sorting. They come from `req.query`.

> ⚠️ **Route order matters here.** This route must be added to your router file *before* the `/:id` route. If `/:id` comes first, Express will treat the word "search" as an ID and call the wrong handler. Always put specific routes before dynamic ones:
>
> ```js
> router.get("/search", ...)  // ✅ specific — must come first
> router.get("/:id", ...)     // dynamic — must come after
> ```

```js
// GET /api/users?name=alice
// SQL: SELECT * FROM users WHERE name ILIKE $1
router.get("/search", async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: "name query parameter is required" });
    }

    const result = await pool.query(
      "SELECT * FROM users WHERE name ILIKE $1",
      [`%${name}%`]
    );

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

**What is `ILIKE`?**

When you search for a name, you don't want to force the user to type the exact case. `ILIKE` is PostgreSQL's **case-insensitive** pattern matching operator — it finds partial matches regardless of uppercase or lowercase.

Regular `=` only finds exact matches:

```sql
WHERE name = 'alice'   -- only matches "alice", not "Alice" or "ALICE"
```

`LIKE` finds partial matches but is case-sensitive:

```sql
WHERE name LIKE '%ali%'  -- matches "alice" but not "Alice" or "ALICE"
```

`ILIKE` finds partial matches and ignores case — which is almost always what you want for a search:

```sql
WHERE name ILIKE '%ali%'  -- matches "alice", "Alice", "ALICE", "Talia"
```

**What is `%`?**

`%` is a wildcard — it means "anything can go here". Where you place it changes what gets matched:

| Pattern | Matches |
|---------|---------|
| `'%ali%'` | anything *containing* "ali" anywhere |
| `'ali%'` | anything *starting with* "ali" |
| `'%ali'` | anything *ending with* "ali" |

So `%${name}%` wraps the search term in wildcards on both sides, meaning the user's input can appear anywhere in the name field.

```
GET /api/users/search?name=ali
        │
        ▼
SELECT * FROM users WHERE name ILIKE '%ali%'
        │
        ├── "Alice"  ✅  contains "ali" (case ignored)
        ├── "ALICE"  ✅  contains "ALI" (case ignored)
        ├── "Talia"  ✅  contains "ali" in the middle
        └── "Bob"    ❌  doesn't contain "ali"
        │
        ▼
result.rows → [{ id: 1, name: "Alice", email: "alice@example.com" }]
```

> 💡 `ILIKE` is PostgreSQL-specific. MySQL and SQLite don't have it — in those databases you'd write `LOWER(name) LIKE LOWER($1)` to get the same effect.

---

### POST → INSERT

Creating a new record uses an `INSERT` statement. The data comes from `req.body`.

```js
// POST /api/users
// SQL: INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *
router.post("/", async (req, res) => {
  try {
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required" });
    }

    const result = await pool.query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );

    res.status(201).json(result.rows[0]); // rows[0] is the newly created user
  } catch (err) {
    if (err.code === "23505") {
      // PostgreSQL error code for unique constraint violation
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: err.message });
  }
});
```

**`RETURNING *`** tells PostgreSQL to send back the newly created row — including the auto-generated `id` and `created_at`. Without it, you'd just get a count of how many rows were inserted.

```
POST /api/users  { name: "Dave", email: "dave@example.com" }
        │
        ▼
INSERT INTO users (name, email) VALUES ('Dave', 'dave@example.com') RETURNING *
        │
        ▼
result.rows[0] → { id: 4, name: "Dave", email: "dave@example.com", created_at: "..." }
        │
        ▼
res.status(201).json(result.rows[0]) ✅
```

---

### PUT → UPDATE

Updating an existing record uses an `UPDATE` statement. You identify which record to update using the ID from `req.params`, and the new values come from `req.body`.

```js
// PUT /api/users/:id
// SQL: UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required" });
    }

    const result = await pool.query(
      "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
      [name, email, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

`RETURNING *` works here too — it gives you back the updated record so you can confirm what changed.

```
PUT /api/users/1  { name: "Alice Smith", email: "alice@example.com" }
        │
        ▼
UPDATE users SET name = 'Alice Smith', email = 'alice@example.com' WHERE id = 1 RETURNING *
        │
        ▼
result.rows[0] → { id: 1, name: "Alice Smith", email: "alice@example.com", ... }
        │
        ▼
res.json(result.rows[0]) ✅
```

---

### DELETE → DELETE

Removing a record uses a `DELETE` statement. Only the ID is needed — there's no body.

```js
// DELETE /api/users/:id
// SQL: DELETE FROM users WHERE id = $1 RETURNING *
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted", user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
```

Using `RETURNING *` on a DELETE lets you confirm which record was actually deleted — and check whether the ID existed at all.

---

## 7. HTTP Method → SQL Query Reference

| HTTP Method | Route | SQL Operation | What It Does |
|-------------|-------|---------------|--------------|
| `GET` | `/api/users` | `SELECT * FROM users` | Returns all rows |
| `GET` | `/api/users/:id` | `SELECT * FROM users WHERE id = $1` | Returns one row by ID |
| `GET` | `/api/users/search?name=x` | `SELECT * FROM users WHERE name ILIKE $1` | Returns filtered rows |
| `POST` | `/api/users` | `INSERT INTO users (...) VALUES (...) RETURNING *` | Creates a new row |
| `PUT` | `/api/users/:id` | `UPDATE users SET ... WHERE id = $1 RETURNING *` | Replaces a row |
| `DELETE` | `/api/users/:id` | `DELETE FROM users WHERE id = $1 RETURNING *` | Removes a row |

```
The pattern is always the same:

  HTTP method + URL params + body
          │
          ▼
       SQL query
          │
          ▼
    result.rows
          │
          ▼
     res.json()
```

## 8. The Full Layered Example

Now that you understand how each HTTP method maps to a SQL query, here's the same API split across the proper architecture — router, controller, service, and model. This is how you'd actually structure it in a real project.

### Folder structure

```
my-api/
│
├── server.js
├── db.js
│
├── routes/
│   └── users.js
│
├── controllers/
│   └── usersController.js
│
├── services/
│   └── usersService.js
│
└── models/
    └── User.js
```

---

### db.js — Database Connection

```js
import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pg;

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Failed to connect to PostgreSQL:", err.message);
  } else {
    console.log("✅ Connected to PostgreSQL");
    release();
  }
});

export default pool;
```

**.env** — your actual credentials go here, never in code

```
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp
DB_USER=postgres
DB_PASSWORD=yourpassword
```

> 🚨 Add `.env` to your `.gitignore` — never commit database credentials to git.

---

### server.js — App Entry Point

```js
import express from "express";
import userRoutes from "./routes/users.js";

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
```

---

### models/User.js — The Query Library

Every SQL query lives here. One function, one query. No decisions.

```js
import pool from "../db.js";

// SELECT * FROM users
export const findAll = async () => {
  const result = await pool.query("SELECT * FROM users ORDER BY created_at DESC");
  return result.rows;
};

// SELECT * FROM users WHERE id = $1
export const findById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0] || null;
};

// SELECT * FROM users WHERE name ILIKE $1
export const findByName = async (name) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE name ILIKE $1",
    [`%${name}%`]
  );
  return result.rows;
};

// SELECT * FROM users WHERE email = $1
export const findByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0] || null;
};

// INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *
export const create = async ({ name, email }) => {
  const result = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
  return result.rows[0];
};

// UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *
export const update = async (id, { name, email }) => {
  const result = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [name, email, id]
  );
  return result.rows[0] || null;
};

// DELETE FROM users WHERE id = $1 RETURNING *
export const remove = async (id) => {
  const result = await pool.query(
    "DELETE FROM users WHERE id = $1 RETURNING *",
    [id]
  );
  return result.rows[0] || null;
};
```

---

### services/usersService.js — Business Logic

The service decides what model functions to call and applies your business rules. It has no knowledge of `req` or `res`.

```js
import * as User from "../models/User.js";

export const getUsers = async () => {
  return await User.findAll();
};

export const getUserById = async (id) => {
  return await User.findById(id);
};

export const searchUsers = async (name) => {
  return await User.findByName(name);
};

export const createUser = async ({ name, email }) => {
  // Business rule: check for duplicate email before inserting.
  // We use findByEmail here rather than fetching all users —
  // fetching the whole table just to check one email would be
  // very slow on a large database.
  const existing = await User.findByEmail(email);
  if (existing) throw Object.assign(new Error("Email already registered"), { status: 409 });

  return await User.create({ name, email });
};

export const updateUser = async (id, data) => {
  return await User.update(id, data);
};

export const deleteUser = async (id) => {
  return await User.remove(id);
};
```

---

### controllers/usersController.js — Request and Response

The controller reads the request, calls the service, and sends the response. Nothing else.

```js
import * as userService from "../services/usersService.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    next(err);
  }
};

export const searchUsers = async (req, res, next) => {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ error: "name query parameter required" });
    const users = await userService.searchUsers(name);
    res.json(users);
  } catch (err) {
    next(err);
  }
};

export const createUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required" });
    }
    const newUser = await userService.createUser({ name, email });
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required" });
    }
    const updated = await userService.updateUser(req.params.id, { name, email });
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted", user: deleted });
  } catch (err) {
    next(err);
  }
};
```

---

### routes/users.js — URL Mapping

The route file is now just a list of mappings. No logic, no SQL.

```js
import express from "express";
import {
  getAllUsers,
  getUserById,
  searchUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/search",  searchUsers);   // must be before /:id
router.get("/",        getAllUsers);
router.get("/:id",     getUserById);
router.post("/",       createUser);
router.put("/:id",     updateUser);
router.delete("/:id",  deleteUser);

export default router;
```

> 💡 `/search` must be defined before `/:id` — otherwise Express would treat the word "search" as an ID and call `getUserById` instead.

---

### How Each Layer Connects

```
  GET /api/users/1
         │
         ▼
  routes/users.js
  router.get("/:id", getUserById)
         │
         ▼
  controllers/usersController.js
  getUserById(req, res, next)
    → req.params.id = "1"
    → calls userService.getUserById("1")
         │
         ▼
  services/usersService.js
  getUserById("1")
    → calls User.findById("1")
         │
         ▼
  models/User.js
  findById("1")
    → pool.query("SELECT * FROM users WHERE id = $1", ["1"])
         │
         ▼
  PostgreSQL
    → returns the row
         │
         ▼  result travels back up through each layer
  controller receives the user object
    → res.json(user)
         │
         ▼
  Response: { id: 1, name: "Alice", email: "alice@example.com" } ✅
```

Each layer only does its one job:

| Layer | Its job |
|-------|---------|
| **Route** | Match the URL and method, call the controller |
| **Controller** | Read `req`, call the service, send `res` |
| **Service** | Apply business rules, call model functions |
| **Model** | Run the SQL query, return the result |
| **db.js** | Hold the connection pool, used only by models |


### Next Topics to Explore

#### 🍃 [Using MongoDB](7-mongodb-setup.md)  
Understand how document databases work using MongoDB, including collections, documents, fields, and how data can be stored in flexible JSON-like structures.

#### 🔌 [Connecting APIs to MongoDB](8-mongodb-service.md)  
Learn how to connect your API to MongoDB and use tools like Mongoose to create models, run queries, and manage application data.

#### 🚀 [Deployment](9-deployment.md)  
Learn how to deploy your REST API to the cloud with a live database, including environment configuration, hosting platforms, and making your backend accessible in production.