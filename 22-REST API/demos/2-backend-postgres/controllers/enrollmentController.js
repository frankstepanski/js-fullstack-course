/*
---------------------------------------------------------
Enrollment Controller
---------------------------------------------------------

Controllers handle HTTP requests and responses.

Their main job is to:
1. Read data from the request (params or body)
2. Call the service layer
3. Send the result back to the client

The actual database logic lives in the service layer.
Errors are passed to the global error handler using next().
*/

import * as enrollmentService from "../services/enrollmentService.js";


/*
---------------------------------------------------------
POST /enrollments
---------------------------------------------------------

Enroll a student in a course.

Expected request body:

{
  "studentId": 1,
  "courseId": 2
}
*/

/**
 * Enroll a student in a course.
 *
 * Validates the request body and creates a new enrollment
 * record through the service layer.
 *
 * @async
 * @function enrollStudent
 * @param {import("express").Request} req - Express request object containing enrollment data
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next middleware function
 * @returns {Promise<void>} Sends the created enrollment with HTTP 201
 */
export const enrollStudent = async (req, res, next) => {
  try {

    // Extract studentId and courseId from request body
    const { studentId, courseId } = req.body;

    // Basic validation to ensure required values exist
    if (!studentId || !courseId) {
      return res.status(400).json({
        error: "studentId and courseId are required"
      });
    }

    // Call the service layer to create the enrollment
    const enrollment = await enrollmentService.enrollStudent(
      studentId,
      courseId
    );

    // Return the newly created enrollment
    res.status(201).json(enrollment);

  } catch (err) {

    // Forward errors to the global error handler
    next(err);
  }
};


/*
---------------------------------------------------------
GET /students/:id/courses
---------------------------------------------------------

Retrieve all courses that a specific student
is enrolled in.
*/

/**
 * Retrieve all courses for a specific student.
 *
 * Reads the student ID from the route parameter and
 * retrieves enrollment data from the service layer.
 *
 * @async
 * @function getStudentCourses
 * @param {import("express").Request} req - Express request object containing route parameters
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next middleware function
 * @returns {Promise<void>} Sends a JSON array of enrolled courses
 */
export const getStudentCourses = async (req, res, next) => {
  try {

    // Get the student id from the URL parameter
    const studentId = req.params.id;

    // Ask the service layer for the student's courses
    const courses = await enrollmentService.getStudentCourses(studentId);

    // Return the results
    res.json(courses);

  } catch (err) {

    // Pass errors to the error handler middleware
    next(err);
  }
};

/*
---------------------------------------------------------
GET /enrollments/course/:id
---------------------------------------------------------

Retrieve all students enrolled in a specific course.
*/

/**
 * Retrieve all students for a specific course.
 *
 * Reads the course ID from the route parameter and
 * retrieves enrollment data from the service layer.
 *
 * @async
 * @function getCourseStudents
 * @param {import("express").Request} req - Express request object containing route parameters
 * @param {import("express").Response} res - Express response object
 * @param {import("express").NextFunction} next - Express next middleware function
 * @returns {Promise<void>} Sends a JSON array of enrolled students
 */
export const getCourseStudents = async (req, res, next) => {
  try {

    // Get the course id from the URL parameter
    const courseId = req.params.id;

    // Ask the service layer for the course's students
    const students = await enrollmentService.getCourseStudents(courseId);

    // Return the results
    res.json(students);

  } catch (err) {

    // Pass errors to the error handler middleware
    next(err);
  }
};