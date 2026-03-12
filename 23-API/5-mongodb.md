
# MongoDB Setup and Introduction

**MongoDB** is a popular **NoSQL document database** designed for modern applications that need flexibility, scalability, and fast development.

Unlike relational databases such as PostgreSQL, MongoDB stores data as **documents** instead of rows in tables.

MongoDB is widely used in applications built with:

- Node.js
- Express
- React
- Next.js
- Python
- Mobile apps

## Common Use Cases

- Web and mobile backends
- Real-time applications
- APIs and microservices
- Applications with flexible or evolving data structures

MongoDB is especially popular in the **JavaScript ecosystem**, often used with **Node.js and Mongoose**.

## MongoDB vs SQL

Earlier we learned how to write SQL queries like:

```sql
SELECT * FROM students;
```

SQL is a language used to communicate with **relational databases** such as PostgreSQL.

MongoDB works differently.

Instead of tables and rows, MongoDB stores data in **collections and documents**.

Think of it like this:

```
SQL → language used to query relational databases
MongoDB → database system storing documents
Mongoose → library that helps Node.js work with MongoDB
```

When an application uses MongoDB:

1. The application sends a query
2. MongoDB processes the query
3. It reads or updates stored documents
4. It returns the result

MongoDB is one of the most widely used **NoSQL databases** in modern web development.

## Understanding Documents and Collections

When working with databases, the **main goal is storing and organizing
data** so applications can retrieve it later.

Different database systems organize data in different ways.

Two of the most common models are:

-   **Relational databases** (PostgreSQL, MySQL)
-   **Document databases** (MongoDB)

Understanding how they structure data is the key to understanding
MongoDB.

### How MongoDB Stores Data

MongoDB uses a **document-based model**.

Instead of tables and rows, MongoDB stores data in:

-   **Collections**
-   **Documents**

Structure:

    Collection
     ├─ Document
     │   ├─ Field
     │   ├─ Field
     │   └─ Field
     └─ Document

### Table vs Collection

    Relational Database (SQL)

    Table
     ├─ Row
     │   ├─ Column
     │   ├─ Column
     │   └─ Column
     └─ Row


    MongoDB (NoSQL)

    Collection
     ├─ Document
     │   ├─ Field
     │   ├─ Field
     │   └─ Field
     └─ Document


| SQL Concept | MongoDB Equivalent | What It Means |
|--------------|-------------------|---------------|
| Table | Collection | A container that stores a group of related records (for example: `students`, `orders`, or `products`). |
| Row | Document | A single record in the database that represents one item, such as one student or one product. |
| Column | Field | A specific piece of data inside the record, such as `name`, `email`, or `price`. |

------------------------------------------------------------------------

### Example SQL Data

In PostgreSQL, you might store a student like this:

students (table)

### Example SQL Table

**students (table)**

| id | name | email |
|----|------|------|
| 1 | Alice Johnson | alice@email.com |

To represent courses, you might need **another table**:

**enrollments (table)**

| id | student_id | course |
|----|------------|--------|
| 1 | 1 | JavaScript |
| 2 | 1 | Databases |

Relational databases split data into **multiple tables** and connect them using **relationships**.

### Example MongoDB Document

In MongoDB, the same student could be stored as **one document**.

``` json
{
  "name": "Alice Johnson",
  "email": "alice@email.com",
  "courses": ["JavaScript", "Databases"]
}
```

Instead of splitting information into multiple tables, MongoDB can **embed related data inside the document**.

### Collections Contain Documents

Documents are stored inside **collections**.

Example collection: `students`

    students (collection)

    Document 1
    {
      name: "Alice",
      email: "alice@email.com"
    }

    Document 2
    {
      name: "Bob",
      email: "bob@email.com"
    }

Each document represents **one record**, similar to a **row in a SQL
table**.

### BSON vs JSON

MongoDB stores documents using **BSON (Binary JSON)**.

BSON is similar to JSON but optimized for databases.

Example JSON document:

``` json
{
  "name": "Alice",
  "email": "alice@email.com"
}
```

MongoDB stores this internally as **BSON**, which allows:

-   Faster queries
-   Additional data types
-   Efficient storage

Developers usually **write and read JSON**, while MongoDB handles the
BSON conversion internally.

## Where MongoDB Runs

A MongoDB database server can run in two places:

1. **Locally on your computer**
2. **In the cloud on a remote server**

Just like PostgreSQL, the database software is the same — only the **location of the server changes**.

### Local Development Setup

When running MongoDB locally for a full-stack application, you will typically have **three servers running on your computer**:

1. A **React frontend server**
2. A **Node.js / Express backend API**
3. A **MongoDB database server**

```
Your Computer
│
├── React Frontend Server
│
├── Node.js API Server
│
└── MongoDB Database Server
```

Your backend connects to MongoDB using:

```
mongodb://localhost:27017/my_database
```

Local databases are commonly used for:

- development
- testing
- experimentation
- learning database concepts

### Cloud Database Setup

Instead of installing MongoDB locally, you can use a **cloud database provider**.

Your computer runs:

- React frontend
- Node backend

The MongoDB database runs remotely.

```
Your Computer
│
├── React Frontend
│
└── Node API
        │
        ▼
      Internet
        │
        ▼
   Cloud MongoDB Server
```

Example connection string:

```
mongodb+srv://username:password@cluster.mongodb.net/mydatabase
```

### Example MongoDB Cloud Providers

| Provider | Description |
|--------|-------------|
| MongoDB Atlas | Official MongoDB cloud hosting platform |
| Railway | Easy deployment platform |
| Render | Cloud hosting with database support |
| DigitalOcean | Managed MongoDB clusters |

The most common option for beginners is **MongoDB Atlas**.

## Tools for Managing MongoDB

Managing a database means:

- viewing documents
- inserting records
- debugging data
- exploring database structure

MongoDB can be managed using **GUI tools**.

| Task | Using Code | Using GUI Tool |
|-----|-----------|-------------|
| Insert data | `db.users.insertOne()` | Form editor |
| Query data | `db.users.find()` | Table viewer |
| Update documents | `updateOne()` | Edit record |
| Delete documents | `deleteOne()` | Delete row |

### MongoDB Compass (Recommended)

MongoDB Compass is the **official GUI tool for MongoDB**.

Features:

- visual database explorer
- document editor
- query builder
- index management
- performance monitoring

Download:

https://www.mongodb.com/products/compass

### Creating a Cloud MongoDB Database with MongoDB Atlas

MongoDB Atlas is the **official cloud platform for MongoDB**.

It allows you to create a database in minutes without installing anything locally.

### Step 1 — Create an Atlas Account

Visit:

https://www.mongodb.com/cloud/atlas

Sign up and ffter signing up you will enter the **Atlas dashboard**.

### Step 2 — Create a Cluster

Click **Create Cluster**.

Choose **Free Shared Cluster**.

Give your cluster a name.

Example:

```
student-database
```

Click **Create Cluster**.

Atlas will now create your MongoDB database server.

### Step 3 — Create a Database User

MongoDB requires authentication.

Create a user:

```
username: student
password: yourpassword
```

### Step 4 — Get Your Connection String

Example:

```
mongodb+srv://student:password@cluster.mongodb.net/mydatabase
```

## Using Mongoose with Node.js

Most Node.js applications use **Mongoose**.

Install:

```bash
npm install mongoose
```

## Connecting Node.js to MongoDB

Example:

```javascript
import mongoose from "mongoose";

mongoose.connect(process.env.MONGO_URI);

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});
```

Example `.env`:

```
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/mydatabase
```

### Creating a Schema with Mongoose

```javascript
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  name: String,
  email: String
});

export default mongoose.model("Student", studentSchema);
```

### Creating Documents

```javascript
const student = await Student.create({
  name: "Alice Johnson",
  email: "alice@email.com"
});
```

### Querying Documents

Retrieve all students:

```javascript
const students = await Student.find();
```

Find one student:

```javascript
const student = await Student.findOne({ name: "Alice Johnson" });
```

### Modeling Relationships

MongoDB does not use **foreign keys** like SQL databases.

Relationships are modeled using **references**.

```javascript
const enrollmentSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student"
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course"
  }
});
```

## What Happens Next

Now that you have:

- created a **MongoDB cloud database**
- connected using **MongoDB Compass**
- learned how **documents and collections work**
- defined **Mongoose schemas**

Next we will connect a **Node.js Express API** to MongoDB so our application can store and retrieve real data.
