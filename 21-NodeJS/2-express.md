# Introduction to Express.js

When you were building servers directly with Node's `http` module, you probably noticed a few pain points:
- You had to manually check the request method (`GET`, `POST`, etc.).  
- You needed to parse JSON by hand.  
- You had to handle routes with a lot of `if` and `else` statements.  
- You repeated code for headers and status responses.  

That's fine for learning, but it gets messy fast.  
This is exactly why **Express.js** was created — to take all those low-level details and give you a **clean, readable way** to build APIs.

Under the hood, Express still uses Node's `http` module — it just **wraps it with helpful features**:

- A **powerful middleware system** that everything else is built on — authentication, logging, error handling, and more, added one small piece at a time.  
- A **routing system** that matches URLs like `/api/users` or `/api/posts`.  
- Built-in tools to **parse JSON** and handle request bodies automatically.  
- Easy ways to send responses, set status codes, or return JSON.  

So instead of writing 20 lines of logic for a single endpoint, you can do it in 3–4 lines using Express.

- Instead of worrying *how* to send JSON, you just call `res.json()`.  
- Instead of parsing request data manually, Express handles it for you.  
- Instead of chaining `if` statements for routes, you just write `app.get()` or `app.post()`.  

Express doesn't replace Node — it **runs on top of it**.  
You still use JavaScript, you still rely on the event loop, and you still handle requests and responses — but with **much cleaner syntax**.


## Installing and Using Express

To use Express in your project:

```bash
npm install express
```

Then create a simple server:

```js
// server.js
import express from "express";

const app = express();

// Middleware to parse JSON data automatically
app.use(express.json());

// Routes
app.get("/api/users", (req, res) => {
  res.json([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);
});

app.post("/api/users", (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: "User created", user: newUser });
});

// Start the server
app.listen(3000, () => console.log("🚀 Express server running on http://localhost:3000"));
```

That's it — no need for `createServer`, manual header setting, or body parsing!

##  Converting Your Node Server to Express

Here's a direct comparison between your previous Node HTTP server and its Express version:

### Before (Plain Node)

```js
import http from "http";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/api/users") {
    res.writeHead(200);
    res.end(JSON.stringify([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]));
  } else if (req.method === "POST" && req.url === "/api/users") {
    let body = "";
    req.on("data", chunk => (body += chunk.toString()));
    req.on("end", () => {
      const newUser = JSON.parse(body);
      res.writeHead(201);
      res.end(JSON.stringify({ message: "User created", user: newUser }));
    });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(3000, () => console.log("✅ Node server running on http://localhost:3000"));
```

### After (Using Express)

```js
import express from "express";

const app = express();
app.use(express.json());

app.get("/api/users", (req, res) => {
  res.json([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);
});

app.post("/api/users", (req, res) => {
  res.status(201).json({ message: "User created", user: req.body });
});

app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

app.listen(3000, () => console.log("🚀 Express server running on http://localhost:3000"));
```


| Task | In Plain Node | In Express |
|------|----------------|-------------|
| Create server | `http.createServer(...)` | `express()` |
| Check method and URL manually | `if (req.method === "GET" && req.url === "/api/users")` | `app.get("/api/users", ...)` |
| Parse JSON body manually | `req.on("data")`, `JSON.parse()` | `app.use(express.json())` |
| Send JSON response | `res.writeHead(200)` + `res.end(JSON.stringify(...))` | `res.json(...)` |
| Handle 404 errors | Custom logic | Built-in middleware or easily added |

Express simplifies all the repetitive steps so you can focus on **what your API should do**, not the plumbing.

> ⚠️ **Browsers can only send GET requests.** You can test the GET routes above by visiting the URL directly in your browser, but to test POST, PUT, or DELETE routes you'll need a tool like **Postman**, **Insomnia**, or the **Thunder Client** extension in VS Code. We'll do a full deep dive into testing and working with these tools when we cover REST APIs and Express in detail later.

---

## Middleware — The Heart of Express

Before diving into routing, static files, or error handling, you need to understand **middleware** — because all of those features are built on top of it.

Middleware is one of the most important concepts in Express. It's what makes Express flexible, powerful, and easy to extend. Everything in your request-response cycle — parsing JSON, checking authentication, logging requests, catching errors — flows through middleware.

### What Is Middleware?

Think of middleware as **the behind-the-scenes helpers** that process incoming requests before your routes send a response.

When your frontend app sends a request, that request travels to your Express server. Before the server decides **how to respond**, Express can run several **middleware functions** in sequence.

Each middleware can:
- Look at the request data (like headers or JSON)
- Add or change something in the request
- Log it for debugging
- Stop it early (for example, if the user isn't logged in)
- Or pass it to the next piece of code

You can think of middleware as a **series of checkpoints** between the client and the final response.

```
Client (React fetch) → Middleware 1 → Middleware 2 → Route Handler → Response (to Client)
```

Each middleware runs one after another and decides whether to:
- Modify the request or response  
- Stop the process early (e.g., send an error)  
- Or call `next()` to continue to the next handler  

```js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next(); // continue to the next middleware or route
});
```

- `app.use()` → applies this function to *every* request.  
- `next()` → tells Express to move on. Without it, the request would hang forever!

---

### Understanding `next()` — The Handoff Function

`next()` is how one middleware passes control to the next one in the chain. It's easy to overlook, but it's the glue that holds the entire middleware system together.

Every middleware function receives three arguments — `req`, `res`, and `next` — and it's your job to decide what to do with them:

```js
app.use((req, res, next) => {
  // Do something with the request...
  next(); // ← hand off to the next middleware or route
});
```

There are three things you can do inside a middleware:

**1. Call `next()` to continue**  
The most common case. You've done your work (logging, parsing, checking something) and you want Express to keep going.

```js
app.use((req, res, next) => {
  console.log("Request received:", req.method, req.url);
  next(); // ✅ keep going
});
```

**2. Send a response to stop the chain**  
If something is wrong — like the user isn't authenticated — you can send a response immediately and never call `next()`. The chain stops here.

```js
app.use((req, res, next) => {
  const isLoggedIn = false;
  if (!isLoggedIn) {
    return res.status(401).json({ error: "Not authorized" }); // ✅ stop here
  }
  next();
});
```

Note the `return` before `res.status(...)`. This is important — it prevents the function from continuing and accidentally calling `next()` afterward.

**3. Call `next(err)` to pass an error**  
If something goes wrong inside your middleware, you can pass an error object to `next()`. Express will skip all remaining regular middleware and jump straight to your **error-handling middleware**.

```js
app.use((req, res, next) => {
  try {
    // something that might fail
    const data = JSON.parse(req.body);
    next();
  } catch (err) {
    next(err); // ✅ pass the error to the error handler
  }
});
```

This is why Express error handlers always have **four parameters** — `(err, req, res, next)` — the presence of `err` as the first argument is how Express knows this function is an error handler, not a regular middleware:

```js
// ✅ Error handler — four parameters, always placed last
app.use((err, req, res, next) => {
  console.error("Something went wrong:", err.message);
  res.status(500).json({ error: "Internal server error" });
});
```

#### ⚠️ Common `next()` Mistakes

| Mistake | What Happens | Fix |
|--------|--------------|-----|
| Forgetting to call `next()` | Request hangs forever — browser never gets a response | Always call `next()` or send a response |
| Calling `next()` after `res.json()` | Express tries to continue the chain after the response is already sent — causes a "headers already sent" error | Use `return res.json(...)` to stop execution |
| Calling `next()` instead of `next(err)` | Your error gets swallowed — Express treats it as a normal continuation | Pass the error object: `next(err)` |

---

### How `app.use()` vs Method-Specific Middleware Works

You've seen `app.use()` used for middleware, but you can also pass multiple functions directly into a route. Both approaches use the same middleware system under the hood.

**`app.use()` — runs for every request (or every request on a path)**

```js
// Runs for ALL requests
app.use(express.json());

// Runs for ALL requests starting with /api
app.use("/api", (req, res, next) => {
  console.log("API request received");
  next();
});
```

**Multiple callbacks on a single route**

You can pass middleware directly into a route as extra arguments. This is common for things like authentication checks that only apply to specific routes:

```js
function checkAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "No token" });
  next();
}

// checkAuth runs first, then the route handler
app.get("/api/profile", checkAuth, (req, res) => {
  res.json({ message: "Your profile data" });
});
```

This pattern is extremely common in real Express apps — you'll see it used for authentication, role checks, input validation, and more.

| Approach | When to Use |
|----------|-------------|
| `app.use(fn)` | Applies to every request — good for logging, JSON parsing, CORS |
| `app.use("/path", fn)` | Applies to all requests under a specific path |
| `app.get("/route", fn1, fn2)` | Applies only to one specific route — good for auth or validation |

---

### Types of Middleware

| Type | Description | Example |
|------|--------------|----------|
| **Application-Level** | Runs for all routes in your app | `app.use(express.json())` |
| **Router-Level** | Runs for specific groups of routes | `router.use('/api', checkAuth)` |
| **Built-In Middleware** | Comes with Express | `express.static()`, `express.json()` |
| **Third-Party Middleware** | Installed via npm | `cors`, `morgan`, `helmet` |
| **Custom Middleware** | Written by you | Logging, authentication, validation |
| **Error-Handling Middleware** | Catches errors passed via `next(err)` | `(err, req, res, next) => {}` — always 4 params, always last |

> ⚠️ **Third-party middleware are just npm packages** — installed with `npm install` and used exactly like any other middleware. Anyone can write one and publish it to npm.

---

### Middleware Stack in Action

Here's how multiple middleware pieces can work together:

```js
import express from "express";
const app = express();

// 1️⃣ Built-in middleware: parse JSON automatically
app.use(express.json());

// 2️⃣ Custom middleware: log every request
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// 3️⃣ Custom middleware: basic authentication check
app.use((req, res, next) => {
  const isLoggedIn = true; // just an example
  if (!isLoggedIn) return res.status(403).json({ error: "Not authorized" });
  next();
});

// 4️⃣ Final route handler
app.get("/api/data", (req, res) => {
  res.json({ message: "Success! Middleware chain complete." });
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
```

#### What Happens When `/api/data` Is Called:
1. Express reads the incoming request.  
2. It runs `express.json()` to parse the body (if there's one).  
3. It logs the request method and URL.  
4. It checks authentication.  
5. Finally, it reaches your route and sends the response.

That's the **middleware chain** in action.

---

### Visualizing the Middleware Chain

The diagram below shows exactly what happens to a request as it passes through a typical Express middleware stack — and what happens when something goes wrong at any step.

```
                        INCOMING REQUEST
                              │
                              ▼
                    ┌─────────────────────┐
                    │   express.json()    │  Parse JSON body
                    │  (built-in)         │
                    └──────────┬──────────┘
                               │ next()
                               ▼
                    ┌─────────────────────┐
                    │   Request Logger    │  Log method + URL
                    │  (custom)           │
                    └──────────┬──────────┘
                               │ next()
                               ▼
                    ┌─────────────────────┐
                    │   Auth Check        │  Is user logged in?
                    │  (custom)           │
                    └──────────┬──────────┘
                               │                    ╔══════════════════╗
                    if valid ──┤                    ║  if NOT valid:   ║
                               │                    ║  return res      ║
                               ▼                    ║  .status(401)    ║
                    ┌─────────────────────┐         ║  Chain STOPS ✋  ║
                    │   Route Handler     │         ╚══════════════════╝
                    │  app.get(...)       │
                    └──────────┬──────────┘
                               │                    ╔══════════════════╗
                    if ok ─────┤                    ║  if error:       ║
                               │                    ║  next(err) →     ║
                               ▼                    ║  jumps to error  ║
                    ┌─────────────────────┐         ║  handler below ↓ ║
                    │   res.json(data)    │         ╚══════════════════╝
                    │   RESPONSE SENT ✅  │
                    └─────────────────────┘

                               │ (only reached if next(err) was called)
                               ▼
                    ┌─────────────────────┐
                    │   Error Handler     │  (err, req, res, next)
                    │   Always LAST       │  4 params = error handler
                    └─────────────────────┘
```

Key things to notice in this diagram:
- Each box is a middleware function. Each one either calls `next()` to continue, sends a response to stop, or calls `next(err)` to jump to the error handler.
- The **auth check** short-circuits the chain if the user isn't valid — the route handler never runs.
- The **error handler** sits at the very bottom and only activates when something calls `next(err)`.
- Once a response is sent (`res.json()`), the chain is done — nothing below it runs.

---

### Common Middleware You'll Use Often

| Middleware | What It Does | Why It's Useful |
|-------------|--------------|----------------|
| `express.json()` | Parses incoming JSON data | Needed for POST/PUT requests |
| `cors()` | Enables cross-origin requests | Lets your frontend (on another port) call the API |
| `helmet()` | Adds security headers | Protects your app from common attacks |
| `morgan()` | Logs every request | Great for debugging during development |
| Custom validation | Checks data before saving | Prevents invalid or missing data |

---

## Routing

Now that you understand middleware, routing is easy to reason about — because routes are just middleware that only runs for a specific URL and HTTP method.

Routing is how Express decides *which code to run* based on the request's **URL** and **HTTP method** (`GET`, `POST`, etc.).

### Example:

```js
import express from "express";
const app = express();

app.get("/api/users", (req, res) => {
  res.json([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);
});

app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id; // route parameter
  res.json({ message: `You requested user ${userId}` });
});

app.get("/api/search", (req, res) => {
  const { q } = req.query; // query parameter
  res.json({ message: `You searched for: ${q}` });
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
```

#### What's Happening:
- `app.get("/api/users")` → runs for the exact path `/api/users`  
- `req.params.id` → captures dynamic parts of the URL (like `/api/users/5`)  
- `req.query` → reads query parameters from the URL (like `/api/search?q=react`)  

#### Tip:
Routes are matched **in order**, so always put more specific ones (like `/api/users/:id`) before generic ones.

---

### ⚠️ Why Route Order in Express Matters

In Express, **the order of your routes and middleware is critical** because Express processes them **top to bottom**, in the exact sequence they're written in your file.

When a request comes in, Express checks each route **one by one** until it finds the **first match** — then it stops.  
That means if a *generic* route like `/api/users` appears **before** a *specific* one like `/api/users/:id`, the generic one will always "catch" the request first.

### Example: Route Order in Action

```js
// ❌ WRONG ORDER
app.get("/api/users", (req, res) => {
  res.json({ message: "All users" });
});

app.get("/api/users/:id", (req, res) => {
  res.json({ message: `User ID: ${req.params.id}` });
});
```

If you visit `/api/users/5`,  
Express will **match `/api/users` first**, so it never reaches the `:id` route.

### ✅ Correct Order

```js
app.get("/api/users/:id", (req, res) => {
  res.json({ message: `User ID: ${req.params.id}` });
});

app.get("/api/users", (req, res) => {
  res.json({ message: "All users" });
});
```

Now, `/api/users/5` correctly matches the `:id` route,  
and `/api/users` still works for the full list.

---

### 💡 Key Takeaways

| Concept | Why It Matters |
|----------|----------------|
| **Top-to-Bottom Matching** | Express reads routes in the order you write them. |
| **First Match Wins** | Once a route matches, Express stops checking others. |
| **Specific Before Generic** | Always put routes like `/api/users/:id` before `/api/users`. |
| **Middleware Follows the Same Rule** | `app.use()` middleware runs in order too — top to bottom. |

---

## Serving Static Files — HTML, CSS, and Images

Express can serve static files — things like HTML, CSS, images, or even your **built React app** — directly to users. This is useful both for simple web pages and for deploying full-stack apps.

```js
import express from "express";
const app = express();

app.use(express.static("public")); // serve all files in the public folder

app.listen(3000, () => console.log("🌍 Static file server on http://localhost:3000"));
```

If your folder structure looks like this:

```
my-app/
├── public/
│   ├── index.html
│   ├── styles.css
│   └── script.js
└── server.js
```

Then visiting `http://localhost:3000/index.html` or even just `http://localhost:3000/` will automatically serve that file.

### Why This Is Useful (Even with React)

You might think you never need this if you use React, but static serving is still important in several real-world cases.

#### 1. Serving Your Built React App (Production)

In development, React runs its own server (`npm start`).  
But when you deploy, React becomes a folder of static files — HTML, JS, and CSS — that Express can serve.

Example:

```js
import path from "path";
import express from "express";
const app = express();

app.use(express.static("client/build"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});
```

This allows Express to serve both:
- Your React app (from `/`)
- Your API (from `/api/...`)

✅ Result: a single full-stack Node app that works without CORS issues.

#### 2. Serving Static Assets

Even if your frontend is hosted elsewhere, you might still need Express to serve:
- Images and icons  
- PDFs or other downloadable files  
- Uploaded files from users (e.g., profile pictures)

Example:

```js
app.use("/assets", express.static("uploads"));
```

Now files are accessible at:  
`http://localhost:3000/assets/filename.jpg`

#### 3. Hosting Simple Non-React Pages

Sometimes, you just need a small page — maybe an admin dashboard, documentation, or a "coming soon" screen.  
Instead of using React for that, you can drop an HTML file in `/public` and Express will handle it.

#### 4. Combining Frontend + API for a Full-Stack App

If your frontend and backend are in one project, serving the static frontend through Express:
- Keeps everything under one domain (no cross-origin problems)  
- Makes deployment simpler (just one app to run)


| Use Case | Why It's Useful |
|-----------|----------------|
| Serve built React app | Combines API + frontend into one deployment |
| Serve images/files | Provide static resources like uploads or icons |
| Serve small HTML pages | Simple landing pages or admin tools |
| Avoid CORS issues | One domain for both client and server |

#### TL;DR

- **In development:** React runs its own dev server — Express is only your API.  
- **In production:** Express serves your React build and API together.  
- **Other cases:** You can still use it for images, PDFs, or simple static pages.

So even if you're using React, Express's static file serving is a handy tool for deployment and flexibility.

## Error Handling in Express

Even well-written APIs need to handle things that go wrong — like missing data, invalid input, or broken routes. In Express, error handling is built on top of the same middleware system you already know. If you remember how `next(err)` works from the middleware section, this is where those errors land.

There are two specific middleware functions you need for a complete error handling setup: a **404 handler** and an **error handler**. Both go at the very bottom of your file, after all your routes — because Express processes middleware top to bottom, anything that reaches them didn't match anything above.

### The 404 Handler — Catching Unmatched Routes

A 404 handler is just a regular `app.use()` with no path, placed after all your routes. Because no route above it matched, Express falls through to this catch-all and sends back a not-found response.

```js
// Placed AFTER all your routes
app.use((req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.url}` });
});
```

Notice there's no `next()` call here — this is the end of the line. If the request reached this middleware, there's nothing left to try.

### The Error Handler — Catching `next(err)`

An error handler is middleware with **four parameters**: `(err, req, res, next)`. The presence of that first `err` argument is how Express knows this is an error handler and not a regular middleware function. It only activates when something earlier in the chain calls `next(err)`.

```js
// Error handler — always four parameters, always last
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(err.status || 500).json({ error: err.message || "Something went wrong" });
});
```

Using `err.status || 500` means you can attach a status code to the error object when you create it, and the handler will use it — otherwise it defaults to 500.

### Triggering the Error Handler from a Route

The key connection: inside any route or middleware, when something goes wrong, you pass the error to `next()`. Express skips all remaining regular middleware and jumps straight to the error handler.

```js
app.get("/api/users/:id", (req, res, next) => {
  const user = getUserById(req.params.id);

  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    return next(err); // ← jumps to the error handler
  }

  res.json(user);
});
```

This keeps your route logic clean — you don't need to write the same error response format in every single route. One error handler at the bottom handles them all.

### Handling Async Errors

By default, Express does not catch errors thrown inside `async` functions — you have to catch them yourself and pass them to `next`:

```js
// ❌ Express won't catch this — the server will crash
app.get("/api/data", async (req, res) => {
  const data = await fetchFromDatabase(); // if this throws, Express can't catch it
  res.json(data);
});

// ✅ Wrap in try/catch and pass to next(err)
app.get("/api/data", async (req, res, next) => {
  try {
    const data = await fetchFromDatabase();
    res.json(data);
  } catch (err) {
    next(err); // ← now Express catches it
  }
});
```

> ℹ️ **Express 4 vs Express 5:** Express 5 became the official default on npm in March 2025 and handles async errors automatically — no try/catch needed. However, a huge number of existing codebases, tutorials, and Stack Overflow answers are still written in Express 4, so you'll encounter this try/catch pattern constantly in the wild. It's worth knowing. The good news is that almost everything else in this document — routing, middleware, `res.json()`, `next(err)` — works identically in both versions. Async error handling is the main practical difference you'll notice as a beginner.

### Example: 404 and Server Errors

Here's a complete setup with routes and both error handlers in the correct order:

```js
import express from "express";
const app = express();
app.use(express.json());

// ✅ Regular routes go first
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

app.get("/api/users/:id", async (req, res, next) => {
  try {
    const user = await getUserById(req.params.id);
    if (!user) {
      const err = new Error("User not found");
      err.status = 404;
      return next(err);
    }
    res.json(user);
  } catch (err) {
    next(err);
  }
});

// ✅ 404 handler — after all routes, catches anything that didn't match
app.use((req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.url}` });
});

// ✅ Error handler — always last, always four parameters
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(err.status || 500).json({ error: err.message || "Something went wrong" });
});

app.listen(3000, () => console.log("🚀 API running on http://localhost:3000"));
```

### How It All Fits Together

```
                        INCOMING REQUEST
                              │
                              ▼
                    ┌─────────────────────┐
                    │   Regular Routes    │  app.get(), app.post(), etc.
                    │   & Middleware      │
                    └──────────┬──────────┘
                               │
                   ┌───────────┴────────────┐
                   │                        │
            route matched            no route matched
                   │                        │
                   ▼                        ▼
         ┌──────────────────┐    ┌──────────────────────┐
         │  Route Handler   │    │    404 Handler        │
         │  sends response  │    │  app.use((req, res)   │
         │  OR calls        │    │  => res.status(404))  │
         │  next(err) ──┐   │    └──────────────────────┘
         └──────────────┼───┘
                        │ next(err)
                        ▼
             ┌─────────────────────┐
             │    Error Handler    │  (err, req, res, next)
             │    Always LAST      │  only runs when next(err) called
             │    4 parameters     │
             └─────────────────────┘
```

### Common Errors and How to Handle Them

| Error | Status Code | When It Happens | How to Handle |
|-------|-------------|-----------------|---------------|
| Route not found | `404` | No route matched the URL | 404 catch-all middleware after all routes |
| Invalid JSON body | `400` | Client sends malformed JSON | `express.json()` throws automatically — catch with error handler |
| Missing required field | `400` | Client omits data your route expects | Check `req.body` in the route, call `next(err)` with status 400 |
| Resource not found | `404` | A DB lookup returns nothing | Create an error with `err.status = 404`, pass to `next(err)` |
| Not authorized | `401` | No token or invalid token | Return early in auth middleware with `res.status(401)` |
| Forbidden | `403` | Token valid but insufficient permissions | Return early with `res.status(403)` |
| Database error | `500` | DB query throws unexpectedly | Catch in try/catch, pass to `next(err)` |
| Unhandled async error | `500` | Async function throws without try/catch | Always wrap async routes in try/catch |

### How Error Handling Works — Key Rules

- The **404 handler** is a regular middleware with no path, placed after all routes. It runs when nothing above it matched.
- The **error handler** has exactly **four parameters** `(err, req, res, next)` — this is how Express identifies it. Miss one parameter and Express treats it as regular middleware.
- Both handlers must be **at the very bottom** of your file, after all routes and other middleware.
- Inside any route, call `next(err)` to trigger the error handler — never `throw` without catching it first.
- In Express 4 (still common in existing codebases), always wrap `async` route handlers in `try/catch` and pass errors to `next(err)`. In Express 5 this is handled automatically.

### ✅ Summary

You've now learned the four most essential parts of Express:

| Concept | What It Does |
|----------|---------------|
| **Middleware** | The foundation — processes every request before a response is sent |
| **Routing** | Defines which code runs for each URL and method |
| **Static Files** | Lets Express serve HTML, CSS, JS, or images |
| **Error Handling** | Gracefully catches errors and prevents crashes |

Together, these make Express one of the most flexible and widely used Node.js frameworks.

Next, you'll learn how to organize routes into **separate files** using `express.Router()` and build more scalable project structures.
