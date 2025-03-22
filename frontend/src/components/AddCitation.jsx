// frontend/src/components/AddCitation.jsx
import React, { useState } from "react";
import axios from "axios";

const AddCitation = () => {
  const [title, setTitle] = useState("");
  const [citation, setCitation] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/add-citation", { title, citation });
      alert("Citation added successfully!");
      setTitle("");
      setCitation("");
    } catch (error) {
      console.error("Failed to add citation:", error.response?.data || error.message);
      alert("Failed to add citation. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Add Citation</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Paper Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <textarea
            placeholder="Enter Citation"
            value={citation}
            onChange={(e) => setCitation(e.target.value)}
            rows="5"
            required
          />
          <button type="submit">Add Citation</button>
        </form>
      </div>
    </div>
  );
};

export default AddCitation;