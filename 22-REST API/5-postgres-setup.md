# PostgreSQL Setup and Introduction

**PostgreSQL** (often called “Postgres”) is a powerful, open-source **relational database management system** known for:
- Accuracy and consistency  
- Advanced SQL support  
- Speed and scalability  
- Extensions for modern data (JSON, geospatial, full-text search)

It’s one of the most popular databases for modern **web applications** — especially those using **Node.js**, **Django**, or **Rails**.

### Common Use Cases
- Web and mobile backends  
- SaaS platforms  
- Data analytics and dashboards  
- Enterprise applications  

Earlier we learned how to write **SQL queries** like:

```sql
SELECT * FROM students;
```

But SQL by itself is just a **language**.

You need a **database system** that understands SQL and executes those commands.  
PostgreSQL is one of the systems that does that.

Think of it like this:

```
SQL → language used to ask questions
PostgreSQL → software that answers those questions
```

When you run a SQL query, PostgreSQL:

1. Receives the query  
2. Processes it  
3. Reads or updates stored data  
4. Returns the result

PostgreSQL is one of the most widely used relational databases in modern web development.

## Where PostgreSQL Runs

A PostgreSQL database server can run in two different places:

1. **Locally on your computer**
2. **In the cloud on a remote server**

Both options work the same way — they simply run on different machines.

The database software is the same, the SQL queries are the same, and the way your application connects to it is the same. The only difference is **where the database server physically runs**.

➡️ When PostgreSQL runs **locally**, the database server is installed on your own computer. Your application connects to it through `localhost`, and all of the data is stored directly on your machine. This setup is commonly used during development because it is fast, easy to experiment with, and does not require an internet connection.

➡️ When PostgreSQL runs **in the cloud**, the database server is hosted on a remote machine managed by a cloud provider. Your application connects to it over the internet using a connection URL that includes the server address, username, password, and database name. Cloud databases are typically used for deployed applications because they allow multiple users, servers, or services to access the same database from anywhere.

## Local Development Setup

When running PostgreSQL locally for a full-stack application, you will typically have **three different servers running on your computer**:

1. A **React development server** for the frontend  
2. A **Node / Express server** for the backend API  
3. A **PostgreSQL database server** storing your data  

All three are running on your machine and communicating with each other.

```
Your Computer
│
├── React Frontend Server
│       (Vite / Dev Server)
│
├── Node.js API Server
│       (Express REST API)
│
└── PostgreSQL Database Server
        (Stores tables and data)
```

In this setup, the backend API connects to PostgreSQL using a local connection such as:

```
postgresql://localhost:5432/my_database
```

This means the database server is running on **your own machine**.

Local setups are common for:

- development
- learning SQL
- testing APIs
- experimenting with database structures

Because everything runs on the same computer, the connection is usually **fast and simple to manage**.

### How a Request Flows Through the Full Stack

When a user does something in your app — like clicking a button to view their profile — here's what happens end to end:

```
  User clicks "View Profile" in the browser
          │
          │  HTTP GET /api/users/1
          ▼
  ┌─────────────────────────────┐
  │   React Frontend            │  running on localhost:5173
  │   fetch("/api/users/1")     │
  └──────────────┬──────────────┘
                 │  sends HTTP request
                 ▼
  ┌─────────────────────────────┐
  │   Node / Express API        │  running on localhost:3000
  │   GET /api/users/:id        │
  │   calls the database        │
  └──────────────┬──────────────┘
                 │  sends SQL query
                 ▼
  ┌─────────────────────────────┐
  │   PostgreSQL                │  running on localhost:5432
  │   SELECT * FROM users       │
  │   WHERE id = 1              │
  └──────────────┬──────────────┘
                 │  returns the row
                 ▼
  ┌─────────────────────────────┐
  │   Node / Express API        │
  │   res.json(user)            │  sends JSON back to React
  └──────────────┬──────────────┘
                 │
                 ▼
  ┌─────────────────────────────┐
  │   React Frontend            │
  │   displays the profile      │  user sees the result
  └─────────────────────────────┘
```

This is why three servers need to be running at the same time during development — each one handles a different part of the chain. If any one of them is stopped, the whole flow breaks.

### Installing PostgreSQL on Windows

1. Visit: https://www.postgresql.org/download/windows/

2. Download the **EDB Installer**.

3. Run the installer and follow the setup steps.

Recommended settings:

| Setting | Value |
|------|------|
| Installation Directory | Default |
| Password | Choose a password (you will use it later) |
| Port | 5432 |
| Stack Builder | Optional |

Once installation finishes, PostgreSQL will run as a **local database service**.

### Installing PostgreSQL on macOS

The easiest option for macOS is **Postgres.app**.

1. Visit: https://postgresapp.com/

2. Download **Postgres.app**

3. Move the app into your **Applications folder**

4. Open the application

You should see a small **elephant icon 🐘** in the menu bar — this means PostgreSQL is running.

## Cloud Database Setup

When using a **cloud PostgreSQL provider**, the database server is **not running on your computer**. Instead, it runs on infrastructure managed by the cloud provider.

That means you only need to run **two servers locally**:

1. Your React frontend
2. Your Node API

The database server is handled remotely by the provider.

```
Your Computer
│
├── React Frontend Server
│
└── Node.js API Server
        │
        ▼
     Internet
        │
        ▼
 Cloud PostgreSQL Server
 (Managed by provider)
```

The API connects to the database using a **remote connection string**, such as:

```
postgresql://user:password@host:port/database
```

Cloud databases are commonly used in **production environments** because the hosting provider manages:

- database servers
- backups
- scaling
- reliability
- security

### Examples of Cloud PostgreSQL Providers

Several cloud platforms allow developers to quickly create and host a PostgreSQL database without installing anything locally.  
These services provide dashboards where you can create databases, manage tables, run SQL queries, and monitor performance.

Below are some popular platforms that offer hosted PostgreSQL databases:

| Provider | Description |
|--------|-------------|
| Supabase | An open-source backend platform built on PostgreSQL. Includes database hosting, APIs, authentication, and storage. |
| Neon | A serverless PostgreSQL platform designed for modern development workflows. |
| Railway | A simple platform for deploying applications and databases with minimal setup. |
| Render | A cloud platform that provides managed PostgreSQL databases and web services. |

When using these services, the typical workflow looks like this:

👉 Create a PostgreSQL database in the provider's dashboard  
👉 Copy the **database connection string**  
👉 Add the connection string to your backend application configuration

Example connection string:

```
postgresql://myuser:mypassword@db.host.com:5432/mydatabase
```

The database server itself is fully managed by the cloud provider.


>In development, many developers use **local databases** for convenience and speed.  
In production, applications typically connect to **cloud databases** so the database can scale and remain accessible to many users.

### Local vs Cloud — At a Glance

| | Local | Cloud |
|--|-------|-------|
| **Setup** | Install PostgreSQL on your machine | Create a database on a provider's dashboard |
| **Internet required** | ❌ No — works offline | ✅ Yes — always |
| **Speed** | Faster — no network round trip | Slightly slower — queries travel over the internet |
| **Data lives** | On your computer | On the provider's servers |
| **If your laptop breaks** | ⚠️ Data could be lost | ✅ Data is safe — managed by provider |
| **Backups** | Your responsibility | Handled automatically by the provider |
| **Cost** | Free | Free tier available, paid for larger usage |
| **Best for** | Development and learning | Production apps and team projects |
| **Not ideal for** | Sharing with teammates or deploying | Quick local experimentation |

## Tools for Managing PostgreSQL

Whether you install PostgreSQL **locally on your computer** or use a **cloud provider**, the database still needs to be **managed**.

Managing a database means creating, organizing, monitoring, and maintaining the data and structure inside the database. In real applications, a database is not just a place where data sits — it is an important system that developers need to manage over time.

Examples of database management tasks include:

- creating new databases
- creating and modifying tables
- inserting or updating records
- monitoring database performance
- creating indexes for faster queries
- managing users and permissions
- backing up and restoring data
- inspecting and debugging data issues

Databases can be managed in two main ways:

1. By writing **SQL commands directly**
2. By using a **database management tool (GUI)** that provides a visual interface

Both approaches interact with the **same PostgreSQL database**, but they are used in slightly different ways depending on the task.

| Task | Using SQL | Using a Management Tool |
|-----|-----------|-------------------------|
| Create tables | `CREATE TABLE users (...)` | Click **Create Table** and define columns visually |
| Modify table structure | `ALTER TABLE users ADD COLUMN age INT;` | Edit table schema through a visual editor |
| View data | `SELECT * FROM users;` | Open a table and view rows in a grid |
| Insert records | `INSERT INTO users (...) VALUES (...);` | Add rows through a form or table editor |
| Update records | `UPDATE users SET ... WHERE ...;` | Edit values directly in the table view |
| Delete records | `DELETE FROM users WHERE ...;` | Select rows and delete them visually |
| Explore database structure | SQL queries against system tables | Browse databases, schemas, and tables in a sidebar |
| Inspect data quickly | Write `SELECT` queries | Instantly view records in a table grid |
| Manage indexes, keys, constraints | `CREATE INDEX`, `ALTER TABLE` | Configure relationships visually |
| Monitor database activity | Advanced SQL/system queries | Built-in dashboards and monitoring tools |

### Important: SQL Is Required for Applications

Even though database management tools provide convenient visual interfaces, **applications themselves do not use those tools**.

When a user interacts with an application (for example, clicking a button in a React app), the backend server must execute **SQL queries directly against the database**.

>This means that **SQL is always required when an application interacts with a database**.

Examples include:

- creating a new user account (`INSERT`)
- retrieving data for a page (`SELECT`)
- updating a profile (`UPDATE`)
- deleting a record (`DELETE`)
- creating or modifying database tables (`CREATE TABLE`, `ALTER TABLE`)

In other words, the backend server must send **SQL commands directly to the database whenever it processes a request from a user**.

In practice, developers often use **both SQL and management tools together**.

```
Developer
   │
   ├─ SQL queries (create, read, update, delete data)
   │
   └─ Database management tool (visual interface)
           │
           ▼
       PostgreSQL Database
```

SQL is used to **work with data**, while database tools help **explore and manage the database system itself**.

### Common PostgreSQL Management Tools

These tools provide a graphical interface (GUI) so you can explore your database, run SQL queries, and inspect data without typing everything in the terminal.

| Tool | Strengths | What It Can Do | When to Use It |
|------|-----------|----------------|----------------|
| **Beekeeper Studio** ✅ Recommended | Clean, beginner-friendly interface. Lightweight and fast. Open-source. | Run SQL queries, browse tables, manage connections, view and edit data | Perfect for learners and day-to-day development. The simplest way to explore your database. |
| **pgAdmin** | The official PostgreSQL tool. Most complete feature set. | Full database administration — schemas, indexes, users, backups, performance monitoring, extensions | When you need deep PostgreSQL-specific configuration or are working as a DBA |
| **DBeaver** | Works with many databases — PostgreSQL, MySQL, SQLite, Oracle, SQL Server, MongoDB | SQL editor, schema browser, data export, ER diagrams | When you work across multiple different databases and want one tool for all of them |
| **TablePlus** | Polished native app. Fast and well-designed. | Browse tables, run queries, edit data, manage connections | When you want a premium feel and are comfortable paying for a licence |

For this course, use **Beekeeper Studio**. It's free, open-source, and gets out of your way so you can focus on learning SQL.

Download: https://www.beekeeperstudio.io/

## Creating a Cloud PostgreSQL Database with Neon

For beginners, the easiest way to start working with PostgreSQL is to use a **cloud-hosted database** instead of installing PostgreSQL locally.

Cloud databases avoid installation issues and allow you to start working with SQL immediately.

You will:

1. Create a **PostgreSQL database in Neon**
2. Connect to it using **Beekeeper Studio**
3. Begin managing and exploring the database

Neon is a **serverless PostgreSQL platform** designed for developers. It allows you to create a database in seconds and provides a connection string you can use with your applications or database tools.

### Step 1 — Create a Neon Account

Go to: https://neon.tech

Click **Sign Up**.

You can sign up using:

- GitHub
- Google
- Email

Once your account is created, you will be taken to the Neon dashboard.

### Step 2 — Create a PostgreSQL Database

Inside the Neon dashboard:

1. Click **Create Project**
2. Give your project a name

Example:

student-database

3. Choose your region (the default is fine)
4. Click **Create Project**

Neon will now create a **PostgreSQL database instance** for you.

This usually takes only a few seconds.

Once finished, Neon will display your **database connection details**.

### Step 3 — Copy Your Connection String

In the Neon dashboard you will see something like:

postgresql://username:password@ep-example.us-east-1.aws.neon.tech/neondb

>This is your **database connection string**.

It tells tools and applications how to connect to your PostgreSQL database.

Here's what each part means:

```
postgresql://  username  :  password  @  ep-example.us-east-1.aws.neon.tech  :  5432  /  neondb
─────────────  ────────     ────────     ──────────────────────────────────────   ────     ──────
protocol       your DB      your DB      the server address                       port     database
               username     password     (provided by Neon)                                name
```

| Part | Example | What It Is |
|------|---------|-----------|
| Protocol | `postgresql://` | Tells the tool this is a PostgreSQL connection |
| Username | `username` | Your database login name |
| Password | `password` | Your database password |
| Host | `ep-example.us-east-1.aws.neon.tech` | The address of the server where your database lives |
| Port | `5432` | The numbered "door" PostgreSQL listens on — almost never changes |
| Database | `neondb` | The name of your specific database on that server |

> 💡 **What is port 5432?** A port is like a numbered door on a server. PostgreSQL always uses door number `5432` by default — the same way websites use port `80` for HTTP and `443` for HTTPS. You'll almost never need to change it.

You will use this connection string in database tools and applications.

### Step 4 — Install Beekeeper Studio

Download Beekeeper Studio:

https://www.beekeeperstudio.io/

Install it like any other application.

Beekeeper Studio is a **database client** that lets you visually explore your database and run SQL queries.

### Step 5 — Connect Neon to Beekeeper Studio

Open **Beekeeper Studio**.

Click **New Connection** and choose **PostgreSQL**.

The easiest way to connect is to simply **paste your Neon connection string** into the connection field.

Example:

```
postgresql://username:password@ep-example.us-east-1.aws.neon.tech/neondb
```

Beekeeper Studio will automatically extract the connection details, including:

- host
- port
- username
- password
- database

This means you **do not need to manually fill out each field** if you use the connection string.

After pasting the connection string, click:

```
Connect
```

If the connection is successful, Beekeeper Studio will open your PostgreSQL database and you will be able to begin running SQL queries and exploring your tables.

This makes the process very simple:

```
Neon → Copy Connection String → Paste in Beekeeper → Connect
```

**What success looks like:** Beekeeper Studio's left sidebar will populate with your database name, and underneath it you'll see a list of schemas including `public`. If you already created tables, they'll appear under `public`. If not, that's fine — you'll create them in the next step.

### Step 6 — Understanding the Database Sections (Schemas)

When you connect to your Neon database in Beekeeper Studio, you will see several sections listed in the sidebar. These are called **schemas**.

A schema is just a way PostgreSQL organises tables into groups — think of them like folders inside a database.

```
Database
│
├── public              ← your tables live here
├── information_schema  ← system schema (ignore)
├── pg_catalog          ← system schema (ignore)
├── neon                ← Neon internal (ignore)
└── neon_migration      ← Neon internal (ignore)
```

As a beginner you only need to care about one:

| Schema | What It Is | Do you need it? |
|--------|-----------|----------------|
| `public` | Where your application tables are created | ✅ Yes — this is where you work |
| `information_schema` | Metadata about the database structure | ❌ Not for beginners |
| `pg_catalog` | PostgreSQL internal system tables | ❌ Not for beginners |
| `neon` | Internal objects used by Neon to run the service | ❌ Not for beginners |
| `neon_migration` | Used by Neon for internal infrastructure | ❌ Not for beginners |

When you create a table like this:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
);
```

it gets created inside the `public` schema automatically. For most beginner projects, all of your tables will live here:

```
public
 ├── users
 ├── posts
 └── comments
```

You can ignore everything else in the sidebar.

### Running Queries: Two Ways

Before you start creating tables, it's important to understand that there are **two different ways** to run SQL queries against your Neon database — and they behave slightly differently.

```
Your Neon PostgreSQL Database
         │
         ├── Neon SQL Editor (browser)
         │       Built into the Neon dashboard
         │       Runs in your browser, no setup needed
         │
         └── Beekeeper Studio (desktop app)
                 Installed on your computer
                 Connects to Neon over the internet
```

| | Neon SQL Editor | Beekeeper Studio |
|--|----------------|-----------------|
| **Where it runs** | In your browser | On your computer |
| **Setup required** | ❌ None — built in | ✅ Download and install |
| **How to access** | Neon dashboard → SQL Editor tab | Open the app, connect via connection string |
| **Best for** | Quick queries, setup, and verification | Day-to-day development, browsing tables |
| **Transaction mode** | Autocommit — each statement runs independently | Wraps statements in a transaction by default |
| **See table contents** | ❌ Limited — query only | ✅ Click any table to browse rows visually |
| **Use for Step 7** | ✅ Works | ✅ Recommended |

Both tools connect to the **exact same database**. Any table you create in one will immediately appear in the other.

#### Where to Find the Neon SQL Editor

The SQL Editor is built into the Neon dashboard. You don't need to install anything — just open your project and click **SQL Editor** in the left sidebar.

```
Neon Dashboard
┌─────────────────────────────────────────────────────┐
│                                                     │
│   = my-project                                      │
│  ─────────────────────                              │
│  🏠  Home                                           │
│  💾  SQL Editor          ← click here               │
│  🌿  Branches                                       │
│  ⚙️  Settings                                       │
│                                                     │
│ ┌─────────────────────────────────────────────────┐ │
│ │  Query #1                              [ Run ]  │ │
│ │                                                 │ │
│ │  SELECT * FROM students;                        │ │
│ │                                                 │ │
│ └─────────────────────────────────────────────────┘ │
│                                                     │
│  Results                                            │
│  ┌──────┬───────────────┬─────────────────────┐     │
│  │  id  │  name         │  email              │     │
│  ├──────┼───────────────┼─────────────────────┤     │
│  │  1   │  Alice        │  alice@email.com    │     │
│  │  2   │  Bob          │  bob@email.com      │     │
│  └──────┴───────────────┴─────────────────────┘     │
└─────────────────────────────────────────────────────┘
```

This is a good place to run quick one-off queries or verify that something worked after you made a change in Beekeeper.

#### What is Autocommit?

This is the most important behavioral difference between the two tools.

When you run a query in **Neon's SQL Editor**, each statement is executed immediately and independently — this is called **autocommit** mode.

When you run a query in **Beekeeper Studio**, it wraps your statements in a **transaction block** behind the scenes. Most queries work fine inside a transaction, but a small number of PostgreSQL commands — including `CREATE DATABASE` — **cannot run inside a transaction block** at all.

```
Neon SQL Editor
─────────────────────────────────────────────────────
  CREATE TABLE students (...);
        │
        └──▶  Executes immediately ✅
              No transaction wrapper


Beekeeper Studio (default)
─────────────────────────────────────────────────────
  BEGIN;                        ← added automatically
    CREATE TABLE students (...);
          │
          └──▶  Executes inside transaction block
  COMMIT;                       ← added automatically

  CREATE TABLE:    ✅ works fine inside a transaction
  CREATE DATABASE: ❌ error — not allowed inside a transaction
```

This is why `CREATE DATABASE` works in Neon's SQL Editor but throws an error in Beekeeper Studio:

```
ERROR: CREATE DATABASE cannot run inside a transaction block
```

#### The Auto Commit Toggle in Beekeeper Studio

Beekeeper Studio has an **Auto Commit** button visible at the bottom of the SQL editor. This controls whether your queries run inside a transaction or not.

```
Beekeeper Studio — SQL Editor toolbar
┌──────────────────────────────────────────────────────────────┐
│  Query #1                                                    │
│                                                              │
│  CREATE DATABASE notesdb;                                    │
│                                                              │
│                                                              │
│  [ Auto Commit ]  [ Manual ]              [ Save ]  [ Run ]  │
└──────────────────────────────────────────────────────────────┘
         ▲
         └── This toggle controls transaction behaviour
```

| Mode | What it does | When to use it |
|------|-------------|----------------|
| **Auto Commit** | Each statement commits immediately — no transaction wrapper | Most day-to-day queries: `CREATE TABLE`, `INSERT`, `SELECT` |
| **Manual** | You must explicitly `COMMIT` or `ROLLBACK` each query | When you want full control over multi-step operations |

> 💡 For most beginner work, **Auto Commit** mode is the right choice. Leave it as the default.

Even with Auto Commit on, `CREATE DATABASE` will still fail in Beekeeper when connected to Neon — because of how Neon manages databases (see below). The toggle alone won't fix it.

#### The Rule for Neon: Never Use `CREATE DATABASE`

When working with Neon, you should **never write `CREATE DATABASE` in SQL**. Neon creates and manages databases through its dashboard — not through SQL commands.

Your database (`neondb`) already exists the moment your Neon project is created.

```
❌ Common mistake
────────────────────────────────────────────────
CREATE DATABASE notesdb;   ← don't do this
CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL
);

  Result in Beekeeper:
  ERROR: CREATE DATABASE cannot run inside a transaction block


✅ Correct approach for Neon
────────────────────────────────────────────────
-- Skip CREATE DATABASE entirely.
-- Your database already exists.

CREATE TABLE IF NOT EXISTS notes (
  id SERIAL PRIMARY KEY,
  text TEXT NOT NULL
);

  Result: ✅ Table created successfully
```

| ❌ Don't do this in Neon | ✅ Do this instead |
|--------------------------|-------------------|
| `CREATE DATABASE mydb;` in SQL | Create databases through the Neon dashboard UI |
| Run `CREATE DATABASE` in Beekeeper | Use Neon's SQL Editor if you must run it |
| Assume both tools behave identically | Know that transaction mode differs between tools |

#### Which Tool to Use and When

```
Task                                    Tool to Use
──────────────────────────────────────────────────────────
Creating tables for the first time   →  Either (both work)
Inserting seed / sample data         →  Either (both work)
Browsing table rows visually         →  Beekeeper Studio
Day-to-day development queries       →  Beekeeper Studio
Verifying a change worked            →  Neon SQL Editor
Quick one-off queries                →  Neon SQL Editor
Creating a new database              →  Neon dashboard UI
```

A common workflow is to **write and run queries in Beekeeper**, then **pop open Neon's SQL Editor to verify** the result looks right. Both views are live — they reflect the same data.

**The practical rule:**

```
For Step 7 (creating tables and seeding data)
  → Use Beekeeper Studio — it's what you'll use day-to-day

For verifying your tables exist and data looks right
  → Use Neon's SQL Editor for a quick cross-check

For CREATE DATABASE
  → Don't. Your database already exists in Neon.
```

### Step 7 — Create Your First Tables in Neon

You already know how to design tables, define primary keys, and create relationships with foreign keys. Now let's do it for real inside your Neon database using the Beekeeper Studio SQL editor.

Open the SQL editor in Beekeeper Studio and run the following queries to create a simple school database:

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE
);

CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  instructor TEXT
);

CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  course_id INTEGER REFERENCES courses(id)
);
```

Then insert some sample data to work with:

```sql
INSERT INTO students (name, email)
VALUES
('Alice Johnson', 'alice@email.com'),
('Bob Smith', 'bob@email.com'),
('Maria Garcia', 'maria@email.com');

INSERT INTO courses (title, instructor)
VALUES
('Intro to JavaScript', 'Dr. Lee'),
('Database Fundamentals', 'Dr. Patel'),
('Web Development Basics', 'Dr. Chen');

INSERT INTO enrollments (student_id, course_id)
VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 1),
(3, 3);
```

Once you've run these, click on the **students**, **courses**, and **enrollments** tables in Beekeeper Studio's sidebar to confirm the data is there. You can also run a quick JOIN to verify the relationships are working:

```sql
SELECT
  students.name,
  courses.title
FROM enrollments
JOIN students ON enrollments.student_id = students.id
JOIN courses ON enrollments.course_id = courses.id;
```

| Student | Course |
|---|---|
| Alice Johnson | Intro to JavaScript |
| Alice Johnson | Database Fundamentals |
| Bob Smith | Database Fundamentals |
| Maria Garcia | Intro to JavaScript |
| Maria Garcia | Web Development Basics |


## What Happens Next

Now that you have:

- created a **cloud PostgreSQL database**
- connected it to **Beekeeper Studio**
- created and populated tables inside Neon

You are ready for the next step.

### What's Coming Next

In the next doc you will learn how to connect your **Node.js Express API** to this PostgreSQL database. That means replacing placeholder functions like `getUserByEmail()` with real SQL queries that read and write actual data.

Here is a preview of what that looks like:

```js
// Before — placeholder
const user = getUserByEmail(email);

// After — real SQL query via pg
const result = await pool.query(
  'SELECT * FROM users WHERE email = $1',
  [email]
);
const user = result.rows[0];
```

Specifically, you will learn how to:

- Install and configure the **`pg`** library to connect Node.js to PostgreSQL
- Use a **connection pool** to manage database connections efficiently
- Write **parameterized queries** to safely read and write data
- Wire your **Express routes** to real database queries
- Handle **database errors** gracefully in your API


### Next Topics to Explore

#### 🔗 [Connecting APIs to PostgreSQL](6-postgres-service.md)  
Connect your Node.js REST API to a PostgreSQL database and learn how backend services run SQL queries to store and retrieve application data.

#### 🍃 [Using MongoDB](7-mongodb-setup.md)  
Understand how document databases work using MongoDB, including collections, documents, fields, and how data can be stored in flexible JSON-like structures.

#### 🔌 [Connecting APIs to MongoDB](8-mongodb-service.md)  
Learn how to connect your API to MongoDB and use tools like Mongoose to create models, run queries, and manage application data.

#### 🚀 [Deployment](9-deployment.md)  
Learn how to deploy your REST API to the cloud with a live database, including environment configuration, hosting platforms, and making your backend accessible in production.