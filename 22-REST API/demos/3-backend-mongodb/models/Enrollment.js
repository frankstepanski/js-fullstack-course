/*
---------------------------------------------------------
Enrollment Model
---------------------------------------------------------

Mongoose model for the enrollments collection.

This is the MongoDB equivalent of the SQL table:

    CREATE TABLE enrollments (
      id SERIAL PRIMARY KEY,
      student_id INTEGER REFERENCES students(id),
      course_id INTEGER REFERENCES courses(id)
    );

Key difference from SQL:
- Instead of foreign key integers, MongoDB stores
  ObjectId references to documents in other collections
- The `ref` option tells Mongoose which model to use
  when populating the reference with full document data

The `populate()` method resolves these references at
query time — it is the MongoDB equivalent of a SQL JOIN.
*/

import mongoose from "mongoose";

const enrollmentSchema = new mongoose.Schema({

  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    required: true
  },

  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true
  }

});

export const Enrollment = mongoose.model("Enrollment", enrollmentSchema);
