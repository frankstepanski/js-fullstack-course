/*
---------------------------------------------------------
Course Service Layer
---------------------------------------------------------

The service layer handles business logic and database
interaction for courses.

Responsibilities:

1. Execute database queries
2. Apply business rules (if needed)
3. Return clean data back to the controller
4. NEVER handle HTTP request/response logic

The service layer does NOT:
- Read req or res
- Send HTTP status codes
- Perform routing

*/

import { pool } from "../db/db.js";

/*
---------------------------------------------------------
getCourses()
---------------------------------------------------------

Retrieve all courses from the database.

SQL:
SELECT * FROM courses ORDER BY id

Returns:
- An array of course objects
- Empty array if no courses exist
*/

export const getCourses = async () => {

  const result = await pool.query(
    "SELECT * FROM courses ORDER BY id"
  );

  return result.rows;
};


/*
---------------------------------------------------------
getCourse(id)
---------------------------------------------------------

Retrieve a single course by ID.

Parameters:
- id (number)

SQL:
SELECT * FROM courses WHERE id = $1

About $1:
$1 is a positional parameter placeholder defined by PostgreSQL.
It represents the first bound value passed in the parameter array.

Example:
pool.query(
  "SELECT * FROM courses WHERE id = $1",
  [id]
);

Here:
- $1 maps to the first value in the array ([id]).
- PostgreSQL binds this value safely after parsing the SQL.

Security:
Using $1 prevents SQL injection because:
- The SQL structure is parsed first.
- User input is bound separately as data.
- Input cannot modify the SQL command itself.

Unsafe example (DO NOT DO THIS):

    `SELECT * FROM courses WHERE id = ${id}`

If a malicious value like:
    1; DROP TABLE courses;
were inserted directly, it could execute destructive SQL.

Parameterized queries ensure input is treated strictly as data,
not executable SQL.

Returns:
- Course object if found
- undefined if not found
*/

export const getCourse = async (id) => {

  const result = await pool.query(
    "SELECT * FROM courses WHERE id = $1",
    [id]
  );

  return result.rows[0];
};


/*
---------------------------------------------------------
createCourse(title, instructor)
---------------------------------------------------------

Insert a new course into the database.

Parameters:
- title (string)
- instructor (string)

SQL:
INSERT INTO courses (title, instructor)
VALUES ($1, $2)
RETURNING *

The RETURNING * clause tells PostgreSQL to return
the newly created row.

Returns:
- The newly created course object
*/

export const createCourse = async (title, instructor) => {

  const result = await pool.query(
    `INSERT INTO courses (title, instructor)
     VALUES ($1, $2)
     RETURNING *`,
    [title, instructor]
  );

  return result.rows[0];
};


/*
---------------------------------------------------------
deleteCourse(id)
---------------------------------------------------------

Delete a course by ID.

Parameters:
- id (number)

SQL:
DELETE FROM courses WHERE id = $1

This function does not return data.
The controller may choose to:
- Return 204 No Content
- Return success message
- Return 404 if course not found (if checked first)
*/

export const deleteCourse = async (id) => {

  await pool.query(
    "DELETE FROM courses WHERE id = $1",
    [id]
  );

};