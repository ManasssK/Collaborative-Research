// backend/models/ResearchModel.js
import mongoose from "mongoose";

const researchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  abstract: { type: String, required: true },
  collaborators: [{ type: String }],
  content: { type: String, default: "" },
  citations: [{ type: String }], // Array of citations
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Research", researchSchema);