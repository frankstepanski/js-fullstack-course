import { pool } from "../db/db.js";

/*
Create a new enrollment (student ↔ course relationship)
Returns the newly created enrollment row.
*/
export const enrollStudent = async (studentId, courseId) => {

  const result = await pool.query(
    `INSERT INTO enrollments (student_id, course_id)
     VALUES ($1, $2)
     RETURNING *`,
    [studentId, courseId] // parameterized to prevent SQL injection
  );

  return result.rows[0];

};


/*
Get all courses a specific student is enrolled in.
Returns one row per enrollment (joined course data).
*/
export const getStudentCourses = async (studentId) => {

  const result = await pool.query(
    `
    SELECT 
      students.id AS student_id,
      students.name AS student_name,
      courses.id AS course_id,
      courses.title,
      courses.instructor
    FROM enrollments
    JOIN students
      ON enrollments.student_id = students.id
    JOIN courses
      ON enrollments.course_id = courses.id
    WHERE students.id = $1
    `,
    [studentId] // safe parameter binding
  );

  return result.rows;

};


/*
Get all students enrolled in a specific course.
Returns one row per enrollment (joined student data).
*/
export const getCourseStudents = async (courseId) => {

  const result = await pool.query(
    `
    SELECT
      courses.id AS course_id,
      courses.title,
      students.id AS student_id,
      students.name,
      students.email
    FROM enrollments
    JOIN courses
      ON enrollments.course_id = courses.id
    JOIN students
      ON enrollments.student_id = students.id
    WHERE courses.id = $1
    `,
    [courseId] // safe parameter binding
  );

  return result.rows;

};