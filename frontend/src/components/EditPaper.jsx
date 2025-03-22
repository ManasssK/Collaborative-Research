// frontend/src/components/EditPaper.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPaper = () => {
  const { title: encodedTitle } = useParams();
  const decodedTitle = decodeURIComponent(encodedTitle);
  const [content, setContent] = useState("");
  const [isSaved, setIsSaved] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaperContent = async () => {
      try {
        const response = await axios.get(`/api/research/${encodedTitle}`);
        setContent(response.data.content || "");
      } catch (error) {
        console.error("Failed to fetch paper content:", error.response?.data || error.message);
      }
    };
    fetchPaperContent();
  }, [encodedTitle]);

  const handleSave = async () => {
    try {
      await axios.put(`/api/research/${encodedTitle}`, { content });
      setIsSaved(true);
      setTimeout(() => setIsSaved(false), 2000);
    } catch (error) {
      console.error("Failed to save paper content:", error.response?.data || error.message);
    }
  };

  const handleBack = () => {
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Edit Paper: {decodedTitle}</h2>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="20"
          style={{ width: "100%", padding: "1rem", fontSize: "1rem" }}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={handleBack}>Back</button>
        {isSaved && <p style={{ color: "green" }}>Changes saved successfully!</p>}
      </div>
    </div>
  );
};

export default EditPaper;