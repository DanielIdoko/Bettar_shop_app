import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
  const {
    user,
    isAuthenticated,
    token,
    login,
    logout,
    restoreSession,
    fetchAuthenticatedUser,
    isLoading,
    error,
  } = useAuthStore();

  const isAdmin = user?.isAdmin ?? false;

  return {
    user,
    token,
    isAuthenticated,
    isAdmin,
    login,
    logout,
    restoreSession,
    fetchAuthenticatedUser,
    isLoading,
    error,
  };
};
