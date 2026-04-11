# Creating an HTTP Server in Node.js 

### What Is a Server?

At the most basic level, a **server** is any computer or program that provides a service to another computer or program (called a *client*).  
It's part of the **client–server model**, the foundation of almost everything on the internet.

- When you open a website, your **browser** (client) sends a request to a **server** somewhere on the internet.  
- That server processes your request and **responds** with something — usually HTML, CSS, JavaScript, or JSON data.  
- Your browser then takes that data and renders the page you see.

### Servers in the Real World

Servers come in many forms and serve different purposes:

- **Web servers (HTTP)** — send websites and API responses (e.g., Apache, Nginx, Node.js).  
- **Database servers** — store and manage data (e.g., MySQL, PostgreSQL, MongoDB).  
- **Mail servers** — handle sending and receiving emails.  
- **File servers** — store and share files across a network.  
- **Game servers** — manage multiplayer sessions and game data.

Even your laptop can act as a "server" if you run a program that listens for requests — it doesn't have to be a big data center in the cloud.

### What Does a Server Actually Do?

In simple terms, a server:

1. **Listens for incoming connections** (on a specific network port).  
2. **Receives a request** — like "send me this web page" or "give me this data."  
3. **Processes the request** — possibly reading files, running logic, or querying a database.  
4. **Sends a response back** — often text, HTML, JSON, or a file.  
5. **Waits for the next request** — and does it all over again.

### A Server Stays Running All the Time

Servers don't know when a request will come, so they must stay online continuously.

If a web server went offline, users wouldn't be able to access your website or API.  
That's why large companies like Google, Netflix, and GitHub keep **thousands of servers** running 24/7 across multiple data centers around the world — so users always get a fast and reliable response.

Because the server's job is to **respond whenever a client sends a request**.

So servers stay running so that at **any time** the browser (or another app) can talk to it.

Think of it like a person answering phones — if they go home, no calls get answered.

## What Is an HTTP Server?

An **HTTP server** is a specific kind of server that speaks the **HTTP protocol**, which is the language of the web.

These are the servers you interact with every day —
when you open a website in your browser, or when your React or JavaScript frontend sends a request to an API using fetch().
Whenever you make a GET, POST, PUT, or DELETE request, it's the HTTP server on the other end receiving that request, processing it, and sending a response back.

Think of it like this:

| Type | Description | Example |
|------|--------------|----------|
| **Server (general)** | Any program that listens for requests and responds with data. Could be about files, games, or databases. | A chat server, game server, or database server |
| **HTTP Server** | A server that speaks the HTTP protocol, used by browsers and APIs to send and receive data over the web. | Node's `http` module, Apache, Nginx, Express |

When you visit a website, your browser sends an **HTTP request** like this:

```
GET /about HTTP/1.1
Host: example.com
```

An **HTTP server** knows how to read that request, figure out what the browser wants, and send an **HTTP response** back:

```
HTTP/1.1 200 OK
Content-Type: text/html

<html>
  <body>Hello world!</body>
</html>
```

So, while every HTTP server *is* a server, not every server *speaks HTTP*.  
Some use other protocols like FTP (for file transfers), SMTP (for email), or WebSockets (for live chat).

---

### Creating a Node.js HTTP Server

In Node.js, you can build a server with just a few lines of JavaScript.  

Instead of needing to install and configure large software systems like Apache or Nginx, you can use Node's built-in `http` module to handle requests and responses yourself.

This gives you full control — you can decide exactly what happens when a request comes in, what data gets returned, and how your server behaves.

That's what makes Node.js so powerful: it brings the same JavaScript logic you already know from the frontend into the **backend world**, allowing you to create lightweight, fast, and flexible web servers.

### How Does It Run?

When you write a Node HTTP server, you do something like:

```js
import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from Node!");
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

Then you run:

```bash
node server.js
```

Now that file keeps running — it **doesn't exit** like a normal script — because the server is **waiting for requests**.

---

### ⚠️ Watch Out: "Port Already in Use"

Because your server keeps running until you stop it, it's easy to accidentally run multiple instances at the same time. If you start the server twice, or your terminal crashes and you restart without stopping the original process, you'll see:

```
Error: listen EADDRINUSE: address already in use :::3000
```

Only **one process at a time** can hold a port. The fix is to find whatever's holding port 3000 and kill it.

---

#### Option 1: Just press `Ctrl + C`

Go back to the terminal where your server is running and press **`Ctrl + C`**. This shuts it down cleanly and frees the port immediately. This is almost always the quickest fix.

---

#### Option 2: Terminal Commands

| Task | Mac | Windows |
|------|-----|---------|
| Find what's using a port | `lsof -i :3000` | `netstat -ano \| findstr :3000` |
| Stop a process by PID | `kill <PID>` | `taskkill /PID <PID> /F` |
| Force stop a process | `kill -9 <PID>` | `taskkill /PID <PID> /F` |
| One-command shortcut | `npx kill-port 3000` | `npx kill-port 3000` |

---

#### Option 3: GUI Tools

If you prefer not to use the terminal, these tools let you find and kill processes visually:

| Tool | Platform | What It Does |
|------|----------|--------------|
| **Activity Monitor** | Mac (built-in) | Search for "node", select it, and click the ✕ button to stop it |
| **Task Manager** | Windows (built-in) | Open with `Ctrl + Shift + Esc`, find "node.js", right-click → End Task |
| **VS Code** | Mac & Windows | Open the Terminal panel — any running server shows there. Click the trash icon to kill it |
| **Process Explorer** | Windows | More detailed than Task Manager — lets you search by port or process name |
| **Later** | Mac | A lightweight app for viewing and killing processes by name or port |

---

### What Is It Listening To?

It's listening to **a port** on your computer or server.

- A **port** is like a numbered door that lets network traffic in and out.  
- Common ports: `80` (HTTP), `443` (HTTPS), `3000/4000` (local development).  
- When you say `server.listen(3000)`, you're telling Node:  
  "Open door #3000 and wait for incoming HTTP requests."

Then, when you go to `http://localhost:3000` in your browser, your browser sends a request to that port, and your Node server sees it.

### What's Happening When It Is "Running"?

When the server is running, Node is basically doing this:

1. "I'm listening on port 3000."  
2. "Did someone send me an HTTP request?"  
3. "If yes, run the callback you gave me (`createServer((req, res) => { ... })`)."  
4. "Send back a response."  
5. "Go back to listening."  

So it's not doing work constantly — it's **waiting** most of the time. That's why this works well with Node's event loop.  


## Adding a HTTP REST API

Now that you've built a basic Node server, the next step is to make it **useful** — by adding an **HTTP REST API** on top of it.

A **REST API** (short for **Representational State Transfer**) is a way for different programs — like your frontend app and your server — to talk to each other over the web using HTTP.

### What a REST API Actually Is

At a **technical level**, a REST API is a **design pattern** — a way of structuring how clients and servers communicate using the HTTP protocol.  
It defines how resources (like `/users` or `/posts`) should be represented and manipulated using **HTTP methods** (`GET`, `POST`, `PUT`, `DELETE`).

At a **code level**, a REST API is implemented as a **collection of functions** — each one handling a specific route and method.  
Each function decides what to do when a client sends a request, such as fetching data, saving data, or deleting something in a database.

Think of it like a shared agreement between client and server:
- **Frontend (client):** "Hey server, I'd like to get a list of users."  
- **Backend (server):** "Got it — here's the data you asked for in JSON format."

Each request follows standard **HTTP rules**, and data is usually exchanged as JSON (JavaScript Object Notation).

### What Is a Route?

When you build an API, a **route** (sometimes called an **endpoint**) is like an **address** or **doorway** on your server that your frontend can knock on to ask for data or perform an action.

If you think of your Node server as a big office building:
- Each **route** is a different **office room** inside it.
- Each room handles one type of request — one for users, one for posts, one for messages, etc.
- When someone "visits" a room (by going to a certain URL), your server runs the code that belongs to that route.

### Example: A Simple API with Routes

| Route | Method | What It Does |
|--------|----------|-------------|
| `/api/users` | `GET` | Returns a list of all users |
| `/api/users/1` | `GET` | Returns information about a single user (ID 1) |
| `/api/users` | `POST` | Creates a new user in the database |
| `/api/users/1` | `PUT` | Updates the user with ID 1 |
| `/api/users/1` | `DELETE` | Deletes the user with ID 1 |

Each route corresponds to one **task** or **piece of data** your app can handle.

> 💡 **Why `/api/` at the start?**  
> The `/api/` prefix is a convention, not a requirement. It signals to anyone reading the URL — developers, tools, or other services — that this address returns **data** (usually JSON), not an HTML page.  
> For example, if your app also serves a frontend, you'd have:
> - `/` → your React/HTML frontend page  
> - `/api/users` → your backend API returning JSON data  
>
> It keeps your routes organized and avoids confusion between "pages" and "data endpoints."

---

### HTTP Rules

**HTTP (HyperText Transfer Protocol)** defines how browsers, servers, and applications communicate on the web.  
It's a standardized set of rules that ensures all clients and servers "speak the same language."

HTTP is the **bridge** between your browser (frontend) and your server (backend). Every time you load a webpage, click a button, or submit a form, your app is sending an **HTTP request** to a server — and the server responds with an **HTTP response** that tells the browser what to do next.

Here's a breakdown of the four most important HTTP rules and concepts:

---

#### 1. HTTP Methods

Every HTTP request includes a **method** — a word that describes the *intent* of the request. Think of it as the verb that tells the server what action to perform.

| Method | Intent | Example |
|--------|--------|---------|
| `GET` | Retrieve data — don't change anything | Fetch a list of users |
| `POST` | Send new data to create something | Register a new user |
| `PUT` | Send updated data to replace something | Edit a user's profile |
| `DELETE` | Remove something | Delete a user account |

You'll see exactly how these pair with routes in the next section.

---

#### 2. Status Codes

Every HTTP **response** includes a **status code** — a 3-digit number that tells the client what happened on the server. You'll use these constantly when building APIs.

| Code | Name | What It Means |
|------|------|---------------|
| `200` | OK | Request succeeded — here's your data |
| `201` | Created | A new resource was successfully created (used for POST) |
| `204` | No Content | Success, but nothing to return (common after DELETE) |
| `400` | Bad Request | The client sent invalid or missing data |
| `401` | Unauthorized | Not logged in / no auth token provided |
| `403` | Forbidden | Logged in but not allowed to do this action |
| `404` | Not Found | That route or resource doesn't exist |
| `500` | Internal Server Error | Something broke on the server side |

Choosing the right status code matters. Sending `200` when something actually failed, for example, can cause confusing bugs on the frontend that are hard to track down.

---

#### 3. Headers

**Headers** are metadata that travel alongside every HTTP request and response. They don't contain your main data — they describe *what kind of data* is being sent, *who's sending it*, and *how the receiver should handle it*.

The most important header for REST APIs is `Content-Type: application/json` — it tells the receiver: "the body of this message is JSON, please parse it that way."

You've already seen this used in Node code:

```js
res.setHeader("Content-Type", "application/json");
```

Other common headers you'll encounter as you go deeper:

| Header | Purpose |
|--------|---------|
| `Content-Type` | Describes the format of the data being sent (`application/json`, `text/html`, etc.) |
| `Authorization` | Carries auth tokens so the server knows who's making the request |
| `Accept` | Tells the server what format the client can handle in return |
| `Content-Length` | The size of the request or response body in bytes |

---

#### 4. Statelessness

One of the fundamental rules of HTTP is that it is **stateless** — meaning the server does **not** remember anything about a previous request.

Every request your frontend sends is treated as completely new and independent. The server has no memory of what you asked for a second ago.

```
Request 1:  GET /api/users       → Server responds, then forgets it happened
Request 2:  GET /api/users/1     → Server has no idea Request 1 ever occurred
```

This is why things like **auth tokens** exist. Since the server forgets who you are after every request, you have to re-identify yourself each time by including a token in the `Authorization` header. The server reads it, verifies it, and then processes your request.

---

### How This Relates to Frontend Code

When you worked with **React** or **JavaScript** on the frontend, you already interacted with routes — even if you didn't realize it.  

For example:

```js
fetch("https://api.example.com/api/users")
  .then(res => res.json())
  .then(data => console.log(data));
```

Here's what's happening:
- Your browser (client) is sending an **HTTP GET request** to the server.
- The server receives it on the `/api/users` **route**.
- The function attached to that route runs and sends back some JSON data.
- Your frontend app receives that data and displays it on the page.

So that line of code is literally you "knocking" on the `/api/users` door of someone's server to get information back.

---

### Routes + Methods = Communication System

Routes work hand-in-hand with HTTP methods like `GET`, `POST`, `PUT`, and `DELETE`.  
Together, they form the rules for **how the frontend and backend talk to each other**.

Every time you send one of these requests from your frontend, your server looks at:
1. The **route path** (`/api/users`, `/api/products`, etc.)  
2. The **method type** (`GET`, `POST`, etc.)  
3. Then decides which code to run in response.


### How Routes Work with the Server

Every route your server supports is defined in your Node code. For example:

```js
if (req.method === "GET" && req.url === "/api/users") {
  // respond with list of users
}
```

When the server receives a request:
1. It checks the **method** (`GET`, `POST`, etc.).
2. It checks the **path** (`/api/users`, `/api/products`, etc.).
3. It decides what logic to run for that route.
4. It sends a response back (usually JSON).

The **frontend** (your React or JavaScript app) is just the **client** sending these requests — the **Node API** is what processes them.

Here's a visual overview of how a request travels from browser to server and back:

```
BROWSER (Frontend)
       │
       │  fetch("/api/users")
       │  HTTP GET /api/users
       ▼
  ─────────────────────────────────────
       │  Node.js Server (port 3000)
       │
       ├─ Is method GET?         ✅
       ├─ Is path /api/users?    ✅
       │
       ▼
  Run matching route handler
       │
       │  res.end(JSON.stringify(users))
       │  HTTP 200 OK
       ▼
BROWSER (Frontend)
  receives JSON → renders data on the page
```


## Extending the Server You Already Built

You already created a simple HTTP server that listens for requests on a specific port (like 3000).  
Now we'll **add logic** so it can handle real API routes.

A quick refresher of your basic server:

```js
import http from "http";

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("Hello from Node!");
});

server.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
```

This server listens for connections — but it doesn't yet know *what to do* with specific URLs like `/api/users` or `/api/products`.  
That's what we're about to fix.

## Adding API Routes

We'll use simple `if` statements to check both the **method** (GET, POST, etc.) and the **URL path**.  

```js
import http from "http";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url === "/api/users") {
    const users = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];
    res.writeHead(200);
    res.end(JSON.stringify(users));
  } else if (req.method === "POST" && req.url === "/api/users") {
    res.writeHead(201);
    res.end(JSON.stringify({ message: "New user created!" }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(3000, () => {
  console.log("✅ API server running at http://localhost:3000");
});
```

When you run this server and visit `http://localhost:3000/api/users` in your browser, here's what happens:

1. Your browser sends an **HTTP GET request** to `/api/users`.
2. Node checks the request's `method` and `url`.
3. The code inside the matching `if` block runs.
4. The server sends back a **JSON response** with the right `Content-Type`.
5. The browser (or your frontend app) displays or processes that data.

It's the same request–response flow you used on the frontend — but now you're controlling the other side.

> ⚠️ **Browsers can only send GET requests.** Typing a URL into your browser or clicking a link will always be a GET. To test POST, PUT, or DELETE routes you'll need a tool like **Postman**, **Insomnia**, or the **Thunder Client** extension in VS Code — these let you choose the method, set headers, and send a body.

### What is `http.createServer(...)`?

- `createServer(...)` tells Node: **"Whenever someone makes an HTTP request, run this function."**
- The function `(req, res) => { ... }` is called the **request handler** — it runs **for every single request** your server receives.

So in plain English:  
> "Make a web server, and every time a browser or app sends a request, handle it using this code."

### What are `req` and `res`?

When Node receives a request, it automatically gives your handler two objects:

### `req` (Request)
Represents **what the client sent**. It contains details such as:
- `req.method` → The HTTP method (`"GET"`, `"POST"`, `"PUT"`, `"DELETE"`, etc.)
- `req.url` → The path requested (`"/api/users"`, `"/api/users/1"`, etc.)
- `req.headers` → Metadata like `Content-Type` or authentication tokens
- `req.on("data")` → Streams data when someone sends a body (e.g., JSON from a POST request)

### `res` (Response)
Represents **what you send back** to the client.  
You use it to:
- Set headers (e.g., content type)
- Send a status code (e.g., 200, 404, 500)
- Return data (like text or JSON)
- End the response

### What Does `res.writeHead(...)` Do?

This method sets the **HTTP status code** (and optionally some headers) for the response.  

Examples:
- `res.writeHead(200)` → Everything worked fine
- `res.writeHead(201)` → Resource successfully created
- `res.writeHead(404)` → Resource not found

You can also pass custom headers here, but we usually set them with `setHeader()` first.

### What Does `res.end(...)` Do?

This is the **final step** in sending your response.  
It means: "Here's my data — I'm done!"  

Whatever you pass into `res.end()` becomes the **body of the response**.

Example:
```js
res.end(JSON.stringify(users));
```
That sends back your data in JSON format to whoever made the request.

If you forget `res.end()`, the browser will keep waiting forever — the request never "finishes."

### Why Do We Check `req.method` and `req.url`?

Because in plain Node, there's no built-in "router" like Express.  
You manually check which method (GET, POST, etc.) and which path (`/api/users`, `/api/users/1`) was requested.

```js
if (req.method === "GET" && req.url === "/api/users") {
  // handle GET
}
```

This is the manual version of what you'll later do with Express:
```js
app.get("/api/users", (req, res) => { ... });
```

---

### What Happens When You Visit `http://localhost:3000/api/users`?

1. Your browser sends an **HTTP GET request** to your Node server.  
2. Node receives it and runs your `(req, res)` function.  
3. Your code checks the method and URL.  
4. It matches `/api/users`, so it runs that block.  
5. The server sets a header and status, then sends JSON back.  
6. The browser or frontend app receives and displays the response.

So, in short:

> **Frontend asks → Server listens → Node responds → Connection closes.**

---

This small piece of code is the foundation for everything you'll build in Node.  
When you add more features (like reading POST data, handling files, or connecting to databases), it all still runs through these same `req` and `res` objects.

## Handling Request Data (JSON, Query Params, and Files)

When you build a frontend app, you usually just send a request using `fetch()` and expect to get some data back — maybe a list of users, products, or comments. But what actually happens on the other side — on the **server** — is a lot more work than it looks.

Behind the scenes, the server has to:

1. **Receive the request** — it listens for incoming messages from the browser or frontend app.  
   When your code calls `fetch("/api/users")`, the server sees that message and figures out *which part* of the code should handle it.

2. **Read and understand the data** — if the request includes information (like form data or JSON), the server needs to read it, convert it into usable JavaScript objects, and make sure it's valid.

3. **Verify and process the data** — before saving or using it, the server might check things like:  
   - Is the data formatted correctly?  
   - Are all the required fields there?  
   - Does this user have permission to make this request?

4. **Find or create the right data** — sometimes the client asks for something specific (like `/api/users/5`).  
   The server must locate that exact piece of data — whether it's in a file, a database, or memory.

5. **Send back the correct response** — finally, the server prepares a reply — usually in JSON format — and sends it back to the browser.  

So, while frontend developers focus on *asking* for data, backend servers are responsible for *understanding, verifying, and responding* with the right information — reliably, securely, and in the correct format every single time.

---

### 1. Reading JSON Data from the Request Body

When a client sends data (for example, using `fetch()` in a React app), it sends it as a **stream of bytes** — not as a complete object. Node handles this stream using **events**.

```
FRONTEND (Browser)
                               │
                               │  HTTP POST /api/users
                               │  Content-Type: application/json
                               ▼
                         BACKEND (Node.js)
                               │
                               ▼
                    ┌─────────────────────┐
                    │   req.on("data")    │  Receive chunks
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │  body += chunk      │  Build the string
                    │  .toString()        │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   req.on("end")     │  All chunks received
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   JSON.parse(body)  │  Now a JS object ✅
                    └──────────┬──────────┘
                               │
                               │  HTTP 201 Created
                               │  { message: "User created", user: data }
                               ▼
                         FRONTEND (Browser)
```

Here's how you read it manually:

```js
import http from "http";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "POST" && req.url === "/api/users") {
    let body = "";

    // Listen for data chunks
    req.on("data", chunk => {
      body += chunk.toString();
    });

    // When all data is received
    req.on("end", () => {
      const data = JSON.parse(body);
      console.log("✅ Received:", data);

      res.writeHead(201);
      res.end(JSON.stringify({ message: "User created", user: data }));
    });
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(3000, () => console.log("🚀 Server running at http://localhost:3000"));
```

#### How It Works
- The client sends JSON data (e.g. `{ "name": "Alice" }`).
- Node receives it as chunks of text and builds the body string.
- When all data is received, `req.on("end")` fires.
- You parse it using `JSON.parse()` and can now use it in your logic.

💡 **In Express**, this step is automatic (via `express.json()`), but here you're doing it manually — a great way to understand what's really happening.

---

### 2. Handling Query Parameters

Query parameters are the `?key=value` pairs at the end of URLs.  
Example: `/api/users?limit=5&sort=desc`

You can extract them using Node's built-in `url` module:

```js
import http from "http";
import { parse } from "url";

const server = http.createServer((req, res) => {
  res.setHeader("Content-Type", "application/json");

  if (req.method === "GET" && req.url.startsWith("/api/users")) {
    const query = parse(req.url, true).query; // parse query params
    console.log(query); // { limit: '5', sort: 'desc' }

    res.writeHead(200);
    res.end(JSON.stringify({ message: "Query received", query }));
  } else {
    res.writeHead(404);
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

server.listen(3000, () => console.log("✅ Server ready on http://localhost:3000"));
```

Query parameters are often used for filtering, pagination, or sorting data — for example:
- `/api/products?category=books`
- `/api/users?limit=10&page=2`

---

### 3. Handling Dynamic Routes (Route Parameters)

A **route parameter** is a value embedded directly inside the URL path itself — like the `1` in `/api/users/1`.  
This is how your frontend tells the server *which specific item* it wants to work with.

For example, if you want to get, update, or delete a single user, you include their ID in the URL:

```
GET    /api/users/1   →  fetch user with ID 1
PUT    /api/users/1   →  update user with ID 1
DELETE /api/users/1   →  delete user with ID 1
```

Without Express, there's no fancy `:id` syntax — but you can still detect route parameters manually by inspecting `req.url`.

#### Extracting the ID from the URL

When a request comes in for `/api/users/1`, you can extract the ID like this:

```js
const id = Number(req.url.split("/")[3]);
```

To understand why this works, let's break down what `split("/")` does to the URL:

```
req.url = "/api/users/1"

"/api/users/1".split("/")
//  returns: ["", "api", "users", "1"]
//  index:    [0]   [1]    [2]     [3]
```

The URL starts with `/`, so splitting on `/` produces an empty string at index `0`. That means:
- `[1]` → `"api"`
- `[2]` → `"users"`
- `[3]` → `"1"` ← this is the ID you want

You wrap it in `Number(...)` to convert the string `"1"` into the number `1`, so it can be compared against IDs stored as numbers.

#### GET — Fetch a Single User

```js
if (req.method === "GET" && req.url.startsWith("/api/users/")) {
  const id = Number(req.url.split("/")[3]);

  const users = [
    { id: 1, name: "Alice" },
    { id: 2, name: "Bob" },
  ];

  const user = users.find(u => u.id === id);

  if (!user) {
    res.writeHead(404);
    return res.end(JSON.stringify({ error: "User not found" }));
  }

  res.writeHead(200);
  res.end(JSON.stringify(user));
}
```

#### PUT — Update a Single User

```js
if (req.method === "PUT" && req.url.startsWith("/api/users/")) {
  const id = Number(req.url.split("/")[3]);
  let body = "";

  req.on("data", chunk => { body += chunk.toString(); });

  req.on("end", () => {
    const updates = JSON.parse(body);
    // In a real app, you'd find the user and apply the updates
    res.writeHead(200);
    res.end(JSON.stringify({ message: `User ${id} updated`, updates }));
  });
}
```

#### DELETE — Remove a Single User

```js
if (req.method === "DELETE" && req.url.startsWith("/api/users/")) {
  const id = Number(req.url.split("/")[3]);
  // In a real app, you'd find and remove the user from your data store
  res.writeHead(200);
  res.end(JSON.stringify({ message: `User ${id} deleted` }));
}
```

> 💡 **In Express**, this whole pattern becomes much cleaner using `:id` in the route definition and `req.params.id` to access it — but what Express does under the hood is essentially the same splitting and matching you see here.

---

#### Route Parameters vs. Query Parameters

These two patterns look similar but serve different purposes. Here's how to tell them apart:

| | Route Parameter | Query Parameter |
|---|---|---|
| **Example URL** | `/api/users/1` | `/api/users?id=1` |
| **Where it lives** | Embedded in the path | After the `?` at the end of the URL |
| **How you read it** | `req.url.split("/")[3]` | `parse(req.url, true).query.id` |
| **Best used for** | Identifying a specific resource | Filtering, sorting, or pagination |
| **Typical use case** | "Give me user 1" | "Give me users, sorted by name, page 2" |

**Use a route parameter** when the ID or identifier is a core part of *what* you're requesting — like a specific user, post, or product.

**Use a query parameter** when you're customizing *how* a list of data is returned — like filtering by category or limiting how many results come back.

---

This logic looks primitive compared to Express, but it's exactly what Express automates later.

## Wrapping Up: From Core Node to Express

At this point, you've seen how to build a real API using only Node's built-in tools — handling routes, reading data, and sending JSON back to the frontend. You've also learned how servers process incoming data, interpret query parameters, and store information in files.

But you've probably noticed something:  
as your API grows, the code starts getting **longer**, **harder to read**, and **full of repetitive logic** (checking `req.method`, parsing JSON, writing headers, etc.).

That's where **Express.js** comes in.

### Why Express Matters

Express is a lightweight framework that makes it easier to:

- Define routes with clean, simple syntax  
- Automatically handle JSON and form data  
- Organize your API into smaller, modular files  
- Add middleware for logging, authentication, and validation  
- Focus on **what your app does**, not on boilerplate code

In other words — everything you just learned to do manually in Node, Express helps you do **faster**, **cleaner**, and **more maintainably**.

So next, we'll refactor your existing Node API into an **Express.js application**, and you'll immediately see how much cleaner and more powerful your backend can become.
