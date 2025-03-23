// backend/routes/researchRoutes.js
import express from "express";
import Research from "../models/ResearchModel.js";

const router = express.Router();

// CREATE a new research paper
router.post("/", async (req, res) => {
  try {
    const { title, abstract, collaborators } = req.body;

    // Check if a paper with the same title already exists
    const existingPaper = await Research.findOne({ title });
    if (existingPaper) {
      return res.status(400).json({ message: "A paper with this title already exists" });
    }

    // Create a new research paper
    const newResearch = new Research({
      title,
      abstract,
      collaborators: Array.isArray(collaborators) ? collaborators : [], // Ensure collaborators is an array
    });

    await newResearch.save();
    res.status(201).json({ message: "Research paper created successfully", paper: newResearch });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET all research papers (exclude sensitive fields like content)
router.get("/", async (req, res) => {
  try {
    const researchPapers = await Research.find({}, { title: 1, collaborators: 1 }); // Exclude abstract and other fields
    res.status(200).json(researchPapers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET a single research paper by title
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

// ADD collaborators to a research paper
router.post("/:title/add-collaborators", async (req, res) => {
  try {
    const { title } = req.params;
    const { collaborators } = req.body;

    // Ensure collaborators are provided as an array
    if (!Array.isArray(collaborators) || collaborators.length === 0) {
      return res.status(400).json({ message: "Collaborators must be provided as a non-empty array" });
    }

    // Find the paper by title
    const paper = await Research.findOne({ title });

    if (!paper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    // Add new collaborators to the existing list (avoid duplicates)
    const uniqueCollaborators = [...new Set([...paper.collaborators, ...collaborators])];
    paper.collaborators = uniqueCollaborators;

    // Save the updated paper
    await paper.save();

    res.status(200).json({ message: "Collaborators added successfully", paper });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// UPDATE a research paper by title
router.put("/:title", async (req, res) => {
  try {
    const { title } = req.params;
    const { abstract, collaborators } = req.body;

    const updatedPaper = await Research.findOneAndUpdate(
      { title },
      { abstract, collaborators }, // Update fields
      { new: true } // Return the updated document
    );

    if (!updatedPaper) {
      return res.status(404).json({ message: "Paper not found" });
    }

    res.status(200).json({ message: "Paper updated successfully", paper: updatedPaper });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// DELETE a research paper by title
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