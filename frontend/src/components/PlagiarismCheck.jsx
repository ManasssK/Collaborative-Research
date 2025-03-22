// frontend/src/components/PlagiarismCheck.jsx
import React, { useState } from "react";
import axios from "axios";

const PlagiarismCheck = () => {
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/plagiarism-check", { content });
      setResult(response.data.message);
    } catch (error) {
      console.error("Error checking plagiarism:", error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Plagiarism Check</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            placeholder="Paste your research paper content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
            required
          />
          <button type="submit">Check for Plagiarism</button>
        </form>
        {result && <p>{result}</p>}
      </div>
    </div>
  );
};

export default PlagiarismCheck;