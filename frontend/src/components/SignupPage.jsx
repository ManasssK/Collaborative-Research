// frontend/src/components/SignupPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", { username, email, password });
      setMessage("User registered successfully");
      setTimeout(() => navigate("/login"), 2000);
    } catch (error) {
      setMessage("Signup failed: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign Up</button>
        </form>

        {/* Display Success/Error Message */}
        {message && <p style={{ marginTop: "1rem", color: message.includes("successfully") ? "green" : "red" }}>{message}</p>}

        {/* Add Login Link */}
        <p style={{ marginTop: "1rem", fontSize: "0.9rem", textAlign: "center" }}>
          Already have an account?{" "}
          <a href="/login" style={{ color: "#0071e3", textDecoration: "none", fontWeight: "bold" }}>
            Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignupPage;