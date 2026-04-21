#  Project 04: Full-Stack CRUD Application (3-Tier Architecture)

##  Project Overview

This capstone project brings together **everything you’ve learned throughout the bootcamp** — including frontend development, backend APIs, and working with a database.

You will build a **full-stack CRUD application** that allows users to **create, read, update, and delete data** through a web interface connected to a backend API and a PostgreSQL database.

The project should follow the principles of **3-Tier Architecture**, separating the application into:

- **Presentation Layer (Frontend)**
- **Application Layer (Backend / Business Logic)**
- **Data Layer (Database)**

🎯 **Goal**

Demonstrate your ability to design, build, and deploy a **complete full-stack application** with a clean architecture and a persistent database.

##  Key Skills Covered

- **React** — building the client-side interface
- **Node.js + Express** — backend API development
- **PostgreSQL** — relational database design
- **Neon** — cloud-hosted PostgreSQL database
- **pg library** — connecting Node.js to PostgreSQL
- **REST API design**
- **3-Tier architecture**
- **Full CRUD operations**
- **Deployment of frontend and backend**

## Architecture Overview

Your application should follow a **3-tier architecture** structure.

| Tier | Description | Technologies |
|-----|-------------|-------------|
| **Presentation Layer** | User interface that interacts with the backend API | React |
| **Application Layer** | Handles API requests, business logic, and database operations | Node.js + Express |
| **Data Layer** | Stores persistent application data | PostgreSQL (Neon cloud instance) |

The request flow should look like this:

```
Frontend (React)
        ↓
API Routes
        ↓
Controllers
        ↓
Services (Business Logic)
        ↓
PostgreSQL Database
```

##  Backend Architecture Requirements

Your backend must follow a **layered architecture**.

At minimum, the backend should include:

### Routing Layer

Defines API endpoints.

Example:

```
GET /items
POST /items
PUT /items/:id
DELETE /items/:id
```

Routing files should only **map routes to controllers**.

### Controller Layer

Controllers:

- Receive requests
- Validate input
- Call service functions
- Send responses back to the client

Controllers should **not contain database logic directly**.

### Service Layer

Services contain the **core business logic** and interact with the database.

Responsibilities include:

- Querying the database
- Processing data
- Implementing application rules

### Database Layer

The service layer communicates with a **PostgreSQL database** using the **pg library**.

## 🏷️ TypeScript Typing Requirements

Adding types to key parts of your application improves reliability, makes your code self-documenting, and catches bugs at compile time rather than runtime. You do **not** need to type everything — focus on the areas where types provide the most value.

### TypeScript Setup (if not already configured)

```bash
npm install --save-dev typescript @types/node @types/express @types/pg ts-node
npx tsc --init
```

Recommended `tsconfig.json` settings for a Node.js + Express project:

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./src"
  }
}
```

---

### Where to Add Types

#### 1. Service Layer

Type every function's parameters and return value. Since services interact with the database, typing them ensures the rest of the app always receives the shape it expects.

> 💡 Define a type for your core entity to use as the return type across your service functions. For example, if your app manages tasks:

```ts
// This type should reflect the shape of a row in your database table
type Task = {
  id: number
  name: string
  description: string
  created_at: Date
}
```

```ts
// services/taskService.ts
export async function getAllTasks(): Promise<Task[]> { ... }

export async function getTaskById(id: number): Promise<Task | null> { ... }

export async function createTask(name: string, description: string): Promise<Task> { ... }

export async function updateTask(id: number, name?: string, description?: string): Promise<Task | null> { ... }

export async function deleteTask(id: number): Promise<boolean> { ... }
```

---

#### 2. Controller Layer

Type Express `Request` and `Response` parameters. Use `req.params`, `req.body`, and `res.json()` with typed shapes.

```ts
// controllers/itemController.ts
import { Request, Response } from "express"

export async function createItemController(req: Request, res: Response): Promise<void> {
  const { name, description } = req.body as { name: string; description: string }
  // validate and call service...
}
```

For typed route parameters and request bodies, you can use Express generics:

```ts
// Request<Params, ResBody, ReqBody, Query>
export async function getItemByIdController(
  req: Request<{ id: string }>,
  res: Response
): Promise<void> {
  const id = parseInt(req.params.id)
  // ...
}
```

---

#### 3. API Response Shapes

Define a typed wrapper for consistent API responses across all endpoints.

```ts
// types/api.ts
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
}
```

Use it in controllers:

```ts
res.json({ success: true, data: item } satisfies ApiResponse<Item>)
res.status(404).json({ success: false, error: "Item not found" } satisfies ApiResponse<never>)
```

---

### What You Don't Need to Type

Not every file needs explicit types. Skip typing in:

- Simple configuration files (e.g. `server.ts` bootstrapping code)
- Database connection setup (the `pool` object is typed by the `pg` library automatically)
- Route files (these just map paths to controllers — minimal logic)

The goal is to type the **boundaries between layers** (service inputs/outputs and controller request/response shapes), not every line of code.

## 🗄️ PostgreSQL Database Requirements

Your project must use:

- **PostgreSQL**
- A **Neon cloud database instance**
- The **pg Node.js library** to connect your backend to the database

Example connection pattern:

```js
import pkg from "pg"
const { Pool } = pkg

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})
```

Your services will use this connection to execute queries.

## 🌱 Database Seeding

You **do not need to include SQL seed scripts inside your server code**.

You may create and seed your database manually.

### What is Seeding?

**Seeding** means inserting **initial data into a database** so the application has records available to test and demonstrate functionality.

Examples of seeded data:

- Sample products
- Example posts
- Example tasks
- Demo records for testing CRUD operations

### Creating Tables

Tables can be created in two common ways:

1️⃣ **Manual setup**

You manually create tables using SQL tools such as:

- Neon SQL editor
- psql
- DB Fiddle
- Database GUI tools

2️⃣ **Server initialization**

Some applications run SQL scripts automatically when the server starts to create tables if they do not exist.

For this project, you may assume the **database and tables already exist**.

## 💡 Core CRUD Features

Your application must demonstrate **full CRUD functionality**.

CRUD stands for:

| Operation | Description |
|----------|-------------|
| **Create** | Add new records |
| **Read** | Retrieve records |
| **Update** | Modify existing records |
| **Delete** | Remove records |

### Examples of CRUD Functionality

Your application could support features such as:

Create
- Add a new task
- Create a product listing
- Add a new note or article

Read
- Display a list of records
- View details for a single record

Update
- Edit an existing item
- Change the status of a record

Delete
- Remove an item
- Delete a record permanently

The exact subject of the application is **up to you**, as long as the system demonstrates **full CRUD operations**.

##  Development Focus

You should design the project starting from the **frontend**, then connect it to the backend and database.

### Frontend

Responsible for:

- User interface
- Forms for creating and editing data
- Displaying lists of records
- Calling backend APIs using `fetch()` or `axios`

### Business Logic

The backend API should:

- Receive requests from the frontend
- Validate inputs
- Execute database queries
- Return JSON responses

### Database Layer

Stores persistent application data in PostgreSQL.

Your backend will communicate with the database using the **pg library**.

##  Deployment (Frontend and Backend on Separate Cloud Services)

Both parts of the application must be deployed separately.

| Component | Requirement |
|----------|-------------|
| Frontend | Hosted on a platform such as Vercel or Netlify |
| Backend | Hosted on a platform such as Render, Railway, or similar |
| Database | Hosted on Neon |

Because the frontend and backend are hosted on **different services**, there are several important considerations.

---

### API URL Configuration

Your frontend must call the **deployed backend URL**, not `localhost`.

Example:

```
http://localhost:3000/api/items
```

Local development API.

```
https://my-backend-api.onrender.com/api/items
```

Deployed API.

It is common to store the API URL in **environment variables**.

Example:

```
VITE_API_URL=https://my-backend-api.onrender.com
```

---

### CORS Configuration

Since the frontend and backend run on **different domains**, the backend must allow requests from the frontend domain.

Example Express setup:

```js
import cors from "cors"

app.use(cors({
  origin: "https://my-frontend-app.vercel.app"
}))
```

Without CORS configured correctly, the browser will block requests.

---

### Environment Variables

Sensitive values should never be hardcoded.

Common backend environment variables:

```
DATABASE_URL
PORT
NODE_ENV
```

Frontend environment variables may include:

```
VITE_API_URL
```

Each hosting platform provides a way to configure environment variables.

---

### Database Connection Security

Your backend must connect securely to the database.

Example:

```
DATABASE_URL=postgres://user:password@host/database
```

This value is usually provided by the **Neon dashboard** and stored as an environment variable.

---

### Build vs Runtime Environments

Frontend applications are **built before deployment**, while backend servers run continuously.

Typical workflow:

Frontend

```
npm run build
```

Backend

```
npm start
```

Deployment platforms handle this automatically when configured correctly.

---

### Network Latency

Since the frontend, backend, and database may all run on **different servers**, requests must travel across the internet.

This is normal in modern applications but highlights why:

- APIs should be efficient
- unnecessary requests should be avoided

---

### Production vs Local Development

During development:

```
Frontend → localhost backend
```

After deployment:

```
Frontend (Vercel)
      ↓
Backend API (Render)
      ↓
Database (Neon)
```

Your application should work correctly in **both environments**.

---

### Why This Architecture Is Useful

Even though some platforms allow hosting everything together, separating services teaches important real-world concepts:

- Distributed systems
- API-based architecture
- Cloud deployment
- Environment configuration
- Security practices


##  Project Deliverables

Your submission should include:

### 1. GitHub Repository

Contains:

- Frontend code
- Backend code
- Organized project structure

---

### 2. Running Application

Provide links to:

- **Hosted frontend**
- **Hosted backend API**

---

### 3. README.md

Your repository should include documentation explaining:

- Project overview
- Technology stack
- How to run the project locally
- API endpoints
- Database setup instructions

## 🔮 Optional Future Improvements

These are **not required**, but are common next steps in real applications.

Possible improvements include:

- Adding **API documentation (Swagger / OpenAPI)**
- Adding **authentication and user accounts**
- Adding **automated tests**
- Implementing **pagination for large datasets**
- Adding **input validation libraries**

## 🏁 Final Notes

This project demonstrates your ability to build a **complete full-stack CRUD application** using a professional backend structure.

Focus on:

- Clean architecture
- Clear separation of frontend, business logic, and database layers
- Proper API design
- Organized code

The goal is to show that you can build a **real-world style web application** from frontend interface to database storage.
