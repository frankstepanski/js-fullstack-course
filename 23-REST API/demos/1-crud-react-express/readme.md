
# 🗒️ CRUD Notes API — Layered Architecture FullStack

This version of the Notes application includes:

- A **React frontend**
- An **Express backend API**
- A **file-based data store**

The application now supports **full CRUD functionality**:

- Create notes
- Read notes
- Update notes
- Delete notes

This structure introduces a **layered backend architecture**, which mirrors how real production APIs are structured.

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

## Backend Architecture

The backend is now organized into **separate layers**:

```
backend/
│
├── server.js
├── app.js
│
├── routes/
│   └── notesRoutes.js
│
├── controllers/
│   └── notesController.js
│
├── services/
│   └── notesService.js
│
└── notes.json
```

Each layer has a clear responsibility.

### server.js
Starts the HTTP server.

### app.js
Configures the Express application:

- middleware
- CORS
- JSON parsing
- routes

### Routes
Define API endpoints.

Example:

```
GET /notes
POST /notes
PUT /notes/:id
DELETE /notes/:id
```

Routes forward requests to controllers.

### Controllers

Controllers:

- receive requests
- validate inputs
- call service functions
- return responses

Controllers do **not contain data logic**.

### Services

Services contain the **core data logic**.

They are responsible for:

- reading notes from file
- writing notes to file
- creating notes
- updating notes
- deleting notes

This separation mimics how real backend applications are structured.

## API Endpoints

The backend now exposes a full CRUD API.

| Method | Endpoint | Description |
|------|------|------|
| GET | `/notes` | Retrieve all notes |
| POST | `/notes` | Create a new note |
| PUT | `/notes/:id` | Update an existing note |
| DELETE | `/notes/:id` | Delete a note |

Example fetch request:

```js
fetch("http://localhost:3000/notes")
```

## Frontend Architecture

The frontend is now a **React application built with Vite**.

```
frontend/
│
├── package.json
├── index.html
└── src/
    ├── main.jsx
    ├── App.jsx
```

The React app manages notes using **state** and communicates with the backend API.

The frontend now supports:

- Adding notes
- Viewing notes
- Editing notes
- Deleting notes

## ⚠️ CORS Is Required

Because:

- Backend runs on port **3000**
- Frontend runs on port **5173**

They are considered different origins.

The backend must allow requests from the frontend:

```js
app.use(cors({
  origin: "http://localhost:5173"
}));
```

Without this configuration, the browser will block API requests.

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

Open the application:

```
http://localhost:5173
```

## 🎯 Why This Architecture Matters

This project introduces the **full-stack architecture pattern** used in most modern web applications:

```
Frontend (React)
        ↓
Backend API (Express)
        ↓
Service Layer
        ↓
Data Storage
```

Benefits include:

- clear separation of concerns
- scalable backend design
- reusable service logic
- component-based frontend
- real-world full-stack structure

This architecture becomes the **foundation for all future applications** built in the course.
