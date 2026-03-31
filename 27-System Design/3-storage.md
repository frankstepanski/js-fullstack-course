# Databases & Storage
### Document 3 of 4 — Where Your Data Lives and Why It Matters

## Let's start with a filing cabinet

Imagine your entire business runs on paper. Every customer who signs up gets a file. Every order gets a slip. Every invoice gets a folder. You store all of it in a big filing cabinet.

When the business is small, this works fine. You open the cabinet, find the right folder, pull out what you need.

Now imagine the business grows. You have 50,000 customers. Your filing cabinet is now a warehouse with floor-to-ceiling shelves. Finding one customer's file means wandering through aisles of folders, hoping things are organised well enough to find what you need before the customer gives up waiting.

Now imagine the business grows more. You have 5 million customers. You need ten warehouses. You need people whose entire job is organising and finding files. You need rules about what goes where so nothing gets lost. You need backups in case one warehouse burns down.

**This is the database problem.** Every app stores data. The decisions you make about how to organise, store, and retrieve that data are some of the most important decisions in system design — because a poorly organised "filing cabinet" doesn't just feel bad, it makes your entire system slow, unreliable, and expensive to fix later.

This document explains how modern apps solve this problem — and why there are so many different types of storage instead of just one.

## The one thing every system needs to do with data

No matter what your app does, it has to do three things with its data:

**Write it** — store something new, or update something that changed. A user signs up. A message gets sent. An order gets placed.

**Read it** — retrieve something that already exists. A user loads their profile. A feed shows recent posts. A report adds up this month's revenue.

**Find it fast** — not just read one specific thing, but search across many things. Show me all orders from last Tuesday. Find all users in California. Get the five most popular posts this week.

Everything about database design — every decision, every trade-off — comes down to making these three operations fast, reliable, and correct, even as data grows from hundreds of rows to billions of rows.

## The two big families of databases

When engineers talk about databases, the first question is almost always: **SQL or NoSQL?** These are two fundamentally different ways of organising data, and understanding the difference is one of the most important things you can learn early.

---

### SQL databases — the organised spreadsheet

Think of a SQL database like a very well-organised set of spreadsheets.

Data lives in **tables**. Each table has a fixed set of **columns** — the fields you defined when you created the table. Each **row** is one piece of data.

```
  users table
  ─────────────────────────────────────────────────
  id  │  name    │  email              │  joined
  ────┼──────────┼─────────────────────┼──────────
  1   │  Alice   │  alice@example.com  │  2024-01-15
  2   │  Bob     │  bob@example.com    │  2024-02-03
  3   │  Clara   │  clara@example.com  │  2024-02-20

  notes table
  ─────────────────────────────────────────────────
  id  │  user_id  │  title           │  created_at
  ────┼───────────┼──────────────────┼────────────
  1   │  1        │  Shopping list   │  2024-03-01
  2   │  1        │  Meeting notes   │  2024-03-04
  3   │  2        │  Ideas           │  2024-03-05
```

See how the `notes` table has a `user_id` column? That number refers back to the `id` column in the `users` table. Note #1 belongs to User #1 (Alice). Note #2 also belongs to Alice. Note #3 belongs to Bob.

This connection between tables is called a **relationship** — and it's where SQL databases get their power. You can ask questions that span multiple tables: "give me all notes written by Alice," and the database knows exactly how to join the two tables together to answer it.

```
  "Get all notes for Alice"

  users table             notes table
  ──────────────          ─────────────────
  id: 1, Alice    ──────▶ user_id: 1, "Shopping list"
                  ──────▶ user_id: 1, "Meeting notes"

  Result: Alice has 2 notes.
```

**SQL databases are great when:**
- Your data has clear, predictable structure that doesn't change often
- Different pieces of data relate to each other (users have orders, orders have items)
- You need strong guarantees that data is correct and consistent
- You need to run complex queries — filtering, sorting, aggregating across many rows

**Popular SQL databases:** PostgreSQL (the most popular choice for new apps today), MySQL, SQLite (great for small apps and local development)

---

### NoSQL databases — the flexible filing system

NoSQL databases take a different approach. Instead of strict tables with fixed columns, they store data in more flexible formats.

The most common type is a **document database**. Instead of rows and columns, each piece of data is a self-contained "document" — essentially a chunk of JSON — that can have any shape you want.

```
  SQL approach (rigid):             NoSQL approach (flexible):
  ─────────────────────             ──────────────────────────
  Every user must have              Each user document can look
  exactly these columns:            completely different:

  id | name | email | age           {                          {
                                      "id": 1,                   "id": 2,
  1  | Alice | a@... | 28            "name": "Alice",           "name": "Bob",
  2  | Bob   | b@... | null          "email": "a@...",          "email": "b@...",
                                      "age": 28,                 "preferences": {
  (Bob has no age — you               "address": {                 "theme": "dark"
  still need the column)               "city": "NYC"             }
                                      }                         }
                                    }
```

With a document database, each record can have different fields. Alice has an address, Bob has preferences — no problem. You don't need to define upfront every possible field every record might ever have.

**Popular NoSQL databases:** MongoDB (document database), Redis (key-value, mainly used for caching), DynamoDB (Amazon's NoSQL, very popular for high-scale apps)

---

### So which one should you use? PostgreSQL vs MongoDB

Since you've already worked with both PostgreSQL and MongoDB, this is the question that actually matters: **when do you reach for one vs the other in a real project?**

This isn't just a theoretical question — it's one of the first architectural decisions you'll make on any new app, and getting it wrong is expensive to undo later. Here's how to think about it properly.

---

#### The core difference in one sentence

PostgreSQL enforces structure upfront and gives you powerful tools to work across related data. MongoDB lets you store whatever shape you want and is optimised for retrieving whole documents quickly.

---

#### When PostgreSQL is the right choice

**Your data has clear relationships between things.**

If your app has users who have orders, and orders have items, and items belong to categories — that's a web of relationships. PostgreSQL handles this naturally through foreign keys and joins. MongoDB can model relationships too, but it's awkward and slow compared to what PostgreSQL does natively.

```
  PostgreSQL — relationships are first-class citizens:
  ─────────────────────────────────────────────────────
  users ──▶ orders ──▶ order_items ──▶ products

  "Get all products ordered by Alice in the last 30 days"
  → One SQL query with joins. Fast, clean, exact.

  MongoDB — relationships require extra work:
  ─────────────────────────────────────────────────────
  You'd need to store user_id references in documents,
  then make multiple queries and stitch the results
  together in your application code. More work, slower.
```

**You need data to be correct and consistent, always.**

PostgreSQL enforces rules. You can say "this column cannot be empty," "this value must be unique," "this number can never be negative." The database will refuse to write data that breaks those rules — from any app, any engineer, any script, forever.

MongoDB is more permissive. If there's no enforced schema, it's very easy for different parts of your app to write documents in slightly different shapes, and over time your data becomes inconsistent and messy.

```
  PostgreSQL — schema enforced at the database level:
  ─────────────────────────────────────────────────────
  user_id | email              | age
  ────────┼────────────────────┼─────
  1       | alice@example.com  | 28
  2       |                    | 22   ← ERROR: email cannot be empty
  3       | clara@example.com  | -5   ← ERROR: age must be positive

  MongoDB — schema is up to you to enforce in code:
  ─────────────────────────────────────────────────────
  { name: "Alice", email: "alice@example.com", age: 28 }  ✅
  { name: "Bob" }                                          ✅ (no email, no age)
  { name: "Clara", email: 12345, age: "twenty" }          ✅ (wrong types, still saves)
  
  MongoDB accepts all of these. Your app has to catch the problems itself.
```

**You need to query data in ways you haven't fully predicted yet.**

SQL is one of the most powerful query languages ever built. Once your data is in PostgreSQL, you can ask almost any question — filter by any column, join any tables, group and aggregate in complex ways — without changing your data structure.

MongoDB is optimised for queries you designed upfront. Ad hoc queries across multiple collections are slow and complicated.

**You're building: e-commerce, social apps, financial tools, SaaS products, anything with user accounts and business logic.**

Most apps fall into this category. PostgreSQL is the right default.

---

#### When MongoDB is the right choice

**Your data genuinely has no consistent shape.**

A platform where users can build custom forms — each form has completely different fields. A content management system where articles, videos, and podcasts each have totally different metadata. Event logs where each event type has different properties.

```
  MongoDB shines here:
  ─────────────────────────────────────────────────────
  Form submission 1: { "name": "Alice", "age": 28, "city": "NYC" }
  Form submission 2: { "company": "Acme", "employees": 50 }
  Form submission 3: { "product": "Widget", "color": "blue", "size": "M" }

  In PostgreSQL you'd need a very awkward schema to handle
  this — probably a generic key-value table that loses all
  the benefits of SQL. MongoDB handles it naturally.
```

**You need to store and retrieve whole documents as a unit.**

A product listing in an e-commerce catalog: name, description, price, images, variants (sizes, colours), attributes (material, weight, dimensions). In PostgreSQL you'd need many tables and a complex join to assemble this. In MongoDB the whole thing lives in one document — one read operation to get everything.

```
  MongoDB — whole product in one document:
  ─────────────────────────────────────────────────────
  {
    "name": "Running Shoe",
    "price": 89.99,
    "images": ["shoe1.jpg", "shoe2.jpg"],
    "variants": [
      { "size": "8", "colour": "black", "stock": 12 },
      { "size": "9", "colour": "black", "stock": 4 },
      { "size": "8", "colour": "white", "stock": 0 }
    ],
    "attributes": {
      "material": "mesh",
      "weight": "280g"
    }
  }

  PostgreSQL — you'd need 4+ tables and a join query
  to assemble the same information.
```

**You're storing massive volumes of simple data that grows very fast.**

Activity logs, analytics events, IoT sensor readings — data that arrives constantly, gets written once, and is read in bulk. MongoDB scales writes horizontally very well. PostgreSQL can handle this too, but MongoDB was designed for this pattern specifically.

**You need to iterate on your data structure very quickly.**

In the early days of a product, your schema changes constantly. MongoDB lets you add new fields to documents without a migration — just start writing them. In PostgreSQL, adding a column requires a schema migration, which at large scale can be slow and risky.

This is one reason some teams start with MongoDB for early-stage products and migrate to PostgreSQL once the data model stabilises. Though honestly, modern PostgreSQL migrations are fast enough that this is less of an issue than it used to be.

---

#### Side by side: PostgreSQL vs MongoDB

| | PostgreSQL | MongoDB |
|---|---|---|
| Data structure | Fixed schema, tables and columns | Flexible, JSON documents |
| Relationships | Native, built-in, fast | Possible but awkward |
| Data consistency | Enforced by the database | Enforced by your application |
| Query power | Extremely flexible — SQL | Good for designed queries, weaker for ad hoc |
| Scaling writes | Vertical first, then complex | Designed for horizontal scale |
| Schema changes | Requires migrations | Just start writing new fields |
| Best for | Most apps — users, orders, content | Variable data, high-volume writes, document-shaped data |
| The risk | Migrations get painful at huge scale | Data consistency is your problem, not the database's |

---

#### The honest default for beginners

**Start with PostgreSQL.** Here's why:

The most common failure mode with MongoDB for beginners isn't a technical problem — it's a data consistency problem. Because MongoDB will accept anything, it's very easy to end up with messy, inconsistent data after a few months of development. Different parts of your app write slightly different document shapes. Fields are sometimes missing, sometimes the wrong type, sometimes named differently. By the time you notice, you have a million documents and cleaning it up is a nightmare.

PostgreSQL forces you to think about your data structure upfront, which feels annoying at first but pays off enormously as the project grows.

That said — if you're building something where the data genuinely is document-shaped, highly variable, or needs to scale writes massively, MongoDB is an excellent choice. The key is choosing it for a real reason, not just because it feels easier to start with.

---

#### A checklist to help you decide

Work through these questions about your project. Tally up which column gets more ticks — that's your answer.

**Question 1: Do different records of the same type need different fields?**

```
  Example: Every user has name + email + password          → same fields
  Example: Products vary wildly — shoes have sizes,        → different fields
           books have ISBNs, food has expiry dates

  Same fields for every record  ──▶  [ ] PostgreSQL
  Fields vary record to record  ──▶  [ ] MongoDB
```

**Question 2: Does your data have relationships between different types of things?**

```
  Example: Users place orders. Orders contain items.       → relationships
           Items belong to categories. Simple read = join.

  Yes, things link to other things  ──▶  [ ] PostgreSQL
  No, each record stands alone      ──▶  [ ] MongoDB
```

**Question 3: Does data correctness really matter?**

```
  Example: Money transfers, medical records, user accounts → must be correct
  Example: Activity logs, recommendations, analytics data  → stale/missing is ok

  Yes, wrong data = serious problem  ──▶  [ ] PostgreSQL
  No, approximate is fine            ──▶  [ ] MongoDB
```

**Question 4: Will you need to query data in unpredictable ways?**

```
  Example: "Show all users who signed up last month,       → unpredictable
           ordered 3+ times, and are from California"
  Example: "Get the document for user ID 12345"            → predictable

  Complex, varied queries  ──▶  [ ] PostgreSQL
  Simple, known lookups    ──▶  [ ] MongoDB
```

**Question 5: Are you writing enormous volumes of data very fast?**

```
  Example: Millions of sensor readings per minute          → high write volume
  Example: Users updating their profiles occasionally      → normal write volume

  Massive write volume  ──▶  [ ] MongoDB
  Normal write volume   ──▶  [ ] PostgreSQL
```

**Question 6: Is your data structure still changing rapidly?**

```
  Example: Day 3 of building an MVP — schema changes daily → evolving fast
  Example: 18-month-old app with a stable data model       → settled

  Schema changing constantly  ──▶  [ ] MongoDB
  Schema mostly stable        ──▶  [ ] PostgreSQL
```

---

**Add up your ticks:**

```
  Mostly PostgreSQL ticks?  ──▶  Use PostgreSQL
  Mostly MongoDB ticks?     ──▶  Use MongoDB
  Even split?               ──▶  Default to PostgreSQL
                                 (the safety and consistency
                                  benefits outweigh the flexibility
                                  costs for most projects)
```

> **The single most common mistake:** Choosing MongoDB because the schema isn't fully defined yet. An undefined schema is not the same as a variable schema. PostgreSQL works perfectly well when you're still figuring things out — you just migrate as you go, which modern tooling makes easy. MongoDB's flexibility solves a real problem, but it's not the right solution for "I don't know my schema yet."

---

#### A decision guide based on real scenarios

```
  Building a social app (users, posts, comments, likes)?
  └──▶ PostgreSQL — clear relationships everywhere

  Building a product catalog with wildly different attributes
  per product type?
  └──▶ MongoDB — document model fits naturally

  Building a financial app (transactions, balances, transfers)?
  └──▶ PostgreSQL — ACID guarantees are non-negotiable

  Building an analytics pipeline ingesting millions of
  events per day?
  └──▶ MongoDB or a dedicated analytics DB (BigQuery, etc.)

  Building a blog / CMS?
  └──▶ Either works — PostgreSQL if you want simplicity,
       MongoDB if your content types vary a lot

  Building anything with user accounts and business logic?
  └──▶ PostgreSQL, almost always
```

## The one concept that makes databases reliable: ACID

When you write data to a database, you want to know it actually worked. This sounds obvious, but it's surprisingly hard to guarantee.

Consider a money transfer. Alice sends Bob £100. The database has to do two things:

1. Subtract £100 from Alice's account
2. Add £100 to Bob's account

What if the database does step 1 but crashes before step 2? Alice's money is gone but Bob never got it. That's a disaster.

SQL databases prevent this with a concept called **ACID**, which is a set of guarantees that keep your data safe and correct even when things go wrong.

You don't need to memorise what each letter stands for — just understand what they mean in real life:

**All or nothing.** A group of related operations either all succeed or all fail together. In the money transfer example, if anything goes wrong, the whole thing gets rolled back — Alice keeps her £100 and neither account changes.

**Always correct.** The database never ends up in a broken state. Rules you've defined (like "account balance can never go negative") are always enforced.

**No interference between users.** If two people are both updating the same record at the same time, the database makes sure they don't corrupt each other's work.

**Survives crashes.** Once the database says a write is complete, that data won't disappear — even if the server loses power a millisecond later.

```
  Money transfer example:
  ─────────────────────────────────────────────────────
  Step 1: Subtract £100 from Alice  ✅
  Step 2: Add £100 to Bob           ❌  (server crashes)

  Without ACID: Alice lost £100, Bob got nothing. Data is wrong.
  With ACID:    The whole transaction rolls back. Alice keeps her £100.
                The database is back to where it started. ✅
```

This is one of the biggest reasons SQL databases are still the default choice for anything involving money, user accounts, or any data where correctness really matters.

## Transactions: grouping steps so they all succeed or all fail

ACID describes the guarantees a database provides. A **transaction** is the tool you use in your code to actually apply those guarantees.

A transaction says to the database: *"I'm about to do several things — treat them all as one single operation. If anything goes wrong partway through, undo everything and put the database back exactly as it was."*

Think of it like filling out a form at a bank. You write your name on page 1, your account details on page 2, the amount on page 3. But until you sign and hand in the complete form, nothing is processed. If you walk out halfway through, the bank ignores the incomplete paperwork — nothing changes. A database transaction works the same way. Nothing is permanently saved until you say so.

---

### Visualising what a transaction does

```
  ─────────────────────────────────────────────────────────────────
  WITHOUT a transaction                WITH a transaction
  ─────────────────────────────────────────────────────────────────

  Alice sends Bob £100                 Alice sends Bob £100

  Step 1: Remove £100 from Alice       BEGIN TRANSACTION ──┐
          → saved immediately ✅                            │
                                       Step 1: Remove £100 │ (not saved yet)
  💥 Server crashes here                       from Alice  │
                                                           │
  Step 2: Add £100 to Bob              💥 Server crashes   │
          → never happens ❌                               │
                                       ROLLBACK ◀──────────┘
  Result:                              (database undoes step 1)
  Alice: -£100  ❌
  Bob:   +£0    ❌                     Result:
  Money just vanished.                 Alice: £0 change  ✅
                                       Bob:   £0 change  ✅
                                       Safe — nothing happened.
  ─────────────────────────────────────────────────────────────────
```

---

### What a transaction looks like in SQL

```sql
  BEGIN;
    -- Step 1: take money from Alice
    UPDATE accounts SET balance = balance - 100 WHERE user_id = 1;

    -- Step 2: give money to Bob
    UPDATE accounts SET balance = balance + 100 WHERE user_id = 2;
  COMMIT;

  -- If anything fails between BEGIN and COMMIT,
  -- the whole thing rolls back automatically. ✅
```

`BEGIN` starts the transaction. `COMMIT` saves everything permanently. If anything goes wrong in between, `ROLLBACK` (which happens automatically on a crash, or you can trigger it manually) undoes all of it.

---

### What a transaction looks like in application code

Here's the same idea in JavaScript with PostgreSQL:

```javascript
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // Step 1
    await client.query(
      'UPDATE accounts SET balance = balance - 100 WHERE user_id = $1',
      [aliceId]
    );

    // Step 2
    await client.query(
      'UPDATE accounts SET balance = balance + 100 WHERE user_id = $1',
      [bobId]
    );

    await client.query('COMMIT'); // ← only now is anything saved

  } catch (err) {
    await client.query('ROLLBACK'); // ← undo everything if any step failed
    throw err;
  } finally {
    client.release();
  }
```

---

### When do you actually need a transaction?

Any time you do **more than one database operation that must all succeed together**. Here are real situations you'll encounter:

| Situation | Why you need a transaction |
|---|---|
| User signs up — create user row + create default settings row | If settings fail, you have a user with no settings — broken |
| Placing an order — create order + reduce stock count | If stock doesn't reduce, you've oversold a product |
| Moving a file between folders — remove from old + add to new | If only removal happens, the file disappears entirely |
| Sending money — debit one account + credit another | The classic example — money must not vanish |
| Booking a seat — mark seat taken + create reservation | Two users could book the same seat without this |

> 💡 **The simple rule:** if you ever write two or more database operations in a row and the thought "but what if it crashes between these two?" makes you nervous — wrap it in a transaction.

**One thing to watch:** transactions hold locks on the rows they're working with until they finish. If a transaction takes a long time, other users trying to read or write those same rows have to wait. Keep transactions short and focused — do the database work, commit, then do everything else.

## Normalization: storing data in one place, not many

> **A note before we start:** if you've only built small apps so far, you might not have felt this pain yet — and that's normal. Normalization problems tend to show up once your app has real users and real data. But understanding it now means you won't accidentally build yourself into a corner that takes weeks to fix. This is one of those "plant the seed early" topics.

Here's a problem that sneaks up on beginners fast. Imagine you're building an order tracking system. You create a single table that stores everything about each order:

```
  orders table (un-normalized):
  ──────────────────────────────────────────────────────────────────────
  order_id │ customer_name │ customer_email   │ product    │ price
  ─────────┼───────────────┼──────────────────┼────────────┼──────
  1        │ Alice Smith   │ alice@email.com   │ Notebook   │ 4.99
  2        │ Alice Smith   │ alice@email.com   │ Pen        │ 1.99
  3        │ Alice Smith   │ alice@email.com   │ Stapler    │ 8.99
  4        │ Bob Jones     │ bob@email.com     │ Notebook   │ 4.99
```

Looks fine at first glance. But look at Alice's rows. Her name and email appear three times — once per order. Now ask yourself:

- What if Alice changes her email address? You have to update every single one of her order rows — and if you miss one, your data is wrong.
- What if you accidentally spell her name differently in one row? Now you have inconsistent data and no way to tell which is correct.
- What if Alice places 500 orders? You're storing her name and email 500 times.

This is the problem that **normalization** solves. Normalization is the practice of organising your tables so that **each piece of information lives in exactly one place**.

---

### The fix: split the data into related tables

Instead of one big table with everything, split customer information and order information into separate tables — then link them with a reference.

```
  customers table                      orders table
  ───────────────────────────────      ────────────────────────────────
  id  │ name         │ email           id │ customer_id │ product  │ price
  ────┼──────────────┼────────────     ───┼─────────────┼──────────┼──────
  1   │ Alice Smith  │ alice@email.com  1  │      1      │ Notebook │ 4.99
  2   │ Bob Jones    │ bob@email.com    2  │      1      │ Pen      │ 1.99
                                        3  │      1      │ Stapler  │ 8.99
                                        4  │      2      │ Notebook │ 4.99
```

Now Alice's name and email exist in exactly one row, in one table. If she changes her email, you update it once and every order automatically reflects the new email. There's no risk of inconsistency. No duplicated data.

The `customer_id` column in the orders table is called a **foreign key** — it's a reference that says "this order belongs to the customer with this ID." The database can enforce that this reference always points to a real customer.

---

### Why normalization matters — the real-world impact

```
  ─────────────────────────────────────────────────────────────────
  UN-NORMALIZED                        NORMALIZED
  ─────────────────────────────────────────────────────────────────
  Alice's email stored 500 times       Alice's email stored once

  Alice changes email →                Alice changes email →
  update 500 rows                      update 1 row
  (miss any = wrong data ❌)           (always consistent ✅)

  Two rows have different spellings    One row, one spelling,
  of Alice's name — which is right?   always correct

  Table gets huge fast — duplicate     Table stays lean —
  data takes up unnecessary space      only unique data stored

  Adding a new customer field          Add one column to
  (e.g. phone number) means you        customers table —
  need it on every order row           done
  ─────────────────────────────────────────────────────────────────
```

---

### The two rules that cover 90% of normalization

Normalization has formal rules with names like "First Normal Form" and "Third Normal Form." You don't need to memorise those terms right now. What you do need to understand are the two principles behind them — because these are things you'll bump into in your very first real project.

---

**Rule 1 — One value per cell, never a list**

Every cell in your table should contain a single value. Not a comma-separated list, not a JSON blob, not multiple things crammed together.

```
  ❌ Bad — multiple products stuffed in one cell:
  ──────────────────────────────────────────────────────
  order_id │ products
  ─────────┼─────────────────────────────
  1        │ "Notebook, Pen, Stapler"

  Problem: how do you find all orders that contain a Pen?
  You'd have to scan through the text of every row.
  At 1 million orders, that's painfully slow. ❌


  ✅ Good — one product per row:
  ──────────────────────────────────────────────────────
  order_id │ product
  ─────────┼──────────
  1        │ Notebook
  1        │ Pen
  1        │ Stapler

  Now a simple query finds all Pen orders instantly. ✅
```

You might feel like one row per product is "more rows" and somehow worse. It isn't. Databases are designed to handle millions of rows efficiently. What they're not designed to handle is parsing text inside a cell to find values. One value per cell is always the right move.

---

**Rule 2 — Don't store the same information in two places**

This is the big one. If a piece of information exists in more than one place in your database, those copies will eventually disagree — and when they do, you won't know which one is correct.

The pattern to watch for: any time you find yourself copying data from one table into another, stop and ask "could I just store a reference (an ID) instead?"

```
  ❌ Bad — customer name and email repeated on every order:
  ──────────────────────────────────────────────────────────────────
  order_id │ customer_name │ customer_email   │ product
  ─────────┼───────────────┼──────────────────┼──────────
  1        │ Alice Smith   │ alice@email.com   │ Notebook
  2        │ Alice Smith   │ alice@email.com   │ Pen
  3        │ Alice Smith   │ alce@email.com    │ Stapler   ← typo crept in
  4        │ Bob Jones     │ bob@email.com     │ Notebook

  Alice's email is stored 3 times.
  One has a typo. Which is correct? No way to tell. ❌


  ✅ Good — store the customer once, reference them by ID:
  ──────────────────────────────────────────────────────────────────
  customers table                   orders table
  ──────────────────────────────    ──────────────────────────
  id │ name        │ email           id │ customer_id │ product
  ───┼─────────────┼──────────────   ───┼─────────────┼──────────
  1  │ Alice Smith │ alice@email.com  1  │      1      │ Notebook
  2  │ Bob Jones   │ bob@email.com    2  │      1      │ Pen
                                      3  │      1      │ Stapler
                                      4  │      2      │ Notebook

  Alice's email exists once. Update it once, every order is correct. ✅
```

This rule also applies to things like product prices, category names, and user roles — any time you have data that describes a "thing" rather than a specific event or transaction, that thing should live in its own table and be referenced by ID everywhere else.

---

**A quick checklist to spot normalization problems:**

```
  When looking at your tables, ask these questions:

  [ ] Is the same piece of information stored in more than one row?
      → Split it into its own table

  [ ] If I update one row, do I need to update other rows too?
      → That's duplicated data — normalise it

  [ ] Does a cell contain multiple values (a list, comma-separated, etc.)?
      → Give each value its own row

  [ ] Would changing one thing require hunting through
      many rows to keep data consistent?
      → Classic sign of an un-normalised table
```



### How normalized should your database be?

The goal of normalization is to eliminate duplicate data and keep things consistent. But taken to an extreme, a fully normalized database can require many joins to answer simple questions, which can get slow.

In practice, most well-designed databases aim for **third normal form** as a starting point — no duplicate data, every column describes its own row, no derived columns. Then occasionally they make deliberate exceptions where performance demands it.

```
  Fully normalized          Slightly denormalized
  (pure, no duplication)    (some duplication, for speed)
  ──────────────────────    ──────────────────────────────
  No duplicated data         Might store user's name on
  Always consistent          orders table to avoid a join
  More joins needed          Faster reads on common queries
  Slower at very high scale  Needs careful maintenance

  Start here ──────────────────────────────────────────▶
  Add denormalization only when you have a proven performance problem
```

> 💡 **The beginner rule:** normalize first, always. If a specific query is too slow because of joins, you can denormalize that one thing deliberately. But starting denormalized and trying to clean it up later is one of the most painful database problems there is.

## Indexes: the secret to fast lookups

You've got 10 million users in your database. Someone searches for the user with the email `alice@example.com`. Without any help, the database has to check every single row — all 10 million — until it finds a match. At scale, this query could take minutes.

An **index** solves this. An index is a separate data structure the database maintains that works like the index at the back of a book — instead of reading every page to find "caching," you jump straight to the right page number.

```
  Without an index:
  ─────────────────────────────────────────────────────
  "Find alice@example.com"
  → Check row 1... not her
  → Check row 2... not her
  → Check row 3... not her
  → ... (10 million rows later)
  → Found her at row 8,432,891
  Time: several seconds ❌

  With an index on the email column:
  ─────────────────────────────────────────────────────
  "Find alice@example.com"
  → Index says: she's at row 8,432,891
  → Jump directly there
  Time: a few milliseconds ✅
```

**What to index:** columns you search or sort by often — email addresses, user IDs, timestamps, status fields. Any column that appears in a `WHERE` clause in your queries is a candidate.

**The trade-off:** indexes make reads much faster, but they make writes slightly slower — every time you insert or update a row, the database has to update all the relevant indexes too. Don't add indexes to every column "just in case" — only add them where you're actually experiencing slow queries.

## Not everything belongs in a database

One of the most common mistakes beginners make is trying to store everything in their main database. That's like using your kitchen filing cabinet to store furniture. The cabinet isn't built for it, and you'll run into problems fast.

Different types of data have very different needs, and there are different tools designed for each.

---

### Your main database (PostgreSQL / MySQL)
For structured data with relationships — users, orders, messages, anything where correctness and consistency matter. This is your source of truth.

---

### Object storage (like Amazon S3)
For files — images, videos, PDFs, audio, backups. Files can be enormous. Storing a 50MB video in a database row is a terrible idea — it slows down every query that touches that table, wastes expensive database storage, and makes backups huge.

Object storage is cheap, scales to billions of files, and is designed specifically for serving large files quickly.

```
  ❌ Don't do this:
  users table
  id │ name  │ profile_photo (50MB binary blob)
  1  │ Alice │ [50 megabytes of image data]
  2  │ Bob   │ [48 megabytes of image data]

  ✅ Do this instead:
  users table                         S3 (object storage)
  id │ name  │ photo_url              ─────────────────────────────
  1  │ Alice │ s3.com/alice.jpg  ───▶ alice.jpg (stored cheaply)
  2  │ Bob   │ s3.com/bob.jpg    ───▶ bob.jpg   (stored cheaply)
```

Store the file in S3. Store the URL in your database. Fast, cheap, and the right tool for the job.

---

### In-memory store (Redis)
For data that needs to be accessed in milliseconds and doesn't need to be permanent — sessions, caches, rate limiting counters, real-time leaderboards. We covered Redis in depth in Document 2.

---

### Search engine (Elasticsearch / Algolia)
For full-text search — "find all notes that mention 'project alpha'." Regular databases can technically do text search, but they're slow at it. A dedicated search engine builds a special index that makes text queries blindingly fast, even across millions of documents.

Most apps don't need this until they have a serious search feature. When you do, it's a game-changer.

## What happens when your database can't keep up?

You've built a good database schema, added the right indexes, and things are running smoothly. Then your user base grows and the database starts slowing down. Too many queries, too much data. What now?

---

### Read replicas: copy the database for reads

Most apps read data far more than they write it. A social app might do 100 reads for every 1 write — loading feeds, profiles, comments, notifications.

A **read replica** is an exact copy of your database that stays in sync with the original (called the primary). All writes go to the primary. All reads can go to any replica.

```
  Writes ──────────────▶ [Primary Database]
                                 │
                    auto-syncs   │   auto-syncs
                         ┌───────┴───────┐
                         ▼               ▼
                    [Replica 1]     [Replica 2]
                         ▲               ▲
                         └───────┬───────┘
                              Reads
```

The primary doesn't have to handle all those read queries anymore — they're spread across replicas. This alone can multiply your database's effective capacity by 3x, 5x, or more.

---

### Sharding: split the data itself

When even multiple replicas aren't enough — when you have so much data that no single machine can hold it all — you split the data across multiple completely separate databases. This is called **sharding**.

Think of it like splitting your customer filing cabinet alphabetically. All customers A–G go in Cabinet 1, H–P go in Cabinet 2, Q–Z go in Cabinet 3. Each cabinet is smaller and faster.

```
  Users with ID 1–500,000       ──▶  [Database A]
  Users with ID 500,001–1,000,000 ──▶  [Database B]
  Users with ID 1,000,001+      ──▶  [Database C]
```

**The honest warning:** sharding is complex. Queries that need data from multiple shards get complicated. Moving data between shards if they become unbalanced is painful. Most apps don't need sharding until they're at a genuinely large scale — hundreds of millions of rows or more. Exhaust every other option first.

## The big picture: choosing the right storage for the job

Here's a simple map of what to reach for and when:

```
  What kind of data is it?
  │
  ├── Structured data with relationships
  │   (users, orders, messages)
  │   └──▶ SQL database (PostgreSQL)
  │
  ├── Large files (images, videos, documents)
  │   └──▶ Object storage (S3)
  │
  ├── Frequently read, rarely changes, speed critical
  │   (sessions, cached results, counters)
  │   └──▶ In-memory store (Redis)
  │
  ├── Full-text search across many documents
  │   (searching notes, products, posts by content)
  │   └──▶ Search engine (Elasticsearch, Algolia)
  │
  └── Flexible or very high-volume data
      (event logs, analytics, varied document shapes)
      └──▶ NoSQL database (MongoDB, DynamoDB)
```

As a beginner, you'll mostly live in the top two boxes. PostgreSQL for structured data, S3 for files. That combination handles the vast majority of what most apps need.

## The most important thing to remember

Your database decisions are the hardest to undo. You can swap out a server. You can add a caching layer without touching much code. But migrating a database schema, or switching from SQL to NoSQL, on a live app with real users and millions of rows of data is a months-long project that carries real risk.

This doesn't mean you should over-engineer your database from day one. It means you should think carefully about structure early, because it's the one part of the system where getting it wrong is most expensive to fix.

A few rules of thumb for beginners:

**Start with PostgreSQL.** It handles far more than most people give it credit for, and you can scale it a long way before needing anything more complex.

**Store files in object storage, not the database.** Always. Without exception.

**Add indexes when queries get slow.** Not before — you'll over-index and slow down writes unnecessarily.

**Don't reach for NoSQL to be trendy.** Reach for it when you have a specific problem it solves better than SQL.

---

*Next: Document 4 — Real-World Case Studies*
