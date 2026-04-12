/*
---------------------------------------------------------
Course Controller
---------------------------------------------------------

Controllers handle the HTTP request and response.

Their responsibilities are to:

1. Read information from the request (params, query, body)
2. Call the appropriate service function
3. Send the result back to the client as a response
*/

import * as courseService from "../services/courseService.js";


/*
---------------------------------------------------------
GET /courses
---------------------------------------------------------
*/

export const getCourses = async (req, res, next) => {
  try {

    const courses = await courseService.getCourses();

    res.json(courses);

  } catch (err) {
    next(err);
  }
};


/*
---------------------------------------------------------
POST /courses
---------------------------------------------------------
*/

export const createCourse = async (req, res, next) => {
  try {
    const { title, instructor } = req.body;

    if (!title || !instructor) {
      return res.status(400).json({ error: "Title and instructor are required" });
    }

    if (typeof title !== "string" || typeof instructor !== "string") {
      return res.status(400).json({ error: "Title and instructor must be strings" });
    }

    const course = await courseService.createCourse(title, instructor);

    res.status(201).json(course);

  } catch (err) {
    next(err);
  }
};
