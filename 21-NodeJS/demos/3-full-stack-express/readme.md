# Full-Stack Notes App — Express Version

The same full-stack Notes app from the previous demo, rebuilt using **Express.js** instead of Node's built-in `http` module.

The core functionality is identical — store notes in a JSON file, expose a REST API, connect to a plain HTML/JS frontend. What changes is how the server is structured.

## Why Express instead of `http`?

Node's built-in `http` module requires you to manually handle everything: routing, JSON parsing, CORS headers, preflight requests, and response formatting. Express is a framework built on top of `http` that handles all of that for you.

Express does not replace Node. It runs on top of Node.

Understanding the raw `http` version first makes Express feel logical rather than magical.

## How Express Simplifies Things

### Routing

**Pure Node:**
```js
if (method === "GET" && url === "/notes") {
  // logic here
}
```

**Express:**
```js
app.get("/notes", async (req, res) => {
  res.json(notes);
});
```

### JSON body parsing

**Pure Node:**
```js
let body = "";
req.on("data", chunk => { body += chunk; });
req.on("end", () => { const parsed = JSON.parse(body); });
```

**Express:**
```js
app.use(express.json());

app.post("/notes", (req, res) => {
  const { text } = req.body; // already parsed
});
```

### CORS handling

**Pure Node:**
```js
res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");

if (req.method === "OPTIONS") {
  res.writeHead(204);
  return res.end();
}
```

**Express:**
```js
import cors from "cors";
app.use(cors({ origin: "http://127.0.0.1:5500" }));
```

### Sending JSON responses

**Pure Node:**
```js
res.writeHead(200, { "Content-Type": "application/json" });
res.end(JSON.stringify(data));
```

**Express:**
```js
res.json(data); // sets Content-Type, stringifies, and sends
```

## Requirements

- Node.js **v18 or higher**

Check your version:
```bash
node -v
```

## Getting Started

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Start the backend

```bash
npm run dev
```

When the server starts you should see:

```
🚀 Express server running at http://localhost:3000
```

### 3. Start the frontend

Open `frontend/index.html` with **Live Server** in VS Code.

The frontend will run at:
```
http://127.0.0.1:5500
```

## Project Structure

```
3-full-stack-express/
├── backend/
│   ├── server.js         — Express server and route handlers
│   ├── notesService.js   — File I/O logic (read/write notes)
│   ├── notes.json        — Simple file-based database
│   └── package.json      — Project config, npm scripts, and dependencies
│
└── frontend/
    ├── index.html        — Page structure
    ├── styles.css        — Styling
    └── app.js            — Fetch requests and DOM updates
```

## npm Scripts

| Script | Command | What it does |
|---|---|---|
| `npm run start` | `node server.js` | Runs the server normally |
| `npm run dev` | `node --watch server.js` | Runs the server and auto-restarts on file save |

## Dependencies

| Package | Purpose |
|---|---|
| `express` | Web framework — routing, middleware, response helpers |
| `cors` | Middleware that sets CORS headers automatically |

## Routes

| Method | Route | Description | Returns |
|---|---|---|---|
| GET | `/notes` | Returns all notes | `[{ id, text }]` |
| POST | `/notes` | Creates a new note | `{ id, text }` |

## Testing the Routes

### GET routes — use your browser or curl

```
http://localhost:3000/notes
```

Or with curl:
```bash
curl http://localhost:3000/notes
```

### POST routes — use a tool

| Tool | Type | Link |
|---|---|---|
| Postman | Desktop app | https://www.postman.com |
| Insomnia | Desktop app | https://insomnia.rest |
| Thunder Client | VS Code extension | Search in VS Code extensions |
| curl | Terminal | Built into Mac/Linux |

**curl example for POST:**
```bash
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"text": "My first note"}'
```

**Postman / Insomnia steps:**
1. Create a new request
2. Set the method to `POST`
3. Set the URL to `http://localhost:3000/notes`
4. Go to **Body** → **raw** → **JSON**
5. Add `{ "text": "My first note" }`
6. Hit Send

You should receive a `201` response with your new note.

### Frontend

Run `frontend/index.html` with Live Server and use the form to add and view notes. The frontend calls the backend at `http://localhost:3000/notes` via `fetch`.

## What Stays the Same

- `notesService.js` is unchanged — file I/O still uses `fs/promises`
- The frontend (`index.html`, `styles.css`, `app.js`) is unchanged
- `fetch()` calls in the frontend are identical
- The routes and JSON shapes are the same

Express changes how the server is structured, not what it does.

## What This Project Teaches

- How Express simplifies routing, parsing, and response handling compared to raw `http`
- How middleware works (`app.use()`) and why it matters
- How `cors` middleware replaces manual CORS header management
- How `express.json()` replaces manual request body streaming
- How `res.json()` replaces manual `writeHead` and `JSON.stringify`
- That Express is not a replacement for Node — it runs on top of it

## Troubleshooting

**Port already in use**
```
Error: listen EADDRINUSE :::3000
```
Another process is using port 3000. Either stop that process or change `const PORT = 3000` in `server.js` to another number like `3001`.

**Cannot use import statement**
```
SyntaxError: Cannot use import statement in a module
```
Make sure `backend/package.json` has `"type": "module"` in it.

**Cannot find package 'express' or 'cors'**
```
Error: Cannot find module 'express'
```
You haven't installed dependencies yet. Run `npm install` from the `backend/` folder.

**CORS error in the browser console**
```
Access to fetch at 'http://localhost:3000/notes' has been blocked by CORS policy
```
Your frontend is not running on `http://127.0.0.1:5500`. Check what port Live Server is using and update the `origin` in `server.js` to match.
