# Introduction to Databases and SQL

Modern web applications rely on databases to store, retrieve, and manage data that powers everything from user profiles to e-commerce orders.  

## What Is a Database?

A **database** is a structured system that stores information so it can be easily accessed, updated, and retrieved later.  

Unlike data kept in memory or files — which disappears when your app restarts — a database **persists data**, meaning it keeps your information available across sessions, users, and devices.  

Every time you interact with an app that remembers something, a database is working behind the scenes. When you log in to a site, your credentials come from a database. When you purchase something online, details about your order are saved there. When you post a comment, your name, text, and timestamp are all stored in a database table or document. Without a database, none of this data would survive a page refresh or server restart — every app would be “stateless” and forgetful.

Databases allow your application to remember users, store transactions, track analytics, and manage the dynamic data that powers nearly every feature in a real-world web app.


A **database** is a structured collection of information — stored and organized so that software and people can easily access, manage, and update it.

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

Selecting the right database depends on your project’s needs.  

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

When working with **any database** (MongoDB, PostgreSQL, etc.),
there are **three layers involved**.

    Your Application Code
            │
            │ uses a database library
            ▼
    Database Server
            │
            │ stores data
            ▼
    Actual Stored Data

Developers also typically use a **database management tool** to view and
manage the data.

    Database Management Tool
            │
            ▼
    Database Server
            │
            ▼
    Your Application Code

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

## Level 2 --- Database Management Tools

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

## Level 3 --- Your Application Code

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

When a user interacts with your application, several layers work together to retrieve or store data.

Each layer has a **specific responsibility**.

```
User
 │
 ▼
Frontend (React)
 │
 ▼
Backend API (Node.js / Express)
 │
 ▼
Database Library (pg / Prisma / Mongoose)
 │
 ▼
Database Server (PostgreSQL / MongoDB)
 │
 ▼
Stored Data (Tables / Documents)
```


```
Developer
 │
 ▼
Database Management Tool
(pgAdmin / DBeaver / Beekeeper Studio / MongoDB Compass)
 │
 ▼
Database Server
```

Let's walk through what happens at each step.

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
                   ▲
                   │
            Data Returned
                   │
                   ▲
        ┌─────────────────────┐
        │ Backend Sends       │
        │ Response            │
        └─────────────────────┘
                   ▲
                   │
        ┌─────────────────────┐
        │ Frontend Updates UI │
        └─────────────────────┘
                   ▲
                   │
                USER SEES
                NEW DATA
```
## Where SQL Fits In

So far, we've talked about what databases are and how they fit into a
modern web application.

We've seen that:

-   Applications store important information in databases
-   Backend servers communicate with those databases
-   Data is stored in structured formats such as **tables, documents, or
    key-value pairs**

In many professional applications, the database used is a **relational
database**, such as **PostgreSQL or MySQL**.

Relational databases organize information into **tables**, which are
made up of **rows and columns**, similar to a spreadsheet.

Each **table** represents a specific type of data. For example, an
application might have a table for users, another for products, and
another for orders.

Example table: `users`

  id   name    email
  ---- ------- -----------------
  1    Alice   alice@email.com
  2    Bob     bob@email.com

In this table:

-   The **columns** (`id`, `name`, `email`) describe what type of
    information is stored.
-   Each **row** represents a single record in the table.

For example, the first row represents a user named **Alice**, while the
second row represents **Bob**.

But this raises an important question:

**How does a developer actually retrieve or search through the data
stored in these tables?**

This is where **SQL** comes in.

SQL (Structured Query Language) is the language developers use to
**query relational databases** and retrieve information from tables.

For example, SQL allows us to retrieve data from a table using the
`SELECT` statement:

``` sql
SELECT * FROM users;
```

This query asks the database to return **all rows and columns** from the
`users` table.

SQL also allows developers to retrieve **specific columns** instead of
the entire table:

``` sql
SELECT name, email FROM users;
```

And it allows developers to **filter results** using conditions with the
`WHERE` clause:

``` sql
SELECT * FROM users
WHERE id = 1;
```

In other words, SQL lets developers **search, filter, and retrieve
exactly the data they need** from the tables stored in a relational
database.



## What We'll Learn Next

Now that we understand what databases are and how relational databases organize data, it's time to start working with **SQL queries**.

Relational databases store information in **tables**, which are made up of **rows and columns**.  
Each table represents a specific type of data — such as users, orders, or products — and each row in that table represents an individual record.

SQL is the language developers use to **retrieve and analyze the data stored inside these tables**.

In the next section, we'll focus on the most common SQL operation: **reading data from tables**.

We'll learn how to:

- Use the `SELECT` statement to retrieve data from a table  
- Select **specific columns** instead of the entire table  
- **Filter results** using conditions with `WHERE`  
- Use comparison operators like `=`, `>`, `<`, and `!=`  
- Combine conditions to narrow down results  

These skills allow developers to **query databases and extract exactly the information they need**, which is one of the most common tasks when building applications or analyzing data.