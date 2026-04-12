# School REST API — Express + MongoDB

A backend REST API for a school system built with **Express** and **MongoDB**.

The API manages students, courses, and enrollments — the same data and the same routes as the PostgreSQL version. What changes is the database technology underneath.

## Why MongoDB?

MongoDB stores data as **documents** (JSON-like objects) instead of rows in tables. There are no SQL queries, no `CREATE TABLE` statements, and no rigid column definitions. You define the shape of your data in JavaScript using **Mongoose schemas**, and MongoDB stores it.

This makes MongoDB a natural fit for JavaScript applications — the data you work with in your code looks the same as the data stored in the database.

**Mongoose** is the library that connects Node.js to MongoDB. It adds:
- Schema-based validation (so bad data doesn't get saved)
- Model methods like `find()`, `create()`, `findByIdAndDelete()`
- `populate()` for joining related documents (the MongoDB equivalent of a SQL JOIN)

## How This Differs from the PostgreSQL Version

If you worked through `2-backend-postgres`, the architecture here is identical — same layers, same routes, same controllers. Only the database layer changes.

| | PostgreSQL | MongoDB |
|---|---|---|
| Database type | Relational (tables, rows) | Document (collections, documents) |
| Driver | `pg` | `mongoose` |
| Schema definition | SQL `CREATE TABLE` | Mongoose schema in JavaScript |
| IDs | Auto-increment integer (`1`, `2`, `3`) | ObjectId (24-char hex string) |
| Relationships | Foreign keys + SQL JOINs | ObjectId refs + `populate()` |
| Connection | Connection pool | Single `mongoose.connect()` |
| Queries | Parameterized SQL | Mongoose model methods |
| Collections created | Manually via SQL | Automatically on first insert |

## About MongoDB IDs

This is the biggest practical difference you will notice when testing.

In PostgreSQL, IDs are simple integers: `1`, `2`, `3`.

In MongoDB, every document gets an `_id` field that looks like this:
```
"_id": "664a1f2b3c4d5e6f7a8b9c0d"
```

It is a 24-character hex string called an **ObjectId**. MongoDB generates it automatically — you never set it yourself.

**What this means when testing:**
- GET requests return `_id` in the response, not `id`
- When enrolling a student, you must copy the `_id` from a GET response and use that as `studentId` / `courseId`
- Route parameters like `/students/:id` expect an ObjectId string, not a number

## Requirements

- Node.js **v18 or higher**
- A MongoDB database (local or cloud — see Environment Variables below)

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
MONGODB_URI=mongodb+srv://USER:PASSWORD@cluster.mongodb.net/schooldb
PORT=3000
NODE_ENV=development
```

See the **Environment Variables** section below for details on local vs. cloud setup.

### 3. Seed the database

```bash
npm run seed
```

### 4. Start the server

```bash
npm run dev
```

When the server starts you should see:
```
✅ Connected to MongoDB
--------------------------------------------------
🚀 Server running on port 3000
🌐 API URL: http://localhost:3000
--------------------------------------------------
```

## Project Structure

```
3-backend-mongodb/
├── server.js                      — Connects to MongoDB and starts the HTTP server
├── app.js                         — Express config, middleware, routes, Swagger
├── db/
│   └── db.js                      — Mongoose connection
├── models/
│   ├── Student.js                 — Student schema and model
│   ├── Course.js                  — Course schema and model
│   └── Enrollment.js              — Enrollment schema and model (with refs)
├── routes/
│   ├── studentRoutes.js           — Student route definitions
│   ├── courseRoutes.js            — Course route definitions
│   └── enrollmentRoutes.js        — Enrollment route definitions
├── controllers/
│   ├── studentController.js       — Student request handling and validation
│   ├── courseController.js        — Course request handling and validation
│   └── enrollmentController.js    — Enrollment request handling and validation
├── services/
│   ├── studentService.js          — Student Mongoose queries
│   ├── courseService.js           — Course Mongoose queries
│   └── enrollmentService.js       — Enrollment Mongoose queries with populate()
├── middleware/
│   └── errorHandler.js            — Centralized error handling
├── scripts/
│   └── seedDatabase.js            — Clears and re-inserts sample data
├── .env                           — Environment variables (do not commit)
└── package.json                   — Config, scripts, and dependencies
```

## npm Scripts

| Script | Command | What it does |
|---|---|---|
| `npm run start` | `node server.js` | Runs the server normally |
| `npm run dev` | `nodemon server.js` | Runs the server and auto-restarts on file save |
| `npm run seed` | `node scripts/seedDatabase.js` | Clears and re-inserts sample data |

## Dependencies

| Package | Purpose |
|---|---|
| `express` | Web framework — routing, middleware, response helpers |
| `mongoose` | MongoDB ODM — schemas, models, and query methods |
| `cors` | Middleware that sets CORS headers automatically |
| `helmet` | Adds security-related HTTP headers |
| `morgan` | Logs incoming HTTP requests to the terminal |
| `dotenv` | Loads environment variables from `.env` |
| `chalk` | Colors terminal output |
| `swagger-jsdoc` | Generates OpenAPI spec from JSDoc comments in route files |
| `swagger-ui-express` | Serves interactive Swagger documentation at `/docs` |
| `nodemon` | Dev tool — auto-restarts server on file save |

## Environment Variables

### Local MongoDB

```
MONGODB_URI=mongodb://localhost:27017/schooldb
PORT=3000
NODE_ENV=development
```

### Cloud MongoDB (MongoDB Atlas)

MongoDB Atlas gives you a connection string like:
```
mongodb+srv://USER:PASSWORD@cluster.mongodb.net/schooldb
```

Paste the full string as the value of `MONGODB_URI`.

> Do **not** commit your `.env` file to Git.

## Data Models

### Student

```js
{
  _id: ObjectId,   // auto-generated by MongoDB
  name: String,    // required
  email: String    // required, unique
}
```

### Course

```js
{
  _id: ObjectId,
  title: String,      // required
  instructor: String  // required
}
```

### Enrollment

```js
{
  _id: ObjectId,
  student: ObjectId,  // references Student
  course: ObjectId    // references Course
}
```

## How Relationships Work

MongoDB does not have SQL JOINs. Instead, Mongoose uses `populate()` to replace a stored ObjectId with the full document it references.

```js
// Without populate — returns ObjectId references
{ student: "664a1f...", course: "664a2b..." }

// With populate("course") — replaces course ID with full document
{ student: "664a1f...", course: { title: "Intro to JS", instructor: "Dr. Lee" } }
```

This happens in the enrollment service when querying enrollments by student or course.

## Database Definition

In PostgreSQL, the database structure is defined by `CREATE TABLE` SQL statements.

In MongoDB, **the structure is defined by the Mongoose schemas in the `models/` folder**. There are no SQL statements and no separate setup step.

| Model file | Creates collection | Defines |
|---|---|---|
| `models/Student.js` | `students` | name (required), email (required, unique) |
| `models/Course.js` | `courses` | title (required), instructor (required) |
| `models/Enrollment.js` | `enrollments` | student ref, course ref |

MongoDB creates each collection automatically the first time a document is inserted into it. Mongoose also creates any indexes defined in the schema (such as the unique index on `email`) automatically when the model is first used.

You do not need to run any setup SQL before using the API.

## Seeding the Database

The seed script clears all existing data and inserts the same sample dataset as the PostgreSQL version:

- 3 students: Alice Johnson, Bob Smith, Maria Garcia
- 3 courses: Intro to JavaScript, Database Fundamentals, Web Development Basics
- 4 enrollments linking students to courses

```bash
npm run seed
```

On a fresh database, `deleteMany()` on a non-existent collection is a no-op — it does not throw an error. The collections are created automatically by the first `insertMany()` call.

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

Note: All `:id` parameters are MongoDB **ObjectId strings** (24-char hex), not integers.

## Testing the Routes

### GET routes — use your browser or curl

```bash
curl http://localhost:3000/students
curl http://localhost:3000/courses
```

A student response looks like this — note `_id`, not `id`:
```json
[
  {
    "_id": "664a1f2b3c4d5e6f7a8b9c0d",
    "name": "Alice Johnson",
    "email": "alice@email.com"
  }
]
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

# Delete a student (use the _id from a GET response)
curl -X DELETE http://localhost:3000/students/664a1f2b3c4d5e6f7a8b9c0d
```

### How to test enrollments

Enrollments require real ObjectIds from your database. Here is the step-by-step flow:

1. Run `GET /students` and copy the `_id` of a student
2. Run `GET /courses` and copy the `_id` of a course
3. Use those values in the POST body:

```bash
curl -X POST http://localhost:3000/enrollments \
  -H "Content-Type: application/json" \
  -d '{"studentId": "664a1f2b3c4d5e6f7a8b9c0d", "courseId": "664a2b3c4d5e6f7a8b9c0e1f"}'
```

If you have already run `npm run seed`, the database has sample students and courses with their own ObjectIds. Run `GET /students` first to see them.

### Swagger UI

```
http://localhost:3000/docs
```

## What This Project Teaches

- How MongoDB differs from a relational database — documents vs. rows, collections vs. tables
- How Mongoose schemas define structure and validation for MongoDB documents
- How ObjectId references replace SQL foreign keys
- How `populate()` replaces SQL JOINs to query related data
- Why collections are created automatically and no seed script table creation is needed
- That the same layered architecture (routes → controllers → services) works regardless of the database

## Troubleshooting

**MongoDB connection error**
```
❌ MongoDB connection failed: ...
```
Check that your `MONGODB_URI` in `.env` is correct and that your MongoDB instance is running.

**Cannot find module or missing dependency**
```
Error: Cannot find module 'mongoose'
```
Run `npm install` from the project root.

**Port already in use**
```
Error: listen EADDRINUSE :::3000
```
Stop the process using port 3000 or change `PORT` in your `.env` file.

**Invalid ID format error**
```
{ "error": "Invalid ID format" }
```
MongoDB IDs are 24-character hex strings (e.g. `664a1f2b3c4d5e6f7a8b9c0d`), not integers. Copy the `_id` from a GET response and use that.

**nodemon not found**
```
nodemon: command not found
```
Run `npm install` from the project root. Nodemon is a dev dependency and must be installed locally.
