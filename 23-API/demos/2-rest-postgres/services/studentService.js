import { pool } from "../db/db.js";

/*
Retrieve all students.
Returns an array of student records.
*/
export const getStudents = async () => {

  const result = await pool.query(
    "SELECT * FROM students ORDER BY id"
  );

  return result.rows;

};


/*
Retrieve a single student by ID.
Returns the student object or undefined if not found.
*/
export const getStudent = async (id) => {

  const result = await pool.query(
    "SELECT * FROM students WHERE id = $1",
    [id] // parameterized to prevent SQL injection
  );

  return result.rows[0];

};


/*
Create a new student.
Returns the newly inserted student record.
*/
export const createStudent = async (name, email) => {

  const result = await pool.query(
    `INSERT INTO students (name, email)
     VALUES ($1, $2)
     RETURNING *`,
    [name, email] // safe parameter binding
  );

  return result.rows[0];

};


/*
Delete a student by ID.
Does not return data.
*/
export const deleteStudent = async (id) => {

  await pool.query(
    "DELETE FROM students WHERE id = $1",
    [id] // safe parameter binding
  );

};