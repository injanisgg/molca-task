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

// Add response interceptor untuk error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("API Error:", {
        status: error.response.status,
        data: error.response.data,
        endpoint: error.config.url,
      });
    } else if (error.request) {
      console.error("No response from API:", error.message);
    } else {
      console.error("API request error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;

// Verifikasi base URL di console (untuk debugging)
if (typeof window !== "undefined") {
  console.log("API Base URL:", API_BASE_URL);
}