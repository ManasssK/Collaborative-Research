// frontend/src/components/LoginPage.jsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/auth/login", { username, password });
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", username);
      setMessage("Login Successful");
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      console.error("Login failed:", error.response?.data || error.message);
      setMessage("Login failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="login-container">
      <div className="auth-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>

        {/* Display success or error messages */}
        {message && <p>{message}</p>}

        {/* Link to Sign-Up Page */}
        <p>
          Don't have an account? <a href="/signup">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;