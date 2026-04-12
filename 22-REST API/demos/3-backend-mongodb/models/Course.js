/*
---------------------------------------------------------
Course Model
---------------------------------------------------------

Mongoose model for the courses collection.

This is the MongoDB equivalent of the SQL table:

    CREATE TABLE courses (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      instructor TEXT
    );
*/

import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({

  title: {
    type: String,
    required: true
  },

  instructor: {
    type: String,
    required: true
  }

});

export const Course = mongoose.model("Course", courseSchema);
