// frontend/src/components/ResearchList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResearchList = () => {
  const [researchPapers, setResearchPapers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResearch = async () => {
      try {
        const response = await axios.get("/api/research");
        setResearchPapers(response.data);
      } catch (error) {
        console.error("Failed to fetch research papers:", error.response?.data || error.message);
      }
    };
    fetchResearch();
  }, []);

  const handleDelete = async (title) => {
    try {
      await axios.delete(`/api/research/${encodeURIComponent(title)}`);
      setResearchPapers((prevPapers) => prevPapers.filter((paper) => paper.title !== title));
    } catch (error) {
      console.error("Failed to delete paper:", error.response?.data || error.message);
    }
  };

  return (
    <div>
      {researchPapers.length === 0 ? (
        <p>No research papers found.</p>
      ) : (
        <ul>
          {researchPapers.map((paper) => (
            <li key={paper._id}>
              <span>{paper.title}</span>
              <button onClick={() => navigate(`/edit-paper/${encodeURIComponent(paper.title)}`)}>Edit</button>
              <button onClick={() => handleDelete(paper.title)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ResearchList;