# 🗒️ Node Notes API — Express + React Version

This version of the Notes API keeps the same Express backend,  
but replaces the vanilla HTML/JS frontend with a **React application**.

The backend does not change.

The frontend architecture does.

This structure will be the foundation for all applications built from this point forward.

## Architecture Overview

We now have two separate applications:

```
node-notes-demo/
│
├── backend/      → Express API
└── frontend/     → React (Vite)
```

Backend runs on:
```
http://localhost:3000
```

Frontend runs on:
```
http://localhost:5173
```

The frontend communicates with the backend using `fetch()`.

## What Stayed the Same?

The backend remains identical:

- Express server
- `GET /notes`
- `POST /notes`
- File-based storage (`notes.json`)
- Async/await
- CORS enabled
- nodemon for development

All API behavior is unchanged.

The React frontend still calls:

```js
fetch("http://localhost:3000/notes")
```

Just like the vanilla version did.


## What Changed?

The frontend is no longer:

```
index.html
script.js
style.css
```

Instead, it is a React application built with Vite:

```
frontend/
│
├── package.json
├── index.html
└── src/
    ├── main.jsx
    ├── App.jsx
    └── components/
```

## Architectural Shift

### Vanilla Frontend

- DOM manipulation with `document.querySelector`
- Event listeners manually attached
- UI updated with `innerHTML`
- Global script logic
- No build process

Structure:
```
HTML loads JS
JS manipulates DOM
```

### React Frontend

- UI driven by component state
- `useState` manages data
- `useEffect` handles lifecycle
- Automatic re-rendering
- Component-based structure
- Modern build tooling (Vite)

Structure:
```
State changes
React re-renders
DOM updates automatically
```

This is a fundamental shift from **DOM-first thinking** to **state-first thinking**.

## ⚠️ CORS Is Required

Because:

- Backend runs on port 3000
- Frontend runs on port 5173

They are considered different origins.

The backend must allow requests from the frontend:

```js
app.use(cors({
  origin: "http://localhost:5173"
}));
```

Without this, the browser will block requests.

## 🔁 Development Workflow

### Terminal 1 — Backend

```
cd backend
npm run dev
```

### Terminal 2 — Frontend

```
cd frontend
npm run dev
```

Open:
```
http://localhost:5173
```
## 🎯 Why This Is Our New Foundation

Going forward, all applications will follow this structure:

```
Frontend (React)
        ↓
Backend (Express API)
        ↓
Database / Storage
```

This gives us:

- Scalable architecture
- Clear separation of concerns
- Component-based UI
- Reusable backend patterns
- Production-ready structure