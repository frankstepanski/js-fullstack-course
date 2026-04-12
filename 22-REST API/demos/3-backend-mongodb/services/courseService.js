/*
---------------------------------------------------------
Course Service Layer
---------------------------------------------------------

The service layer handles all database interaction
for courses using Mongoose model methods.
*/

import { Course } from "../models/Course.js";

/*
Retrieve all courses.
Returns an array of course documents.
*/
export const getCourses = async () => {

  return Course.find().sort({ _id: 1 });

};


/*
Create a new course.
Returns the newly created course document.
*/
export const createCourse = async (title, instructor) => {

  return Course.create({ title, instructor });

};
