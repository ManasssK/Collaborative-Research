// frontend/src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div
      style={{
        width: "250px",
        background: "#2c3e50",
        color: "#fff",
        padding: "20px",
        height: "100%",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>Menu</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
            Home
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <Link to="/create" style={{ color: "#fff", textDecoration: "none" }}>
            Create Research
          </Link>
        </li>
        <li style={{ marginBottom: "10px" }}>
          <button onClick={() => handleLogout()}>Logout</button> {/* Logout button */}
        </li>
      </ul>
    </div>
  );
};

const handleLogout = () => {
  localStorage.removeItem("token"); // Clear the token
  window.location.href = "/login"; // Redirect to login page
};

export default Sidebar;