# School REST API — Express + PostgreSQL

A backend REST API for a school system built with **Express** and **PostgreSQL**.

This project replaces the file-based storage from previous demos with a real relational database. It also introduces additional backend middleware, Swagger documentation, and a seed script for populating the database.

## What's New

Previous demos stored data in a `notes.json` file. This project uses **PostgreSQL** — a relational database that stores data in structured tables with relationships between them.

Key additions:

- Real database (PostgreSQL) instead of a JSON file
- Three related resources: Students, Courses, and Enrollments
- SQL JOINs to query relationships across tables
- `helmet` for security headers
- `morgan` for HTTP request logging
- `dotenv` for environment variable management
- Swagger UI for interactive API documentation at `/docs`
- A seed script to populate the database with sample data

## Why PostgreSQL?

A JSON file works fine for simple demos but breaks down quickly — no relationships, no queries, no concurrent access. PostgreSQL is a production-grade relational database that handles all of that.

The data model for this project has three tables with foreign key relationships:

```
students ──< enrollments >── courses
```

A student can be enrolled in many courses. A course can have many students. The `enrollments` table links them.

## Requirements

- Node.js **v18 or higher**
- A PostgreSQL database (local or cloud — see Environment Variables below)

Check your Node version:
```bash
node -v
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```
DB_USER=your_db_user
DB_PASSWORD=your_db_password
DB_HOST=your_db_host
DB_PORT=5432
DB_NAME=your_db_name
PORT=3000
```

See the **Environment Variables** section below for details on local vs. cloud setup.

### 3. Seed the database

Run the seed script to create the tables and insert sample data:

```bash
npm run seed
```

### 4. Start the server

```bash
npm run dev
```

When the server starts you should see:
```
--------------------------------------------------
🚀 Server running on port 3000
🌐 API URL: http://localhost:3000
--------------------------------------------------
```

## Project Structure

```
2-backend-postgres/
├── server.js                      — Loads env vars and starts the HTTP server
├── app.js                         — Express config, middleware, routes, Swagger
├── db/
│   └── db.js                      — PostgreSQL connection pool
├── routes/
│   ├── studentRoutes.js           — Student route definitions
│   ├── courseRoutes.js            — Course route definitions
│   └── enrollmentRoutes.js        — Enrollment route definitions
├── controllers/
│   ├── studentController.js       — Student request handling and validation
│   ├── courseController.js        — Course request handling and validation
│   └── enrollmentController.js    — Enrollment request handling and validation
├── services/
│   ├── studentService.js          — Student SQL queries
│   ├── courseService.js           — Course SQL queries
│   └── enrollmentService.js       — Enrollment SQL queries
├── middleware/
│   └── errorHandler.js            — Centralized error handling
├── scripts/
│   └── seedDatabase.js            — Creates tables and inserts sample data
├── .env                           — Environment variables (do not commit)
└── package.json                   — Config, scripts, and dependencies
```

## npm Scripts

| Script | Command | What it does |
|---|---|---|
| `npm run start` | `node server.js` | Runs the server normally |
| `npm run dev` | `nodemon server.js` | Runs the server and auto-restarts on file save |
| `npm run seed` | `node scripts/seedDatabase.js` | Creates tables and inserts sample data |

## Dependencies

| Package | Purpose |
|---|---|
| `express` | Web framework — routing, middleware, response helpers |
| `pg` | PostgreSQL driver for Node.js |
| `cors` | Middleware that sets CORS headers automatically |
| `helmet` | Adds security-related HTTP headers |
| `morgan` | Logs incoming HTTP requests to the terminal |
| `dotenv` | Loads environment variables from `.env` |
| `chalk` | Colors terminal output |
| `swagger-jsdoc` | Generates OpenAPI spec from JSDoc comments in route files |
| `swagger-ui-express` | Serves interactive Swagger documentation at `/docs` |
| `nodemon` | Dev tool — auto-restarts server on file save |

## Environment Variables

### Local PostgreSQL

```
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
DB_NAME=schooldb
PORT=3000
```

### Cloud PostgreSQL (e.g. Neon, Supabase)

Cloud providers give you a connection string like:
```
postgresql://USER:PASSWORD@HOST:PORT/DATABASE
```

Break it into the individual `.env` variables:

| Part of URL | Environment Variable |
|---|---|
| USER | `DB_USER` |
| PASSWORD | `DB_PASSWORD` |
| HOST | `DB_HOST` |
| PORT | `DB_PORT` |
| DATABASE | `DB_NAME` |

Cloud databases typically require SSL. The connection pool in `db/db.js` enables it with:
```js
ssl: { rejectUnauthorized: false }
```

> Do **not** commit your `.env` file to Git.

## Database Schema

### Students

```sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE
);
```

### Courses

```sql
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  instructor TEXT
);
```

### Enrollments

```sql
CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  course_id INTEGER REFERENCES courses(id)
);
```

## Seeding the Database

The seed script (`scripts/seedDatabase.js`) creates the tables and inserts sample data:

- 3 students: Alice Johnson, Bob Smith, Maria Garcia
- 3 courses: Intro to JavaScript, Database Fundamentals, Web Development Basics
- 4 enrollments linking students to courses

Run it with:
```bash
npm run seed
```

You can re-run the seed script to reset the data. The script creates the tables if they don't exist, then clears and re-inserts the sample data.

## Routes

### Students

| Method | Route | Description | Body |
|---|---|---|---|
| GET | `/students` | Returns all students | — |
| GET | `/students/:id` | Returns a single student | — |
| POST | `/students` | Creates a new student | `{ name, email }` |
| DELETE | `/students/:id` | Deletes a student | — |

### Courses

| Method | Route | Description | Body |
|---|---|---|---|
| GET | `/courses` | Returns all courses | — |
| POST | `/courses` | Creates a new course | `{ title, instructor }` |

### Enrollments

| Method | Route | Description | Body |
|---|---|---|---|
| POST | `/enrollments` | Enrolls a student in a course | `{ studentId, courseId }` |
| GET | `/enrollments/students/:id` | Returns all courses a student is enrolled in | — |
| GET | `/enrollments/course/:id` | Returns all students enrolled in a course | — |

## Testing the Routes

### GET routes — use your browser or curl

```bash
curl http://localhost:3000/students
curl http://localhost:3000/courses
curl http://localhost:3000/students/1
```

### POST and DELETE — use a tool

| Tool | Type | Link |
|---|---|---|
| Postman | Desktop app | https://www.postman.com |
| Insomnia | Desktop app | https://insomnia.rest |
| Thunder Client | VS Code extension | Search in VS Code extensions |
| curl | Terminal | Built into Mac/Linux |

**curl examples:**
```bash
# Create a student
curl -X POST http://localhost:3000/students \
  -H "Content-Type: application/json" \
  -d '{"name": "Jane Doe", "email": "jane@email.com"}'

# Create a course
curl -X POST http://localhost:3000/courses \
  -H "Content-Type: application/json" \
  -d '{"title": "Advanced JavaScript", "instructor": "Dr. Kim"}'

# Enroll a student in a course
curl -X POST http://localhost:3000/enrollments \
  -H "Content-Type: application/json" \
  -d '{"studentId": 1, "courseId": 1}'

# Delete a student
curl -X DELETE http://localhost:3000/students/1
```

### Swagger UI

Once the server is running, open the interactive API docs in your browser:

```
http://localhost:3000/docs
```

Swagger lets you explore all endpoints, see request/response schemas, and send requests directly from the browser without needing Postman.

## What This Project Teaches

- How to connect Node.js to a PostgreSQL database using the `pg` driver
- How a connection pool works and why it's used instead of single connections
- How to use environment variables to keep credentials out of the codebase
- How foreign keys model relationships between tables
- How SQL JOINs query data across multiple related tables
- How to seed a database with sample data using a script
- How Swagger generates interactive API documentation from code comments
- How `helmet` and `morgan` add security and visibility to a production-style backend

## Troubleshooting

**Database connection error**
```
Error: connect ECONNREFUSED
```
Check that your `.env` credentials are correct and that your PostgreSQL server is running.

**Cannot find module or missing dependency**
```
Error: Cannot find module 'express'
```
Run `npm install` from the project root.

**Port already in use**
```
Error: listen EADDRINUSE :::3000
```
Stop the process using port 3000 or change `PORT` in your `.env` file.

**Seed script fails on foreign key constraint**
The tables may already have data that conflicts. The seed script drops and recreates the tables — run `npm run seed` again with a clean state.

**nodemon not found**
```
nodemon: command not found
```
Run `npm install` from the project root. Nodemon is a dev dependency and must be installed locally.
