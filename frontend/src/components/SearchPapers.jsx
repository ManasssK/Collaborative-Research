// frontend/src/components/SearchPapers.jsx
import React, { useState } from "react";
import axios from "axios";

const SearchPapers = () => {
  const [query, setQuery] = useState("");
  const [papers, setPapers] = useState([]);

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
    <div className="auth-container">
      <div className="auth-form">
        <h2>Search Research Papers</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter title or author"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <button type="submit">Search</button>
        </form>
        <ul>
          {papers.map((paper) => (
            <li key={paper._id}>
              <h3>{paper.title}</h3>
              <p>{paper.abstract}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPapers;