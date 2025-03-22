// backend/routes/searchRoutes.js
import express from "express";
import Research from "../models/ResearchModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { query } = req.query;
    const papers = await Research.find({
      $or: [{ title: { $regex: query, $options: "i" } }, { collaborators: { $regex: query, $options: "i" } }],
    });
    res.status(200).json(papers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;