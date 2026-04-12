/*
---------------------------------------------------------
Enrollment Service Layer
---------------------------------------------------------

The service layer handles all database interaction
for enrollments using Mongoose model methods.

Key difference from SQL:
- populate() is the MongoDB equivalent of a SQL JOIN.
  It replaces the stored ObjectId reference with the
  full document from the referenced collection.

Example:

Without populate():
  { student: "664a1f...", course: "664a2b..." }

With populate("course"):
  { student: "664a1f...", course: { title: "Intro to JS", instructor: "Dr. Lee" } }
*/

import { Enrollment } from "../models/Enrollment.js";

/*
Enroll a student in a course.
Returns the newly created enrollment document.
*/
export const enrollStudent = async (studentId, courseId) => {

  return Enrollment.create({ student: studentId, course: courseId });

};


/*
Get all courses a specific student is enrolled in.
Uses populate() to return full course data instead of just the course ID.
*/
export const getStudentCourses = async (studentId) => {

  return Enrollment.find({ student: studentId }).populate("course");

};


/*
Get all students enrolled in a specific course.
Uses populate() to return full student data instead of just the student ID.
*/
export const getCourseStudents = async (courseId) => {

  return Enrollment.find({ course: courseId }).populate("student");

};
