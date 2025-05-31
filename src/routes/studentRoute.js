import express from "express";
import {
  createStudent,
  getStudentById,
  getStudents,
} from "../controllers/studentController.js";

// Express router object
const router = express.Router();

// GET: fetch all users
router.get("/", getStudents);

// POST: create a new user
router.post("/", createStudent);

// GET: fetch a user by ID
router.get("/:id", getStudentById);

// ==========
export default router;

// RESTful API design
// Clean separation of concerns
