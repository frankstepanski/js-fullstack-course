# Scalable API Architecture

Now that you've built APIs using Node and Express, it's time to start organizing your code in a way that's **scalable** and **easy to maintain**. In real-world applications, routes, logic, and data handling grow quickly — so you need a clear structure.

Every piece of your backend code plays a specific role:

1. The **client** (like a React app) makes a request to a specific route (`/api/users`).
2. The **server** receives it and passes it through **global middleware** (for parsing, logging, CORS, etc.).
3. The **router** identifies which controller should handle it.
4. The **controller** runs logic or calls a **service** to handle data.
5. The **service** retrieves or updates the data and returns it to the controller.
6. The **model** defines the structure of that data.
7. The **controller** sends a final **response** (JSON) back to the client.

```
Client (React)
     │
     ▼
Global Middleware        ← express.json(), cors(), helmet()
     │
     ▼
Router                   ← which URL and method is this?
     │
     ▼
Controller               ← what should happen?
     │
     ▼
Service                  ← do the actual work
     │
     ▼
Model                    ← what does the data look like?
     │
     ▼
Response (JSON)          ← back to the client
```

## How It All Fits Together

| Layer | What It Does | Example Files |
|-------|--------------|---------------|
| **Server** | Starts Express, sets global middleware, mounts routers | `server.js` |
| **Router** | Defines which URLs and HTTP methods your API supports | `routes/users.js` |
| **Controller** | Decides what happens when a route is matched | `controllers/usersController.js` |
| **Service** | Handles business logic — reading, writing, calculating | `services/usersService.js` |
| **Model** | Defines the structure of your data | `models/User.js` |

Each layer has one job. That's the whole idea. Let's build it up one layer at a time.

## 1. Express Router — Organizing Your Routes

The first thing a request hits after global middleware is your **router**. The router's only job is to look at the incoming URL and HTTP method, and decide which controller function should handle it.

Before looking at how routers work, let's look at what happens *without* them.

### The Problem: Everything in One File

When you first learned Express, all your routes lived in `server.js`. For one or two routes that's fine. But watch what happens as your app grows:

```js
// server.js — getting out of hand fast

import express from "express";
const app = express();
app.use(express.json());

// --- USER ROUTES ---
app.get("/api/users", (req, res) => {
  const users = [{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }];
  res.json(users);
});

app.post("/api/users", (req, res) => {
  const newUser = req.body;
  // validation logic...
  // creation logic...
  res.status(201).json({ message: "User created", user: newUser });
});

app.put("/api/users/:id", (req, res) => {
  // find user logic...
  // update logic...
  res.json({ message: "User updated" });
});

app.delete("/api/users/:id", (req, res) => {
  // find user logic...
  // delete logic...
  res.json({ message: "User deleted" });
});

// --- PRODUCT ROUTES ---
app.get("/api/products", (req, res) => { /* ... */ });
app.post("/api/products", (req, res) => { /* ... */ });
app.put("/api/products/:id", (req, res) => { /* ... */ });
app.delete("/api/products/:id", (req, res) => { /* ... */ });

// ... and so on

app.listen(3000);
```

```
ONE BIG FILE — what this looks like in practice
════════════════════════════════════════════════

  server.js
  ┌─────────────────────────────────────────┐
  │  middleware setup                       │
  │  user routes (GET, POST, PUT, DELETE)   │
  │  product routes (GET, POST, PUT, DELETE)│
  │  post routes (GET, POST, PUT, DELETE)   │
  │  order routes (GET, POST, PUT, DELETE)  │
  │  auth routes (login, logout, register)  │
  │  error handling                         │
  └─────────────────────────────────────────┘

  → Hundreds of lines in one file
  → Hard to find anything
  → Impossible to work on as a team
  → One mistake can break unrelated routes
```

This gets unmanageable fast. The fix is **Express Router**.

---

### The Solution: Split Routes into Separate Files

Express Router lets you create a mini Express app for each section of your API and mount it onto the main app. Each router file only knows about its own routes.

```
SEPARATED ROUTES — the same app, organized
════════════════════════════════════════════

  server.js                    ← just setup + mounting
  ┌──────────────────────────┐
  │  middleware setup        │
  │  app.use("/api/users")   │──► routes/users.js
  │  app.use("/api/products")│──► routes/products.js
  │  app.use("/api/posts")   │──► routes/posts.js
  │  error handling          │
  └──────────────────────────┘

  routes/users.js              ← only knows about /users
  ┌──────────────────────────┐
  │  GET    /                │  (GET all users)
  │  POST   /                │  (create user)
  │  PUT    /:id             │  (update user)
  │  DELETE /:id             │  (delete user)
  └──────────────────────────┘

  routes/products.js           ← only knows about /products
  ┌──────────────────────────┐
  │  GET    /                │
  │  POST   /                │
  │  PUT    /:id             │
  │  DELETE /:id             │
  └──────────────────────────┘
```

> 💡 **Think of routers like React components.** When you built React apps, you split your UI into components like `<Navbar />`, `<UserList />`, and `<ProductCard />` — because putting everything in one file would be unmanageable. Express routers do the same thing for your backend. Each router handles one section of your app.

---

### How a Request Flows Through the Router

```
  Incoming request: GET /api/users
          │
          ▼
  ┌───────────────────────┐
  │  Global Middleware    │  express.json(), cors(), etc.
  └───────────┬───────────┘
              │ next()
              ▼
  ┌───────────────────────┐
  │  server.js            │  app.use("/api/users", userRoutes)
  │  matches the prefix   │  "this starts with /api/users —
  │                       │   hand it to the users router"
  └───────────┬───────────┘
              │
              ▼
  ┌───────────────────────┐
  │  routes/users.js      │  router.get("/", ...)
  │  matches the rest     │  "GET / — I handle this"
  └───────────┬───────────┘
              │
              ▼
       Route handler runs
       Response sent ✅
```

Notice how the prefix is split: `server.js` handles `/api/users`, then the router handles what comes after — in this case `/` for the list, or `/:id` for a specific user.

---

### Building the Router — All Four Methods

Here's how the full file structure looks and how each piece connects:

**Folder structure so far:**
```
my-api/
├── server.js
├── routes/
│   └── users.js
└── package.json
```

**server.js**
```js
import express from "express";
import userRoutes from "./routes/users.js";

const app = express();
app.use(express.json());

// Mount the users router — all /api/users requests go here
app.use("/api/users", userRoutes);

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
```

**routes/users.js**
```js
import express from "express";
const router = express.Router();

// GET /api/users — get all users
router.get("/", (req, res) => {
  res.json([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);
});

// GET /api/users/:id — get one user by ID
router.get("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ id, name: "Alice" });
});

// POST /api/users — create a new user
router.post("/", (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: "User created", user: newUser });
});

// PUT /api/users/:id — update a user
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  res.json({ message: `User ${id} updated`, updates });
});

// DELETE /api/users/:id — delete a user
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `User ${id} deleted` });
});

export default router;
```

The routes are clean and readable — each one just maps a URL + method to a handler. But notice that the handler functions themselves still contain logic inline. As that logic grows, this file will get messy too. That's where **controllers** come in.

---

### What the Router Should and Shouldn't Do

| The router's job | Not the router's job |
|-----------------|----------------------|
| Match a URL and HTTP method | Fetch or update data |
| Call the right controller function | Validate request bodies |
| Pass URL parameters to the controller | Connect to a database |

The router is just a traffic director. It points requests to the right place — nothing more.

## 2. Controllers — Handling the Request

Once the router matches a route, it calls a **controller function**. The controller is responsible for handling the incoming request — reading data from `req`, deciding what needs to happen, calling whatever service it needs, and sending back a `res`.

### The Problem: Logic Leaking Into Routes

Even with separate router files, it's tempting to write all the logic directly in the route handler:

```js
// routes/users.js — logic starting to leak in
router.post("/", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email required" });
  }

  const newUser = { id: Date.now(), name, email };
  users.push(newUser);

  res.status(201).json({ message: "User created", user: newUser });
});
```

This works, but as routes get more complex — more validation, database calls, error handling — the route file becomes just as messy as the single `server.js` file was before. You've just moved the problem.

### The Solution: Move Logic Into Controllers

A controller is just a regular JavaScript function that handles one specific action. You write it in a separate file and import it into the route.

```
BEFORE — logic in the route file
════════════════════════════════════════════════
  routes/users.js
  ┌──────────────────────────────────────────┐
  │  router.post("/", (req, res) => {        │
  │    // validate input                     │
  │    // build the new user object          │
  │    // save to data store                 │
  │    // send response                      │
  │  })                                      │
  └──────────────────────────────────────────┘


AFTER — logic in the controller
════════════════════════════════════════════════
  routes/users.js                controllers/usersController.js
  ┌──────────────────┐           ┌─────────────────────────────┐
  │  router.post("/",│──────────►│  export const createUser =  │
  │    createUser)   │           │  (req, res) => {            │
  └──────────────────┘           │    // validate input        │
                                 │    // build the user        │
  The route just points.         │    // save it               │
  The controller does the work.  │    // send response         │
                                 │  }                          │
                                 └─────────────────────────────┘
```

### Building Controllers — All Four Methods

**Folder structure:**
```
my-api/
├── server.js
├── routes/
│   └── users.js
├── controllers/
│   └── usersController.js
└── package.json
```

**controllers/usersController.js**
```js
// A temporary in-memory store — replaced by a real database later
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob",   email: "bob@example.com"   },
];

// GET /api/users
export const getAllUsers = (req, res) => {
  res.json(users);
};

// GET /api/users/:id
export const getUserById = (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
};

// POST /api/users
export const createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  const newUser = { id: Date.now(), name, email };
  users.push(newUser);
  res.status(201).json({ message: "User created", user: newUser });
};

// PUT /api/users/:id
export const updateUser = (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  Object.assign(user, req.body);
  res.json({ message: "User updated", user });
};

// DELETE /api/users/:id
export const deleteUser = (req, res) => {
  const index = users.findIndex(u => u.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "User not found" });
  users.splice(index, 1);
  res.json({ message: "User deleted" });
};
```

**routes/users.js — now clean and readable**
```js
import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/",    getAllUsers);
router.get("/:id", getUserById);
router.post("/",   createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
```

The route file is now just a list of mappings. You can read the entire API surface in seconds. The logic lives in the controller where it belongs.

### How a Request Flows Now

```
  GET /api/users/1
        │
        ▼
  Global Middleware
  (express.json, cors...)
        │
        ▼
  server.js
  app.use("/api/users", userRoutes)
        │
        ▼
  routes/users.js
  router.get("/:id", getUserById)
        │
        ▼
  controllers/usersController.js
  getUserById(req, res) → finds user → res.json(user)
        │
        ▼
  Response: { id: 1, name: "Alice" } ✅
```

### What Controllers Should and Shouldn't Do

| The controller's job | Not the controller's job |
|---------------------|--------------------------|
| Read `req.params`, `req.body`, `req.query` | Write raw SQL queries |
| Validate that required fields are present | Contain complex business logic |
| Call a service to do the actual work | Know which database you're using |
| Send the response with `res.json()` | Do things that need reusing elsewhere |

As your app grows, you'll notice that some logic in your controller starts to feel too complex — calculating things, applying business rules, talking to a database. That logic belongs in a **service**.

## 3. Services — Business Logic

You now have routes pointing to controllers, and controllers handling the request and response. But as your app grows, controllers start collecting more and more logic — and that's a problem.

The solution is a **service layer**. This is where the actual work happens.

---

### What Is "Business Logic"?

Before explaining services, it's worth being clear on what "business logic" actually means — because it's a term beginners hear a lot without a clear definition.

Business logic is any rule or decision your app makes about its data. Not HTTP stuff. Not routing. The actual rules of how your app works:

```
Examples of business logic
════════════════════════════════════════════════════════

  "A user can't register with an email that's already taken"
  "A product can't have a negative price"
  "An order can only be cancelled if it hasn't shipped yet"
  "A user must be over 18 to create an account"
  "When a user is deleted, also delete all their posts"
```

None of those rules have anything to do with HTTP. They're just the rules of your application. That's exactly what belongs in a service.

---

### The Problem: Logic Leaking Into Controllers

Without a service layer, all of that logic ends up in the controller. This works at first — but it creates real problems as the app grows.

Here's what a controller looks like when it's doing too much:

```
createUser controller — doing five different jobs
════════════════════════════════════════════════════════

  POST /api/users arrives
        │
        ▼
  ┌─────────────────────────────────────────────────┐
  │  controller                                     │
  │                                                 │
  │  1. Read req.body ................. (HTTP)      │
  │  2. Check if email is taken ....... (business)  │
  │  3. Hash the password ............. (business)  │
  │  4. Save the user to database ..... (data)      │
  │  5. Send a welcome email .......... (business)  │
  │  6. Send res.json() ............... (HTTP)      │
  │                                                 │
  └─────────────────────────────────────────────────┘

  Only steps 1 and 6 are the controller's job.
  Steps 2, 3, 4, and 5 don't belong here.
```

The problems this causes:

- **Hard to reuse.** What if an admin panel also needs to create a user? You'd copy and paste the same logic — and then have to maintain it in two places.
- **Hard to test.** To test whether the email-check logic works, you'd have to fire up an HTTP server and send a real request. That's slow and unnecessary.
- **Hard to read.** A controller that does six things is hard to scan. You can't tell at a glance what a route actually does.

---

### The Solution: Move the Work Into a Service

A service is a plain JavaScript file full of functions. No `req`. No `res`. No HTTP knowledge at all. It takes plain data in and returns plain data out.

```
BEFORE — everything in the controller
════════════════════════════════════════════════════════

  Controller
  ┌─────────────────────────────────────────────────┐
  │  reads req                                      │
  │  checks email                                   │
  │  hashes password                                │
  │  saves to database                              │
  │  sends welcome email                            │
  │  sends res                                      │
  └─────────────────────────────────────────────────┘


AFTER — controller delegates to service
════════════════════════════════════════════════════════

  Controller                      Service
  ┌──────────────────┐            ┌──────────────────────────┐
  │  reads req       │            │                          │
  │                  │──calls────►│  checks email            │
  │  const user =    │            │  hashes password         │
  │    userService   │◄─returns── │  saves to database       │
  │    .createUser() │            │  sends welcome email     │
  │                  │            │                          │
  │  sends res       │            │  returns the new user    │
  └──────────────────┘            └──────────────────────────┘

  Controller: 3 lines.            Service: all the real work.
  HTTP only.                      No req. No res.
```

The controller is now just a thin wrapper. It reads the request, calls the service, and sends whatever the service returns. It has no idea what the service does internally.

---

### What Goes in a Service vs What Doesn't

| The service's job ✅ | Not the service's job ❌ |
|---------------------|--------------------------|
| Business rules — "email must be unique" | Reading `req` or writing `res` |
| Multi-step operations — check, hash, save, email | Sending HTTP responses |
| Logic that might be needed in more than one place | Handling routing or middleware |
| Calling model functions to read or write data | Writing raw SQL queries (that's the model's job) |

---

### Why No `req` or `res` in a Service?

This is the key design decision — and it has a big payoff.

Because the service knows nothing about HTTP, the exact same function can be called from anywhere:

```
  userService.createUser({ name, email })
        │
        ├── called from an HTTP route      ← your API
        ├── called from a test             ← automated testing
        ├── called from a scheduled job    ← e.g. bulk import at midnight
        └── called from an admin script    ← command line tool

  Same function. Same logic. No duplication.
```

If the email-check rule ever changes, you update it in one place — the service — and every caller gets the fix automatically.

---

### Folder Structure

```
my-api/
├── server.js
├── routes/
│   └── users.js
├── controllers/
│   └── usersController.js
├── services/
│   └── usersService.js        ← new
└── package.json
```

---

### What a Service File Looks Like

For now, the service uses a plain array as a stand-in for a real database. This is intentional — you can understand the structure without worrying about database setup yet. When you add a database later, only the lines that touch the array change. The business rules stay exactly the same.

Each function in the service has a clear job:

```
  getUsers()      → return all users (no rules needed)
  getUserById()   → find one user, return null if not found
  createUser()    → check email is unique, then create
  updateUser()    → check user exists, then update
  deleteUser()    → check user exists, then delete
```

**services/usersService.js**
```js
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob",   email: "bob@example.com"   },
];

export const getUsers = () => users;

export const getUserById = (id) => {
  return users.find(u => u.id === Number(id)) || null;
};

export const createUser = (userData) => {
  // Business rule: no duplicate emails
  const exists = users.find(u => u.email === userData.email);
  if (exists) throw new Error("Email already registered");

  const newUser = { id: Date.now(), ...userData };
  users.push(newUser);
  return newUser;
};

export const updateUser = (id, updates) => {
  const user = users.find(u => u.id === Number(id));
  if (!user) return null;
  Object.assign(user, updates);
  return user;
};

export const deleteUser = (id) => {
  const index = users.findIndex(u => u.id === Number(id));
  if (index === -1) return false;
  users.splice(index, 1);
  return true;
};
```

And the controller becomes thin — just three steps per function: read the request, call the service, send the response:

```js
// controllers/usersController.js
import * as userService from "../services/usersService.js";

export const createUser = (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }
  try {
    const newUser = userService.createUser({ name, email }); // ← delegate
    res.status(201).json({ message: "User created", user: newUser });
  } catch (err) {
    res.status(409).json({ error: err.message });
  }
};
```

---

### How a Request Flows Through All Three Layers

```
  POST /api/users
  body: { name: "Carol", email: "carol@example.com" }
        │
        ▼
  Global Middleware
  express.json() parses the body
        │
        ▼
  routes/users.js
  router.post("/", createUser)
        │
        ▼
  controllers/usersController.js
    → reads req.body                      (HTTP job)
    → checks name and email exist         (basic validation)
    → calls userService.createUser()      (delegates the real work)
        │
        ▼
  services/usersService.js
    → is this email already taken?        (business rule)
    → builds the new user object
    → saves it
    → returns the new user
        │
        ▼  result travels back up
  controller gets the new user
    → res.status(201).json({ user })      (HTTP job)
        │
        ▼
  Response: { message: "User created", user: { id: ..., name: "Carol" } } ✅
```

The controller's job begins and ends with HTTP. Everything in the middle is the service's job.

---

## 4. Models — The Query Library

Right now the service works directly with a plain array. But in a real app, data lives in a database. When you add one, you don't want SQL queries scattered across your service files — you want them in one dedicated place. That's what a **model** is.

Here's the key idea, stated plainly:

> **The model file is a query library for one resource.**
> Every possible database operation that resource needs lives there as a named function.
> The service decides which of those functions to call, and in what order.

The model doesn't make decisions. It just runs whatever query it's asked to run and hands the result back. All decisions stay in the service.

```
MODEL FILE = query library
════════════════════════════════════════

  models/User.js
  ├── findAll()          →  SELECT * FROM users
  ├── findById(id)       →  SELECT * FROM users WHERE id = $1
  ├── findByEmail(email) →  SELECT * FROM users WHERE email = $1
  ├── create(data)       →  INSERT INTO users ... RETURNING *
  ├── update(id, data)   →  UPDATE users SET ... WHERE id = $1
  └── remove(id)         →  DELETE FROM users WHERE id = $1

  That's it. One function. One query. No decisions.


SERVICE FILE = orchestrator
════════════════════════════════════════

  services/usersService.js

  createUser(userData)
    → calls User.findByEmail()   ← does this email exist?
    → (business rule) if yes, throw error
    → calls User.create()        ← save the new user
    → returns the result

  The service decides WHAT to do.
  The model knows HOW to do it.
```

When you later read about Postgres or MongoDB, the model is the only file that changes. Your service functions stay exactly the same — they still call `User.findById()`, `User.create()` and so on. Only what happens *inside* those functions changes.

---

### Models with Postgres

With Postgres, your model file contains **SQL queries**. The table structure (columns, types, constraints) is defined in the database itself — the model file just knows how to talk to it.

**Folder structure:**
```
my-api/
├── server.js
├── db.js                        ← Postgres connection pool
├── routes/
│   └── users.js
├── controllers/
│   └── usersController.js
├── services/
│   └── usersService.js
├── models/
│   └── User.js                  ← all user queries live here
└── package.json
```

**models/User.js (Postgres)**
```js
import pool from "../db.js"; // the Postgres connection

// Every function = one SQL query. No business logic. No decisions.

export const findAll = async () => {
  const result = await pool.query("SELECT * FROM users");
  return result.rows;
};

export const findById = async (id) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE id = $1",
    [id]
  );
  return result.rows[0] || null;
};

export const findByEmail = async (email) => {
  const result = await pool.query(
    "SELECT * FROM users WHERE email = $1",
    [email]
  );
  return result.rows[0] || null;
};

export const create = async ({ name, email }) => {
  const result = await pool.query(
    "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
    [name, email]
  );
  return result.rows[0];
};

export const update = async (id, { name, email }) => {
  const result = await pool.query(
    "UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *",
    [name, email, id]
  );
  return result.rows[0] || null;
};

export const remove = async (id) => {
  await pool.query(
    "DELETE FROM users WHERE id = $1",
    [id]
  );
};
```

Now the service imports the model and calls its functions instead of working with an array:

**services/usersService.js (with Postgres)**
```js
import * as User from "../models/User.js";

// Get all users — service just asks the model
export const getUsers = async () => {
  return await User.findAll();
};

// Get one user — service asks, model queries
export const getUserById = async (id) => {
  return await User.findById(id);
};

// Create a user — service applies the business rule,
// then calls two model functions in sequence
export const createUser = async (userData) => {
  // Business rule: no duplicate emails
  // Service asks the model: "does this email exist?"
  const existing = await User.findByEmail(userData.email);
  if (existing) throw new Error("Email already registered");

  // Email is free — now ask the model to create the record
  return await User.create(userData);
};

// Update a user
export const updateUser = async (id, updates) => {
  return await User.update(id, updates);
};

// Delete a user
export const deleteUser = async (id) => {
  await User.remove(id);
};
```

Notice what's in each file:

```
models/User.js                    services/usersService.js
──────────────────────────────    ──────────────────────────────
findAll()      → SELECT *         getUsers()
findById()     → SELECT WHERE id    → calls User.findAll()
findByEmail()  → SELECT WHERE email
create()       → INSERT           createUser(data)
update()       → UPDATE             → calls User.findByEmail()
remove()       → DELETE             → (rule) throw if exists
                                    → calls User.create()
No decisions.                     
Just queries.                     All decisions live here.
```

The controller doesn't change at all — it still calls `userService.createUser(req.body)` exactly as before. Adding a real database only touched the service (swapping the array for model calls) and added the new model file.

---

### Models with MongoDB

With MongoDB you use **Mongoose** — a library that lets you define a schema in JavaScript. Instead of writing SQL, you define what a document should look like and Mongoose generates the query methods for you.

**models/User.js (MongoDB / Mongoose)**
```js
import mongoose from "mongoose";

// Define the shape of a user document
// Mongoose uses this to validate data and generate query methods
const userSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  email: { type: String, required: true, unique: true },
}, {
  timestamps: true  // automatically adds createdAt and updatedAt
});

// Mongoose creates the model — this is what the service imports
export default mongoose.model("User", userSchema);
```

The service uses Mongoose's built-in methods — no SQL needed:

**services/usersService.js (with MongoDB)**
```js
import User from "../models/User.js";

export const getUsers = async () => {
  return await User.find();                              // SELECT * FROM users
};

export const getUserById = async (id) => {
  return await User.findById(id);                        // SELECT WHERE _id = id
};

export const createUser = async (userData) => {
  // Mongoose enforces unique: true on email automatically
  // It throws a duplicate key error if the email exists
  const newUser = new User(userData);
  return await newUser.save();                           // INSERT
};

export const updateUser = async (id, updates) => {
  return await User.findByIdAndUpdate(                   // UPDATE WHERE _id = id
    id,
    updates,
    { new: true }  // return the updated document, not the old one
  );
};

export const deleteUser = async (id) => {
  return await User.findByIdAndDelete(id);               // DELETE WHERE _id = id
};
```

---

### Postgres vs MongoDB — What Actually Changes

The controller is identical. The routes are identical. Only the model file and the service's import change.

```
POSTGRES                              MONGODB
══════════════════════════════        ══════════════════════════════

models/User.js                        models/User.js
  → exports functions with SQL          → exports a Mongoose model
  → you write the queries               → Mongoose generates the methods
  → no schema in JS                     → schema defined in JS

services/usersService.js              services/usersService.js
  import * as User from               import User from
    "../models/User.js"                 "../models/User.js"

  User.findAll()                        User.find()
  User.findById(id)                     User.findById(id)
  User.findByEmail(email)               User.findOne({ email })
  User.create(data)                     new User(data).save()
  User.update(id, data)                 User.findByIdAndUpdate(...)
  User.remove(id)                       User.findByIdAndDelete(id)
```

| | Postgres | MongoDB |
|--|----------|---------|
| **Data shape** | Fixed columns — every row is identical | Flexible documents — fields can vary |
| **Schema defined** | In the database (`CREATE TABLE` SQL) | In your JS code (Mongoose schema) |
| **Model file contains** | Functions with raw SQL queries | A Mongoose schema + exported model |
| **Query style** | `pool.query("SELECT ...")` | `User.find()`, `User.findById()` |
| **Duplicate handling** | You check manually with `findByEmail` | Mongoose throws on `unique: true` |
| **Best for** | Structured data with relationships | Flexible or deeply nested data |

The architecture — service calling model, model talking to database — is identical. Only the syntax inside the model file changes.

## The Complete Picture

Here's the full folder structure for a real modular API with a database:

```
my-api/
│
├── server.js                    ← global middleware + mount routers
├── db.js                        ← database connection
│
├── routes/
│   ├── users.js                 ← maps URLs to controller functions
│   ├── products.js
│   └── posts.js
│
├── controllers/
│   ├── usersController.js       ← reads req, calls service, sends res
│   ├── productsController.js
│   └── postsController.js
│
├── services/
│   ├── usersService.js          ← business rules, calls model functions
│   ├── productsService.js
│   └── postsService.js
│
├── models/
│   ├── User.js                  ← query library for the users table
│   ├── Product.js
│   └── Post.js
│
└── package.json
```

### Full Request Flow — Step by Step

```
  PUT /api/users/1
  body: { name: "Alice Smith" }
           │
           ▼
  ┌──────────────────────────────────────────┐
  │  server.js                               │
  │  Global middleware runs                  │
  │  express.json() parses the body          │
  │  app.use("/api/users", userRoutes)       │
  └───────────────────┬──────────────────────┘
                      │
                      ▼
  ┌──────────────────────────────────────────┐
  │  routes/users.js                         │
  │  router.put("/:id", updateUser)          │
  │  matched the route — calls controller    │
  └───────────────────┬──────────────────────┘
                      │
                      ▼
  ┌──────────────────────────────────────────┐
  │  controllers/usersController.js          │
  │  updateUser(req, res)                    │
  │    → reads req.params.id and req.body    │
  │    → calls userService.updateUser(       │
  │        id, { name: "Alice Smith" })      │
  └───────────────────┬──────────────────────┘
                      │
                      ▼
  ┌──────────────────────────────────────────┐
  │  services/usersService.js                │
  │  updateUser(id, updates)                 │
  │    → applies any business rules          │
  │    → calls User.update(id, updates)      │
  └───────────────────┬──────────────────────┘
                      │
                      ▼
  ┌──────────────────────────────────────────┐
  │  models/User.js                          │
  │  update(id, updates)                     │
  │    → runs UPDATE SQL query               │
  │    → returns the updated row             │
  └───────────────────┬──────────────────────┘
                      │
                      ▼  result travels back up
  controller receives updated user
  → res.json({ message: "User updated", user })
                      │
                      ▼
  Response: { message: "User updated", user: { id: 1, name: "Alice Smith" } } ✅
```

### One More Way to Think About It

Each layer only talks to the one directly below it. No layer skips a step.

```
  Route      → only talks to → Controller
  Controller → only talks to → Service
  Service    → only talks to → Model
  Model      → only talks to → Database
```

If you ever find yourself importing a model directly into a controller, or writing SQL inside a service, that's a sign something is in the wrong place.

### Why This Structure Wins

| If you kept everything in one file | With this structure |
|------------------------------------|---------------------|
| One mistake can break everything | Each layer is isolated — a bug in the service doesn't affect the router |
| Hard to find anything | Every file has one clear job and a predictable name |
| Can't reuse logic | Service functions work from any context — HTTP, tests, scripts |
| Painful to test | Services can be unit tested without starting an HTTP server |
| Swapping databases means rewriting everything | Only the model file changes — service and controller stay the same |
| Impossible to work on as a team | Different people can own different layers without stepping on each other |
