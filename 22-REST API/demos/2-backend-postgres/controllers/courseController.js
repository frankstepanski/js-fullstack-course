/*
---------------------------------------------------------
Course Controller
---------------------------------------------------------

Controllers handle the HTTP request and response.

Their responsibilities are to:

1. Read information from the request (params, query, body)
2. Call the appropriate service function
3. Send the result back to the client as a response

Controllers should stay small and simple. They should NOT
contain database queries or heavy business logic.

Instead, controllers call the service layer, which handles
the database operations.

*/

import * as courseService from "../services/courseService.js";


/*
---------------------------------------------------------
GET /courses
---------------------------------------------------------

This controller returns a list of all courses.

Steps:
1. Call the service layer to retrieve courses
2. Send the result back as JSON
*/

/**
 * Retrieve all courses.
 *
 * @async
 * @function getCourses
 * @param {import("express").Request} req - Express request object
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next middleware function
 * @returns {Promise<void>} Sends a JSON array of courses
 */
export const getCourses = async (req, res, next) => {
  try {

    // Ask the service layer to retrieve courses from the database
    const courses = await courseService.getCourses();

    // Send the results back to the client as JSON
    res.json(courses);

  } catch (err) {

    // Pass errors to the global error handler middleware
    next(err);
  }
};


/*
---------------------------------------------------------
POST /courses
---------------------------------------------------------

This controller creates a new course.

Responsibilities:
1. Read data from the request body
2. Validate the request payload (required fields + basic types)
3. Call the service layer to insert the course
4. Return the created course with HTTP 201
5. Forward unexpected errors to the global error handler

Payload Validation:
- "title" is required
- "instructor" is required
- Both must be strings

If validation fails:
→ Return 400 Bad Request

Business rules (such as duplicate course titles)
are handled inside the service layer — not here.

Example request body:

{
  "title": "Advanced JavaScript",
  "instructor": "Dr. Kim"
}

Example validation error response:

Status: 400

{
  "error": "Title and instructor are required"
}
*/

/**
 * Create a new course.
 *
 * Validates request payload and calls the service layer
 * to insert a new course into the database.
 *
 * @async
 * @function createCourse
 * @param {import("express").Request} req - Express request object containing course data
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next middleware function
 * @returns {Promise<void>} Sends the created course with HTTP 201
 */
export const createCourse = async (req, res, next) => {
  try {
    const { title, instructor } = req.body;

    // Basic payload validation
    if (!title || !instructor) {
      return res.status(400).json({
        error: "Title and instructor are required"
      });
    }

    if (typeof title !== "string" || typeof instructor !== "string") {
      return res.status(400).json({
        error: "Title and instructor must be strings"
      });
    }

    const course = await courseService.createCourse(title, instructor);

    res.status(201).json(course);

  } catch (err) {
    next(err);
  }
};