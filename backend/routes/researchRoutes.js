// backend/routes/researchRoutes.js
import express from "express";
import Research from "../models/ResearchModel.js";

const router = express.Router();

// Create a new research paper
router.post("/", async (req, res) => {
  try {
    const { title, abstract, collaborators } = req.body;

    // Check if a paper with the same title already exists
    const existingPaper = await Research.findOne({ title });
    if (existingPaper) {
      return res.status(400).json({ message: "A paper with this title already exists" });
    }

    // Create a new research paper
    const newResearch = new Research({ title, abstract, collaborators });
    await newResearch.save();

    res.status(201).json(newResearch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all research papers
router.get("/", async (req, res) => {
  try {
    const researchPapers = await Research.find();
    res.status(200).json(researchPapers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a single research paper by title
router.get("/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const paper = await Research.findOne({ title });

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    res.status(200).json(paper);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update the content of a research paper
router.put("/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const { content } = req.body;

    const updatedPaper = await Research.findOneAndUpdate(
      { title },
      { content }, // Update the content field
      { new: true } // Return the updated document
    );

    if (!updatedPaper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    res.status(200).json({ message: "Paper content updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a research paper by title
router.delete("/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const deletedPaper = await Research.findOneAndDelete({ title });

    if (!deletedPaper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    res.status(200).json({ message: "Paper deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;