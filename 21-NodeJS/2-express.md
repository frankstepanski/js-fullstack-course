# Introduction to Express.js

When you were building servers directly with Node's `http` module, you probably noticed a few pain points:
- You had to manually check the request method (`GET`, `POST`, etc.).  
- You needed to parse JSON by hand.  
- You had to handle routes with a lot of `if` and `else` statements.  
- You repeated code for headers and status responses.  

That's fine for learning, but it gets messy fast.  
This is exactly why **Express.js** was created — to take all those low-level details and give you a **clean, readable way** to build APIs.

Under the hood, Express still uses Node's `http` module — it just **wraps it with helpful features**:

- A **routing system** that matches URLs like `/api/users` or `/api/posts`.  
- Built-in tools to **parse JSON** and handle request bodies automatically.  
- A **middleware system** that lets you add features like authentication, logging, or error handling — one small piece at a time.  
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

## Routing, Middleware, Static Files, and Error Handling

Now that you've set up your first Express server, it's time to dive deeper into the features that make Express powerful and beginner-friendly.  


### Express Routing 

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

### Middleware — The Heart of Express

Middleware is one of the most important concepts in Express — it's what makes it flexible, powerful, and easy to extend.  
Think of middleware as **the behind-the-scenes helpers** that process incoming requests before your routes send a response.

When your frontend app sends a request, that request travels to your Express server.  
Before the server decides **how to respond**, Express can run several **middleware functions**.  

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

### Visualizing Middleware Flow

```
Frontend Request → express.json() → logRequest → checkAuth → routeHandler → Response Sent
```

Each arrow is a middleware layer — Express processes them **in order**.  
If one fails or doesn't call `next()`, the chain stops.

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

### Serving Static Files - HTML, CSS and Images

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


---

### Error Handling in Express

Even well-written APIs need to handle things that go wrong — like missing data or broken routes.

### Example: 404 and Server Errors

```js
import express from "express";
const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// 404 Handler (Not Found)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error Handler (Server Errors)
app.use((err, req, res, next) => {
  console.error("❌ Error:", err.stack);
  res.status(500).json({ error: "Something went wrong" });
});

app.listen(3000, () => console.log("🚀 API running on http://localhost:3000"));
```

### How Error Handling Works
- The **404 handler** catches any request that didn't match a route.  
- The **error handler** catches thrown errors and prevents the app from crashing.  
- Express knows it's an error handler when your function has **four parameters**: `(err, req, res, next)`.

### ✅ Summary

You've now learned the four most essential parts of Express:

| Concept | What It Does |
|----------|---------------|
| **Routing** | Defines which code runs for each URL and method |
| **Middleware** | Adds extra functionality (logging, validation, auth) |
| **Static Files** | Lets Express serve HTML, CSS, JS, or images |
| **Error Handling** | Gracefully catches errors and prevents crashes |

Together, these make Express one of the most flexible and widely used Node.js frameworks.

Next, you'll learn how to organize routes into **separate files** using `express.Router()` and build more scalable project structures.
