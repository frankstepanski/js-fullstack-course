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

> **Reminder:** The examples in this document use ES Module syntax (`import`). Make sure your `package.json` includes `"type": "module"` — otherwise Node will throw a syntax error when it sees `import`.

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

> 💡 You'll notice `app.use(express.json())` near the top. Don't worry about what that means just yet — we'll cover it fully in the **Middleware** section below. For now, just know it's the one line that tells Express to automatically read JSON data sent from the frontend, replacing the manual `req.on("data")` chunk-reading you did in plain Node.

## Converting Your Node Server to Express

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

## Middleware — The Heart of Express

Here's the most important thing to understand about Express, and it's something a lot of beginners miss:

>** ⚠️ Everything in Express is middleware.**

Not just the `app.use()` calls at the top of your file. Not just the auth checks and JSON parsers. Everything. Your routes are middleware. Your error handler is middleware. `express.json()` is middleware. `express.static()` is middleware. When you later learn about routers and controllers, those are built on middleware too.

Express is not a framework with "middleware" as one feature among many. Express *is* a middleware chain, and every single thing you add to your app is a link in that chain. Once this clicks, everything else about Express makes complete sense — why order matters, why `next()` exists, why error handlers look different, why you can stack functions onto a single route.

So before we look at the different *types* of middleware, let's make sure the core idea is solid.

---

### What Is Middleware?

A middleware function is just a function that receives three things:

- **`req`** — the incoming request (what the client sent)
- **`res`** — the response (what you'll send back)
- **`next`** — a function that passes control to the next middleware in the chain

```js
function myMiddleware(req, res, next) {
  // do something
  next(); // hand off to whatever comes next
}
```

That's it. That's the whole pattern. Every piece of an Express app — from a JSON parser to a route handler to an error catcher — is a function with this shape.

When a request comes in, Express runs each middleware function in the order you registered them, top to bottom, passing `req` and `res` along the whole way. Each function decides one of three things:

**1. Call `next()` — keep going**

Do your work and hand off to the next middleware in the chain.

```js
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`); // log the request
  next(); // keep going
});
```

**2. Send a response — stop the chain**

If you send a response, the chain ends here. Nothing below this runs.

```js
app.use((req, res, next) => {
  const isLoggedIn = false;
  if (!isLoggedIn) {
    return res.status(401).json({ error: "Not authorized" }); // stop here
  }
  next(); // only reaches here if logged in
});
```

Note the `return` before `res.status(...)` — this is important. It prevents the function from continuing and accidentally calling `next()` after already sending a response.

**3. Call `next(err)` — jump to the error handler**

If something goes wrong, pass an error object to `next()`. Express skips all remaining regular middleware and jumps straight to your error handler.

```js
app.use((req, res, next) => {
  try {
    doSomethingRisky();
    next();
  } catch (err) {
    next(err); // skip everything else, go to the error handler
  }
});
```

#### ⚠️ Common `next()` Mistakes

| Mistake | What Happens | Fix |
|--------|--------------|-----|
| Forgetting to call `next()` | Request hangs forever — the browser never gets a response | Always call `next()` or send a response |
| Calling `next()` after `res.json()` | Causes a "headers already sent" error — you already ended the response | Use `return res.json(...)` to stop execution |
| Calling `next()` instead of `next(err)` | Your error gets swallowed — Express treats it as a normal continuation | Pass the error object: `next(err)` |

---

### Routes Are Middleware Too

This is the part that surprises most beginners. When you write a route like this:

```js
app.get("/api/users", (req, res) => {
  res.json([{ id: 1, name: "Alice" }]);
});
```

That is middleware. It receives `req` and `res`, it sends a response, and it stops the chain. The only difference between this and any other middleware is that it only runs when the method is `GET` and the URL matches `/api/users`. It's middleware with a filter on it.

You can make this explicit by thinking of `app.get()` as shorthand for:

```js
// These two are conceptually the same thing
app.use((req, res, next) => {
  if (req.method === "GET" && req.url === "/api/users") {
    res.json([{ id: 1, name: "Alice" }]);
  } else {
    next(); // not our route — pass it along
  }
});
```

Express just gives you the cleaner `app.get()` syntax so you don't have to write that manually every time. Under the hood, it's the same chain.

This also means you can stack multiple middleware functions onto a single route — they all run in order before the final response:

```js
function checkAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "No token" });
  next(); // token exists, keep going
}

function logRequest(req, res, next) {
  console.log("Profile accessed");
  next();
}

// checkAuth runs, then logRequest, then the final handler
app.get("/api/profile", checkAuth, logRequest, (req, res) => {
  res.json({ message: "Your profile data" });
});
```

Each function in that list is a middleware. They all share the same `req` and `res` objects and pass control along with `next()`.

---

### Visualizing the Chain

Every request to your Express server travels down the same chain. Every function it passes through — parser, logger, auth check, route handler, error handler — is a middleware function. The only difference between them is *what they do* and *when they stop*.

```
                        INCOMING REQUEST
                              │
                              ▼
                    ┌─────────────────────┐
                    │   express.json()    │  built-in middleware
                    │                     │  parses the JSON body
                    └──────────┬──────────┘
                               │ next()
                               ▼
                    ┌─────────────────────┐
                    │   morgan() logger   │  third-party middleware
                    │                     │  logs method + URL
                    └──────────┬──────────┘
                               │ next()
                               ▼
                    ┌─────────────────────┐
                    │   checkAuth()       │  custom middleware
                    │                     │  is user logged in?
                    └──────────┬──────────┘
                               │                    ╔══════════════════╗
                    if valid ──┤                    ║  if NOT valid:   ║
                               │                    ║  return res      ║
                               ▼                    ║  .status(401)    ║
                    ┌─────────────────────┐         ║  chain stops ✋  ║
                    │   app.get(...)      │         ╚══════════════════╝
                    │   route middleware  │
                    │   sends response    │
                    └──────────┬──────────┘
                               │                    ╔══════════════════╗
                    if ok ─────┤                    ║  if error:       ║
                               │                    ║  next(err) →     ║
                               ▼                    ║  jumps to error  ║
                    ┌─────────────────────┐         ║  handler below ↓ ║
                    │   res.json(data)    │         ╚══════════════════╝
                    │   RESPONSE SENT ✅  │
                    └─────────────────────┘

                        (only if next(err) called)
                               ▼
                    ┌─────────────────────┐
                    │   error handler     │  error-handling middleware
                    │   (err,req,res,next)│  4 params = error handler
                    └─────────────────────┘
```

Notice that every single box in that diagram is a middleware function. There's no special "route" layer or "Express core" layer — it's all the same chain.

---

### The Different Types of Middleware

Because everything is middleware, the "types" are really just descriptions of *what a middleware does* or *how it's registered* — not fundamentally different things.

#### 1. Built-in Middleware

These come with Express — no install needed. They handle the most common tasks:

```js
// Parses incoming JSON bodies — needed for POST and PUT requests
app.use(express.json());

// Parses URL-encoded form data (from HTML form submissions)
app.use(express.urlencoded({ extended: true }));

// Serves static files like HTML, CSS, images from a folder
app.use(express.static("public"));
```

Without `express.json()`, `req.body` is `undefined` — the JSON your frontend sends never gets parsed.

---

#### 2. Third-Party Middleware

These are npm packages written by the community that plug directly into your middleware chain. Install them, then use them exactly like any other middleware:

```bash
npm install morgan cors helmet
```

```js
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

// morgan: logs every request to the terminal — great for debugging
app.use(morgan("dev"));

// cors: allows your frontend (running on a different port) to call your API
app.use(cors());

// helmet: sets security-related HTTP headers automatically
app.use(helmet());
```

These are just functions. The `morgan("dev")` call returns a middleware function, and you pass it to `app.use()` just like you would with anything else.

| Package | What It Does | Why You Need It |
|---------|-------------|----------------|
| `morgan` | Logs every request | Debugging and monitoring |
| `cors` | Allows cross-origin requests | Frontend on a different port/domain can call your API |
| `helmet` | Adds security HTTP headers | Protects against common web vulnerabilities |
| `express-rate-limit` | Limits repeated requests | Prevents abuse and brute-force attacks |

---

#### 3. Custom Middleware

These are functions you write yourself. Anything you want to happen on every request — or a subset of requests — goes here:

```js
// Run on every single request
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Run only on requests starting with /api
app.use("/api", (req, res, next) => {
  console.log("API route hit");
  next();
});
```

You can also write named middleware functions and reuse them across multiple routes:

```js
function requireAuth(req, res, next) {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ error: "No token provided" });
  next();
}

// Attach to any route that needs it
app.get("/api/profile", requireAuth, (req, res) => {
  res.json({ message: "Your profile" });
});

app.delete("/api/account", requireAuth, (req, res) => {
  res.json({ message: "Account deleted" });
});
```

---

#### 4. Route Middleware (Routes)

As covered above — routes are just middleware with a method and URL filter. `app.get()`, `app.post()`, `app.put()`, `app.delete()` are all registering middleware functions that only run when the method and path match.

```js
// This is middleware. It just has a filter on it.
app.get("/api/users", (req, res) => {
  res.json([{ id: 1, name: "Alice" }]);
});

app.post("/api/users", (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: "Created", user: newUser });
});
```

---

#### 5. Router Middleware

When your app grows, you'll want to split your routes into separate files. `express.Router()` creates a mini middleware chain — a self-contained group of routes and middleware — that you mount onto the main app.

```js
// routes/users.js
import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.json([{ id: 1, name: "Alice" }]);
});

router.get("/:id", (req, res) => {
  res.json({ id: req.params.id, name: "Alice" });
});

export default router;
```

```js
// server.js
import usersRouter from "./routes/users.js";

// Mount the router — all its routes now live under /api/users
app.use("/api/users", usersRouter);
```

The router itself is middleware. Mounting it with `app.use()` plugs its entire mini-chain into the main chain. You'll cover this in depth in the next section.

---

#### 6. Error-Handling Middleware

Error handlers are middleware too — they just have a different signature. Express knows a function is an error handler because it has **four parameters** instead of three. The first parameter is the error object:

```js
// ✅ Four parameters — Express treats this as an error handler
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ error: err.message || "Something went wrong" });
});
```

You trigger it from anywhere in the chain by calling `next(err)`:

```js
app.get("/api/users/:id", (req, res, next) => {
  const user = getUserById(req.params.id);
  if (!user) {
    const err = new Error("User not found");
    err.status = 404;
    return next(err); // jump to the error handler
  }
  res.json(user);
});
```

Error handlers always go at the very bottom of your file — after all routes and other middleware — because Express only reaches them when `next(err)` is called from somewhere above.

---

### Putting It All Together

Here's a complete Express server that uses every type of middleware, in a typical real-world order:

```js
import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

// 1. Built-in middleware — runs first, on every request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Third-party middleware
app.use(morgan("dev"));  // logs requests
app.use(cors());         // allows frontend to call this API

// 3. Custom middleware — runs on every request
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString(); // attach data to req for later use
  next();
});

// 4. Route middleware — only runs when method + URL match
app.get("/api/users", (req, res) => {
  res.json({ users: [], requestedAt: req.requestTime });
});

app.post("/api/users", (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: "User created", user: newUser });
});

// 5. 404 handler — runs if no route above matched
app.use((req, res) => {
  res.status(404).json({ error: `Cannot ${req.method} ${req.url}` });
});

// 6. Error handler — runs only if next(err) was called somewhere above
app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(err.status || 500).json({ error: err.message || "Server error" });
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
```

Notice the pattern: every single line that starts with `app.use()` or `app.get()` or `app.post()` is registering a middleware function. The JSON parser, the logger, the CORS handler, the routes, the 404 catcher, the error handler — they're all the same thing. They all live on the same chain. They all follow the same three rules: call `next()`, send a response, or call `next(err)`.

That's the whole mental model. Everything else in Express is just a variation of this.

## Routing

Now that you understand middleware, routing is easy to reason about — because routes are just middleware that only runs for a specific URL and HTTP method.

Routing is how Express decides *which code to run* based on the request's **URL** and **HTTP method** (`GET`, `POST`, etc.).

### Basic Routing Examples

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

> 💡 Notice that `req.params.id` and `req.query` are now available automatically — in the previous document, you had to extract these manually using `split("/")` and `parse()`. Express handles all of that parsing for you behind the scenes. The `:id` syntax in the route definition is Express's way of saying "whatever value appears here, make it available as `req.params.id`."

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

In development, React runs its own server (`npm run dev`).  
But when you deploy, React becomes a folder of static files — HTML, JS, and CSS — that Express can serve.

> **Build folder names:** If you used **Create React App**, the build output goes into `build/`. If you used **Vite** (which this bootcamp uses), it goes into `dist/`. Use whichever matches your setup.

> **⚠️ `__dirname` and ES Modules:** When using `"type": "module"`, Node's `__dirname` is not available — it only exists in CommonJS. You need to recreate it using `import.meta.url`. The example below shows how.

```js
import path from "path";
import { fileURLToPath } from "url";
import express from "express";

// Recreate __dirname for ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();

// Serve the Vite build output (use "client/build" for Create React App)
app.use(express.static(path.join(__dirname, "client", "dist")));

// For any route not matched by the API, send back the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
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

A few things to note here:
- **`err.stack`** is a built-in property of JavaScript `Error` objects. It's a multi-line string showing the full call stack — which file, which function, and which line the error originated from. It's very useful for debugging in the terminal, but you should never send it to the client (it leaks internal details about your server).
- **`err.status || 500`** means you can attach a custom status code to the error when you create it (`err.status = 404`), and the handler will use it. If no status was set, it defaults to `500` (Internal Server Error).
- **`err.message || "Something went wrong"`** uses the error's message if it has one, otherwise falls back to a generic string.

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
- The **error handler** requires exactly four parameters `(err, req, res, next)` — miss one and Express treats it as regular middleware.
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
