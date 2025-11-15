import { ArrowRight } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";
import { useProductStore } from "../store/useProductStore";

const Brands = () => {
  const { brands, fetchByBrands } = useProductStore();

  useEffect(() => {
    fetchByBrands();
  }, []);

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
        {brands.length > 0 ? (
          brands.map(
            (brand) => (
              console.log(brand),
              (
                <li className="brand-item" key={brand}>
                  <Link
                    href={`/products?brand=${brand}`}
                    className="brand-card"
                  >
                    <img
                      src={`https://source.unsplash.com/600x600/?${encodeURIComponent(
                        brand
                      )}`}
                      alt={brand}
                    />
                    <p>{brand}</p>
                  </Link>
                </li>
              )
            )
          )
        ) : (
          <p>No brands available.</p>
        )}
      </ul>
    </section>
  );
};

export default Brands;
