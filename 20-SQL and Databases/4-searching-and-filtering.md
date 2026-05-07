# Searching, Filtering, and Aggregating Data

In the previous documents you learned the core SQL commands — SELECT, INSERT, UPDATE, DELETE — and how to design a schema with tables, relationships, and JOINs.

Now it's time to get more precise with your queries. Real applications don't just pull all the data from a table — they search for specific records, filter by conditions, and summarise data into useful numbers. That's what this document covers.

By the end you'll know how to:
- Search for partial matches in text
- Handle case-insensitive searches
- Filter with multiple conditions
- Work with NULL values correctly
- Summarise data with COUNT, SUM, AVG, and more
- Group results and filter those groups

## Why This Matters

Databases in real applications can have thousands or millions of rows. You rarely want all of it — you want the right slice of it.

A few everyday examples:

- A user searches for products containing "phone" → you need `LIKE`
- An admin dashboard shows only pending orders → you need `WHERE`
- A report shows total revenue per customer → you need `SUM` and `GROUP BY`
- A leaderboard shows only users with more than 10 orders → you need `HAVING`

All of these are standard SQL patterns you'll use constantly as a backend developer.

---

## Advanced WHERE Conditions

You already know the basics of `WHERE`. Here are the patterns that come up in real queries.

### BETWEEN — filtering a range

```sql
-- Orders with a total between $50 and $200
SELECT *
FROM orders
WHERE total_amount BETWEEN 50 AND 200;
```

`BETWEEN` is inclusive — it includes both endpoints. The query above returns orders of exactly $50 and exactly $200 as well as everything in between.

### IN — matching one of several values

Instead of chaining multiple `OR` conditions, use `IN` when you want to match a column against a list of values:

```sql
-- Orders that are pending or processing
SELECT *
FROM orders
WHERE status IN ('pending', 'processing');
```

This is much cleaner than:

```sql
WHERE status = 'pending' OR status = 'processing'
```

## Handling NULL Values

`NULL` means "unknown" or "missing" — it is not zero and it is not an empty string. This trips up a lot of beginners because `NULL` behaves differently from every other value in SQL.

You **cannot** compare `NULL` with `=` or `!=`. This will never find any rows:

```sql
-- ❌ This does NOT work — never returns results
SELECT * FROM users WHERE phone = NULL;
```

You must use `IS NULL` or `IS NOT NULL`:

```sql
-- ✅ Find users with no phone number on file
SELECT * FROM users WHERE phone IS NULL;

-- ✅ Find users who have provided a phone number
SELECT * FROM users WHERE phone IS NOT NULL;
```

**Why?** Because `NULL` means "we don't know the value" — and comparing an unknown value to anything always produces an unknown result, not true or false. SQL uses `IS NULL` specifically to ask "does this column have no value?"

```
  users table
  ┌────┬───────┬───────────────┬───────────┐
  │ id │ name  │ email         │ phone     │
  ├────┼───────┼───────────────┼───────────┤
  │  1 │ Alice │ alice@...     │ 555-1234  │  ← has a phone
  │  2 │ Bob   │ bob@...       │ NULL      │  ← no phone on file
  │  3 │ Carla │ carla@...     │ NULL      │  ← no phone on file
  └────┴───────┴───────────────┴───────────┘

  WHERE phone IS NULL      → returns Bob, Carla
  WHERE phone IS NOT NULL  → returns Alice
  WHERE phone = NULL       → returns nothing ❌ (this never works)
```

---

## Pattern Matching with LIKE

`LIKE` lets you search for text that matches a pattern, rather than an exact value.

Two wildcard characters:
- `%` means "any number of characters" (including zero)
- `_` means "exactly one character"

```sql
-- Names that start with 'A'
SELECT * FROM customers WHERE name LIKE 'A%';

-- Emails ending in @gmail.com
SELECT * FROM customers WHERE email LIKE '%@gmail.com';

-- Products containing the word 'phone' anywhere
SELECT * FROM products WHERE name LIKE '%phone%';
```

The last example — `%term%` — is the most common. It's the basic search bar pattern: find anything that contains this word.

## Case-Insensitive Searching

By default, PostgreSQL string comparisons are case-sensitive. `'Alice'` and `'alice'` are treated as different values. In most web applications this is not what you want — a user searching for "frank" should find "Frank."

The standard fix is to convert both sides to lowercase before comparing:

```sql
SELECT *
FROM customers
WHERE LOWER(name) = LOWER('frank');
```

This works with LIKE too:

```sql
SELECT *
FROM customers
WHERE LOWER(name) LIKE '%frank%';
```

A real search bar query that checks both name and email:

```sql
SELECT *
FROM customers
WHERE LOWER(name)  LIKE '%frank%'
   OR LOWER(email) LIKE '%frank%';
```

> For apps that need more powerful search — typo tolerance, relevance ranking, language-aware matching — you'd reach for full-text search tools or a dedicated search engine like Elasticsearch. But `LIKE` with `LOWER()` covers the majority of basic search needs.

## Combining Conditions with AND, OR, and NOT

Real queries almost always have more than one condition. You combine them with `AND`, `OR`, and `NOT`.

**AND** — all conditions must be true:

```sql
-- Completed orders over $100
SELECT *
FROM orders
WHERE status = 'completed'
  AND total_amount > 100;
```

**OR** — at least one condition must be true:

```sql
-- Orders that need attention
SELECT *
FROM orders
WHERE status = 'pending'
   OR status = 'failed';
```

**Mixing AND and OR — always use parentheses:**

```sql
-- High-value orders, OR any completed order
SELECT *
FROM orders
WHERE (status = 'completed' AND total_amount > 100)
   OR total_amount > 500;
```

```
  orders table
  ┌────┬───────────┬──────────────┐
  │ id │ status    │ total_amount │
  ├────┼───────────┼──────────────┤
  │  1 │ completed │ $150         │  ← ✓ completed AND > $100
  │  2 │ pending   │ $600         │  ← ✓ total > $500
  │  3 │ completed │ $40          │  ← ✗ completed but only $40
  │  4 │ pending   │ $80          │  ← ✗ neither condition met
  └────┴───────────┴──────────────┘
  Result: rows 1 and 2
```

Without the parentheses, the query might not evaluate the way you intend. SQL has precedence rules (AND binds tighter than OR), but don't rely on them — always make your intent explicit with parentheses.

## Aggregation Functions

Aggregation functions take many rows and collapse them into a single value. They're how you answer questions like "how many?", "what's the total?", and "what's the average?"

| Function | What it does |
|---|---|
| `COUNT(*)` | Count the number of rows |
| `SUM(column)` | Add up all values in a column |
| `AVG(column)` | Calculate the average |
| `MIN(column)` | Find the smallest value |
| `MAX(column)` | Find the largest value |

### Basic examples

```sql
-- How many orders are in the system?
SELECT COUNT(*) AS total_orders
FROM orders;

-- Total revenue from all orders
SELECT SUM(total_amount) AS total_revenue
FROM orders;

-- Average order value
SELECT AVG(total_amount) AS average_order
FROM orders;

-- Most expensive single order
SELECT MAX(total_amount) AS largest_order
FROM orders;
```

The `AS` keyword gives the result column a readable name — without it the column header would just say `count` or `sum`.

### Aggregations with WHERE

You can filter rows before aggregating:

```sql
-- Total revenue from completed orders only
SELECT SUM(total_amount) AS completed_revenue
FROM orders
WHERE status = 'completed';

-- Number of orders placed in 2025
SELECT COUNT(*) AS orders_in_2025
FROM orders
WHERE created_at >= '2025-01-01'
  AND created_at <  '2026-01-01';
```

The `WHERE` clause runs first, filtering the rows. Then the aggregation runs on whatever rows remain.

## GROUP BY — Aggregating Per Group

So far, aggregations give you a single number for the whole table. `GROUP BY` lets you get that number **per group** — per customer, per status, per month, etc.

### Basic example

**Question:** How many orders has each customer placed?

```sql
SELECT customer_id,
       COUNT(*) AS order_count
FROM orders
GROUP BY customer_id;
```

What's happening:

```
  orders table (before GROUP BY)          After GROUP BY customer_id
  ┌────┬─────────────┬──────────┐         ┌─────────────┬─────────────┐
  │ id │ customer_id │ amount   │         │ customer_id │ order_count │
  ├────┼─────────────┼──────────┤   ──►   ├─────────────┼─────────────┤
  │  1 │      1      │  $50     │         │      1      │      3      │
  │  2 │      2      │  $30     │         │      2      │      1      │
  │  3 │      1      │  $80     │         │      3      │      2      │
  │  4 │      3      │  $120    │         └─────────────┴─────────────┘
  │  5 │      1      │  $15     │
  │  6 │      3      │  $60     │
  └────┴─────────────┴──────────┘
```

1. All rows in `orders` are split into groups, one group per `customer_id`
2. `COUNT(*)` is calculated for each group separately

Result:

| customer_id | order_count |
|---|---|
| 1 | 5 |
| 2 | 2 |
| 3 | 8 |

### Joining to get readable names

The result above shows IDs, not names. Join to the customers table to show names instead:

```sql
SELECT c.name,
       COUNT(o.id) AS order_count
FROM customers c
JOIN orders o ON c.id = o.customer_id
GROUP BY c.id, c.name;
```

Result:

| name  | order_count |
|-------|---|
| Alice | 5 |
| Bob   | 2 |
| Carla | 8 |

Note that you must include `c.id, c.name` in `GROUP BY` when grouping across a join.

### Grouping on multiple columns

**Question:** How many orders per customer, broken down by status?

```sql
SELECT customer_id,
       status,
       COUNT(*) AS order_count
FROM orders
GROUP BY customer_id, status;
```

| customer_id | status    | order_count |
|---|---|---|
| 1 | completed | 3 |
| 1 | pending   | 2 |
| 2 | completed | 2 |

Each unique combination of `customer_id` and `status` becomes its own group.

## HAVING — Filtering Groups

`WHERE` filters rows before aggregation. `HAVING` filters **after** aggregation — it lets you filter on the result of an aggregate function.

You cannot use `WHERE` with aggregate functions. This does not work:

```sql
-- ❌ This will cause an error
SELECT customer_id, COUNT(*) AS order_count
FROM orders
WHERE COUNT(*) > 5
GROUP BY customer_id;
```

Use `HAVING` instead:

```sql
-- ✅ Customers who have placed more than 5 orders
SELECT customer_id,
       COUNT(*) AS order_count
FROM orders
GROUP BY customer_id
HAVING COUNT(*) > 5;
```

### WHERE and HAVING together

You can use both in the same query — `WHERE` filters rows first, then `GROUP BY` groups them, then `HAVING` filters the groups:

```sql
-- Customers with more than 5 completed orders
SELECT customer_id,
       COUNT(*) AS completed_orders
FROM orders
WHERE status = 'completed'       -- filter rows first (only completed orders)
GROUP BY customer_id             -- group by customer
HAVING COUNT(*) > 5;             -- then filter groups (only customers with 5+)
```

The order of operations:

```
  All rows in orders table
          │
          ▼
  WHERE status = 'completed'   ← step 1: filter out non-completed rows
          │
          ▼
  GROUP BY customer_id         ← step 2: group what's left
          │
          ▼
  HAVING COUNT(*) > 5          ← step 3: keep only large groups
          │
          ▼
  SELECT customer_id, COUNT(*) ← step 4: return the result
```

1. `WHERE` — filter individual rows
2. `GROUP BY` — group the remaining rows
3. `HAVING` — filter the groups
4. `SELECT` — return the result


## Putting It Together — A Real Query

Here's a query that combines several of these concepts. It finds the top customers by completed order revenue, showing only those who've spent more than $500 total:

```sql
SELECT c.name,
       COUNT(o.id)          AS total_orders,
       SUM(o.total_amount)  AS total_spent
FROM customers c
JOIN orders o ON c.id = o.customer_id
WHERE o.status = 'completed'
  AND o.created_at >= '2025-01-01'
GROUP BY c.id, c.name
HAVING SUM(o.total_amount) > 500
ORDER BY total_spent DESC;
```

Reading it top to bottom:
- Start with `customers`, join to their `orders`
- Only include completed orders from 2025 onwards
- Group by customer
- Only show customers who spent more than $500
- Sort from highest to lowest spender

This is the kind of query that powers a real sales dashboard.

## Quick Reference

| Clause | What it does | When to use |
|---|---|---|
| `WHERE` | Filter rows | Before aggregation |
| `LIKE '%text%'` | Pattern match | Search bars, partial matches |
| `IN (a, b, c)` | Match a list | Multiple allowed values |
| `IS NULL` | Check for missing value | Optional fields |
| `BETWEEN x AND y` | Filter a range | Prices, dates |
| `LOWER()` | Case-insensitive compare | User search inputs |
| `COUNT`, `SUM`, `AVG` | Summarise many rows into one value | Reports, dashboards |
| `GROUP BY` | Aggregate per group | Per customer, per status |
| `HAVING` | Filter after aggregation | Groups meeting a threshold |

## What's Next

You now have a solid foundation in SQL — reading and writing data, designing schemas, querying across tables with JOINs, and summarising data with aggregations.

The next step is connecting all of this to your application code. Instead of running SQL manually, you'll write a Node.js backend that connects to PostgreSQL, runs these queries programmatically, and sends the results back to a React frontend. That's where SQL becomes part of a real, working application.
