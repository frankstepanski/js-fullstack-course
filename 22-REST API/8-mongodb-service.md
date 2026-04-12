# Integrating MongoDB Into Your REST API

You've already connected a PostgreSQL database to your Express API. MongoDB works the same way at the architectural level — the layers don't change. What changes is **how the service layer talks to the database**.

By the end of this doc you will understand:
- How the same route → controller → service architecture works with MongoDB
- How to connect Node.js to MongoDB securely using environment variables
- How to define Mongoose schemas and models
- How to write real queries in your service layer
- How to wire everything together in a complete working example

---

## The Big Picture — The Architecture Stays the Same

Whether your application uses PostgreSQL, MongoDB, or any other database, the backend architecture is identical. The only thing that changes is what happens inside the service layer.

```
  User clicks button
        │
        │  GET /api/users
        ▼
  ┌─────────────────────┐
  │    React Frontend   │  Sends the HTTP request
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │       Route         │  Receives the request, calls the right controller
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │     Controller      │  Reads params, validates input, calls a service
  └──────────┬──────────┘
             │
             ▼
  ┌─────────────────────┐
  │      Service        │  Runs the MongoDB query, returns data
  └──────────┬──────────┘
             │  Mongoose query
             ▼
  ┌─────────────────────┐
  │      MongoDB        │  Stores and returns documents
  └─────────────────────┘
```

The responsibilities of each layer stay consistent regardless of which database you use:

| Layer | Responsibility |
|-------|---------------|
| **Client** | Sends HTTP requests from the frontend |
| **Route** | Defines API endpoints |
| **Controller** | Handles requests and returns responses |
| **Service** | Contains business logic and database operations |
| **Database** | Stores application data |

Because this structure is already covered in detail in the PostgreSQL integration doc, we won't repeat the full explanation here. The key difference with MongoDB is **what the service layer looks like**.

---

## Your Project File Structure

Here's where each piece lives when using MongoDB:

```
my-app/
│
├── src/
│   ├── db/
│   │   └── connect.js          ← MongoDB connection (created once)
│   │
│   ├── models/
│   │   └── User.js             ← Mongoose schema and model
│   │
│   ├── routes/
│   │   └── userRoutes.js       ← defines API endpoints
│   │
│   ├── controllers/
│   │   └── userController.js   ← handles requests and responses
│   │
│   ├── services/
│   │   └── userService.js      ← runs Mongoose queries
│   │
│   ├── logger.js               ← Winston logger
│   └── server.js               ← starts the Express app
│
├── .env                        ← your MongoDB connection string
└── package.json
```

Notice there's a new folder — **`models/`**. This is where your Mongoose schemas live. Unlike PostgreSQL where the table structure is defined in the database itself, with MongoDB the structure is defined in your application code using Mongoose schemas.

---

## Common Tools for Connecting Node.js to MongoDB

There are several tools available for connecting Node.js to MongoDB:

| Tool | Type | How It Works | Best For |
|------|------|-------------|----------|
| **Mongoose** ← recommended | ODM | Define schemas and models, then query through them | Most Node.js MongoDB apps |
| **MongoDB Driver** | Native driver | Sends raw queries directly to MongoDB | Full control, no schema |
| **Prisma** | Modern ORM/ODM | Schema-driven generated client | TypeScript projects |
| **Typegoose** | Mongoose wrapper | TypeScript classes for Mongoose models | TypeScript MongoDB projects |

For this course we use **Mongoose** because:
- It adds schema and type validation that raw MongoDB doesn't enforce
- It provides a clean, readable query API
- It's by far the most widely used MongoDB library in the Node.js ecosystem
- It solves the data consistency problem covered in the MongoDB setup doc

Once you're comfortable with Mongoose, understanding the other tools is straightforward.

### Where These Tools Fit in the Architecture

```
Service Layer
      │
      ▼
Database Library (Mongoose / MongoDB Driver / Prisma)
      │
      ▼
MongoDB Database
```

All of these tools ultimately do the same thing — allow your Node.js application to send queries to MongoDB and retrieve data. The difference is how much structure and validation they add.

---

## Connecting to MongoDB — Mongoose

### What Is Mongoose?

Mongoose is an **ODM (Object Document Mapper)** — the MongoDB equivalent of an ORM. It sits between your application and MongoDB and does two important things:

1. **Manages the connection** to your MongoDB database
2. **Enforces schemas** so your documents have consistent structure and types

Without Mongoose, you could accidentally store `age: "twenty-six"` when you meant `age: 26` and MongoDB would accept it silently. Mongoose catches these mistakes before they reach the database.

### Install

```bash
npm install mongoose
```

### Setting Up the Connection

Add your MongoDB connection string to `.env`:

```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mydatabase
```

Create the connection file — this is created **once** and imported by your server on startup:

```js
// src/db/connect.js
import mongoose from "mongoose";
import "dotenv/config";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1); // crash the server — a broken DB connection is not recoverable
  }
}
```

### What Happens If the Connection Fails?

Just like with PostgreSQL, if MongoDB is unreachable when your server starts you want it to fail loudly — not silently start up broken. The `process.exit(1)` above ensures the server stops immediately with a clear error message if the connection fails.

```
  MongoDB unreachable on startup:

  Server starts
        │
        ▼
  mongoose.connect() fails
        │
        ▼
  console.error("MongoDB connection failed: ...")
        │
        ▼
  process.exit(1)  ← server stops immediately with a clear error
```

---

## Defining a Schema and Model

This is where MongoDB integration differs most visibly from PostgreSQL. In PostgreSQL, the table structure lives in the database. In MongoDB, the structure is defined in your application code using a **Mongoose schema**.

### What Is a Schema?

A **schema** defines the shape of your documents — what fields exist, what types they must be, and what rules apply (required, unique, default values, etc.).

```js
// src/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,       // this field must exist
    },
    email: {
      type: String,
      required: true,
      unique: true,         // no two users can share an email
    },
    age: {
      type: Number,
      required: false,      // optional field
    },
    role: {
      type: String,
      enum: ["user", "admin"],  // only these values are allowed
      default: "user",          // default value if not provided
    },
  },
  {
    timestamps: true,       // automatically adds createdAt and updatedAt fields
  }
);

export const User = mongoose.model("User", userSchema);
```

### What Does Each Part Do?

| Option | What It Does | Example |
|--------|-------------|---------|
| `type` | Enforces the data type | `type: String` |
| `required` | Field must be present | `required: true` |
| `unique` | No duplicates allowed | `unique: true` |
| `default` | Value used if not provided | `default: "user"` |
| `enum` | Only these values allowed | `enum: ["user", "admin"]` |
| `timestamps` | Adds `createdAt` / `updatedAt` | `{ timestamps: true }` |

### What Is a Model?

A **model** is what you use to actually query the database. It's created from a schema:

```js
export const User = mongoose.model("User", userSchema);
```

Think of it like this:

```
  Schema          →  defines the rules (like a blueprint)
  Model           →  the tool you use to query (like the builder)
  MongoDB         →  where the data actually lives

  userSchema      →  "a user must have name, email, role"
  User model      →  User.find(), User.create(), User.findById()
  users collection→  the actual documents stored in MongoDB
```

Mongoose automatically uses the plural lowercase version of your model name as the collection name — `User` model → `users` collection.

---

## The Service Layer — Running Queries

The service layer is where your Mongoose queries live. Each function does one database operation and returns the result to the controller.

```js
// src/services/userService.js
import { User } from "../models/User.js";

// Get all users
export async function getAllUsers() {
  return await User.find();
}

// Get one user by ID
export async function getUserById(id) {
  return await User.findById(id); // returns null if not found
}

// Create a new user
export async function createUser(name, email, role) {
  const user = new User({ name, email, role });
  return await user.save(); // Mongoose validates before saving
}

// Update a user
export async function updateUser(id, updates) {
  return await User.findByIdAndUpdate(
    id,
    updates,
    { new: true, runValidators: true }
    // new: true      → returns the updated document, not the old one
    // runValidators  → runs schema validation on the updated fields
  );
}

// Delete a user
export async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}
```

### Common Mongoose Query Methods

| Method | What It Does | Returns |
|--------|-------------|---------|
| `User.find()` | Get all documents | Array of documents |
| `User.find({ role: "admin" })` | Get documents matching a filter | Array of documents |
| `User.findById(id)` | Get one document by `_id` | Document or null |
| `User.findOne({ email })` | Get first document matching filter | Document or null |
| `User.create({...})` | Create and save a new document | The new document |
| `User.findByIdAndUpdate(id, updates)` | Find and update a document | Updated document |
| `User.findByIdAndDelete(id)` | Find and delete a document | Deleted document |

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

---

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

## From a Relational Database to MongoDB — A Full Example

This is where the biggest mental shift happens. In PostgreSQL, related data lives in separate tables joined by foreign keys. In MongoDB, the same data is often embedded directly inside a document or referenced differently.

Let's use a realistic example — a blog application with **users**, **posts**, and **comments**.

### The PostgreSQL Version

In PostgreSQL you'd have three separate tables:

```
users
┌────┬───────┬───────────────────┐
│ id │ name  │ email             │
├────┼───────┼───────────────────┤
│  1 │ Alice │ alice@email.com   │
│  2 │ Bob   │ bob@email.com     │
└────┴───────┴───────────────────┘

posts
┌────┬─────────────────┬─────────┬───────────┐
│ id │ title           │ body    │ user_id   │
├────┼─────────────────┼─────────┼───────────┤
│  1 │ Hello World     │ ...     │ 1         │ ← belongs to Alice
│  2 │ My Second Post  │ ...     │ 1         │ ← belongs to Alice
└────┴─────────────────┴─────────┴───────────┘

comments
┌────┬──────────────┬─────────┬──────────┐
│ id │ body         │ post_id │ user_id  │
├────┼──────────────┼─────────┼──────────┤
│  1 │ Great post!  │ 1       │ 2        │ ← Bob commented on post 1
│  2 │ Thanks!      │ 1       │ 1        │ ← Alice replied
└────┴──────────────┴─────────┴──────────┘
```

To get a post with its author and comments you'd write a JOIN:

```sql
SELECT
  posts.title,
  posts.body,
  users.name AS author,
  comments.body AS comment
FROM posts
JOIN users ON posts.user_id = users.id
LEFT JOIN comments ON comments.post_id = posts.id
WHERE posts.id = 1;
```

### The MongoDB Version

In MongoDB you have two choices for how to store related data:

**Option A — Embedding** (put comments inside the post document):

```json
{
  "_id": "64abc...",
  "title": "Hello World",
  "body": "...",
  "author": {
    "name": "Alice",
    "email": "alice@email.com"
  },
  "comments": [
    { "body": "Great post!", "author": "Bob" },
    { "body": "Thanks!",     "author": "Alice" }
  ]
}
```

**Option B — Referencing** (similar to SQL foreign keys, keep separate collections):

```json
// posts collection
{
  "_id": "64abc...",
  "title": "Hello World",
  "body": "...",
  "userId": "64def..."    ← references users collection
}

// comments collection
{
  "_id": "64ghi...",
  "body": "Great post!",
  "postId": "64abc...",   ← references posts collection
  "userId": "64jkl..."    ← references users collection
}
```

### When to Embed vs When to Reference

```
  Embed when:                        Reference when:
  ──────────────────────             ──────────────────────────────
  Data is always read together       Data is read independently
  The nested data is small           The nested data grows large
  The nested data rarely changes     The nested data changes often
  e.g. comments on a post            e.g. orders for a user

  { post, comments: [...] }          posts → { userId }
  Read once, get everything          User.findById(post.userId)
```

### The Mongoose Models for the Blog App

```js
// src/models/User.js
const userSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  email: { type: String, required: true, unique: true },
});
export const User = mongoose.model("User", userSchema);

// src/models/Post.js
const postSchema = new mongoose.Schema({
  title:  { type: String, required: true },
  body:   { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
export const Post = mongoose.model("Post", postSchema);

// src/models/Comment.js
const commentSchema = new mongoose.Schema({
  body:   { type: String, required: true },
  postId: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
}, { timestamps: true });
export const Comment = mongoose.model("Comment", commentSchema);
```

The `ref: "User"` tells Mongoose this field references a document in the `users` collection — the equivalent of a foreign key in SQL.

### Querying Related Data — SQL JOIN vs Mongoose `.populate()`

In SQL you JOIN tables to combine related data. In Mongoose you use `.populate()` to replace a reference ID with the actual document.

**Get a post with its author:**

```sql
-- SQL
SELECT posts.title, posts.body, users.name AS author
FROM posts
JOIN users ON posts.user_id = users.id
WHERE posts.id = 1;
```

```js
// Mongoose
const post = await Post.findById(id).populate("userId", "name email");
// populate("userId") → replaces the userId with the actual User document
// "name email"       → only include these fields from the user (like SELECT)
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

**Get a post with its author AND all its comments:**

```sql
-- SQL
SELECT posts.title, users.name AS author, comments.body
FROM posts
JOIN users ON posts.user_id = users.id
LEFT JOIN comments ON comments.post_id = posts.id
WHERE posts.id = 1;
```

```js
// Mongoose — two separate queries
const post = await Post.findById(id).populate("userId", "name email");
const comments = await Comment.find({ postId: id }).populate("userId", "name");
```

> **Notice:** In SQL, one JOIN query fetches everything. In Mongoose with references, you often need **two separate queries** — one for the post and one for its comments. This is one of the tradeoffs of using references instead of embedding. If you had embedded comments inside the post document, you'd only need one query.

### Full Comparison — SQL vs Mongoose for the Blog App

| Operation | SQL | Mongoose |
|-----------|-----|---------|
| Get all posts | `SELECT * FROM posts` | `Post.find()` |
| Get post by ID | `SELECT * FROM posts WHERE id = 1` | `Post.findById(id)` |
| Get post with author | `JOIN users ON posts.user_id = users.id` | `Post.findById(id).populate("userId")` |
| Get all posts by a user | `SELECT * FROM posts WHERE user_id = 1` | `Post.find({ userId: id })` |
| Get comments for a post | `SELECT * FROM comments WHERE post_id = 1` | `Comment.find({ postId: id })` |
| Create a post | `INSERT INTO posts (title, body, user_id) VALUES (...)` | `Post.create({ title, body, userId })` |
| Delete a post | `DELETE FROM posts WHERE id = 1` | `Post.findByIdAndDelete(id)` |
| Count posts by user | `SELECT COUNT(*) FROM posts WHERE user_id = 1` | `Post.countDocuments({ userId: id })` |

### The Key Mental Shift

```
  PostgreSQL mindset:              MongoDB mindset:
  ─────────────────────            ──────────────────────────
  Design tables first              Design documents first
  Normalise everything             Embed what's read together
  JOIN to combine data             populate() or embed instead
  Schema lives in the DB           Schema lives in your code
  One query for related data       Sometimes multiple queries
  Foreign keys enforce links       refs are just ObjectIds
```

---

## Wiring It All Together — A Complete Example

Here's a complete working example of all layers handling user CRUD operations.

### `.env`

```bash
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mydatabase
```

### `src/db/connect.js` — Database Connection

```js
import mongoose from "mongoose";
import "dotenv/config";

export async function connectToDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection failed:", err.message);
    process.exit(1);
  }
}
```

### `src/models/User.js` — Schema and Model

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

### `src/services/userService.js` — Mongoose Queries

```js
import { User } from "../models/User.js";

export async function getAllUsers() {
  return await User.find();
}

export async function getUserById(id) {
  return await User.findById(id);
}

export async function createUser(name, email, role) {
  const user = new User({ name, email, role });
  return await user.save();
}

export async function updateUser(id, updates) {
  return await User.findByIdAndUpdate(id, updates, { new: true, runValidators: true });
}

export async function deleteUser(id) {
  return await User.findByIdAndDelete(id);
}
```

### `src/controllers/userController.js` — Request Handling

```js
import * as userService from "../services/userService.js";
import logger from "../logger.js";

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
    const { name, email, role } = req.body;
    if (!name || !email) {
      return res.status(400).json({ message: "Name and email are required" });
    }
    const user = await userService.createUser(name, email, role);
    res.status(201).json(user);
  } catch (err) {
    // Mongoose validation errors have a specific structure
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    logger.error(err);
    res.status(500).json({ message: "Failed to create user" });
  }
}

export async function updateUser(req, res) {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: err.message });
    }
    logger.error(err);
    res.status(500).json({ message: "Failed to update user" });
  }
}

export async function deleteUser(req, res) {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({ message: "User deleted" });
  } catch (err) {
    logger.error(err);
    res.status(500).json({ message: "Failed to delete user" });
  }
}
```

### `src/routes/userRoutes.js` — API Endpoints

```js
import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/",      getUsers);
router.get("/:id",   getUserById);
router.post("/",     createUser);
router.put("/:id",   updateUser);
router.delete("/:id",deleteUser);

export default router;
```

### `src/server.js` — The Express App

```js
import express from "express";
import "dotenv/config";
import { connectToDatabase } from "./db/connect.js"; // connect to MongoDB on startup
import userRoutes from "./routes/userRoutes.js";

const app = express();

app.use(express.json());
app.use("/api/users", userRoutes);

// Connect to MongoDB before starting the server
connectToDatabase().then(() => {
  app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
  });
});
```

> Calling `connectToDatabase()` before `app.listen()` ensures MongoDB is connected before the server starts accepting requests. If the connection fails, `process.exit(1)` inside `connectToDatabase` stops the server before it ever starts listening.

### Tracing a Request Through Every Layer

Let's trace a `POST /api/users` request creating a new user:

```
  1. React sends:     POST /api/users
                      { name: "Alice", email: "alice@email.com" }
                              │
  2. Route receives:  router.post("/", createUser)
                              │
  3. Controller runs: createUser(req, res)
                      reads req.body → { name, email }
                      calls userService.createUser(name, email)
                              │
  4. Service runs:    new User({ name, email })
                      user.save() → Mongoose validates schema
                              │
  5. MongoDB stores:  { _id: "64abc...", name: "Alice",
                        email: "alice@email.com",
                        role: "user",
                        createdAt: "2024-01-01T..." }
                              │
  6. Service returns: the new user document to the controller
                              │
  7. Controller sends: res.status(201).json(user)
                              │
  8. React receives:  the created user and updates the UI
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
