import { ArrowRight, Loader } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo } from "react";
import { useProductStore } from "../store/useProductStore";
import Image from "next/image";
import Spinner from "./ui/spinner";
import ArrivalProduct from "./ArrivalProduct";

const NewArrivals = () => {
  const { fetchLatestArrivals, isLoading, error, latestArrivals } =
    useProductStore();

  useEffect(() => {
    fetchLatestArrivals();
  }, [fetchLatestArrivals]);

  return (
    <section className="section">
      <div className="w-full h-fit flex items-center">
        <h3 className="sub-heading flex-1">New Arrivals</h3>
        <Link href="/products" className="see-all-cta">
          See All <ArrowRight size={20} />
        </Link>
      </div>

      <div className="w-full h-fit py-10">
        {isLoading ? (
          <Spinner />
        ) : error ? (
          <p className="text-center text-md text-error">{error}</p>
        ) : (
          latestArrivals.length > 0 && (
            <div className=" grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {latestArrivals.map((latestArrival) => (
                <ArrivalProduct key={latestArrival._id}/>
              ))}
            </div>
          )
        )}
      </div>
    </section>
  );
};

export default NewArrivals;
