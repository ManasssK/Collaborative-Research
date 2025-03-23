// frontend/src/components/EditPaper.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPaper = () => {
  const { title: encodedTitle } = useParams();
  const decodedTitle = decodeURIComponent(encodedTitle);
  const [content, setContent] = useState(""); // State to hold the paper's content
  const [isSaved, setIsSaved] = useState(false); // State to track save status
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPaperContent = async () => {
      try {
        const response = await axios.get(`/api/research/${encodedTitle}`);
        setContent(response.data.content || ""); // Set the fetched content
      } catch (error) {
        console.error("Failed to fetch paper content:", error.response?.data || error.message);
      }
    };
    fetchPaperContent();
  }, [encodedTitle]);

  const handleSave = async () => {
    try {
      await axios.put(`/api/research/${encodedTitle}`, { content }); // Update the content
      setIsSaved(true); // Show success message
      setTimeout(() => setIsSaved(false), 2000); // Hide success message after 2 seconds
    } catch (error) {
      console.error("Failed to save paper content:", error.response?.data || error.message);
    }
  };

  const handleBack = () => {
    navigate("/"); // Navigate back to the home page
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/ResearchList.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          background: "rgba(255, 255, 255, 0.1)", // Frosted glass background
          backdropFilter: "blur(10px)", // Blur effect
          border: "1px solid rgba(255, 255, 255, 0.2)", // Subtle border
          borderRadius: "15px", // Rounded corners
          padding: "2rem",
          width: "100%",
          maxWidth: "600px",
          textAlign: "center",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", // Subtle shadow
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

        <h2
          style={{
            marginBottom: "1rem",
            fontSize: "1.8rem",
            fontWeight: "bold",
            color: "#ffffff", // White text for contrast
            textTransform: "uppercase", // Uppercase for emphasis
            letterSpacing: "1px", // Spacing between letters
          }}
        >
          Edit Paper: {decodedTitle}
        </h2>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="15"
          placeholder="Edit your research paper here..."
          style={{
            width: "100%",
            padding: "1rem",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "5px",
            fontSize: "1rem",
            backgroundColor: "rgba(255, 255, 255, 0.1)", // Frosted textarea
            color: "#fff", // White text for contrast
            outline: "none", // Remove default focus outline
            resize: "none", // Prevent resizing
          }}
        />

        <div style={{ display: "flex", gap: "1rem", marginTop: "1rem" }}>
          {/* Save Button */}
          <button
            onClick={handleSave}
            style={{
              flex: 1,
              padding: "0.8rem",
              backgroundColor: "#6a11cb",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            Save
          </button>

          {/* Back Button (Duplicate for bottom alignment) */}
          <button
            onClick={handleBack}
            style={{
              flex: 1,
              padding: "0.8rem",
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
        </div>

        {/* Success Message */}
        {isSaved && (
          <p
            style={{
              marginTop: "1rem",
              color: "#2ecc71", // Green color for success
              fontSize: "1rem",
            }}
          >
            Changes saved successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default EditPaper;