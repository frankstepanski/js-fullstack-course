/*
---------------------------------------------------------
Database Seed Script
---------------------------------------------------------

This file inserts sample data into the PostgreSQL database.

Developers often create "seed scripts" to quickly populate a
database with example records for development or testing.

This script does the following:

1. Connects to PostgreSQL using the shared connection pool
2. Clears existing data from the tables
3. Inserts example students, courses, and enrollments
4. Closes the database connection

The script is typically run manually using:

    npm run seed

It does NOT start the Express server. It only prepares
the database with data so the API has something to return.
*/

import { pool } from "../db/db.js";

/*
This function runs all of the database setup steps.
Because database queries are asynchronous, we use
an async function and await each query.
*/
async function seedDatabase() {

  try {

    /*
    ---------------------------------------------------------
    Create tables if they don't exist
    ---------------------------------------------------------

    These queries create the tables only if they are missing.
    Safe to run on a fresh database or an existing one.

    Enrollments is created last because it references
    students and courses through foreign keys.
    */

    await pool.query(`
      CREATE TABLE IF NOT EXISTS students (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT UNIQUE
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS courses (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        instructor TEXT
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS enrollments (
        id SERIAL PRIMARY KEY,
        student_id INTEGER REFERENCES students(id),
        course_id INTEGER REFERENCES courses(id)
      )
    `);


    /*
    ---------------------------------------------------------
    Clear existing data
    ---------------------------------------------------------

    These queries remove any existing rows from the tables.

    We delete enrollments first because it references
    students and courses through foreign keys.
    */

    await pool.query("DELETE FROM enrollments");
    await pool.query("DELETE FROM students");
    await pool.query("DELETE FROM courses");



    /*
    ---------------------------------------------------------
    Insert sample students
    ---------------------------------------------------------

    This adds a few example students to the students table.
    */

    await pool.query(`
      INSERT INTO students (name, email)
      VALUES
      ('Alice Johnson','alice@email.com'),
      ('Bob Smith','bob@email.com'),
      ('Maria Garcia','maria@email.com')
    `);



    /*
    ---------------------------------------------------------
    Insert sample courses
    ---------------------------------------------------------

    These represent courses available in the system.
    */

    await pool.query(`
      INSERT INTO courses (title, instructor)
      VALUES
      ('Intro to JavaScript','Dr. Lee'),
      ('Database Fundamentals','Dr. Patel'),
      ('Web Development Basics','Dr. Chen')
    `);



    /*
    ---------------------------------------------------------
    Insert enrollments
    ---------------------------------------------------------

    This table connects students to courses.

    Example:
    student_id = 1
    course_id  = 1

    means student #1 is enrolled in course #1.
    */

    await pool.query(`
      INSERT INTO enrollments (student_id, course_id)
      VALUES
      (1,1),
      (1,2),
      (2,1),
      (3,3)
    `);



    // If everything worked, show a success message
    console.log("Database seeded successfully");

  } catch (error) {

    // If any query fails, log the error
    console.error("Error seeding database:", error);

  } finally {

    /*
    ---------------------------------------------------------
    Clean up
    ---------------------------------------------------------

    pool.end() closes the database connection.

    process.exit() stops the Node process once the script
    finishes running.
    */

    await pool.end();
    process.exit();

  }
}

// Run the seed script
seedDatabase();