"use client";
import React, { useEffect } from "react";
import api from "../../../utils/api";
import CategoryList from "../../../components/CategoryList";
import NewArrivals from "../../../components/NewArrivals";
import Hero from "../../../components/Hero";
import FeaturedDeals from "../../../components/FeaturedDeals";
import Brands from "../../../components/Brands";
import HelpCenter from "../../../components/HelpCenter";


const Home = () => {
  const fetchData = async () => {
    const response = await api.get("/products");
    const data = await response.data;
    console.log(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <main className="home">
     <Hero />
      {/* category list starts*/}
      <CategoryList />
      {/* category list ends*/}
      {/* New Arrivals starts */}
      <NewArrivals />
      {/* New Arrivals ends */}
      {/* Featured Deals starts */}
      <FeaturedDeals />
      {/* Featured Deals ends */}
      <Brands />
      <HelpCenter />
    </main>
  );
};

export default Home;
