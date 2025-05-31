import express from "express";
import {
  createStudent,
  deleteStudentById,
  getStudentById,
  getStudents,
  updateStudentById,
} from "../controllers/studentController.js";

// Express router object
const router = express.Router();

// POST: create a new student
router.post("/", createStudent);

// GET: fetch all students
router.get("/", getStudents);

// GET: fetch a student by ID
router.get("/:id", getStudentById);

// PUT: update a student by ID
router.put("/:id", updateStudentById);

// DELETE: delete a student by ID
router.delete("/:id", deleteStudentById);

// ==========
export default router;

// RESTful API design
// Clean separation of concerns
