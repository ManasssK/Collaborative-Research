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
    </BrowserRouter>
  );
};

export default App;