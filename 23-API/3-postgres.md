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

**PostgreSQL** (often called *Postgres*) is a powerful, open-source **relational database management system**.

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

# Where PostgreSQL Runs

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

Several tools are commonly used to manage PostgreSQL databases. These tools provide a **graphical interface (GUI)** that allows developers to explore databases, run SQL queries, inspect data, and manage database structures without needing to type everything manually in the terminal.

While SQL is still the language that communicates with the database, these tools make it much easier to **visualize and manage the database structure and data**.

Below are some of the most commonly used PostgreSQL management tools.

---

### pgAdmin

**pgAdmin** is the official administration tool developed by the PostgreSQL project.  
It is designed specifically for managing PostgreSQL databases and supports nearly every feature the database offers.

Because it is built by the PostgreSQL community, it is often the **most complete and fully supported management interface** for PostgreSQL.

Features:

- full database administration interface
- supports all PostgreSQL features and extensions
- graphical tools for creating databases, schemas, tables, and indexes
- built-in SQL editor for running queries
- database performance monitoring tools
- backup and restore utilities
- user and permission management

pgAdmin is often used by **database administrators and backend developers** who need deep access to PostgreSQL configuration and management features.

Download: 
https://www.pgadmin.org/

---

### DBeaver

**DBeaver** is a popular **universal database client**, meaning it works with many different database systems—not just PostgreSQL.

It supports databases such as:

- PostgreSQL
- MySQL
- SQLite
- Oracle
- SQL Server
- MongoDB (with extensions)

Download: https://dbeaver.io/

---

### Beekeeper Studio (Recommended)

**Beekeeper Studio** is a modern and beginner-friendly SQL client designed with simplicity and usability in mind.

Compared to larger database tools, Beekeeper Studio focuses on providing a clean and lightweight interface that makes working with databases easier for developers.

Because of its simplicity, it is often a great choice for students and beginners learning SQL and databases for the first time.

Features:

- lightweight and fast interface
- easy-to-use SQL editor
- clean table data viewer
- simple database connection management
- supports PostgreSQL, MySQL, SQLite and others
- open-source and actively maintained

Beekeeper Studio is particularly useful when you want a **simple and distraction-free environment** to explore tables, run SQL queries, and inspect data.

Download:

https://www.beekeeperstudio.io/

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

It includes:

| Part | Meaning |
|-----|------|
| username | database user |
| password | database password |
| host | Neon server address |
| database | database name |

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

Neon → Copy Connection String → Paste in Beekeeper → Connect

### Step 6 - Understanding the Database Sections (Schemas)

When you connect to a PostgreSQL database in a tool like **Beekeeper Studio**, you will see several sections listed under the database. These sections are called **schemas**.

A **schema** is simply a way for PostgreSQL to **organize tables, views, and other database objects into groups**.

You can think of schemas like **folders inside a database**.

```
Database
│
├── Schema
│      └── Tables
│
├── Schema
│      └── Tables
│
└── Schema
       └── Tables
```

When you first connect to a Neon PostgreSQL database, you will usually see several schemas such as:

- `public`
- `information_schema`
- `neon`
- `neon_migration`
- `pg_catalog`

Most of these are **system schemas used internally by PostgreSQL or Neon**.

In most applications, you will primarily work with **one schema: `public`**.

#### public

The **`public` schema** is the default place where your application tables are created.

When you run a command like:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name TEXT
);
```

the table will be created inside the **public schema**.

Example:

```
public
 ├── users
 ├── posts
 └── comments
```

For most beginner projects, **all of your tables will live here**.

#### information_schema

The **`information_schema`** schema is part of the SQL standard and contains **metadata about the database**.

Metadata means **information about the structure of the database**, not the application data itself.

For example, it stores information about:

- tables
- columns
- data types
- permissions
- constraints

Developers sometimes query this schema when they want to inspect the structure of the database programmatically.

Example:

```sql
SELECT * FROM information_schema.tables;
```

For beginners, you usually do not need to modify anything here.

The **`pg_catalog`** schema is PostgreSQL’s internal system catalog. It contains PostgreSQL's internal tables and functions that describe how the database works. PostgreSQL itself relies heavily on this schema to operate.

The **`neon`** schema is created by the Neon cloud platform. It contains internal objects that Neon uses to manage and operate the database service.

The **`neon_migration`** schema is used by Neon for managing database migrations and internal infrastructure.

### Step 7 — Create Tables and Relationships

In this example we will create a simple school database with:

- students
- courses
- enrollments (which links students to courses)

#### Create the Students Table

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE
);
```

The `id` column is the **primary key**, meaning each student has a unique identifier.

#### Insert Students

```sql
INSERT INTO students (name, email)
VALUES
('Alice Johnson', 'alice@email.com'),
('Bob Smith', 'bob@email.com'),
('Maria Garcia', 'maria@email.com');
```

Example data:

| id | name | email |
|----|------|------|
| 1 | Alice Johnson | alice@email.com |
| 2 | Bob Smith | bob@email.com |
| 3 | Maria Garcia | maria@email.com |

---

#### Create the Courses Table

```sql
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  instructor TEXT
);
```

The `id` column is also the **primary key**.

#### Insert Courses

```sql
INSERT INTO courses (title, instructor)
VALUES
('Intro to JavaScript', 'Dr. Lee'),
('Database Fundamentals', 'Dr. Patel'),
('Web Development Basics', 'Dr. Chen');
```

Example data:

| id | title | instructor |
|----|------|-----------|
| 1 | Intro to JavaScript | Dr. Lee |
| 2 | Database Fundamentals | Dr. Patel |
| 3 | Web Development Basics | Dr. Chen |

---

#### Create the Enrollments Table (Relationship Table)

This table connects students and courses together.

```sql
CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  course_id INTEGER REFERENCES courses(id)
);
```

The `REFERENCES` keyword creates a **foreign key relationship** between tables.

Here:

- `student_id` points to `students.id`
- `course_id` points to `courses.id`

These are called **foreign keys**.

```
students.id  → enrollments.student_id
courses.id   → enrollments.course_id
```

#### Insert Enrollments

Now we can connect students to courses.

```sql
INSERT INTO enrollments (student_id, course_id)
VALUES
(1, 1),
(1, 2),
(2, 2),
(3, 1),
(3, 3);
```

This means:

- Alice is enrolled in Intro to JavaScript and*Database Fundamentals
- Bob is enrolled in Database Fundamentals
- Maria is enrolled in Intro to JavaScript and Web Development Basics

### Visualizing the Relationship

```
students
---------
id (PK)
name
email
   |
   | 1
   |
   | student_id
   v
enrollments
---------
id (PK)
student_id (FK)
course_id (FK)
   ^
   | course_id
   |
   | many
   |
courses
---------
id (PK)
title
instructor
```

### One Student → Many Courses

A student can enroll in multiple courses.

Example:

Alice can enroll in:

- Intro to JavaScript
- Database Fundamentals

### One Course → Many Students

A course can have many students.

Example:

Database Fundamentals might contain:

- Alice
- Bob
- Maria

### Why the Third Table Exists

Because both sides can have **many records**, this is called a:

**Many-to-Many Relationship**

```
Student  ----< Enrollments >----  Course
```

The `enrollments` table acts as the **bridge** between the two tables.

Without this table, it would be very difficult to track which students belong in which courses.

### The Relationship Structure

```
students
   │
   │ 1 student can appear many times
   ▼
enrollments
   ▲
   │
   │ many courses can appear many times
   │
courses
```

---

### How the Database Combines the Data

To view which students are in which courses, we combine the tables using a **JOIN query**.

```
students → enrollments → courses
```

Example:

```sql
SELECT
  students.name,
  courses.title
FROM enrollments
JOIN students ON enrollments.student_id = students.id
JOIN courses ON enrollments.course_id = courses.id;
```

Result:

| Student | Course |
|---|---|
| Alice | Intro to JavaScript |
| Alice | Database Fundamentals |
| Bob | Database Fundamentals |


## What Happens Next

Now that you have:

- created a **cloud PostgreSQL database**
- connected it to **Beekeeper Studio**
- create tables and inserted sample data

>You are ready for the next step.

Next we will learn how to connect our **Node.js Express API** to this database so our application can store and retrieve real data.
