import dotenv from "dotenv";
import express from "express";
import studentRoute from "./routes/studentRoute.js";
import { API_BASE_URL, studentsAPI_URL } from "./utils/const.js";
import { handleError } from "./middlewares/errorHandler.js";
import { logger } from "./middlewares/logger.js";

// Initializations
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;

// App Middlewares
app.use(express.json());
// Error handling middleware
app.use(handleError);
app.use(logger);
app.use(studentsAPI_URL, studentRoute);

// ======
// Routes
app.get(API_BASE_URL, (req, res) => {
  res.json({ message: "API is working!" });
});

// ============
// Start server
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});

// Export for testing
export default app;
