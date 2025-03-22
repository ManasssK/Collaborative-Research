// frontend/src/components/HomePage.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ResearchList from "./ResearchList";

const HomePage = () => {
  return (
    <div className="home-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="research-list">
          <h2>Research Papers</h2>
          <ResearchList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;