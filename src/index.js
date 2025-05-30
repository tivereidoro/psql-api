import dotenv from "dotenv";
import express from "express";
import studentRoute from "./routes/studentRoute.js";
import { API_BASE_URL, studentsAPI_URL } from "./utils/const.js";

// Initializations
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(express.json());

// Logger
const logger = (req, res, next) => {
  console.log(`[${req.method}] [${req.url}] • ${new Date()} `);
  next();
};

app.use(logger);
app.use(studentsAPI_URL, studentRoute);

// ======
// Routes
app.get(API_BASE_URL, (req, res) => {
  res.json({ message: "API is working!" });
});

// Error handling middleware
// app.use(errorMiddleware);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});

// Export for testing
export default app;
