# Integrating PostgreSQL Into Your REST API

Earlier we've already talked about the basic request flow for a web application:

Client → Route → Controller → Database

Now that you're learning how real backend systems are structured, we're
going to review that flow again and introduce an additional layer
called the **Service Layer**.

The updated architecture looks like this:

    Client (React) → Route → Controller → Service → PostgreSQL

This extra layer helps organize your code and is very common in
professional backend applications.

Let's walk through the flow again step‑by‑step.

## Client (React)

The **client** is the frontend application that the user interacts with.

Examples:

-   A React website
-   A mobile application
-   A dashboard interface

When a user clicks a button, submits a form, or loads a page, the
frontend sends a request to your backend API.

Example:

``` js
fetch("/api/users")
```

This request travels to your backend server.

## Route (API Endpoint)

Routes define which URLs your backend supports.

In Express, routes act like a traffic controller that decides which
function should handle a request.

Example:

``` js
router.get("/users", getUsers)
```

Meaning:

If the server receives:

    GET /users

Express calls the `getUsers` function.

Routes should stay simple. Their job is mainly to:

-   define API endpoints
-   forward requests to controllers

>Think of routes as: **The entry points into your backend API**.

## Controller (Handles the Request)

Controllers receive the request from the route and decide **what action
should happen next**.

Controllers usually:

-   read request parameters
-   validate user input
-   call a service function
-   send a response back to the client

Example:

``` js
export async function getUsers(req, res) {
  const users = await userService.getAllUsers()
  res.json(users)
}
```
Notice something important:

The controller does not talk directly to the database.

Instead it calls a **service**.

>Think of controllers as: **The manager that handles requests and responses.**

## The New Layer: Services

Now we introduce a new layer called the **Service Layer**.

A **service** is where your application's **business logic and data
operations live**.

Services are responsible for:

-   talking to the database
-   running queries
-   transforming data
-   applying business rules

Example:

``` js
export async function getAllUsers() {
  const result = await pool.query("SELECT * FROM users")
  return result.rows
}
```

Instead of putting database code inside controllers, we place it inside
services.

This separation helps keep code:

-   cleaner
-   reusable
-   easier to test
-   easier to maintain

>Think of services as: **The worker that performs the real work behind the scenes.**

## Connecting Your Service to PostgreSQL

Now that we understand how the service layer talks to the database, the next step is understanding how our Node.js application actually connects to PostgreSQL.

PostgreSQL is where your application **stores its data**, but your backend server still needs a way to **communicate with that database**.

To do that, your application creates a **database connection**. This connection allows your services to send SQL queries to PostgreSQL and receive results.

In most applications:

- The database connection is created once when the server starts
- The service layer reuses that connection whenever it needs to run queries
- A database library manages communication between Node.js and PostgreSQL

No matter what tool you choose, your application must use **some type of database library** to talk to PostgreSQL.

So in practice, **every Node.js backend must use one of these types of tools (or something similar)**.


### Common Tools for Connecting Node.js to PostgreSQL

| Tool | Type | How It Works | Best For |
|-----|-----|-----|-----|
| **pg** | Native Database Driver | Sends raw SQL queries directly to PostgreSQL | Learning SQL and having full control over queries |
| **Knex** | Query Builder | Uses JavaScript syntax to generate SQL queries | Projects that want structured queries without writing full SQL |
| **Sequelize** | ORM (Object Relational Mapper) | Define models in JavaScript and Sequelize generates SQL queries | Projects that want database models written in JS |
| **Prisma** | Modern ORM | Uses a schema file to generate a type-safe database client | Structured projects and TypeScript applications |

### Where These Tools Fit in the Architecture

No matter which tool you use, the architecture still looks like this:

```
Service Layer
      │
      ▼
Database Library (pg / Knex / Prisma / Sequelize)
      │
      ▼
PostgreSQL Database
```

All of these tools ultimately do the same thing:

**They allow your Node.js application to send queries to PostgreSQL and retrieve data.**

A simple way to think about it:

- **pg** → You write SQL yourself
- **Knex** → JavaScript builds SQL queries
- **Sequelize** → JavaScript models generate SQL
- **Prisma** → Schema + generated client generate SQL


PostgreSQL is where your application **stores its data**.

**How does our Node.js backend actually connect to the database?**

>Your backend needs a **database connection** so it can send SQL queries
to PostgreSQL and receive results.

In most applications this connection is created **once** when the server
starts, and then the service layer uses that connection whenever it
needs to run a query.

## Connecting Your Node.js Backend to PostgreSQL

Your backend needs a **database connection layer** so it can send queries to PostgreSQL and retrieve results.

No matter what approach you use, **your application must use some library or tool to communicate with the database**.  
Node.js cannot talk to PostgreSQL directly — it needs a **database driver, query builder, or ORM** to handle that communication.

The most common approaches in Node.js applications are:

- **pg** — the native PostgreSQL driver
- **Knex** — a SQL query builder
- **Sequelize** — a traditional ORM
- **Prisma** — a modern schema-driven ORM

Each option provides a different balance between **control, abstraction, and developer productivity**.

### Option 1: Using the Native `pg` Library

The **pg library** is the official PostgreSQL driver for Node.js.\
It allows your application to send **raw SQL queries directly to the
database**.

This is the **lowest-level approach**, meaning you have full control
over the SQL being executed.

#### Install

``` bash
npm install pg
```

#### Connect

``` js
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

#### Use in a service

``` js
const result = await query("SELECT * FROM users WHERE id = $1", [id]);
return result.rows[0];
```

#### Advantages

-   Maximum control over SQL queries
-   Lightweight and very fast
-   No abstraction layer hiding SQL behavior
-   Widely used in production Node.js backends

#### Disadvantages

-   You must write all SQL manually
-   No built-in migrations or schema management
-   More repetitive code for large applications
-   No automatic type safety

#### Best For

-   Developers comfortable writing SQL
-   Performance-focused applications
-   Learning how databases actually work

---

### Option 2: Using Knex (SQL Query Builder)

**Knex** is a **query builder**, which means it helps you write SQL
queries using JavaScript instead of raw SQL strings.

It still produces SQL under the hood, but provides a **structured
JavaScript API** for building queries.

#### Install

``` bash
npm install knex pg
```

#### Example

``` js
import knex from "knex";

const db = knex({
  client: "pg",
  connection: {
    host: "localhost",
    user: "postgres",
    password: "password",
    database: "myappdb",
  },
});

const users = await db("users").where({ id: 1 });
```

This generates SQL similar to:

``` sql
SELECT * FROM users WHERE id = 1;
```

#### Advantages

-   Easier to build complex queries
-   Supports migrations and schema management
-   Keeps SQL readable but structured
-   Works with multiple databases

#### Disadvantages

-   Still requires understanding SQL
-   Adds an extra abstraction layer
-   Less type safety than modern ORMs

#### Best For

-   Developers who like SQL but want cleaner code
-   Mid-size applications
-   Projects that need migrations without a full ORM

---

### Option 3: Using Sequelize (Traditional ORM)

**Sequelize** is a classic **Object-Relational Mapper (ORM)**.

ORMs allow you to interact with database records as **JavaScript objects
instead of writing SQL**.

#### Install

``` bash
npm install sequelize pg pg-hstore
```

#### Example

``` js
import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize("postgres://user:password@localhost:5432/myappdb");

const User = sequelize.define("User", {
  name: DataTypes.STRING,
  email: DataTypes.STRING,
});

await sequelize.sync();
```

#### Query Example

``` js
const users = await User.findAll();
```

#### Advantages

-   Object-based API instead of SQL
-   Mature ecosystem
-   Supports associations between models
-   Built-in migrations

#### Disadvantages

-   Can hide what SQL is actually being executed
-   Complex queries become difficult
-   Less type safety than modern tools
-   Larger abstraction layer

#### Best For

-   Applications heavily structured around models
-   Developers who prefer object-style data access
-   Older codebases that already use Sequelize

---

### Option 4: Using Prisma (Modern ORM)

**Prisma** is a newer ORM that uses a **schema-first approach**.

Instead of defining models in JavaScript, you define your database
models in a **Prisma schema file**, and Prisma generates a type-safe
client.

#### Install

``` bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

#### Schema Example

``` prisma
model User {
  id    Int     @id @default(autoincrement())
  name  String
  email String  @unique
}
```

#### Query Example

``` js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const users = await prisma.user.findMany();
```

#### Advantages

-   Excellent TypeScript support
-   Very developer friendly
-   Auto-generated queries
-   Powerful migrations
-   Strong tooling and documentation

#### Disadvantages

-   Additional build step
-   Less direct control over SQL
-   Not ideal for very complex handcrafted queries
-   Adds another layer between code and database

#### Best For

-   Modern TypeScript applications
-   Rapid development
-   Teams that want strong type safety

## Summary

Modern backend applications are typically organized into multiple layers to keep code structured and maintainable.

The request flow now looks like this:

Client → Route → Controller → Service → PostgreSQL

Each layer has a clear responsibility:

- **Client** – Sends HTTP requests from the frontend application.
- **Route** – Defines API endpoints and forwards requests to controllers.
- **Controller** – Handles incoming requests and prepares responses.
- **Service** – Contains business logic and performs database operations.
- **Database** – Stores the application's persistent data.

A key design principle is that **controllers should not communicate directly with the database**.  
Instead, controllers call **services**, and services handle the database queries.

To communicate with PostgreSQL, Node.js applications must use a **database library**.  
Common options include:

- **pg** – Native PostgreSQL driver that executes raw SQL
- **Knex** – Query builder that generates SQL using JavaScript
- **Sequelize** – ORM that interacts with the database through models
- **Prisma** – Modern ORM with schema-based modeling and strong TypeScript support

Regardless of the tool used, the architecture always follows the same pattern:

```
Service Layer
      │
      ▼
Database Library
      │
      ▼
PostgreSQL Database
```