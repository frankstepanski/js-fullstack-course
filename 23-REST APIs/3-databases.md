# Why APIs Need Databases

APIs are the bridge between your frontend and your data.  
When your React app calls `fetch("/api/users")`, it’s asking your backend (the API) to retrieve real information from a **database**.

### The Data Flow
```text
Frontend (React) → API (Express) → Database (MongoDB, SQL, etc.) → Response
```

The API handles all interactions between the user interface and the database — sending, updating, and deleting data as needed.

| HTTP Method | What It Does | Example |
|--------------|--------------|----------|
| **GET** | Reads data | Get a list of users |
| **POST** | Creates data | Add a new product |
| **PUT** | Updates data | Change a user’s profile info |
| **DELETE** | Deletes data | Remove a record |

This pattern — known as **CRUD** (Create, Read, Update, Delete) — is the foundation of RESTful APIs.



### Local vs Cloud Databases

You can run a database **locally** (on your computer) or **in the cloud**.

| Type | Description | Example Use |
|------|--------------|--------------|
| **Local** | Installed on your machine, for development or learning. | Using MongoDB Community Edition |
| **Cloud** | Hosted on servers you access remotely. | MongoDB Atlas, AWS RDS, Firebase |

Most production APIs use **cloud-hosted databases** for scalability, backups, and 24/7 uptime.



## Adding a Services Layer — Logic & Data Processing

Up to this point, your routes and controllers have been talking directly to your database models (via Mongoose).  
That works for small demos, but in larger applications, this approach can get messy.  
This is where the **Service Layer** comes in — it separates your **business logic** from your **controller logic**.

### What Is a Service?

A **service** is a plain JavaScript module that contains reusable functions responsible for:
- Fetching or saving data  
- Performing calculations or business rules  
- Handling errors and validations  
- Combining or transforming data from multiple models  

The service layer acts as the “middleman” between **controllers** (which handle HTTP requests) and **models** (which handle database structure).

### Example: Creating a User Service

### `services/userService.js`
```js
import User from "../models/User.js";

// Get all users
export const getAllUsers = async () => {
  return User.find();
};

// Create a new user
export const createUser = async (userData) => {
  // Example: basic validation
  if (!userData.email || !userData.name) {
    throw new Error("Missing required fields");
  }

  // Example: prevent duplicates
  const existingUser = await User.findOne({ email: userData.email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  return User.create(userData);
};
```

### Example: Controller Using the Service

### `controllers/userController.js`
```js
import * as userService from "../services/userService.js";

export const getUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

export const addUser = async (req, res) => {
  try {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
```

>Now the **controller** just handles HTTP requests and responses —  
while the **service** deals with all the database and logic work.


### 💡 Why Add a Service Layer?

| Benefit | Description |
|----------|-------------|
| **Cleaner Controllers** | Routes stay simple — no database logic or error handling clutter. |
| **Reusability** | The same service functions can be used by APIs, background jobs, or scripts. |
| **Scalability** | Easier to add caching, validation, or external API calls later. |
| **Testability** | You can test services directly without starting an Express server. |

---

### Full Flow with Services

```text
Client (Frontend)
   ↓
Controller (Handles HTTP requests)
   ↓
Service (Business logic, talks to DB)
   ↓
Model (Mongoose schema interacting with MongoDB)
   ↓
Database (Stores the data)
```

Adding this layer turns your API from a simple demo into a **maintainable, professional-grade architecture** — one that scales as your features grow.

### ✅ Summary

- Services handle the “thinking” part of your app — the rules, data operations, and validations.  
- Controllers handle the “speaking” part — managing requests and sending responses.  
- Models handle the “storage” part — the structure of your database.  

Together, they form the backbone of a scalable Node + Express + MongoDB API.

## Using PostgreSQL Instead of MongoDB

Now that we'vew talked about MongoDB, let’s talk about **PostgreSQL (Postgres)** — one of the most popular **relational databases** in the world.  
MongoDB and Postgres solve similar problems (storing and retrieving data), but they do it in **very different ways**. Knowing when and why to use one over the other is a key backend skill.

### When to Use a Relational Database

Relational databases like PostgreSQL are great when your data is **structured**, meaning it fits neatly into tables with consistent columns and data types.  
They shine when relationships between data matter — like users, orders, products, or payments.

### Use Cases
- **E-commerce apps** — customers, orders, and inventory have clear relationships.  
- **Banking or financial systems** — data consistency and transactions are critical.  
- **Analytics dashboards** — easy to query and filter large structured datasets.  
- **Enterprise apps** — where you must enforce rules, foreign keys, and validation.

Think of Postgres as your go-to choice when you need structure, consistency, and reliability.

### PostgreSQL vs. MongoDB

| Feature | **PostgreSQL (Relational)** | **MongoDB (NoSQL / Document)** |
|----------|-----------------------------|--------------------------------|
| **Data Structure** | Tables with rows and columns | Collections with flexible JSON documents |
| **Schema** | Fixed schema (must define columns) | Dynamic schema (fields can vary per document) |
| **Relationships** | Supports joins between tables | Typically done manually with references |
| **Transactions** | Fully supported (ACID compliant) | Partial or manual transaction support |
| **Query Language** | SQL (powerful and standardized) | MongoDB Query Language (JSON-based) |
| **Best For** | Complex relationships, strict data | Flexible or rapidly changing data |
| **Scaling** | Vertical (bigger server) or horizontal with tools | Horizontal (sharding built-in) |

### ✅ Advantages of PostgreSQL
- Enforces **data integrity** and **relationships** automatically.  
- Powerful **SQL queries** for filtering, grouping, and joining.  
- Fully **ACID-compliant** (safe, consistent transactions).  
- Works great with **ORMs** like Prisma or Sequelize.  
- Open-source and production-proven (used by companies like Apple, Reddit, and Spotify).

### ⚠️ Disadvantages
- Slightly more setup than MongoDB.  
- Harder to change schema structure mid-project.  
- May be slower for highly unstructured or variable data.  

If your data changes shape frequently (e.g. different users store different fields), MongoDB might be easier.  
But if you need **accuracy**, **relationships**, and **queries**, PostgreSQL is worth it.

### How PostgreSQL Stores Data

Postgres organizes data into **databases**, **tables**, **rows**, and **columns**.

Example structure:
```
my_database
└── users
    ├── id (primary key)
    ├── name (text)
    ├── email (unique)
    └── created_at (timestamp)
```

Each row is like a record (one user).  
Each column defines what type of data can go there.  
You can create relationships between tables using **foreign keys**, e.g. `posts.user_id` links to `users.id`.
