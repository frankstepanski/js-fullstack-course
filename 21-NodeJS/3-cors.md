# CORS — Connecting Your Frontend to Your Backend

In the previous documents, you built a Node HTTP server and then converted it to Express. Everything worked fine when you tested routes in the browser or with Postman — because those tools make requests directly to the server with no restrictions.

But the moment you wire up a real frontend — a React app, for example — and try to call your Express API from it, you'll almost certainly see this in the browser console:

```
Access to fetch at 'http://localhost:3000/api/users' from origin 'http://localhost:5173'
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present.
```

Your server is running fine. Your code is correct. But the browser is blocking the request anyway.

This is **CORS** — and understanding it will save you a lot of frustration.

## Why Does CORS Exist?

Before learning how to fix CORS errors, it's worth understanding *why* the browser has this rule at all — because once you understand the reason, the whole thing makes sense.

Imagine you're logged into your online banking at `https://mybank.com`. Your browser has a session cookie stored for that site. Now imagine you visit a completely unrelated website — say, `https://sketchy-site.com`. Without any protection, that sketchy site could run JavaScript in the background that silently makes requests to `https://mybank.com/api/transfer-money` using your stored session cookie — without you ever knowing.

```
WITHOUT CORS PROTECTION
════════════════════════════════════════════════════════
  You visit sketchy-site.com
         │
         │  secretly runs this in the background:
         │  fetch("https://mybank.com/api/transfer", {
         │    method: "POST",
         │    body: { to: "hacker", amount: 10000 }
         │  })
         │
         ▼
  Your browser sends the request to mybank.com...
  ...with your session cookie attached automatically 🍪
         │
         ▼
  mybank.com processes the transfer  💸
  You never knew it happened
```

This attack is called **Cross-Site Request Forgery (CSRF)**. CORS is one of the browser's defences against it.

```
WITH CORS PROTECTION
════════════════════════════════════════════════════════
  You visit sketchy-site.com
         │
         │  tries to fetch("https://mybank.com/api/transfer")
         │
         ▼
  Browser checks: does mybank.com allow requests
  from sketchy-site.com?
         │
         │  No CORS header found on mybank.com's response
         │
         ▼
  ⛔ Browser BLOCKS the response
     sketchy-site.com never sees the data
     transfer never happens
```

So CORS is not there to annoy you — it's the browser protecting your users. The rule is simple: **a webpage can only read responses from a different origin if that other server explicitly says it's allowed.**

## What Is CORS?

**CORS (Cross-Origin Resource Sharing)** is a **browser security feature** that controls whether a web page can make requests to a different origin than the one it came from.

An **origin** is defined by three things. If *any one* of them is different, the browser considers it a different origin:

```
  https  ://  myapp.com  :  443
  ───┬──      ────┬────     ─┬─
     │             │          │
  protocol      domain      port
```

| URL A | URL B | Same Origin? | Why? |
|-------|-------|:---:|------|
| `http://localhost:5173` | `http://localhost:3000` | ❌ | Different port |
| `http://localhost:3000` | `https://localhost:3000` | ❌ | Different protocol |
| `https://myapp.com` | `https://api.myapp.com` | ❌ | Different subdomain |
| `https://myapp.com/page` | `https://myapp.com/other` | ✅ | Same protocol, domain, and port |

This is why your React dev server (`localhost:5173`) and your Express API (`localhost:3000`) — even running side by side on your laptop — are treated as separate origins by the browser. Different port = different origin.

## How CORS Actually Works

Here's the key thing to understand: **CORS errors happen in the browser, not on the server.**

Your API might be working perfectly. The server receives the request, processes it, and sends data back. But the browser intercepts that response and checks for a special header:

```
Access-Control-Allow-Origin: http://localhost:5173
```

If that header isn't there, the browser throws the response away and shows you a CORS error. Your JavaScript code never sees the data — even though the server sent it.

```
SAME-ORIGIN REQUEST (no CORS needed)
══════════════════════════════════════════════════════

  Browser                        Server
  localhost:3000                 localhost:3000
       │                              │
       │   GET /api/users             │
       │ ────────────────────────────►│
       │                              │
       │   200 OK  { data }           │
       │ ◄────────────────────────────│
       │                              │
  ✅ Same origin — browser allows it, no checks needed


CROSS-ORIGIN REQUEST (CORS required)
══════════════════════════════════════════════════════

  Browser                        Server
  localhost:5173                 localhost:3000
       │                              │
       │   GET /api/users             │
       │ ────────────────────────────►│
       │                              │  ← server responds normally
       │   200 OK  { data }           │
       │ ◄────────────────────────────│
       │                              │
       │  🔍 browser checks response for:
       │     Access-Control-Allow-Origin header
       │
       │  ❌ header not found
       │
       ⛔ browser BLOCKS the response
          your JavaScript never sees the data
          CORS error appears in the console
```

> 💡 **The fix lives on the server, not in your frontend code.** Even though the error appears in the browser, the solution is to make your server send the correct permission headers. Your React code doesn't change at all.

## What Is a Preflight Request?

For certain types of requests, the browser doesn't immediately send your actual request. It first sends a quick **preflight** — a separate `OPTIONS` request that asks the server for permission before sending the real thing.

Preflight happens when your request:
- Uses `POST`, `PUT`, or `DELETE`
- Includes custom headers like `Authorization` or `Content-Type: application/json`

```
PREFLIGHT FLOW
══════════════════════════════════════════════════════

  Browser                        Server
  localhost:5173                 localhost:3000
       │                              │
       │  1. OPTIONS /api/users       │  ← "can I send a POST here?"
       │     Origin: localhost:5173   │
       │ ────────────────────────────►│
       │                              │
       │  2. 200 OK                   │  ← "yes, here's what I allow"
       │     Access-Control-Allow-Origin: localhost:5173
       │     Access-Control-Allow-Methods: POST, GET, DELETE
       │ ◄────────────────────────────│
       │                              │
       │  3. POST /api/users          │  ← real request now sent
       │     { "name": "Alice" }      │
       │ ────────────────────────────►│
       │                              │
       │  4. 201 Created { ... }      │  ← real response
       │ ◄────────────────────────────│
```

If the server doesn't handle the `OPTIONS` preflight correctly, the browser never sends step 3 — and you get a CORS error, even if your `POST` route is perfectly written.

> 💡 **You don't need to handle this yourself.** The `cors` npm package handles preflight `OPTIONS` requests automatically. This is one of the main reasons to use it instead of setting headers manually.

## How to Fix CORS Errors

### In Plain Node (for context only — not recommended)

This section shows what CORS headers look like under the hood. In practice you should always use the `cors` npm package with Express — but seeing the raw headers helps you understand what that package is doing for you behind the scenes.

In a plain Node server, you'd manually add headers to every response:

```js
import http from "http";

const server = http.createServer((req, res) => {

  // CORS headers — must be set on every single response
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight requests manually
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    res.end();
    return;
  }

  if (req.method === "GET" && req.url === "/api/users") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify([{ id: 1, name: "Alice" }]));
  }
});

server.listen(3000);
```

What each header does:

| Header | What It Tells the Browser |
|--------|--------------------------|
| `Access-Control-Allow-Origin` | Which origins are allowed (`*` = everyone) |
| `Access-Control-Allow-Methods` | Which HTTP methods are allowed |
| `Access-Control-Allow-Headers` | Which request headers are allowed |

This works, but you have to repeat all of it on every single response — and handle the `OPTIONS` preflight yourself on every route. It's tedious and easy to get wrong, which is exactly why the `cors` package exists.

---

### With Express ✅ Recommended

The `cors` npm package is middleware that automatically sets all the right headers on every response and handles preflight `OPTIONS` requests for you. It's the standard way to handle CORS in Express.

#### Step 1 — Install

```bash
npm install cors
```

#### Step 2 — Add it to your server

```js
import express from "express";
import cors from "cors";

const app = express();

app.use(cors());         // ← handles all CORS headers + preflight automatically
app.use(express.json()); // ← parses JSON request bodies

app.get("/api/users", (req, res) => {
  res.json([{ id: 1, name: "Alice" }]);
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
```

That one line — `app.use(cors())` — replaces everything in the plain Node example above.

> 🚨 **`app.use(cors())` must come before your routes.** Express runs middleware top to bottom, so any route defined before `cors()` won't have the CORS headers applied to it and will still be blocked.

Here's how `cors()` fits into the middleware chain:

```
  Request from React (localhost:5173)
               │
               ▼
  ┌────────────────────────────┐
  │  cors()                    │  ← adds Access-Control-Allow-Origin
  │                            │     handles OPTIONS preflight
  └─────────────┬──────────────┘
                │ next()
                ▼
  ┌────────────────────────────┐
  │  express.json()            │  ← parses JSON body
  └─────────────┬──────────────┘
                │ next()
                ▼
  ┌────────────────────────────┐
  │  your routes               │  ← app.get(), app.post(), etc.
  └─────────────┬──────────────┘
                │
                ▼
       Response sent ✅
       browser sees the CORS header — allows it
```

Without `cors()` at the top, the response reaches the browser with no `Access-Control-Allow-Origin` header — and the browser blocks it before your React app ever sees the data.

## Configuring CORS for Different Situations

`app.use(cors())` with no options allows *all* origins — which is fine for development but too open for a real deployed app. Here's how to configure it for different situations.

### Allow a specific origin

```js
app.use(cors({
  origin: "http://localhost:5173"  // only this origin is allowed
}));
```

### Allow multiple origins

If your frontend runs on different URLs — for example, you want to allow both your local dev server and your deployed frontend:

```js
app.use(cors({
  origin: [
    "http://localhost:5173",    // local dev
    "https://myfrontend.com"   // production
  ]
}));
```

### Use an environment variable (the real-world pattern)

Hardcoding URLs works for now, but in real projects the allowed origin changes depending on where the app is deployed — your laptop vs a live server. The common approach is to read it from an **environment variable**.

You'll cover `.env` files fully in a later module, but here's the pattern so it's not surprising when you see it:

```
# .env file (never commit this to git)
ALLOWED_ORIGIN=http://localhost:5173
```

```js
// server.js
import "dotenv/config"; // loads .env into process.env

app.use(cors({
  origin: process.env.ALLOWED_ORIGIN
}));
```

Your local `.env` has `http://localhost:5173`. Your production server has `https://myfrontend.com`. Same code, different behaviour per environment — no hardcoded URLs to update when you deploy.

## Development vs Production — Quick Reference

| Situation | Recommended Setup |
|-----------|-------------------|
| Local dev, no auth | `app.use(cors())` — allow all origins |
| Local dev, with auth/cookies | `app.use(cors({ origin: "http://localhost:5173", credentials: true }))` |
| Production, public API | `app.use(cors())` — allow all origins is acceptable |
| Production, private API | `app.use(cors({ origin: "https://myfrontend.com" }))` |
| Production, with auth/cookies | `app.use(cors({ origin: "https://myfrontend.com", credentials: true }))` |
| Multiple environments | Use an array of origins or read from an environment variable |

> 💡 **A note on `credentials: true`:** Once you add authentication to your API — cookies, sessions, or `Authorization` header tokens — you'll need this extra setting to allow the browser to include them in cross-origin requests. You don't need it yet, and you should not add it until you do. We'll cover it fully when authentication is introduced.

## Common CORS Mistakes

| Mistake | What Happens | Fix |
|---------|--------------|-----|
| `cors()` placed after routes | Routes defined before it won't have CORS headers — still blocked | Always put `cors()` before your routes |
| Using `"*"` with `credentials: true` | Browser rejects it — credentials require a specific origin | Use an exact URL when credentials are enabled |
| Forgetting preflight handling | POST/PUT/DELETE fail even when GET works | Use the `cors()` package — it handles OPTIONS automatically |
| Hardcoding `localhost` in production | Real users get CORS errors | Use environment variables for the correct origin per environment |
| Thinking it's a server bug | Server is fine — the browser is enforcing the block | Check the browser console, not the server logs |
| Trying to fix CORS in frontend code | CORS is a server-side fix — your frontend code doesn't change | Add `cors()` to your Express server |

## Wrapping Up

CORS errors feel mysterious at first because your server code looks correct, your API is responding — but the browser is still blocking the request. Once you understand that the block happens in the browser, not the server, and that it exists to protect your users, it becomes a lot less confusing.

```
The short version
══════════════════════════════════════════════════════════════

  1. WHY IT EXISTS
     The browser blocks cross-origin requests by default
     to protect users from malicious sites making requests
     on their behalf without them knowing.

  2. WHAT TRIGGERS IT
     Your React app (localhost:5173) and your Express API
     (localhost:3000) are different origins — different port
     = different origin, even on the same machine.

  3. HOW TO FIX IT
     Your server sends permission headers.
     In Express:
       npm install cors
       app.use(cors())
     That's it.

  4. PREFLIGHT
     Browser sends an OPTIONS check before POST/PUT/DELETE.
     The cors package handles this automatically.

  5. IN PRODUCTION
     Replace app.use(cors()) with a specific origin.
     Never use "*" when handling cookies or auth tokens.
```

With CORS configured, your React app can now talk freely to your Express API.
