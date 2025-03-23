// frontend/src/components/PlagiarismCheck.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const PlagiarismCheck = () => {
  const [content, setContent] = useState("");
  const [result, setResult] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Full viewport height
        width: "100vw", // Full viewport width
        background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/ResearchList.jpg)", // Add overlay for contrast
        backgroundSize: "cover", // Cover the entire container
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent image repetition
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.8)", // Semi-transparent white background
          backdropFilter: "blur(10px)", // Glass effect
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          width: "100%",
          maxWidth: "600px", // Limit maximum width for better readability
          textAlign: "center",
          position: "relative", // Required for absolute positioning of the back button
        }}
      >
        {/* Back Button */}
        <button
          onClick={() => navigate("/")} // Navigate to the home page
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            padding: "0.5rem 1rem",
            backgroundColor: "#6a11cb", // Blue button background
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

        <h2 style={{ marginBottom: "1rem", fontSize: "1.5rem", color: "#333" }}>Plagiarism Check</h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <textarea
            placeholder="Paste your research paper content here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="15" // Increased rows for a bigger text area
            required
            style={{
              width: "100%",
              padding: "0.8rem",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "5px",
              fontSize: "1rem",
              backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly opaque background
              color: "#333",
              resize: "none", // Disable resizing for a cleaner look
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
            Check for Plagiarism
          </button>
        </form>

        {result && (
          <p
            style={{
              marginTop: "1rem",
              padding: "1rem",
              background: "rgba(255, 255, 255, 0.9)", // Slightly opaque background
              borderRadius: "5px",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              fontSize: "1rem",
              color: "#555",
            }}
          >
            {result}
          </p>
        )}
      </div>
    </div>
  );
};

export default PlagiarismCheck;