import dotenv from "dotenv";
import express from "express";

// Initializations
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5001;
const router = express.Router();

// Middleware
app.use(express.json());

// Logger
const logger = (req, res, next) => {
  console.log(`${new Date()} --- Request [${req.method}] [${req.url}]`);
  next();
};

app.use(logger);

// ======
// Routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api", (req, res) => {
  res.json({ message: "API is working!" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});

// Export  app for testing
export default app;
