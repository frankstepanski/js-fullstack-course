# Real-World Case Studies
### Document 4 of 4 — Seeing Everything Come Together

> **For:** Beginner engineers who just learned fullstack development | **Tone:** Plain English, familiar scenarios

---

## Why this document exists

The first three documents gave you the vocabulary and the mental models. This one puts them to work.

We're going to look at three systems that a beginner fullstack developer can actually relate to — systems similar to things you may have already built in smaller form. For each one we'll ask: what does it need to do? How would you build it on day one? What breaks as it grows? And how does each problem connect back to what you learned in Documents 1, 2, and 3?

The goal isn't to teach you advanced architecture. The goal is to make you look at a system you've built — a simple app with a database and some API routes — and see the decisions inside it more clearly.

The three systems:

1. **A user registration and login system** — something every fullstack developer has built
2. **An e-commerce product page and checkout** — familiar, and full of interesting decisions
3. **A simple social feed** — posts, follows, and why reading a feed is harder than it looks

---

## How to read each case study

Each one follows the same structure:

**What it does** — the feature in plain English

**How you probably built it** — the simple version that works at small scale

**The problems** — each numbered, with a clear explanation

**The fixes** — each fix numbered to match its problem exactly, with diagrams

**What from this series you just saw** — which document each concept came from

# Case Study 1: User Registration and Login

*The first feature in almost every fullstack project*

---

## What it does

A user signs up with their email and password. They get logged in. On future visits they stay logged in. They can log out. If they forget their password, they can reset it via email.

You've almost certainly built this. It feels straightforward — but there are several places where the naive version breaks in ways that aren't obvious until they happen to real users.

## How you probably built it

You created a `users` table and stored everything in it:

```
  users table
  ────────────────────────────────────────────────────────
  id  │  email              │  password        │  name
  ────┼─────────────────────┼──────────────────┼──────────
  1   │  alice@example.com  │  mypassword123   │  Alice
  2   │  bob@example.com    │  hunter2         │  Bob
```

When someone logs in, you check their email and password against this table. If they match, you create a session. The session lives in your server's memory, and a session ID gets stored in a cookie in the user's browser.

This works fine for a small app. Here's where it falls apart.

## The problems

### Problem 1 — Plain-text passwords are a disaster waiting to happen

Right now, `mypassword123` is sitting in your database in plain text. If your database is ever leaked — through a security breach, a misconfigured backup, or even an accidental share — every user's password is exposed immediately.

This is worse than it sounds. Most people reuse passwords across multiple sites. One leak of your small app could compromise your users' email, banking, and social media accounts.

```
  Your database gets leaked:
  ──────────────────────────────────────────────────────────
  id │ email             │ password
  1  │ alice@example.com │ mypassword123   ← attacker reads this directly
  2  │ bob@example.com   │ hunter2         ← and this

  Attacker tries these passwords on Gmail, Instagram, banks.
  Many of them will work. ❌
```

---

### Problem 2 — Sessions break when you add a second server

Right now, your session lives in your server's memory. That's fine with one server. But when your app grows and you add a second server (as Document 2 covered), you have a problem.

```
  Alice logs in ──▶ Load balancer sends to Server 1
                    Server 1 stores session in memory:
                    { sessionId: "abc123", user: "Alice" }

  Alice clicks something ──▶ Load balancer sends to Server 2
                              Server 2 checks its own memory:
                              "I have no session for abc123" ❌
                              Alice gets logged out randomly.
```

The session only exists on Server 1. Server 2 has never heard of it. Users get randomly logged out every time the load balancer sends their request to a different server.

---

### Problem 3 — Nothing stops two accounts with the same email

If your application code doesn't explicitly check for duplicate emails — or if the check has a race condition — two users can register with the same email address. Now you have two rows for `alice@example.com` and no reliable way to know which login belongs to which person.

```
  users table (broken):
  ─────────────────────────────────────────────────────────
  id │ email             │ name
  1  │ alice@example.com │ Alice Smith    ← same email
  2  │ alice@example.com │ Alice Jones    ← as this one

  Who gets logged in when "alice@example.com" logs in?
  Depends on which row the query returns first. ❌
```

---

### Problem 4 — Password reset done wrong exposes users

A very common beginner approach: when a user clicks "forgot password," email them their current password.

You can't do this if passwords are hashed (you won't have the original to send). But even if you could — emailing a password is a security risk. Emails are not encrypted. Anyone who can intercept, forward, or access that email inbox gets the password in plain text.

## The fixes

The fixes below are numbered to match the problems above — Fix 1 solves Problem 1, Fix 2 solves Problem 2, and so on.

---

### Fix 1 — Hash passwords before storing them *(from Document 3 — data integrity)*

Instead of storing the raw password, store a **hash** — a scrambled, one-way version. You can check a password against a hash, but you cannot reverse the hash back to the original password.

```
  Signup:
  ──────────────────────────────────────────────────────────
  User enters:          mypassword123
  You run bcrypt:       $2b$10$N9qo8uLOickgx2ZMRZoMye...
  You store in DB:      $2b$10$N9qo8uLOickgx2ZMRZoMye...
                        ↑ not reversible


  Login:
  ──────────────────────────────────────────────────────────
  User enters:     mypassword123
  You hash it:     $2b$10$N9qo8uLOickgx2ZMRZoMye...
  Compare to DB:   match ✅ → log in
                   no match ❌ → wrong password


  If the database is stolen:
  ──────────────────────────────────────────────────────────
  Attacker gets:   $2b$10$N9qo8uLOickgx2ZMRZoMye...
  Cannot reverse:  ??? → mypassword123  ✅ (impossible)
```

Use **bcrypt** in your code — it's the standard library for password hashing:

```javascript
  // When user signs up — hash before saving
  const passwordHash = await bcrypt.hash(plainTextPassword, 10);
  await db.query(
    'INSERT INTO users (email, password_hash) VALUES ($1, $2)',
    [email, passwordHash]
  );

  // When user logs in — compare entered password to stored hash
  const isMatch = await bcrypt.compare(enteredPassword, storedHash);
  if (isMatch) {
    // create session, log them in ✅
  }
```

Never store the original password. Never use MD5 or SHA1 for passwords — they're designed for speed, which makes them easy to crack. bcrypt is deliberately slow, which makes brute-force attacks impractical.

---

### Fix 2 — Store sessions in Redis, not server memory *(from Document 2 — stateless servers)*

Document 2 explained that stateless servers are required for horizontal scaling to work. Sessions stored in server memory make servers stateful — fix that by moving sessions to Redis, which every server can read from.

```
  ❌ Sessions in server memory (breaks with 2+ servers):
  ──────────────────────────────────────────────────────────
  Alice logs in  ──▶ Server 1: stores session in memory
  Alice clicks   ──▶ Load balancer routes to Server 2
                     Server 2: "No session found" → Alice logged out ❌


  ✅ Sessions in Redis (works with any number of servers):
  ──────────────────────────────────────────────────────────
  Alice logs in  ──▶ Server 1: stores session in Redis
                     Redis: { "abc123": { user: "Alice" } }

  Alice clicks   ──▶ Load balancer routes to Server 2
                     Server 2: checks Redis → finds session ✅
                     Alice stays logged in ✅

  Any server can handle any request. ✅
```

Redis is the right tool here because it's fast (sub-millisecond reads), shared across all servers, and designed for exactly this kind of short-lived session data. This is why Document 1 introduced Redis as the session store of choice.

---

### Fix 3 — Add a UNIQUE constraint on the email column *(from Document 3 — normalization)*

Document 3 explained that enforcing data integrity at the database level is more reliable than relying on application code. A `UNIQUE` constraint on the email column means the database itself will reject any attempt to insert a duplicate — no matter where the request comes from.

```sql
  CREATE TABLE users (
    id            SERIAL PRIMARY KEY,
    email         VARCHAR(255) UNIQUE NOT NULL,   ← database enforces this
    password_hash VARCHAR(255) NOT NULL,
    name          VARCHAR(255) NOT NULL,
    created_at    TIMESTAMP DEFAULT NOW()
  );
```

```
  Without UNIQUE constraint:
  ──────────────────────────────────────────────────────────
  Two users register with alice@example.com simultaneously.
  Both requests pass your application check.
  Both rows get inserted. ❌ Duplicate data.

  With UNIQUE constraint:
  ──────────────────────────────────────────────────────────
  First registration: row inserted ✅
  Second registration: database throws an error ❌
  Your app catches it and says "email already in use" ✅
```

This also connects directly to the normalization principle from Document 3 — each email address should identify exactly one user. Enforcing that at the database level guarantees it holds true forever, not just when your code remembers to check.

---

### Fix 4 — Use a temporary token for password reset *(from Document 3 — transactions and data integrity)*

Instead of emailing the password, generate a one-time token, store it in the database with an expiry time, and email a link containing the token. When the user clicks the link, validate the token and let them set a new password. Then delete the token so it can't be used again.

```
  User clicks "forgot password"
          │
          ▼
  Generate a random token: "f8a3b2c1d9e4..."
  Store in DB:
    password_reset_tokens table
    ─────────────────────────────────────────────
    token           │ user_id │ expires_at
    f8a3b2c1d9e4... │    1    │ 2024-03-01 15:00
          │
          ▼
  Email user: "Click here to reset: /reset?token=f8a3b2c1d9e4..."
  (a link, not the password itself)
          │
          ▼
  User clicks the link
          │
          ▼
  Server checks:
  ┌─ Does this token exist in the DB?     → No: "link is invalid"
  ├─ Has it expired?                      → Yes: "link has expired"
  └─ Valid? Show "set new password" form
          │
          ▼
  User enters new password
          │
          ▼
  BEGIN TRANSACTION
    Hash the new password
    Update users SET password_hash = new_hash WHERE id = 1
    DELETE FROM password_reset_tokens WHERE token = "f8a3b2c1d9e4..."
  COMMIT
  ← both happen together, or neither does
```

The transaction at the end matters: you want to update the password and delete the token in one atomic operation. If the password updates but the token isn't deleted, the same reset link could be used again. If the token is deleted but the password fails to update, the user is locked out. The transaction ensures both happen or neither does — exactly what you learned in Document 3.

## What from this series you just saw

| Concept | From document | Where it appeared |
|---|---|---|
| Data integrity — UNIQUE constraints | Document 3 | Email column preventing duplicate accounts |
| Normalization | Document 3 | One row per user, email as a unique identifier |
| Stateless servers | Document 2 | Sessions in Redis so any server handles any request |
| Horizontal scaling | Document 2 | Why sessions in memory break with a load balancer |
| Transactions | Document 3 | Password reset — update password + delete token atomically |
| Right tool for the job | Document 1 | Redis for sessions, PostgreSQL for user data |

# Case Study 2: An E-Commerce Product Page and Checkout

*A product catalog, a cart, and a purchase — all the interesting parts*

## What it does

Users browse products. Each product page shows a name, description, price, and images. Users add items to a cart. At checkout they confirm their order and pay. Stock is reduced. A confirmation email is sent.

You've used this system thousands of times. Let's look at what's actually happening underneath.

## How you probably built it

A products table, a cart table, and an orders table. When someone checks out, create an order row and reduce the stock number.

```
  products table
  ─────────────────────────────────────────────────────
  id  │  name      │  price  │  stock  │  description
  ────┼────────────┼─────────┼─────────┼──────────────
  1   │  T-shirt   │  19.99  │  1      │  ...
  2   │  Notebook  │   4.99  │  203    │  ...
```

This works fine. Here's where it breaks.

## The problems

### Problem 1 — Two people can buy the last item simultaneously

You have exactly 1 T-shirt in stock. Alice and Bob both click "buy" at the exact same moment. Both requests hit the server. Both read `stock = 1`. Both see it's available. Both create an order. Stock becomes -1. You've sold a product you don't have.

```
  Without protection:
  ──────────────────────────────────────────────────────────
  Alice's request: read stock → 1 ✅ → create order
  Bob's request:   read stock → 1 ✅ → create order
                              ↑ both read before either writes

  Result: 2 orders, stock = -1 ❌
```

This isn't a hypothetical edge case — it happens regularly in any app with popular items and concurrent users.

---

### Problem 2 — The checkout involves multiple steps that must all succeed together

When an order is placed, three things need to happen:

1. Create an order record
2. Reduce stock on the product
3. Clear the item from the cart

If step 1 succeeds but the server crashes before step 2, you have an order but the stock count is wrong — you could oversell. If steps 1 and 2 succeed but step 3 fails, the user's cart still shows an item they just bought. Every partial failure creates a different kind of mess in your data.

```
  ❌ Without protection:
  ──────────────────────────────────────────────────────────
  Step 1: INSERT order row       ✅ saved
  Step 2: UPDATE stock - 1       💥 server crashes
  Step 3: DELETE from cart       never runs

  Result: order exists, stock not reduced,
          cart not cleared — data is inconsistent ❌
```

---

### Problem 3 — Product pages hit the database on every visit

A product page typically needs 3–4 database queries: get the product details, get the category name, get related products, get the average review score. Product information rarely changes — maybe once a day when prices or stock are updated.

```
  10,000 visitors look at the T-shirt page today:
  ──────────────────────────────────────────────────────────
  Each visit: 4 database queries
  Total: 40,000 queries — for data that barely changed

  Most of those queries returned identical results. ❌
```

---

### Problem 4 — Sending the confirmation email slows down checkout

Your checkout route calls your email service synchronously — it sends the email and waits for a response before returning the confirmation page to the user. Email APIs can take 1–3 seconds. Your user sits staring at a spinner after clicking "Place Order" for no good reason.

```
  User clicks "Place Order":
  ──────────────────────────────────────────────────────────
  Create order   → 50ms
  Reduce stock   → 30ms
  Clear cart     → 20ms
  Send email     → 2,500ms  ← user is waiting for this
  Show confirmation page

  Total wait: ~2.6 seconds. Feels broken. ❌
```

## The fixes

### Fix 1 — Prevent overselling with a transaction and row lock *(from Document 3 — transactions)*

Document 3 explained that a transaction wraps multiple operations so they all succeed or all fail. Here, you also need to lock the product row while you're checking stock — so no other request can read the same row and make the same decision simultaneously.

```sql
  BEGIN;

    -- Lock this product row — no other transaction can
    -- read or write it until we COMMIT or ROLLBACK
    SELECT stock FROM products
    WHERE id = 1
    FOR UPDATE;

    -- If stock = 0, ROLLBACK here and return "out of stock"

    -- Stock is available — create the order
    INSERT INTO orders (user_id, product_id, quantity, total)
    VALUES (42, 1, 1, 19.99);

    -- Reduce stock
    UPDATE products SET stock = stock - 1 WHERE id = 1;

  COMMIT;
```

```
  With the transaction and row lock:
  ──────────────────────────────────────────────────────────
  Alice starts transaction, locks the T-shirt row
  Bob tries to read the same row → must WAIT

  Alice: stock = 1 ✅ → creates order → reduces stock to 0
  Alice COMMITS → lock released

  Bob's turn:
  Bob: stock = 0 ❌ → ROLLBACK
  Bob sees: "Sorry, this item is sold out"

  Result: one order, stock correctly = 0 ✅
```

---

### Fix 2 — Wrap the full checkout in a transaction *(from Document 3 — transactions)*

The same tool that solves Problem 1 also solves Problem 2. Wrapping all three checkout steps — create order, reduce stock, clear cart — in a single transaction means they all commit together or all roll back together. There's no in-between state.

```sql
  BEGIN;

    -- Step 1: Create order
    INSERT INTO orders (user_id, status, total)
    VALUES (42, 'confirmed', 19.99);

    -- Step 2: Reduce stock
    UPDATE products SET stock = stock - 1 WHERE id = 1;

    -- Step 3: Clear cart
    DELETE FROM cart_items WHERE user_id = 42 AND product_id = 1;

  COMMIT;
  -- All three happened. ✅

  -- If anything fails, ROLLBACK undoes all of them.
  -- Database is left exactly as it was before checkout started. ✅
```

```
  Before transaction:     After COMMIT:          After ROLLBACK (error):
  ──────────────────      ─────────────────      ──────────────────────
  Orders: 0               Orders: 1              Orders: 0  (unchanged)
  Stock: 1                Stock: 0               Stock: 1   (unchanged)
  Cart: [T-shirt]         Cart: []               Cart: [T-shirt] (unchanged)
```

---

### Fix 3 — Cache product pages in Redis *(from Documents 1 and 2 — caching)*

Document 1 introduced caching as a layer between your app and database. Document 2 explained it in depth. Product pages are a perfect use case — the data barely changes and the same page gets loaded thousands of times a day.

```
  Without cache:
  ──────────────────────────────────────────────────────────
  Every visitor to the T-shirt page triggers:
  → Query: product details      (DB hit)
  → Query: category name        (DB hit)
  → Query: related products     (DB hit)
  → Query: average review score (DB hit)

  10,000 visitors = 40,000 DB queries for largely the same data ❌


  With a Redis cache (TTL = 5 minutes):
  ──────────────────────────────────────────────────────────
  First visitor:
  → 4 DB queries → result stored in Redis

  Next 5 minutes:
  → Every visitor gets the cached result from Redis (< 1ms) ✅

  After 5 minutes:
  → Cache expires → next visitor triggers 4 fresh DB queries
  → Result cached again

  10,000 visitors ≈ a few hundred DB queries total ✅
```

The TTL of 5 minutes means product data is at most 5 minutes out of date — acceptable for a product page. If a price changes, the old price shows for at most 5 minutes. That's a reasonable trade-off between freshness and database load.

---

### Fix 4 — Send the confirmation email via a background queue *(from Document 1 — message queues)*

Document 1 introduced message queues as a way to handle work that doesn't need to happen immediately. Sending a confirmation email is the classic example. The user doesn't need to wait for it — they just need to know their order was placed. Send the order confirmation instantly, and queue the email to be sent in the background.

```
  ❌ Synchronous (user waits):
  ──────────────────────────────────────────────────────────
  User clicks "Place Order"
  Server: create order + update stock + clear cart   (100ms)
  Server: connect to email API                       (200ms)
  Server: wait for email to send                   (2,500ms)
  Server: return "Order confirmed" page
  User waited 2.8 seconds. ❌


  ✅ Asynchronous via queue (user gets instant response):
  ──────────────────────────────────────────────────────────
  User clicks "Place Order"
  Server: create order + update stock + clear cart   (100ms)
  Server: drop "send email" job into queue           (5ms)
  Server: return "Order confirmed" page immediately  ← user sees this ✅

  Meanwhile, in the background:
  Worker picks up the email job from queue
  Sends the confirmation email
  User receives it within seconds — but checkout felt instant ✅
```

```
  The queue separates two things:
  ─────────────────────────────────────────────────────────────
  "Did the order succeed?" → answered immediately ✅
  "Did the email send?"    → happens shortly after, separately ✅

  The user only needs to know the first thing happened.
  The second thing doesn't need to block them.
```

## The normalized schema

This is what a well-structured schema for this system looks like — each piece of information in one place, tables linked by IDs:

```
  users                products              categories
  ─────────────────    ─────────────────     ─────────────────
  id                   id                    id
  name                 name                  name
  email (UNIQUE)       description
  password_hash        price
  created_at           stock
                       category_id ──────────────▶ categories.id


  orders                         order_items
  ──────────────────────────     ──────────────────────────────
  id                             id
  user_id ──▶ users.id           order_id ──▶ orders.id
  status                         product_id ──▶ products.id
  total                          quantity
  created_at                     price_at_purchase ← snapshot of price
                                                     at time of purchase
```

Notice `price_at_purchase` on `order_items`. This is a deliberate decision: product prices change over time, but an order should always show what the customer actually paid. Storing the price at purchase time is the right call — it's one of those intentional exceptions to "don't duplicate data" that has a clear, specific reason behind it.

## What from this series you just saw

| Concept | From document | Where it appeared |
|---|---|---|
| Transactions | Document 3 | Checkout — all steps succeed or all roll back |
| Row locking | Document 3 | Preventing two users buying the same last item |
| Caching (Redis) | Documents 1 & 2 | Product pages cached to reduce DB load |
| TTL (cache invalidation) | Document 2 | Product cache expires every 5 minutes |
| Message queues | Document 1 | Confirmation email sent async, checkout stays fast |
| Normalization | Document 3 | Clean schema, price snapshot as conscious exception |

# Case Study 3: A Simple Social Feed

*Posts, follows, and the surprisingly hard problem of showing a timeline*

## What it does

Users can post short updates. Users can follow other users. When you open the app, you see a feed of recent posts from the people you follow, sorted newest-first.

It feels like a simple database query. It gets hard fast.

## How you probably built it

Three tables — users, posts, follows — and a query that fetches the feed on every page load:

```sql
  -- "Get the 20 most recent posts from everyone user #5 follows"
  SELECT posts.*
  FROM posts
  WHERE posts.user_id IN (
    SELECT following_id FROM follows WHERE follower_id = 5
  )
  ORDER BY created_at DESC
  LIMIT 20;
```

This is a reasonable, sensible query. For a small app with a few users it's completely fine. Ship it.

Here's what breaks.

## The problems

### Problem 1 — The query is slow without the right indexes

The query above does two lookups: first, find everyone user #5 follows (in the `follows` table); then, find recent posts by those users (in the `posts` table).

Without indexes on the right columns, both of these scan the entire table. In month 1 with 1,000 rows, this is fine. In month 6 with 500,000 rows, the feed takes 8 seconds to load.

```
  Without indexes:
  ──────────────────────────────────────────────────────────
  "Who does user #5 follow?"
  → Scan all 50,000 rows in the follows table
  → Find the 200 rows where follower_id = 5

  "What are their recent posts?"
  → Scan all 500,000 rows in the posts table
  → Filter for those 200 users
  → Sort by date

  Total: scanning 550,000 rows on every feed load ❌
```

---

### Problem 2 — The same expensive query runs for every user on every load

If 500 users open the app at the same time, 500 copies of this expensive query run simultaneously on your database. The database is doing the same work over and over, for every single user, every single time they load the app — even when the underlying data hasn't changed since the last load.

```
  500 users open app at 9am:
  ──────────────────────────────────────────────────────────
  500 feed queries run simultaneously on the database
  Each scans thousands of rows
  Database CPU hits 100%
  Response times climb from 200ms to 12 seconds
  Users think the app is broken ❌
```

---

### Problem 3 — The posts table grows and the query never gets faster

The feed query touches the posts table every time it runs. As your app grows, the posts table gets bigger — but the query doesn't get smarter. It's always looking at the same large table, always doing the same amount of work.

A query that takes 50ms with 10,000 posts might take 4 seconds with 2,000,000 posts — even with perfect indexes.

## The fixes

### Fix 1 — Add indexes on the right columns *(from Document 3 — indexes)*

This is the first fix to try, and it's free. Document 3 explained that an index lets the database jump directly to the rows it needs instead of scanning everything.

```sql
  -- Speed up "who does user X follow?"
  -- (the inner part of the feed query)
  CREATE INDEX idx_follows_follower
  ON follows (follower_id);

  -- Speed up "get recent posts by these users, newest first"
  -- (the outer part of the feed query)
  CREATE INDEX idx_posts_user_created
  ON posts (user_id, created_at DESC);
```

```
  With these indexes:
  ──────────────────────────────────────────────────────────
  "Who does user #5 follow?"
  → Index jumps directly to follower_id = 5
  → Returns 200 rows instantly ✅

  "What are their recent posts?"
  → Index jumps directly to those 200 users' posts,
    already sorted by date
  → Returns top 20 instantly ✅

  Total: milliseconds instead of seconds ✅
```

This alone often solves performance problems at moderate scale (up to tens of thousands of users). Try this before anything else — it's a few lines of SQL and makes an enormous difference.

---

### Fix 2 — Cache the feed results in Redis *(from Documents 1 and 2 — caching)*

Even with perfect indexes, running the feed query for 500 simultaneous users is wasteful. Alice's feed doesn't change every second — it changes when someone she follows posts something. Most of the time, you're recomputing the same result.

Cache the feed result in Redis with a short TTL. Most requests hit the cache instead of the database.

```
  Without cache:
  ──────────────────────────────────────────────────────────
  Alice loads feed → DB query → result
  Alice reloads 1 minute later → DB query → same result ❌
  (nothing changed, but the DB did the work again)


  With Redis cache (TTL = 60 seconds):
  ──────────────────────────────────────────────────────────
  Alice loads feed at 9:00:00
  → DB query runs → result stored in Redis ✅

  Alice reloads at 9:00:30
  → Redis returns cached result instantly (< 1ms) ✅
  → DB not touched

  Cache expires at 9:01:00
  → Next load triggers a fresh DB query
  → Result cached again

  500 users checking feeds every minute:
  Without cache: 500 DB queries per minute
  With cache:    ~500 DB queries per hour ✅
```

The trade-off is that feeds can be up to 60 seconds out of date. That's fine for a social feed — users don't notice a one-minute delay in seeing new posts.

---

### Fix 3 — Pre-build feeds at write time *(from Document 1 — thinking about scale)*

At large scale — say, hundreds of thousands of users — even cached feeds hit a ceiling. The cache still needs to be populated for each user, and with enough users those cache-miss DB queries add up.

The next step is a mindset shift: instead of building the feed when someone reads it, build it when someone posts.

```
  Bob posts "Hello world":
  ──────────────────────────────────────────────────────────
  1. Save post to posts table in DB

  2. Find everyone who follows Bob
     (using the index on follows.following_id)

  3. For each follower, prepend this post to their
     personal feed list stored in Redis:
     Redis: { "alice_feed": [bob's post, ...other posts] }
             { "clara_feed": [bob's post, ...other posts] }


  Alice opens the app:
  ──────────────────────────────────────────────────────────
  Read Alice's pre-built feed from Redis
  → Instant. No DB query at all. ✅
```

This moves work from read time to write time. Each post does a little more work (updating many followers' feeds), but every feed read is instant.

```
  QUERY AT READ TIME (simple — start here):
  ──────────────────────────────────────────
  ✅ Simple to build
  ✅ No extra work when posting
  ❌ Gets slow as users and posts grow
  ❌ DB query on every feed load

  PRE-BUILD AT WRITE TIME (scaled — add this later):
  ──────────────────────────────────────────────────
  ✅ Feed reads are instant (< 1ms from Redis)
  ✅ DB barely involved in reads
  ❌ More complex to build
  ❌ More work happens when someone posts

  → Start with Fix 1 (indexes) and Fix 2 (caching).
    Only add Fix 3 when you can measure that you need it.
```

## The normalized schema

```
  users                    posts                    follows
  ─────────────────────    ─────────────────────    ──────────────────────────
  id                       id                       id
  username                 user_id ──▶ users.id     follower_id  ──▶ users.id
  email (UNIQUE)           content                  following_id ──▶ users.id
  password_hash            created_at               created_at
  created_at
```

Three clean tables. Each row describes one thing — one user, one post, one follow relationship. No duplicated data. The `follows` table is just a join table recording which user follows which other user.

Indexes to add:

```sql
  -- Login lookup (from Case Study 1)
  CREATE INDEX idx_users_email ON users (email);

  -- Feed query: "who does user X follow?"
  CREATE INDEX idx_follows_follower ON follows (follower_id);

  -- Pre-build: "who follows user X?" (when they post)
  CREATE INDEX idx_follows_following ON follows (following_id);

  -- Recent posts by a user
  CREATE INDEX idx_posts_user_created ON posts (user_id, created_at DESC);
```

## What from this series you just saw

| Concept | From document | Where it appeared |
|---|---|---|
| Database indexes | Document 3 | Making the feed query fast at moderate scale |
| Caching (Redis + TTL) | Documents 1 & 2 | Reducing DB queries from 500/min to 500/hour |
| Message queues | Document 1 | Pre-building feeds asynchronously when someone posts |
| Normalization | Document 3 | Three clean tables, no duplicated data |
| Start simple, scale deliberately | Document 1 | Indexes first, cache second, pre-build only when needed |
| Stateless servers | Document 2 | Redis feed store accessible by any app server |


## The patterns that keep appearing

Looking back across all three case studies, the same ideas come up again and again. These are worth internalizing because they apply to almost every system you'll build.

**Transactions protect your data when multiple steps must happen together.** Checkout (order + stock + cart), password reset (update password + delete token), registration (create user + create settings) — any time two or more things need to succeed as a unit, that's a transaction. Without one, partial failures create corrupted data that's painful to clean up.

**Indexes are the cheapest fix.** Before adding servers, before adding caches, before redesigning anything — check whether you're missing indexes on your most-queried columns. A single missing index can make a query 100x slower, and adding one takes ten seconds. Always try this first.

**Caching reduces database load dramatically.** Product pages, social feeds, session data — in every case, re-reading the same data from the database repeatedly is wasteful when the data isn't changing that often. A short TTL cache (even 60 seconds) can reduce database load by orders of magnitude.

**Move slow work to the background.** Confirmation emails, image processing, notifications — anything that doesn't need to happen before the user gets a response should be queued and processed asynchronously. It makes every user-facing action feel faster without actually doing less work.

**Normalization keeps data trustworthy.** Every case study had a clean schema where each fact lived in exactly one place. When you need to change something — a product price, a user's email, a category name — you change it once and it's correct everywhere.

**Start simple. Add complexity only when you need it.** None of these systems started with Redis, transactions, queues, and multiple servers. They started as a basic table and a query. Complexity was added in response to specific, measurable problems. That's always the right order.

## What to build next

The best way to make these ideas stick is to build something yourself where these problems actually come up.

**Build a simple checkout with real stock management.** Add a transaction around the order creation. Try to make two requests buy the same last item simultaneously and watch what happens with and without the lock. You'll understand transactions at a visceral level after this.

**Add a follow/feed feature to any app you've already built.** Start with the basic query. Watch the query time in your database logs as you add more data. Add indexes and watch the time drop. Add caching and watch the database load fall. The progression from broken to fast will stick with you.

**Profile your existing app's database.** Whatever you've built — look at what queries are running and how long they take. Are there missing indexes? Are the same queries running over and over with the same result? These are the real problems described in this series, and finding them in code you wrote yourself makes them click in a way no document can.

---

*Previous: Document 3 — Databases & Storage*
*Series complete — you've covered the foundations of system design.*
