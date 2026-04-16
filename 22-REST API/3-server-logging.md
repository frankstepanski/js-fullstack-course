# Server Logging — Seeing What Your API Is Doing

You've built a well-designed API, tested your routes, and debugged the issues you found. Now comes a question that trips up a lot of beginners:

**Once your API is actually running — how do you know what's happening inside it?**

The honest answer for most beginners is: `console.log`. And that's fine for development. But `console.log` is not logging — it's printing. The moment your server restarts, everything it printed is gone. In a real application, that's a problem.

This doc covers what **server logging** actually means, why it matters, and how to set it up properly from day one.

## The Problem with `console.log`

You've been using `console.log` throughout development to trace what your code is doing. Here's what it's good for and where it falls short:

```
console.log("User created")
```

```
┌─────────────────────────────────────────────────────────────┐
│  What console.log gives you                                 │
│                                                             │
│  ✅  Immediate output in the terminal                       │
│  ✅  Zero setup — it just works                             │
│  ✅  Great for tracing bugs during development              │
│                                                             │
│  ❌  Disappears when the server restarts                    │
│  ❌  No timestamps — when did this happen?                  │
│  ❌  No levels — a debug note looks like a critical error   │
│  ❌  No way to write to a file automatically                │
│  ❌  In production, there's no terminal watching            │
└─────────────────────────────────────────────────────────────┘
```

That last point is the critical one. When your API is deployed on a server somewhere, there's no terminal open watching `console.log` output. If something breaks at 2am, restarts, and you check in the morning — the logs are gone. You have no idea what happened.

**Real logging writes to a persistent destination.** The terminal is optional — the file is not.

## Two Places Logs Can Go — and Why Both Matter

Before touching any tools, it's important to understand that logs can go to two completely different destinations. Most beginners only know about one of them.

### The Server Console (Terminal Output)

The server console is just the terminal window where you ran `node server.js` or `nodemon server.js`. When you call `console.log()`, that's where it appears.

```
┌─────────────────────────────────────────────────────────────┐
│  Terminal — your server console                             │
│                                                             │
│  > nodemon server.js                                        │
│  Server running on port 3000                                │
│  GET /api/users 200 12ms                                    │
│  POST /api/users 201 43ms                                   │
│  Error: User not found                                      │
│                                                             │
│  ← You watch this in real time while developing             │
└─────────────────────────────────────────────────────────────┘
```

**The catch:** this only exists while your terminal is open. The moment you close it, restart the server, or your app crashes and restarts automatically — everything that was printed here is gone. Forever.

### Log Files (Permanent, On Disk)

A log file is a plain text file on your server's filesystem that your app writes to as it runs. Unlike the terminal, it keeps growing and persists across restarts. When something goes wrong at 2am and your server has already recovered by the time you check — the log file still has the full record of what happened.

```
┌───────────────────────────────────────────────────────────────┐
│  logs/combined.log — a file on disk                           │
│                                                               │
│  {"level":"info","message":"Server started","timestamp":"…"}. │
│  {"level":"info","message":"GET /api/users","timestamp":"…"}. │
│  {"level":"error","message":"DB query failed","timestamp":"…"}│
│  {"level":"info","message":"Server restarted","timestamp":"…"}│
│                                                               │
│  ← This survives restarts, crashes, and closed terminals      │
└───────────────────────────────────────────────────────────────┘
```

### Side by Side

| | Server Console (Terminal) | Log File (Disk) |
|--|--------------------------|-----------------|
| **Where it lives** | Your terminal window | A file on the filesystem |
| **Survives restart?** | ❌ Gone immediately | ✅ Persists forever |
| **Good for** | Watching what's happening right now | Investigating what happened in the past |
| **Available in production?** | ❌ No terminal to watch | ✅ Always there |
| **Searchable?** | ❌ Scrolling only | ✅ grep, filter by date/level |
| **Set up by default?** | ✅ console.log just works | ❌ You have to configure it |

**The goal of proper logging is to have both** — the terminal for live development feedback, and a file for the permanent record. Winston lets you do exactly that with a single setup.


## What Server Logging Actually Is

Server logging means capturing a structured, persistent record of what your application did — who called it, what happened, and what went wrong.

```
                        Your Express App
                               │
                               ▼
                    ┌─────────────────┐
                    │   Logger        │
                    │  (Winston)      │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        Terminal          error.log    combined.log
         output                                    
              │              │              │
        Disappears       Only errors    Everything
        on restart        persists       persists
```

This is the goal: **one logger, multiple destinations**. Your terminal still shows output while you're developing, but the important stuff is always written to a file too.

## Two Tools You Need

There are two complementary logging tools used in almost every professional Node/Express project:

| Tool | What It Does | When It Runs |
|------|-------------|--------------|
| **Morgan** | Logs every HTTP request automatically | Each time a request hits your API |
| **Winston** | Logs anything you tell it to, with levels and file output | Anywhere in your app code |

Think of them this way:

```
Morgan  →  "Someone knocked on the door"
           (logs the incoming request automatically)

Winston →  "Here's what happened after we opened it"
           (logs what your code did in response)
```

You'll use both together. Morgan handles the HTTP layer so you don't have to log every request manually. Winston handles everything inside your application logic.

**Winston does two distinct jobs — and this is important to understand:**

```
┌──────────────────────────────────────────────────────────────┐
│  Winston's two jobs                                          │
│                                                              │
│  1. Logging app events                                       │
│     → user created, error thrown, database call made         │
│     → anything your code does that you want a record of      │
│                                                              │
│  2. Writing those logs permanently to a file on disk         │
│     → so they survive restarts and exist in production       │
│     → this is what separates real logging from console.log   │
└──────────────────────────────────────────────────────────────┘
```

Morgan tells you *what came in*. Winston tells you *what happened next* — and makes sure that record is written to disk so you can refer back to it later.

## Part 1 — Morgan (HTTP Request Logging)

### What Morgan Does

Without Morgan, you have no automatic record of which requests hit your API. With it, every single request is logged instantly — method, path, status code, and response time.

```
# Without Morgan — you see nothing unless you add console.logs everywhere
POST /api/users  →  ???

# With Morgan — automatic, every time
POST /api/users 201 43ms
GET  /api/users 200 12ms
GET  /api/users/99 404 8ms
DELETE /api/users/1 204 21ms
```

### Installing Morgan

```bash
npm install morgan
```

### Setting It Up

Add Morgan to your `server.js` — it goes near the top, before your routes:

```js
// server.js
import express from "express";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("dev"));        // ← add this line

// your routes go here
import userRoutes from "./routes/users.js";
app.use("/api/v1/users", userRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
```

That single line — `app.use(morgan("dev"))` — gives you automatic logging for every request.

### Morgan Format Options

Morgan has several built-in formats. `dev` is the best choice for local development:

| Format | Output | Best For |
|--------|--------|----------|
| `dev` | `GET /api/users 200 12ms` with color | Local development |
| `combined` | Full Apache-style log with IP, user agent | Production file logging |
| `short` | Shorter version of combined | General use |
| `tiny` | Minimal — method, url, status, size | High-traffic apps |

```bash
# dev format output (colored in terminal):
GET  /api/users      200  12ms  - 312b
POST /api/users      201  43ms  - 89b
GET  /api/users/99   404   8ms  - 41b
```

> 💡 **Tip:** Use `morgan('dev')` locally and `morgan('combined')` when writing to a production log file — the combined format includes the timestamp, IP address, and user agent, which are useful for diagnosing real-world issues.

## Part 2 — Winston (Structured App Logging)

Morgan handles HTTP requests. Winston handles everything else — errors, business logic, database calls, startup events. It's your general-purpose logger.

### Why Not Just Keep Using `console.log`?

```
console.log("User created")
// output: User created

// vs Winston:
logger.info("User created", { userId: 42, email: "alice@example.com" })
// output: 2024-01-15 14:23:01 [INFO]: User created { userId: 42, email: '...' }
```

Winston adds:
- **Timestamps** — when exactly did this happen?
- **Log levels** — how serious is this message?
- **Structured data** — attach relevant context to every log entry
- **Permanent file output** — automatically writes to files on disk, not just the terminal. This is the single biggest difference. `console.log` prints and forgets. Winston prints *and* saves.

```
console.log("User created")
  → Prints to terminal
  → Gone when server restarts ❌

logger.info("User created", { userId: 42 })
  → Prints to terminal (in development)
  → Writes to logs/combined.log on disk ✅
  → Still readable tomorrow, next week, after a crash ✅
```

### Installing Winston

```bash
npm install winston
```

### Understanding Log Levels

Before writing any code, it's important to understand log levels. Not every message is equally important — levels let you filter and prioritize.

```
┌─────────────────────────────────────────────────────────────┐
│  Log Levels — from least to most severe                     │
│                                                             │
│  debug   →  Detailed dev info, usually turned off in prod   │
│  info    →  Normal operations ("Server started", "User      │
│             created", "Request completed")                  │
│  warn    →  Something unexpected but not broken             │
│             ("Slow query", "Deprecated route used")         │
│  error   →  Something actually failed and needs attention   │
│             ("DB connection lost", "Unhandled exception")   │
│                                                             │
│  Lower levels include everything above them. If you set     │
│  your logger to "warn", you'll see warn + error only.       │
└─────────────────────────────────────────────────────────────┘
```

| Level | When to Use It | Example |
|-------|---------------|---------|
| `debug` | Deep detail you only need when actively hunting a bug | Logging every step of a complex function |
| `info` | Routine events that confirm things are working | "Server started on port 3000", "User 42 created" |
| `warn` | Unexpected but recoverable situations | "Request missing optional field, using default" |
| `error` | Failures that need attention | "Database query failed", "Unhandled exception caught" |

### Understanding Transports — How Winston Writes to Multiple Places

This is the key concept that makes Winston more powerful than `console.log`. Winston uses the idea of **transports** — which is just a fancy word for "a destination your logs get sent to."

You can configure as many transports as you want, and every time you call `logger.info()` or `logger.error()`, Winston sends that message to **all of them simultaneously**.

```
You write one line of code:
  logger.error("Database query failed", { userId: 42 })
                        │
                        ▼
                    Winston
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
   Console          combined.log     error.log
  transport         transport        transport
        │               │               │
  Prints to         Writes to        Writes to
  terminal          disk (all)       disk (errors only)
  (dev only)
```

Three destinations, one log call. You never have to think about it after setup.

**The transports Winston ships with:**

| Transport | What It Does |
|-----------|-------------|
| `Console` | Prints to the terminal — colorized and readable in dev |
| `File` | Writes to a file on disk — permanent, survives restarts |

In the setup below, you'll see both used together. The `File` transports handle permanent storage. The `Console` transport is added only in development so you still get live terminal output while coding.

### Setting Up Winston

Create a dedicated logger file so you can import it anywhere in your app:

```js
// utils/logger.js
import winston from "winston";

const logger = winston.createLogger({
  level: "info",                       // log "info" and above
  format: winston.format.combine(
    winston.format.timestamp(),        // add a timestamp to every entry
    winston.format.json()              // output as structured JSON
  ),
  transports: [
    // Write all logs to combined.log
    new winston.transports.File({ filename: "logs/combined.log" }),

    // Write only error-level logs to error.log
    new winston.transports.File({ filename: "logs/error.log", level: "error" }),
  ],
});

// In development, also print to the terminal in a readable format
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),     // color by level
        winston.format.simple()        // readable format for terminal
      ),
    })
  );
}

export default logger;
```

### What This Creates

```
your-project/
├── logs/
│   ├── combined.log    ← every log entry (info, warn, error)
│   └── error.log       ← only errors — easy to check when things break
├── utils/
│   └── logger.js       ← your logger setup
├── controllers/
├── routes/
└── server.js
```

> 💡 **Add `logs/` to your `.gitignore`** — log files should never be committed to your repository. They can be huge, they contain operational data, and they're environment-specific.

```bash
# .gitignore
node_modules/
logs/
.env
```

### Using Winston in Your Code

Replace `console.log` and `console.error` with your logger:

```js
// controllers/usersController.js
import logger from "../utils/logger.js";
import { sendSuccess, sendError } from "../utils/response.js";
import * as userService from "../services/usersService.js";

export const getUserById = async (req, res, next) => {
  logger.info("Fetching user", { userId: req.params.id });

  try {
    const user = await userService.getById(req.params.id);

    if (!user) {
      logger.warn("User not found", { userId: req.params.id });
      return sendError(res, "User not found", 404);
    }

    logger.info("User retrieved successfully", { userId: user.id });
    sendSuccess(res, user, "User retrieved successfully");

  } catch (err) {
    logger.error("Failed to fetch user", {
      userId: req.params.id,
      error: err.message,
    });
    next(err);
  }
};
```

**What each log entry looks like in the file:**

```json
{"level":"info","message":"Fetching user","userId":"42","timestamp":"2024-01-15T14:23:01.000Z"}
{"level":"warn","message":"User not found","userId":"99","timestamp":"2024-01-15T14:23:01.008Z"}
{"level":"error","message":"Failed to fetch user","userId":"42","error":"Connection refused","timestamp":"2024-01-15T14:23:05.012Z"}
```

Each entry is a single line of JSON — structured, searchable, and timestamped.

---

## What to Log — and What Never to Log

Knowing *what* to include in a log entry is just as important as knowing how to write one.

### Good Things to Log

```
✅ What happened      →  "User created", "Password reset requested"
✅ Relevant IDs       →  userId, orderId, requestId
✅ Timing             →  how long did a database call take?
✅ HTTP context       →  method, route, status code (Morgan handles this)
✅ Error messages     →  err.message (not the full stack trace in production)
✅ Warnings           →  unexpected inputs, fallback behavior triggered
```

### Never Log These

```
❌ Passwords          →  never, ever, under any circumstances
❌ Auth tokens        →  JWTs, API keys, session tokens
❌ Full request body  →  it might contain a password field
❌ Credit card data   →  or any payment information
❌ Personal data      →  emails and names sparingly; full profiles never
```

> ⚠️ **This is a security requirement, not a suggestion.** Log files are often stored and accessed by multiple people and systems. Sensitive data in logs is a common source of security breaches. Build the habit of never logging anything you wouldn't want exposed.

A practical rule: **log IDs, not values**. Log `userId: 42`, not `email: alice@example.com`. Log `"Password reset requested"`, not the password itself.

## Putting Morgan and Winston Together

Here's how both tools fit into your project at once:

```js
// server.js
import express from "express";
import morgan from "morgan";
import logger from "./utils/logger.js";

const app = express();

app.use(express.json());

// Morgan logs every HTTP request — feeds into Winston in production
app.use(morgan("dev"));

// Your routes
import userRoutes from "./routes/users.js";
app.use("/api/v1/users", userRoutes);

// Global error handler — log all unhandled errors
app.use((err, req, res, next) => {
  logger.error("Unhandled error", {
    message: err.message,
    method: req.method,
    path: req.path,
  });
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(3000, () => {
  logger.info("Server started", { port: 3000, env: process.env.NODE_ENV });
});
```

**What you get from this setup:**

```
Terminal output (development):
────────────────────────────────────────────────
info:  Server started { port: 3000, env: 'development' }
GET /api/users 200 12ms          ← Morgan
info:  Fetching user { userId: '1' }    ← Winston
info:  User retrieved successfully { userId: 1 }

logs/combined.log (persisted):
────────────────────────────────────────────────
{"level":"info","message":"Server started","port":3000,"timestamp":"..."}
{"level":"info","message":"Fetching user","userId":"1","timestamp":"..."}
{"level":"info","message":"User retrieved successfully","userId":1,"timestamp":"..."}

logs/error.log (only when things go wrong):
────────────────────────────────────────────────
{"level":"error","message":"Failed to fetch user","error":"...","timestamp":"..."}
```

## Reading Your Log Files

Once logs are writing to files, you need to be able to read them. A few useful terminal commands:

```bash
# See the last 20 lines of your combined log
tail -n 20 logs/combined.log

# Watch new log entries appear in real time (great for debugging)
tail -f logs/combined.log

# See only errors
cat logs/error.log

# Search for a specific user ID across all logs
grep "userId.*42" logs/combined.log

# Search for all errors
grep "\"level\":\"error\"" logs/combined.log
```

> 💡 **`tail -f`** is particularly useful during development — open a second terminal, run `tail -f logs/combined.log`, and you'll see log entries appear in real time as requests come in.

## Development vs. Production Logging

Your logging needs are different depending on where your app is running:

| | Development | Production |
|--|-------------|------------|
| **Terminal output** | ✅ Yes — readable, colorized | ❌ No terminal to watch |
| **Log files** | Optional | ✅ Essential |
| **Log level** | `debug` or `info` | `warn` or `error` only |
| **Format** | Human-readable | JSON (structured, searchable) |
| **Sensitive data** | Still never | Still never |

The Winston setup from earlier handles this automatically — it checks `process.env.NODE_ENV` and only adds the terminal output in development.

Set your environment in a `.env` file:

```bash
# .env
NODE_ENV=development   # local
NODE_ENV=production    # deployed server
```

---

## Common Logging Mistakes

| Mistake | Why It's a Problem | What to Do Instead |
|---------|-------------------|-------------------|
| Only using `console.log` | Logs disappear on restart, no file output | Use Winston with file transports |
| Logging passwords or tokens | Security breach risk | Log IDs only, never sensitive values |
| Logging everything at `error` level | Noise makes real errors hard to spot | Use the right level for the severity |
| Never checking log files | Logs are useless if nobody reads them | Check `error.log` regularly during development |
| Committing log files to git | Large files, sensitive data in your repo | Add `logs/` to `.gitignore` |
| Vague log messages | "Error occurred" tells you nothing | Include what happened and relevant IDs |

## Summary

```
┌──────────────────────────────────────────────────────────────┐
│  Your Logging Stack                                          │
│                                                              │
│  Morgan   →  automatic HTTP request logs (one setup line)    │
│  Winston  →  structured app logs with levels + file output   │
│                                                              │
│  Log levels:                                                 │
│    debug  →  dev only, very detailed                         │
│    info   →  normal operations                               │
│    warn   →  unexpected but not broken                       │
│    error  →  something failed, needs attention               │
│                                                              │
│  Always write to:                                            │
│    logs/combined.log  →  everything                          │
│    logs/error.log     →  errors only                         │
│                                                              │
│  Never log:                                                  │
│    passwords, tokens, full request bodies, payment data      │
└──────────────────────────────────────────────────────────────┘
```

| Tool | Install | One-liner |
|------|---------|-----------|
| Morgan | `npm install morgan` | `app.use(morgan('dev'))` |
| Winston | `npm install winston` | See `utils/logger.js` setup above |

Good logging turns your API from a black box into something you can actually observe and understand — both while you're building it and after it's deployed.

---

### Next Topics to Explore

#### 🔐 [API Security](4-api-security.md)  
Understand how to protect your backend using validation, authentication, environment variables, and other techniques that prevent common security vulnerabilities.

#### 🐘 [Using PostgreSQL](5-postgres-setup.md)  
Learn how relational databases work using PostgreSQL, including tables, rows, relationships, and how SQL queries interact with structured data.

#### 🔗 [Connecting APIs to PostgreSQL](6-postgres-service.md)  
Connect your Node.js REST API to a PostgreSQL database and learn how backend services run SQL queries to store and retrieve application data.

#### 🍃 [Using MongoDB](7-mongodb-setup.md)  
Understand how document databases work using MongoDB, including collections, documents, fields, and how data can be stored in flexible JSON-like structures.

#### 🔌 [Connecting APIs to MongoDB](8-mongodb-service.md)  
Learn how to connect your API to MongoDB and use tools like Mongoose to create models, run queries, and manage application data.

#### 🚀 [Deployment](9-deployment.md)  
Learn how to deploy your REST API to the cloud with a live database, including environment configuration, hosting platforms, and making your backend accessible in production.