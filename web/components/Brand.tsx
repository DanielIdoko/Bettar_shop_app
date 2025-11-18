import Link from "next/link";
import React from "react";

const Brand = ({ brand }: { brand: string }) => {
  return (
    <li className="brand-item" key={brand}>
      <Link href={`/products?brand=${brand}`} className="brand-card">
        <img
          src={`https://source.unsplash.com/600x600/?${encodeURIComponent(
            brand
          )}`}
          alt={brand}
        />
        <p>{brand}</p>
      </Link>
    </li>
  );
};

export default Brand;
