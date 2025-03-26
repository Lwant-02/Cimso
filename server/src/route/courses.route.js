import express from "express";
import {
  GetCourse,
  GetCourses,
  InsertData,
} from "../controller/courses.controller.js";

export const courseRouter = express();

courseRouter.get("/get-course/:courseId", GetCourse);

courseRouter.get("/get-courses", GetCourses);

courseRouter.post("/insert", InsertData);
