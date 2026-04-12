/*
---------------------------------------------------------
Database Seed Script
---------------------------------------------------------

This script populates the MongoDB database with sample
data for development and testing.

Key difference from the PostgreSQL version:
- No CREATE TABLE needed — MongoDB creates collections
  automatically when documents are first inserted
- IDs are MongoDB ObjectIds, not integers
- We capture inserted document IDs to use as references
  in the enrollments collection

Run with:

    npm run seed

This script does NOT start the Express server.
It only prepares the database with sample data.
*/

import "dotenv/config";
import mongoose from "mongoose";
import { Student } from "../models/Student.js";
import { Course } from "../models/Course.js";
import { Enrollment } from "../models/Enrollment.js";

async function seedDatabase() {

  try {

    /*
    ---------------------------------------------------------
    Connect to MongoDB
    ---------------------------------------------------------
    */

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");

    /*
    ---------------------------------------------------------
    No CREATE TABLE needed
    ---------------------------------------------------------

    Unlike PostgreSQL, we do not need to create collections
    manually. MongoDB creates a collection automatically the
    first time a document is inserted into it.

    The structure of each collection is defined by the
    Mongoose schemas in the models/ folder:

      models/Student.js    → students collection
      models/Course.js     → courses collection
      models/Enrollment.js → enrollments collection

    Mongoose also creates any indexes defined in the schema
    (such as the unique index on Student.email) automatically
    when the model is first used.
    */

    /*
    ---------------------------------------------------------
    Clear existing data
    ---------------------------------------------------------

    Delete all documents from each collection.
    If the collections do not exist yet (fresh database),
    deleteMany() is a no-op — it does not throw an error.
    Enrollments are deleted first because they reference
    students and courses.
    */

    await Enrollment.deleteMany({});
    await Student.deleteMany({});
    await Course.deleteMany({});

    console.log("Cleared existing data");

    /*
    ---------------------------------------------------------
    Insert sample students
    ---------------------------------------------------------
    */

    const students = await Student.insertMany([
      { name: "Alice Johnson", email: "alice@email.com" },
      { name: "Bob Smith",     email: "bob@email.com" },
      { name: "Maria Garcia",  email: "maria@email.com" }
    ]);

    console.log("Inserted students");

    /*
    ---------------------------------------------------------
    Insert sample courses
    ---------------------------------------------------------
    */

    const courses = await Course.insertMany([
      { title: "Intro to JavaScript",    instructor: "Dr. Lee" },
      { title: "Database Fundamentals",  instructor: "Dr. Patel" },
      { title: "Web Development Basics", instructor: "Dr. Chen" }
    ]);

    console.log("Inserted courses");

    /*
    ---------------------------------------------------------
    Insert enrollments
    ---------------------------------------------------------

    In PostgreSQL, we used integer IDs (1, 2, 3) to link
    enrollments to students and courses.

    In MongoDB, IDs are ObjectIds generated at insert time.
    We cannot predict them in advance, so we capture the
    documents returned by insertMany() above and use their
    `_id` values here.

    students[0]._id  →  Alice's ObjectId
    students[1]._id  →  Bob's ObjectId
    students[2]._id  →  Maria's ObjectId

    courses[0]._id   →  Intro to JavaScript
    courses[1]._id   →  Database Fundamentals
    courses[2]._id   →  Web Development Basics

    This mirrors the PostgreSQL seed data:
    - Alice is enrolled in Intro to JavaScript and Database Fundamentals
    - Bob is enrolled in Intro to JavaScript
    - Maria is enrolled in Web Development Basics
    */

    await Enrollment.insertMany([
      { student: students[0]._id, course: courses[0]._id },
      { student: students[0]._id, course: courses[1]._id },
      { student: students[1]._id, course: courses[0]._id },
      { student: students[2]._id, course: courses[2]._id }
    ]);

    console.log("Inserted enrollments");
    console.log("Database seeded successfully");

  } catch (error) {

    console.error("Error seeding database:", error);

  } finally {

    await mongoose.disconnect();
    process.exit();

  }

}

seedDatabase();
