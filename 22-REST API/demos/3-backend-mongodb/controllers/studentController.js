/*
---------------------------------------------------------
Student Controller
---------------------------------------------------------

Controllers handle incoming HTTP requests and responses.

They:
1. Read data from the request (params, body, query)
2. Validate inputs
3. Call the service layer to perform database work
4. Send the result back to the client

Key difference from the PostgreSQL version:
- IDs are MongoDB ObjectIds (24-char hex strings)
- We validate the ID format before querying to avoid
  a Mongoose CastError on malformed IDs
*/

import mongoose from "mongoose";
import * as studentService from "../services/studentService.js";


/*
---------------------------------------------------------
GET /students
---------------------------------------------------------

Retrieve all students from the database.
*/

export const getStudents = async (req, res, next) => {
  try {

    const students = await studentService.getStudents();

    res.json(students);

  } catch (err) {
    next(err);
  }
};


/*
---------------------------------------------------------
GET /students/:id
---------------------------------------------------------

Retrieve a single student by ID.
*/

export const getStudent = async (req, res, next) => {
  try {

    const { id } = req.params;

    /*
    Validate the ID before querying.

    MongoDB IDs are 24-character hex strings called ObjectIds.
    If we pass a badly formatted string (like "abc" or "1") to
    Mongoose, it throws a CastError deep in the database layer
    instead of returning a clean 400 response.

    isValid() catches that before it reaches the database.
    */
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const student = await studentService.getStudent(id);

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json(student);

  } catch (err) {
    next(err);
  }
};


/*
---------------------------------------------------------
POST /students
---------------------------------------------------------

Create a new student.
*/

export const createStudent = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    // -------------------------------------------------
    // Required Field Validation
    // -------------------------------------------------
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }

    // -------------------------------------------------
    // Type Validation
    // -------------------------------------------------
    if (typeof name !== "string" || typeof email !== "string") {
      return res.status(400).json({ error: "Name and email must be strings" });
    }

    // -------------------------------------------------
    // Trim Whitespace
    // -------------------------------------------------
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      return res.status(400).json({ error: "Name and email cannot be empty" });
    }

    // -------------------------------------------------
    // Basic Email Format Validation
    // -------------------------------------------------
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({ error: "Invalid email format" });
    }

    const student = await studentService.createStudent(trimmedName, trimmedEmail);

    res.status(201).json(student);

  } catch (err) {
    // MongoDB duplicate key error code
    if (err.code === 11000) {
      return res.status(400).json({ error: "Email already exists" });
    }
    next(err);
  }
};


/*
---------------------------------------------------------
DELETE /students/:id
---------------------------------------------------------

Delete a student by ID.
*/

export const deleteStudent = async (req, res, next) => {
  try {

    const { id } = req.params;

    // Same ObjectId validation as getStudent above
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const deleted = await studentService.deleteStudent(id);

    if (!deleted) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.json({ message: "Student deleted" });

  } catch (err) {
    next(err);
  }
};
