import { Golf } from "../model/golf.model.js";

export const GetCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const course = await Golf.findById(courseId);

    if (!course) return res.status(404).json({ message: "Course not found!" });

    res.status(200).json(course);
  } catch (error) {
    console.log("Error in GetCourse controller:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const GetCourses = async (req, res) => {
  try {
    const courses = await Golf.find().lean();
    res.status(200).json(courses);
  } catch (error) {
    console.log("Error in GetCourses controller:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const InsertData = async (req, res) => {
  const {
    courseName,
    subDescription,
    yard,
    location,
    description,
    image,
    rating,
  } = req.body;
  try {
    const newCourse = await Golf.create({
      courseName,
      subDescription,
      yard,
      location,
      description,
      image,
      rating,
    });
    if (newCourse) {
      res.status(201).json(newCourse);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error!" });
  }
};
