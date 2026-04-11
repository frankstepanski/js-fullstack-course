# Testing & Debugging Your API

You've built a working Express API with solid architecture and good design conventions. Now comes the part that separates a working API from a *reliable* one — proving it actually does what you think it does, and being able to fix it confidently when it doesn't.

This doc covers both sides of that process: **testing** (checking that your routes behave correctly) and **debugging** (figuring out why they don't). The two are tightly connected — you'll move between them constantly as you build.

---

## Testing vs. Debugging — What's the Difference?

These two things often get lumped together, but they have different jobs:

| | Testing | Debugging |
|---|---|---|
| **What it asks** | "Does this work correctly?" | "Why isn't this working?" |
| **When you do it** | After writing or changing a route | When a test reveals something wrong |
| **Tools** | Browser, curl, Postman, frontend | Terminal logs, stack traces, Node inspector |
| **Output** | Pass or fail | A root cause and a fix |

They work together in a continuous loop:

```
┌─────────────────────────────────────────────────────┐
│                                                     │
│   Write/update route  →  Test it  →  Does it work?  │
│                                ↓              ↓     │
│                              Debug          Move on │
│                                ↓                    │
│                         Fix → Retest                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

The goal isn't to test once at the end — it's to test **after every small change**, so you're always fixing one thing at a time.

---

## The Big Picture — Your Testing Toolkit

There are four main ways to test an API. Each has a different tradeoff between speed and completeness:

```
Speed ◄────────────────────────────────────► Completeness

  Browser       curl        Postman       Frontend App
    │              │            │               │
  Fastest       Fast        Balanced        Slowest
  GET only    All methods  All methods    Full stack
  No setup    No setup     Some setup     Most setup
```

Pick the right tool for the moment — don't reach for a frontend when `curl` will answer your question in 10 seconds.

## 1. The Browser — Quick GET Checks

A browser can only **easily** send `GET` requests by typing a URL in the address bar. That's a significant limitation — but it's also the fastest possible check when you just need to know if your server is alive.

```
When to use it:
✅ "Is my server running?"
✅ "Is this GET route returning the right shape?"
✅ Zero-friction sanity check before anything else

When NOT to use it:
❌ POST, PUT, DELETE — the browser can't do those from the URL bar
❌ Sending request headers or a body
```

Open your browser and go to:
```
http://localhost:3000/api/users
```

If your route is set up correctly, you'll see JSON in the browser. If not, you'll see an error — which is already useful information.

> 💡 **Tip:** Install a browser extension like **JSON Formatter** (Chrome) or **JSONVue** (Firefox) to make raw JSON much easier to read in the browser.

## 2. curl — Fast Terminal Testing

`curl` is a command-line tool that sends HTTP requests directly. It supports all methods, headers, and request bodies — and it works without installing anything extra on most machines.

### Availability

| Platform | Status |
|----------|--------|
| macOS | ✅ Built-in — open Terminal and run `curl --version` |
| Windows 10 (v1803+) | ✅ Built-in — works in Command Prompt or PowerShell |
| Older Windows | ⚠️ Install manually from [curl.se](https://curl.se/download.html) or use Git Bash |

### The Four Methods

```bash
# 🟦 GET — fetch data
curl http://localhost:3000/api/users

# 🟨 POST — create something (send JSON body)
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice", "email": "alice@example.com"}'

# 🟩 PUT — update something
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Alice Updated"}'

# 🟥 DELETE — remove something
curl -X DELETE http://localhost:3000/api/users/1
```

**What the flags mean:**

| Flag | Purpose |
|------|---------|
| `-X` | HTTP method to use (`POST`, `PUT`, `DELETE`) |
| `-H` | Request header — tells the server what kind of data you're sending |
| `-d` | Request body — the data you're sending |

> 💡 **Tip:** Add `-i` to your curl command to see the response headers alongside the body. This is useful for checking status codes: `curl -i http://localhost:3000/api/users`

`curl` is the fastest way to test individual routes as you build them. No UI, no setup, instant feedback.

## 3. Postman — Visual API Testing

Postman is a dedicated API testing tool with a visual interface. It supports all HTTP methods, lets you save and organize requests, and makes it easy to inspect responses in detail.

### Desktop vs. Web

| Feature | Desktop App | Web Version |
|---------|-------------|-------------|
| Access `localhost` | ✅ Full access | ⚠️ Requires Postman Desktop Agent |
| Works offline | ✅ Yes | ❌ No |
| CORS restrictions | ❌ None | ⚠️ Agent required |
| Sync across devices | ✅ Yes | ✅ Yes |

**Recommendation:** Use the desktop app when testing a local API — it avoids the `localhost` access issues you'll hit with the web version.

### Sending Your First Request

```
1. Open Postman → click "+ New" → "Request"
2. Name it (e.g., "Get All Users") and save it to a Collection
3. Select your HTTP method from the dropdown (GET, POST, PUT, DELETE)
4. Enter your URL:  http://localhost:3000/api/users
5. For POST/PUT: click Body → raw → JSON and enter your payload
6. Click Send
```

**For POST and PUT requests**, your body tab should look like this:

```json
{
  "name": "Alice",
  "email": "alice@example.com"
}
```

And add this header:

| Header | Value |
|--------|-------|
| `Content-Type` | `application/json` |

### Reading the Response

Once you click Send, Postman shows you everything you need:

```
┌────────────────────────────────────────────────────┐
│  Response Panel                                    │
│                                                    │
│  Status:   200 OK  ← first thing to check          │
│  Time:     43ms                                    │
│  Size:     312 B                                   │
│                                                    │
│  Body  │  Headers  │  Console                      │
│  ──────────────────────────────                    │
│  {                                                 │
│    "data": [                                       │
│      { "id": 1, "name": "Alice" },                 │
│      { "id": 2, "name": "Bob" }                    │
│    ],                                              │
│    "count": 2                                      │
│  }                                                 │
└────────────────────────────────────────────────────┘
```

**Status code is your first signal** — before reading the body, the code tells you whether the request succeeded or failed. This is exactly why the consistent status codes covered in the API Design doc matter so much here.

### Saving and Organizing Requests

Postman lets you save requests into **Collections** — think of them as folders for your API routes.

```
📁 My API (Collection)
 ├── GET    /api/users          ← Get all users
 ├── GET    /api/users/:id      ← Get one user
 ├── POST   /api/users          ← Create user
 ├── PUT    /api/users/:id      ← Update user
 └── DELETE /api/users/:id      ← Delete user
```

> 💡 **Tip:** Mirror the structure of your routes in your Collection. When you add a new route, add the matching Postman request at the same time — future you will thank you.

### Why Postman Over curl?

| Situation | Better Tool |
|-----------|-------------|
| Quick one-off check during development | `curl` |
| Exploring a response in detail | Postman |
| Testing many routes in sequence | Postman |
| Sharing test scenarios with teammates | Postman |
| Scripting or automation | `curl` or Postman's test scripts |

## 4. The Frontend — End-to-End Validation

Testing your API through an actual frontend app is the most complete form of validation — but also the most time-consuming to set up.

You've already built React apps that call REST APIs, so this part should feel familiar. In a full-stack workflow, the frontend and backend are often built in parallel:

```
Backend dev  ──────────────────────────────────────────►
                 Route 1 ✅  Route 2 ✅  Route 3 ✅

Frontend dev ──────────────────────────────────────────►
                            Integrating  Testing full stack
```

**In practice:** use `curl` and Postman while building individual routes. Bring in the frontend once the core routes are stable — it's the final check that everything works together, from database to UI.

## Debugging — Finding Out Why It Broke

Testing tells you *that* something is wrong. Debugging tells you *why*. Here's a systematic approach.

### The Debugging Mindset

When something doesn't work, resist the urge to change things randomly. Instead, follow this process:

```
┌──────────────────────────────────────────────────────────┐
│  1. Reproduce it reliably                                │
│     → Can you make it fail on demand? Good. Now you      │
│       have something to work with.                       │
│                                                          │
│  2. Read the error message carefully                     │
│     → The terminal output usually tells you exactly      │
│       what went wrong and where.                         │
│                                                          │
│  3. Narrow it down                                       │
│     → Is the problem in the route? Controller?           │
│       Service? Log at each layer until it breaks.        │
│                                                          │
│  4. Fix one thing at a time                              │
│     → Change one thing, retest. Don't shotgun fixes.     │
└──────────────────────────────────────────────────────────┘
```

---

### 1. Use Logs to Trace What's Happening

The simplest and most powerful debugging tool is `console.log()`. Place logs at key points to see what's actually happening inside your code — not what you think is happening.

```js
export const getUserById = async (req, res, next) => {
  console.log("➡️  Received request for user ID:", req.params.id);

  try {
    const user = await userService.getById(req.params.id);
    console.log("✅  User found:", user);

    if (!user) return sendError(res, "User not found", 404);
    sendSuccess(res, user, "User retrieved successfully");

  } catch (err) {
    console.error("❌  Error fetching user:", err.message);
    next(err);
  }
};
```

**Log at these key points:**

```
Request comes in  →  Route matched?  →  Controller reached?
       ↓                                        ↓
  log req.params                         log what service returns
  log req.body                           log before/after DB call
```

> 💡 **Use `console.error()` for failures** — it shows up in red in most terminals and makes it easier to spot problems in a wall of logs.

---

### 2. Reading a Stack Trace

When your server crashes or throws an error, Node prints a **stack trace**. These look intimidating but they follow a simple pattern:

```
Error: Cannot read properties of undefined (reading 'email')
    at getUserById (controllers/usersController.js:12:23)   ← your code: start here
    at Layer.handle [as handle_request] (express/lib/router/layer.js:95:5)
    at next (express/lib/router/route.js:137:13)
    at Route.dispatch (express/lib/router/route.js:112:3)
    ...
```

**How to read it:**

```
Line 1:    What went wrong  →  "Cannot read properties of undefined"
Line 2:    Where in YOUR code  →  usersController.js, line 12
Lines 3+:  Express internals  →  ignore these
```

Always start at **the first line that mentions your own file**. That's where the problem lives. The lines below it are Express's internal call stack — useful context, but rarely where you need to fix anything.

---

### 3. Keep Your Server Reloading Automatically

Node doesn't reload when you save changes — you have to restart it manually. During active development, this slows you down significantly.

**Install nodemon** to restart automatically on every save:

```bash
npm install -g nodemon
nodemon server.js
```

Or add it to your `package.json` scripts:

```json
{
  "scripts": {
    "dev": "nodemon server.js",
    "start": "node server.js"
  }
}
```

Then just run:
```bash
npm run dev
```

```
Without nodemon:  Edit → Save → Ctrl+C → node server.js → Test → Repeat
With nodemon:     Edit → Save → (auto-restart) → Test → Repeat
```

Use `npm run dev` during development. Use `npm start` in production.

---

### 4. Common Errors and How to Fix Them

| Error | What It Means | How to Fix |
|-------|---------------|------------|
| `EADDRINUSE: Address already in use` | Port 3000 is already occupied | Run `lsof -i :3000` (macOS/Linux) to find the process, then kill it — or change your port |
| `SyntaxError: Unexpected token` | Invalid JSON in a request body or a typo in your code | Check your JSON formatting — every key needs quotes, no trailing commas |
| `Cannot read properties of undefined` | You're trying to access a property on something that doesn't exist | Log the variable just before the error to see what it actually contains |
| `404 on a route you just added` | Route isn't registered, or there's a path mismatch | Check that the router is mounted in `server.js` and that the path matches exactly |
| `CORS error` | Browser blocked your frontend from calling your API | Add the `cors` middleware to your Express app |
| `ECONNREFUSED` | Nothing is running on that port | Make sure your server is actually started |
| `500 Internal Server Error` | Your code threw an unhandled exception | Check your terminal — the stack trace will be there |

---

### 5. Debugging a 500 Error — Step by Step

A `500` is the most common error you'll encounter, and the most important to trace correctly. The client only sees "Internal Server Error" — but your terminal has the full story.

```
Client receives:          Server terminal shows:
┌──────────────┐          ┌─────────────────────────────────────┐
│   500        │          │ Error: users.find is not a function │
│   Internal   │    ←──── │   at getUserById (controller:8:22)  │
│   Server     │          │   at Layer.handle (express...)      │
│   Error      │          └─────────────────────────────────────┘
└──────────────┘
```

**Process:**

```
1. Look at your terminal  →  Find the stack trace
2. Spot your file/line    →  e.g., "controller.js:8"
3. Open that file         →  Read line 8 and the lines around it
4. Add a console.log      →  Log the variables involved
5. Retest                 →  Does the log reveal the problem?
6. Fix and retest
```

> 💡 **Never expose stack traces to the client in production.** Your error middleware should catch all unhandled errors and return a clean `{ error: "Something went wrong" }` — the details stay in your server logs.

---

## Putting It All Together — A Testing Workflow

Here's what good testing and debugging looks like in practice as you build a new route:

```
┌─────────────────────────────────────────────────────────────┐
│  Adding a new route: POST /api/users                        │
│                                                             │
│  1. Write the route, controller, and service                │
│  2. Open Postman → POST → localhost:3000/api/users          │
│  3. Send with a valid body → expect 201 Created             │
│  4. Send with a missing field → expect 400 Bad Request      │
│  5. Send with a duplicate email → expect 409 Conflict       │
│  6. If any step returns wrong result → check terminal logs  │
│  7. Fix → retest that step → continue                       │
└─────────────────────────────────────────────────────────────┘
```

Test the **happy path** first (valid input, expected success), then test the **edge cases** (missing fields, bad data, duplicate records). Both matter — your API will encounter both in real use.

---

## Summary

| Tool | Best For | Limitations |
|------|----------|-------------|
| **Browser** | Quick GET checks, zero setup | GET only |
| **curl** | Fast terminal testing of any method | No saved requests, text-only |
| **Postman** | Organized, visual testing of all routes | Slight setup overhead |
| **Frontend** | Full end-to-end validation | Slowest to set up |

| Debugging Tool | Best For |
|----------------|----------|
| `console.log()` | Tracing data flow through your code |
| Stack traces | Finding exactly where an error originated |
| nodemon | Faster iteration — no manual restarts |
| Postman response panel | Inspecting status codes, headers, and body together |

```
The golden rule: test after every small change.
It's far easier to debug one broken route than six.
```

---

### Next Topics to Explore

#### 📋 [Server Logging](3-server-logging.md)  
Understand how to record what your API is doing using Morgan and Winston — including writing permanent log files, log levels, and what never to log.

#### 🔐 [API Security](4-api-security.md)  
Understand how to protect your backend using validation, authentication, environment variables, and other techniques that prevent common security vulnerabilities.

#### 🐘 [Using PostgreSQL](5-postgres.md)  
Learn how relational databases work using PostgreSQL, including tables, rows, relationships, and how SQL queries interact with structured data.

#### 🔗 [Connecting APIs to PostgreSQL](6-postgres-service.md)  
Connect your Node.js REST API to a PostgreSQL database and learn how backend services run SQL queries to store and retrieve application data.

#### 🍃 [Using MongoDB](7-mongodb.md)  
Understand how document databases work using MongoDB, including collections, documents, fields, and how data can be stored in flexible JSON-like structures.

#### 🔌 [Connecting APIs to MongoDB](8-mongodb-service.md)  
Learn how to connect your API to MongoDB and use tools like Mongoose to create models, run queries, and manage application data.