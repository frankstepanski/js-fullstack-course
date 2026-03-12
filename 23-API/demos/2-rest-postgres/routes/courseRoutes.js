/*
---------------------------------------------------------
Course Routes
---------------------------------------------------------

Routes define the HTTP endpoints for courses.

Their responsibilities are to:

1. Define URL paths
2. Map each path to a controller function
3. Keep routing logic separate from controller logic

Routes should NOT contain:
- Database queries
- Business rules
- Validation logic

Those belong in:
Controller → handles HTTP request/response logic
Service → handles business logic and database interaction
*/

import express from "express";
import * as courseController from "../controllers/courseController.js";

const router = express.Router();

/*
---------------------------------------------------------
GET /courses
---------------------------------------------------------

Returns all courses.

Example:
GET /courses

Flow:
Route → Controller → Service → Database

The controller:
- Calls the service layer
- Returns a list of courses as JSON
*/

/**
 * @openapi
 * /courses:
 *   get:
 *     summary: Retrieve all courses
 *     tags:
 *       - Courses
 *     responses:
 *       200:
 *         description: List of courses
 */
router.get("/", courseController.getCourses);


/*
---------------------------------------------------------
POST /courses
---------------------------------------------------------

Creates a new course.

Example:
POST /courses

Body:
{
  "title": "Advanced JavaScript",
  "instructor": "Dr. Kim"
}

Flow:
Route → Controller → Service → Database

The controller:
- Validates required fields
- Calls the service layer
- Returns 201 Created with the new course
*/

/**
 * @openapi
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags:
 *       - Courses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - instructor
 *             properties:
 *               title:
 *                 type: string
 *               instructor:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/", courseController.createCourse);

export default router;