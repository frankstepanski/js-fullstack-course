/*
---------------------------------------------------------
Enrollment Routes
---------------------------------------------------------

Routes define the HTTP endpoints related to enrollments.

Their responsibilities are to:

1. Define URL paths
2. Map each path to the appropriate controller function
3. Keep routing logic separate from business logic

Routes should NOT contain:
- Database queries
- Validation logic
- Business rules

Those belong in:
Controller → handles HTTP request/response logic
Service → handles business logic and database interaction
*/

import express from "express";
import * as enrollmentController from "../controllers/enrollmentController.js";

const router = express.Router();

/*
---------------------------------------------------------
POST /enrollments
---------------------------------------------------------

Enroll a student in a course.

This endpoint creates a relationship between:
- A student
- A course

Example Request:

POST /enrollments

Body:
{
  "studentId": 1,
  "courseId": 2
}

Flow:
Route → Controller → Service → Database

The controller:
- Reads studentId and courseId from the request body
- Validates input
- Calls the service layer
- Returns the created enrollment
*/

/**
 * @openapi
 * /enrollments:
 *   post:
 *     summary: Enroll a student in a course
 *     tags:
 *       - Enrollments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - courseId
 *             properties:
 *               studentId:
 *                 type: integer
 *               courseId:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Enrollment created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/", enrollmentController.enrollStudent);


/*
---------------------------------------------------------
GET /enrollments/students/:id
---------------------------------------------------------

Get all courses a student is enrolled in.

Because this router is mounted under "/enrollments",
the full endpoint becomes:

GET /enrollments/students/:id

Example:
GET /enrollments/students/1

This endpoint:
- Reads the student ID from the URL parameter
- Calls the service layer
- Returns a list of enrolled courses

If no enrollments exist, an empty array may be returned.
*/

/**
 * @openapi
 * /enrollments/students/{id}:
 *   get:
 *     summary: Get all courses a student is enrolled in
 *     tags:
 *       - Enrollments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Student ID
 *     responses:
 *       200:
 *         description: List of courses for the student
 *       404:
 *         description: Student not found
 */
router.get("/students/:id", enrollmentController.getStudentCourses);


/*
---------------------------------------------------------
GET /enrollments/course/:id
---------------------------------------------------------

Get all students enrolled in a course.

Because this router is mounted under "/enrollments",
the full endpoint becomes:

GET /enrollments/course/:id

Example:
GET /enrollments/course/1

This endpoint:
- Reads the course ID from the URL parameter
- Calls the service layer
- Returns a list of students enrolled in the course

If no students are enrolled, an empty array may be returned.
*/

/**
 * @openapi
 * /enrollments/course/{id}:
 *   get:
 *     summary: Get all students enrolled in a course
 *     tags:
 *       - Enrollments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Course ID
 *     responses:
 *       200:
 *         description: List of students in the course
 *       404:
 *         description: Course not found
 */
router.get("/course/:id", enrollmentController.getCourseStudents);

export default router;