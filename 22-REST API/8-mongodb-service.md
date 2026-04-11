# Integrating MongoDB Into Your REST API

Earlier in this course we introduced the basic backend request flow:

Client → Route → Controller → Service → Database

This architecture does **not change depending on the database you use**.  
Whether your application uses **PostgreSQL, MongoDB, MySQL, or another database**, the backend layers remain the same.

The responsibilities of each layer stay consistent:

| Layer | Responsibility |
|------|------|
| Client | Sends HTTP requests from the frontend application |
| Route | Defines API endpoints |
| Controller | Handles requests and returns responses |
| Service | Contains business logic and database operations |
| Database | Stores application data |

Because this structure is already covered in the PostgreSQL section, we won't repeat the full explanation again here.

- How MongoDB stores data using **documents and collections**
- How Node.js applications **connect to MongoDB**
- The tools used to interact with MongoDB such as **Mongoose and the MongoDB driver**

The architecture still looks like this:

Client (React) → Route → Controller → Service → MongoDB

The only difference is **how the service layer communicates with the database**.

## Connecting Your Service to MongoDB

Now that we understand how the service layer talks to the database, the next step is understanding how our Node.js application actually connects to MongoDB.

MongoDB is where your application **stores its data**, but your backend server still needs a way to **communicate with that database**.

To do that, your application creates a **database connection**. This connection allows your services to send queries to MongoDB and receive results.

In most applications:

- The database connection is created once when the server starts
- The service layer reuses that connection whenever it needs to run queries
- A database library manages communication between Node.js and MongoDB

No matter what tool you choose, your application must use **some type of database library** to talk to MongoDB.

## Common Tools for Connecting Node.js to MongoDB

| Tool | Type | How It Works | Best For |
|-----|-----|-----|-----|
| MongoDB Driver | Native Database Driver | Sends queries directly to MongoDB | Learning MongoDB and full control |
| Mongoose | ODM | Define schemas and models for documents | Most Node.js MongoDB apps |
| Prisma | Modern ORM/ODM | Schema-driven generated client | Structured TypeScript apps |
| Typegoose | Mongoose Wrapper | TypeScript classes for models | TypeScript MongoDB projects |

## Where These Tools Fit in the Architecture

```
Service Layer
      │
      ▼
Database Library (MongoDB Driver / Mongoose / Prisma)
      │
      ▼
MongoDB Database
```

All of these tools ultimately do the same thing:

**They allow your Node.js application to send queries to MongoDB and retrieve data.**

## Connecting Your Node.js Backend to MongoDB

Your backend needs a **database connection layer** so it can send queries to MongoDB and retrieve results.

Node.js cannot talk to MongoDB directly — it needs a **database driver or ODM**.

The most common approaches in Node.js applications are:

- MongoDB Driver
- Mongoose
- Prisma
- Typegoose

Each option provides a different balance between **control, abstraction, and developer productivity**.

### Option 1: Using the Native MongoDB Driver

#### Install

```bash
npm install mongodb
```

#### Connect

```js
import { MongoClient } from "mongodb"

const client = new MongoClient("mongodb://localhost:27017")

await client.connect()

export const db = client.db("myappdb")
```

#### Use in a service

```js
const users = await db.collection("users").find().toArray()
return users
```

### Option 2: Using Mongoose (ODM) --- Recommended

#### Install

```bash
npm install mongoose
```

#### Connect

```js
import mongoose from "mongoose"

await mongoose.connect("mongodb://localhost:27017/myappdb")
```

#### Define a Model

```js
const userSchema = new mongoose.Schema({
  name: String,
  email: String
})

export const User = mongoose.model("User", userSchema)
```

#### Query Example

```js
const users = await User.find()
```

### Option 3: Using Prisma with MongoDB

#### Install

```bash
npm install prisma --save-dev
npm install @prisma/client
npx prisma init
```

#### Schema Example

```prisma
model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  name  String
  email String @unique
}
```

#### Query Example

```js
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const users = await prisma.user.findMany()
```

## Summary

Even though MongoDB is a **document database**, the overall backend architecture remains the same as with relational databases:

Client → Route → Controller → Service → MongoDB

Each layer has a clear responsibility:

- **Client** – Sends HTTP requests from the frontend application.
- **Route** – Defines API endpoints and forwards requests.
- **Controller** – Handles requests and returns responses.
- **Service** – Contains business logic and performs database operations.
- **Database** – Stores the application's persistent data.

A key design principle is that **controllers should not communicate directly with the database**.  
Instead, controllers call **services**, and the service layer handles all database queries.

To communicate with MongoDB, Node.js applications must use a **database library**.  
Common options include:

- **MongoDB Driver** – The native driver for running MongoDB queries
- **Mongoose** – An ODM that provides schemas and models for documents
- **Prisma** – A schema-driven client with strong TypeScript support
- **Typegoose** – A TypeScript wrapper around Mongoose models

Regardless of the tool used, the architecture always follows the same pattern:

```
Service Layer
      │
      ▼
Database Library
      │
      ▼
MongoDB Database
```