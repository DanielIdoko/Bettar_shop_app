import { create } from "zustand";
import api from "@/../utils/api";
import { Product } from "../types/type";

type ProductState = {
  isLoading: boolean;
  error: string | null;
  latestArrivals: Product[] | [];
  brands: [string] | [];
  fetchLatestArrivals: () => Promise<void>;
  fetchByBrands: () => Promise<void>;
};

export const useProductStore = create<ProductState>((set, get) => ({
  isLoading: false,
  error: null,
  latestArrivals: [],
  brands: [],

  fetchLatestArrivals: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/products/new-arrivals");
      set({ latestArrivals: response.data.data });
      // console.log(response.data.data);
      set({ isLoading: false, error: null });
    } catch (error: any) {
      console.error(error.message);
      set({
        isLoading: false,
        error: error.message,
      });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchByBrands: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get("/products/brands");
      set({ brands: response.data.data });
      
      // console.log(response.data.data);
      set({ isLoading: false, error: null });
    } catch (error: any) {
      console.error(error.message);
      set({
        isLoading: false,
        error: error.message,
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
