import { useAuthStore } from "@/store/authStore";
import api from "./api";

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
