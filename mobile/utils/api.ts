import axios from "axios";
import useAuthStore from "@/store/authStore";
const API_URL = process.env.NEXT_PUBLIC_API_URL

//  Base configuration
const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

// Attach token to every request
api.interceptors.request.use(
  async (config) => {
    const { token } = useAuthStore.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

//  Handle expired tokens / server errors globally
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { logout } = useAuthStore.getState();

    if (error.response) {
      const { status } = error.response;

      // Unauthorized — maybe token expired
      if (status === 401) {
        console.warn("Token expired or invalid. Logging out...");
        logout();
      }

      // Forbidden — admin only route, etc.
      if (status === 403) {
        console.warn("Access denied");
      }

      // Server error
      if (status >= 500) {
        console.error("Server Error:", error.response.data);
      }
    }

    return Promise.reject(error);
  }
);

export default api;