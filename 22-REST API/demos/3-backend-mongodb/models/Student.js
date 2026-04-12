/*
---------------------------------------------------------
Student Model
---------------------------------------------------------

Mongoose models define the shape of documents stored
in a MongoDB collection.

This is the MongoDB equivalent of the SQL table:

    CREATE TABLE students (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE
    );

Key differences from SQL:
- MongoDB auto-generates a unique `_id` field (ObjectId)
  for every document — no need to define a primary key
- Schema validation happens in the application layer
  via Mongoose, not in the database itself
*/

import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  }

});

export const Student = mongoose.model("Student", studentSchema);
