# Scalability & Load Balancing
### Document 2 of 4 — When One Server Isn't Enough

---

## Let's start with a restaurant

Imagine you open a small restaurant. Just you in the kitchen, one waiter, ten tables. It works great. Customers come in, they order, food comes out, everyone's happy.

Then you get a great review online. Suddenly 200 people show up on a Friday night.

One kitchen. One waiter. Ten tables. It completely falls apart. Orders get lost. Food is late. Customers leave angry. You can't serve 200 people with the setup designed for 20.

So what do you do?

You hire more waiters. You open the back room for more tables. You bring in a second chef. You put someone at the door to manage the flow of people coming in. You build a system that can handle the demand.

**This is exactly what scalability means in software.** Your app is the restaurant. Your users are the customers. And when more people show up than your system was built for, you need to redesign the operation — not just work faster.

Every concept in this document maps back to this restaurant. Keep it in your head as we go.

## What "scalable" actually means

A scalable system is one where you can handle more users, more traffic, and more data by **adding more resources** — without needing to tear everything down and rebuild it.

A non-scalable system is one where the only way to handle more load is to completely redesign it. That's expensive, slow, and happens at the worst possible time — when you're already overwhelmed.

The goal isn't to build a system that handles 10 million users on day one. The goal is to build a system that can *grow* to handle 10 million users without a complete rewrite every time you hit the next ceiling.

## The two ways to scale

When your system starts struggling, you have two choices: make what you have bigger, or add more of it.

---

### Make it bigger: scaling up (vertical scaling)

In restaurant terms: get a bigger kitchen. More burners, a bigger oven, more counter space.

In software terms: take your existing server and give it more power. More CPU cores to handle more work at once. More RAM to hold more data in memory. A faster disk to read and write data quicker.

```
  Your server before:               Your server after:
  ────────────────────              ──────────────────────────
  ┌──────────────────┐              ┌────────────────────────┐
  │ 4 CPU cores      │   upgrade    │ 32 CPU cores           │
  │ 8 GB RAM         │  ─────────▶  │ 256 GB RAM             │
  │ 500 GB disk      │              │ 2 TB fast disk         │
  └──────────────────┘              └────────────────────────┘
```

**Why it's great for beginners:** You don't change a single line of code. You don't change how the system is structured. You just pay for a beefier machine and things get faster. It's the easiest possible scaling move.

**Why it's not enough on its own:** Every machine has a limit. At some point there's no bigger machine to buy. And even before that limit, cost scales badly — a machine 10x as powerful often costs 30–50x as much. Most importantly: you still have *one machine*. If that machine goes down for any reason — a hardware fault, a bad deploy, a power cut — your entire app goes down with it.

Vertical scaling is the right first move. Use it to buy yourself time. But plan for the next step.

---

### Add more of it: scaling out (horizontal scaling)

In restaurant terms: open a second kitchen. Or a third. Each one handles some of the customers, so no single kitchen is overwhelmed.

In software terms: add more servers. Instead of one machine handling all requests, you have three — or ten — or a hundred — each handling a share of the traffic.

```
  Before:                           After:
  ───────                           ──────
  ┌──────────┐                      ┌──────────┐
  │ Server 1 │                      │ Server 1 │
  │ (drowning│    add more  ──────▶ ├──────────┤
  │ in reqs) │                      │ Server 2 │
  └──────────┘                      ├──────────┤
                                    │ Server 3 │
                                    └──────────┘
                                    Load shared across all three
```

**Why it's powerful:** There's no ceiling. You can keep adding servers as long as you need to. If one server dies, the others keep running — users don't notice. And you can add and remove servers dynamically, which means you only pay for what you actually need at any given moment.

**The catch:** Multiple servers need to work together. Traffic needs to be directed intelligently. Data needs to stay consistent. Sessions get complicated (more on this shortly). None of it is impossible, but it adds real moving parts to your system.

## The thing that makes horizontal scaling work: the load balancer

Here's the problem with having three servers: your users don't know about them. When someone opens your app, their request just goes to... which server? How does it know?

This is what a **load balancer** does. It's the person standing at the restaurant door, deciding which section each customer sits in.

```
                                      ┌──────────┐
                                 ┌───▶│ Server 1 │
                                 │    └──────────┘
  All users ──▶ [Load Balancer] ─┼───▶│ Server 2 │
                                 │    └──────────┘
                                 └───▶│ Server 3 │
                                      └──────────┘
```

Every request from every user hits the load balancer first. The load balancer picks a server, forwards the request there, gets the response back, and returns it to the user. The user has no idea there are multiple servers. To them, it's just your app.

Beyond directing traffic, the load balancer does two other really important things:

**It watches for failures.** The load balancer constantly checks whether each server is healthy. If Server 2 crashes at 3am, the load balancer notices within seconds and stops sending traffic to it. Server 1 and Server 3 pick up the slack. Your users don't see an outage — they might not even notice anything happened.

**It lets you update without downtime.** When you want to deploy a new version of your app, you can take servers offline one at a time, update them, and bring them back. The load balancer routes around the ones that are updating. Users get a seamless experience. No "we'll be down for maintenance" needed.

---

### How does the load balancer decide where to send each request?

You don't need to memorise these — just know they exist and that different situations call for different approaches.

**Round robin** (the simplest): requests rotate through servers in order. Request 1 goes to Server 1, request 2 to Server 2, request 3 to Server 3, request 4 back to Server 1. Think of it like dealing cards — everyone gets one in turn.

**Least connections** (smarter): always send the next request to whichever server is currently the least busy. Think of it like a supermarket where you pick the checkout lane with the shortest queue. More adaptive when some requests take longer than others.

For most beginner projects, round robin is perfectly fine and requires zero configuration. Least connections becomes useful when your requests vary significantly in how long they take.

## The sticky problem with multiple servers: sessions

Here's something that trips up almost everyone the first time they think about horizontal scaling.

A user opens your app and logs in. Your server creates a **session** — a small record that says "this person is logged in and their name is Alice." It stores that session in memory on Server 1.

A few seconds later, Alice clicks a button. The load balancer happens to route that request to Server 2. But Server 2 has never heard of Alice. Her session is on Server 1. Server 2 responds with "who are you?" and Alice gets an error, or gets logged out.

```
  Alice logs in ──▶ Load balancer sends to Server 1
                    Server 1: "OK, Alice is logged in" (stores in memory)

  Alice clicks ──▶ Load balancer sends to Server 2
                   Server 2: "I have no idea who Alice is" ❌
```

This is called the **stateful server problem**. A server that remembers things about a user between requests is called "stateful" — and stateful servers are really painful to scale.

The solution is to make your servers **stateless**. Instead of each server keeping its own memory of who's logged in, store that information somewhere all servers can access.

```
  Alice logs in ──▶ Server 1 saves session to Redis (shared)
                    ┌──────────────────────────────────────┐
                    │  Redis: "Alice is logged in"         │
                    │  (every server can read this)        │
                    └──────────────────────────────────────┘

  Alice clicks ──▶ Server 2 checks Redis
                   Redis: "Yes, Alice is logged in" ✅
                   Server 2 handles the request correctly
```

Redis is a super-fast shared data store that all your servers can read from and write to. It's specifically designed for this kind of shared, fast-access data. When any server needs to know if a user is logged in, it asks Redis — not its own memory.

The big idea: **stateless servers treat every request as if it's the first time they've seen this user.** Everything they need to know about the user arrives with the request. This is what makes horizontal scaling actually work cleanly — because any server can handle any request.

## Caching: making your whole system faster

Even with multiple servers, there's usually one place that gets overwhelmed: the **database**. Every server in your fleet is hitting the same database for data. At scale, this becomes the bottleneck.

The solution is a **cache** — a place to store copies of frequently requested data so most requests never have to touch the database.

Think of it like this. In your restaurant, imagine if the waiter had to walk to the back office to look up the menu every time a customer asked what was on it. That's slow and wasteful — the menu doesn't change that often. So instead, the waiter keeps a copy of the menu in their apron. Someone asks about the specials? They look in their pocket — instant answer. The back office only gets involved when the menu actually changes.

```
  Without cache (slow):
  User asks for data ──▶ Server ──▶ Database (30–50ms every time)
                                ◀── returns data

  With cache (fast):
  User asks for data ──▶ Server ──▶ Cache  (< 1ms if it's there ✅)
                              │
                              └──▶ Database  (only when cache doesn't have it)
```

The cache (usually Redis again, or a similar tool) stores data in RAM — the same fast memory your computer uses to run programs. RAM is roughly 100x faster than reading from a database on disk.

---

### What's worth caching?

Not everything. Good candidates:

- **Data that lots of people read but rarely changes** — the list of categories in your app, a user's profile, public content like a blog post
- **Expensive calculations** — a dashboard that adds up thousands of records doesn't need to recompute every time someone loads the page; just cache the result

Bad candidates:

- **Data that changes constantly** — live scores, real-time messages, stock prices. By the time the cache serves it, it's already wrong.
- **Sensitive personal data** — be careful about what you cache and for how long

---

### The one thing to know about caching going wrong

The trickiest part of caching is knowing when to update the cached copy. If a user changes their name and your server still serves the old cached version, that's a bug.

The simplest approach — and the one most beginners should start with — is a **TTL (Time to Live)**. Cached data automatically expires after a set time. After 5 minutes, the cache discards it and the next request fetches fresh data from the database.

```
  Profile cached at 2:00pm, TTL = 10 minutes
  ────────────────────────────────────────────
  2:04pm ──▶ cache returns cached profile ✅
  2:09pm ──▶ cache returns cached profile ✅
  2:11pm ──▶ cache expired, fetch fresh from DB, cache again 🔄
  2:15pm ──▶ cache returns fresh profile ✅
```

For most beginner use cases, TTL is all you need. The trade-off is that users might briefly see slightly outdated data — usually acceptable for non-critical content.

## Availability: what happens when things break

**Availability** is simply: what percentage of the time is your app actually up and working?

Here's what the numbers mean in practice:

| Availability | Downtime per year | What it means |
|---|---|---|
| 99% | 3.65 days | Unacceptable for most apps |
| 99.9% | 8.7 hours | Okay for internal tools |
| 99.99% | 52 minutes | Good for consumer apps |
| 99.999% | 5 minutes | Payment systems, hospitals |

The enemy of availability is a **single point of failure** — any component that, if it breaks, takes your whole app down with it.

Think about it in restaurant terms. If your entire restaurant has one electricity connection and it gets cut, the whole restaurant shuts down. But if you have a backup generator, losing the main power doesn't end the night.

In software, you eliminate single points of failure with **redundancy** — running multiple copies of everything critical.

```
  Single point of failure:          Redundant:
  ────────────────────────          ──────────
  One load balancer                 Two load balancers (one is backup)
  → it goes down = everyone down    → one fails, other takes over instantly

  One server                        Multiple servers behind load balancer
  → it crashes = everyone down      → one crashes, others continue

  One database                      Primary database + replica
  → it fails = data inaccessible    → replica takes over if primary fails
```

You don't need full redundancy for every component from day one. Start by identifying your single biggest single point of failure and eliminating that first. Then the next. Availability improves incrementally.

## Auto-scaling: only paying for what you need

Traffic is almost never constant. A news site gets slammed when a big story breaks. An e-commerce app gets hammered on Black Friday. A workplace tool is quiet on weekends.

If you size your infrastructure for peak load, you're paying for mostly-idle servers the other 22 hours of the day. If you size it for average load, you fall over during spikes.

**Auto-scaling** is the answer. Cloud platforms — AWS, Google Cloud, Azure — can automatically add servers when traffic rises and remove them when it drops. You set the rules ("add a server if CPU stays above 70% for 5 minutes", "remove a server if CPU stays below 20% for 10 minutes"), and the cloud handles the rest.

```
  2:00am   →  2 servers  (it's quiet, most users are asleep)
  8:55am   →  traffic starts climbing
  9:00am   →  spike hits, cloud automatically adds 6 servers
  9:02am   →  8 servers handling the load comfortably
  11:00am  →  traffic drops, cloud removes 4 servers
  11:05am  →  4 servers, costs drop back down

  You pay for 8 servers for ~2 hours.
  You pay for 2–4 servers the rest of the day.
```

Auto-scaling works because of the stateless server approach from earlier. Since servers don't store any local state about users, a brand new server can start handling requests the moment it boots up. No warm-up needed. This is another reason stateless architecture matters so much — it's what makes auto-scaling actually useful.

## What a fully scaled system looks like

Here's everything we've covered assembled into one picture. Don't be intimidated by this — you don't build this on day one. You add each layer when you actually need it.

```
  Users everywhere
        │
        ▼
  ┌─────────────────┐
  │  CDN            │  ← serves images, CSS, JS from near the user
  └────────┬────────┘     (a whole document on its own — coming soon)
           │
           ▼
  ┌─────────────────┐
  │  Load Balancer  │  ← routes traffic, detects failures
  └──────┬──────────┘
         │
   ┌─────┴──────┬──────────┐
   ▼            ▼          ▼
[Server 1]  [Server 2]  [Server 3]   ← stateless, auto-scaled
   └──────────────┬──────────┘
                  │
                  ▼
          ┌───────────────┐
          │    Cache      │  ← answers most reads instantly (Redis)
          └───────┬───────┘
                  │  (cache miss only)
                  ▼
          ┌───────────────┐
          │    Database   │  ← source of truth
          └───────────────┘
```

Each layer solves a specific problem. Remove any one of them and there's a specific thing that breaks. That's how you know a design is good — every piece earns its place.

---

## How to recognise what's actually wrong

Theory is one thing. But when your app is slow at 9am and you don't know why, you need to know what to look for.

**Your server CPU is maxed out**
What it looks like: requests are slow, server feels sluggish, CPU usage is at 90%+.
What it means: the server is doing too much work.
What to do: scale up first (bigger machine), then scale out (more servers + load balancer) if that's not enough.

**Your database is slow**
What it looks like: the server CPU is fine, but individual requests are slow. Database query times are high.
What it means: the database is the bottleneck — either missing indexes, or just too much traffic hitting it.
What to do: check for missing indexes first (quick win). Then add a cache to reduce how often you hit the database. Then add read replicas if it's still overwhelmed.

**Traffic spikes are killing you**
What it looks like: the app is fine most of the day but crashes at predictable times — 9am, lunch, big marketing events.
What it means: you're sized for average load, not peak load.
What to do: set up auto-scaling. A CDN also helps by offloading static file requests from your servers during spikes.

**One part of the app is slow, everything else is fine**
What it looks like: most pages load in 200ms, but one specific page takes 8 seconds.
What it means: there's a specific problem with that one endpoint — probably a slow database query or a call to a slow external service.
What to do: fix that specific thing. Don't add more servers — that won't help a slow query.

---

## The order of operations when things get slow

This is the most practical thing in this document. When your system starts struggling, don't panic and add a dozen things at once. Work through this list in order, and stop when things are fast again:

1. **Find the actual bottleneck first.** Is it the server? The database? One slow query? Adding more servers won't fix a slow database query.

2. **Scale up vertically.** Quick, no code changes, buys you time.

3. **Add a cache.** Often the single highest-impact change. Dramatically reduces database load.

4. **Add indexes to your database.** If you haven't already — a missing index can make a query 100x slower than it needs to be.

5. **Scale out horizontally.** Add servers behind a load balancer. Make sure your servers are stateless first.

6. **Set up auto-scaling.** Stop paying for idle capacity and protect against spikes.

7. **Add database read replicas.** When the database itself becomes the ceiling despite good caching.

The temptation is to skip straight to step 5 because "more servers = faster" feels intuitive. It doesn't work that way. More servers won't fix a slow database query or a missing index. Always diagnose before you add complexity.

---

*Next: Document 3 — Databases & Storage*
