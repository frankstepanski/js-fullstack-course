/*
---------------------------------------------------------
Student Routes
---------------------------------------------------------

Routes define the HTTP endpoints related to students.

Their responsibilities are to:

1. Define URL paths
2. Map each path to the correct controller function
3. Keep routing logic separate from controller and service logic

Routes should NOT contain:
- Database queries
- Business rules
- Validation logic

Those belong in:
Controller → handles HTTP request/response logic
Service → handles business logic and database interaction
*/

import express from "express";
import * as studentController from "../controllers/studentController.js";

const router = express.Router();

/*
---------------------------------------------------------
GET /students
---------------------------------------------------------

Retrieve all students.

Example:
GET /students

Flow:
Route → Controller → Service → Database

The controller:
- Calls the service layer
- Returns a list of students as JSON
*/

/**
 * @openapi
 * /students:
 *   get:
 *     summary: Retrieve all students
 *     tags:
 *       - Students
 *     responses:
 *       200:
 *         description: List of students
 */
router.get("/", studentController.getStudents);


/*
---------------------------------------------------------
GET /students/:id
---------------------------------------------------------

Retrieve a single student by ID.

Example:
GET /students/1

The controller:
- Reads the student ID from the URL parameter
- Calls the service layer
- Returns the student if found
- Returns 404 if the student does not exist
*/

/**
 * @openapi
 * /students/{id}:
 *   get:
 *     summary: Retrieve a student by ID
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student found
 *       404:
 *         description: Student not found
 */
router.get("/:id", studentController.getStudent);


/*
---------------------------------------------------------
POST /students
---------------------------------------------------------

Create a new student.

Example:
POST /students

Body:
{
  "name": "Alice Johnson",
  "email": "alice@email.com"
}

The controller:
- Validates required fields
- Calls the service layer
- Returns 201 Created with the new student
*/

/**
 * @openapi
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags:
 *       - Students
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/", studentController.createStudent);


/*
---------------------------------------------------------
DELETE /students/:id
---------------------------------------------------------

Delete a student by ID.

Example:
DELETE /students/1

The controller:
- Reads the student ID from the URL
- Calls the service layer
- Returns success message or 404 if not found
*/

/**
 * @openapi
 * /students/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       404:
 *         description: Student not found
 */
router.delete("/:id", studentController.deleteStudent);


export default router;