import express from "express";
import { getStudents } from "../controllers/studentController";

// Express router object
const router = express.Router();

// Middleware to log request details
router.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});

// GET: fetch all users
router.get("/", getStudents);

// ==========
export default router;

// RESTful API design
// Clean separation of concerns
