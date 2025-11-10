"use client";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import React, { useState } from "react";
import { categories } from "../constants";
// import {} from 'react-icons/ai'

const SearchBar = () => {
  const [searchTerm, setSearhTerm] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="search-box">
      <select
        name="product-filters"
        id="product-filters"
        className="w-fit p-1 outline-0 cursor-pointer text-x-small hover:bg-muted transition duration-300 ease-in rounded-md"
      >
        {categories.map(({ id, name }) => (
          <option
            key={id}
            value={name}
            className="text-x-small"
          >
            {name}
          </option>
        ))}
      </select>
      <input
        className="searchbar"
        type="search"
        placeholder="What are you looking for?"
        value={searchTerm}
        onChange={(e) => setSearhTerm(e.target.value)}
      />
      <Button className="bg-primary font-open-sans cursor-pointer">Search</Button>
    </form>
  );
};

export default SearchBar;
