import axios from "axios";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://test-hiring-app.user.cloudjkt02.com/api/hiring-frontend";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 30000,
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    let message = "";

    if (error.response) {
      message = error.response.data?.message || "Server error";
    } else if (error.request) {
      message = "No response from server.";
    } else {
      message = error.message;
    }

    // 🚨 tampilkan alert error langsung
    if (typeof window !== "undefined") {
      alert(`API Error: ${message}`);
    } else {
      console.error("API Error:", message);
    }

    return Promise.reject(error);
  }
);

export default apiClient;

if (typeof window !== "undefined") {
  console.log("API Base URL:", API_BASE_URL);
}