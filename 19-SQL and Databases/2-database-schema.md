# Designing a Database Schema

Previously you learned how to read and write data with SQL commands — SELECT, INSERT, UPDATE, DELETE. But those commands assume a database already exists with tables already set up.

In the real world, somebody has to design those tables first.

This document covers two things that beginners often confuse:

- **Database design** — the thinking process of planning your database before you write any SQL
- **Database schema** — the result of that thinking, written as table definitions

But before we get into the how, let's talk about the who.

## Who Designs a Database?

This might surprise you: **the person who designs the database is not always a developer.**

Database design is fundamentally about understanding a business, its processes, and the information it needs to track. That thinking often starts long before anyone opens a code editor.

Depending on the size and type of organisation, database design might be done by:

**A developer** — on small projects and startups, the developer who builds the app often designs the database too. They understand what data the app needs and translate that directly into tables. This is the most common situation for beginners.

**A database administrator (DBA)** — larger companies often have dedicated DBAs whose entire job is designing, maintaining, and optimising databases. They focus purely on the data layer and may never write a line of application code.

**A data architect** — in enterprise organisations, a data architect designs the overall data strategy across many systems and databases. They think about how data flows between different parts of a business, not just a single app.

**A business analyst** — business analysts often do the early design work by talking to stakeholders, understanding requirements, and mapping out what information the business needs to capture — before any technical person gets involved. Their output (often an ERD or a requirements document) becomes the input for whoever builds the database.

**A product manager or founder** — on very early-stage startups, it's sometimes the product manager or even the founder who sketches the first version of the data model, deciding what the product needs to track before a developer is hired.

### What they all have in common

Regardless of their title, the person designing a database needs to understand:

- What the application or business actually does
- What information needs to be captured and stored
- How that information relates to other information
- How the data will be queried and used

Technical SQL knowledge helps, but it's not the starting point. The starting point is understanding the problem. A great database design comes from asking good questions, not from knowing SQL syntax.

> 💡 **As a developer**, you will often wear multiple hats — designing the database *and* building it. But knowing that design is a separate skill from building helps you approach each phase with the right mindset.

## What Is a Database Schema?

A **schema** is the finished blueprint of your database — the result of the design process.

It defines:

- What tables exist
- What columns each table has
- What type of data each column holds
- Which columns are required
- How the tables relate to each other

Think of the schema like the floor plan of a house. The floor plan doesn't have any furniture in it yet — it just defines the rooms and how they connect. Your schema is the floor plan. The actual data (the rows) is the furniture that gets added once the house is built.

```
Schema (the blueprint)          Data (added later)
──────────────────────          ─────────────────────────
users table                     Alice, Bob, Carla...
  id       (integer)
  name     (text)
  email    (text)

posts table                     "My first post", "Hello world"...
  id       (integer)
  title    (text)
  user_id  (links to users)
```

The schema lives in the database itself — when you run `CREATE TABLE`, you are writing the schema. Every developer on your team works from the same schema, and every row of data must fit its rules.

## Design First, Build Second

Here is the key habit to develop: **always design before you build.**

A beginner's instinct is to jump straight into writing SQL. The problem with that is you often discover halfway through that your tables don't connect properly, or you've stored something in the wrong place, or you need to restructure everything. That's painful once real data is involved.

The professional approach:

```
1. Understand what the app needs to store   (thinking)
2. Sketch out the tables and relationships  (designing)
3. Review the design — does it make sense? (checking)
4. Write the SQL to create the tables      (building)
5. Add data and start querying             (using)
```

Steps 1 to 3 are database design. Step 4 is where you produce the schema. Steps 1 to 3 should happen on paper or a whiteboard — not in a code editor.

Getting the schema right before you start building saves an enormous amount of time. A few hours of thinking upfront is worth it.

## How to Go From an Idea to a Schema

When you start building an application, you have a rough idea of what it does. The schema design process turns that rough idea into a precise set of tables. Here is a reliable process to follow.

### Step 1 — Write down what your app needs to store

Start with a simple question: **what are the things my app deals with?**

Don't think about tables or SQL yet. Just write down the real-world concepts in plain English.

For a blog application:

```
Users
Posts
Comments
Tags
```

For an e-commerce store:

```
Customers
Products
Orders
Reviews
Categories
```

These are your **entities** — the main things your application cares about. Each entity will likely become a table.

---

### Step 2 — Write down what you need to know about each entity

For each entity, list the pieces of information you need to store. These will become your columns.

For a blog:

```
Users
  - name
  - email
  - password
  - joined date

Posts
  - title
  - body
  - published date
  - author (which user wrote it)

Comments
  - body
  - posted date
  - author (which user wrote it)
  - which post it belongs to

Tags
  - name
```

Keep it to what you actually need. A common mistake is designing columns for information you might want "someday" — this clutters your schema and makes your codebase harder to maintain. Start lean. You can always add columns later with `ALTER TABLE`.

---

### Step 3 — Identify the relationships

Now look at your entities and ask: **how do these things connect to each other?**

There are three types of relationships you'll encounter:

**One-to-one** — one row in a table relates to exactly one row in another table.

- A user has one profile → **one-to-one**

This is less common. You'd use it when you want to split a table that's getting very wide, or to keep optional or sensitive data (like billing details) separate from the main record.

**One-to-many** — one row in a table relates to many rows in another table. This is the most common relationship.

- A user can write many posts → **one-to-many**
- A user can write many comments → **one-to-many**
- A post can have many comments → **one-to-many**

**Many-to-many** — many rows in one table relate to many rows in another. This always requires a junction table to represent it.

- A post can have many tags; a tag can belong to many posts → **many-to-many**

Writing these out in plain English before touching SQL helps you spot the structure clearly.

> 💡 **Something to think about:** for every relationship you define, you'll also need to decide what happens when a parent row is deleted. If a user is deleted, should their posts be deleted too? Or should the deletion be blocked until the posts are removed first? You don't need to answer this now, but it's worth noting as you sketch your relationships. The next document covers this in full when you write the actual foreign key SQL.

---

### Step 4 — Draw it out

Before writing SQL, sketch the schema visually. You don't need special software — a piece of paper or a whiteboard works fine.

The standard diagram for this is an **Entity Relationship Diagram (ERD)**. An ERD shows your tables as boxes, their columns as rows inside the box, and lines between boxes to represent relationships.

- Each box is a table
- Each row inside the box is a column
- PK means Primary Key — the unique identifier for that row
- FK means Foreign Key — a column that links to another table
- The lines and arrows between boxes show which tables are connected
- The labels on the lines (1:N, N:1) show what type of relationship it is

Here's what the blog **ERD** looks like:

```
┌──────────────────┐                    ┌──────────────────┐
│    customers     │                    │      books       │
│──────────────────│                    │──────────────────│
│ id        PK     │                    │ id        PK     │
│ name             │                    │ title            │
│ email            │                    │ author           │
│ address          │                    │ price            │
└──────────────────┘                    └──────────────────┘
        │                                       ▲
        │ 1:N                                   │ N:1
        ▼                                       │
┌──────────────────┐              ┌─────────────────────────┐
│     orders       │              │       order_items       │
│──────────────────│              │─────────────────────────│
│ id        PK     │◄──── N:1 ─── │ order_id       FK       │
│ date_placed      │              │ book_id        FK       │
│ customer_id  FK  │              │ id             PK       │
└──────────────────┘              └─────────────────────────┘
```

Let's read it together:

- **customers → orders** — the arrow goes from customers down to orders labelled 1:N. One customer can place many orders. The customer_id FK column in orders is what creates that link.
- **order_items → orders** — the order_id FK in order_items points back to orders labelled N:1. Many order_items can belong to one order.
- **order_items → books** — the book_id FK in order_items points up to books labelled N:1. Many order_items can reference one book.
- Together, **order_items** creates the many-to-many between orders and books — one order can contain many books, and one book can appear in many orders.

## Normalisation — Avoiding Duplicate Data

One of the most important principles in database design is **normalisation** — the process of organising your schema to avoid storing the same data in multiple places.

### Why duplication is a problem

Imagine you stored a user's name directly on every post they wrote:

```
posts table
┌────┬──────────────────────┬──────────────┐
│ id │ title                │ author_name  │
├────┼──────────────────────┼──────────────┤
│  1 │ My first post        │ Alice Smith  │
│  2 │ Learning SQL         │ Alice Smith  │
│  3 │ A guide to React     │ Alice Smith  │
└────┴──────────────────────┴──────────────┘
```

Now Alice gets married and changes her name. You have to update every single post she ever wrote. Miss one, and your data is inconsistent — some posts say "Alice Smith" and some say "Alice Jones."

The fix is to store Alice's name once, in the `users` table, and reference it by `user_id`:

```
posts table                        users table
┌────┬──────────────────┬─────────┐  ┌────┬─────────────┐
│ id │ title            │ user_id │  │ id │ name        │
├────┼──────────────────┼─────────┤  ├────┼─────────────┤
│  1 │ My first post    │    1    │  │  1 │ Alice Jones │
│  2 │ Learning SQL     │    1    │  │  2 │ Bob         │
│  3 │ A guide to React │    1    │  └────┴─────────────┘
└────┴──────────────────┴─────────┘

Now updating Alice's name is one change in one place. ✓
```

This is the core idea of normalisation: **each piece of information lives in exactly one place**, and everything else references it.

### The practical rules to remember

You don't need to memorise the formal normalisation rules (1NF, 2NF, 3NF) as a beginner. The practical version comes down to three questions:

**1. Am I storing the same value in multiple rows?**
If yes, that value probably belongs in its own table.

```
❌  posts: author_name = "Alice Smith" in every row
✅  posts: user_id = 1, and users: name = "Alice Smith" in one row
```

**2. Does this column describe this table, or something else?**
A `posts` table should describe posts. If a column is really describing a user (like their email), it belongs in `users`.

```
❌  posts: title, body, author_email   ← author_email describes a user
✅  posts: title, body, user_id        ← user_id points to the user
```

**3. Could this column hold multiple values?**
If a column might need to store a list (like multiple tags on a post), that's a sign you need a separate table and a many-to-many relationship.

```
❌  posts: tags = "sql, databases, backend"  ← multiple values in one column
✅  post_tags junction table linking posts to individual tag rows
```


## A Full Example — Designing a Blog Schema

Let's walk through the complete design process for a simple blog app. We'll go one step at a time, keeping it simple.

### The app needs to:

- Let users write posts
- Let users leave comments on posts

That's it. We're keeping the scope small so the design is easy to follow. Tags can always be added later.

---

### Step 1 — Identify the entities

What are the main *things* this app deals with?

```
users
posts
comments
```

Three things. Each one will become a table.

---

### Step 2 — List what you need to know about each one

For each entity, what information do you need to store?

```
users
  - name
  - email
  - password

posts
  - title
  - body
  - who wrote it (which user)

comments
  - body
  - who wrote it (which user)
  - which post it belongs to
```

The "who wrote it" and "which post" parts are important — those are the relationships we need to capture.

---

### Step 3 — Identify the relationships

```
users → posts     one-to-many  (one user can write many posts)
users → comments  one-to-many  (one user can write many comments)
posts → comments  one-to-many  (one post can have many comments)
```

---

### Step 4 — Sketch the connections

Before writing any SQL, draw the links between tables. Each arrow goes from the child table (the one with the foreign key) to the parent table (the one being referenced).

**users and profiles (one-to-one):**

```
┌─────────────────┐          ┌─────────────────┐
│      users      │          │    profiles     │
│─────────────────│          │─────────────────│
│ id   PK         │◄── 1:1 ──│ user_id   FK    │
│ name            │          │ bio             │
│ email           │          │ avatar_url      │
│ password        │          │ location        │
└─────────────────┘          └─────────────────┘

One user has exactly one profile.
Each profile belongs to exactly one user.
```

The profile's `user_id` column has a `UNIQUE` constraint on it — that's what enforces the one-to-one. Without it, multiple profile rows could reference the same user, making it a one-to-many instead.

---

**users and posts:**

```
┌─────────────────┐          ┌─────────────────┐
│      users      │          │      posts      │
│─────────────────│          │─────────────────│
│ id   PK         │◄── 1:N ──│ user_id   FK    │
│ name            │          │ title           │
│ email           │          │ body            │
│ password        │          └─────────────────┘
└─────────────────┘

One user can have many posts.
Each post belongs to exactly one user.
```

**posts and comments:**

```
┌─────────────────┐          ┌─────────────────┐
│      posts      │          │    comments     │
│─────────────────│          │─────────────────│
│ id   PK         │◄── 1:N ──│ post_id   FK    │
│ title           │          │ user_id   FK    │
│ body            │          │  body           │
│                 │          │                 │
└─────────────────┘          └─────────────────┘

One post can have many comments.
Each comment belongs to exactly one post.
```

**users and comments:**

```
┌─────────────────┐          ┌─────────────────┐
│      users      │          │    comments     │
│─────────────────│          │─────────────────│
│ id   PK         │◄── 1:N ──│ user_id   FK    │
│ name            │          │ post_id   FK    │
│ email           │          │ body            │
└─────────────────┘          └─────────────────┘

One user can write many comments.
Each comment was written by exactly one user.
```

Breaking it into three simple diagrams makes each relationship much easier to read than one complex diagram with crossing lines.


## Common Design Mistakes to Avoid

These are the mistakes beginners make most often when designing their first real schema.

### Storing multiple values in one column

```sql
-- ❌ Don't do this
CREATE TABLE posts (
  tags TEXT  -- stores "sql,databases,backend" as a string
);

-- ✅ Do this instead
-- Use a tags table and a post_tags junction table
```

A column should hold one value. If you find yourself storing comma-separated lists, arrays of values, or JSON blobs where you're really trying to represent a relationship, that's a sign you need a separate table.

### Not giving every table a primary key

Every table should have a primary key — a column that uniquely identifies each row. Without one, you can't reliably update or delete specific rows, and joins become very difficult.

```sql
-- ❌ No way to uniquely identify a row
CREATE TABLE enrollments (
  student_id INT,
  course_id  INT
);

-- ✅ Each row has a unique identifier
CREATE TABLE enrollments (
  id         SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  course_id  INT REFERENCES courses(id)
);
```

### Putting everything in one table

Beginners sometimes try to flatten everything into a single large table to keep things simple. It backfires quickly.

```sql
-- ❌ One giant table — hard to query, full of duplicated data
CREATE TABLE everything (
  post_title     TEXT,
  post_body      TEXT,
  author_name    TEXT,
  author_email   TEXT,
  comment_body   TEXT,
  commenter_name TEXT
);
```

This means duplicating the author's name and email on every single row. Use separate tables and foreign keys instead.

### Designing too far ahead

The opposite problem: designing a complex schema with 20 tables for features you haven't built yet. Keep your schema lean and add to it as your requirements become clear. Over-designed schemas are hard to work with and often get redesigned anyway once the real requirements emerge.

## ERD Tools

Drawing ERDs by hand on paper is fine for initial planning. For more polished diagrams you can use:

| Tool | Notes |
|---|---|
| **dbdiagram.io** | Free, browser-based, uses a simple text syntax to generate diagrams |
| **Lucidchart** | Popular diagramming tool, good for team collaboration |
| **draw.io** | Free, browser-based, general diagramming tool |


For most beginner projects, sketching on paper or using dbdiagram.io is enough.

## What's Next

You now know how to think about database design — how to go from requirements to entities, plan your columns, identify relationships, sketch an ERD, and apply normalisation to keep your data clean.

The next document puts all of this into practice in SQL: writing the `CREATE TABLE` statements, implementing keys and foreign keys, querying across tables with JOINs, and evolving your schema over time with `ALTER TABLE`.
