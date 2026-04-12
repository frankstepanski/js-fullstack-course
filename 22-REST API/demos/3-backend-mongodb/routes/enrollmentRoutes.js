/*
---------------------------------------------------------
Enrollment Routes
---------------------------------------------------------

Routes define the HTTP endpoints related to enrollments.
*/

import express from "express";
import * as enrollmentController from "../controllers/enrollmentController.js";

const router = express.Router();

/**
 * @openapi
 * /enrollments:
 *   post:
 *     summary: Enroll a student in a course
 *     tags:
 *       - Enrollments
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - studentId
 *               - courseId
 *             properties:
 *               studentId:
 *                 type: string
 *               courseId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Enrollment created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/", enrollmentController.enrollStudent);

/**
 * @openapi
 * /enrollments/students/{id}:
 *   get:
 *     summary: Get all courses a student is enrolled in
 *     tags:
 *       - Enrollments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the student
 *     responses:
 *       200:
 *         description: List of courses for the student
 *       400:
 *         description: Invalid ID format
 */
router.get("/students/:id", enrollmentController.getStudentCourses);

/**
 * @openapi
 * /enrollments/course/{id}:
 *   get:
 *     summary: Get all students enrolled in a course
 *     tags:
 *       - Enrollments
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the course
 *     responses:
 *       200:
 *         description: List of students in the course
 *       400:
 *         description: Invalid ID format
 */
router.get("/course/:id", enrollmentController.getCourseStudents);

export default router;
