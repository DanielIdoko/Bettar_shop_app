"use client";
import React, { useEffect } from "react";
import Home from "../../../components/Home";
import { useStore } from "../../../hooks/useStore";

const Main = () => {
  const {
    isLoading,
    error,
    fetchByBrands,
    fetchLatestArrivals,
    brands,
    latestArrivals,
    productError,
    productLoading,
  } = useStore();

  useEffect(() => {
    fetchByBrands();
    fetchLatestArrivals();
  }, []);

  return (
    // Home Client
    <Home
      brands={brands}
      latestArrivals={latestArrivals}
      isLoading={isLoading}
      error={error}
      productError={productError}
      productLoading={productLoading}
    />
  );
};

export default Main;
