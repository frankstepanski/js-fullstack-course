
# Todo App (Vanilla JS + JSON Server)

This project is a full-stack Todo application built using:

- HTML
- CSS
- Vanilla JavaScript
- json-server (mock backend)

It demonstrates how a frontend application communicates with a REST API — without using frameworks like React.

## What This App Does

The app allows users to:

- View existing todos stored in a backend database
- Create new todos
- Mark todos as completed or not completed
- Persist all changes to a server (not just in memory)

All data is stored in a `db.json` file and served through `json-server`, which simulates a real REST API.

## Application Structure

```
todo-json-server/
├── db.json
├── index.html
├── styles.css
├── app.js
└── package.json
```

## Core Components

### index.html
Responsible for:
- Page structure
- Todo input form
- Todo list container
- Script loading

### styles.css
Responsible for:
- Layout and spacing
- Flexbox alignment
- Completed todo styling
- Overall visual appearance

### app.js
Responsible for:
- Fetching todos from the API
- Creating new todos
- Updating todo completion state
- Rendering todos into the DOM

## Data Flow: Frontend → Backend → Frontend

### Page Load
1. Browser loads `index.html`
2. `app.js` runs `fetchTodos()`
3. GET request sent to `/todos`
4. Server returns JSON
5. Todos are rendered

### Creating a Todo
1. User submits form
2. POST request sent to `/todos`
3. json-server writes to `db.json`
4. Frontend re-fetches todos

### Updating a Todo
1. User toggles checkbox
2. PATCH request sent to `/todos/:id`
3. Server updates `db.json`
4. Frontend re-fetches todos

## What is json-server?

`json-server` is a development tool that turns a JSON file into a fully functional REST API.

It automatically provides:
- GET routes
- POST routes
- PATCH routes
- DELETE routes

No backend code required.

### How json-server Fits Into This App

json-server acts as:
- The backend API
- The persistence layer (database)

This simulates real-world architecture:

```
Browser → HTTP → API → Database
```

### How json-server Helps You Learn REST APIs

This project teaches:

- HTTP methods (GET, POST, PATCH)
- Resource-based routing
- Stateless requests
- JSON request/response cycles
- Data persistence

These are the same concepts used in real production systems.

## How to Run the App

### 1. Install Dependencies

This project uses **json-server**, which is listed in `package.json`.

The `node_modules` folder is **not included** in the project, so you must install all dependencies locally.

Run:
```
npm install
```

This command:
- Reads `package.json`
- Downloads all required dependencies
- Creates the `node_modules` folder locally

### 2. Start the Backend (json-server)

Run:
```
npm run server
```

This starts json-server and exposes a REST API at:
```
http://localhost:3001
```

This server must be running for the app to work.

### 3. Run the Frontend (Live Server)

Open the project folder in **VS Code**, then:

1. Right-click `index.html`
2. Select **“Open with Live Server”**

This launches the frontend in your browser with:
- Automatic reloads
- A local development server
- No file-path issues

> **Important:**  
> You should use Live Server instead of opening the file directly to better simulate real development workflows.

The backend (json-server) and frontend (Live Server) run separately, just like a real application.


## How to Break (Ruin) the App

Learning how things fail is important.

### Common Failure Scenarios

- Changing the API port
- Stopping json-server
- Removing the `todos` array from `db.json`
- Breaking JSON syntax
- Removing `id` fields

All of these will cause the app to fail in predictable ways.


## Key Takeaway

### Frontend Does Not Own the Data

A key concept in modern web development is this:

> **Frontend applications do not store truth.**

The browser is **temporary**:
- Refresh the page → memory is wiped
- Close the tab → state is gone
- Navigate away → everything resets

Because of this, the frontend **cannot be trusted** to permanently store data.

### Where the "Truth" Lives

The **source of truth** lives on the backend:

- In a database
- Behind an API
- Accessible through HTTP requests

In this app:
- `db.json` is the database
- `json-server` is the backend API
- The browser is just a viewer and editor

### What the Frontend Actually Does

The frontend's real job is to:

1. **Request data**  
   - Ask the API for the current state  
   - Example: `GET /todos`

2. **Display data**  
   - Render server data into the UI  
   - The UI reflects what the server says is true

3. **Mutate data**  
   - Send changes back to the server  
   - Example: `POST`, `PATCH`

After every mutation, the frontend must **re-sync** with the backend.

### Why This Pattern Matters

This pattern is used everywhere:

- React apps
- Mobile apps
- Enterprise dashboards
- Banking systems
- Social media platforms

If the frontend and backend get out of sync:
- Bugs appear
- Users see incorrect data
- Systems become unreliable

### Why json-server Is Perfect for Learning This

`json-server` lets beginners:

- See real HTTP requests
- Watch data persist after refresh
- Observe how APIs control truth
- Learn REST concepts without backend complexity

It creates a **safe sandbox** to understand how real applications work before adding frameworks like React or Node/Express.

### Final Mental Model

Think of it this way:

- **Frontend:** asks questions and sends updates  
- **Backend:** decides what is true  
- **Database:** remembers everything  

This app exists to teach that separation — clearly and intentionally.