# MongoDB Setup and Introduction

You've already learned how to store data in PostgreSQL — a relational database that organises everything into tables, rows, and columns connected by foreign keys.

MongoDB is a completely different kind of database. It stores data as **documents** — flexible JSON-like objects — instead of rigid table rows. Understanding when and why to use each is a core skill for any backend developer.

By the end of this doc you will understand:
- What MongoDB is and how it differs from PostgreSQL
- How documents and collections work
- How to set up a cloud MongoDB database with Atlas
- When to choose MongoDB over PostgreSQL (and when not to)

## When to Use MongoDB vs PostgreSQL

This is the question every developer faces. Here's an honest comparison:

| | **PostgreSQL** | **MongoDB** |
|---|---|---|
| **Data structure** | Fixed schema — every row has the same columns | Flexible schema — each document can have different fields |
| **Relationships** | Strong — foreign keys, JOINs, constraints | Weaker — references exist but no enforced foreign keys |
| **Best for** | Structured data with clear relationships (users, orders, payments) | Flexible or evolving data (content, logs, user activity, configs) |
| **Queries** | SQL — powerful for complex joins and aggregations | MongoDB query language — powerful for document retrieval |
| **Transactions** | ✅ Strong ACID transactions | ⚠️ Limited (improving in recent versions) |
| **Schema changes** | ❌ Harder — requires migrations | ✅ Easy — just add new fields to documents |
| **Scaling** | Vertical (bigger server) | Horizontal (more servers) |

**Choose PostgreSQL when:**
- Your data has clear relationships (e.g. users → orders → products)
- Data consistency and integrity are critical (e.g. financial data)
- You need complex queries joining multiple entities
- Your schema is stable and unlikely to change often

**Choose MongoDB when:**
- Your data structure is flexible or evolving rapidly
- You're storing content, logs, events, or user-generated data
- Each record might have a different set of fields
- You want to embed related data rather than join it

> In practice, many applications use **both** — PostgreSQL for core business data and MongoDB for flexible content or activity logs. Neither is universally better. The right choice depends on what you're storing.

## Understanding Documents and Collections

MongoDB organises data into **collections** and **documents** — the equivalents of tables and rows in SQL.

### The Terminology Mapping

| SQL Concept | MongoDB Equivalent | What It Means |
|-------------|-------------------|---------------|
| Database | Database | A container for all your collections |
| Table | Collection | A group of related documents (e.g. `users`, `products`) |
| Row | Document | A single record — one user, one product |
| Column | Field | A piece of data inside a document (e.g. `name`, `email`) |

### Structure Comparison

```
  PostgreSQL (Relational)          MongoDB (Document)

  Database                         Database
  └── Table: students              └── Collection: students
      ├── Row: { id, name, email }     ├── Document: { name, email, courses: [...] }
      └── Row: { id, name, email }     └── Document: { name, email, courses: [...] }
```

### What a Collection Looks Like

```
students (collection)
│
├── Document 1
│   {
│     "_id": "64abc123...",
│     "name": "Alice Johnson",
│     "email": "alice@email.com",
│     "courses": ["JavaScript", "Databases"]
│   }
│
└── Document 2
    {
      "_id": "64abc456...",
      "name": "Bob Smith",
      "email": "bob@email.com",
      "courses": ["Web Development"]
    }
```

Each document is its own self-contained record. Notice that documents in the same collection don't have to have exactly the same fields — MongoDB doesn't enforce a fixed structure. Bob could have a `phoneNumber` field that Alice doesn't, and that's fine.

### The `_id` Field

Every MongoDB document automatically gets a unique `_id` field. This is MongoDB's equivalent of a primary key — it uniquely identifies each document in the collection.

```json
{
  "_id": "64abc123ef456789...",
  "name": "Alice Johnson"
}
```

You don't need to create it — MongoDB generates it automatically when you insert a document.

## Data Types in MongoDB

This is one of the most important differences from PostgreSQL, and one that catches many beginners off guard.

### PostgreSQL Enforces Types Strictly

In PostgreSQL, you define the data type for every column when you create a table. The database enforces it — if you try to put the wrong type in, it rejects the insert entirely.

```sql
CREATE TABLE users (
  name TEXT,
  age  INTEGER
);

-- ✅ Works fine
INSERT INTO users (name, age) VALUES ('Alice', 25);

-- ❌ PostgreSQL rejects this — "twenty-six" is not an integer
INSERT INTO users (name, age) VALUES ('Bob', 'twenty-six');
```

### MongoDB Does NOT Enforce Types By Default

In MongoDB, there is no schema enforcement at the database level. You can store any value in any field, and different documents in the same collection can have completely different types for the same field.

```json
{ "name": "Alice", "age": 25 }
{ "name": "Bob",   "age": "twenty-six" }
{ "name": "Carol", "age": true }
{ "name": "Dave" }
```

MongoDB accepts all of these without complaint. This is both the power and the danger of MongoDB — flexibility is great for fast development, but it means **you** are responsible for keeping your data consistent.

### Why This Matters — A Real Example

Imagine you store user ages inconsistently:

```
users (collection)
│
├── { name: "Alice", age: 25 }         ← number
├── { name: "Bob",   age: "26" }       ← string
├── { name: "Carol", age: null }       ← null
└── { name: "Dave" }                   ← field missing entirely
```

Now when you try to find users over 18:

```js
db.users.find({ age: { $gt: 18 } })
```

You get back only Alice — because MongoDB can only compare numbers to numbers. Bob's `"26"` is a string, so it doesn't match. Carol and Dave are skipped entirely.

```
  Query: find users where age > 18

  Alice  age: 25        ✅ returned  (number comparison works)
  Bob    age: "26"      ❌ skipped   (string, not compared as number)
  Carol  age: null      ❌ skipped   (null, not comparable)
  Dave   age: missing   ❌ skipped   (field doesn't exist)
```

Your query appears to work — it returns results — but you're silently missing users. This kind of bug is very hard to diagnose.

### MongoDB's Native Data Types

MongoDB does understand and store different data types correctly in BSON — it just doesn't enforce them unless you tell it to. Here are the most common ones:

| Type | Example | Notes |
|------|---------|-------|
| **String** | `"Alice"` | Text — most common |
| **Number (Int)** | `25` | Whole numbers |
| **Number (Double)** | `4.99` | Decimal numbers |
| **Boolean** | `true` / `false` | Yes/no values |
| **Array** | `["JS", "CSS"]` | List of values |
| **Object** | `{ city: "London" }` | Nested document |
| **Date** | `ISODate("2024-01-01")` | Dates and timestamps |
| **ObjectId** | `ObjectId("64abc...")` | MongoDB's unique ID type |
| **Null** | `null` | Absence of a value |

### The Solution — Mongoose Adds Type Enforcement Back

This is exactly why most Node.js applications use **Mongoose**. Mongoose lets you define a schema that enforces types at the application level before data ever reaches MongoDB:

```js
const userSchema = new mongoose.Schema({
  name: { type: String,  required: true },
  age:  { type: Number,  required: true },
  email:{ type: String,  required: true, unique: true }
});
```

Now if you try to save a user with the wrong type, Mongoose catches it:

```js
// ❌ Mongoose rejects this before it reaches MongoDB
const user = new User({ name: "Bob", age: "twenty-six" });
await user.save(); // throws ValidationError: age must be a number
```

```
  Without Mongoose                  With Mongoose
  ─────────────────                 ────────────────────
  Your code                         Your code
      │                                 │
      │ any data, any type              │ Mongoose validates types
      ▼                                 ▼
  MongoDB                           MongoDB
  (accepts everything)              (only receives valid data)
```

Think of Mongoose as a gatekeeper that enforces the rules MongoDB itself won't.

> **Key takeaway:** Raw MongoDB has no type enforcement. Mongoose adds it back. This is one of the main reasons Mongoose exists — and why you should always use it in Node.js applications rather than querying MongoDB directly without a schema.

## BSON vs JSON

MongoDB stores documents using **BSON (Binary JSON)**.

BSON is similar to JSON but designed for databases — it's faster to read and write, uses less space, and supports extra data types like dates and binary data.

```
  You write (JSON):                MongoDB stores internally (BSON):

  {                                Binary format optimised for:
    "name": "Alice",               - faster reads and writes
    "email": "alice@email.com"     - smaller storage size
  }                                - extra data types (dates, binary)
        │                                      ▲
        └──────── MongoDB converts ────────────┘
                  automatically
```

As a developer you never write or read BSON directly — you always work with normal JSON, and MongoDB handles the conversion internally. This is just useful context for understanding why MongoDB is fast.

## Where MongoDB Runs

Just like PostgreSQL, MongoDB can run locally on your computer during development, or in the cloud for production.

```
  Development                        Production

  Your Computer                      Your Computer
  │                                  │
  ├── React Frontend                 ├── React Frontend
  ├── Node.js API                    └── Node.js API
  └── MongoDB (local)                        │
                                             ▼
                                       Cloud MongoDB
                                       (Atlas / Railway)
```

### Local Connection String
```
mongodb://localhost:27017/my_database
```

> 💡 **What is port 27017?** Just like PostgreSQL always listens on port 5432, MongoDB always listens on port `27017` by default — it's the numbered "door" MongoDB opens on your computer. You'll almost never need to change it.

### Cloud Connection String
```
mongodb+srv://username:password@cluster.mongodb.net/mydatabase
```

Here's what each part of the cloud connection string means:

```
mongodb+srv://  username  :  password  @  cluster0.abc123.mongodb.net  /  mydatabase
─────────────   ────────     ────────     ──────────────────────────────   ──────────
protocol        your DB      your DB      the Atlas cluster address         database
                username     password                                        name
```

| Part | Example | What It Is |
|------|---------|-----------|
| Protocol | `mongodb+srv://` | Tells the app this is a MongoDB connection (`+srv` means it uses DNS for server discovery) |
| Username | `username` | Your Atlas database user login |
| Password | `password` | Your Atlas database user password |
| Host | `cluster0.abc123.mongodb.net` | The address of your Atlas cluster |
| Database | `mydatabase` | The name of the specific database on that cluster |

The only difference between local and cloud is the address — your code works the same way in both cases.

### Local vs Cloud — At a Glance

| | Local | Cloud (Atlas) |
|--|-------|-------|
| **Setup** | Install MongoDB on your machine | Create a database on Atlas's dashboard |
| **Internet required** | ❌ No — works offline | ✅ Yes — always |
| **Speed** | Faster — no network round trip | Slightly slower — queries travel over the internet |
| **Data lives** | On your computer | On Atlas's servers |
| **If your laptop breaks** | ⚠️ Data could be lost | ✅ Data is safe — managed by Atlas |
| **Backups** | Your responsibility | Handled automatically by Atlas |
| **Cost** | Free | Free tier available, paid for larger usage |
| **Best for** | Development and learning | Production apps and team projects |
| **Not ideal for** | Sharing with teammates or deploying | Quick local experimentation |

### Example MongoDB Cloud Providers

| Provider | Description |
|--------|-------------|
| **MongoDB Atlas** | Official MongoDB cloud hosting — most commonly used, has a free tier |
| Railway | Easy deployment platform with MongoDB support |
| Render | Cloud hosting with database support |
| DigitalOcean | Managed MongoDB clusters |

The most common option for beginners is **MongoDB Atlas** — it has a generous free tier and is by far the most widely used in the MongoDB ecosystem.

## Tools for Managing MongoDB

Just like Beekeeper Studio lets you explore your PostgreSQL database visually, there are GUI tools that let you explore your MongoDB database without writing code.

| Task | Using Code | Using a GUI Tool |
|------|-----------|---------------|
| View all documents | `db.users.find()` | Open collection — see all documents in a grid |
| Insert a document | `db.users.insertOne({...})` | Click "Add Data" and fill in fields |
| Update a document | `db.users.updateOne(...)` | Click a document and edit fields directly |
| Delete a document | `db.users.deleteOne(...)` | Select a document and click delete |
| Filter documents | `db.users.find({ name: "Alice" })` | Use the filter bar at the top |

### Common MongoDB GUI Tools

| Tool | Strengths | What It Can Do | When to Use It |
|------|-----------|----------------|----------------|
| **MongoDB Compass** ✅ Recommended | Official tool, built by MongoDB. Free. Works with any MongoDB database. | Browse documents, run queries, manage indexes, view performance, edit data visually | The go-to choice for most developers. Easiest to get started with. |
| **Studio 3T** | Feature-rich with a SQL-to-MongoDB query translator. | Advanced querying, data import/export, schema visualisation, aggregation builder | When you're coming from a SQL background and want familiar query syntax |
| **MongoDB for VS Code** | Stays inside your editor. No extra app needed. | Browse collections, run queries, connect to Atlas directly from VS Code | When you want to work without leaving your code editor |

For this course, use **MongoDB Compass**. It's free, official, and the most widely used tool in the MongoDB ecosystem.

### MongoDB Compass (Recommended)

MongoDB Compass is the **official GUI tool for MongoDB**, built by the same team.

Features:
- Visual document browser
- Document editor — edit fields directly in the UI
- Query builder with filter, sort, and project
- Index management
- Performance monitoring

Download: https://www.mongodb.com/products/compass

## Creating a Cloud MongoDB Database with MongoDB Atlas

For beginners, the easiest way to start is with **MongoDB Atlas** — you get a free database running in the cloud in minutes, no installation needed.

### Step 1 — Create an Atlas Account

Visit: https://www.mongodb.com/cloud/atlas

Click **Sign Up**. You can use GitHub, Google, or email.

After signing up you will enter the **Atlas dashboard**.

### Step 2 — Create a Cluster

Click **Create Cluster**.

Choose **Free Shared Cluster** (the M0 tier — no credit card needed).

Give your cluster a name:

```
student-database
```

Click **Create Cluster**. Atlas will provision your MongoDB database server — this usually takes about a minute.

### Step 3 — Create a Database User

MongoDB requires a username and password to connect.

In the Atlas dashboard, go to **Database Access** and create a user:

```
username: student
password: yourpassword
```

Save these — you'll need them in your connection string.

### Step 4 — Allow Network Access

By default Atlas blocks all connections. Go to **Network Access** and either:
- Add your current IP address (for local development)
- Add `0.0.0.0/0` to allow connections from anywhere (easier for learning, less secure for production)

> 🚨 **This step is the most common reason connections fail.** If you skip it or add the wrong IP, your application will time out trying to connect and give you a confusing error. When in doubt during development, use `0.0.0.0/0` to allow all connections — just remember to restrict it before you go to production.

```
  Skipped Step 4                  Completed Step 4
  ═══════════════                 ════════════════════
  Your app tries to connect       Your app connects
          │                               │
          ▼                               ▼
  Atlas blocks it silently        Atlas accepts it
          │                               │
          ▼                               ▼
  Connection timeout ❌           Database responds ✅
  (no helpful error message)
```

### Step 5 — Get Your Connection String

In the Atlas dashboard, click **Connect** → **Connect your application**.

You'll see something like:

```
mongodb+srv://student:yourpassword@cluster0.abc123.mongodb.net/mydatabase
```

Here's what each part means:

```
mongodb+srv://  student  :  yourpassword  @  cluster0.abc123.mongodb.net  /  mydatabase
─────────────   ───────     ────────────     ────────────────────────────    ──────────
protocol        username    password          your Atlas cluster address      database
                                                                               name
```

| Part | Example | What It Is |
|------|---------|-----------|
| Protocol | `mongodb+srv://` | Tells the app this is a MongoDB connection |
| Username | `student` | The database user you created in Step 3 |
| Password | `yourpassword` | The password you set in Step 3 |
| Host | `cluster0.abc123.mongodb.net` | The address Atlas assigned to your cluster |
| Database | `mydatabase` | The database name — you can change this to anything |

Copy this — you'll add it to your `.env` file in the next doc.

## MongoDB vs PostgreSQL — Quick Reference

Now that you've set up both databases, here's a quick visual summary of how the two compare day-to-day:

```
  PostgreSQL                       MongoDB

  students table:                  students collection:
  ┌────┬───────┬───────────┐       { name: "Alice", courses: [...] }
  │ id │ name  │ email     │       { name: "Bob",   courses: [...] }
  ├────┼───────┼───────────┤
  │  1 │ Alice │ alice@... │       No fixed columns — each document
  │  2 │ Bob   │ bob@...   │       can have different fields
  └────┴───────┴───────────┘

  Relationships via foreign keys:  Relationships via embedding:
  enrollments.student_id → id      { courses: ["JS", "Databases"] }

  Query language: SQL              Query language: MongoDB query API
  SELECT * FROM students           db.students.find()
  WHERE name = 'Alice'             .find({ name: "Alice" })
```

## What Happens Next

Now that you have:

- understood how **documents and collections** differ from tables and rows
- seen how to **compare MongoDB and PostgreSQL** and when to use each
- created a **MongoDB cloud database** with Atlas
- installed **MongoDB Compass** to explore your data visually
- copied your **connection string** ready to use

The next step is connecting your **Node.js Express API** to MongoDB using Mongoose, so your application can actually store and retrieve real data.

### Next Topics to Explore

#### 🔌 [Connecting APIs to MongoDB](8-mongodb-service.md)
Learn how to connect your API to MongoDB and use tools like Mongoose to create models, run queries, and manage application data.

#### 🚀 [Deployment](9-deployment.md)
Learn how to deploy your REST API to the cloud with a live database, including environment configuration, hosting platforms, and making your backend accessible in production.
