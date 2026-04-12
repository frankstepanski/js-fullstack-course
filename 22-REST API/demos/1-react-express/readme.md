# CRUD Notes App — React + Express

A full-stack Notes app with complete **CRUD functionality** — Create, Read, Update, and Delete — built with a React frontend and a layered Express backend.

This project introduces **layered backend architecture**, which is how real production APIs are structured.

## What's New

Previous demos only supported GET and POST. This project adds:

- `PUT /notes/:id` — update an existing note
- `DELETE /notes/:id` — delete a note

The backend is also restructured into separate layers so each file has a single, clear responsibility.

## Why a Layered Architecture?

In earlier demos, all server logic lived in one file. That works for small projects but becomes hard to maintain as the codebase grows.

A layered architecture splits responsibilities:

| Layer | File | Responsibility |
|---|---|---|
| Entry point | `server.js` | Starts the HTTP server |
| App config | `app.js` | Registers middleware, CORS, and routes |
| Router | `routes/notesRouter.js` | Maps HTTP methods and paths to controllers |
| Controller | `controllers/notesController.js` | Validates input, calls services, sends responses |
| Service | `services/notesService.js` | Contains all data logic (read/write/update/delete) |
| Storage | `notes.json` | File-based database |

Each layer only talks to the layer directly below it. Controllers never touch the file system. Services never touch HTTP.

This is how real production backends are structured.

## Requirements

- Node.js **v18 or higher**

Check your version:
```bash
node -v
```

## Getting Started

This project has two separate applications. You need two terminals.

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
1-crud-react-express/
├── backend/
│   ├── server.js                    — Starts the HTTP server
│   ├── app.js                       — Express config, middleware, and routes
│   ├── routes/
│   │   └── notesRouter.js           — Route definitions
│   ├── controllers/
│   │   └── notesController.js       — Request handling and validation
│   ├── services/
│   │   └── notesService.js          — Data logic (read/write/update/delete)
│   ├── notes.json                   — Simple file-based database
│   └── package.json                 — Config, scripts, and dependencies
│
└── frontend/
    ├── index.html                   — Vite HTML entry point
    ├── vite.config.js               — Vite configuration
    ├── package.json                 — Config, scripts, and dependencies
    └── src/
        ├── main.jsx                 — React entry point
        ├── App.jsx                  — Root component, state, and fetch logic
        ├── App.css                  — Component styles
        └── index.css                — Global styles
```

## npm Scripts

### Backend

| Script | Command | What it does |
|---|---|---|
| `npm run start` | `node server.js` | Runs the server normally |
| `npm run dev` | `nodemon server.js` | Runs the server and auto-restarts on file save |

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
| `nodemon` | Dev tool — auto-restarts server on file save |

### Frontend

| Package | Purpose |
|---|---|
| `react` | UI library |
| `react-dom` | Renders React components to the DOM |
| `vite` | Dev server and build tool |

## Routes

| Method | Route | Description | Body | Returns |
|---|---|---|---|---|
| GET | `/notes` | Returns all notes | — | `[{ id, text }]` |
| POST | `/notes` | Creates a new note | `{ text }` | `{ id, text }` |
| PUT | `/notes/:id` | Updates an existing note | `{ text }` | `{ id, text }` |
| DELETE | `/notes/:id` | Deletes a note | — | `{ message }` |

## Testing the Routes

### GET routes — use your browser or curl

```
http://localhost:3000/notes
```

Or with curl:
```bash
curl http://localhost:3000/notes
```

### POST, PUT, DELETE — use a tool

| Tool | Type | Link |
|---|---|---|
| Postman | Desktop app | https://www.postman.com |
| Insomnia | Desktop app | https://insomnia.rest |
| Thunder Client | VS Code extension | Search in VS Code extensions |
| curl | Terminal | Built into Mac/Linux |

**curl examples:**
```bash
# Create a note
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"text": "My first note"}'

# Update a note (replace 123 with a real id)
curl -X PUT http://localhost:3000/notes/123 \
  -H "Content-Type: application/json" \
  -d '{"text": "Updated note"}'

# Delete a note
curl -X DELETE http://localhost:3000/notes/123
```

### Frontend

Run both servers and open `http://localhost:5173`. The app supports adding, editing, and deleting notes directly in the UI.

## CORS

The backend runs on port `3000` and the frontend runs on port `5173`. The backend allows cross-origin requests with:

```js
app.use(cors({ origin: "http://localhost:5173" }));
```

The URL must be exact — a trailing slash will cause CORS errors.

## What This Project Teaches

- How to structure a backend into layers (server, app, routes, controllers, services)
- Why separating HTTP logic from data logic makes code easier to maintain
- How to implement full CRUD with REST conventions
- How `PUT` and `DELETE` routes use URL parameters (`:id`) to target a specific resource
- How the React frontend manages edit state alongside create and delete
- That the frontend API calls are the only thing connecting the two applications

## Troubleshooting

**Port already in use (backend)**
```
Error: listen EADDRINUSE :::3000
```
Stop the process using port 3000 or change `const PORT = 3000` in `server.js`.

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
The frontend is not running on `http://localhost:5173`. Check the Vite output for the actual port and update the `origin` in `app.js` to match.

**nodemon not found**
```
nodemon: command not found
```
Run `npm install` from the `backend/` folder. Nodemon is a dev dependency and must be installed locally.
