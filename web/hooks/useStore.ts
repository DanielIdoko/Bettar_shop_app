'use client'
import { useAuthStore } from "../store/useAuthStore";
import { useProductStore } from "../store/useProductStore";

export const useStore = () => {
  const {
    user,
    isAuthenticated,
    register,
    login,
    logout,
    fetchAuthenticatedUser,
    fetchUserProfile,
    isLoading,
    error,
  } = useAuthStore();

  const {
    brands,
    latestArrivals,
    fetchByBrands,
    fetchLatestArrivals,
    error: productError,
    isLoading: productLoading,
  } = useProductStore();
  // const isAdmin = user?.isAdmin ?? false;

  return {
    user,
    isAuthenticated,
    // isAdmin,
    register,
    login,
    logout,
    fetchAuthenticatedUser,
    fetchUserProfile,
    isLoading,
    error,
    fetchByBrands,
    fetchLatestArrivals,
    brands,
    latestArrivals,
    productError,
    productLoading,
  };
};
