# Introduction to Databases and SQL

Modern web applications rely on databases to store, retrieve, and manage data that powers everything from user profiles to e-commerce orders.  

## What Is a Database?

A **database** is a structured system that stores information so it can be easily accessed, updated, and retrieved later.  

Unlike data kept in memory or files — which disappears when your app restarts — a database **persists data**, meaning it keeps your information available across sessions, users, and devices.  

Every time you interact with an app that remembers something, a database is working behind the scenes. When you log in to a site, your credentials come from a database. When you purchase something online, details about your order are saved there. When you post a comment, your name, text, and timestamp are all stored in a database table or document. Without a database, none of this data would survive a page refresh or server restart — every app would be "stateless" and forgetful.

Databases allow your application to remember users, store transactions, track analytics, and manage the dynamic data that powers nearly every feature in a real-world web app.

You already use applications that use databases every day.

### Real-World Examples
| Application | What the Database Stores |
|--------------|---------------------------|
| **Instagram** | Users, photos, likes, comments |
| **Online Store** | Products, orders, customers, inventory |
| **Banking App** | Accounts, balances, transactions |
| **Healthcare System** | Patients, appointments, prescriptions |

Without databases, every piece of information would have to be stored in separate files — messy, inconsistent, and impossible to manage at scale.

## Why Do We Need Databases?

Databases help us:
- **Store** data persistently (even when the app closes)
- **Organize** it into structures that make sense (tables, collections)
- **Retrieve** it efficiently using queries
- **Secure** it against unauthorized access
- **Scale** as the app grows (millions of users, orders, or messages)

In short:  
> Databases are the *brains* behind every modern software system.

## Types of Databases

Databases can be categorized in different ways depending on **how they store and organize data**.

The two most common categories you'll hear about are **Relational (SQL)** databases and **NoSQL (Non‑Relational)** databases. There are also specialized databases such as **in‑memory databases** designed for speed.

### 1. Relational Databases (SQL-Based)

Relational databases store data in **structured tables made of rows and columns**.  
They are designed to handle **clear relationships between data**, such as customers and orders.

**Key Characteristics**

- Structured schema (tables and columns defined ahead of time)
- Supports relationships between tables
- Uses **SQL (Structured Query Language)** for queries

**Examples**

- PostgreSQL  
- MySQL  
- SQLite  
- Oracle  
- Microsoft SQL Server  

**Common Use Cases**

- E‑commerce systems
- Financial software
- Reporting and analytics
- Enterprise applications

### 2. NoSQL Databases (Non‑Relational)

NoSQL databases store data in **flexible formats**, often allowing records to have different structures.

Instead of strict tables, they may store data as **documents, key‑value pairs, graphs, or other structures**.

**Key Characteristics**

- Flexible schema
- Easier horizontal scaling across servers
- Often used for rapidly evolving data models

**Examples**

- MongoDB  
- Firebase  
- Cassandra  
- DynamoDB  

**Common Use Cases**

- Real‑time applications
- Content feeds
- IoT data collection
- Large-scale distributed systems

### 3. In‑Memory Databases

In-memory databases store data **directly in RAM instead of on disk**, which makes them extremely fast.

They are commonly used for **temporary or frequently accessed data**.

**Examples**

- Redis  
- Memcached  

**Common Use Cases**

- Caching
- Session storage
- Leaderboards
- Rate limiting

Think of database types like this:

```
Databases
│
├─ Relational (SQL)
│
├─ NoSQL
│   ├─ Document
│   ├─ Key‑Value
│   └─ Graph
│
└─ In‑Memory
```

Relational databases focus on **structured relationships**, while NoSQL databases focus on **flexibility and scalability**.

## How Databases Store Data

Different databases organize data using different **data models**.

Many **NoSQL databases fall into one of these models**, while relational databases use structured tables.

| Type | Description | Example Systems | Ideal For |
|-----|-------------|----------------|-----------|
| **Relational (SQL)** | Data stored in structured tables with rows and columns. | MySQL, PostgreSQL | Banking, reporting, analytics |
| **Document (NoSQL)** | Stores data as JSON-like documents. | MongoDB | APIs, user profiles, flexible data |
| **Key-Value** | Simple pairs of keys and values. | Redis, DynamoDB | Caching, quick lookups |
| **In-Memory** | Stores data primarily in RAM for extremely fast access rather than disk. | Redis, Memcached | Caching, sessions, leaderboards |

## Choosing the Right Database

Selecting the right database depends on your **data structure, scalability needs, and team experience**.

| Consideration | SQL Databases (PostgreSQL, MySQL) | NoSQL Databases (MongoDB) |
|---|---|---|
| **Data Structure** | Best for structured, relational data with defined tables and schemas | Best for flexible or evolving data structures |
| **Common Use Cases** | Inventory systems, financial data, order management, analytics | User profiles, content feeds, social apps, rapidly changing data |
| **Schema** | Fixed schema (tables and columns must be defined) | Flexible schema (documents can vary) |
| **Scaling** | Often scales **vertically** (stronger single server) | Often scales **horizontally** (distributed across many servers) |
| **Query Language** | SQL (standardized and widely taught) | Document queries using JSON-style syntax |
| **Developer Familiarity** | Very common in industry and CS education | Often easier for JavaScript developers |

#### Quick Rule of Thumb

- Use **SQL** when your data has **clear relationships and structure**.
- Use **NoSQL** when your data is **flexible, rapidly evolving, or distributed across many servers**.

## Understanding the Three Layers of Database Interaction

When you build a web app and connect it to a database, there are always three layers involved — even if you don't think about them separately.

**Layer 1 — Your application code.** This is the Node.js or React code you write. It sends instructions like "get me all the users" or "save this new post."

**Layer 2 — A database library.** Your code doesn't talk to the database directly. It uses a library (like `pg` for PostgreSQL or Mongoose for MongoDB) that translates your code into a format the database understands.

**Layer 3 — The database server.** This is the actual database running on your computer or in the cloud. It receives the query, does the work, and sends the result back.

```
Your Application Code
        │
        │  uses a library (pg, Mongoose, Prisma...)
        ▼
Database Library
        │
        │  sends the query
        ▼
Database Server
        │
        │  stores and retrieves data
        ▼
Actual Stored Data
```

There is also a fourth tool that sits outside this chain — a **database management tool** like pgAdmin or MongoDB Compass. This is a visual app developers use to browse their database, inspect records, and run queries by hand. Your application never uses it — it's just for you as a developer.

## Level 1 --- The Database Server

This is the actual database system that stores your data.

The database server can run in two places:

### Local Database

Installed directly on your computer.

    Your Laptop
       └── PostgreSQL or MongoDB
             └── Database: myapp

**Connection examples:**

MongoDB:

    mongodb://localhost:27017/myapp

PostgreSQL:

    postgresql://localhost:5432/myapp

This setup is common during **development**.

### Cloud Database

The database runs on a remote server.

| Database | Cloud Service |
|----------|---------------|
| MongoDB | MongoDB Atlas |
| PostgreSQL | AWS RDS, Supabase, Neon, Railway |

    Cloud Server
       └── Database: myapp

Your application connects over the internet.

## Database Management Tools

A database management tool allows developers to **view and manage the database visually**.

Without one, you would have to manually type queries for everything.

These tools allow you to:

-   browse databases
-   view tables or collections
-   inspect records
-   run queries
-   edit data

| Tool | Works With |
|-----|-------------|
| MongoDB Compass | MongoDB |
| pgAdmin | PostgreSQL |
| DBeaver | MongoDB, PostgreSQL, MySQL, SQLite, many others |
| Beekeeper Studio | PostgreSQL, MySQL, SQLite |

MongoDB

    Database: myapp
       └── Collection: users
             └── Document

PostgreSQL

    Database: myapp
       └── Table: users
             └── Row

These tools are used by **developers**, not by the application itself.

## Your Application Code

Your application needs a **library** to communicate with the database
server.

Without a library, your code cannot send queries.

### MongoDB Libraries

| Library | Purpose |
|--------|---------|
| MongoDB Driver | Official database driver |
| Mongoose | ODM with schemas and validation |


    npm install mongoose


### PostgreSQL Libraries

| Library | Purpose |
|--------|---------|
| pg | Official PostgreSQL driver for Node.js |
| Prisma | ORM with schema, migrations, and type-safe queries |
| Sequelize | Popular ORM supporting PostgreSQL, MySQL, and others |
| TypeORM | TypeScript-first ORM commonly used in Node.js projects |
| Knex.js | SQL query builder often used with migrations |


    npm install pg


## How The Layers Work Together

When a user interacts with your application, several layers work together to retrieve or store data. Each layer has a specific responsibility. Let's walk through what happens at each step.

### User

This is the **person using your application**.

Examples:

- signing up for an account
- logging in
- creating a post
- viewing data

When the user performs an action, it usually triggers a **request to the backend**.

Example:

```
User clicks "Create Account"
```

### Frontend (React)

The frontend is the user interface of your application.

It runs in the user's browser.

Responsibilities:

- display UI
- collect user input
- send requests to the backend API
- display returned data

Example request:

```javascript
fetch("/api/users", {
  method: "POST",
  body: JSON.stringify({
    name: "Alice",
    email: "alice@email.com"
  })
});
```

The frontend does NOT talk directly to the database.

Instead, it communicates with the backend.

### Backend API (Node.js / Express)

The backend is the **server-side application** that contains your business logic.

Responsibilities:

- receive requests from the frontend
- validate data
- apply business rules
- interact with the database
- return responses

Example:

```
POST /api/users
```

The backend decides:

- Is the data valid?
- Should this user be created?
- What database query should run?

### Database Library

Your backend does not talk to the database directly.

Instead it uses a **database library (driver or ORM/ODM)**.

Examples:

| Database | Library |
|--------|--------|
| MongoDB | Mongoose |
| PostgreSQL | pg |
| PostgreSQL | Prisma |

These libraries allow your code to:

- send queries
- insert data
- update records
- retrieve results

Example using Mongoose:

```javascript
await User.create({
  name: "Alice",
  email: "alice@email.com"
});
```

Example using PostgreSQL:

```javascript
await pool.query(
  "INSERT INTO users(name,email) VALUES($1,$2)",
  ["Alice","alice@email.com"]
);
```

The library **translates your code into database queries**.

### Database Server

This is the **actual database system that stores your data**.

Examples:

- MongoDB
- PostgreSQL
- MySQL

The database server is responsible for:

- storing data on disk
- processing queries
- returning results
- enforcing constraints

The database might run:

- locally on your computer
- on a cloud service

Example cloud providers:

- MongoDB Atlas
- AWS RDS
- Supabase
- Neon

### Stored Data

This is the **actual data saved inside the database**.

The structure depends on the type of database.

MongoDB:

```
Database
  └── Collection
        └── Document
```

PostgreSQL:

```
Database
  └── Table
        └── Row
```

Example MongoDB document:

```json
{
  "name": "Alice",
  "email": "alice@email.com"
}
```

Example PostgreSQL row:

| id | name | email |
|----|------|------|
| 1 | Alice | alice@email.com |

## How Data Moves Through an Application

When a user interacts with an app (like clicking a button or submitting a form), the **frontend** sends a request to the **backend server** asking for data or asking to save data.

The **backend** processes that request and communicates with the **database** by running a query. The database retrieves or stores the data, then sends the result back to the backend.

Finally, the **backend sends a response to the frontend**, and the frontend updates what the user sees on the screen.

```
               USER ACTION
             (click, submit)
                   │
                   ▼
        ┌─────────────────────┐
        │   Frontend (React)  │
        │   Sends API request │
        └─────────────────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │ Backend API         │
        │ (Node / Express)    │
        │ Processes request   │
        └─────────────────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │ Database Query      │
        │ (pg / Prisma etc.)  │
        └─────────────────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │   Database Server   │
        │ (PostgreSQL, Mongo) │
        │  Stores / Gets Data │
        └─────────────────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │ Backend Sends       │
        │ Response            │
        └─────────────────────┘
                   │
                   ▼
        ┌─────────────────────┐
        │ Frontend Updates UI │
        └─────────────────────┘
                   │
                   ▼
                USER SEES
                NEW DATA
```

## What's Next: SQL

Now that we understand what databases are and how relational databases organize data, it's time to start working with **SQL queries**.

Relational databases store information in **tables**, which are made up of **rows and columns**.  
Each table represents a specific type of data — such as users, orders, or products — and each row in that table represents an individual record.

SQL is the language developers use to **retrieve and analyze the data stored inside these tables**.

We'll start by learning how to:

- Use the `SELECT` statement to retrieve data from a table  
- Select specific columns instead of the entire table  
- Filter results using conditions with `WHERE`  
- Combine conditions to narrow down results  
- Understand what tables are and how relational databases organize data
- Learn how to create tables and define their structure
- Adding, updating and delete data from tables

These skills allow developers to **query databases and manage the data inside them**, which is one of the most common tasks when building applications or analyzing data.
