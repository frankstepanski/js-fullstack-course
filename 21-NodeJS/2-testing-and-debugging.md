# Testing Your API

Once you’ve built your API, you have to prove it actually works — not just for `GET`, but for `POST`, `PUT`, and `DELETE` too. Different request types need different ways to test. Here’s the rundown.

## 1. with the Browser (GET only)

A browser can only **easily** send `GET` requests by typing a URL.

- Open: `http://localhost:3000/api/users`
- If your route is set up, you’ll see JSON in the browser.
- This is perfect for quick checks: “Is my server running?” “Is this GET route working?”

❗ But: the browser doesn’t let you easily send `POST`, `PUT`, or `DELETE` from the address bar — so we need other tools for that.

## 2. with `curl` (terminal)

[`curl`](https://curl.se/) is a command-line tool that can send HTTP requests. It’s great because it works on almost every machine and doesn’t need a UI.

### 💻 Availability

- On **macOS**, `curl` is included by default — just open **Terminal** and type:
  ```bash
  curl --version
  ```

- On **Windows 10 (version 1803 and later)**, `curl.exe` is also built-in and works in **Command Prompt** or **PowerShell**.

- On **older versions of Windows**, you may need to [install `curl` manually](https://curl.se/download.html), or use **Git Bash**, which comes with it preinstalled.



### 🟦 GET request
```bash
curl http://localhost:3000/api/users
```

### 🟨 POST request (send JSON)
```bash
curl -X POST http://localhost:3000/api/users   -H "Content-Type: application/json"   -d '{"name": "Alice", "email": "alice@example.com"}'
```

### 🟩 PUT request
```bash
curl -X PUT http://localhost:3000/api/users/1   -H "Content-Type: application/json"   -d '{"name": "Alice Updated"}'
```

### 🟥 DELETE request
```bash
curl -X DELETE http://localhost:3000/api/users/1
```

**How this works:**
- `-X` → which HTTP method to use  
- `-H` → HTTP header (tells the server what kind of data you’re sending)  
- `-d` → data (the request body)

This is the fastest way to test your API as you build it.

## 3. with Postman 

Postman is one of the most popular tools for testing and debugging APIs. It allows developers to send various types of HTTP requests (`GET`, `POST`, `PUT`, `DELETE`, etc.) and view the responses in a user-friendly interface. 

The tool can be used as a **desktop app** or a **web version** that runs in the browser.


| Feature | Desktop App | Web Version |
|----------|--------------|--------------|
| Installation required | ✅ Yes | ❌ No (just log in through a browser) |
| Access to local servers (`localhost`) | ✅ Full access | ⚠️ Limited unless using the Postman Desktop Agent |
| CORS restrictions | ❌ None | ⚠️ Requires the Postman Agent to bypass browser limitations |
| Works offline | ✅ Yes | ❌ Needs an internet connection |
| Sync across devices | ✅ Yes | ✅ Yes |
| Feature set | ✅ Full | ⚠️ Some advanced features limited |


>If you’re working on **local APIs** (like `http://localhost:3000`), use the **Desktop App** — it has full access to your computer’s network and doesn’t hit browser CORS limitations.  
If you want to **collaborate online or use Postman on any device**, the **Web Version** is great — just remember you’ll need to use the **Postman Agent** for local API testing.

1. **Open Postman**
   - Either open the web app or launch the desktop app.
   - Log in to sync your work or skip if just testing locally.

2. **Create a New Request**
   - Click **“+ New” → “Request”**.
   - Give it a name (e.g., `Get All Users`).
   - Save it inside a **Collection** (like a folder).

3. **Choose Your HTTP Method**
   - Use the dropdown next to the URL bar to select `GET`, `POST`, `PUT`, or `DELETE`.

4. **Enter Your API URL**
   ```
   http://localhost:3000/api/users
   ```

5. **Add a Request Body (if needed)**
   - For `POST` or `PUT`, click **Body → raw → JSON**, and enter:
     ```json
     {
       "name": "Alice",
       "email": "alice@example.com"
     }
     ```

6. **Add Headers (if necessary)**
   - Most of the time, you’ll want:
     | Header | Value |
     |---------|--------|
     | Content-Type | application/json |

7. **Send the Request**
   - Click **Send**. 
   - Watch the response appear in the bottom section.

### Viewing Results in Postman

Once you click **Send**, Postman displays:

- **Status Code** → tells you if it worked (e.g., `200 OK`, `201 Created`, `404 Not Found`).  
- **Response Body** → the data your API sent back (usually JSON).  
- **Response Headers** → info about the server, type of content, etc.  
- **Time and Size** → how long the request took and the response size.  
- **Console Logs** → available in the desktop version for detailed network info and debugging.

Example response:

```json
[
  { "id": 1, "name": "Alice" },
  { "id": 2, "name": "Bob" }
]
```
 
### 💾 Saving and Organizing Requests

Postman lets you save requests so you don’t have to retype them later.

1. Click **Save** after sending a request.  
2. Choose or create a **Collection** (like a folder).  
3. Group related routes together (`GET /users`, `POST /users`, `DELETE /users/:id`).  
4. You can come back later to rerun or edit any request.  

💡 **Tip:** Collections make it easy to organize endpoints for large projects.

### Why Use Postman?

- Works for **all HTTP methods** (GET, POST, PUT, DELETE).  
- Visual interface — no command-line syntax needed.  
- Saves and organizes tests for future use.  
- Supports **authentication**, **variables**, and **scripts**.  
- Syncs between computers automatically (if logged in).  

Postman is ideal for both beginners and advanced developers. Once you start testing APIs regularly, it becomes one of your most essential tools.

## 4. with Building a Frontend App

You’ve already built frontend applications in **React** and **JavaScript** that communicate with REST APIs, so this approach should feel familiar — although it’s the most time‑intensive way to test your backend.

In a **full‑stack development workflow**, the frontend and backend are often built **in parallel**:

- When working as part of a **team**, frontend developers usually begin integrating with the API as it’s being developed.
- When working **independently**, it’s common to start building the frontend once the key backend routes and main functionality are complete.

In practice, developers use **curl** and **Postman** for quick, incremental testing while the backend is under development. The frontend then evolves alongside the finished routes, serving as the final validation that the entire stack — from database to user interface — is functioning correctly.

# 🐞 Debugging Your HTTP API

Once your API is up and running, you’ll eventually run into problems — and that’s completely normal.  
**Debugging** is the process of identifying what went wrong and fixing it. It’s not just about finding syntax errors, but understanding *why* something didn’t work the way you expected.

## Difference Between Testing and Debugging

Testing and debugging often happen **almost at the same time** in API development.  

When you’re **testing**, you’re checking if your routes and endpoints behave as expected — for example, does `/api/users` return data? Does `/api/users` with a `POST` create a new record?  

If it doesn’t behave correctly, that’s when you start **debugging** — figuring out *why* it failed. The two processes work together in a continuous loop:

```
1️⃣ Write or update an API route  
2️⃣ Test it (Postman / curl / browser / frontend)  
3️⃣ If it fails → Debug it  
4️⃣ Fix → Retest → Repeat
```

| Concept | Purpose | Typical Tools |
|----------|----------|----------------|
| **Testing** | Checks if the API behaves correctly (valid routes, correct data, etc.) | Browser, Postman, curl |
| **Debugging** | Fixes issues when the API doesn’t work as expected | Terminal logs, console messages, nodemon |

**In short:** Testing tells you *that* something is broken. Debugging tells you *why* it’s broken.  
They go hand-in-hand during API development — you test, debug, and test again until everything works as expected.

## 1. Use Logs to Trace What’s Happening

The simplest but most powerful debugging tool is the **log**. Use `console.log()` and `console.error()` to see what your code is doing.

Example:

```js
import http from "http";

const server = http.createServer((req, res) => {
  console.log("Incoming request:", req.method, req.url); // logs every request

  if (req.url === "/api/users") {
    console.log("Fetching users...");
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify([{ id: 1, name: "Alice" }]));
  } else {
    console.error("Route not found:", req.url);
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Not Found" }));
  }
});

server.listen(3000, () => console.log("Server running on http://localhost:3000"));
```

Use `console.log()` for normal flow and `console.error()` when catching issues.

✅ **Pro tip:** Add timestamps or colors (with libraries like `chalk`) for cleaner logs in larger apps.

---

## 2. Restarting and Watching the Server

When you edit code, Node doesn’t reload automatically — you have to restart your server manually with:

```bash
node server.js
```

To speed up the process, use **nodemon**, which restarts automatically:

```bash
npm install -g nodemon
nodemon server.js
```

Now every time you save a change, the server restarts — so you can debug and test faster.

---

## 3. Common API Errors and Fixes

| Error | What It Means | How to Fix |
|--------|----------------|-------------|
| `EADDRINUSE: Address already in use` | The port (e.g., 3000) is already being used by another app | Stop the old process or use another port |
| `SyntaxError: Unexpected token` | Invalid JSON or typo in code | Check your JSON formatting or syntax |
| `Cannot read property 'x' of undefined` | You tried to access something that doesn’t exist | Log your variables to see what’s missing |
| `CORS error` | The browser blocked your frontend from calling your API | Add CORS headers or use a proxy |
| `ECONNREFUSED` | The API or database isn’t running | Start your server or check the connection URL |

---

## 4. Fixing CORS Issues

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
then those are **two different origins** — even though they’re on the same computer.  

When your JavaScript (in the browser) tries to call the API, the browser first checks:  
> “Does the server allow requests from that origin?”  

If not, it blocks the request for security reasons — that’s a **CORS error**.

---
### How Do CORS Errors Happen?

CORS errors happen **in the browser**, not on the server.  
Your API might be working perfectly — but the browser refuses to share the data with your frontend because of its strict cross-origin policy.

Common reasons:
- The server **didn’t include CORS headers** like `Access-Control-Allow-Origin`.  
- The frontend is hosted on a **different port or domain** than the backend.  
- You’re using a **POST, PUT, or DELETE** method that triggers a CORS “preflight” check, and the server didn’t handle it properly.  

So even though your server is fine, the browser blocks your frontend’s request and shows something like this in the console:

```
Access to fetch at 'http://localhost:3000/api/users' from origin 'http://localhost:5173' 
has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present.
```

---
### Is CORS Common?

Yes — **extremely common** for developers building frontend + backend apps locally.  

Because your frontend (React, Vue, etc.) and backend (Node, Express, etc.) usually run on **different ports** during development, the browser treats them as separate origins — so you’ll almost always encounter CORS errors until you explicitly allow access.

- The **browser** enforces CORS (that’s where the error appears).  
- But the **server** must fix it — by sending the correct headers in its HTTP response.

Your Node API decides which origins can access it.  
If those headers are missing, the browser blocks the response before your frontend can even read it.

---
### How to Fix CORS Errors

You fix CORS errors by setting specific HTTP headers on your server to “grant permission” for requests coming from your frontend origin.

In a plain Node server, you can add:

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

## 5. Check HTTP Status Codes

Every HTTP response includes a **status code**, which tells the client (like your React app or Postman) what happened when it sent a request to the server.

These codes are divided into **groups**, each representing a different type of outcome:

| Range | Category | Meaning |
|--------|-----------|----------|
| `1xx` | Informational | Request received, still processing |
| `2xx` | Success | Request completed successfully |
| `3xx` | Redirection | The client needs to go somewhere else |
| `4xx` | Client Error | Something wrong with the request |
| `5xx` | Server Error | The server failed to handle the request |

### ✅ 2xx: Success Codes

| Code | Meaning | When to Use | Example |
|------|----------|-------------|----------|
| `200 OK` | The request succeeded and returned what was expected | Most GET requests | `GET /api/users` returns a list of users |
| `201 Created` | A new resource was created successfully | When using POST | `POST /api/users` adds a new user and returns it |
| `204 No Content` | Request succeeded, but there’s nothing to return | When deleting or updating something | `DELETE /api/users/5` succeeds but has no data to send back |

---

### 🔄 3xx: Redirection Codes

| Code | Meaning | When It Happens | Example |
|------|----------|-----------------|----------|
| `301 Moved Permanently` | The resource has been moved to a new URL | URL structure changed permanently | `/old-page → /new-page` |
| `302 Found` | Temporary redirect to another URL | Used for temporary moves | Redirecting `/login` to `/dashboard` after login |
| `304 Not Modified` | The client already has the latest version of the resource | Used with caching to save bandwidth | A browser reuses its cached data instead of downloading again |

💡 **Why 304 matters:**  

When your browser (or frontend) makes a request, it may include a cache header like `If-Modified-Since`. If the data on the server hasn’t changed, the server replies with **304** — “Not modified.”  
This is **normal** and good! It means no new data needed to be downloaded.

---

### ⚠️ 4xx: Client Error Codes

These indicate the **client made a mistake** — either in how it sent data, what URL it requested, or what it tried to do.

| Code | Meaning | When to Use | Common Cause |
|------|----------|-------------|---------------|
| `400 Bad Request` | The request was malformed or missing data | Invalid JSON or missing required fields | Client forgot a required property like `name` or `email` |
| `401 Unauthorized` | Client didn’t provide valid credentials | No or invalid authentication token | Requesting a private route without logging in |
| `403 Forbidden` | Client is authenticated but doesn’t have permission | Trying to access restricted data | A normal user trying to reach an admin route |
| `404 Not Found` | The route or resource doesn’t exist | The URL path is wrong | Typo in `/api/user` instead of `/api/users` |

💡 **Common 400 & 404 scenarios:**
- You forget to send `Content-Type: application/json` in a POST request → `400 Bad Request`
- Your frontend requests `/api/items` but your backend only defines `/api/products` → `404 Not Found`

---

### 💥 5xx: Server Error Codes

These mean **something broke on the backend** — usually not the client’s fault.

| Code | Meaning | When to Use | Common Cause |
|------|----------|-------------|---------------|
| `500 Internal Server Error` | Generic catch-all for server crashes | Uncaught exceptions | Missing try/catch or invalid variable reference |
| `502 Bad Gateway` | One server got a bad response from another | Server-to-server issue | If Node connects to a broken microservice |
| `503 Service Unavailable` | Server is temporarily overloaded or down | Maintenance or downtime | When APIs crash or are updating |
| `504 Gateway Timeout` | Server took too long to respond | Database or external API delay | Slow database query or unresponsive external API |

💡 **Why 5xx codes matter:**  
They often reveal backend logic problems, unhandled async errors, or server overload.  
For example, forgetting to `res.end()` a response or an async function throwing an error without a `try/catch` will result in a `500`.

---

### How to Use These Codes When Building or Debugging

1. **Always send the right status code** — It helps your frontend and API clients handle responses correctly.  
   ```js
   res.writeHead(400);
   res.end(JSON.stringify({ error: "Missing required field" }));
   ```

2. **Don’t use `200` for everything** — It hides real problems and makes debugging harder.  

3. **Use logs and tools like Postman** to confirm what code your server is returning.  

4. **During debugging**, start by reading the response status:  
   - If it’s `4xx` → problem with request.  
   - If it’s `5xx` → problem in your server code.

## 6. Test Frequently

Don’t wait until your API is finished — test after each small change.  
It’s easier to debug one broken route than a dozen.

Example workflow:
1. Add one route (e.g., `/api/users`)
2. Test with Postman or curl  
3. Log the results in your terminal  
4. Fix any issues, then move on

Debugging is like detective work — observe, test, and refine until it all works smoothly.