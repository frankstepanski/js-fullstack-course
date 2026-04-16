# Integrating MongoDB Into Your REST API

You've already connected a PostgreSQL database to your Express API. MongoDB works the same way at the architectural level — the layers don't change. What changes is **how you connect and how you query**.

This document walks you through connecting to MongoDB step by step — starting from "does it even connect?" all the way to a full working API with all four HTTP methods.

## Why You Need a Library to Talk to MongoDB

You might wonder — why can't Node.js just talk to MongoDB directly?

MongoDB is a completely separate program running on your computer or a remote server. It has its own network protocol — its own language for sending and receiving data over a connection. Node.js has no built-in understanding of that protocol.

A **database library** sits in between and handles all of that for you:

```
WITHOUT a library
══════════════════════════════════════════════════════════

  Your Node app                    MongoDB
  ─────────────────                ─────────────────────
  "I want all users"               speaks its own binary
                                   network protocol
        │
        │   ❌ Node has no idea how to speak
        │      MongoDB's protocol
        │
        ✖ no connection possible


WITH a library (e.g. Mongoose)
══════════════════════════════════════════════════════════

  Your Node app       Mongoose             MongoDB
  ─────────────────   ──────────────────   ─────────────────
  User.find()         translates your      receives proper
                      JS call into    ───► protocol message,
                      MongoDB's            runs the query,
                      binary protocol      sends results back
        │                                        │
        │             translates the    ◄────────┘
        │◄──────────  results back
        │             into JS objects
  [{ _id: "...", name: "Alice" }]
```

The library also manages the connection itself — opening it, keeping it alive, reconnecting if it drops, and closing it cleanly.

## Which Library Should You Use?

There are four main libraries for connecting Node.js to MongoDB. They sit at different levels of abstraction — from full control with no schema enforcement, to fully generated type-safe clients.

```
ABSTRACTION LEVELS
══════════════════════════════════════════════════════════

  Raw queries                                 No raw queries
  (you write everything)          (library writes everything)
       │                                          │
       ▼                                          ▼
  ┌──────────────────┐  ┌──────────┐  ┌──────────────┐  ┌────────┐
  │  MongoDB Driver  │  │ Mongoose │  │  Typegoose   │  │ Prisma │
  └──────────────────┘  └──────────┘  └──────────────┘  └────────┘
  Native driver         ODM with       Mongoose with      Modern ORM
  no schema             schemas        TypeScript classes
```

### MongoDB Native Driver — Raw Queries

The native driver is the lowest level option. No schemas, no models, no type enforcement. You query collections directly using MongoDB's own query syntax.

```js
// Native driver — query a collection directly
const users = await db.collection("users").find().toArray();
const user  = await db.collection("users").findOne({ _id: id });
```

**When to use it:**
- You need full control with no abstraction
- You're building a simple script or one-off tool
- Your queries are highly specialised and an ODM would get in the way

**When not to use it:**
- No schema validation — MongoDB accepts any shape of data silently
- You have to manage data consistency yourself
- Harder to maintain across a large codebase

---

### Mongoose — ODM with Schemas

Mongoose is an **ODM (Object Document Mapper)**. You define schemas in your JavaScript code, and Mongoose enforces them before data ever reaches the database. It also provides a clean query API built on top of the native driver.

```js
// Mongoose — define a schema, query through a model
const User = mongoose.model("User", userSchema);
const users = await User.find();
const user  = await User.findById(id);
```

**When to use it:**
- You want schema validation and type enforcement
- You're building a Node.js app and want the most widely supported option
- You want built-in query methods, middleware hooks, and population (the MongoDB equivalent of JOINs)
- Your team is comfortable with JavaScript

**When not to use it:**
- If you're using TypeScript and want full type safety end to end (use Typegoose or Prisma instead)

---

### Typegoose — Mongoose with TypeScript Classes

Typegoose is a thin wrapper around Mongoose that lets you define schemas as TypeScript classes instead of plain objects. Under the hood it's still Mongoose — just with better TypeScript integration.

```ts
// Typegoose — TypeScript class instead of a schema object
@modelOptions({ schemaOptions: { timestamps: true } })
class User {
  @prop({ required: true })
  name!: string;

  @prop({ required: true, unique: true })
  email!: string;
}
```

**When to use it:**
- You're using TypeScript and already know Mongoose
- You want class-based schema definitions with full type safety

---

### Prisma — Modern ORM

Prisma works with MongoDB as well as PostgreSQL. You define your schema in a `schema.prisma` file and Prisma generates a fully type-safe client. It's designed for TypeScript from the ground up.

```prisma
// schema.prisma
model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  name  String
  email String @unique
}
```

```js
// Generated client — full autocomplete, type safety
const users = await prisma.user.findMany();
const user  = await prisma.user.findUnique({ where: { id } });
```

**When to use it:**
- You're using TypeScript and want the best developer experience
- You're starting a new project and want schema-first design
- You want one tool that works across both PostgreSQL and MongoDB

**When not to use it:**
- Prisma's MongoDB support is slightly less mature than its PostgreSQL support
- Legacy projects already using Mongoose

---

### Side-by-Side Comparison

| | Native Driver | Mongoose | Typegoose | Prisma |
|--|--------------|----------|-----------|--------|
| **Schema validation** | ❌ None | ✅ Yes | ✅ Yes | ✅ Yes |
| **Query style** | Raw MongoDB syntax | Model methods | Model methods | Generated client |
| **TypeScript support** | Partial | Partial | ✅ Full | ✅ Full |
| **Schema defined in** | Nowhere (MongoDB is schemaless) | JS schema objects | TypeScript classes | `schema.prisma` file |
| **Best for** | Scripts, full control | Most Node.js MongoDB apps | TypeScript + Mongoose fans | Modern TypeScript projects |
| **Learning curve** | Low | Medium | Medium | Medium |

---

### Why This Document Uses Mongoose

Even though you might reach for Prisma in a real TypeScript project, this document uses Mongoose because it makes the connection between your code and MongoDB visible and understandable.

When you write `User.find()` or `User.findByIdAndUpdate()` you can see exactly what operation is happening. The schema you define in JavaScript maps directly to what gets stored in MongoDB. There's no generated code to see through.

Once you understand how Mongoose schemas, models, and queries work — what `.find()` does, how `.populate()` replaces a reference ID, how validation errors work — switching to Prisma becomes straightforward. You'll understand what it's doing for you.

```
Learn with Mongoose             Then move to Prisma / Typegoose
════════════════════             ════════════════════════════════

  You see every query             Library generates queries for you
  You write the schemas           Schema file generates the client
  No hidden magic                 The magic makes sense
```

In short: **use Mongoose to learn, then choose the tool that fits your project**.

## 1. Installing Mongoose

```bash
npm install mongoose
```

That's the only package you need for now.

## 2. Creating the Connection

Create a file called `db/connect.js`. This file is created **once** and imported by your server on startup. Every other file that needs the database uses Mongoose's shared connection — you never connect multiple times.

```js
// db/connect.js
import mongoose from "mongoose";

export async function connectToDatabase() {
  try {
    await mongoose.connect("mongodb://localhost:27017/myapp");
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1); // stop the server — a broken DB connection is not recoverable
  }
}
```

```
your project
     │
     ├── db/connect.js          ← one connection, created once
     │
     ├── models/User.js         ← uses mongoose (already connected)
     ├── models/Post.js         ← uses mongoose (already connected)
     └── models/Product.js      ← uses mongoose (already connected)

One connection. Many models. Never re-created.
```

Then call it in `server.js` before starting the server:

```js
// server.js
import express from "express";
import { connectToDatabase } from "./db/connect.js";

const app = express();
app.use(express.json());

// Connect first, then start listening
connectToDatabase().then(() => {
  app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
});
```

This ensures MongoDB is connected before the server starts accepting requests. If the connection fails, `process.exit(1)` stops the server before it ever starts listening.

## 3. Testing the Connection

Before writing any routes, start your server and verify it actually connects:

```bash
node server.js
```

You should see one of two things:

```
✅ Connected to MongoDB
🚀 Server running on http://localhost:3000
```

or

```
❌ MongoDB connection failed: connect ECONNREFUSED 127.0.0.1:27017
```

**If you see an error**, here's what each one means:

| Error message | What it means | Fix |
|--------------|---------------|-----|
| `connect ECONNREFUSED` | MongoDB isn't running | Start MongoDB with `mongod` or via MongoDB Compass |
| `Authentication failed` | Wrong username or password in connection string | Check your credentials |
| `bad auth: Authentication failed` | Database name or credentials wrong | Double-check your connection string |
| `querySrv ENOTFOUND` | Can't resolve the Atlas cluster hostname | Check your internet connection and Atlas URI |

Don't move forward until you see the green checkmark. Everything else depends on this working.

---

## 4. Sending Your First Query

Once connected, verify that you can actually send a query to the database — before writing any routes.

Add a test ping directly in `server.js` after connecting:

```js
// server.js — temporary test, remove after confirming it works
connectToDatabase().then(async () => {
  // Send a ping to confirm the connection can actually query
  await mongoose.connection.db.admin().command({ ping: 1 });
  console.log("✅ Database ping successful");

  app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
});
```

When you start your server you should now see:

```
✅ Connected to MongoDB
✅ Database ping successful
🚀 Server running on http://localhost:3000
```

Once you see all three lines, remove the ping. You've confirmed queries are reaching MongoDB — now you don't need it anymore.

## 5. Defining a Schema and Model

Before writing routes, you need to define the shape of your data. This is where MongoDB differs most from PostgreSQL — instead of the table structure living in the database, it lives in your JavaScript code as a **Mongoose schema**.

### What Is a Schema?

A schema defines what fields a document must have, what types they must be, and what rules apply:

```js
// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,            // this field must exist
    },
    email: {
      type: String,
      required: true,
      unique: true,              // no two users can share an email
    },
    role: {
      type: String,
      enum: ["user", "admin"],   // only these values are allowed
      default: "user",           // default value if not provided
    },
  },
  {
    timestamps: true,            // automatically adds createdAt and updatedAt
  }
);

export const User = mongoose.model("User", userSchema);
```

### What Does Each Option Do?

| Option | What It Does | Example |
|--------|-------------|---------|
| `type` | Enforces the data type | `type: String` |
| `required` | Field must be present | `required: true` |
| `unique` | No duplicates allowed | `unique: true` |
| `default` | Value used if not provided | `default: "user"` |
| `enum` | Only these values allowed | `enum: ["user", "admin"]` |
| `timestamps` | Adds `createdAt` / `updatedAt` | `{ timestamps: true }` |

### Schema vs Model

The schema is the blueprint. The model is the tool you use to actually query the database:

```
  userSchema  →  defines the rules ("a user must have name and email")
  User model  →  User.find(), User.findById(), User.create()
  users collection  →  where the documents are actually stored in MongoDB
```

Mongoose automatically uses the plural lowercase version of your model name as the collection name — `User` model → `users` collection.

## 6. All HTTP Methods in One File

> 📝 **Note to reader:** The examples below put all the database logic directly inside the route handlers — no controllers, services, or models. This is intentional. Seeing each HTTP method paired directly with its Mongoose operation in one place makes it easier to understand the connection before splitting things across files. The final section shows the full layered version.

### Folder structure for this section:

```
my-api/
├── db/
│   └── connect.js
├── models/
│   └── User.js
├── server.js
└── routes/
    └── users.js    ← everything goes here for now
```

**server.js**
```js
import express from "express";
import { connectToDatabase } from "./db/connect.js";
import userRoutes from "./routes/users.js";

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

connectToDatabase().then(() => {
  app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
});
```

---

### GET all users → `User.find()`

The most basic query — get every document from the collection.

```js
// routes/users.js
import express from "express";
import { User } from "../models/User.js";

const router = express.Router();

// GET /api/users
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

`User.find()` with no arguments returns every document in the collection. If the collection is empty it returns `[]`.

```
GET /api/users
      │
      ▼
User.find()
      │
      ▼
[
  { _id: "64abc...", name: "Alice", email: "alice@example.com" },
  { _id: "64def...", name: "Bob",   email: "bob@example.com"   }
]
      │
      ▼
res.json(users) ✅
```

---

### GET one user → `User.findById()`

To get a single document you query by its `_id` — MongoDB's auto-generated unique identifier.

```js
// GET /api/users/:id
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (err) {
    // If the ID format is invalid, Mongoose throws a CastError
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    res.status(500).json({ error: err.message });
  }
});
```

**What is `_id`?**

MongoDB automatically creates an `_id` field for every document — you don't define it yourself. It's a 24-character hex string called an **ObjectId** (e.g. `"64abc123def456789012abcd"`). `findById()` accepts this string and handles the conversion internally.

If you pass an ID that doesn't match the ObjectId format (wrong length, invalid characters), Mongoose throws a `CastError` before even hitting the database — which is why it's worth handling separately.

```
GET /api/users/64abc123def456789012abcd
      │
      ▼
User.findById("64abc123def456789012abcd")
      │
      ▼
{ _id: "64abc...", name: "Alice", email: "alice@example.com" }
      │
      ▼
res.json(user) ✅
```

---

### GET with query parameter → `User.find({ field })`

Query parameters let clients filter results. They come from `req.query` and map directly to Mongoose's filter object.

> ⚠️ **Route order matters here.** This search route must be added *before* the `/:id` route. If `/:id` comes first, Express treats the word "search" as an ID and calls the wrong handler. Always put specific routes before dynamic ones:
>
> ```js
> router.get("/search", ...)  // ✅ specific — must come first
> router.get("/:id", ...)     // dynamic — must come after
> ```

```js
// GET /api/users/search?name=alice
router.get("/search", async (req, res) => {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({ error: "name query parameter is required" });
    }

    // Case-insensitive search using a regular expression
    const users = await User.find({
      name: { $regex: name, $options: "i" }
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
```

**What is `$regex` and `$options: "i"`?**

MongoDB doesn't have `ILIKE` like PostgreSQL does. Instead you use a **regular expression** to do pattern matching. The `$regex` operator tells MongoDB to match documents where the field matches a pattern, and `$options: "i"` makes it case-insensitive.

```
{ name: { $regex: "ali", $options: "i" } }

is equivalent to PostgreSQL's:

WHERE name ILIKE '%ali%'
```

| MongoDB | PostgreSQL equivalent | What it does |
|---------|----------------------|--------------|
| `{ name: { $regex: "ali", $options: "i" } }` | `WHERE name ILIKE '%ali%'` | Case-insensitive partial match |
| `{ name: "Alice" }` | `WHERE name = 'Alice'` | Exact match |
| `{ role: "admin" }` | `WHERE role = 'admin'` | Exact match on another field |

```
GET /api/users/search?name=ali
        │
        ▼
User.find({ name: { $regex: "ali", $options: "i" } })
        │
        ├── "Alice"  ✅  matches (case ignored)
        ├── "ALICE"  ✅  matches (case ignored)
        ├── "Talia"  ✅  contains "ali" in the middle
        └── "Bob"    ❌  no match
        │
        ▼
res.json(users) ✅
```

---

### POST → `new User().save()` or `User.create()`

Creating a new document uses either `new User(data).save()` or the shorthand `User.create(data)`. Both validate against the schema before saving.

```js
// POST /api/users
router.post("/", async (req, res) => {
  try {
    const { name, email, role } = req.body;

    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required" });
    }

    const newUser = await User.create({ name, email, role });
    res.status(201).json(newUser);
  } catch (err) {
    // Mongoose schema validation failure
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    // Duplicate email (unique: true on the schema)
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email already exists" });
    }
    res.status(500).json({ error: err.message });
  }
});
```

Mongoose validates the document against the schema before saving. If `name` is missing, if `role` isn't one of `["user", "admin"]`, or if the email already exists, Mongoose throws an error before touching the database.

```
POST /api/users  { name: "Carol", email: "carol@example.com" }
        │
        ▼
User.create({ name: "Carol", email: "carol@example.com" })
  → Mongoose validates against schema  ✅
  → saves to MongoDB
        │
        ▼
{ _id: "64xyz...", name: "Carol", email: "carol@example.com",
  role: "user", createdAt: "...", updatedAt: "..." }
        │
        ▼
res.status(201).json(newUser) ✅
```

---

### PUT → `User.findByIdAndUpdate()`

Updating a document uses `findByIdAndUpdate()`. Pass `{ new: true }` to get the updated document back, and `{ runValidators: true }` to validate the changes against the schema.

```js
// PUT /api/users/:id
router.put("/:id", async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
      // new: true          → return the updated document, not the original
      // runValidators: true → validate the new values against the schema
    );

    if (!updated) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(updated);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    res.status(500).json({ error: err.message });
  }
});
```

```
PUT /api/users/64abc...  { name: "Alice Smith" }
        │
        ▼
User.findByIdAndUpdate("64abc...", { name: "Alice Smith" }, { new: true })
  → finds the document
  → applies the update
  → validates against schema
  → returns the updated document
        │
        ▼
{ _id: "64abc...", name: "Alice Smith", email: "alice@example.com", ... }
        │
        ▼
res.json(updated) ✅
```

---

### DELETE → `User.findByIdAndDelete()`

Removing a document uses `findByIdAndDelete()`. It returns the deleted document, which lets you confirm what was removed — or return `null` if the ID didn't exist.

```js
// DELETE /api/users/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ message: "User deleted", user: deleted });
  } catch (err) {
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid ID format" });
    }
    res.status(500).json({ error: err.message });
  }
});

export default router;
```

```
DELETE /api/users/64abc...
        │
        ▼
User.findByIdAndDelete("64abc...")
  → finds the document
  → removes it from MongoDB
  → returns the deleted document
        │
        ▼
{ message: "User deleted", user: { _id: "64abc...", name: "Alice" } } ✅
```

## 7. HTTP Method → Mongoose Operation Reference

| HTTP Method | Route | Mongoose Operation | What It Does |
|-------------|-------|--------------------|--------------|
| `GET` | `/api/users` | `User.find()` | Returns all documents |
| `GET` | `/api/users/:id` | `User.findById(id)` | Returns one document by `_id` |
| `GET` | `/api/users/search?name=x` | `User.find({ name: { $regex: x, $options: "i" } })` | Returns filtered documents |
| `POST` | `/api/users` | `User.create(data)` | Creates a new document |
| `PUT` | `/api/users/:id` | `User.findByIdAndUpdate(id, data, { new: true })` | Updates a document |
| `DELETE` | `/api/users/:id` | `User.findByIdAndDelete(id)` | Removes a document |

```
The pattern is always the same:

  HTTP method + URL params + body
          │
          ▼
    Mongoose method
          │
          ▼
    document or array
          │
          ▼
     res.json()
```

## 8. The Full Layered Example

Now that you understand how each HTTP method maps to a Mongoose operation, here's the same API split across the proper architecture — router, controller, service, and model. This is how you'd actually structure it in a real project.

### Folder structure

```
my-api/
│
├── server.js
├── .env
│
├── db/
│   └── connect.js
│
├── models/
│   └── User.js
│
├── routes/
│   └── users.js
│
├── controllers/
│   └── usersController.js
│
└── services/
    └── usersService.js
```

### `.env`

```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/myapp
```

> 🚨 Add `.env` to your `.gitignore` — never commit database credentials to git.

### `db/connect.js` — Database Connection

```js
import mongoose from "mongoose";
import "dotenv/config";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err.message);
    process.exit(1);
  }
}
```

### `models/User.js` — Schema and Model

```js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name:  { type: String, required: true },
    email: { type: String, required: true, unique: true },
    role:  { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
```

### `services/usersService.js` — Mongoose Queries

The service decides which Mongoose operations to call and applies your business rules. No `req`, no `res`.

```js
import { User } from "../models/User.js";

export async function getUsers() {
  return await User.find();
}

export async function getUserById(id) {
  return await User.findById(id);
}

export async function searchUsers(name) {
  return await User.find({ name: { $regex: name, $options: "i" } });
}

export async function createUser({ name, email, role }) {
  return await User.create({ name, email, role });
}

export async function updateUser(id, updates) {
  return await User.findByIdAndUpdate(
    id,
    updates,
    { new: true, runValidators: true }
  );
}

export async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}
```

### `controllers/usersController.js` — Request and Response

```js
import * as userService from "../services/usersService.js";

export async function getAllUsers(req, res, next) {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (err) { next(err); }
}

export async function getUserById(req, res, next) {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) { next(err); }
}

export async function searchUsers(req, res, next) {
  try {
    const { name } = req.query;
    if (!name) return res.status(400).json({ error: "name query parameter required" });
    const users = await userService.searchUsers(name);
    res.json(users);
  } catch (err) { next(err); }
}

export async function createUser(req, res, next) {
  try {
    const { name, email, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ error: "name and email are required" });
    }
    const newUser = await userService.createUser({ name, email, role });
    res.status(201).json(newUser);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    if (err.code === 11000) {
      return res.status(409).json({ error: "Email already exists" });
    }
    next(err);
  }
}

export async function updateUser(req, res, next) {
  try {
    const updated = await userService.updateUser(req.params.id, req.body);
    if (!updated) return res.status(404).json({ error: "User not found" });
    res.json(updated);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ error: err.message });
    }
    next(err);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const deleted = await userService.deleteUser(req.params.id);
    if (!deleted) return res.status(404).json({ error: "User not found" });
    res.json({ message: "User deleted", user: deleted });
  } catch (err) { next(err); }
}
```

### `routes/users.js` — URL Mapping

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

### `server.js` — App Entry Point

```js
import express from "express";
import { connectToDatabase } from "./db/connect.js";
import userRoutes from "./routes/users.js";

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

connectToDatabase().then(() => {
  app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
});
```

### How Each Layer Connects

```
  GET /api/users/64abc123def456789012abcd
         │
         ▼
  routes/users.js
  router.get("/:id", getUserById)
         │
         ▼
  controllers/usersController.js
  getUserById(req, res, next)
    → req.params.id = "64abc123def456789012abcd"
    → calls userService.getUserById(id)
         │
         ▼
  services/usersService.js
  getUserById(id)
    → calls User.findById(id)
         │
         ▼
  models/User.js  (Mongoose)
  User.findById("64abc123def456789012abcd")
    → queries MongoDB
         │
         ▼
  MongoDB returns the document
         │
         ▼  result travels back up through each layer
  controller receives the user object
    → res.json(user)
         │
         ▼
  Response: { _id: "64abc...", name: "Alice", email: "alice@example.com" } ✅
```

Each layer only does its one job:

| Layer | Its job |
|-------|---------|
| **Route** | Match the URL and method, call the controller |
| **Controller** | Read `req`, call the service, send `res` |
| **Service** | Apply business rules, call Mongoose methods |
| **Model** | Define the schema, provide the query interface |
| **db/connect.js** | Manage the MongoDB connection |

---

## From SQL to Mongoose — Understanding the Mapping

If you've been working with PostgreSQL, you already know how to think about data queries. This section maps everything you know from SQL directly to Mongoose so you're not starting from scratch.

### The Core Idea

SQL queries describe **what data you want from which table and under what conditions**.
Mongoose queries do the same thing — just with a different syntax and using collections instead of tables.

```
  SQL                              Mongoose

  SELECT                           .find()
  FROM users                       User  (the model)
  WHERE role = 'admin'             ({ role: "admin" })
  ORDER BY name ASC                .sort({ name: 1 })
  LIMIT 10                         .limit(10)
```

### Basic Query Mapping

| SQL Statement | Mongoose Equivalent | What It Does |
|--------------|-------------------|--------------|
| `SELECT * FROM users` | `User.find()` | Get all users |
| `SELECT * FROM users WHERE id = 1` | `User.findById("64abc...")` | Get one user by ID |
| `SELECT * FROM users WHERE role = 'admin'` | `User.find({ role: "admin" })` | Filter by a field |
| `SELECT * FROM users ORDER BY name ASC` | `User.find().sort({ name: 1 })` | Sort (1 = ASC, -1 = DESC) |
| `SELECT * FROM users LIMIT 10 OFFSET 20` | `User.find().skip(20).limit(10)` | Pagination |
| `INSERT INTO users (name, email) VALUES (...)` | `User.create({ name, email })` | Create a document |
| `UPDATE users SET role = 'admin' WHERE id = 1` | `User.findByIdAndUpdate(id, { role: "admin" })` | Update a document |
| `DELETE FROM users WHERE id = 1` | `User.findByIdAndDelete(id)` | Delete a document |
| `JOIN users ON posts.user_id = users.id` | `Post.findById(id).populate("userId")` | Get related document by reference |
| Embed related data in same row | Read document — data already inside | No join needed for embedded data |
| Complex multi-table `JOIN` | `Post.aggregate([{ $lookup: {...} }])` | Single-query combination across collections |

## Getting Data Across Multiple Documents — The JOIN Equivalent

This is one of the biggest conceptual differences between SQL and MongoDB. In SQL you always use a JOIN to combine data from multiple tables. In Mongoose you have **three different approaches** depending on how your data is structured — and choosing the right one is part of designing a MongoDB application.

### Why There Is No Single JOIN Equivalent

In SQL, data is always normalised — split across tables and joined when needed. The JOIN is unavoidable.

In MongoDB, you have a choice upfront about **how you store related data**:

```
  Related data in MongoDB — three approaches:

  ┌─────────────────────────────────────────────────────────────┐
  │  1. EMBEDDING                                               │
  │     Store related data inside the same document             │
  │     → No join needed at all                                 │
  ├─────────────────────────────────────────────────────────────┤
  │  2. REFERENCING + .populate()                               │
  │     Store an ID reference, use populate() to fetch it       │
  │     → Two database queries (like a JOIN but separate)       │
  ├─────────────────────────────────────────────────────────────┤
  │  3. AGGREGATION ($lookup)                                   │
  │     MongoDB pipeline that combines collections in one query  │
  │     → One query, more complex syntax                        │
  └─────────────────────────────────────────────────────────────┘
```

### Approach 1 — Embedding (No Join Needed)

If related data is always read together and doesn't change often, embed it directly inside the document. No join, no extra query — you read the document and everything is already there.

**SQL version — two tables, needs a JOIN:**
```sql
SELECT users.name, addresses.street, addresses.city
FROM users
JOIN addresses ON addresses.user_id = users.id
WHERE users.id = 1;
```

**MongoDB version — embedded, one query:**
```js
// Document stored as:
{
  "_id": "64abc...",
  "name": "Alice",
  "address": {
    "street": "123 Main St",
    "city": "London"
  }
}

// Query — no join needed, address is already inside
const user = await User.findById(id);
console.log(user.address.city); // "London"
```

**Best for:** data that is always read together, is small, and rarely changes independently — like a user's address, a product's dimensions, or a post's tags.

---

### Approach 2 — Referencing + `.populate()`

If related data lives in a separate collection (because it's large, changes independently, or is shared across many documents), store a reference ID and use `.populate()` to fetch the related document.

**Important:** `.populate()` makes **two separate database queries** — one to get the original document and one to fetch the referenced document. It is not a single query like a SQL JOIN.

```
  SQL JOIN (one query):             Mongoose .populate() (two queries):

  SELECT posts.*, users.*           Query 1: find post by ID
  FROM posts                              → { postId, userId: "64def..." }
  JOIN users ON ...                 Query 2: find user where _id = "64def..."
  WHERE posts.id = 1                      → { name: "Alice", email: "..." }
  ─────────────────────             Mongoose combines the results for you
  One round trip to the DB          Two round trips to the DB
```

**SQL version — JOIN across two tables:**
```sql
SELECT posts.title, posts.body, users.name AS author, users.email
FROM posts
JOIN users ON posts.user_id = users.id
WHERE posts.id = 1;
```

**Mongoose version — reference + populate:**
```js
// Schema definition
const postSchema = new mongoose.Schema({
  title:  String,
  body:   String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
});

// Query — populate replaces userId with the actual User document
const post = await Post.findById(id).populate("userId", "name email");
```

Result:
```json
{
  "_id": "64abc...",
  "title": "Hello World",
  "body": "...",
  "userId": {
    "_id": "64def...",
    "name": "Alice",
    "email": "alice@email.com"
  }
}
```

**Chaining multiple populates** — when you need data from more than one related collection:

**SQL version — multiple JOINs:**
```sql
SELECT posts.title, users.name AS author, categories.name AS category
FROM posts
JOIN users ON posts.user_id = users.id
JOIN categories ON posts.category_id = categories.id
WHERE posts.id = 1;
```

**Mongoose version — chained populates:**
```js
const post = await Post.findById(id)
  .populate("userId", "name email")
  .populate("categoryId", "name");
```

**Best for:** data that is read independently, changes frequently, or is referenced by many different documents — like users, categories, or products.

---

### Approach 3 — Aggregation with `$lookup`

For complex scenarios where you need to combine data from multiple collections in a **single query** — similar to how SQL JOINs work — MongoDB provides the aggregation pipeline with a `$lookup` stage.

> **Note for beginners:** You don't need to master `$lookup` right now. It's an advanced topic you'll encounter as your applications grow more complex. Read through this to understand what's possible, but don't worry if it feels unfamiliar — `.populate()` and embedding will cover most of what you need starting out.

**SQL version — LEFT JOIN with filtering:**
```sql
SELECT posts.title, users.name AS author, COUNT(comments.id) AS comment_count
FROM posts
JOIN users ON posts.user_id = users.id
LEFT JOIN comments ON comments.post_id = posts.id
WHERE users.role = 'admin'
GROUP BY posts.id, users.name;
```

**Mongoose version — `$lookup` aggregation:**
```js
const posts = await Post.aggregate([
  // Step 1 — join users collection
  {
    $lookup: {
      from: "users",          // collection to join
      localField: "userId",   // field in posts
      foreignField: "_id",    // field in users
      as: "author"            // name for the joined data
    }
  },
  // Step 2 — unwind the author array into a single object
  { $unwind: "$author" },

  // Step 3 — filter by author role
  { $match: { "author.role": "admin" } },

  // Step 4 — join comments collection
  {
    $lookup: {
      from: "comments",
      localField: "_id",
      foreignField: "postId",
      as: "comments"
    }
  },

  // Step 5 — shape the output
  {
    $project: {
      title: 1,
      "author.name": 1,
      commentCount: { $size: "$comments" }
    }
  }
]);
```

**Best for:** complex queries involving multiple collections, aggregations (counts, averages, totals), or cases where you need everything in a single database round trip.

### Which Approach Should You Use?

```
  Ask yourself: how is my data related?
          │
          ▼
  Is the related data always read        YES → Embed it inside the document
  together and small in size?                  No join needed
          │ NO
          ▼
  Do you need a simple lookup of         YES → Use .populate()
  one related document?                        Two queries, clean syntax
          │ NO
          ▼
  Do you need complex filtering,         YES → Use $lookup aggregation
  counting, or data from 3+                    One query, more complex
  collections in one query?
```

| Approach | SQL Equivalent | Queries to DB | Complexity | Best For |
|----------|---------------|--------------|------------|----------|
| **Embedding** | No JOIN needed | 1 | Low | Data always read together |
| **`.populate()`** | Simple JOIN | 2 | Low-Medium | One related document lookup |
| **`$lookup`** | Complex JOIN / GROUP BY | 1 | High | Multi-collection aggregations |

### Side-by-Side Code Comparison

Here's how real queries look written in both SQL and Mongoose:

**Get all users:**
```sql
-- SQL
SELECT * FROM users;
```
```js
// Mongoose
const users = await User.find();
```

**Find one user by email:**
```sql
-- SQL
SELECT * FROM users WHERE email = 'alice@email.com';
```
```js
// Mongoose
const user = await User.findOne({ email: "alice@email.com" });
```

**Filter and sort:**
```sql
-- SQL
SELECT * FROM users
WHERE role = 'admin'
ORDER BY name ASC
LIMIT 5;
```
```js
// Mongoose
const users = await User.find({ role: "admin" })
  .sort({ name: 1 })
  .limit(5);
```

**Create a record:**
```sql
-- SQL
INSERT INTO users (name, email, role)
VALUES ('Alice', 'alice@email.com', 'admin');
```
```js
// Mongoose
const user = await User.create({
  name: "Alice",
  email: "alice@email.com",
  role: "admin"
});
```

**Update a record:**
```sql
-- SQL
UPDATE users
SET role = 'admin'
WHERE id = 1;
```
```js
// Mongoose
const user = await User.findByIdAndUpdate(
  id,
  { role: "admin" },
  { new: true }
);
```

**Delete a record:**
```sql
-- SQL
DELETE FROM users WHERE id = 1;
```
```js
// Mongoose
await User.findByIdAndDelete(id);
```

---

## Mongoose Validation Errors

Unlike PostgreSQL which returns database-level errors, Mongoose catches type and schema errors **before** the query reaches MongoDB. This means you get a specific `ValidationError` you can handle cleanly:

```js
// If a required field is missing:
// ValidationError: users validation failed: email: Path `email` is required.

// If the wrong type is provided:
// ValidationError: users validation failed: age: Cast to Number failed for value "twenty-six"

// If a unique field is duplicated:
// MongoServerError: E11000 duplicate key error — email already exists
```

This is why the controller checks `err.name === "ValidationError"` separately — these are user errors (bad input) that should return a `400` status, not server errors that return a `500`.

---

## Alternative Tools

The sections above cover Mongoose, which is the recommended approach for this course. For completeness, here's how the same setup looks using the other tools you might encounter in other projects. You don't need to learn these now — but it's useful to recognise them when you see them.

### Option 1: Using the Native MongoDB Driver

### Install

```bash
npm install mongodb
```

### Connect

```js
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URI);

export async function connectToDatabase() {
  await client.connect();
}

export const db = client.db("myappdb");
```

### Use in a service

```js
const users = await db.collection("users").find().toArray();
return users;
```

The key difference: no schemas, no type validation, no model methods. You query collections directly. More control, but more responsibility for data consistency.

---

### Option 2: Using Prisma with MongoDB

For TypeScript projects, Prisma provides a schema-driven approach similar to how it works with PostgreSQL.

### Install

```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

### Schema Example

```prisma
model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  name  String
  email String @unique
}
```

### Query Example

```js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = await prisma.user.findMany();
```

---

## Summary

Even though MongoDB is a document database, the overall backend architecture remains the same as with PostgreSQL:

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
   Service        → runs Mongoose queries, returns data
      │  Mongoose query
      ▼
  MongoDB         → stores and returns documents
```

Each layer maps to a file in your project:

```
src/
├── db/connect.js        ← MongoDB connection
├── models/              ← Mongoose schemas and models
├── routes/              ← Layer 1: URL definitions
├── controllers/         ← Layer 2: request/response handling
├── services/            ← Layer 3: Mongoose queries
├── logger.js            ← Winston logger
└── server.js            ← app entry point
```

Key principles to remember:

- **Controllers never query the database directly** — they always go through a service
- **Services never handle HTTP** — they only deal with data
- **Always use environment variables** for your connection string — never hardcode it
- **Connect to MongoDB before starting the server** — use `connectToDatabase().then(() => app.listen(...))`
- **Handle ValidationErrors separately** — they're user input errors, not server errors
- **Mongoose is the recommended starting point** — it adds the schema enforcement MongoDB doesn't have natively

### Next Topics to Explore

#### 🚀 [Deployment](9-deployment.md)
Learn how to deploy your REST API to the cloud with a live database, including environment configuration, hosting platforms, and making your backend accessible in production.
