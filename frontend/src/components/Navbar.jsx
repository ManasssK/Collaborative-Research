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
      }}
    >
      <h3>Research App</h3>
      <p>Welcome, {username}</p>
    </nav>
  );
};

export default Navbar;