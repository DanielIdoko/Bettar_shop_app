"use client";
import React from "react";
import { featuredDeals } from "../constants";
import Link from "next/link";
import Image from "next/image";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Button } from "@/components/ui/button";

const FeaturedDeals = () => {
  return (
    <section className="section py-10">
      <div className="mb-5">
        <h3 className="sub-heading">Featured Deals</h3>
        <p className="text-gray-500 md:text-lg max-w-2xl">
          Discover exclusive limited-time offers on our top-rated tech and
          lifestyle products.
        </p>
      </div>

      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletActiveClass:
            "swiper-pagination-bullet-active !bg-primary-lighter",
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full h-full"
      >
        {featuredDeals.map((deal) => (
          <SwiperSlide
            key={deal.title}
            className="h-40 rounded-2xl overflow-hidden group bg-base transition-all duration-300"
          >
            <Link href={deal.cta?.url || "#"} className="flex flex-col h-full">
              {/* Image */}
              <div className="relative w-full h-60 overflow-hidden">
                <Image
                  src={deal.image_url}
                  alt={deal.title}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/50 to-black/5"></div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col flex-1 justify-between p-6 text-left">
                <div>
                  <h4 className="text-xl font-semibold text-gray-900 mb-2">
                    {deal.title}
                  </h4>
                  <p className="text-primary font-medium text-sm mb-1">
                    {deal.subtitle}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {deal.description}
                  </p>
                </div>

                <Button
                  variant="default"
                  className="mt-5 w-fit bg-primary text-base rounded-md px-6 py-2 transition-transform duration-300 hover:bg-primary-lighter cursor-pointer"
                >
                  {deal.cta?.label || "Shop Now"}
                </Button>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default FeaturedDeals;
