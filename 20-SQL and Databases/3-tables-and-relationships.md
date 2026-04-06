# Database Schemas, Relationships, and Joins

Previously you learned about database design and the big picture of how you build a database — determining what data needs to be available in an application and how they can be related in a database schema.

> Now we are devling deeper into the schema and then moving into implementation.

It starts with keys, the mechanism that uniquely identifies rows and links tables together, then covers how relationships are actually enforced in SQL. From there it explores JOINs for querying across multiple tables, how to modify a table's structure after it's been created, and how to choose the right data type for each column.

## Keys — How Tables Connect

Before tables can link to each other, each table needs a way to uniquely identify its rows. That's what **keys** are for.

### Primary Keys

A **primary key** uniquely identifies each row in a table. No two rows can have the same primary key value, and it can never be empty.

```sql
CREATE TABLE students (
  id   SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);
```

`SERIAL` means the database automatically assigns the next number (1, 2, 3...) each time a row is inserted. You never have to set it yourself.

Think of a primary key like a student ID number, a product SKU, or an order number — something that uniquely identifies exactly one record.

| id | name  | email            |
|----|-------|------------------|
| 1  | Alice | alice@email.com  |
| 2  | Bob   | bob@email.com    |
| 3  | Carla | carla@email.com  |

Without a primary key, SQL has no reliable way to find, update, or delete one specific row.

### Foreign Keys

A **foreign key** is how one table references a row in another table. It stores the primary key of the related row.

```sql
CREATE TABLE courses (
  id         SERIAL PRIMARY KEY,
  title      VARCHAR(100) NOT NULL,
  teacher_id INT REFERENCES teachers(id)
);
```

The `teacher_id` column in `courses` holds the `id` of a row in `teachers`. This is the link between the two tables.

Foreign keys do more than store a value — they enforce that the value **actually exists** in the other table. You can't create a course with `teacher_id = 99` if there's no teacher with `id = 99`. This protection is called **referential integrity**, and we'll cover it in more detail shortly.

```
┌──────────────┐           ┌──────────────────┐
│   teachers   │           │     courses      │
│──────────────│           │──────────────────│
│ id (PK)  ───────────────►│ teacher_id (FK)  │
│ name         │  1     N  │ title            │
└──────────────┘           └──────────────────┘

  One teacher can have many courses.
  Each course belongs to exactly one teacher.
```

## Relationship Types

Now that you understand keys, let's talk about the three ways tables can relate to each other. Every relationship in a database falls into one of these patterns.

### One-to-One (1:1)

Each row in Table A matches exactly one row in Table B, and vice versa.

This is the least common relationship type. A good example is separating a user's login information from their optional profile details:

**users**

| id | name  | email           |
|----|-------|-----------------|
| 1  | Alice | alice@email.com |
| 2  | Bob   | bob@email.com   |

**profiles**

| id | user_id | bio           |
|----|---------|---------------|
| 1  | 1       | Loves SQL     |
| 2  | 2       | Enjoys React  |

```sql
CREATE TABLE users (
  id    SERIAL PRIMARY KEY,
  name  VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE profiles (
  id      SERIAL PRIMARY KEY,
  bio     TEXT,
  user_id INT UNIQUE REFERENCES users(id)
);
```

```
┌──────────┐    1   1    ┌──────────────┐
│  users   │◄──────────► │   profiles   │
│──────────│             │──────────────│
│ id  (PK) │             │ user_id (FK) │
│ name     │             │ bio          │
│ email    │             └──────────────┘
└──────────┘

  One user has at most one profile.
  One profile belongs to exactly one user.
```

The `UNIQUE` constraint on `user_id` is what enforces the one-to-one — it prevents two profile rows from pointing to the same user.

**Why use 1:1?** To keep a table lightweight by splitting out optional or sensitive data that not every row will have.

---

### One-to-Many (1:N)

One row in a parent table connects to many rows in a child table. Each child belongs to only one parent.

This is the **most common** relationship type. Examples:

- One teacher teaches many courses
- One customer places many orders
- One blog post has many comments

**teachers**

| id | name    |
|----|---------|
| 1  | Mr. Kim |
| 2  | Ms. Li  |

**courses**

| id | title      | teacher_id |
|----|------------|------------|
| 1  | SQL Basics | 1          |
| 2  | Web Dev    | 2          |
| 3  | Data Viz   | 1          |

Mr. Kim (id 1) teaches two courses. Ms. Li teaches one. Each course has exactly one teacher.

```
┌──────────────┐    1       N    ┌──────────────────┐
│   teachers   │────────────────►│     courses      │
│──────────────│                 │──────────────────│
│ id  (PK)     │                 │ teacher_id  (FK) │
│ name         │                 │ title            │
└──────────────┘                 └──────────────────┘

  Mr. Kim (id=1) ──────► SQL Basics
                 ──────► Data Viz

  Ms. Li  (id=2) ──────► Web Dev
```

```sql
CREATE TABLE teachers (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  department VARCHAR(100)
);

CREATE TABLE courses (
  id         SERIAL PRIMARY KEY,
  title      VARCHAR(100) NOT NULL,
  teacher_id INT REFERENCES teachers(id)
);
```

**Why use 1:N?** It mirrors how most real-world hierarchies work and prevents duplicating data. Instead of writing "Mr. Kim" in every course row, you store his `id` once and reference it.

---

### Many-to-Many (M:N)

Rows in Table A can relate to many rows in Table B, and rows in Table B can relate to many rows in Table A.

Examples:

- Students enroll in many courses; courses have many students
- Products appear in many orders; orders contain many products
- Users follow many other users; users have many followers

You can't represent this with just a foreign key in one direction. Instead you need a **junction table** (also called a join table or linking table) that sits between them, with a row for each connection.

**students**

| id | name  |
|----|-------|
| 1  | Alice |
| 2  | Bob   |

**courses**

| id | title      |
|----|------------|
| 1  | SQL Basics |
| 2  | Web Dev    |

**enrollments** (the junction table)

| id | student_id | course_id |
|----|------------|-----------|
| 1  | 1          | 1         |
| 2  | 1          | 2         |
| 3  | 2          | 1         |

Alice is enrolled in both courses. Bob is enrolled in SQL Basics only.

```
┌──────────┐         ┌─────────────┐          ┌────────────┐
│ students │  1    N │ enrollments │  N    1  │  courses   │
│──────────│◄────────│─────────────│─────────►│────────────│
│ id  (PK) │         │ student_id  │          │ id   (PK)  │
│ name     │         │ course_id   │          │ title      │
└──────────┘         └─────────────┘          └────────────┘

  Alice ──► enrollment row 1 ──► SQL Basics
  Alice ──► enrollment row 2 ──► Web Dev
  Bob   ──► enrollment row 3 ──► SQL Basics
```

```sql
CREATE TABLE students (
  id        SERIAL PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email     VARCHAR(255) UNIQUE
);

CREATE TABLE courses (
  id    SERIAL PRIMARY KEY,
  title VARCHAR(100) NOT NULL
);

CREATE TABLE enrollments (
  id         SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id),
  course_id  INT REFERENCES courses(id)
);
```

**Why use M:N?** Because it accurately represents how complex real-world data works. The junction table can also carry extra information about the relationship — for example, an `enrollments` table could include the date enrolled or the grade received.

## Referential Integrity — Keeping Your Data Honest

Referential integrity means your data always makes sense across tables. Foreign keys are what enforce it.

### What happens without a foreign key

Foreign keys are opt-in — you have to explicitly write `REFERENCES` to get the protection. If you skip it, PostgreSQL won't complain, but the column is just a plain number with no enforcement at all:

```sql
-- ❌ No foreign key — just a bare integer column
CREATE TABLE enrollments (
  id         SERIAL PRIMARY KEY,
  student_id INT,   -- no REFERENCES, no protection
  course_id  INT
);
```

With this definition, nothing stops you from inserting `student_id = 999` even if no student with that id exists. PostgreSQL has no idea the two tables are meant to be related. JOINs will still technically run, but they'll silently return incomplete or nonsense data — and you won't get any error to tell you something is wrong.

This is exactly how ghost records appear: not just from deletes, but from any insert or update that points to a row that doesn't exist. The database won't catch it without a foreign key in place.

### What happens with a foreign key

Imagine you delete Alice from `students`. But `enrollments` still has rows with `student_id = 1`. Now your database has enrollments pointing to a student who no longer exists — a broken reference sometimes called a "ghost record."

```
  students table          enrollments table
  ┌────┬───────┐          ┌────┬────────────┬───────────┐
  │ id │ name  │          │ id │ student_id │ course_id │
  ├────┼───────┤          ├────┼────────────┼───────────┤
  │  1 │ Alice │◄─────────│  1 │     1      │    10     │
  │  2 │ Bob   │          │  2 │     1      │    11     │
  └────┴───────┘          └────┴────────────┴───────────┘

  If Alice is deleted from students, rows 1 and 2 in enrollments
  point to a student_id that no longer exists. ❌ Ghost records.

  Foreign keys prevent this deletion from happening.
```

Foreign keys prevent this. When you try to delete Alice while her enrollments exist, PostgreSQL will stop you.

### Foreign Key Delete Behaviors

When you define a foreign key, you can tell PostgreSQL what to do when the parent row is deleted:

**ON DELETE CASCADE** — delete the children automatically when the parent is deleted.

```sql
CREATE TABLE enrollments (
  id         SERIAL PRIMARY KEY,
  student_id INT REFERENCES students(id) ON DELETE CASCADE,
  course_id  INT REFERENCES courses(id)
);
```

Delete a student → their enrollments disappear too. Use this when the child data has no meaning without the parent.

---

**ON DELETE RESTRICT** — block the deletion if children exist.

```sql
student_id INT REFERENCES students(id) ON DELETE RESTRICT
```

You cannot delete a student who still has enrollments. Use this when you need to be sure data isn't accidentally removed. This is also PostgreSQL's **default** if you don't specify anything.

---

**ON DELETE SET NULL** — keep the child row but clear the reference.

```sql
teacher_id INT REFERENCES teachers(id) ON DELETE SET NULL
```

A teacher leaves the school → their courses remain in the system, but `teacher_id` becomes `NULL`. Use this when the child record still makes sense even without the parent.

---

| Behavior | What happens | When to use |
|---|---|---|
| `CASCADE` | Children deleted with parent | Enrollments, comments, dependent records |
| `RESTRICT` | Deletion blocked if children exist | Orders, critical relationships |
| `SET NULL` | Children kept, reference cleared | Optional relationships |

## JOINs — Querying Across Tables

A JOIN combines rows from two or more tables based on a related column — almost always a primary key and foreign key pair.

Without JOINs you can only query one table at a time. With JOINs you can ask questions like "which courses is Alice enrolled in?" — a question that spans three tables.

### Table Aliases

Before looking at the JOIN types, it's worth explaining the shorthand you'll see in every JOIN query.

When a query involves multiple tables, writing the full table name every time gets verbose quickly. **Aliases** let you give a table a short nickname for the duration of the query:

```sql
FROM students s
```

Here `s` is an alias for `students`. You define it by putting the alias right after the table name — no special keyword needed. From that point on in the query, you use `s` instead of `students`.

This is where the dot notation comes from. `s.name` means "the `name` column from the table aliased as `s`":

```sql
SELECT s.name, c.title
FROM students s
INNER JOIN courses c ON ...
```

Without aliases you'd have to write `students.name` and `courses.title` everywhere — and in longer queries with three or four tables, that becomes hard to read fast. Aliases keep things concise and make it immediately clear which table each column belongs to.

The alias only exists for that query. It doesn't rename the table in the database.

---

### The Four JOIN Types

Using these tables for all examples:

**students:** Alice (1), Bob (2), Maria (3)
**courses:** SQL Basics (1), Web Dev (2), UX Design (3)
**enrollments:** Alice→SQL Basics, Alice→Web Dev, Bob→SQL Basics *(Maria has no enrollments, UX Design has no students)*

---

### INNER JOIN — only rows with a match on both sides

Returns rows only where a match exists in both tables. Rows with no match are excluded.

```
  students          enrollments (matches only)
  ┌───────┐
  │ Alice │──────────────────► included ✓
  │ Bob   │──────────────────► included ✓
  │ Maria │  no enrollment  ─► excluded ✗
  └───────┘
```

```sql
SELECT s.name, c.title
FROM students s
INNER JOIN enrollments e ON s.id = e.student_id
INNER JOIN courses c     ON e.course_id = c.id;
```

| name  | title      |
|-------|------------|
| Alice | SQL Basics |
| Alice | Web Dev    |
| Bob   | SQL Basics |

Maria is excluded — she has no enrollments. UX Design is excluded — it has no students.

**Use when:** you only want records where the relationship actually exists.

---

### LEFT JOIN — all rows from the left table, matches from the right

Returns every row from the left table. If a matching row exists in the right table it's included; if not, the right-side columns are `NULL`.

```
  students (ALL rows kept)       courses (matched or NULL)
  ┌───────┐
  │ Alice │──────────────────► SQL Basics, Web Dev  ✓
  │ Bob   │──────────────────► SQL Basics            ✓
  │ Maria │  no enrollment  ─► NULL                  ✓ (still included)
  └───────┘
```

```sql
SELECT s.name, c.title
FROM students s
LEFT JOIN enrollments e ON s.id = e.student_id
LEFT JOIN courses c     ON e.course_id = c.id;
```

| name  | title      |
|-------|------------|
| Alice | SQL Basics |
| Alice | Web Dev    |
| Bob   | SQL Basics |
| Maria | NULL       |

Maria appears with `NULL` for the course — she's in the students table but has no enrollments.

**Use when:** you want everything from the left table regardless of whether a match exists. Common for showing "all users, even those who haven't done X."

---

### RIGHT JOIN — all rows from the right table, matches from the left

The mirror of LEFT JOIN. Returns every row from the right table, with `NULL` on the left where no match exists.

```
  students (matched or NULL)     courses (ALL rows kept)
                                 ┌────────────┐
  Alice ◄───────────────────────── SQL Basics  ✓
  Bob   ◄───────────────────────── Web Dev     ✓
  NULL  ◄──  no students  ───────── UX Design  ✓ (still included)
                                 └────────────┘
```

```sql
SELECT s.name, c.title
FROM students s
RIGHT JOIN enrollments e ON s.id = e.student_id
RIGHT JOIN courses c     ON e.course_id = c.id;
```

| name  | title      |
|-------|------------|
| Alice | SQL Basics |
| Alice | Web Dev    |
| Bob   | SQL Basics |
| NULL  | UX Design  |

UX Design appears with `NULL` for the student name — it exists as a course but has no students enrolled.

**Use when:** you want everything from the right table. In practice this is less common — you can usually just swap the table order and use LEFT JOIN instead.

---

### FULL OUTER JOIN — everything from both tables

Returns all rows from both tables. Where no match exists on either side, `NULL` fills the gap.

```
  students (ALL rows)            courses (ALL rows)
  ┌───────┐                      ┌────────────┐
  │ Alice │◄────────────────────►│ SQL Basics │  ✓ matched
  │ Bob   │◄────────────────────►│ Web Dev    │  ✓ matched
  │ Maria │  no enrollment  ─►   │   NULL     │  ✓ left-only row
  │ NULL  │  ◄─ no students ─────│ UX Design  │  ✓ right-only row
  └───────┘                      └────────────┘
```

```sql
SELECT s.name, c.title
FROM students s
FULL OUTER JOIN enrollments e ON s.id = e.student_id
FULL OUTER JOIN courses c     ON e.course_id = c.id;
```

| name  | title      |
|-------|------------|
| Alice | SQL Basics |
| Alice | Web Dev    |
| Bob   | SQL Basics |
| Maria | NULL       |
| NULL  | UX Design  |

Both Maria (unmatched student) and UX Design (unmatched course) appear.

**Use when:** you need to see everything from both sides — useful for data audits, migrations, or spotting gaps.

---

### JOIN Summary

| Join type | What it returns | Most common use |
|---|---|---|
| `INNER JOIN` | Matching rows only | When the relationship must exist |
| `LEFT JOIN` | All left rows + matches | Show all of one thing, related data if available |
| `RIGHT JOIN` | All right rows + matches | Show all of the other thing |
| `FULL OUTER JOIN` | Everything from both | Audits, finding gaps, data reconciliation |

### Which JOIN goes with which relationship type?

| Relationship | Typical JOIN | Why |
|---|---|---|
| 1:1 (user ↔ profile) | LEFT JOIN | Include users even without a profile |
| 1:N (teacher ↔ courses) | LEFT JOIN | Include teachers even without courses |
| M:N (students ↔ courses) | INNER JOIN through junction | Return only real, existing connections |

## ALTER TABLE — Changing a Table After It Exists

When you first design a table, it will never be perfect forever. Requirements change, you discover you need a new field, or you realise a column was named poorly. `ALTER TABLE` lets you modify a table's structure without deleting it or losing any data.

Think of it like renovating a building while people are still inside — the structure changes, but everything that was already there stays.

> **Why not just delete the table and start over?**
> Because real production tables contain real data. Deleting a `users` table with a million rows to recreate it with a slightly different structure is not an option. `ALTER TABLE` is how you make changes safely.

Here's the table we'll use as an example:

```
students
+----+-----------+-------+
| id | full_name | email |
+----+-----------+-------+
```

### Add a column

```sql
ALTER TABLE students
ADD COLUMN created_at TIMESTAMPTZ DEFAULT NOW();
```

Every existing row gets `NOW()` as its `created_at` value automatically.

```
students
+----+-----------+-------+---------------------+
| id | full_name | email | created_at          |
+----+-----------+-------+---------------------+
```

### Rename a column

```sql
ALTER TABLE students
RENAME COLUMN full_name TO name;
```

### Change a column's data type

```sql
ALTER TABLE students
ALTER COLUMN email TYPE VARCHAR(255);
```

### Make a column required

```sql
ALTER TABLE students
ALTER COLUMN email SET NOT NULL;
```

### Add a unique constraint

```sql
ALTER TABLE students
ADD CONSTRAINT unique_email UNIQUE(email);
```

### Add a foreign key

```sql
ALTER TABLE enrollments
ADD CONSTRAINT fk_student
FOREIGN KEY (student_id)
REFERENCES students(id);
```

### Remove a column

```sql
ALTER TABLE students
DROP COLUMN middle_name;
```

## PostgreSQL Data Types

Every column in a table must be assigned a **data type**. The data type tells PostgreSQL what kind of data is allowed in that column, how to store it, and what operations can be performed on it.

Choosing the right type matters — it prevents invalid data from being inserted, keeps your storage efficient, and makes your queries faster.

### Text

| Type | Description | Example use |
|---|---|---|
| `VARCHAR(n)` | Text up to `n` characters | Usernames, short labels |
| `TEXT` | Unlimited length text | Comments, bios, descriptions |

Use `VARCHAR` when you want to enforce a maximum length. Use `TEXT` when the length is unpredictable.

```sql
name  VARCHAR(100)   -- max 100 characters
bio   TEXT           -- unlimited
```

### Numbers

| Type | Description | Example use |
|---|---|---|
| `INT` | Whole number | Age, quantity, count |
| `SERIAL` | Auto-incrementing integer | Primary keys |
| `NUMERIC(p, s)` | Exact decimal | Prices, financial data |

```sql
id     SERIAL PRIMARY KEY     -- auto-increments: 1, 2, 3...
age    INT                    -- whole numbers only
price  NUMERIC(10, 2)         -- up to 10 digits, 2 after the decimal
```

### Boolean

```sql
is_active BOOLEAN DEFAULT TRUE
```

Stores `TRUE` or `FALSE`. Good for flags like is_active, is_verified, is_deleted.

### Dates and Times

| Type | Stores | Example use |
|---|---|---|
| `DATE` | A calendar date only | Birth dates |
| `TIMESTAMP` | Date and time, no timezone | Log entries |
| `TIMESTAMPTZ` | Date and time with timezone | Anything user-facing |

```sql
birth_date DATE
created_at TIMESTAMPTZ DEFAULT NOW()
```

Use `TIMESTAMPTZ` for anything where the user's timezone might matter — which is most things in a web app.

### JSON

PostgreSQL can store JSON directly in a column:

```sql
profile JSONB
```

`JSONB` (binary JSON) is the better choice over `JSON` because it's indexable and faster to query. Use it when different rows might have different fields, or when you need to store flexible, semi-structured data.

### Other useful types

| Type | Description | Example use |
|---|---|---|
| `UUID` | Universally unique ID | Public-facing IDs (safer than serial) |
| `BOOLEAN` | True or false | Flags, toggles |
| `TEXT[]` | Array of text values | Tags, labels |

```sql
id   UUID DEFAULT gen_random_uuid()
tags TEXT[]
```

### Data type summary

| Category | Types | Use for |
|---|---|---|
| Text | `VARCHAR`, `TEXT` | Names, emails, descriptions |
| Numbers | `INT`, `SERIAL`, `NUMERIC` | IDs, prices, quantities |
| Boolean | `BOOLEAN` | On/off flags |
| Date/Time | `DATE`, `TIMESTAMP`, `TIMESTAMPTZ` | Events, logging, scheduling |
| JSON | `JSONB` | Flexible or optional fields |
| Unique ID | `UUID` | Public-facing identifiers |

## Indexes — Making Queries Faster

An index is a data structure that PostgreSQL maintains alongside your table to make certain lookups faster. Without an index, finding a row means scanning every row in the table one by one. With an index, PostgreSQL can jump directly to the matching rows.

Think of it like an index in a book — instead of reading every page, you look up the term in the index and jump straight to the right page.

### Primary keys are indexed automatically

When you add a `PRIMARY KEY`, PostgreSQL creates an index on that column for free. This is why lookups by `id` are always fast:

```sql
SELECT * FROM students WHERE id = 7;  -- fast, id is indexed
```

### Foreign keys are NOT indexed automatically

This catches many beginners off guard. PostgreSQL enforces the foreign key relationship, but it does **not** automatically create an index on the foreign key column. That means this query can be slow on large tables:

```sql
SELECT * FROM enrollments WHERE student_id = 7;  -- potentially slow
```

The fix is to add an index manually:

```sql
CREATE INDEX idx_enrollments_student_id
ON enrollments(student_id);
```

As a rule of thumb: **any column you frequently use in a WHERE clause or JOIN condition is a candidate for an index** — especially foreign key columns.

```
  Without index — full table scan:
  ┌────────────────────────────────────┐
  │ enrollments (500,000 rows)         │
  │ Scan row 1...  student_id = 3? No  │
  │ Scan row 2...  student_id = 3? No  │
  │ Scan row 3...  student_id = 3? Yes │
  │ ...keep scanning all 500,000 rows  │
  └────────────────────────────────────┘  ← slow

  With index — direct lookup:
  ┌─────────────────────────────────┐
  │ Index: student_id               │
  │ student_id = 3 → rows 3, 47, 892│
  └─────────────────────────────────┘
          ↓ jump straight there      ← fast
```

### The trade-off

Indexes make reads faster but writes slightly slower, because PostgreSQL has to update the index every time a row is inserted, updated, or deleted. For most web applications this is absolutely worth it, but it's worth knowing that indexes aren't completely free.

## What's Next

You now know how to design a database schema — how to structure tables, define the relationships between them, query across tables with JOINs, evolve a schema over time with ALTER TABLE, choose the right data types, and speed up queries with indexes.

The next document goes deeper into querying: how to search and filter data beyond simple WHERE conditions, how to use LIKE for pattern matching, how to handle NULL values, and how to use aggregate functions like COUNT, SUM, and AVG together with GROUP BY to answer analytical questions about your data.
