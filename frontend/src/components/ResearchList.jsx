// frontend/src/components/ResearchList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ResearchList = () => {
  const [researchPapers, setResearchPapers] = useState([]);
  const [collaboratorInputs, setCollaboratorInputs] = useState({}); // State to manage collaborator inputs
  const navigate = useNavigate();

  // Fetch all research papers on component mount
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

  // Handle adding collaborators to a specific paper
  const handleAddCollaborators = async (title) => {
    try {
      const collaboratorInput = collaboratorInputs[title]; // Get the input for the specific paper
      const collaboratorArray = collaboratorInput.split(",").map((c) => c.trim());
      await axios.post(`/api/research/${encodeURIComponent(title)}/add-collaborators`, { collaborators: collaboratorArray });
      alert("Collaborators added successfully!");
      window.location.reload(); // Refresh the list after adding collaborators
    } catch (error) {
      console.error("Failed to add collaborators:", error.response?.data || error.message);
      alert("Failed to add collaborators. Please try again.");
    }
  };

  // Handle deleting a research paper
  const handleDelete = async (title) => {
    try {
      await axios.delete(`/api/research/${encodeURIComponent(title)}`);
      setResearchPapers((prevPapers) => prevPapers.filter((paper) => paper.title !== title));
    } catch (error) {
      console.error("Failed to delete paper:", error.response?.data || error.message);
    }
  };

  // Handle downloading a research paper
  const handleDownload = async (title) => {
    try {
      const response = await axios.get(`/api/research/${encodeURIComponent(title)}/download`, {
        responseType: "blob", // Ensure the response is treated as a file
      });

      // Create a temporary link to trigger the download
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", `${title}.txt`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to download paper:", error.response?.data || error.message);
      alert("Failed to download paper. Please try again.");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "78vh",
        background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/ResearchList.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "800px",
        }}
      >
        {/* Display message if no papers are found */}
        {researchPapers.length === 0 ? (
          <p style={{ color: "#fff", fontSize: "1.2rem" }}>No research papers found.</p>
        ) : (
          <ul
            style={{
              listStyle: "none",
              padding: 0,
            }}
          >
            {/* Render each paper in the list */}
            {researchPapers.map((paper) => (
              <li
                key={paper._id}
                style={{
                  background: "rgba(255, 255, 255, 0.1)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  borderRadius: "10px",
                  padding: "1rem",
                  margin: "1rem 0",
                  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.64)",
                }}
              >
                {/* Title */}
                <h3
                  style={{
                    color: "#6a11cb", // Expressive title color
                    marginBottom: "0.5rem",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                    textTransform: "uppercase", // Make the title uppercase
                    letterSpacing: "1px", // Add spacing between letters
                  }}
                >
                  {paper.title}
                </h3>

                {/* Abstract Content */}
                <p
                  style={{
                    color: "#ddd",
                    marginBottom: "0.5rem",
                    fontSize: "1rem",
                    lineHeight: "1.5", // Improve readability
                  }}
                >
                  {paper.abstract}
                </p>

                {/* Collaborators */}
                <p
                  style={{
                    color: "#ddd",
                    marginBottom: "0.5rem",
                    fontSize: "0.9rem",
                  }}
                >
                  Collaborators: {paper.collaborators.join(", ") || "None"}
                </p>

                {/* Add Collaborators Input */}
                <input
                  type="text"
                  placeholder="Enter usernames (comma-separated)"
                  value={collaboratorInputs[paper.title] || ""}
                  onChange={(e) =>
                    setCollaboratorInputs({
                      ...collaboratorInputs,
                      [paper.title]: e.target.value,
                    })
                  }
                  style={{
                    width: "100%",
                    padding: "0.5rem",
                    marginBottom: "0.5rem",
                    border: "1px solid rgba(255, 255, 255, 0.2)",
                    borderRadius: "5px",
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                  }}
                />
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {/* Add Collaborators Button */}
                  <button
                    onClick={() => handleAddCollaborators(paper.title)}
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      background: "#6a11cb",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "background 0.3s ease",
                    }}
                  >
                    Add Collaborators
                  </button>

                  {/* Edit Button */}
                  <button
                    onClick={() => navigate(`/edit-paper/${encodeURIComponent(paper.title)}`)}
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      background: "#f39c12",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "background 0.3s ease",
                    }}
                  >
                    Edit
                  </button>

                  {/* Download Button */}
                  <button
                    onClick={() => handleDownload(paper.title)}
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      background: "#2ecc71",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "background 0.3s ease",
                    }}
                  >
                    Download
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(paper.title)}
                    style={{
                      flex: 1,
                      padding: "0.5rem",
                      background: "#e74c3c",
                      color: "#fff",
                      border: "none",
                      borderRadius: "5px",
                      cursor: "pointer",
                      transition: "background 0.3s ease",
                    }}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ResearchList;