"use client";
import React from "react";
import { Navigation, Pagination, A11y, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Image from "next/image";
import Link from "next/link";

export const heroImages = [
  {
    id: 0,
    url: "/images/hero1.png",
    title: "Elevate Your Everyday Style",
    subtitle:
      "Discover minimalist fashion essentials built for comfort and confidence.",
    cta: { label: "Shop Collection", url: "/shop" },
  },
  {
    id: 1,
    url: "/images/hero2.png",
    title: "Redefine Your Workspace",
    subtitle: "Tech meets design — explore premium accessories for your setup.",
    cta: { label: "Explore Now", url: "/products" },
  },
  {
    id: 2,
    url: "/images/hero3.png",
    title: "Sustainable, Stylish, Smart",
    subtitle: "Eco-friendly materials blended with modern craftsmanship.",
    cta: { label: "Go Green", url: "/eco" },
  },
  {
    id: 3,
    url: "/images/hero4.png",
    title: "Performance Meets Design",
    subtitle: "From gym to street — premium wear that moves with you.",
    cta: { label: "Shop Activewear", url: "/active" },
  },
];

const Hero = () => {
  return (
    <section className="relative w-full h-[65vh] md:h-[90vh] overflow-hidden rounded-3xl">
      <Swiper
        modules={[Navigation, Pagination, A11y, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        pagination={{
          clickable: true,
          bulletActiveClass: "swiper-pagination-bullet-active !bg-base",
        }}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        className="w-full h-full"
      >
        {heroImages.map(({ id, url, title, subtitle, cta }) => (
          <SwiperSlide key={id} className="relative w-full h-full">
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={url}
                alt={title}
                fill
                className="object-cover object-center rounded-3xl transition-transform duration-4000 ease-linear scale-105 hover:scale-110"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-r from-black/90 via-black/50 to-transparent rounded-3xl"></div>
            </div>

            {/* Content Overlay */}
            <div className="relative z-10 flex flex-col justify-center h-full px-8 md:px-20 max-w-xl">
              <h1 className="text-4xl md:text-large text-base font-open-sans leading-tight mb-4 tracking-tight drop-shadow-lg">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-muted mb-8 leading-relaxed">
                {subtitle}
              </p>
              <Link
                href={cta.url}
                className="bg-primary text-base font-semibold px-8 py-3 rounded-md w-fit transition-all duration-300 hover:bg-primary-lighter shadow-lg"
              >
                {cta.label}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
