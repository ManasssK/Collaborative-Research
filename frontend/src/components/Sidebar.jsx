// frontend/src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div
      style={{
        width: "250px", // Fixed width for sidebar
        background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/ResearchList.jpeg)", // Add overlay for contrast
        backgroundSize: "cover", // Cover the entire container
        backgroundPosition: "center", // Center the image
        backgroundRepeat: "no-repeat", // Prevent image repetition
        color: "#ffffff", // White text
        padding: "1rem",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxSizing: "border-box", // Ensure padding doesn't affect width
        backdropFilter: "blur(10px)", // Glass effect
      }}
    >
      <h3 style={{ marginBottom: "1rem", fontSize: "1.5rem" }}>Menu</h3>
      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: 0,
        }}
      >
        <li style={{ marginBottom: "0.8rem" }}>
          <Link
            to="/"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            Home
          </Link>
        </li>
        <li style={{ marginBottom: "0.8rem" }}>
          <Link
            to="/create"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            Create Research Paper
          </Link>
        </li>
        <li style={{ marginBottom: "0.8rem" }}>
          <Link
            to="/plagiarism-check"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            Plagiarism Check
          </Link>
        </li>
        <li style={{ marginBottom: "0.8rem" }}>
          <Link
            to="/evaluate-paper"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            Evaluate Paper
          </Link>
        </li>
        <li style={{ marginBottom: "0.8rem" }}>
          <Link
            to="/search-papers"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            Search Research Papers
          </Link>
        </li>
        <li style={{ marginBottom: "0.8rem" }}>
          <Link
            to="/add-citation"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontSize: "1rem",
            }}
          >
            Add Citation
          </Link>
        </li>
        <li>
          <button
            onClick={handleLogout}
            style={{
              width: "100%",
              padding: "0.5rem",
              backgroundColor: "#6a11cb", // Blue button background
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "background 0.3s ease",
            }}
          >
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;