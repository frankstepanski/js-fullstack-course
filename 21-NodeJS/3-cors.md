# CORS — Connecting Your Frontend to Your Backend

In the previous documents, you built a Node HTTP server and then converted it to Express. Everything worked fine when you tested routes in the browser or with Postman — because those tools make requests directly to the server with no restrictions.

But the moment you wire up a real frontend — a React app, for example — and try to call your Express API from it, you'll almost certainly see this in the browser console:

```
Access to fetch at 'http://localhost:3000/api/users' from origin 'http://localhost:5173'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present.
```

Your server is running fine. Your code is correct. But the browser is blocking the request anyway.

This is **CORS** — and understanding it will save you a lot of frustration.

## What Is CORS?

**CORS (Cross-Origin Resource Sharing)** is a **browser security feature** that controls how web pages can request data from a different domain (or *origin*).

For example:  
If your frontend runs on  
```
http://localhost:5173
```  
and your backend API runs on  
```
http://localhost:3000
```  
then those are **two different origins** — even though they're on the same computer.

When your JavaScript (in the browser) tries to call the API, the browser first checks:  
> "Does the server allow requests from that origin?"

If not, it blocks the request for security reasons — that's a **CORS error**.

---

### What Makes Two URLs Different Origins?

An **origin** is defined by three things: the **protocol**, the **domain**, and the **port**. If any one of those is different, the browser considers it a different origin.

| URL A | URL B | Same Origin? |
|-------|-------|--------------|
| `http://localhost:5173` | `http://localhost:3000` | ❌ Different port |
| `http://localhost:3000` | `https://localhost:3000` | ❌ Different protocol |
| `https://myapp.com` | `https://api.myapp.com` | ❌ Different subdomain |
| `https://myapp.com` | `https://myapp.com` | ✅ Same origin |

This is why your React dev server and your Express API — even running side by side on your laptop — are treated as separate origins by the browser.

---

### Visualizing Same-Origin vs Cross-Origin

```
SAME-ORIGIN REQUEST (No CORS needed)
─────────────────────────────────────
  Browser                 Server
  localhost:3000          localhost:3000
       │                       │
       │  GET /api/users       │
       │ ─────────────────────►│
       │                       │
       │  200 OK + data        │
       │ ◄─────────────────────│
       │                       │
  ✅ Browser allows it — same origin


CROSS-ORIGIN REQUEST (CORS required)
─────────────────────────────────────
  Browser                 Server
  localhost:5173          localhost:3000
       │                       │
       │  GET /api/users       │
       │ ─────────────────────►│
       │                       │  Server responds,
       │  200 OK + data        │  but browser checks
       │ ◄─────────────────────│  for CORS headers...
       │                       │
       │  ⛔ No CORS header found
       │     Browser BLOCKS the response
       │     Frontend never sees the data
```

Notice something important in that second diagram: **the server actually responded**. The data made it back to the browser — but the browser refused to hand it to your JavaScript code because the server didn't include permission headers. The block happens on the browser side, not the server side.

## How Do CORS Errors Happen?

CORS errors happen **in the browser**, not on the server.  
Your API might be working perfectly — but the browser refuses to share the data with your frontend because of its strict cross-origin policy.

Common reasons:
- The server **didn't include CORS headers** like `Access-Control-Allow-Origin`.  
- The frontend is hosted on a **different port or domain** than the backend.  
- You're using a **POST, PUT, or DELETE** method that triggers a CORS "preflight" check, and the server didn't handle it properly.  

So even though your server is fine, the browser blocks your frontend's request and shows something like this in the console:

```
Access to fetch at 'http://localhost:3000/api/users' from origin 'http://localhost:5173' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present.
```

---

### Is CORS Common?

Yes — **extremely common** for developers building frontend + backend apps locally.  

Because your frontend (React, Vue, etc.) and backend (Node, Express, etc.) usually run on **different ports** during development, the browser treats them as separate origins — so you'll almost always encounter CORS errors until you explicitly allow access.

- The **browser** enforces CORS (that's where the error appears).  
- But the **server** must fix it — by sending the correct headers in its HTTP response.

Your Node API decides which origins can access it.  
If those headers are missing, the browser blocks the response before your frontend can even read it.

## What Is a Preflight Request?

You'll notice this mentioned in CORS error messages — and it's one of the most confusing parts for beginners.

For certain types of requests — anything using `POST`, `PUT`, or `DELETE`, or requests that include custom headers like `Authorization` — the browser doesn't immediately send your actual request. Instead, it first sends a **preflight request**: a quick `OPTIONS` request to the server that essentially asks:

> "Hey server, I'm about to send a `POST` to `/api/users` from `localhost:5173`. Are you okay with that?"

Only if the server responds with the correct CORS headers does the browser then send the real request.

```
PREFLIGHT FLOW (for POST, PUT, DELETE, or custom headers)
──────────────────────────────────────────────────────────

  Browser                         Server
  localhost:5173                  localhost:3000
       │                               │
       │  1. OPTIONS /api/users        │   ← preflight check
       │     Origin: localhost:5173    │
       │ ────────────────────────────► │
       │                               │
       │  2. 200 OK                    │   ← server says "yes, allowed"
       │     Access-Control-Allow-Origin: localhost:5173
       │     Access-Control-Allow-Methods: POST, GET...
       │ ◄──────────────────────────── │
       │                               │
       │  3. POST /api/users           │   ← real request now sent
       │     (with body + headers)     │
       │ ────────────────────────────► │
       │                               │
       │  4. 201 Created + data        │   ← real response
       │ ◄──────────────────────────── │
```

If the server doesn't handle the `OPTIONS` preflight correctly (i.e., doesn't respond with the right headers), the browser never sends step 3 — and you get a CORS error, even if your `POST` route is perfectly written.

This is another reason to use the `cors` npm package in Express rather than setting headers manually — it handles preflight `OPTIONS` requests automatically.

## How to Fix CORS Errors

You fix CORS errors by setting specific HTTP headers on your server to "grant permission" for requests coming from your frontend origin.

### In Plain Node (for context only — not recommended)

This section shows how CORS headers work under the hood. In practice, you should use the `cors` npm package with Express (shown next) — but seeing the raw headers helps you understand what that package is doing for you.

In a plain Node server, you can add headers manually:

```js
res.setHeader("Access-Control-Allow-Origin", "*"); // allow any frontend
res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");
```

✅ This works for local development because it allows all origins.  
🚫 But in production, you should replace `*` with your actual domain:

```js
res.setHeader("Access-Control-Allow-Origin", "https://myfrontend.com");
```

You'd also need to manually handle the `OPTIONS` preflight request for every route — which gets repetitive and easy to get wrong. That's exactly why the `cors` package exists.

---

### Using Express ✅ Recommended

When using Express, use the official `cors` middleware package instead of manually setting headers.

It automatically:
- Sets the correct CORS headers on every response
- Handles preflight (`OPTIONS`) requests
- Applies rules consistently across all routes

#### 1️⃣ Install the cors package first

```bash
npm install cors
```

#### 2️⃣ Enable It in Your Server

```js
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());        // ← allow all origins (good for development)
app.use(express.json()); // ← parse JSON request bodies

// your routes go here
app.get("/api/users", (req, res) => {
  res.json([{ id: 1, name: "Alice" }]);
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
```

This allows all origins (`*`) during development.

> ⚠️ **`app.use(cors())` must come before your routes** — just like `express.json()`. Since Express runs middleware top to bottom, any route defined before `cors()` won't have the CORS headers applied to it.

Here's where `cors()` fits in the Express middleware chain you learned about in the previous document:

```
  Incoming request from React (localhost:5173)
                │
                ▼
  ┌─────────────────────────┐
  │  cors()                 │  ← adds Access-Control-Allow-Origin header
  │  (runs first)           │    handles OPTIONS preflight automatically
  └────────────┬────────────┘
               │ next()
               ▼
  ┌─────────────────────────┐
  │  express.json()         │  ← parses JSON request body
  └────────────┬────────────┘
               │ next()
               ▼
  ┌─────────────────────────┐
  │  Your Routes            │  ← app.get(), app.post(), etc.
  │  app.get("/api/users")  │
  └────────────┬────────────┘
               │
               ▼
       Response sent to browser ✅
       (browser sees the CORS header — allows it)
```

Without `cors()` at the top, the response reaches the browser but has no `Access-Control-Allow-Origin` header — and the browser blocks it before your React app ever sees the data.

---

### Configuring Specific Origins

Instead of allowing all origins, specify the exact frontend URL:

```js
app.use(cors({
  origin: "http://localhost:5173"
}));
```

For production:

```js
app.use(cors({
  origin: "https://myfrontend.com"
}));
```

Avoid using `"*"` in production if your API handles sensitive data.

---

### Allowing Multiple Origins

If your frontend runs on different URLs — for example, you want to allow both your local dev server and your deployed frontend — you can pass an array:

```js
app.use(cors({
  origin: [
    "http://localhost:5173",       // local dev
    "https://myfrontend.com"       // production
  ]
}));
```

#### Using an Environment Variable (the real-world pattern)

Hardcoding URLs works for now, but the common real-world approach is to read the allowed origin from an **environment variable** — a value stored outside your code that changes depending on where the app is running (your laptop vs a live server).

You'll cover `.env` files fully in a later module, but here's a preview of the pattern so it's not surprising when you see it:

```js
// .env file (never commit this to git)
ALLOWED_ORIGIN=http://localhost:5173
```

```js
// server.js
import "dotenv/config"; // loads .env into process.env

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN  // reads from .env
}));
```

This way, your local `.env` has `ALLOWED_ORIGIN=http://localhost:5173`, and your production server has `ALLOWED_ORIGIN=https://myfrontend.com` — same code, different behavior per environment. No hardcoded URLs to update when you deploy.

---

### CORS and Credentials (Cookies / Auth Tokens)

Once you add authentication to your API — things like login sessions, cookies, or `Authorization` header tokens — you'll need an extra CORS setting (`credentials: true`) to allow the browser to include them in cross-origin requests. You don't need this yet, but it's worth knowing it exists. We'll come back to it in full when authentication is covered.

## Development vs Production — Quick Reference

| Situation | Recommended Setup |
|-----------|-------------------|
| Local dev, no auth | `app.use(cors())` — allow all origins |
| Local dev, with auth/cookies | `app.use(cors({ origin: "http://localhost:5173", credentials: true }))` |
| Production, public API | `app.use(cors())` — allow all origins is acceptable |
| Production, private API | `app.use(cors({ origin: "https://myfrontend.com" }))` |
| Production, with auth/cookies | `app.use(cors({ origin: "https://myfrontend.com", credentials: true }))` |
| Multiple environments | Use an array of origins or read from environment variables |

## Common CORS Mistakes

| Mistake | What Happens | Fix |
|---------|--------------|-----|
| `app.use(cors())` placed after routes | Routes defined before it won't have CORS headers — still blocked | Always put `cors()` before your routes |
| Using `"*"` with `credentials: true` | Browser rejects it — credentials require a specific origin | Use an exact URL when credentials are enabled |
| Only handling GET routes, forgetting OPTIONS | Preflight fails for POST/PUT/DELETE | Use `cors()` middleware — it handles OPTIONS automatically |
| Hardcoding `localhost` in production | Real users get CORS errors | Use environment variables to set the correct origin per environment |
| Thinking it's a server bug | Server is fine — the browser is enforcing the block | Check the browser console, not the server logs, for CORS errors |

## Wrapping Up

CORS errors feel mysterious at first because your server code looks correct, your API is responding — but the browser is still blocking the request. Once you understand that the block happens in the browser, not the server, it becomes a lot less confusing.

The short version of everything above:

1. **Browser security blocks cross-origin requests by default** — different ports count as different origins.
2. **The server fixes it by sending permission headers** — the `cors` npm package handles this for you in Express.
3. **Preflight requests are automatic** — the browser sends an `OPTIONS` check before POST/PUT/DELETE. The `cors` package handles these too.
4. **Be specific in production** — `"*"` is fine for development, but always lock down to your real domain before deploying.

With CORS configured, your React (or any frontend) app can now talk freely to your Express API.