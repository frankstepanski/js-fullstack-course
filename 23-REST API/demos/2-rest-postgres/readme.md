# School REST API (Node.js + Express + PostgreSQL)

This project is a **complete REST API** built using:

-   Node.js
-   Express
-   PostgreSQL
-   pg (PostgreSQL driver)
-   Swagger (OpenAPI)

The API demonstrates a **clean backend architecture** using:

Router → Controller → Service → Database

The goal of this project is to help beginners understand how a backend
server communicates with a relational database while keeping the
architecture organized and easy to maintain.

## Table of Contents

- [Technologies Used](#technologies-used)
- [Project Architecture](#project-architecture)
- [Responsibilities](#responsibilities)
- [Project Structure](#project-structure)
- [Installation and Setup](#installation-and-setup)
- [Running the Server](#running-the-server)
- [API Documentation (Swagger)](#api-documentation-swagger)
- [Environment Variables](#environment-variables)
- [Database Schema and Seeding](#database-schema-and-seeding)
  - [Students Table](#students)
  - [Courses Table](#courses)
  - [Enrollments Table](#enrollments)
  - [Database Seeding](#database-seeding)
- [API Endpoints](#api-endpoints)
  - [Students](#students-1)
  - [Courses](#courses-1)
  - [Enrollments](#enrollments-1)
- [Common Debugging Issues](#common-debugging-issues)
- [What You've Learned](#what-youve-learned)
- [Next Steps](#next-steps)

## Technologies Used
| Technology | Purpose |
|------------|--------------------------------------------------|
| Node.js | Runtime for running JavaScript on the server |
| Express | Framework for building REST APIs |
| PostgreSQL | Relational database |
| pg | PostgreSQL driver for Node |
| cors | Enables cross-origin requests |
| helmet | Adds security-related HTTP headers |
| morgan | Logs incoming HTTP requests |
| dotenv | Loads environment variables |
| nodemon | Automatically restarts the server during development |
| swagger-jsdoc | Generates OpenAPI documentation |
| swagger-ui-express | Serves interactive API documentation |

## Project Architecture

    Client Request
          │
          ▼
    Router
          │
          ▼
    Controller
          │
          ▼
    Service
          │
          ▼
    PostgreSQL Database

## Responsibilities

| Layer | Responsibility |
|------|--------------------------------|
| Router | Defines API endpoints |
| Controller | Handles requests and responses |
| Service | Runs SQL queries |
| Database | Stores data |

## Project Structure

    school-api
    │
    ├── db
    │   └── db.js
    │
    ├── routes
    │   ├── studentRoutes.js
    │   ├── courseRoutes.js
    │   └── enrollmentRoutes.js
    │
    ├── controllers
    │   ├── studentController.js
    │   ├── courseController.js
    │   └── enrollmentController.js
    │
    ├── services
    │   ├── studentService.js
    │   ├── courseService.js
    │   └── enrollmentService.js
    │
    ├── middleware
    │   └── errorHandler.js
    │
    ├── app.js
    ├── server.js
    └── .env

## Installation and Setup

Install dependencies:

``` bash
npm install express pg cors helmet morgan dotenv chalk
```

Install development tool:

``` bash
npm install nodemon --save-dev
```

### Running the Server

Development mode:

``` bash
npm run dev
```

Production mode:

``` bash
npm start
```

API URL:

    http://localhost:3000


## API Documentation (Swagger)

This project includes interactive API documentation powered by **Swagger (OpenAPI 3.0)**.

Swagger automatically generates structured API documentation by scanning
special documentation comments inside the route files.

Instead of manually writing documentation in a separate file, the API
documentation stays in sync with the code.

### What Swagger Provides

Swagger generates:

- A complete list of available endpoints
- Supported HTTP methods (GET, POST, DELETE, etc.)
- Required URL parameters
- Request body schemas
- Response formats
- HTTP status codes
- Interactive “Try it out” functionality

This allows developers to explore and test the API directly in the browser.

### How Documentation Is Generated

Swagger is configured in `app.js` and scans:

    ./routes/*.js

Each route can include special OpenAPI comment blocks that describe:

- Endpoint summary
- Parameters
- Request body schema
- Response structure

Swagger reads those comments and builds a full OpenAPI specification automatically.

---

### Accessing the Documentation

Start the server:

    npm run dev

Then open:

    http://localhost:3000/docs

You will see a fully interactive API documentation page.

### Why Swagger Matters

In real-world applications:

- Frontend developers rely on API documentation
- Teams share OpenAPI specifications
- APIs can generate client SDKs automatically
- Documentation stays synchronized with the source code

By integrating Swagger, this project demonstrates how modern backend
APIs are documented professionally and maintained alongside the codebase.

### Environment Variables

Create a `.env` file in the root of the project.

Example for a **local PostgreSQL installation**:

    DB_USER=postgres
    DB_PASSWORD=password
    DB_HOST=localhost
    DB_PORT=5432
    DB_NAME=schooldb
    PORT=3000

Cloud database providers typically give you a **connection string** that
looks like this:

    postgresql://USER:PASSWORD@HOST:PORT/DATABASE

Example from a Neon database:

    postgresql://neondb_owner:password123@ep-dark-thunder.us-east-1.aws.neon.tech/neondb

This URL contains all the information needed to populate the `.env`
variables used in this project.

Break the connection string into the following parts:

| Part of URL | Environment Variable |
|-------------|----------------------|
| USER        | `DB_USER`            |
| PASSWORD    | `DB_PASSWORD`        |
| HOST        | `DB_HOST`            |
| PORT        | `DB_PORT`            |
| DATABASE    | `DB_NAME`            |

#### SSL for Cloud Databases

Many cloud PostgreSQL providers require encrypted database connections.

This project enables SSL in the database configuration:

    ssl: {
      rejectUnauthorized: false
    }

This allows the application to securely connect to cloud-hosted
PostgreSQL databases.

Local PostgreSQL installations usually do **not** require SSL.

>Do **not** commit your `.env` file to Git.

## Database Schema and Seeding

### Students

``` sql
CREATE TABLE students (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT UNIQUE
);
```

### Courses

``` sql
CREATE TABLE courses (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  instructor TEXT
);
```

### Enrollments

``` sql
CREATE TABLE enrollments (
  id SERIAL PRIMARY KEY,
  student_id INTEGER REFERENCES students(id),
  course_id INTEGER REFERENCES courses(id)
);
```

### Database Seeding

When working with databases during development, it is common to populate the database with sample data so the application has something to work with.

Seeding means inserting predefined records into your database automatically using a script or SQL file.

Instead of manually adding rows every time you create or reset the database, a seed script can quickly recreate the same data set.

Database seeding helps developers:

- quickly populate a new database
- reset development data during testing
- ensure every developer has the same sample data
- demonstrate application features with consistent records

#### Insert Students

``` sql
INSERT INTO students (name, email)
VALUES
('Alice Johnson', 'alice@email.com'),
('Bob Smith', 'bob@email.com'),
('Maria Garcia', 'maria@email.com');
```

#### Insert Courses

``` sql
INSERT INTO courses (title, instructor)
VALUES
('Intro to JavaScript', 'Dr. Lee'),
('Database Fundamentals', 'Dr. Patel'),
('Web Development Basics', 'Dr. Chen');
```

#### Insert Enrollments

``` sql
INSERT INTO enrollments (student_id, course_id)
VALUES
(1,1),
(1,2),
(2,1),
(3,3);
```

This means:

-   Alice is enrolled in Intro to JavaScript and Database Fundamentals
-   Bob is enrolled in Intro to JavaScript
-   Maria is enrolled in Web Development Basics

#### Verify Relationships with a JOIN

``` sql
SELECT students.name, courses.title
FROM enrollments
JOIN students ON enrollments.student_id = students.id
JOIN courses ON enrollments.course_id = courses.id;
```

Example result:

| name | title |
|------|------------------------|
| Alice Johnson | Intro to JavaScript |
| Alice Johnson | Database Fundamentals |
| Bob Smith | Intro to JavaScript |
| Maria Garcia | Web Development Basics |

## API Endpoints

### Students

| Method | Endpoint |
|------|---------------|
| GET | /students |
| GET | /students/:id |
| POST | /students |
| DELETE | /students/:id |

### Courses

| Method | Endpoint |
|-------|--------------|
| GET | /courses |
| GET | /courses/:id |
| POST | /courses |
| DELETE | /courses/:id |

### Enrollments

| Method | Endpoint |
|-------|--------------------------|
| POST | /enrollments |
| GET | /enrollments/student/:id |
| GET | /enrollments/course/:id |

## Common Debugging Issues
| Problem | Cause |
|--------|--------------------------|
| Server not running | Forgot `npm run dev` |
| 404 route error | Wrong endpoint path |
| 500 error | SQL query issue |
| Postman request fails | Missing JSON body |
| Database connection error | Wrong `.env` credentials |

## What You've Learned

This project demonstrates how several key backend technologies work together to build a REST API.

By working through this project you have seen how to:

- build a REST API using **Express**
- connect **Node.js** to a **PostgreSQL** database
- write SQL queries using the **pg driver**
- structure backend code using a **Router → Controller → Service architecture**
- model relationships between tables using **foreign keys**
- query relational data using **SQL JOINs**
- seed a database with sample data
- test API endpoints using **Postman**

These are foundational skills used in many real-world backend applications.

## Next Steps

Once you are comfortable with this API, try extending the project by adding new features.

Some ideas:

- Add **PUT endpoints** to update students or courses
- Add **validation middleware** to verify request data
- Add **pagination** for large lists of students or courses
- Add **authentication** using JWT
- Add **unit tests** for services and controllers
- Connect a **React frontend** to this API

Extending the API is a great way to deepen your understanding of backend development.