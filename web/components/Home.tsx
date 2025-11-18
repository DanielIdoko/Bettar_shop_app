"use client";
import React, { useEffect } from "react";
import CategoryList from "./CategoryList";
import NewArrivals from "./NewArrivals";
import Hero from "./Hero";
import FeaturedDeals from "./FeaturedDeals";
import Brands from "./Brands";
import HelpCenter from "./HelpCenter";
import { useAuthStore } from "../store/useAuthStore";
import Spinner from "./ui/spinner";

const Home = ({
  brands,
  latestArrivals,
  isLoading,
  error,
  productError,
  productLoading,
}: {
  brands: string[];
  latestArrivals: any[];
  isLoading: boolean;
  error: string | null;
  productError: string | null;
  productLoading: boolean;
}) => {
  const { fetchAuthenticatedUser, user } = useAuthStore();

  useEffect(() => {
    if (!user) fetchAuthenticatedUser();
  }, [user, fetchAuthenticatedUser]);

  if (isLoading) return <Spinner />;

  return (
    <main className="home">
      <Hero />
      {/* category list starts*/}
      <CategoryList />
      {/* category list ends*/}
      {/* New Arrivals starts */}
      <NewArrivals
        latestArrivals={latestArrivals}
        isLoading={productLoading}
        error={productError}
      />
      {/* New Arrivals ends */}
      {/* Featured Deals starts */}
      <FeaturedDeals />
      {/* Featured Deals ends */}
      <Brands brands={brands} isLoading={productLoading} error={productError} />
      {/* Help center starts */}
      <HelpCenter />
      {/* Help center ends */}
    </main>
  );
};

export default Home;
