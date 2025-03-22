// frontend/src/components/HomePage.jsx
import React from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import ResearchList from "./ResearchList";

const HomePage = () => {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Navbar */}
        <Navbar />

        {/* Research List */}
        <div style={{ padding: "20px" }}>
          <h2>Research Papers</h2>
          <ResearchList />
        </div>
      </div>
    </div>
  );
};

export default HomePage;