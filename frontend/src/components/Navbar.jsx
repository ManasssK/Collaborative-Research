// frontend/src/components/Navbar.jsx
import React from "react";

const Navbar = () => {
  const username = localStorage.getItem("username") || "User"; // Retrieve username from local storage

  return (
    <nav
      style={{
        background: "#34495e",
        color: "#fff",
        padding: "10px 20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "10px 10px 0 0", // Rounded top corners
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Add
      }}
    >
      <h3>Collabrative Research App</h3>
      <p>Welcome, {username}</p>
    </nav>
  );
};

export default Navbar;