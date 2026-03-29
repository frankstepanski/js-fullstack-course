# 🗒️ Node Notes API — Express Version

This version of the Notes API uses **Express.js** instead of Node’s built-in `http` module.

The core functionality is the same:
- Store notes in a JSON file
- Expose a `GET /notes` route
- Expose a `POST /notes` route
- Connect to a frontend via `fetch()`

What changes is **how the server is built and structured**.

## Why Use Express Instead of `http`?

Node’s built-in `http` module is low-level.

Express is a framework built on top of `http` that simplifies:

- Routing
- Middleware
- JSON parsing
- CORS handling
- Response formatting

Express does not replace Node.
It runs **on top of Node**.

## Side-by-Side Comparison

### 1️⃣ Creating the Server

#### Using `http`

```js
import http from "http";

const server = http.createServer((req, res) => {
  // handle request manually
});

server.listen(3000);
```

You manually:
- Inspect `req.method`
- Inspect `req.url`
- Parse request body
- Set response headers

#### Using Express

```js
import express from "express";

const app = express();

app.listen(3000);
```

Express abstracts the low-level request handling.

### 2️⃣ Routing

#### `http` Version

```js
if (method === "GET" && url === "/notes") {
  // logic here
}
```

Manual conditional logic.

### Express Version

```js
app.get("/notes", async (req, res) => {
  res.json(notes);
});
```

Routing becomes declarative and readable.

### 3️⃣ Parsing JSON Request Body

#### `http` Version

```js
let body = "";

req.on("data", chunk => {
  body += chunk;
});

req.on("end", () => {
  const parsed = JSON.parse(body);
});
```

Manual stream handling.

#### Express Version

```js
app.use(express.json());

app.post("/notes", (req, res) => {
  const { text } = req.body;
});
```

Express automatically parses JSON for you.

### 4️⃣ Sending JSON Responses

#### `http` Version

```js
res.writeHead(200, { "Content-Type": "application/json" });
res.end(JSON.stringify(data));
```

Manual header + manual stringify.

#### Express Version

```js
res.json(data);
```

Express:
- Sets `Content-Type`
- Converts object to JSON
- Sends response

All in one method.

### 5️⃣ CORS Handling

#### `http` Version

You manually set headers:

```js
res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

if (req.method === "OPTIONS") {
  res.writeHead(204);
  return res.end();
}
```

Everything is manual.

#### Express Version

```js
import cors from "cors";

app.use(cors({
  origin: "http://127.0.0.1:5500"
}));
```

Express middleware handles:
- CORS headers
- Preflight requests
- OPTIONS handling

Cleaner and safer.

## 🔁 Development Mode with nodemon

When developing, restarting the server after every file change slows you down.

Instead of manually stopping and starting the server:

```bash
CTRL + C
node server.js
```

You can use **nodemon** to automatically restart the server whenever you save changes.

### Install nodemon

```bash
npm install --save-dev nodemon
```

We install it as a **dev dependency** because it is only used during development, not in production.

### Update `package.json`

Add a development script:

```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

##  What Stays the Same?

- The `notesService.js` file does not change.
- File I/O still uses `fs/promises`.
- Async/await still works the same.
- The frontend does not change.
- `fetch()` calls are identical.

Express changes **how the server is structured**, not what it does.

## 🏁 Final Takeaway

Node provides the runtime and HTTP engine.

Express provides structure and developer convenience.

They are not competitors.

Express runs on Node.

The Express version is cleaner, shorter, and more production-ready — but understanding the raw `http` version makes you a stronger backend developer.