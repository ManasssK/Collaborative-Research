// frontend/src/api/researchApi.js
import axios from "axios";

const API_BASE_URL = "/api/research"; // Proxy handles forwarding to http://localhost:5000/api/research

// Fetch all research papers (GET request)
export const getAllResearch = async () => {
  try {
    const response = await axios.get(API_BASE_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching research papers:", error.response?.data || error.message);
    throw error;
  }
};

// Create a new research paper (POST request)
export const createResearch = async (researchData) => {
  try {
    const response = await axios.post(API_BASE_URL, researchData, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating research paper:", error.response?.data || error.message);
    throw error;
  }
};