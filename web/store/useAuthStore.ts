import { create } from "zustand";
import api from "@/../utils/api";
import { User } from "../types/type";

// Auth state type
type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Fns
  register: (name: string, email: string, password: string) => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchAuthenticatedUser: () => Promise<void>;
  fetchUserProfile: (userId: string) => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  isLoading: false,
  error: null,

  // Mutators
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),

  setUser: (user) => set({ user }),
  setLoading: (value) => set({ isLoading: value }),
  setError: (error) => set({ error }),

  // Register user
  register: async (name, email, password) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.post("/auth/register", {
        name,
        email,
        password,
      });

      // Check for token to verify user logged in
      if (data.data?.token) {
        set({
          isAuthenticated: true,
          user: data.data.user,
        });
        return true;
      }

      return false;
    } catch (err: any) {
      console.error("Registration failed:", err.response?.data || err.message);

      set({
        error: "An error occured. Please try again.",
        isAuthenticated: false,
      });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  // Login User
  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.post("/auth/login", {
        email,
        password,
      });

      // Check for token to verify user logged in
      if (data?.token) {
        set({
          isAuthenticated: true,
          user: data.user,
        });
        return true;
      }
      return false;
    } catch (err: any) {
      console.error("Login failed:", err.response?.data.data || err.message);

      set({ error: "Invalid credentials", isAuthenticated: false });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  // Logout
  logout: async () => {
    const { data } = await api.get("/auth/logout");
    if (data) {
      set({
        isAuthenticated: false,
        user: null,
      });
    }
  },

  // Fetch authenticated user (on app load)
  fetchAuthenticatedUser: async () => {
    try {
      set({ isLoading: true });
      const { data } = await api.get("/auth/me");
      if (data) {
        set({
          isAuthenticated: true,
          user: data.data,
        });
      }
    } catch (err: any) {
      console.warn("User not authenticated:", err.message);
      set({ isAuthenticated: false, user: null });
    } finally {
      set({ isLoading: false });
    }
  },

  // Fetch user profile
  fetchUserProfile: async (userId) => {
    try {
      set({ isLoading: true });
      const { data } = await api.get(`/users/profile/${userId}`);
      if (data) {
        set({
          user: data.data,
        });
      }
    } catch (err: any) {
      console.warn("User profile not found:", err.message);
      set({ user: null });
    } finally {
      set({ isLoading: false });
    }
  },
}));
