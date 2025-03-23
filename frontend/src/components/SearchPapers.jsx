// frontend/src/components/SearchPapers.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const SearchPapers = () => {
  const [query, setQuery] = useState("");
  const [papers, setPapers] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`/api/search-papers?query=${query}`);
      setPapers(response.data);

      // Open Google Scholar search in a new tab
      window.open(`https://scholar.google.com/scholar?q=${encodeURIComponent(query)}`, "_blank");
    } catch (error) {
      console.error("Error searching papers:", error.response?.data?.message || error.message);
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

        <h2 style={{ marginBottom: "1rem", fontSize: "1.5rem", color: "#333" }}>
          Search Research Papers
        </h2>
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <input
            type="text"
            placeholder="Enter title or author"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "0.8rem",
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
              backgroundColor: "#6a11cb", // Blue button background
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            Search
          </button>
        </form>
        <ul
          style={{
            marginTop: "1rem",
            padding: 0,
            listStyle: "none",
          }}
        >
          {papers.map((paper) => (
            <li
              key={paper._id}
              style={{
                background: "rgba(255, 255, 255, 0.9)", // Slightly opaque background
                padding: "1rem",
                margin: "0.5rem 0",
                borderRadius: "5px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h3 style={{ margin: "0 0 0.5rem 0", fontSize: "1.2rem", color: "#333" }}>
                {paper.title}
              </h3>
              <p style={{ margin: 0, fontSize: "1rem", color: "#555" }}>{paper.abstract}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPapers;