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
      localStorage.setItem("token", response.data.token); // Store token
      localStorage.setItem("username", username); // Store username
      setMessage("Login Successful");
      setTimeout(() => {
        navigate("/"); // Redirect to home page after 2 seconds
      }, 2000);
    } catch (error) {
      setMessage("Login failed: " + error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
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
      {message && <p>{message}</p>} {/* Display success/error message */}
      <button onClick={() => navigate("/signup")}>Back to Sign Up</button>
    </div>
  );
};

export default LoginPage;