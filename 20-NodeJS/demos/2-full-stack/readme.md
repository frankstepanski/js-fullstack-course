# Full-Stack Node Notes App

A full-stack application built with **Node's built-in `http` module** and a plain HTML/CSS/JS frontend — no Express, no frameworks, no dependencies.

This is a learning project that shows how the frontend and backend connect over HTTP at the most basic level before adding libraries that abstract it away.

## Why pure Node and not Express?

Express is built on top of Node's `http` module. Learning pure Node first means you understand what Express is actually doing under the hood — routing, request parsing, CORS headers — instead of just following magic.

## Why separate frontend and backend?

This structure introduces a modern API architecture:

- The backend focuses only on data and logic
- The frontend focuses only on UI and user interaction
- Communication happens over HTTP using `fetch`

This mirrors how real-world web applications are built.

## Requirements

- Node.js **v18 or higher** (required for ES module support)

Check your version:
```bash
node -v
```

## Getting Started

### 1. Start the backend

```bash
cd backend
npm run dev
```

When the server starts you should see:

```
🚀 Server running at http://localhost:3000
```

### 2. Start the frontend

Open `frontend/index.html` with **Live Server** in VS Code.

The frontend will run at:
```
http://127.0.0.1:5500
```

## Project Structure

```
2-full-stack/
├── backend/
│   ├── server.js         — HTTP server and route handling
│   ├── notesService.js   — File I/O logic (read/write notes)
│   ├── notes.json        — Simple file-based database
│   └── package.json      — Project config and npm scripts
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

## Routes

| Method | Route | Description | Returns |
|---|---|---|---|
| GET | `/notes` | Returns all notes | `[{ id, text }]` |
| POST | `/notes` | Creates a new note | `{ id, text }` |

## Testing the Routes

### GET routes — use your browser or curl

You can open the GET route directly in your browser:
```
http://localhost:3000/notes
```

Or with curl in your terminal:
```bash
curl http://localhost:3000/notes
```

### POST routes — use a tool

You cannot test POST requests in a browser URL bar. Use one of these:

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

Run `frontend/index.html` with Live Server and use the form to add and view notes. The frontend calls the backend via `fetch`.

## CORS

The frontend runs on `http://127.0.0.1:5500` and the backend runs on `http://localhost:3000`. These are **different origins**, so the browser blocks requests by default.

The backend manually sets CORS headers to allow it:

```js
res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:5500");
res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
res.setHeader("Access-Control-Allow-Headers", "Content-Type");
```

The server also handles the browser's preflight `OPTIONS` request before the real POST is sent.

## What This Project Teaches

- How to split a project into a backend API and a static frontend
- How the frontend and backend communicate over HTTP using `fetch`
- How to manually handle CORS in a pure Node server
- How to parse incoming POST request bodies using `req.on("data")`
- How to read and write files asynchronously with `fs/promises`
- How to separate HTTP logic (server.js) from business logic (notesService.js)
- What HTTP status codes mean (200, 201, 400, 404, 500)
- Why POST requests need a tool like Postman to test

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

**CORS error in the browser console**
```
Access to fetch at 'http://localhost:3000/notes' has been blocked by CORS policy
```
Your frontend is not running on `http://127.0.0.1:5500`. Check what port Live Server is using and update `FRONTEND_ORIGIN` in `server.js` to match.
