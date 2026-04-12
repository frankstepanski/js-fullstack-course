/*
---------------------------------------------------------
Student Routes
---------------------------------------------------------

Routes define the HTTP endpoints related to students.

Their responsibilities are to:

1. Define URL paths
2. Map each path to the correct controller function
3. Keep routing logic separate from controller and service logic

Routes should NOT contain:
- Database queries
- Business rules
- Validation logic
*/

import express from "express";
import * as studentController from "../controllers/studentController.js";

const router = express.Router();

/**
 * @openapi
 * /students:
 *   get:
 *     summary: Retrieve all students
 *     tags:
 *       - Students
 *     responses:
 *       200:
 *         description: List of students
 */
router.get("/", studentController.getStudents);

/**
 * @openapi
 * /students/{id}:
 *   get:
 *     summary: Retrieve a student by ID
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the student
 *     responses:
 *       200:
 *         description: Student found
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Student not found
 */
router.get("/:id", studentController.getStudent);

/**
 * @openapi
 * /students:
 *   post:
 *     summary: Create a new student
 *     tags:
 *       - Students
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/", studentController.createStudent);

/**
 * @openapi
 * /students/{id}:
 *   delete:
 *     summary: Delete a student by ID
 *     tags:
 *       - Students
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the student
 *     responses:
 *       200:
 *         description: Student deleted successfully
 *       400:
 *         description: Invalid ID format
 *       404:
 *         description: Student not found
 */
router.delete("/:id", studentController.deleteStudent);

export default router;
