# API Design — Building APIs the Right Way

You've now built a working Express API with proper architecture — routers, controllers, services, and middleware all in the right places. The code is organized. But there's a second layer of quality that's just as important: **how your API looks and behaves to whoever is calling it**.

This is **API design** — the conventions and decisions that determine what your routes are named, what your responses look like, how errors are communicated, and how your API scales over time.

A well-designed API is predictable. A developer using your API (including future-you, and your frontend teammates) should be able to look at a route and immediately know what it does, what it expects, and what it returns — without having to read the source code.

This covers the industry conventions that professional teams follow, and explains *why* each one exists — not just what to do.

## The Big Picture — What Makes a Good API?

Before diving into specifics, here's what a well-designed API achieves:

| Goal | What It Means in Practice |
|------|--------------------------|
| **Predictable** | Every route follows the same naming and response patterns |
| **Consistent** | Errors always look the same, successes always look the same |
| **Self-describing** | A route like `GET /api/users/5` tells you exactly what it does |
| **Versioned** | Changes don't break existing clients |
| **Appropriately sized** | Responses return what's needed — not too much, not too little |

## 1. Route Naming Conventions

The URLs of your API are its public face. Good naming makes your API readable and intuitive.

### Use Nouns, Not Verbs

Your routes should describe **resources** (things), not **actions** (verbs). The HTTP method already describes the action.

```
❌ Bad — verbs in the URL
GET  /api/getUsers
POST /api/createUser
DELETE /api/deleteUser/1

✅ Good — nouns only, action comes from the method
GET    /api/users
POST   /api/users
DELETE /api/users/1
```

Think of it like this: the URL is *where* you're going, the HTTP method is *what you're doing* when you get there.

---

### Use Plural Nouns for Collections

Resources should be plural — even when you're asking for a single item.

```
✅ Correct
GET /api/users        → list of all users
GET /api/users/1      → one specific user
GET /api/products     → list of all products
GET /api/products/42  → one specific product

❌ Inconsistent — don't mix singular and plural
GET /api/user
GET /api/users/1
```

Keeping everything plural makes the pattern consistent and predictable.

---

### Nest Related Resources

When one resource belongs to another, reflect that relationship in the URL:

```
GET  /api/users/1/posts       → all posts written by user 1
GET  /api/users/1/posts/5     → post 5 written by user 1
POST /api/users/1/posts       → create a new post for user 1
```

Don't nest more than two levels deep — it gets hard to read quickly:

```
❌ Too deeply nested — hard to read and maintain
GET /api/users/1/posts/5/comments/3/likes
```

If you find yourself going deeper than two levels, consider flattening the URL and using query parameters instead.

---

### Route Naming Summary

| Pattern | Example | What It Represents |
|---------|---------|-------------------|
| `GET /api/resources` | `GET /api/users` | Get all items |
| `GET /api/resources/:id` | `GET /api/users/1` | Get one specific item |
| `POST /api/resources` | `POST /api/users` | Create a new item |
| `PUT /api/resources/:id` | `PUT /api/users/1` | Replace an item entirely |
| `PATCH /api/resources/:id` | `PATCH /api/users/1` | Update part of an item |
| `DELETE /api/resources/:id` | `DELETE /api/users/1` | Delete an item |
| `GET /api/resources/:id/children` | `GET /api/users/1/posts` | Get related sub-resources |

> 💡 **PUT vs PATCH:** `PUT` replaces the entire resource — you send all fields, even ones you aren't changing. `PATCH` updates only the fields you send. In practice, most APIs use `PUT` for simplicity unless partial updates are a specific requirement.

## 2. HTTP Methods — Used the Right Way

You already know what GET, POST, PUT, and DELETE do. Here's the full picture of how to use them correctly and consistently.

| Method | When to Use | Is It Safe? | Is It Idempotent? |
|--------|------------|-------------|------------------|
| `GET` | Read data — never modify anything | ✅ Yes | ✅ Yes |
| `POST` | Create a new resource | ❌ No | ❌ No |
| `PUT` | Replace a resource entirely | ❌ No | ✅ Yes |
| `PATCH` | Update part of a resource | ❌ No | ✅ Usually |
| `DELETE` | Remove a resource | ❌ No | ✅ Yes |

### Safe Methods

**Safe** means the request doesn't change anything on the server. `GET` requests should never create, update, or delete data — they should only read it. A safe request is one you could make a hundred times with zero consequences.

### Idempotent Methods

**Idempotent** is a fancy word for a simple idea: making the same request once or ten times produces the same result.

Think of a light switch with an "off" button — not a toggle, just an "off" button. Press it once, the light goes off. Press it five more times, the light is still off. The outcome is always the same no matter how many times you press it. That's idempotency.

```
IDEMPOTENT — same result no matter how many times you call it
══════════════════════════════════════════════════════════════

  DELETE /api/users/1

  First call:   user 1 exists → deleted → user is gone   ✅
  Second call:  user 1 is gone → still gone               ✅
  Third call:   user 1 is gone → still gone               ✅

  The end state is always the same: user 1 does not exist.


NOT IDEMPOTENT — each call creates something new
══════════════════════════════════════════════════════════════

  POST /api/users  { name: "Alice" }

  First call:   creates Alice with id 1   ✅
  Second call:  creates Alice with id 2   ⚠️ now there are two Alices
  Third call:   creates Alice with id 3   ⚠️ now there are three

  Each call changes the state — the result is never the same.
```

### Why This Matters in Practice

This isn't just academic — it affects how browsers, networks, and frontend code behave:

- **Networks drop requests.** If a `GET` or `DELETE` request fails midway, it's safe to retry automatically — the result will be the same. If a `POST` request fails midway, retrying might create a duplicate record. That's why browsers will warn you "are you sure you want to resubmit?" on a form refresh.

- **Frontend retry logic.** If you write code that retries a failed request, you need to know whether it's safe to retry. Idempotent methods are always safe to retry. `POST` is not.

- **Debugging.** If a `GET` request is changing data on your server, that's a bug — `GET` should never have side effects. This convention helps you spot unexpected behaviour quickly.

```
Quick rule of thumb
══════════════════════════════════════════════════════════════

  Safe to retry automatically?
  ├── GET    ✅ always — reads only, nothing changes
  ├── PUT    ✅ yes — replacing with same data = same result
  ├── DELETE ✅ yes — already gone = still gone
  ├── PATCH  ⚠️ usually — depends on implementation
  └── POST   ❌ no — creates a new record every time
```

## 3. Status Codes — Communicating What Happened

Choosing the right status code is part of the contract between your API and the frontend. When the frontend receives a response, the status code is the first signal about what happened — before it even reads the body.

### The Most Common Codes and When to Use Them

```
2xx — Success

200 OK           → Standard success for GET, PUT, PATCH
201 Created      → A new resource was created (use after POST)
204 No Content   → Success but nothing to return (use after DELETE)


4xx — Client Errors (the request was wrong)

400 Bad Request      → Missing or invalid data sent by the client
401 Unauthorized     → Not authenticated — no token or invalid token
403 Forbidden        → Authenticated but not allowed to do this
404 Not Found        → The resource or route doesn't exist
409 Conflict         → Request conflicts with existing data (e.g. duplicate email)
422 Unprocessable    → Data format is valid but fails business rules


5xx — Server Errors (something broke on your end)

500 Internal Server Error → Unexpected error on the server
```

---

### How to Handle Non-200 Codes on the Frontend

Status codes are only useful if your frontend actually reads and acts on them. Most beginners write `fetch()` calls that only handle the happy path — which means errors either silently fail or crash the app.

Here's the pattern every `fetch()` call should follow:

```js
// ❌ Only handles success — errors are ignored or cause crashes
const response = await fetch("/api/users/1");
const user = await response.json();
displayUser(user);

// ✅ Checks the status code before assuming success
const response = await fetch("/api/users/1");

if (!response.ok) {
  // response.ok is true for 200-299, false for everything else
  const error = await response.json();
  console.error(`Error ${response.status}:`, error.message);
  showErrorMessage(error.message);
  return;
}

const data = await response.json();
displayUser(data.user);
```

`response.ok` is a shortcut that's `true` for any 2xx status and `false` for everything else. It's the quickest way to split success from failure.

For more control, you can check the specific status code:

```js
const response = await fetch("/api/users/1");

if (response.status === 404) {
  showMessage("This user doesn't exist");
  return;
}

if (response.status === 401) {
  redirectToLogin();
  return;
}

if (response.status === 403) {
  showMessage("You don't have permission to do this");
  return;
}

if (!response.ok) {
  showMessage("Something went wrong — please try again");
  return;
}

const data = await response.json();
displayUser(data.user);
```

---

### Using Status Codes to Troubleshoot

When something goes wrong, the status code tells you exactly where to look. This saves a lot of time compared to blindly checking everything at once.

```
Error received → read the status code → know where to look
══════════════════════════════════════════════════════════════

  400 Bad Request
  └── Problem is in what you SENT
      Check: req.body contents, missing fields, wrong data types
      Ask: "What did I send? Is it formatted correctly?"

  401 Unauthorized
  └── Problem is with AUTHENTICATION
      Check: Authorization header, token presence, token expiry
      Ask: "Did I include a token? Is it still valid?"

  403 Forbidden
  └── Problem is with PERMISSIONS
      Check: User role, resource ownership, access control logic
      Ask: "Am I allowed to do this? Does this resource belong to me?"

  404 Not Found
  └── Problem is with the URL or the data
      Check: Route spelling, URL params, whether the record exists
      Ask: "Is the URL correct? Does this ID actually exist?"

  409 Conflict
  └── Problem is with DUPLICATE DATA
      Check: Unique fields like email, username
      Ask: "Does this record already exist?"

  500 Internal Server Error
  └── Problem is on the SERVER — nothing wrong with the request
      Check: Server logs, console errors, unhandled exceptions
      Ask: "What does the server log say? Did I handle errors correctly?"
```

> 💡 **4xx errors are your fault as the API caller. 5xx errors are the server's fault.** This is the single most useful thing to remember when troubleshooting. If you're getting a `4xx`, fix the request. If you're getting a `5xx`, fix the server code and check your logs.

---

### Troubleshooting Workflow

When you hit an error during development, follow this sequence:

```
Got an error response?
        │
        ▼
  Read the status code
        │
        ├── 4xx? ──► Look at what you sent
        │               Open the Network tab in browser DevTools
        │               Check the request body, headers, URL
        │               Read the error message in the response body
        │
        └── 5xx? ──► Look at your server
                        Check the terminal where your server is running
                        Look for the stack trace or console.error output
                        Add more logging to narrow down where it crashed
```

The browser's **Network tab** (in DevTools) is your best friend here. It shows every request your frontend makes, the status code it got back, and the full response body — all in one place.

---

### Common Status Code Mistakes

| Mistake | Why It's a Problem |
|---------|-------------------|
| Using `200` for everything, even errors | The frontend has to read the body to know if it failed — unpredictable and forces extra parsing |
| Using `400` for "user not found" | `400` means the request itself was bad — use `404` for a missing resource |
| Using `500` for validation errors | `500` implies your code crashed — use `400` or `422` for bad input from the client |
| Returning `200` with `{ success: false }` in the body | Contradicts the status code — pick one source of truth |
| Not checking `response.ok` in fetch | Silent failures that are hard to debug — always check the status |

## 4. Consistent Response Shapes

One of the most important things you can do for a frontend developer (or your future self) is make every response look the same — success or failure.

### A Simple Standard Response Format

```js
// ✅ Success response
{
  "data": { "id": 1, "name": "Alice", "email": "alice@example.com" },
  "message": "User retrieved successfully"
}

// ✅ List response
{
  "data": [
    { "id": 1, "name": "Alice" },
    { "id": 2, "name": "Bob" }
  ],
  "count": 2
}

// ✅ Error response
{
  "error": "User not found",
  "status": 404
}
```

The exact shape is less important than the **consistency** — pick a format and use it everywhere.

> 💡 **Why `data`? It's not arbitrary.**
>
> The `data` key is a deliberate industry convention, not just a stylistic choice. It's the top-level envelope key used by **JSON:API** (jsonapi.org) — one of the most widely referenced REST response standards — and many teams adopt it even without following the full spec.
>
> There are two practical reasons it exists:
>
> **1. It separates payload from metadata.** Wrapping the actual resource in `data` leaves room at the top level for fields like `message`, `count`, `page`, and `total` — without colliding with the resource's own fields. If a user object happened to have a field called `message`, returning it unwrapped would create a conflict. The `data` wrapper avoids that entirely.
>
> **2. It signals intent clearly.** A consumer of your API immediately knows the actual resource lives at `.data`, without having to guess which top-level key is "the thing." It's a shared vocabulary — when developers see `data`, they know what it means.
>
> Naming it `payload`, `result`, or `user` instead isn't technically wrong, but it's non-standard. Stick with `data` and other developers will feel at home immediately.

### Why This Matters

Without a consistent format, your frontend code ends up looking like this — a mess of different shapes to handle:

```js
// ❌ Every route returns something different — frontend can't predict anything
fetch("/api/users/1")  // returns { id: 1, name: "Alice" }
fetch("/api/posts")    // returns [{ title: "..." }]
fetch("/api/login")    // returns { token: "...", user: { ... } }
fetch("/api/users/99") // returns "not found" (a plain string!)
```

With a consistent format, your frontend only needs one pattern:

```js
// ✅ Same shape every time — easy to handle
const response = await fetch("/api/users/1").then(r => r.json());
if (response.error) {
  showError(response.error);
} else {
  displayUser(response.data);
}
```

---

### Building a Response Helper

Rather than writing `res.json({ data: ..., message: ... })` on every route, you can create a simple helper:

```js
// utils/response.js
export const sendSuccess = (res, data, message = "Success", statusCode = 200) => {
  res.status(statusCode).json({ data, message });
};

export const sendError = (res, message, statusCode = 500) => {
  res.status(statusCode).json({ error: message, status: statusCode });
};
```

Then in your controllers:

```js
import { sendSuccess, sendError } from "../utils/response.js";

export const getUserById = (req, res) => {
  const user = users.find(u => u.id === Number(req.params.id));

  if (!user) return sendError(res, "User not found", 404);
  sendSuccess(res, user, "User retrieved successfully");
};
```

Now every response in your entire API looks the same with a single line.

## 5. API Versioning

As your API grows, you'll need to make changes — sometimes changes that would break existing clients. **Versioning** lets you release a new version of your API without breaking the old one.

### How It Works

The most common approach is to prefix all your routes with a version number:

```
/api/v1/users    ← original version, stays working
/api/v2/users    ← new version with breaking changes
```

```js
// server.js
import v1UserRoutes from "./routes/v1/users.js";
import v2UserRoutes from "./routes/v2/users.js";

app.use("/api/v1/users", v1UserRoutes);
app.use("/api/v2/users", v2UserRoutes);
```

This means:
- Existing frontend apps using `/api/v1/users` keep working without changes
- New frontend apps can use `/api/v2/users` with the updated behavior
- You can deprecate v1 gradually over time

### When to Version

You don't need versioning from day one on a personal project. But you should add it when:
- Other developers or apps are consuming your API
- You're deploying to production and have real users
- You're about to make a **breaking change** — changing a field name, removing a route, or changing a response shape

> 💡 **Start with `/api/v1/` from the beginning** — it costs nothing and saves a painful refactor later if you ever need it.

## 6. Filtering, Sorting, and Pagination

When your API returns lists of data, you need a standard way for clients to control what they get back. This is done through **query parameters**.

### Filtering

Let clients filter results by field values:

```
GET /api/users?role=admin
GET /api/products?category=books&inStock=true
```

```js
router.get("/", (req, res) => {
  const { role } = req.query;
  const results = role
    ? users.filter(u => u.role === role)
    : users;
  res.json({ data: results });
});
```

---

### Sorting

Let clients control the sort order:

```
GET /api/users?sort=name          → sort by name ascending
GET /api/users?sort=-createdAt    → sort by date descending (- prefix = descending)
```

---

### Pagination

Never return thousands of records in one response. Use pagination to return data in pages:

```
GET /api/users?page=1&limit=10    → first 10 users
GET /api/users?page=2&limit=10    → next 10 users
```

```js
router.get("/", (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedUsers = users.slice(start, end);

  res.json({
    data: paginatedUsers,
    page,
    limit,
    total: users.length,
    totalPages: Math.ceil(users.length / limit)
  });
});
```

The response includes metadata so the frontend knows how many pages exist and can build a pagination UI.

### Query Parameter Conventions

| Parameter | Purpose | Example |
|-----------|---------|---------|
| `page` | Which page of results | `?page=2` |
| `limit` | How many results per page | `?limit=20` |
| `sort` | Field to sort by (`-` prefix = descending) | `?sort=-createdAt` |
| `filter` / field name | Filter by a specific value | `?role=admin` |
| `q` or `search` | Keyword search | `?q=alice` |

## 7. Error Handling — A Consistent Contract

You already learned how Express error handling works mechanically (the `next(err)` pattern from the Express doc). API design adds a layer on top: **making your errors consistent and informative**.

### What a Good Error Response Looks Like

```js
// ✅ Informative, consistent, predictable
{
  "error": "Validation failed",
  "status": 400,
  "details": [
    { "field": "email", "message": "Email is required" },
    { "field": "name",  "message": "Name must be at least 2 characters" }
  ]
}
```

Compare this to:

```js
// ❌ Vague and inconsistent — what went wrong? What field?
{
  "message": "Something went wrong"
}
```

### Error Design Principles

| Principle | What It Means |
|-----------|--------------|
| **Use the right status code** | `400` for bad input, `404` for missing resource, `500` for server crash |
| **Include a human-readable message** | Tell the developer (or user) what went wrong |
| **Include field-level detail for validation errors** | List which fields failed and why |
| **Never expose internal details in production** | No stack traces, file paths, or database errors in responses |
| **Keep the error shape consistent** | Same format every time so the frontend always knows what to expect |

## Putting It All Together — A Well-Designed Route

Here's what a single route looks like when all these principles are applied together:

```js
// routes/users.js
router.get("/:id", getUserById);
router.post("/", validateUser, createUser);
router.put("/:id", validateUser, updateUser);
router.delete("/:id", deleteUser);
```

```js
// controllers/usersController.js
import { sendSuccess, sendError } from "../utils/response.js";
import * as userService from "../services/usersService.js";

// GET /api/v1/users/:id
export const getUserById = async (req, res, next) => {
  try {
    const user = await userService.getById(req.params.id);
    if (!user) return sendError(res, "User not found", 404);
    sendSuccess(res, user, "User retrieved successfully");
  } catch (err) {
    next(err);
  }
};

// POST /api/v1/users
export const createUser = async (req, res, next) => {
  try {
    const newUser = await userService.create(req.body);
    sendSuccess(res, newUser, "User created successfully", 201);
  } catch (err) {
    next(err);
  }
};
```

Notice:
- The route uses a noun (`/users`), not a verb
- The right status codes are used (`201` for creation, `404` for not found)
- The response shape is consistent (`sendSuccess` / `sendError`)
- Errors are passed to Express's error handler via `next(err)`
- The controller is clean — it asks the service for data and formats the response

## Summary

Good API design is what separates an API that works from an API that's a pleasure to use. These conventions exist because real teams discovered through experience what makes APIs maintainable and predictable.

| Concept | The Rule |
|---------|----------|
| **Route naming** | Nouns not verbs, plural resources, max 2 levels of nesting |
| **HTTP methods** | GET reads, POST creates, PUT replaces, PATCH updates, DELETE removes |
| **Status codes** | `200` success, `201` created, `204` no content, `400` bad input, `404` not found, `500` server error |
| **Response shape** | Same format for every success and every error across the entire API |
| **Versioning** | Prefix with `/api/v1/` — start from day one |
| **Pagination** | Never return unbounded lists — always support `page` and `limit` |
| **Errors** | Consistent shape, right status code, field-level detail for validation |

```
Client → Middleware → Route → Controller → Service → Model → Response
                                   ↑
                         API Design lives here —
                    it defines what the route is called,
                    what it returns, and how errors look
```

With solid API design in place, your backend becomes something anyone can work with confidently — including yourself six months from now.

---

### Next Topics to Explore

#### 🧪 [Testing & Debugging](2-testing-and-debugging.md)  
Learn how to test your API endpoints, write Postman tests, and debug common backend issues so you can confidently verify that your server behaves correctly.

#### 📋 [Server Logging](3-server-logging.md)  
Understand how to record what your API is doing using Morgan and Winston — including writing permanent log files, log levels, and what never to log.

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