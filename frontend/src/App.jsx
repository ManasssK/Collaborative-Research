// frontend/src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import HomePage from "./components/HomePage";
import ResearchForm from "./components/ResearchForm";
import PlagiarismCheck from "./components/PlagiarismCheck";
import EvaluatePaper from "./components/EvaluatePaper";
import SearchPapers from "./components/SearchPapers";
import AddCitation from "./components/AddCitation";
import EditPaper from "./components/EditPaper"; // For editing paper content
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh", // Ensure the app takes up full viewport height
          background: "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(/ResearchList.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Routes>
          {/* Authentication Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <ResearchForm />
              </ProtectedRoute>
            }
          />
          <Route
            path="/plagiarism-check"
            element={
              <ProtectedRoute>
                <PlagiarismCheck />
              </ProtectedRoute>
            }
          />
          <Route
            path="/evaluate-paper"
            element={
              <ProtectedRoute>
                <EvaluatePaper />
              </ProtectedRoute>
            }
          />
          <Route
            path="/search-papers"
            element={
              <ProtectedRoute>
                <SearchPapers />
              </ProtectedRoute>
            }
          />
          <Route
            path="/add-citation"
            element={
              <ProtectedRoute>
                <AddCitation />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-paper/:title"
            element={
              <ProtectedRoute>
                <EditPaper />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;