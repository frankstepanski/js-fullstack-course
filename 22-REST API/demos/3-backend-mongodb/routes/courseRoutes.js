/*
---------------------------------------------------------
Course Routes
---------------------------------------------------------

Routes define the HTTP endpoints for courses.
*/

import express from "express";
import * as courseController from "../controllers/courseController.js";

const router = express.Router();

/**
 * @openapi
 * /courses:
 *   get:
 *     summary: Retrieve all courses
 *     tags:
 *       - Courses
 *     responses:
 *       200:
 *         description: List of courses
 */
router.get("/", courseController.getCourses);

/**
 * @openapi
 * /courses:
 *   post:
 *     summary: Create a new course
 *     tags:
 *       - Courses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - instructor
 *             properties:
 *               title:
 *                 type: string
 *               instructor:
 *                 type: string
 *     responses:
 *       201:
 *         description: Course created successfully
 *       400:
 *         description: Invalid request body
 */
router.post("/", courseController.createCourse);

export default router;
