// backend/controllers/researchController.js
import Research from "../models/ResearchModel.js";

// Create a new research paper
export const createResearch = async (req, res) => {
  try {
    const { title, abstract, collaborators } = req.body;
    const newResearch = new Research({ title, abstract, collaborators });
    await newResearch.save();
    res.status(201).json(newResearch);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all research papers
export const getAllResearch = async (req, res) => {
  try {
    const researchPapers = await Research.find();
    res.status(200).json(researchPapers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};