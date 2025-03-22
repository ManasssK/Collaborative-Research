// frontend/src/components/Sidebar.jsx
import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="sidebar">
      <h3>Menu</h3>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/create">Create Research</Link>
        </li>
        <li>
          <Link to="/plagiarism-check">Plagiarism Check</Link>
        </li>
        <li>
          <Link to="/evaluate-paper">Evaluate Paper</Link>
        </li>
        <li>
          <Link to="/search-papers">Search Research Papers</Link>
        </li>
        <li>
          <Link to="/add-citation">Add Citation</Link>
        </li>
        <li>
          <button onClick={handleLogout}>Logout</button>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;