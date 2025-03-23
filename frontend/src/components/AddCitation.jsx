// frontend/src/components/AddCitation.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const AddCitation = () => {
  const [title, setTitle] = useState("");
  const [citation, setCitation] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

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
          maxWidth: "500px", // Limit maximum width for better readability
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

        <h2 style={{ marginBottom: "1rem", fontSize: "1.5rem", color: "#333" }}>Add Citation</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter Paper Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.8rem",
              margin: "0.8rem 0",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "5px",
              fontSize: "1rem",
              backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly opaque background
              color: "#333",
            }}
          />
          <textarea
            placeholder="Enter Citation"
            value={citation}
            onChange={(e) => setCitation(e.target.value)}
            rows="8" // Increased rows for a bigger text area
            required
            style={{
              width: "100%",
              padding: "0.8rem",
              margin: "0.8rem 0",
              border: "1px solid rgba(0, 0, 0, 0.2)",
              borderRadius: "5px",
              fontSize: "1rem",
              backgroundColor: "rgba(255, 255, 255, 0.9)", // Slightly opaque background
              color: "#333",
            }}
          />
          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.8rem",
              marginTop: "1rem",
              backgroundColor: "#6a11cb", // Blue button background
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            Add Citation
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCitation;