// backend/routes/researchRoutes.js
import express from "express";
import { createResearch, getAllResearch } from "../controllers/researchController.js";

const router = express.Router();

router.post("/", createResearch); // Create a new research paper
router.get("/", getAllResearch);  // Fetch all research papers

export default router;