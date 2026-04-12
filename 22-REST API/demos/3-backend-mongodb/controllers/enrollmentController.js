/*
---------------------------------------------------------
Enrollment Controller
---------------------------------------------------------

Controllers handle HTTP requests and responses.

Their main job is to:
1. Read data from the request (params or body)
2. Validate inputs
3. Call the service layer
4. Send the result back to the client

Key difference from the PostgreSQL version:
- studentId and courseId are MongoDB ObjectIds
- We validate the ID format before querying
*/

import mongoose from "mongoose";
import * as enrollmentService from "../services/enrollmentService.js";


/*
---------------------------------------------------------
POST /enrollments
---------------------------------------------------------

Enroll a student in a course.

Expected request body:

{
  "studentId": "664a1f...",
  "courseId": "664a2b..."
}
*/

export const enrollStudent = async (req, res, next) => {
  try {

    const { studentId, courseId } = req.body;

    if (!studentId || !courseId) {
      return res.status(400).json({ error: "studentId and courseId are required" });
    }

    /*
    Validate both IDs before querying.

    These come from the request body as plain strings.
    If either is not a valid 24-char hex ObjectId,
    Mongoose would throw a CastError. We catch that here
    and return a clear 400 instead.
    */
    if (!mongoose.Types.ObjectId.isValid(studentId) || !mongoose.Types.ObjectId.isValid(courseId)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const enrollment = await enrollmentService.enrollStudent(studentId, courseId);

    res.status(201).json(enrollment);

  } catch (err) {
    next(err);
  }
};


/*
---------------------------------------------------------
GET /enrollments/students/:id
---------------------------------------------------------

Retrieve all courses that a specific student is enrolled in.
*/

export const getStudentCourses = async (req, res, next) => {
  try {

    const { id } = req.params;

    // Same ObjectId validation — see enrollStudent above
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const courses = await enrollmentService.getStudentCourses(id);

    res.json(courses);

  } catch (err) {
    next(err);
  }
};


/*
---------------------------------------------------------
GET /enrollments/course/:id
---------------------------------------------------------

Retrieve all students enrolled in a specific course.
*/

export const getCourseStudents = async (req, res, next) => {
  try {

    const { id } = req.params;

    // Same ObjectId validation — see enrollStudent above
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid ID format" });
    }

    const students = await enrollmentService.getCourseStudents(id);

    res.json(students);

  } catch (err) {
    next(err);
  }
};
