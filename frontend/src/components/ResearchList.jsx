// frontend/src/components/ResearchList.jsx
import React, { useEffect, useState } from "react";
import { getAllResearch } from "../api/researchApi";

const ResearchList = () => {
  const [researchPapers, setResearchPapers] = useState([]);

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const data = await getAllResearch(); // Calls /api/research (GET)
        setResearchPapers(data);
      } catch (error) {
        console.error("Failed to fetch research papers:", error);
      }
    };
    fetchResearch();
  }, []);

  return (
    <div>
      <h2>Research Papers</h2>
      <ul>
        {researchPapers.map((paper) => (
          <li key={paper._id}>
            <h3>{paper.title}</h3>
            <p>{paper.abstract}</p>
            <p>Collaborators: {paper.collaborators.join(", ")}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResearchList;