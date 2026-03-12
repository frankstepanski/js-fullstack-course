# API Security Fundamentals

Now that your API can store real data (MongoDB, PostgreSQL, etc.), the next thing to think about is **keeping it safe**. A backend that accepts requests, saves data, and returns data can also be **abused** if you don’t put guardrails in place.

When you build a REST API, you’re usually protecting at least one of these:

- **Who can access it** (only logged-in users, only admins, only your frontend)
- **What data can be seen** (don’t leak all users)
- **What data can be changed** (only the owner can update their profile)
- **Secrets** (DB password, API keys, JWT secret)
- **Your server** (so it doesn’t crash or get spammed)

So security is just: **“Only the right people can do the right things with the right data.”**
## Authentication vs Authorization

When we talk about “API security,” these two words come up constantly.  
They sound similar, but they do **different jobs** — and you need both to keep your API safe.

### Authentication = “Who Are You?”

Authentication is about **identity** — proving that a request really comes from a specific user.

### Examples:
- Logging in with an email and password  
- Sending a JWT token in your headers  
- Scanning your fingerprint on a mobile app  

If you’re not authenticated, your API doesn’t know who you are — so it shouldn’t trust you.

### Authorization = “What Are You Allowed to Do?”

Authorization happens **after** authentication.  
Once your app knows *who* you are, it decides *what* you’re allowed to do.

### Examples:
- You can view your own profile, but not someone else’s  
- Only admins can delete users  
- Regular users can create posts but not change other people’s posts  

So, **authentication checks identity**, and **authorization checks permissions**.

---

### How This Looks in Express

In a real backend (like Express), these checks are done with **middleware functions** that run before your route logic.

```js
// authMiddleware.js
export function requireAuth(req, res, next) {
  // 1. Check if a token exists in the headers
  // 2. Verify it (decode JWT, check session, etc.)
  // 3. If valid, attach user info to req.user
  // 4. If not valid, stop and send 401 (unauthorized)
  next();
}

export function requireAdmin(req, res, next) {
  // 1. Make sure req.user exists
  // 2. Check if user role === "admin"
  // 3. If not, send 403 (forbidden)
  next();
}
```

Then, you protect your routes like this:

```js
app.get("/api/users", requireAuth, requireAdmin, (req, res) => {
  // Only admins can see all users
});
```

The order matters — `requireAuth` must run before `requireAdmin`,  
because authorization depends on authentication.

### How This Fits Into the Big Picture

| Stage | What it Checks | Example Error |
|--------|----------------|----------------|
| **Authentication** | Does this user have valid credentials? | `401 Unauthorized` |
| **Authorization** | Does this user have permission for this action? | `403 Forbidden` |

Without these two steps, any user (or script) could:
- View private data  
- Change someone else’s account  
- Delete everything in your database  


Think of your API as a concert venue:
- **Authentication** is showing your ticket at the gate.  
- **Authorization** is whether that ticket lets you into the VIP lounge.  

Both are checks — just for different levels of trust.

## Hide Your Secrets with Environment Variables

When you start building real APIs, you’ll often need to store **sensitive information** — database passwords, API keys, JWT secrets, and more.  
These values should **never** be hardcoded directly into your source code.

🚫 Never Hardcode Secrets

```js
// ❌ don’t do this
const dbPassword = "supersecret";
const jwtSecret = "myJWTpassword123";
```

Why is this bad?

- If you upload this to GitHub, everyone can see your password.  
- If someone gains access to your code, they can access your database or issue fake login tokens.  
- Changing environments (local → production) becomes messy — you’d have to edit code every time.

### ✅ Use Environment Variables Instead

Environment variables are **private configuration values** that live **outside your codebase**.  
They’re stored in a `.env` file (not pushed to GitHub) and loaded into your app at runtime.

### 1. Install the dotenv package
```bash
npm install dotenv
```

### 2. Create a `.env` file
```bash
DB_PASSWORD=supersecret
JWT_SECRET=topsecretkey
```

### 3. Load the values in your app
```js
// server.js
import "dotenv/config";

const dbPassword = process.env.DB_PASSWORD;
const jwtSecret = process.env.JWT_SECRET;
```

Now your code is clean, safe, and easy to configure between environments.

---

### 💡 Why This Matters for Security

Environment variables protect the **core secrets** that power your authentication and authorization systems.

| Secret Type | Used For | Why It’s Sensitive |
|--------------|-----------|-------------------|
| **JWT Secret** | Used to sign and verify login tokens | Anyone with it can fake being any user |
| **DB Password** | Connects to your database | Gives full access to all user data |
| **API Keys** | Access third-party services (like Stripe, AWS, or Google) | Could lead to billing or data leaks |

If someone steals these, they can:
- Log in as any user (bypass authentication)
- Escalate permissions (bypass authorization)
- Access your entire database (bypass everything)

### Real-World Deployment

Platforms like **Render**, **Railway**, **Vercel**, or **AWS** automatically let you set environment variables through their dashboards.  
This means you never have to store passwords or secrets in your public code repository.

In short:  
> **If your secrets aren’t protected, neither are your users.**

## CORS — Letting the Right Frontend Talk to Your API 

You’ve already seen CORS in action — or, more likely, seen it **break your app** with the dreaded browser error:  
> “Access to fetch at ‘http://localhost:3000’ from origin ‘http://localhost:5173’ has been blocked by CORS policy.”

At this level, you already know **what CORS is**: Cross-Origin Resource Sharing.  
Now let’s understand **why it exists**, **how it ties into security**, and **how to configure it safely**.

CORS is a **browser-enforced security rule** that prevents JavaScript running on one origin (domain + port + protocol) from making requests to another origin without permission.

It doesn’t protect your API — it protects **users** from malicious scripts running in the browser.

Example scenario:
- You log into your bank’s site (`bank.com`).
- Another site (`evil.com`) secretly tries to fetch your account info from the bank API.  
- Without CORS, the browser would happily send your cookies and tokens — exposing your data.  
- With CORS, the browser blocks that request unless the API explicitly allows it.

They all stack together — CORS is like a doorman who only lets certain *buildings* talk to your API, while authentication and authorization decide which *people* inside that building can do what.

```bash
npm install cors
```

```js
import cors from "cors";
import express from "express";

const app = express();

const allowedOrigins = ["http://localhost:5173", "https://myapp.com"];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true, // if you’re using cookies or auth headers
}));
```

### Why this is better
- It **whitelists** multiple safe origins.  
- It rejects unknown origins instead of allowing everything.  
- `credentials: true` lets your frontend send cookies or tokens securely.

### 🚫 Common Mistakes

| Mistake | Why It’s Risky |
|----------|----------------|
| Using `app.use(cors())` with no config | Allows **any website** to call your API — even malicious ones |
| Forgetting `credentials: true` | Breaks cookie-based logins |
| Using `"*"` with credentials | Not allowed by browsers — and unsafe |
| Allowing all origins in production | Exposes your API to public abuse |

## Helmet — Easy Security Headers


When you deploy an Express API, you’re not just exposing your routes — you’re exposing **HTTP responses** to the entire internet.  
Attackers often look for small misconfigurations (like missing headers) that reveal information about your server or weaken the browser’s defenses.

That’s where **Helmet** comes in. It automatically sets **security-related HTTP headers** that help protect both your API and the users who connect to it.


```bash
npm install helmet
```

In your main server file (e.g. `server.js` or `app.js`):

```js
import helmet from "helmet";
import express from "express";

const app = express();

app.use(helmet());
```
And that’s it — one line of middleware gives you a strong baseline of protection.

## Validating Input (Don’t Trust the Client)

Anything sent from the browser can be **wrong, missing, or malicious**.  
Just because the frontend says it’s sending clean data doesn’t mean you should trust it.

This is one of the **core rules** of backend development:
> ✅ Always validate and sanitize every piece of input your server receives.

Without validation, attackers can:
- Send malformed JSON that crashes your server.  
- Insert HTML or JavaScript into your database (XSS risk).  
- Change IDs or roles in requests to access other users’ data.  
- Bypass frontend checks (since the frontend can be modified or faked).  

Every single API route that accepts user input — body, params, or query — should be validated.

### Simple Manual Validation Example

Even without libraries, you can add a basic safety check:

```js
app.post("/api/users", (req, res) => {
  const { name, email } = req.body;

  // Basic validation
  if (!name || !email) {
    return res.status(400).json({ message: "name and email required" });
  }

  // Continue creating the user safely
  res.status(201).json({ message: "User created!" });
});
```

This prevents the most common crash: missing or invalid data.

Example of a malicious request:

```json
{
  "email": "<script>alert('Hacked!')</script>"
}
```
If you don’t validate or sanitize this, it could end up being stored and re-rendered on a page — leading to an **XSS attack**.

### What to Validate

| Area | Example | Why |
|------|----------|-----|
| **req.body** | Form or JSON payloads (e.g., `/register`) | Prevent invalid or unsafe data being stored |
| **req.params** | URL values like `/users/:id` | Stop attackers from passing unexpected values |
| **req.query** | Optional filters like `/users?role=admin` | Control accepted filters and types |

You can even enforce types and rules — e.g., `email` must look like an email, `age` must be a number, etc.

### Validation Libraries for Express

For larger apps, manual validation gets repetitive. Libraries help define reusable schemas for your routes.

### 🔹 express-validator
Declarative syntax for validation chains and sanitization.

```bash
npm install express-validator
```

Example:
```js
import { body, validationResult } from "express-validator";

app.post(
  "/api/users",
  [
    body("email").isEmail(),
    body("name").notEmpty(),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Continue safely
  }
);
```

---

### 🔹 zod
A lightweight, TypeScript-friendly schema validation library.

```bash
npm install zod
```

Example:
```js
import { z } from "zod";

const userSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
});

app.post("/api/users", (req, res) => {
  const result = userSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({ errors: result.error.errors });
  }
  // Safe to use result.data
});
```

---

### 🔹 joi
A classic, powerful validation library from the hapi ecosystem.

```bash
npm install joi
```

Example:
```js
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
});

app.post("/api/users", (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // Safe to proceed
});
```

### Summary

- Never trust client input — browsers, Postman, and scripts can all send bad data.  
- Always validate `req.body`, `req.params`, and sometimes `req.query`.  
- Use libraries like **express-validator**, **zod**, or **joi** for cleaner, reusable rules.  
- Validation makes your API safer, more reliable, and easier to debug.

## Passwords: Hash, Don’t Store


If your API has users and logins, **never store plain text passwords** — not even temporarily.  
If someone gains access to your database, unencrypted passwords expose **every user** immediately.

Hashing is a one-way transformation that turns a password into a scrambled string.  
Even the server cannot turn the hash back into the original password.


```bash
npm install bcrypt
```

### 🧮 Hashing Passwords

```js
import bcrypt from "bcrypt";

const plain = "mypassword";
const hashed = await bcrypt.hash(plain, 10); // 10 = salt rounds

// Store `hashed` in the database, not `plain`
```
Here’s what happens behind the scenes:
1. bcrypt generates a random **salt** (unique per password).  
2. It mixes the salt + password and runs the hash algorithm multiple times.  
3. The final hash is stored — it’s unique and irreversible.

Even if two users have the same password, their hashes will look different.

### 🔑 Verifying Passwords at Login

```js
const isMatch = await bcrypt.compare(plain, hashedFromDb);
if (!isMatch) {
  return res.status(401).json({ message: "Bad credentials" });
}
```
bcrypt handles the comparison internally — you never decrypt or reveal the password.

### Why Hashing Matters

| Threat | What Happens Without Hashing | How Hashing Helps |
|---------|------------------------------|-------------------|
| **Database Leak** | Attackers see every user’s raw password | They see only hashes (useless without brute-force) |
| **Password Reuse** | Users often reuse passwords on other sites | Hashing prevents attackers from knowing the actual password |
| **Internal Access** | Developers or admins could view sensitive data | Hashed passwords are unreadable by humans |

Hashing = protecting users even when the database is compromised.

## Using JWT for Auth

Once a user logs in successfully, your API can give them a **token** (JWT = JSON Web Token).  
Then for future requests, they send the token instead of their password — keeping authentication **stateless** and secure.

### Why Use Tokens?

Traditional login systems store user sessions on the server.  
With **JWT**, the session data lives inside the token itself — signed and verified by your server secret.

This allows scalable, stateless APIs that don’t need to track sessions for every user.

```bash
npm install jsonwebtoken
```

### Creating a Token After Login

```js
import jwt from "jsonwebtoken";

app.post("/api/login", async (req, res) => {
  // 1. Check user credentials (example)
  const user = { id: 1, email: "test@example.com", role: "user" };

  // 2. Sign a token
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" } // token expires in 1 hour
  );

  res.json({ token });
});
```

The token contains encoded (not encrypted) data — anyone can decode it, but only your server can **verify** it using your secret key.

### Structure of a JWT

A JWT has three parts, separated by dots:

```
header.payload.signature
```

Example:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
.eyJpZCI6MSwicm9sZSI6InVzZXIiLCJpYXQiOjE3MjUwNjE4MDIsImV4cCI6MTcyNTA2NTQwMn0
.Li6MEeqxuzx7v8GxvpoB4Yw4EeCZ_2lnZcOMxkU8fw8
```

- **Header** → algorithm + type (JWT)  
- **Payload** → your data (user id, role, etc.)  
- **Signature** → ensures the token hasn’t been tampered with

### Protecting Routes with Middleware

```js
function auth(req, res, next) {
  const authHeader = req.headers.authorization; // "Bearer <token>"
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
}

app.get("/api/profile", auth, (req, res) => {
  res.json({ message: "Private profile", user: req.user });
});
```

If the token is valid, `req.user` is available for that route.  
If it’s missing or invalid, the user gets a `401 Unauthorized` response.

## SQL Injection / Query Injection Reminder

You’ve probably seen this before, but it’s worth repeating: **never** build SQL (or other query) strings by concatenating user input directly into the query.

###  Dangerous pattern (do NOT do this)

```js
// ❌ Vulnerable — string concatenation with user input
const result = await query(`SELECT * FROM users WHERE email = '${email}'`);
```

Why this is dangerous:
- If `email` contains malicious content (e.g. `a' OR '1'='1`), the query changes meaning and can return or manipulate data you didn’t intend to expose.
- Attackers can run arbitrary SQL commands, exfiltrate data, or even delete tables.
- This risk exists for any language/database combination that builds queries from raw strings.

### Use parameterized queries / prepared statements

Always pass user values as parameters to the database driver so the DB treats them as **data**, not SQL:

```js
// PostgreSQL (node-postgres / pg)
const result = await query("SELECT * FROM users WHERE email = $1", [email]);

// MySQL (example)
const [rows] = await connection.execute("SELECT * FROM users WHERE email = ?", [email]);
```

Why this is safe:
- The DB engine knows where SQL ends and data begins.
- Input is not interpreted as SQL even if it contains quotes or SQL keywords.
- Prepared statements are both safer and often faster for repeated queries.

### Use an ORM / query builder when possible

ORMs and query builders (Prisma, Knex, Sequelize, etc.) handle parameterization for you and reduce the chance of mistakes:

- **Prisma**: builds queries through a typed API — you rarely write raw SQL.
- **Knex**: query builder that parameterizes automatically when you pass values.
- **Sequelize / TypeORM**: higher-level APIs that avoid manual string building.

Even when using an ORM, **don’t** interpolate raw user input into `raw` queries unless you sanitize and parameterize them explicitly.


## Error Handling and Not Leaking Info

When something goes wrong, don’t send the full error to the client (it might have DB info).

Bad:

```js
res.status(500).json(err);
```

Better:

```js
console.error(err);
res.status(500).json({ message: "Something went wrong" });
```

You can even create an error-handling middleware:

```js
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Server error" });
});
```

## Putting It All Together

```js
import express from "express";
import "dotenv/config";
import cors from "cors";
import helmet from "helmet";
import jwt from "jsonwebtoken";

const app = express();
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const JWT_SECRET = process.env.JWT_SECRET || "change_this_in_prod";

// Basic middleware
app.use(express.json());
app.use(cors({ origin: FRONTEND_ORIGIN }));
app.use(helmet());

// Simple auth middleware (JWT in Authorization: "Bearer <token>")
function auth(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ message: "No token" });

  const token = header.split(" ")[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET); // { id, role, ... }
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// Routes
app.get("/health", (req, res) => res.json({ status: "ok" }));

app.get("/public", (req, res) => res.json({ message: "Public data" }));

app.get("/private", auth, (req, res) =>
  res.json({ message: "Private data", user: req.user })
);

// Minimal error handler (must come last)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Server error" });
});

app.listen(3000, () => console.log("API running on http://localhost:3000"));
```

## Final Security Guidelines for Express APIs

As your APIs start handling real data, security becomes just as important as functionality.  
A secure backend doesn’t happen by accident — it’s the result of deliberate layers of protection that work together.

### Core Security Practices

- **Authenticate and authorize every request.**  
  Use JWTs to identify users and control access to private routes. Authentication proves identity; authorization limits what that identity can do.

- **Protect your secrets.**  
  Keep credentials like database passwords and JWT keys in `.env` files, never in your code or GitHub repo.

- **Control who can talk to your API.**  
  Configure CORS to allow requests only from trusted frontends. Don’t leave it wide open with `"*"` in production.

- **Use Helmet for safe HTTP headers.**  
  It guards your app from browser-level attacks like XSS, clickjacking, and insecure content.

- **Validate every input.**  
  Don’t assume the frontend sends clean data. Check `req.body`, `req.params`, and `req.query` for required fields, proper types, and safe formats.

- **Hash passwords — never store them raw.**  
  Use `bcrypt.hash()` when saving, and `bcrypt.compare()` when logging in. Even if your database leaks, passwords remain unreadable.

- **Use parameterized queries or ORMs.**  
  Avoid SQL injection by never inserting user input directly into SQL strings. Use placeholders (`$1`, `?`) or query builders like Prisma or Knex.

- **Add middleware for structure and defense.**  
  Global layers like `express.json()`, `cors()`, and `helmet()` should always run before your routes. Use custom middleware for authentication and error handling.

- **Separate public and private endpoints.**  
  Keep open routes (like `/health`) simple, and protect sensitive ones with authentication middleware.

- **Handle errors gracefully.**  
  Don’t crash on bad input — respond with meaningful messages (`400`, `401`, `403`, etc.) and log details for debugging.

### 💡 Security Mindset

Think defensively:

- Assume clients can lie or make mistakes.  
- Assume data can be tampered with in transit.  
- Assume secrets will leak if you hardcode them.  
- Assume someone will test every route for weaknesses.

If you build your API with those assumptions in mind — validating input, protecting data, and verifying every request — you’ll have a backend that’s reliable, resilient, and secure enough for real-world use.
