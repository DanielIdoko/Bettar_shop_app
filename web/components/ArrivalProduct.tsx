import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Product } from "../types/type";

const ArrivalProduct = ({ latestArrival }: { latestArrival: Product }) => {
  return (
    <Link
      href={`/products/${latestArrival?.slug}`}
      key={latestArrival._id}
      className="p-2 h-fit"
    >
      <Image
        src={latestArrival.images[0]}
        width={400}
        height={450}
        className="rounded-xl"
        alt={latestArrival.title}
      />
      {/* Brand and amount */}
      <div className="w-full h-fit px-1 flex items-center mt-3">
        <p className="text-x-small text-gray-400 flex-1">
          {latestArrival.brand}
        </p>
        <span className="text-medium font-semibold text-dark">
          ${latestArrival.price}
        </span>
      </div>

      <div className="w-full h-fit px-1 flex items-center">
        <p className="text-small text-dark font-semibold flex-1">
          {latestArrival.title.length > 17
            ? latestArrival.title.slice(0, 10) + ".."
            : latestArrival.title}
        </p>
        <p className="text-primary-lighter font-semibold text-x-small">
          {latestArrival.stock > 0 && "Available"}
        </p>
      </div>
    </Link>
  );
};

export default ArrivalProduct;
