# System Design Fundamentals
### Document 1 of 4 — The Big Picture

> **For:** Beginner engineers | **Tone:** Plain English, no jargon

---

## Start here: forget everything technical for a moment

Before we talk about servers and databases and APIs, let's talk about a food truck.

You open a food truck. Just you, one grill, one menu. A customer walks up, orders a burger, you make it, you hand it over. Done. Simple.

Now imagine 10 customers show up at once. You're still okay — you hustle, you manage.

Now imagine 500 customers show up. You can't take orders and cook at the same time. The line is out the block. People are leaving. You're burning burgers. Everything is falling apart.

So what do you do? You hire someone to take orders. You get a second grill. You open a second window. You add a dedicated drinks person. You hire a prep cook. Now you can handle 500 people — because you designed the operation to handle it.

**That's system design.** It's not magic. It's just thinking ahead about how your system will hold up when things get bigger, busier, and more complicated than you originally planned for.

Every piece of software you use — Instagram, Google, Spotify, your bank's app — started simple and had to be intentionally redesigned over and over to handle more people, more data, and more complexity. System design is the discipline of doing that thinking.

---

## The simplest possible system

Every piece of software in the world, no matter how complex, starts with the same basic idea:

```
  You (the user)
       │
       │  "Show me my photos"
       ▼
  ┌─────────┐
  │  Server  │   ← a computer somewhere that receives your request
  └────┬────┘
       │
       │  "Let me look that up..."
       ▼
  ┌──────────┐
  │ Database │   ← where the actual data lives
  └──────────┘
       │
       │  "Here are your photos"
       ▼
  Back to you
```

That's it. A user asks for something. A server receives the request, fetches data from a database, and sends it back. This is called the **client-server model**, and it's the foundation of virtually all software systems.

- **Client** = you (your phone, your browser, your app)
- **Server** = the computer that does the work
- **Database** = where the data lives permanently

If you understand nothing else about system design, understand this diagram. Everything else — caching, load balancing, microservices — is just an answer to one question: *"What happens when this simple setup can't keep up anymore?"*

---

## The three problems every system has to solve

No matter what the app does, every system faces three fundamental challenges:

**1. Store data reliably** — user accounts, messages, photos, orders. This data needs to survive server restarts, stay organized enough to find quickly, and never get corrupted or lost.

**2. Retrieve data fast** — when a user asks for something, they expect it in milliseconds. Nobody waits 10 seconds for their feed to load. The system has to find the right data quickly, even when there are billions of rows in the database.

**3. Handle lots of people at once** — one user? Easy. A thousand users clicking at the exact same moment? That's where systems start to crack if they weren't designed for it.

Everything in system design is ultimately about solving one or more of these three things.

---

## Two numbers to always keep in mind

Throughout this document every stage shows two numbers side by side:

- **Total users** — everyone who has an account. This is how most people talk about growth, so it's the headline number.
- **Peak concurrent users** — how many people are hitting the system at the exact same moment. This is what the server actually feels, and what drives infrastructure decisions.

> ### 💡 Total users is a business metric. Concurrent users is an infrastructure metric.
> A million registered users who are all asleep right now put zero load on your server. Fifty users all clicking at the same second can bring a poorly designed system to its knees. Throughout this document, both numbers are shown together so you always know what the system is actually experiencing — not just how many accounts exist.

We'll use roughly 10% as the ratio of peak concurrent to total users throughout — a reasonable ballpark for a consumer app with moderately spiky traffic. Your real number will vary, but the relationship between the two is what matters.

---

## Let's follow one app as it grows

We're going to build a simple note-taking app — users can save and read notes — and watch what has to change at each stage of growth. Each stage shows both the total user count and the peak concurrent load, so you always see what the system is actually dealing with.

---

### 🟢 Stage 1: 100 total users  |  ~10 concurrent at peak

You launch your app. A few dozen friends sign up. You've got about 100 total users — at any given moment, maybe 10 are using it at the same time.

```
  100 total users  |  ~10 concurrent at peak
        │
        ▼
  ┌───────────────────────────┐
  │  One Server               │
  │  (your code + database    │  ← everything on one machine
  │   all on the same box)    │
  └───────────────────────────┘
```

At this scale, **everything can live on one machine.** The server runs your app code. The database sits on the same box. A single computer handles all the traffic without breaking a sweat.

You don't need to think about system design here. Seriously. Just ship the thing. Make it work. Fix bugs. Listen to users.

**What actually matters at this stage:** Does it do what people need? Does it feel good to use?

**The lesson:** Don't over-engineer early. A $10/month server is fine for 100 users.

---

### 🟡 Stage 2: 1,000 total users  |  ~100 concurrent at peak

Word spreads. You've got 1,000 total users — maybe 100 using it at peak. The server still handles it fine — you're nowhere near the limit of what one machine can do.

Nothing is breaking. But this is exactly why this stage matters. **Fixing a slow query at 1,000 users takes 20 minutes. Fixing the same problem at 100,000 users means a production incident, a rushed migration on a giant table, and an engineering team working through the night.** The habits you build now are cheap insurance against pain later.

---

#### Performance practices to start now

**Database indexes.**
An index tells the database where to find data without scanning every single row — like the index at the back of a textbook. At 1,000 users your database might have 50,000 rows already. Without an index on the right columns, every query is reading all of them. With an index, it jumps straight to the answer.

```
  Without an index:
  "Find all notes for user #42"
  → Database reads every single row  →  slow, gets worse as data grows

  With an index on user_id:
  "Find all notes for user #42"
  → Database jumps directly to user #42's rows  →  fast, stays fast
```

Add indexes on columns you filter or sort by frequently — user IDs, timestamps, status fields. You won't feel the pain without them yet, but you will soon, and adding indexes to a table with millions of rows later is slow and risky.

**Fix N+1 queries.**
This is one of the most common beginner mistakes, and it's completely invisible until it destroys you at scale. An N+1 query is when loading a list of things fires one database query per item instead of one query for all of them.

```
  N+1 problem — loading 20 notes with their authors:
  Query 1:  "Get all 20 notes"
  Query 2:  "Get author for note 1"
  Query 3:  "Get author for note 2"
  ... (20 more queries)
  Total: 21 database queries to load one page

  Fixed — using a JOIN or eager loading:
  Query 1:  "Get all 20 notes with their authors in one go"
  Total: 1 database query to load one page
```

At 50 concurrent users this makes a page load take 200ms instead of 20ms — annoying but survivable. At 5,000 concurrent users it takes your database down entirely.

**Pagination — never return everything.**
Never write a query that returns all records with no limit. At launch your database has 100 rows. Six months later it has 2 million. A query that was instant at launch suddenly takes 30 seconds and times out. Always load data in pages — 20 or 50 records at a time — and make users (or the UI) ask for more.

```
  ❌ Bad:   SELECT * FROM notes WHERE user_id = 42
  ✅ Good:  SELECT * FROM notes WHERE user_id = 42 LIMIT 20 OFFSET 0
```

**Select only what you need.**
`SELECT *` fetches every column in a table, even ones you don't use. If a notes table has a `content` column with 10,000 characters per note, fetching it just to display the note title is wasteful. Select only the columns your code actually uses.

```
  ❌ Bad:   SELECT * FROM notes WHERE user_id = 42
  ✅ Good:  SELECT id, title, created_at FROM notes WHERE user_id = 42
```

**Connection pooling.**
Opening a fresh database connection for every request is expensive — it can take 20–50ms just to establish the connection, before any query runs. Connection pooling keeps a set of connections open and reuses them across requests. Most web frameworks do this automatically if you configure it, and it's worth checking that yours is set up correctly.

---

#### Frontend performance practices

System design isn't only about the server. A slow frontend feels like a slow app even if the backend is lightning fast. At 1,000 users, basic frontend hygiene goes a long way.

**Compress and optimise images.** Images are almost always the biggest part of a page by file size. Serving a 4MB photo when a 200KB compressed version looks identical is just waste. Use modern formats (WebP instead of PNG/JPEG) and always resize images to the dimensions they'll actually be displayed at.

**Minify and bundle JavaScript.** Raw JavaScript files have comments, whitespace, and long variable names. Minification strips all of that out. Bundling combines many files into one, reducing the number of network round trips the browser has to make. Most build tools (Webpack, Vite, esbuild) do this automatically.

**Lazy load what's not immediately visible.** Don't load images, components, or data that the user can't see yet. If a page has 100 notes but only 10 are visible without scrolling, load the other 90 when the user scrolls toward them. This makes initial load feel instant even if the full page has a lot of content.

**Cache static assets.** Your CSS, JavaScript, and images don't change very often. Tell the browser to cache them so returning users don't re-download them on every visit. A simple `Cache-Control` header can cut load times for repeat visitors dramatically.

---

#### The diagram hasn't changed much — and that's the point

```
  1,000 total users  |  ~100 concurrent at peak
        │
        ▼
  ┌──────────────────────────────────┐
  │  One Server (same as before)     │
  │                                  │
  │  + backups configured            │
  │  + monitoring running            │
  │  + indexes on hot columns        │
  │  + N+1 queries fixed             │
  │  + pagination on all list views  │
  │  + frontend assets optimised     │
  └──────────────────────────────────┘
```

The architecture is still one box. You haven't added machines or changed how the system is structured. You've just made the code inside that box much smarter about how it uses the resources it has.

**What changes at this stage:** Good code practices, not infrastructure. Indexes, pagination, fixing N+1 queries, optimising the frontend, setting up backups and monitoring.

> ### 💡 Why do this now and not later?
> Because at 1,000 users, your database table has thousands of rows. At 100,000 users it has millions. Adding an index to a table with millions of rows locks the table while it builds — potentially taking the app offline for minutes. Fixing an N+1 query in a codebase that 3 engineers have been working in for a year is a delicate surgery. The same changes you can make in an afternoon today will take a week and a war room meeting in 18 months. **Do it now.**

---

### 🟠 Stage 3: 10,000 total users  |  ~1,000 concurrent at peak

Your app gets mentioned on Reddit. A newsletter picks it up. Signups spike. You've got 10,000 total users — roughly 1,000 hitting the app at peak.

Here's the honest truth: **whether this breaks you completely or barely registers depends entirely on what your app does.**

A simple note-taking app where users load a page and read some text? One decent server probably handles 1,000 concurrent users just fine. You might not need to change anything yet.

A video processing app where every upload triggers heavy computation? You could hit the wall at 50 concurrent users, let alone 1,000.

The real question isn't "how many users do I have?" — it's "what is each user request actually asking my system to do?"

---

#### What makes a request expensive?

Some requests are cheap. Some are brutal. Here's what drives the difference:

**How long each request takes.** If a request finishes in 5ms, your server can handle hundreds of them per second. If it takes 2 seconds — maybe it's doing a complex database query, or calling a slow third-party API — that same server handles a tiny fraction of the load. Slow requests pile up fast.

**How much computation is involved.** Loading a static page? Almost nothing. Generating a personalised feed by querying 50,000 rows and running a ranking algorithm? That's expensive per request.

**How chatty the app is.** Some apps make one request when you open them. Others make dozens per minute — polling for notifications, syncing state, streaming updates. More requests per user = more server pressure, even with the same number of people.

**Whether it does background work.** If every user action triggers a chain of further work — sending emails, resizing images, updating counters — the server is doing far more than just responding to the original request.

---

#### So what do you actually do at this scale?

The good news: there are several levers you can pull, and you don't need all of them. You pull the ones that address your specific bottleneck.

**Separate your app and database onto different machines.**
Right now they're competing for the same CPU and memory. Splitting them means each machine can be tuned independently — the app server for handling requests, the database server for fast data access. This is almost always worth doing by this stage regardless of what your app does.

```
  10,000 total users  |  ~1,000 concurrent at peak
       │
       ▼
  ┌────────────┐         ┌──────────────┐
  │ App Server │ ──────▶ │  Database    │
  │            │         │  Server      │
  └────────────┘         └──────────────┘
  (handles requests)     (handles data)
```

**Add database indexes.**
Think of an index like the index at the back of a textbook. Without one, a database scans every row to find your data. With one on the right column, it jumps directly there. This single change can take a query from 400ms down to 5ms — a massive win for almost no effort. It's usually the first thing to try when the database is slow.

**Go vertical before going horizontal.**
Before you add more servers, consider just making the existing ones bigger. More RAM, faster CPU, faster disk. This is called *vertical scaling*. It has limits — there's only so big one machine can get — but it's simple, cheap, and often buys you significant runway without any architectural changes.

```
  Option A: Scale up (vertical)        Option B: Scale out (horizontal)
  ─────────────────────────────        ─────────────────────────────────
  Replace your server with a           Add a second server and a
  bigger, faster machine               load balancer to split traffic

  [Small Server]  →  [Big Server]      [Server]  →  [Server 1] + [Server 2]
                                                      behind a load balancer

  Simpler. No code changes.            More complex. More resilient.
  Has a ceiling eventually.            Can keep scaling indefinitely.
```

**Cache the expensive stuff.**
If certain database queries are called constantly and the data doesn't change every second — a user's profile, a list of their notes, a popular piece of content — you can store the result in memory so you don't run the query every time. Redis is the most common tool for this. A cached result comes back in under 1ms. An uncached database query might take 30–50ms. For high-traffic read operations, this is often the biggest single win.

**Offload heavy work to the background.**
If user requests are slow because each one triggers expensive computation — sending emails, processing uploads, running reports — stop doing that work during the request itself. Instead, drop the task into a queue and let a background worker handle it asynchronously. The user gets an instant response. The heavy work still gets done, just a few seconds later.

```
  Without a queue:                 With a queue:
  ───────────────                  ──────────────
  User clicks "Upload"             User clicks "Upload"
  → Server processes video         → Server drops task in queue
    (takes 30 seconds)               → User gets "Processing..." instantly
  → User waits, staring            → Background worker picks up the task
  → Maybe times out                → Video processed, user notified
```

---

**What changes at this stage:** It depends on where your pain is. Almost everyone should separate app and DB, add indexes, and go vertical first. If you're still slow after that, add caching for hot data and offload heavy work to background queues.

**The lesson:** Don't assume your problem is what someone else's problem was. Look at your metrics first — is it the database? The server CPU? Slow external API calls? Fix the actual bottleneck, not a generic version of it.

---

#### A word on microservices — the conversation starts here

This is the stage where teams often start *talking* about microservices for the first time — not necessarily implementing them yet, but the idea comes up.

**What are microservices?** Instead of one big application that does everything (called a monolith), you split it into smaller independent services — a User Service, a Notes Service, a Search Service, a Notification Service. Each one is its own codebase, runs on its own servers, and can be deployed independently.

```
  Monolith (one big app)           Microservices (split apart)
  ──────────────────────           ───────────────────────────
  ┌────────────────────┐           ┌──────────┐  ┌──────────┐
  │                    │           │  Users   │  │  Notes   │
  │  Users             │           │ Service  │  │ Service  │
  │  Notes      ←───── │  becomes  └──────────┘  └──────────┘
  │  Search            │   ──────▶
  │  Notifications     │           ┌──────────┐  ┌──────────┐
  │                    │           │  Search  │  │Notifica- │
  └────────────────────┘           │ Service  │  │  tions   │
                                   └──────────┘  └──────────┘
```

**Microservices are not primarily a scale decision — they're a team and complexity decision.** The real reasons teams move to microservices are:

- The codebase has grown so large that engineers are constantly stepping on each other's work
- You want to deploy one part of the app without risking breaking everything else
- Different parts of the system need to scale very differently — image uploads need huge compute, user profile lookups barely need anything
- Different teams want to move at their own pace and use different technologies

**When does this conversation actually happen?**

| Team size | User scale | Likely verdict |
|---|---|---|
| 2–5 engineers | Any | Too early — the overhead of managing multiple services outweighs the benefits |
| 10–20 engineers | 10,000–100,000 | Worth seriously evaluating, especially if the monolith is causing deployment pain |
| 30+ engineers | 100,000+ | Almost certainly already happening or actively planned |

> ### ⚠️ Microservices are not free
> They come with real costs: more infrastructure to manage, harder local development, distributed tracing and debugging, network latency between services, and a much more complex deployment pipeline. A 5-person team on a monolith can often outship a 20-person team on poorly implemented microservices. **Don't split before you feel the pain of not splitting.**

---

### 🔴 Stage 4: 100,000 total users  |  ~10,000 concurrent at peak

You're growing fast. A popular tech blog writes about you. 100,000 total users — and at peak, roughly 10,000 are hitting the app at the same time.

One app server can't handle this. When 10,000 people hit it at the same moment, requests start queueing up. Response times balloon from 200ms to 8 seconds. Users think the app is broken. They leave.

You need **multiple servers**, and something to distribute traffic between them. That something is a **load balancer.**

```
  100,000 total users  |  ~10,000 concurrent at peak
        │
        ▼
  ┌─────────────────┐
  │  Load Balancer  │   ← the traffic cop
  └──────┬──────────┘
         │
   ┌─────┴──────┐
   ▼            ▼
[Server 1]  [Server 2]   ← same code, running in parallel
   └─────┬──────┘
         │
         ▼
    ┌──────────┐
    │ Database │
    └──────────┘
```

The load balancer is like a traffic cop at a busy intersection. Every time a request comes in, it picks which server should handle it. If Server 1 is getting slammed, the next request goes to Server 2. No single server gets overwhelmed. And if one server crashes, the other keeps serving users — nobody notices the outage.

But now a new problem appears: **the database is a bottleneck again.** Both servers are reading from the same database. At 100,000 users, you're doing thousands of database reads every second, and the database starts struggling to keep up.

The fix is **caching.** Instead of going all the way to the database every time someone loads their notes, you store a copy of recently accessed data in memory — somewhere much faster. Redis (a popular in-memory store) can answer a query in under a millisecond. A database query might take 30–50ms. For data that doesn't change every second (like a user's profile, or their list of notes), the cache handles most requests, and the database only gets hit when the data isn't cached yet.

```
  [Server 1]  [Server 2]
       │            │
       ▼            ▼
  ┌────────────────────┐
  │   Cache (Redis)     │  ← check here first — super fast
  └──────────┬─────────┘
             │  only if not found in cache
             ▼
        ┌──────────┐
        │ Database │  ← the source of truth
        └──────────┘
```

**What changes at this stage:** Load balancer + multiple servers. A cache layer sitting in front of the database. You also start thinking seriously about what happens when a server goes down — because now that it can happen without taking everyone offline, you should plan for it.

**The lesson:** At 100,000 users, you start designing for failure. Assume things will break. Build the system so it keeps working when they do.

---

### ⚫ Stage 5: 1,000,000 total users  |  ~100,000 concurrent at peak

A million total users. At peak, 100,000 people are using the app simultaneously.

A single database machine can only handle so many reads and writes per second. You're hitting that ceiling. Writes are queueing up. Reads are slow even with caching. You need to scale the database itself.

**Option 1: Read replicas**

Make copies of your database that handle read requests. All writes go to the "primary" database. All reads are spread across multiple copies. Since most apps do far more reading than writing, this alone can 5–10x your database capacity.

```
  Writes only ──▶  [Primary DB]
                        │
                 ┌──────┴──────┐
                 ▼             ▼
            [Replica 1]   [Replica 2]  ◀── All reads spread across these
```

**Option 2: Sharding**

Split your data across multiple databases. Users with IDs 1–500,000 go to Database A. Users 500,001–1,000,000 go to Database B. Each database is smaller and faster. Writes are distributed. The system can keep growing.

```
  User ID 1–500k    ──▶  [Database A]
  User ID 500k–1M   ──▶  [Database B]
  User ID 1M–1.5M   ──▶  [Database C]
```

**At this scale you also need to think about geography.** What happens if the data center your entire app runs in has a power outage? Or a flood? It's happened to real companies. The answer is to run your system in multiple geographic regions simultaneously. If one goes down, traffic automatically shifts to another. Your users in Europe shouldn't notice if your US data center has a problem.

**What changes at this stage:** Database replication or sharding. Multi-region deployment. A dedicated team whose entire job is keeping the database healthy.

**The lesson:** At a million users, every minute of downtime is a real business cost. System reliability stops being a technical concern and becomes a business concern.

## The parts of a system and what they do

Here's a plain-English glossary of the core building blocks:

**Server** — the computer that runs your code. Receives requests, does work, returns responses. At small scale you have one. At large scale you have many.

**Database** — permanent storage for your data. Two main flavors: SQL (structured, table-based, great for relational data like users and orders) and NoSQL (flexible, great for large volumes of less structured data).

**Cache** — a super-fast temporary store. Holds copies of recently accessed data so you don't have to hit the database every time. Think of it like your brain's short-term memory — instant recall, but not permanent.

**Load balancer** — a traffic cop that sits in front of your servers and distributes incoming requests across them. Makes it possible to run multiple servers without users knowing or caring which one they're talking to.

**CDN (Content Delivery Network)** — a global network of servers that stores copies of your static files (images, CSS, videos) close to users. A user in Singapore gets files from Singapore, not your data center in Ohio.

**Message queue** — a waiting room for background tasks. Drop in a task ("send this email", "resize this image") and a worker picks it up and processes it asynchronously. Users get fast responses; heavy work happens in the background.

## Why the architecture matters more than the code

Here's something that surprises a lot of beginners: the architecture of a system often matters more than the quality of the code.

A beautifully written app on a bad architecture will fall over under load. A messy codebase on a well-designed architecture will handle millions of users just fine.

Think about it like a restaurant. You could have the world's best chef, but if the kitchen is designed so the chef has to run to a storage room in the basement every time they need an ingredient, service is going to be slow. The skill is there. The design is the bottleneck.

The same is true in software. A query that scans 10 million rows every time a user loads their profile is a design problem, not a code problem. No amount of clever code fixes the fact that the data isn't organized in a way that supports fast lookups.

System design is about organizing the kitchen before the dinner rush.

## The vocabulary you'll hear constantly

**Latency** — how long a single request takes, start to finish. If you click a button and it takes 400ms to respond, that's the latency. Lower is better.

**Throughput** — how many requests the system can handle per second. High throughput means many users can be served simultaneously.

**Availability** — what percentage of the time is your system actually up and running? 99.9% sounds great — but that's still 8.7 hours of downtime per year. Companies with serious reliability needs aim for 99.99% or higher.

**Scalability** — how gracefully the system handles growth. A scalable system gets more capable as you add resources. A non-scalable system gets more expensive and eventually breaks.

**Reliability** — does the system do what it's supposed to, consistently? A reliable system doesn't lose data, doesn't return wrong answers, doesn't fail silently.

**Fault tolerance** — can the system keep working when something goes wrong? A fault-tolerant system degrades gracefully rather than crashing completely.

## The one idea to take away from this document

> **Every system design decision is a response to a problem that didn't exist at smaller scale.**

You don't add a load balancer on day one — you don't need one. You add it when one server isn't enough. You don't add a cache on day one — your database handles it fine. You add it when your database starts struggling.

Good system design isn't about building the most sophisticated system you can imagine. It's about building the simplest system that solves your current problems — and knowing what you'll reach for next when things start to break.

Start simple. Add complexity only when the problem demands it. Always know *why* each piece exists.

That's the whole game.

---

## At a glance: what changes at each scale

Both numbers are shown at every stage — total users as the headline, peak concurrent as what the server actually feels. The 10% ratio is a rough rule of thumb; your real number depends on how spiky your traffic is.

| Total users | Peak concurrent | The problem | What you add |
|---|---|---|---|
| 100 | ~10 | Nothing | One server + one database. Ship it. |
| 1,000 | ~100 | Data loss risk, no visibility, bad habits hardening | Backups, monitoring, indexes, fix N+1 queries, paginate everything |
| 10,000 | ~1,000 | Depends on your app — could be fine, could be a crisis | Separate DB server, vertical scaling, caching, background queues. Start the microservices conversation if team is 10+ engineers. |
| 100,000 | ~10,000 | One server overwhelmed at peak; monolith becoming painful for larger teams | Load balancer, multiple servers, cache. Microservices actively being split out. |
| 1,000,000 | ~100,000 | Database is the ceiling | Read replicas, sharding, multi-region. Microservices now standard. |

---

*Next: Document 2 — Scalability & Load Balancing*
