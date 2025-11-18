import React from "react";
import { categoriesList } from "../constants";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const CategoryList = () => {
  return (
    <section className="section">
      <h2 className="sub-heading">Shop By Category</h2>
      <div className="w-full">
        <ul className="w-full flex-1 p-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-4 md:py-10">
          {categoriesList.map(({ id, name, url, icon }) => (
            <li
              key={id}
              className="bg-base h-16 w-full md:w-52 rounded-xl border border-muted hover:shadow-xl transition duration-300 ease-in"
            >
              <Link
                href={url}
                className="w-full h-full flex items-center justify-center gap-3 font-open-sans text-x-small md:text-small rounded-xl"
              >
                {icon}
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Link href="/categories" className="see-all-cta">
        See All <ArrowRight size={20} />
      </Link>
    </section>
  );
};

export default CategoryList;
