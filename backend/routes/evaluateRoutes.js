// backend/routes/evaluateRoutes.js
import express from "express";
import Research from "../models/ResearchModel.js";

const router = express.Router();

// Simulate evaluation based on English grammar (you can replace this with an actual API)
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;

    // Fetch the paper by title
    const paper = await Research.findOne({ title });
    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    // Simulate evaluation (e.g., check grammar or readability)
    const evaluationResult = {
      score: Math.floor(Math.random() * 100), // Random score between 0 and 100
      feedback: "This is a simulated evaluation result.",
    };

    res.status(200).json(evaluationResult);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;