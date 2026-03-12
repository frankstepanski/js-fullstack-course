/*
---------------------------------------------------------
Student Controller
---------------------------------------------------------

Controllers handle incoming HTTP requests and responses.

They:
1. Read data from the request (params, body, query)
2. Call the service layer to perform database work
3. Send the result back to the client

The service layer contains the actual database logic.
Errors are forwarded to the global error handler using next().
*/

import * as studentService from "../services/studentService.js";


/*
---------------------------------------------------------
GET /students
---------------------------------------------------------

Retrieve all students from the database.
*/

/**
 * Retrieve all students.
 *
 * @async
 * @function getStudents
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next middleware function
 * @returns {Promise<void>} Sends a JSON array of students
 */
export const getStudents = async (req, res, next) => {
  try {

    // Ask the service layer for all students
    const students = await studentService.getStudents();

    // Return the result as JSON
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

/**
 * Retrieve a single student by ID.
 *
 * @async
 * @function getStudent
 * @param {import("express").Request} req - Express request object containing route parameters
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next middleware function
 * @returns {Promise<void>} Sends the student object or 404 if not found
 */
export const getStudent = async (req, res, next) => {
  try {

    // Get the student id from the URL
    const id = req.params.id;

    // Ask the service layer for the student
    const student = await studentService.getStudent(id);

    // If no student exists with that ID, return a 404 error
    if (!student) {
      return res.status(404).json({
        error: "Student not found"
      });
    }

    // Return the student
    res.json(student);

  } catch (err) {
    next(err);
  }
};


/*
---------------------------------------------------------
POST /students
---------------------------------------------------------

This controller creates a new student.

Responsibilities:
1. Read data from the request body
2. Validate request payload (structure + basic format)
3. Call the service layer
4. Return HTTP 201 with created resource
5. Forward unexpected errors to global error handler

Structural validation happens here.
Business rules (like duplicate emails) happen in the service layer.
*/

/**
 * Create a new student.
 *
 * Performs structural validation before calling the service layer.
 * Business rules are handled in the service layer.
 *
 * @async
 * @function createStudent
 * @param {import("express").Request} req - Express request object containing student data
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next middleware function
 * @returns {Promise<void>} Sends the created student with HTTP 201
 */
export const createStudent = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    // -------------------------------------------------
    // 1️⃣ Required Field Validation
    // -------------------------------------------------
    if (!name || !email) {
      return res.status(400).json({
        error: "Name and email are required"
      });
    }

    // -------------------------------------------------
    // 2️⃣ Type Validation
    // -------------------------------------------------
    if (typeof name !== "string" || typeof email !== "string") {
      return res.status(400).json({
        error: "Name and email must be strings"
      });
    }

    // -------------------------------------------------
    // 3️⃣ Trim Whitespace
    // -------------------------------------------------
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName || !trimmedEmail) {
      return res.status(400).json({
        error: "Name and email cannot be empty"
      });
    }

    // -------------------------------------------------
    // 4️⃣ Basic Email Format Validation
    // -------------------------------------------------
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        error: "Invalid email format"
      });
    }

    // -------------------------------------------------
    // 5️⃣ Call Service Layer
    // -------------------------------------------------
    const student = await studentService.createStudent(
      trimmedName,
      trimmedEmail
    );

    // -------------------------------------------------
    // 6️⃣ Return Created Resource
    // -------------------------------------------------
    res.status(201).json(student);

  } catch (err) {
    next(err);
  }
};


/*
---------------------------------------------------------
DELETE /students/:id
---------------------------------------------------------

Remove a student from the database.
*/

/**
 * Delete a student by ID.
 *
 * @async
 * @function deleteStudent
 * @param {import("express").Request} req - Express request object containing route parameters
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next middleware function
 * @returns {Promise<void>} Sends confirmation message
 */
export const deleteStudent = async (req, res, next) => {
  try {

    // Get the student id from the URL
    const id = req.params.id;

    // Ask the service layer to delete the student
    await studentService.deleteStudent(id);

    // Return confirmation message
    res.json({
      message: "Student deleted"
    });

  } catch (err) {
    next(err);
  }
};