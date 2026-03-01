# Working with Databases

Modern web applications rely on databases to store, retrieve, and manage data that powers everything from user profiles to e-commerce orders.  
In this section, you'll learn **why databases are essential**, the **different types of databases**, and how **MongoDB** fits into your REST API.

## What Is a Database?

A **database** is a structured system that stores information so it can be easily accessed, updated, and retrieved later.  
Unlike data kept in memory or files — which disappears when your app restarts — a database **persists data**, meaning it keeps your information available across sessions, users, and devices.  

Every time you interact with an app that remembers something, a database is working behind the scenes. When you log in to a site, your credentials come from a database. When you purchase something online, details about your order are saved there. When you post a comment, your name, text, and timestamp are all stored in a database table or document. Without a database, none of this data would survive a page refresh or server restart — every app would be “stateless” and forgetful.

Databases allow your application to remember users, store transactions, track analytics, and manage the dynamic data that powers nearly every feature in a real-world web app.

### Types of Databases

Different applications use different kinds of databases depending on how they need to organize and retrieve data:

- **Relational Databases (SQL):** Use structured tables with rows and columns, ideal for well-defined data such as customer records or financial systems.  
  Examples: MySQL, PostgreSQL, SQLite.

- **Document Databases (NoSQL):** Store flexible, JSON-like documents that can change structure over time.  
  Examples: MongoDB, CouchDB.

- **Key-Value Databases:** Store data as simple key/value pairs, perfect for caching or quick lookups.  
  Examples: Redis, DynamoDB.

- **Graph Databases:** Represent relationships between data — for instance, “User A follows User B.”  
  Examples: Neo4j, ArangoDB.

Each of these types is suited to a specific style of data. Relational databases are great when relationships and structure are critical. NoSQL databases shine when you need speed, flexibility, and scalability — particularly for modern web and mobile apps.

### Choosing the Right Database

Selecting the right database depends on your project’s needs.  
If your data is **structured and consistent**, such as an inventory or order management system, an SQL database is a strong choice.  
If your data is **flexible and evolving**, such as user profiles or content feeds, a NoSQL database like MongoDB is more efficient.

You might also think about scalability — will your data grow quickly or handle millions of users?  
In that case, NoSQL systems are easier to distribute across servers, while SQL systems may require vertical scaling (upgrading a single machine).

Another key factor is **team familiarity** — SQL has been around for decades and is taught in most computer science programs, while MongoDB is beginner-friendly for JavaScript developers because it uses JSON-style syntax.

### Who Maintains the Database?

The answer depends on the size of the team and organization:

- **Individual Developers or Small Teams:** Developers usually handle the database setup, connect it to their API, and manage the schema or collections directly. Tools like MongoDB Atlas or Supabase make this process easy and cloud-based.  
- **Medium-Sized Companies:** Backend developers manage the database design, while DevOps engineers take care of backups, scaling, and deployment.  
- **Large Enterprises:** Dedicated **Database Administrators (DBAs)** maintain databases full-time. They handle performance optimization, monitoring, backups, user permissions, and ensure reliability and security.

In every case, though, the developer still needs to understand how their code interacts with the database — even if a DBA manages it behind the scenes.

### Why APIs Need Databases

APIs are the bridge between your frontend and your data.  
When your React app calls `fetch("/api/users")`, it’s asking your backend (the API) to retrieve real information from a **database**.

### The Data Flow
```text
Frontend (React) → API (Express) → Database (MongoDB, SQL, etc.) → Response
```

The API handles all interactions between the user interface and the database — sending, updating, and deleting data as needed.

| HTTP Method | What It Does | Example |
|--------------|--------------|----------|
| **GET** | Reads data | Get a list of users |
| **POST** | Creates data | Add a new product |
| **PUT** | Updates data | Change a user’s profile info |
| **DELETE** | Deletes data | Remove a record |

This pattern — known as **CRUD** (Create, Read, Update, Delete) — is the foundation of RESTful APIs.

### How Databases Store Data

All databases aim to organize data efficiently, but they do it differently depending on their type.

| Type | Description | Example Systems | Ideal For |
|------|--------------|----------------|------------|
| **Relational (SQL)** | Data stored in structured tables with rows and columns. | MySQL, PostgreSQL | Banking, reporting, analytics |
| **Document (NoSQL)** | Stores data as JSON-like documents. | MongoDB | APIs, user profiles, flexible data |
| **Key-Value** | Simple pairs of keys and values. | Redis | Caching, quick lookups |
| **Graph** | Stores relationships between entities. | Neo4j | Social networks, recommendation engines |


### Why Web Developers Choose NoSQL

NoSQL databases like MongoDB have become popular because they’re:

✅ **Flexible** — no predefined schemas or strict table structures.  
✅ **Scalable** — built to handle large amounts of data and traffic.  
✅ **Fast** — optimized for quick reads/writes in web applications.  
✅ **JavaScript-friendly** — data looks exactly like JavaScript objects.

This flexibility means you can quickly evolve your app — add new fields or change data formats — without major database migrations.

### Local vs Cloud Databases

You can run a database **locally** (on your computer) or **in the cloud**.

| Type | Description | Example Use |
|------|--------------|--------------|
| **Local** | Installed on your machine, for development or learning. | Using MongoDB Community Edition |
| **Cloud** | Hosted on servers you access remotely. | MongoDB Atlas, AWS RDS, Firebase |

Most production APIs use **cloud-hosted databases** for scalability, backups, and 24/7 uptime.

## Enter MongoDB

MongoDB is a **document database**, which means instead of tables and rows (like SQL), it stores data as **documents** inside **collections**.

At a high level:

```text
MongoDB Database
   └── Collection (like a table)
         └── Document (like a row, but JSON)
```

Example document in a `users` collection:

```json
{
  "_id": "6740c9a1f2f3a9bc12345678",
  "name": "Alice",
  "email": "alice@example.com",
  "role": "admin"
}
```

Notice: it’s just JSON. That’s the big appeal for JS/Node developers.

### Schemas

MongoDB doesn’t *require* a structure — you can insert any JSON shape.  
But in real apps, you want consistency, so we use **Mongoose**, an ODM (Object Data Modeling) library that:

- Lets you **define schemas**
- Provides **models** for CRUD operations**
- Adds **validation** and **data rules**
- Simplifies **relationships**

So:  
**MongoDB** = flexible storage  
**Mongoose** = structure and rules

---

### Defining a Schema and Model

Install Mongoose:

```bash
npm install mongoose
```

Create a simple user model:

```js
// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  age: Number,
}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;
```

This defines how all user documents should look — consistent, validated, and easy to query.

### Setting Up Express + MongoDB

```js
// server.js
import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://127.0.0.1:27017/myapp")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err));

app.get("/api/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.post("/api/users", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ message: "Error creating user", error: err.message });
  }
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
```

You now have a working REST API with MongoDB under the hood.

### Collections vs Tables

In MongoDB, “collections” replace tables — they’re created automatically when data is inserted.  
No need for `CREATE TABLE` commands like SQL. Just insert and go!

```js
await User.create({ name: "Alice", email: "alice@example.com" });
```

MongoDB creates the collection behind the scenes.

### Modeling Relationships

MongoDB doesn’t have JOINs like SQL, but you can still connect data through **embedding** or **referencing**.

#### A. Embedding (One Document Inside Another)

Great for small data that belongs to one parent (e.g., a user’s addresses).

```js
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  addresses: [
    { street: String, city: String, country: String }
  ]
});
```

This stores everything together — fast and simple.

---

#### B. Referencing (Linking Collections)

Good for reusable or shared data, like users and posts.

```js
// models/Post.js
import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  body: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Post = mongoose.model("Post", postSchema);
export default Post;
```

Each `Post` document includes the `author` ID — a reference to a `User`.

To fetch full user data:

```js
const posts = await Post.find().populate("author");
```

`populate()` replaces the ID with the full user document.

## Full Example: Express API with Relationships
This example demonstrates how to build a small REST API using **Express**, **MongoDB**, and **Mongoose** — including user and post models with relationships.

### `server.js`

```js
import express from "express";
import mongoose from "mongoose";
import User from "./models/User.js";
import Post from "./models/Post.js";

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/blogapp")
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error(err));

// Create a new user
app.post("/api/users", async (req, res) => {
  const user = await User.create(req.body);
  res.status(201).json(user);
});

// Create a new post linked to a user
app.post("/api/posts", async (req, res) => {
  const post = await Post.create(req.body);
  res.status(201).json(post);
});

// Retrieve all posts with author information populated
app.get("/api/posts", async (req, res) => {
  const posts = await Post.find().populate("author");
  res.json(posts);
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
```

### `models/User.js`

```js
import mongoose from "mongoose";

// Define the shape of a "User" document
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
  },
  {
    timestamps: true, // adds createdAt and updatedAt automatically
  }
);

// Turn the schema into a model
const User = mongoose.model("User", userSchema);

export default User;
```

### `models/Post.js`

```js
import mongoose from "mongoose";

// Define the shape of a "Post" document
const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
    },
    // This relates each post to a specific user
    author: {
      type: mongoose.Schema.Types.ObjectId, // reference user ID
      ref: "User", // links to the User model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
```

---

### How It All Works Together

| Component | Purpose |
|------------|----------|
| **User Model** | Defines structure for user data (name, email) |
| **Post Model** | Defines structure for posts and links each post to a user |
| **Express Routes** | Handle incoming requests from clients |
| **Mongoose** | Connects your API to MongoDB and provides CRUD functionality |

### Example Requests

#### Create a User

`POST /api/users`

```json
{
  "name": "Alice",
  "email": "alice@example.com"
}
```

#### Create a Post

`POST /api/posts`

```json
{
  "title": "My first post",
  "body": "This is the content",
  "author": "PUT_USER_ID_HERE"
}
```

#### Retrieve Posts with User Info

`GET /api/posts`

Response:

```json
[
  {
    "_id": "6740fabc1234567890",
    "title": "My first post",
    "body": "This is the content",
    "author": {
      "_id": "6740f123abc4567890",
      "name": "Alice",
      "email": "alice@example.com"
    }
  }
]
```

---

### Summary

This example demonstrates:

- How to **connect MongoDB to Express** using Mongoose  
- How to define **User** and **Post** models  
- How to use **populate()** to retrieve related data  
- How to build a simple but realistic backend with relationships

This structure mirrors what’s used in production APIs — modular, scalable, and ready to integrate with a React or other frontend.

## Adding a Services Layer — Logic & Data Processing

Up to this point, your routes and controllers have been talking directly to your database models (via Mongoose).  
That works for small demos, but in larger applications, this approach can get messy.  
This is where the **Service Layer** comes in — it separates your **business logic** from your **controller logic**.

### What Is a Service?

A **service** is a plain JavaScript module that contains reusable functions responsible for:
- Fetching or saving data  
- Performing calculations or business rules  
- Handling errors and validations  
- Combining or transforming data from multiple models  

The service layer acts as the “middleman” between **controllers** (which handle HTTP requests) and **models** (which handle database structure).

### Example: Creating a User Service

### `services/userService.js`
```js
import User from "../models/User.js";

// Get all users
export const getAllUsers = async () => {
  return User.find();
};

// Create a new user
export const createUser = async (userData) => {
  // Example: basic validation
  if (!userData.email || !userData.name) {
    throw new Error("Missing required fields");
  }

  // Example: prevent duplicates
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  return User.create(userData);
};
```

### Example: Controller Using the Service

### `controllers/userController.js`
```js
import * as userService from "../services/userService.js";

export const getUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const addUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
```

>Now the **controller** just handles HTTP requests and responses —  
while the **service** deals with all the database and logic work.


### 💡 Why Add a Service Layer?

| Benefit | Description |
|----------|-------------|
| **Cleaner Controllers** | Routes stay simple — no database logic or error handling clutter. |
| **Reusability** | The same service functions can be used by APIs, background jobs, or scripts. |
| **Scalability** | Easier to add caching, validation, or external API calls later. |
| **Testability** | You can test services directly without starting an Express server. |

---

### Full Flow with Services

```text
Client (Frontend)
   ↓
Controller (Handles HTTP requests)
   ↓
Service (Business logic, talks to DB)
   ↓
Model (Mongoose schema interacting with MongoDB)
   ↓
Database (Stores the data)
```

Adding this layer turns your API from a simple demo into a **maintainable, professional-grade architecture** — one that scales as your features grow.

### ✅ Summary

- Services handle the “thinking” part of your app — the rules, data operations, and validations.  
- Controllers handle the “speaking” part — managing requests and sending responses.  
- Models handle the “storage” part — the structure of your database.  

Together, they form the backbone of a scalable Node + Express + MongoDB API.

## Using PostgreSQL Instead of MongoDB

Now that you’ve seen how to connect MongoDB to your Express API, let’s talk about **PostgreSQL (Postgres)** — one of the most popular **relational databases** in the world.  
MongoDB and Postgres solve similar problems (storing and retrieving data), but they do it in **very different ways**. Knowing when and why to use one over the other is a key backend skill.

### When to Use a Relational Database

Relational databases like PostgreSQL are great when your data is **structured**, meaning it fits neatly into tables with consistent columns and data types.  
They shine when relationships between data matter — like users, orders, products, or payments.

### Use Cases
- **E-commerce apps** — customers, orders, and inventory have clear relationships.  
- **Banking or financial systems** — data consistency and transactions are critical.  
- **Analytics dashboards** — easy to query and filter large structured datasets.  
- **Enterprise apps** — where you must enforce rules, foreign keys, and validation.

Think of Postgres as your go-to choice when you need structure, consistency, and reliability.

### PostgreSQL vs. MongoDB

| Feature | **PostgreSQL (Relational)** | **MongoDB (NoSQL / Document)** |
|----------|-----------------------------|--------------------------------|
| **Data Structure** | Tables with rows and columns | Collections with flexible JSON documents |
| **Schema** | Fixed schema (must define columns) | Dynamic schema (fields can vary per document) |
| **Relationships** | Supports joins between tables | Typically done manually with references |
| **Transactions** | Fully supported (ACID compliant) | Partial or manual transaction support |
| **Query Language** | SQL (powerful and standardized) | MongoDB Query Language (JSON-based) |
| **Best For** | Complex relationships, strict data | Flexible or rapidly changing data |
| **Scaling** | Vertical (bigger server) or horizontal with tools | Horizontal (sharding built-in) |

### ✅ Advantages of PostgreSQL
- Enforces **data integrity** and **relationships** automatically.  
- Powerful **SQL queries** for filtering, grouping, and joining.  
- Fully **ACID-compliant** (safe, consistent transactions).  
- Works great with **ORMs** like Prisma or Sequelize.  
- Open-source and production-proven (used by companies like Apple, Reddit, and Spotify).

### ⚠️ Disadvantages
- Slightly more setup than MongoDB.  
- Harder to change schema structure mid-project.  
- May be slower for highly unstructured or variable data.  

If your data changes shape frequently (e.g. different users store different fields), MongoDB might be easier.  
But if you need **accuracy**, **relationships**, and **queries**, PostgreSQL is worth it.

### How PostgreSQL Stores Data

Postgres organizes data into **databases**, **tables**, **rows**, and **columns**.

Example structure:
```
my_database
└── users
    ├── id (primary key)
    ├── name (text)
    ├── email (unique)
    └── created_at (timestamp)
```

Each row is like a record (one user).  
Each column defines what type of data can go there.  
You can create relationships between tables using **foreign keys**, e.g. `posts.user_id` links to `users.id`.


### Connecting PostgreSQL to Your Express API

You have a few options to connect Postgres to your backend.

### Option 1: Using the Native `pg` Library

This is the simplest and most direct approach — great for learning.

Install:
```bash
npm install pg
```

Connect:
```js
import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "myappdb",
  password: "password",
  port: 5432,
});

export const query = (text, params) => pool.query(text, params);
```

Then use it in your services:
```js
const result = await query("SELECT * FROM users WHERE id = $1", [id]);
return result.rows[0];
```

---

#### Option 2: Using an ORM (Object-Relational Mapper)

If you prefer JavaScript objects over raw SQL, use an ORM.

### 🔹 Prisma
- Schema-driven (you define models in a `.prisma` file)
- Type-safe queries (great with TypeScript)
- Automatically generates queries and migrations

Install:
```bash
npm install prisma --save-dev
npx prisma init
```

You’ll then define your models like this:
```prisma
model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}
```

Then in your app:
```js
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const users = await prisma.user.findMany();
```

### 🔹 Sequelize
- Works directly with models in JS.
- Less strict than Prisma, but very flexible.

Example:
```js
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("postgres://user:password@localhost:5432/myappdb");

const User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

await sequelize.sync();
```

### Option 3: Cloud Services (Hosted PostgreSQL)

You don’t always need to install Postgres locally — you can use a cloud-hosted database.

**Popular services:**
- [Supabase](https://supabase.com) — free tier, Postgres + API tools  
- [Render](https://render.com) — easy Postgres hosting  
- [Railway](https://railway.app) — simple cloud setup for Node + Postgres  
- [Neon](https://neon.tech) — fast, serverless Postgres for developers  

Each service gives you a connection URL that looks like this:
```
postgresql://user:password@host:port/database
```

You can use that in your connection pool or ORM just like a local setup.

---

### Integrating PostgreSQL Into Your REST API

Let’s revisit your architecture — with PostgreSQL in place:

```text
Client (React) → Route → Controller → Service → PostgreSQL
```

Your service layer becomes the “data translator.”  
It sends SQL queries or ORM commands, receives results, and passes them to your controller.

For example:

```js
// services/userService.js
import { query } from "../db.js";

export const getUsers = async () => {
  const result = await query("SELECT * FROM users ORDER BY id");
  return result.rows;
};
```

The rest of your app — routes, controllers, and middleware — doesn’t change.  
That’s the beauty of keeping a **layered architecture**: you can swap out databases without rewriting your entire app.

## Example: Using PostgreSQL (`pg`) in an Express REST API

Now that you have an idea of the **different ways to integrate PostgreSQL** into a REST API — using tools like the built-in **`pg`** package, Object-Relational Mappers (**ORMs**) such as **Prisma** or **Sequelize**, and query builders like **Knex.js** — let’s take a step back and see how they all fit together.

- **`pg`** gives you direct access to PostgreSQL using raw SQL queries. It’s fast, simple, and great for understanding how your database actually works.
- **Prisma** gives you a higher-level, schema-first approach and generates queries for you.
- **Knex.js** sits in the middle: you still “see” the query, but you write it in JavaScript, not SQL.

For learning, the **simplest place to start** is with the `pg` library. It teaches you how Express talks to a database at the lowest level. 

Below is a complete working example — and after it, we’ll talk about **why writing raw SQL everywhere is not what you’d do in a real production app**.

### Why You *Usually* Wouldn’t Use Raw `pg` SQL Everywhere in a Real App

Using `pg` directly is perfect for demos, courses, and small internal tools. But in a bigger, long-lived, or team-based project, hand-writing SQL inside your API code isn’t ideal. Here’s why:

1. **Security (SQL injection risk)**  
   If you ever forget to parameterize a query, you can open a security hole:
   ```js
   // ❌ unsafe
   const result = await query(`SELECT * FROM users WHERE email = '${email}'`);
   ```
   ORMs and query builders parameterize automatically, so it’s harder to make this mistake.

2. **Maintainability**  
   Raw SQL scattered through controllers, routes, and services is hard to maintain. If a column name changes, you have to find every SQL string in the codebase. With Prisma or Knex, the query is built in one way and often typed.

3. **No migration story**  
   Real apps evolve. You add columns, change types, create new tables. Tools like Prisma and Knex come with migration tools so your local, dev, and prod databases stay in sync. Raw `pg` doesn’t give you this — you have to manage SQL files yourself.

4. **Harder to refactor**  
   If you decide later to change the database structure or move to a different storage, having raw SQL embedded in tons of files makes it painful. A service layer + ORM makes it way easier.

5. **Lack of schema/typing help**  
   With raw SQL, you just get `result.rows`. You have to remember which fields exist. With Prisma, your models are defined in one place and your editor can autocomplete and type-check.

6. **Team workflows**  
   In a team, you want everyone to query data the same way. ORMs and query builders enforce consistency. Raw SQL in 15 different styles doesn’t.

So: **we’re using `pg` here to learn**, but in a production API you’d likely use a query builder (Knex) or a full ORM (Prisma) because they’re **safer, more structured, and easier to maintain**.

### 1. Setup the Database

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL
);
```

### 2. Install Dependencies

```bash
npm init -y
npm install express pg
```

### 3. Full Example (`server.js`)

```js
import express from "express";
import pkg from "pg";

const { Pool } = pkg;
const app = express();

app.use(express.json());

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "password",
  database: "myappdb",
});

const query = (text, params) => pool.query(text, params);

app.get("/api/users", async (req, res) => {
  try {
    const result = await query("SELECT id, name, email FROM users ORDER BY id");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ message: "Database error" });
  }
});

app.post("/api/users", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "name and email are required" });
  }

  try {
    const result = await query(
      "INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *",
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(400).json({ message: "Could not create user" });
  }
});

app.listen(3000, () => {
  console.log("🚀 API running on http://localhost:3000");
});
```

### Understanding the Flow

1. **Client** (React, Postman, curl) calls `/api/users`
2. Express route runs
3. Route calls Postgres using `pg`
4. Postgres sends back rows
5. Express sends JSON to the client

This is the same pattern you’ve been using with external REST APIs — now you’re just on the server side.


### When to Move to Prisma or Knex

- App is getting bigger  
- Multiple developers are working on it  
- You need migrations  
- You want relationships and type-safety  
- You don’t want raw SQL in every file

That’s when you refactor your “db calls” into Prisma/Knex — but the overall shape of your app (routes → controllers → services) stays the same.
