/*
---------------------------------------------------------
Database Connection
---------------------------------------------------------

This file connects to MongoDB using Mongoose.

Mongoose is an ODM (Object Document Mapper) for MongoDB.

It provides:
- Schema-based modeling of application data
- Built-in type casting and validation
- Query building
- Middleware hooks

Unlike the PostgreSQL version which uses a connection
pool, Mongoose manages its own internal connection pool
automatically after a single connect() call.
*/

import mongoose from "mongoose";

/*
---------------------------------------------------------
connectDB()
---------------------------------------------------------

Establishes a connection to MongoDB using the URI
from the environment variables.

Called once in server.js before the server starts.
All subsequent database operations reuse this connection.
*/

export async function connectDB() {

  try {

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ Connected to MongoDB");

  } catch (error) {

    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit if the database cannot be reached

  }

}
