// frontend/src/components/ResearchForm.jsx
import React, { useState } from "react";
import { createResearch } from "../api/researchApi";
import { useNavigate } from "react-router-dom";

const ResearchForm = () => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [collaborators, setCollaborators] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const collaboratorArray = collaborators.split(",").map((c) => c.trim());
      await createResearch({ title, abstract, collaborators: collaboratorArray });
      navigate("/");
    } catch (error) {
      console.error("Failed to create research paper:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create Research Paper</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Abstract"
        value={abstract}
        onChange={(e) => setAbstract(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Collaborators (comma-separated)"
        value={collaborators}
        onChange={(e) => setCollaborators(e.target.value)}
        required
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ResearchForm;