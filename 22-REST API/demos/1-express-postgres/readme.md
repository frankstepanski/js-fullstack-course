# Notes API — Express + PostgreSQL

A REST API for managing notes, built with a layered Express backend and a PostgreSQL database via [Neon](https://neon.tech).

## What This Is

This is the backend only. It exposes a JSON API that any frontend or HTTP client can consume.

The backend is structured into separate layers so each file has a single, clear responsibility.

## Why a Layered Architecture?

A layered architecture splits responsibilities:

| Layer | File | Responsibility |
|---|---|---|
| Entry point | `server.js` | Starts the HTTP server and tests the DB connection |
| App config | `app.js` | Registers middleware, CORS, and routes |
| Router | `routes/notes.js` | Maps HTTP methods and paths to controllers |
| Controller | `controllers/notesController.js` | Validates input, calls services, sends responses |
| Service | `services/notesService.js` | Contains all database query logic |
| DB pool | `db.js` | Creates and exports the PostgreSQL connection pool |

Each layer only talks to the layer directly below it. Controllers never touch the database. Services never touch HTTP.

## Requirements

- Node.js **v18 or higher**
- A PostgreSQL database (this project is configured for [Neon](https://neon.tech))

Check your Node version:
```bash
node -v
```

## Getting Started

### 1. Create the database table

Run `setup.sql` against your PostgreSQL database. You can use Beekeeper Studio, the Neon SQL Editor, or psql:

```sql
CREATE TABLE IF NOT EXISTS notes (
  id   SERIAL PRIMARY KEY,
  text TEXT NOT NULL
);
```

### 2. Seed the database

Run `seed.sql` to insert sample data:

```sql
INSERT INTO notes (text) VALUES
  ('Buy groceries'),
  ('Call the dentist'),
  ('Finish the project');
```

### 3. Configure the environment

Create a `.env` file in the project root:

```
DATABASE_URL=postgresql://<user>:<password>@<host>/<database>?sslmode=verify-full
```

### 4. Install and run

```bash
npm install
npm run dev
```

When the server starts you should see:
```
🚀 Express server running at http://localhost:3000
✅ Connected to PostgreSQL
```

## Project Structure

```
1-express-postgres/
├── server.js                        — Starts the HTTP server
├── app.js                           — Express config, middleware, and routes
├── db.js                            — PostgreSQL connection pool
├── setup.sql                        — SQL to create the notes table
├── seed.sql                         — SQL to insert sample data
├── .env                             — Database connection string (not committed)
├── package.json
├── routes/
│   └── notes.js                     — Route definitions
├── controllers/
│   └── notesController.js           — Request handling and validation
└── services/
    └── notesService.js              — Database query functions
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
| `pg` | PostgreSQL client for Node.js |
| `dotenv` | Loads environment variables from `.env` |

## Routes

| Method | Route | Description | Body | Returns |
|---|---|---|---|---|
| GET | `/notes` | Returns all notes | — | `[{ id, text }]` |
| POST | `/notes` | Creates a new note | `{ text }` | `{ id, text }` |

## Testing the Routes

### GET — browser or curl

```
http://localhost:3000/notes
```

```bash
curl http://localhost:3000/notes
```

### POST — curl or a REST client

```bash
# Create a note
curl -X POST http://localhost:3000/notes \
  -H "Content-Type: application/json" \
  -d '{"text": "My first note"}'
```

REST client options:

| Tool | Type | Link |
|---|---|---|
| Postman | Desktop app | https://www.postman.com |
| Insomnia | Desktop app | https://insomnia.rest |
| Thunder Client | VS Code extension | Search in VS Code extensions |
| curl | Terminal | Built into Mac/Linux |

## CORS

The server allows cross-origin requests from `http://localhost:5173` by default:

```js
app.use(cors({ origin: "http://localhost:5173" }));
```

Update this in `app.js` to match the origin of your frontend.

## Troubleshooting

**Port already in use**
```
Error: listen EADDRINUSE :::3000
```
Stop the process using port 3000 or change `const PORT = 3000` in `server.js`.

**Cannot find module 'express'**
```
Error: Cannot find module 'express'
```
Run `npm install` from the project root.

**Database connection failed on startup**
```
❌ Database connection failed: ...
```
Check that your `.env` file exists and `DATABASE_URL` is correct. The server will still run but all queries will fail.

**CORS error in the browser console**
```
Access to fetch at 'http://localhost:3000/notes' has been blocked by CORS policy
```
Your frontend is not running on `http://localhost:5173`. Check the actual origin and update it in `app.js`.
