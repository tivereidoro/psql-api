import express from "express";
import { getStudents, getTest } from "../controllers/studentController.js";

// Express router object
const router = express.Router();

// GET: fetch all users
router.get("/", getStudents);
router.get("/", getTest);

// ==========
export default router;

// RESTful API design
// Clean separation of concerns
