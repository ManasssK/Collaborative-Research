// frontend/src/components/EvaluatePaper.jsx
import React, { useState } from "react";
import axios from "axios";

const EvaluatePaper = () => {
  const [title, setTitle] = useState("");
  const [evaluationResult, setEvaluationResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/evaluate-paper", { title });
      setEvaluationResult(response.data);
    } catch (error) {
      console.error("Failed to evaluate paper:", error.response?.data || error.message);
      alert("Failed to evaluate paper. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Evaluate Paper</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Paper Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button type="submit">Evaluate</button>
        </form>

        {evaluationResult && (
          <div>
            <h3>Evaluation Result</h3>
            <p>Score: {evaluationResult.score}%</p>
            <p>Feedback: {evaluationResult.feedback}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EvaluatePaper;