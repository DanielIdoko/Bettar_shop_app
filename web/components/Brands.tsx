import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";
import Spinner from "./ui/spinner";
import Brand from "./Brand";

const Brands = ({
  brands,
  isLoading,
  error,
}: {
  brands: string[];
  isLoading: boolean;
  error: string | null;
}) => {
  return (
    <section className="section">
      <div className="w-full h-fit flex items-center">
        <h3 className="sub-heading flex-1">Shop by Brands</h3>
        <Link href="/products" className="see-all-cta">
          See All <ArrowRight size={20} />
        </Link>
      </div>
      {/* Brands */}
      <ul className="brands-grid">
        {isLoading ? (
          <Spinner />
        ) : brands.length > 0 ? (
          brands.map((brand) => <Brand brand={brand} key={brand}/>)
        ) : (
          <p className="text-center text-small text-error">{error}</p>
        )}
      </ul>
    </section>
  );
};

export default Brands;
