import { HelpCircle, Phone } from "lucide-react";
import React from "react";
import { BiEnvelope } from "react-icons/bi";
import {
  FaTshirt,
  FaLaptop,
  FaHeartbeat,
  FaBaby,
  FaAppleAlt,
  FaCouch,
  FaBasketballBall,
  FaSpa,
  FaWatchmanMonitoring,
  FaTools,
  FaCarSide,
  FaBookOpen,
} from "react-icons/fa";
import { GiLipstick } from "react-icons/gi";
import { MdOutlineHealthAndSafety } from "react-icons/md";

export const headlineFeatures = [
  {
    id: 1,
    icon: "",
    text: "Trusted Shipping",
  },
  {
    id: 2,
    icon: "",
    text: "Easy RETURNS",
  },
  {
    id: 3,
    icon: "",
    text: "Secure Shopping",
  },
];

export const heroImages = [
  {
    id: 0,
    url: "../../../public/images/hero1.png",
  },
  {
    id: 1,
    url: "../../../public/images/hero2.png",
  },
  {
    id: 2,
    url: "../../../public/images/hero3.png",
  },
  {
    id: 3,
    url: "../../../public/images/hero4.png",
  },
];

export const categories = [
  { id: 1, name: "Fashion" },
  { id: 2, name: "Beauty&Personal Care" },
  { id: 3, name: "Electronics" },
  { id: 4, name: "Home & Living" },
  { id: 5, name: "Sports & Outdoors" },
  { id: 6, name: "Health & Wellness" },
  { id: 7, name: "Baby & Kids" },
  { id: 8, name: "Groceries" },
  { id: 9, name: "Automotive" },
  { id: 10, name: "Books & Stationery" },
  { id: 11, name: "Gaming" },
  { id: 12, name: "Pet Supplies" },
  { id: 13, name: "Office & Stationery" },
  { id: 14, name: "Jewelry & Watches" },
  { id: 15, name: "Furniture" },
  { id: 16, name: "Music & Instruments" },
  { id: 17, name: "Travel & Luggage" },
  { id: 18, name: "Tools & Hardware" },
  { id: 19, name: "Garden & Outdoor" },
  { id: 20, name: "Arts & Crafts" },
  { id: 21, name: "Smart Home" },
  { id: 22, name: "Mobile Accessories" },
  { id: 23, name: "Cameras & Photography" },
  { id: 24, name: "Footwear" },
  { id: 25, name: "Kitchen & Dining" },
  { id: 26, name: "Cleaning Supplies" },
  { id: 27, name: "Movies & Entertainment" },
  { id: 28, name: "Home Improvement" },
  { id: 29, name: "Collectibles & Memorabilia" },
  { id: 30, name: "Seasonal & Gifts" },
];

export const categoriesList = [
  {
    id: 1,
    name: "Fashion",
    url: "/categories/fashion",
    icon: <FaTshirt size={20} className="text-primary" />,
  },
  {
    id: 2,
    name: "Beauty & Personal Care",
    url: "/categories/beauty-personalcare",
    icon: <GiLipstick size={20} className="text-primary" />,
  },
  {
    id: 3,
    name: "Electronics",
    url: "/categories/electronics",
    icon: <FaLaptop size={20} className="text-primary" />,
  },
  {
    id: 4,
    name: "Home & Living",
    url: "/categories/home-living",
    icon: <FaCouch size={20} className="text-primary" />,
  },
  {
    id: 5,
    name: "Sports & Outdoors",
    url: "/categories/sports-outdoors",
    icon: <FaBasketballBall size={20} className="text-primary" />,
  },
  {
    id: 6,
    name: "Health & Wellness",
    url: "/categories/health-wellness",
    icon: <MdOutlineHealthAndSafety size={20} className="text-primary" />,
  },
  {
    id: 7,
    name: "Baby & Kids",
    url: "/categories/baby-kids",
    icon: <FaBaby size={20} className="text-primary" />,
  },
  {
    id: 8,
    name: "Groceries",
    url: "/categories/groceries",
    icon: <FaAppleAlt size={20} className="text-primary" />,
  },
  {
    id: 9,
    name: "Books & Stationery",
    url: "/categories/books",
    icon: <FaBookOpen size={20} className="text-primary" />,
  },
  {
    id: 10,
    name: "Automotive",
    url: "/categories/automotive",
    icon: <FaCarSide size={20} className="text-primary" />,
  },
  {
    id: 11,
    name: "Tools & Hardware",
    url: "/categories/tools",
    icon: <FaTools size={20} className="text-primary" />,
  },
  {
    id: 12,
    name: "Watches & Accessories",
    url: "/categories/watches",
    icon: <FaWatchmanMonitoring size={20} className="text-primary" />,
  },
];

export const featuredDeals = [
  {
    image_url:
      "https://m.media-amazon.com/images/I/61zAZ5RrYzL._AC_SL1500_.jpg",
    title: "Wireless Noise Cancelling Headphones",
    subtitle: "Immersive Sound. Limitless Comfort.",
    description:
      "Experience crystal-clear audio with active noise cancellation and up to 40 hours of battery life. Designed for all-day wear and travel.",
    cta: { label: "Shop Headphones", url: "/products/headphones" },
  },
  {
    image_url:
      "https://m.media-amazon.com/images/I/81P7D3W0P-L._AC_SL1500_.jpg",
    title: "Smartwatch Series 9",
    subtitle: "Track, Train, Thrive.",
    description:
      "Stay connected and motivated with real-time fitness tracking, heart rate monitoring, and sleek modern design built for your lifestyle.",
    cta: { label: "Explore Smartwatches", url: "/products/smartwatches" },
  },
  {
    image_url:
      "https://m.media-amazon.com/images/I/71xjcl2uGGL._AC_SL1500_.jpg",
    title: "4K UHD Home Projector",
    subtitle: "Bring the Cinema Home.",
    description:
      "Enjoy stunning 4K visuals, ultra-bright LED performance, and wireless streaming support for the ultimate movie night experience.",
    cta: { label: "View Projectors", url: "/products/projectors" },
  },
  {
    image_url:
      "https://m.media-amazon.com/images/I/71hHsE8KcDL._AC_SL1500_.jpg",
    title: "Gaming Laptop RTX 4070",
    subtitle: "Performance Meets Precision.",
    description:
      "Powered by NVIDIA RTX graphics and a 165Hz QHD display for smooth, immersive gameplay and creative performance on the go.",
    cta: { label: "Shop Gaming Laptops", url: "/products/laptops" },
  },
  {
    image_url:
      "https://m.media-amazon.com/images/I/61hE4nK+qFL._AC_SL1500_.jpg",
    title: "Smart Home Starter Kit",
    subtitle: "Your Home, Smarter.",
    description:
      "Control lights, cameras, and more with a simple voice command. Get started with the essential smart devices in one easy bundle.",
    cta: { label: "Get Smart Kit", url: "/products/smart-home" },
  },
];

// Help Center Component data
export const helpOptions = [
  {
    id: 1,
    title: "Help Center",
    subtitle: "help.bettarshop.com",
    icon: <HelpCircle size={20} className="text-primary" />,
  },
  {
    id: 2,
    title: "Phone",
    subtitle: "+234 800 123 4567",
    icon: <Phone size={20} className="text-primary" />,
  },
  {
    id: 3,
    title: "EMail Support",
    subtitle: "bettarshop@gmail.com",
    icon: <BiEnvelope size={20} className="text-primary" />,
  },
];

// Footter Cards data
export const footerCards = [
  {
    id: "e939y93eh3e9h9h9",
    card_title: "Stripe",
    card_image: "",
  },
  {
    id: "ud9h93hfh339h93h3",
    card_title: "Visa",
    card_image: "",
  },
  {
    id: "sjcwihhw9",
    card_title: "Mastercard",
    card_image: "",
  },
  {
    id: "jceihchehc99",
    card_title: "Amazon Pay",
    card_image: "",
  },
];
