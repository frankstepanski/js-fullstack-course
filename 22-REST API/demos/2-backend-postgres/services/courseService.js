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


