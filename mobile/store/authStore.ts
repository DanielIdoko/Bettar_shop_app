import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "@/utils/api";
import { User } from "@/types/type";

// Auth state type
type AuthState = {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;

  // Actions
  setIsAuthenticated: (value: boolean) => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;

  // Fns
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  fetchAuthenticatedUser: () => Promise<void>;
  restoreSession: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set, get) => ({
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,
  error: null,

  // Mutators
  setIsAuthenticated: (value) => set({ isAuthenticated: value }),
  setUser: (user) => set({ user }),
  setToken: (token) => set({ token }),
  setLoading: (value) => set({ isLoading: value }),
  setError: (error) => set({ error }),

  // Login user
  login: async (email, password) => {
    try {
      set({ isLoading: true, error: null });
      const { data } = await api.post("/auth/login", { email, password });

      if (data?.token) {
        await AsyncStorage.setItem("token", data.token);
        set({
          token: data.token,
          isAuthenticated: true,
          user: data.user,
        });
        return true;
      }
      return false;
    } catch (err: any) {
      console.error("Login failed:", err.response?.data || err.message);
      set({ error: "Invalid credentials", isAuthenticated: false });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  // Logout
  logout: async () => {
    await AsyncStorage.removeItem("token");
    set({
      isAuthenticated: false,
      token: null,
      user: null,
    });
  },

  // Fetch authenticated user (e.g., on app load)
  fetchAuthenticatedUser: async () => {
    try {
      set({ isLoading: true });
      const { data } = await api.get("/users/me");
      set({ user: data.user, isAuthenticated: true });
    } catch (err: any) {
      console.warn("User not authenticated:", err.message);
      set({ isAuthenticated: false, user: null });
    } finally {
      set({ isLoading: false });
    }
  },

  // Restore token/session on app start
  restoreSession: async () => {
    try {
      set({ isLoading: true });
      const token = await AsyncStorage.getItem("token");

      if (token) {
        set({ token, isAuthenticated: true });
        await get().fetchAuthenticatedUser();
      } else {
        set({ isAuthenticated: false });
      }

    } catch (err) {
      console.error("Session restore failed:", err);
    } finally {
      set({ isLoading: false });
    }
  },
}));
