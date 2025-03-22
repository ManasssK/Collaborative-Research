// backend/routes/citationRoutes.js
import express from "express";
import Research from "../models/ResearchModel.js";

const router = express.Router();

// Add a citation to a paper
router.post("/", async (req, res) => {
  try {
    const { title, citation } = req.body;

    // Find the paper by title and update its citations
    const updatedPaper = await Research.findOneAndUpdate(
      { title },
      { $push: { citations: citation } }, // Add the citation to the citations array
      { new: true }
    );

    if (!updatedPaper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    res.status(200).json({ message: "Citation added successfully", paper: updatedPaper });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;