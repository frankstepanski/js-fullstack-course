/*
---------------------------------------------------------
Student Service Layer
---------------------------------------------------------

The service layer handles all database interaction
for students using Mongoose model methods.

Unlike the PostgreSQL version which runs raw SQL queries
via the pg pool, this layer uses Mongoose's built-in
methods to read and write MongoDB documents.

Key differences from SQL:
- No parameterized queries needed — Mongoose prevents
  injection by design
- IDs are ObjectId strings (24-char hex), not integers
- findById() returns null if not found (not undefined)
*/

import { Student } from "../models/Student.js";

/*
Retrieve all students.
Returns an array of student documents.
*/
export const getStudents = async () => {

  return Student.find().sort({ _id: 1 });

};


/*
Retrieve a single student by ID.
Returns the student document or null if not found.
*/
export const getStudent = async (id) => {

  return Student.findById(id);

};


/*
Create a new student.
Returns the newly created student document.
*/
export const createStudent = async (name, email) => {

  return Student.create({ name, email });

};


/*
Delete a student by ID.
Returns the deleted student document, or null if not found.
*/
export const deleteStudent = async (id) => {

  return Student.findByIdAndDelete(id);

};
