# Full-Stack Notes App — React + Express

The same Notes app, but with the vanilla HTML/JS frontend replaced by a **React application** built with Vite.

The backend is unchanged. The frontend architecture is completely different.

This structure — React frontend talking to an Express API — is the foundation for all full-stack applications going forward.

## Why React instead of vanilla JS?

The vanilla frontend worked, but it required manually:
- Querying the DOM with `document.querySelector`
- Updating `innerHTML` to re-render the list
- Attaching event listeners by hand

React flips the model. Instead of thinking about *what to update in the DOM*, you think about *what the state is* and let React handle the DOM automatically.

| Vanilla JS | React |
|---|---|
| DOM-first thinking | State-first thinking |
| `innerHTML` to update UI | `useState` triggers re-render |
| Manual event listeners | `onSubmit`, `onChange` handlers |
| No build process | Vite dev server + bundler |

## What Stayed the Same

The backend is identical to the previous demo:

- Express server with `GET /notes` and `POST /notes`
- File-based storage with `notes.json`
- CORS enabled
- `notesService.js` handles file I/O

The React frontend still calls:
```js
fetch("http://localhost:3000/notes")
```
Just like the vanilla version did.

## Requirements

- Node.js **v18 or higher**

Check your version:
```bash
node -v
```

## Getting Started

This project has two separate applications, each with their own dependencies. You need two terminals.

### Terminal 1 — Backend

```bash
cd backend
npm install
npm run dev
```

When the server starts you should see:
```
🚀 Express server running at http://localhost:3000
```

### Terminal 2 — Frontend

```bash
cd frontend
npm install
npm run dev
```

When Vite starts you should see:
```
  VITE  v7.x.x  ready in Xms

  ➜  Local:   http://localhost:5173/
```

Open `http://localhost:5173` in your browser.

## Project Structure

```
4-full-stack-react-express/
├── backend/
│   ├── server.js         — Express server and route handlers
│   ├── notesService.js   — File I/O logic (read/write notes)
│   ├── notes.json        — Simple file-based database
│   └── package.json      — Config, scripts, and dependencies
│
└── frontend/
    ├── index.html        — Vite HTML entry point
    ├── vite.config.js    — Vite configuration
    ├── package.json      — Config, scripts, and dependencies
    └── src/
        ├── main.jsx      — React entry point
        ├── App.jsx       — Root component, state, and fetch logic
        ├── App.css       — Component styles
        └── index.css     — Global styles
```

## npm Scripts

### Backend

| Script | Command | What it does |
|---|---|---|
| `npm run start` | `node server.js` | Runs the server normally |
| `npm run dev` | `node --watch server.js` | Runs the server and auto-restarts on file save |

### Frontend

| Script | Command | What it does |
|---|---|---|
| `npm run dev` | `vite` | Starts the Vite dev server at localhost:5173 |
| `npm run build` | `vite build` | Bundles the app for production |
| `npm run preview` | `vite preview` | Previews the production build locally |

## Dependencies

### Backend

| Package | Purpose |
|---|---|
| `express` | Web framework — routing, middleware, response helpers |
| `cors` | Middleware that sets CORS headers automatically |


### Frontend

| Package | Purpose |
|---|---|
| `react` | UI library |
| `react-dom` | Renders React components to the DOM |
| `vite` | Dev server and build tool |

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

## How React Connects to the Backend

`App.jsx` manages all state and data fetching:

- `useEffect` fires on mount and calls `fetchNotes()` to load existing notes
- `handleSubmit` POSTs a new note and then calls `fetchNotes()` to refresh the list
- `useState` holds the notes array — when it updates, React re-renders the list automatically

```js
useEffect(() => {
  fetchNotes();
}, []);
```

No `innerHTML`. No `document.querySelector`. The UI is a function of state.

## CORS

The backend runs on port `3000` and the frontend runs on port `5173`. These are different origins, so the browser blocks requests by default.

The backend allows it with:
```js
app.use(cors({ origin: "http://localhost:5173" }));
```

The URL must be exact — a trailing slash will cause CORS errors.

## What This Project Teaches

- How a React frontend connects to an Express backend over HTTP
- The difference between state-first (React) and DOM-first (vanilla JS) thinking
- How `useState` and `useEffect` replace manual DOM manipulation
- How to manage two separate applications with their own dependencies
- Why CORS configuration changes when switching from Live Server to Vite
- That the backend API does not change regardless of what frontend consumes it

## Troubleshooting

**Port already in use (backend)**
```
Error: listen EADDRINUSE :::3000
```
Another process is using port 3000. Stop that process or change `const PORT = 3000` in `server.js`.

**Cannot find module 'express' or 'cors'**
```
Error: Cannot find module 'express'
```
Run `npm install` from inside the `backend/` folder.

**React app shows blank page or module errors**
Run `npm install` from inside the `frontend/` folder, then `npm run dev` again.

**CORS error in the browser console**
```
Access to fetch at 'http://localhost:3000/notes' has been blocked by CORS policy
```
The frontend is not running on `http://localhost:5173`. Check the Vite output for the actual port and update the `origin` in `backend/server.js` to match.

**nodemon not found**
```
nodemon: command not found
```
Run `npm install` from the `backend/` folder. Nodemon is a dev dependency and must be installed locally.
