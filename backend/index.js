// backend/index.js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import researchRoutes from "./routes/researchRoutes.js";
import authRoutes from "./routes/authRoutes.js"; // Authentication routes
import plagiarismRoutes from "./routes/plagiarismRoutes.js";
import evaluateRoutes from "./routes/evaluateRoutes.js";
import searchRoutes from "./routes/searchRoutes.js";
import citationRoutes from "./routes/citationRoutes.js";

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware
app.use(express.json()); // Parse JSON requests

// Routes
app.use("/api/research", researchRoutes); // Research paper routes
app.use("/api/auth", authRoutes); // Authentication routes
app.use("/api/plagiarism-check", plagiarismRoutes); // Plagiarism check routes
app.use("/api/evaluate-paper", evaluateRoutes); // Evaluate paper routes
app.use("/api/search-papers", searchRoutes); // Search papers routes
app.use("/api/add-citation", citationRoutes); // Add citation routes

// Default Route
app.get("/", (req, res) => {
  res.send("Welcome to the Collaborative Research App API!");
});

// Database connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // Exit the process if unable to connect to MongoDB
  }
};

connectToDatabase();

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});