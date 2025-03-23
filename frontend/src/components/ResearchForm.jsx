// frontend/src/components/ResearchForm.jsx
import React, { useState } from "react";
import { createResearch } from "../api/researchApi";
import { useNavigate } from "react-router-dom";

const ResearchForm = () => {
  const [title, setTitle] = useState("");
  const [abstract, setAbstract] = useState("");
  const [collaborators, setCollaborators] = useState(""); // Comma-separated usernames
  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const collaboratorArray = collaborators.split(",").map((c) => c.trim());
      await createResearch({ title, abstract, collaborators: collaboratorArray });
      navigate("/"); // Redirect to home page after creation
    } catch (error) {
      console.error("Failed to create research paper:", error);
    }
  };

  // Handle going back to the home page
  const handleBack = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/ResearchList.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.8)",
          backdropFilter: "blur(10px)",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "500px",
          textAlign: "center",
          position: "relative",
        }}
      >
        {/* Back Button */}
        <button
          onClick={handleBack}
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#f39c12",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            fontSize: "1rem",
            cursor: "pointer",
            transition: "background 0.3s ease",
          }}
        >
          Back
        </button>

        <h2 style={{ marginBottom: "1rem", fontSize: "1.5rem", color: "#333" }}>Create Research Paper</h2>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.8rem",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "5px",
              fontSize: "1rem",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "#333",
            }}
          />
          <textarea
            placeholder="Abstract"
            value={abstract}
            onChange={(e) => setAbstract(e.target.value)}
            rows="5"
            required
            style={{
              width: "100%",
              padding: "0.8rem",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "5px",
              fontSize: "1rem",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "#333",
            }}
          />
          <input
            type="text"
            placeholder="Collaborators (comma-separated usernames)"
            value={collaborators}
            onChange={(e) => setCollaborators(e.target.value)}
            style={{
              width: "100%",
              padding: "0.8rem",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "5px",
              fontSize: "1rem",
              backgroundColor: "rgba(255, 255, 255, 0.9)",
              color: "#333",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.8rem",
              backgroundColor: "#6a11cb", // Blue button background
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResearchForm;