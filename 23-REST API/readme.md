# Scalable API Architecture 

Now that you’ve built APIs using Node and Express, it’s time to start organizing your code in a way that’s **scalable** and **easy to maintain**. In real-world applications, routes, logic, and data handling grow quickly — so you need a clear structure.

Every piece of your backend code plays a specific role:

1. The **client** (like a React app) makes a request to a specific route (`/api/users`).
2. The **server** receives it and passes it through **middleware** (for parsing, logging, etc.).
3. The **router** identifies which controller should handle it.
4. The **controller** runs logic or calls a **service** to handle data.
5. The **service** retrieves or updates the data and sends it back to the controller.
6. The **model** define the structure of your data
7. The **controller** sends a final **response** (JSON) back to the client.

## How It All Fits Together

| Layer | What It Does | Example Files |
|-------|---------------|----------------|
| **Server** | Starts Express, sets middleware, mounts routes | `server.js` |
| **Middleware** | Runs before routes to handle logging, auth, validation, and more | `app.use(express.json())` |
| **Routes** | Define which URLs and HTTP methods your API supports | `routes/users.js` |
| **Controllers** | Decide what happens when those routes are hit | `controllers/usersController.js` |
| **Services** | Handle business logic — reading/writing data, calculations, etc. | `services/usersService.js` |
| **Models** | Define the structure of your data and interact directly with the database | `models/User.js` |

Each layer focuses on a single job. Together, they form a **layered API architecture**, which is the same structure used in production-level applications.

## 1. Express Router — Organizing Routes

As your API grows, your main server file (`server.js` or `app.js`) can get cluttered. That’s where **Express Router** comes in.

Routers let you split your API routes into **separate files**. Each router handles a specific part of your app — like `/users`, `/posts`, or `/products`.

### Why You Need Routers

When you built a React app, you split your UI into **components** like `<Navbar />`, `<Footer />`, and `<ProductList />`.  
You did that because having all your HTML and JS in one giant file would be unmanageable.

>Express routers are like **components for your backend**.  
Each router handles one section of your app — for example, users, products, or posts.  

So instead of this in one file:
```js
app.get("/api/users")
app.post("/api/users")
app.get("/api/products")
app.post("/api/products")
```
You can have:
- `users.js` → handles `/api/users`
- `products.js` → handles `/api/products`

This keeps your backend clean, modular, and easy to grow.


### How Express Router Fits Into the Flow

Here’s a simple diagram of what’s happening when your frontend makes a request:

```
Client (React) 
    ↓
HTTP Request (fetch or axios)
    ↓
Express App (server.js)
    ↓
Router (e.g. routes/users.js)
    ↓
Controller (e.g. controllers/usersController.js)
    ↓
Response Sent Back (JSON data)
```

Each part has one clear job — just like a React component tree.  

---

### Example: Creating a Router

**server.js**
```js
import express from "express";
import userRoutes from "./routes/users.js";

const app = express();
app.use(express.json());

// Connect the user routes
app.use("/api/users", userRoutes);

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
```

**routes/users.js**
```js
import express from "express";
const router = express.Router();

// GET all users
router.get("/", (req, res) => {
  res.json([{ id: 1, name: "Alice" }, { id: 2, name: "Bob" }]);
});

// POST a new user
router.post("/", (req, res) => {
  res.status(201).json({ message: "User created", user: req.body });
});

export default router;
```

When you visit `http://localhost:3000/api/users`, the router handles it — not your main server file.


| Code | What It Does | Analogy |
|------|---------------|----------|
| `import express from "express"` | Brings in the Express library | Like importing React before building components |
| `const app = express()` | Starts your web app | Like `ReactDOM.createRoot()` |
| `app.use("/api/users", userRoutes)` | Connects all `/api/users` routes to the router file | Like adding a `<Users />` component that handles its own logic |
| `const router = express.Router()` | Creates a mini Express app just for routes | Like creating a child component |
| `router.get()` / `router.post()` | Defines endpoints inside that mini app | Like event handlers (`onClick`, `onSubmit`) |
| `res.json()` | Sends a JSON response to the client | Like returning data from a function |

---

Think of your Express app like an **airport**:
- The `server.js` file is the **control tower** — it routes traffic.
- Each **router** is a **terminal** — handling certain types of flights (users, posts, etc.).
- Each **controller** (you’ll learn next) is like a **gate agent** — doing the actual work once the plane arrives.

Every request (like a plane landing) gets sent to the correct terminal, processed, and then leaves with the right response.

## 2. Controllers — Separating Business Logic


When you built frontends in React and JavaScript, you wrote **functions** to handle user actions — like clicking a button or submitting a form.  
In the backend, **controllers** play a similar role. They decide **what happens** when someone hits one of your API routes.

Think of it this way:
- **Routes** are *like buttons* — they define what paths exist (like `/api/users` or `/api/posts`).
- **Controllers** are *like the functions those buttons call* — they decide what to do when clicked (like returning data or saving something new).

### Why Controllers Exist

Without controllers, your routes would quickly get messy.  
Every route would contain all the logic, making it hard to read or reuse later.

Controllers let you:<br/>
✅ Keep your routes clean and readable  
✅ Reuse logic across different routes  
✅ Test or debug your server more easily  

### 💡 Example: Splitting Routes and Logic

Here’s how we can separate the logic (controllers) from the route definitions.

#### **controllers/usersController.js**
```js
// Handles what happens when GET /api/users is called
export const getAllUsers = (req, res) => {
  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];
  res.json(users);
};

// Handles what happens when POST /api/users is called
export const createUser = (req, res) => {
  const newUser = req.body;
  res.status(201).json({ message: "User created", user: newUser });
};
```

#### **routes/users.js**
```js
import express from "express";
import { getAllUsers, createUser } from "../controllers/usersController.js";

const router = express.Router();

// The route just points to the function
router.get("/", getAllUsers);
router.post("/", createUser);

export default router;
```

#### **server.js**
```js
import express from "express";
import userRoutes from "./routes/users.js";

const app = express();
app.use(express.json());
app.use("/api/users", userRoutes);

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
```

---

### What’s Really Happening Behind the Scenes

```
Frontend → API Route (/api/users) → Controller Function → Response Sent Back
```

When you visit `http://localhost:3000/api/users`:
1. The browser (or your React app using `fetch`) sends a request.  
2. The router says: “This path belongs to the users router.”  
3. The users router says: “This route should use the `getAllUsers` controller.”  
4. The controller runs the logic and sends back a JSON response.

So the controller is like the *brain* behind each route.

### Typical Project Structure
```
my-api/
├── server.js              # Starts the app and connects routes
├── routes/
│   └── users.js           # Defines endpoints
├── controllers/
│   └── usersController.js # Handles logic
└── package.json
```

This helps your app stay organized even as it grows. You can easily add:
- A `postsController.js` for posts  
- A `productsController.js` for products  
- Matching route files for each  


### Why This Matters for Real Projects

Professional APIs can have hundreds of routes.  
Keeping your logic, routes, and setup separated prevents chaos and makes teamwork possible.

| Layer | Purpose | Analogy |
|--------|----------|----------|
| **Server** | Starts the app and connects everything | The main switchboard |
| **Router** | Defines which URLs exist | A map or directory |
| **Controller** | Decides what happens for each route | The “function” behind each action |


## 3. Services and Models — Preparing Your API for Real Data

So far, you’ve learned how to organize your app with **routes** and **controllers** — where routes define *where requests go*, and controllers decide *what happens* when they get there.  
Now, it’s time to take the next step: actually **handling data**.

In the real world, your API needs to do more than return static arrays — it needs to *create*, *read*, *update*, and *delete* data from a persistent source (like a database or an external service).  
To prepare for that, we introduce two new layers: **Services** and **Models**.

### What Are Services and Models?

| Layer | What It Does | Analogy |
|--------|---------------|----------|
| **Service** | Contains the business logic — how data is fetched, filtered, validated, or saved | Like the “manager” that knows how to handle information |
| **Model** | Defines the structure of the data — what fields exist, how they’re organized, and how they’re stored | Like a “blueprint” or “schema” for your data |

These layers sit between your controllers and your data source.  
Controllers *ask* for data; services *get* it; models *define* what it looks like.

### How the Flow Expands

Once you introduce these layers, your request–response cycle looks like this:

```text
Client → Route → Controller → Service → Model → Controller → Response
```

- The **client** (like your React app) sends a request.  
- The **controller** calls a **service** function to perform logic.  
- The **service** uses a **model** (or a simple data structure for now) to interact with stored data.  
- The result flows back to the **controller**, then to the **frontend** as JSON.

---

### 🧰 Example: Simulating a Service Without a Real Database

For now, you can mimic a database using an array.  
This lets you understand the structure without worrying about setup or async operations yet.

### **services/usersService.js**
```js
// Fake database
let users = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
];

// Get all users
export const getUsers = () => users;

// Create a new user
export const createUser = (userData) => {
  const newUser = { id: Date.now(), ...userData };
  users.push(newUser);
  return newUser;
};

// Update a user
export const updateUser = (id, updates) => {
  const user = users.find((u) => u.id === parseInt(id));
  if (user) Object.assign(user, updates);
  return user;
};

// Delete a user
export const deleteUser = (id) => {
  users = users.filter((u) => u.id !== parseInt(id));
};
```

### **controllers/usersController.js**
```js
import * as userService from "../services/usersService.js";

export const getAllUsers = (req, res) => {
  const users = userService.getUsers();
  res.json(users);
};

export const addUser = (req, res) => {
  const newUser = userService.createUser(req.body);
  res.status(201).json({ message: "User created", user: newUser });
};

export const updateUserById = (req, res) => {
  const { id } = req.params;
  const updatedUser = userService.updateUser(id, req.body);
  updatedUser
    ? res.json(updatedUser)
    : res.status(404).json({ message: "User not found" });
};

export const deleteUserById = (req, res) => {
  userService.deleteUser(req.params.id);
  res.json({ message: "User deleted" });
};
```

### **routes/users.js**
```js
import express from "express";
import {
  getAllUsers,
  addUser,
  updateUserById,
  deleteUserById,
} from "../controllers/usersController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.post("/", addUser);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
```

## 🏗️ How Models Fit In

Right now, your “model” is just a JavaScript object inside an array.  
But later, when you use a real database, models become formal **schemas** — they define what your data looks like, such as:
- What fields exist (`name`, `email`, `id`)
- What types they are (string, number, boolean)
- Which ones are required or unique

For now, think of your “model” as a **shape of your data** — a simple object that stays consistent across your routes and services.


## 4. Middleware — The Glue of Your API


At this stage, you already know middleware runs between the request and response — but in real-world APIs, middleware isn’t just a helper function. It’s the **foundation for scalable, secure, and maintainable architecture**.

Middleware forms the **“global layer”** of your backend — the place where you standardize behavior across every route. This is where you manage authentication, validation, security, and error handling before a request ever reaches your controllers.

There are three main categories you’ll use in most production APIs:

- **Built-in middleware** — lightweight and provided by Express (e.g., `express.json()` or `express.static()`), handling core features like body parsing and serving static files.
- **Third-party middleware** — installed through npm (like `cors`, `helmet`, `morgan`), adding battle-tested solutions for CORS handling, HTTP security, and logging.
- **Custom middleware** — logic you write for your specific application, such as checking authentication tokens, sanitizing inputs, or verifying user roles.

The key difference isn’t just *who wrote it* — it’s **where and how it runs**.

- Global middleware (added with `app.use()`) applies to *every* route.
- Route-specific middleware applies only to particular endpoints (e.g., `router.post("/users", validateUser, createUser)`), letting you isolate logic for security or validation.

### Built-in Middleware (Core Express Features)

These come straight from Express — no installation required.  
They handle the most common tasks every API needs:

```js
import express from "express";
const app = express();

// 1️⃣ Parses JSON bodies (required for POST/PUT requests)
app.use(express.json());

// 2️⃣ Parses form submissions (from HTML <form> tags)
app.use(express.urlencoded({ extended: true }));

// 3️⃣ Serves static files like index.html or images
app.use(express.static("public"));
```

**When to use:**  
- `express.json()` → Always include it in every modern API.  
- `express.urlencoded()` → Only needed when handling traditional form data.  
- `express.static()` → Use only when serving frontend files or documentation (e.g., React’s `/build` folder).  

> 💡 **Pro tip:** Built-in middleware should be loaded at the top of your app, before any custom or third-party layers.

---

### Third-Party Middleware (Reusable Packages)

Third-party middleware adds proven, production-ready behavior to your API.  
You’ll almost always see these three in a professional Express server:

```bash
npm install cors helmet morgan
```

```js
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

app.use(cors());        // Allows frontend on a different port to call your API
app.use(helmet());      // Adds secure headers (e.g., blocks clickjacking)
app.use(morgan("dev")); // Logs every request with method, path, and time
```

These run globally on every request and give your app a professional baseline for security and observability.

| Middleware | What It Does | Why It Matters |
|-------------|--------------|----------------|
| `cors()` | Enables cross-origin requests | Lets your frontend talk to your backend |
| `helmet()` | Adds standard HTTP security headers | Prevents common web vulnerabilities |
| `morgan()` | Logs every request and response time | Helps debug API calls in real time |

> 💡 In production, you might also see middleware like `compression` (for gzip responses) or `rate-limit` (to prevent abuse).

---

### Custom Middleware (App-Specific Logic)

This is where you bring your own rules.  
Custom middleware helps enforce app-level policies, such as validating input or checking user authentication.

### Example: Simple request logger
```js
const logger = (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Always call next() to continue
};
app.use(logger);
```

### Example: Route-level validator
```js
const validateUser = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || !email) {
    return res.status(400).json({ message: "Name and email required" });
  }
  next();
};

app.post("/api/users", validateUser, (req, res) => {
  res.status(201).json({ message: "User created", user: req.body });
});
```

> 💡 Custom middleware can be global (`app.use()`) or specific to certain routes (`router.post("/users", validateUser, handler)`).

---

### Typical Middleware Order in Professional APIs

```js
// 1. Core Express features
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 2. Third-party tools
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// 3. Custom global middleware
app.use(requestLogger);

// 4. Routers (controllers + services)
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

// 5. Error-handling middleware (always last)
app.use(errorHandler);
```

> 🧭 **Rule of thumb:** Middleware runs in order. Always define security, logging, and body parsing *before* routers, and handle errors *after* everything else.


## Summary

A scalable API is built on **clear separation of responsibilities**.

Middleware acts as the **nervous system** of your API --- it
standardizes behavior across requests by handling parsing, security,
logging, validation, and error handling *before* your core logic runs.

Routes, controllers, services, and models form the **structural layers**
of your backend --- each responsible for a specific part of the request
lifecycle.

    Client → Middleware → Route → Controller → Service → Model → Response

-   **Middleware** prepares and protects the request.
-   **Routes** define available endpoints.
-   **Controllers** handle incoming requests.
-   **Services** manage business logic.
-   **Models** define and structure data.

Middleware ensures consistency across the entire system, while the
layered architecture ensures maintainability and scalability.

| Type | Scope | Common Use |
|------|--------|-------------|
| Built-in | Core Express | JSON Parsing, URL encoding, static files |
| Third-party | Cross-cutting concerns | Security headers, logging, CORS |
| Custom | App-specific | Validation, auth, request metadata |


### Next Topics to Explore

#### 🧪 [Testing & Debugging](1-testing-and-debugging.md)  
Learn how to test your API endpoints, write Postman tests, and debug common backend issues so you can confidently verify that your server behaves correctly.

#### 🔐 [API Security](2-api-security.md)  
Understand how to protect your backend using validation, authentication, environment variables, and other techniques that prevent common security vulnerabilities.

#### 🐘 [Using PostgreSQL](3-postgres.md)  
Learn how relational databases work using PostgreSQL, including tables, rows, relationships, and how SQL queries interact with structured data.

#### 🔗 [Connecting APIs to PostgreSQL](4-postgres-service.md)  
Connect your Node.js REST API to a PostgreSQL database and learn how backend services run SQL queries to store and retrieve application data.

#### 🍃 [Using MongoDB](5-mongodb.md)  
Understand how document databases work using MongoDB, including collections, documents, fields, and how data can be stored in flexible JSON-like structures.

#### 🔌 [Connecting APIs to MongoDB](6-mongodb-service.md)  
Learn how to connect your API to MongoDB and use tools like Mongoose to create models, run queries, and manage application data.

