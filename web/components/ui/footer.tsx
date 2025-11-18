import React from "react";
import { AiFillQuestionCircle } from "react-icons/ai";
import { BiBriefcase } from "react-icons/bi";
import Link from "next/link";
import { footerCards } from "../../constants";

// Card component for payment methods
// const Card = ({
//   card_image,
//   card_name,
// }: {
//   card_image: string;
//   card_name: string;
// }) => {
//   return (
//     <div className="border p-2 w-15 h-10 border-gray-300 rounded-md flex items-center justify-center">
//       <img src={card_image} alt={card_name} />
//     </div>
//   );
// };

const Footer = () => {
  return (
    <footer className="footer">
      <div className="w-fit h-full p-3">
        <img
          src={undefined}
          alt="Flix Logo"
          className="footer-logo w-12 h-12 rounded-full"
        />
        <span className="text-dark font-semibold text-small md:text-medium-size font-open-sans">
          Flix Shop
        </span>
        <p className="pt-6 text-dark/60 text-small font-open-sans">
          Experience a seamless, personalized, and rewarding way to shop. We're
          building the future of retail, one order at a time.
        </p>
        <p className="footer-heading">Accepted Payments</p>
        <div className="cards-container">
          {/* {footerCards.map((card) => (
            <Card
              card_image={card.card_image}
              card_name={card.card_title}
              key={card.id}
            />
          ))} */}
        </div>
      </div>
      <div className="h-full w-full md:col-span-2 p-2 md:flex md:justify-start md:gap-5 lg:gap-30">
        <div className="links-container">
          <h6 className="footer-heading">Department</h6>
          <Link href="/products/fashion">Fashion</Link>
          <Link href="">Office Supplies</Link>
          <Link href="">Electronics and Gadgets</Link>
          <Link href="">Travel Accessories</Link>
          <Link href="">Furniture</Link>
          <Link href="">Wears</Link>
          <Link href="">Fitness</Link>
        </div>
        <div className="links-container">
          <h6 className="footer-heading">About Us</h6>
          <Link href="">About ShopCart</Link>
          <Link href="">News and Blog</Link>
          <Link href="">Help</Link>
          <Link href="">Location</Link>
          <Link href="">Contact</Link>
          <Link href="">Press Center</Link>
        </div>
        <div className="links-container">
          <h6 className="footer-heading">Services</h6>
          <Link href="">Shipping and Delivery</Link>
          <Link href="">Order Pickup</Link>
          <Link href="">FAQs</Link>
        </div>
        <div className="links-container">
          <h6 className="footer-heading">Help</h6>
          <Link href="">Track Orders</Link>
          <Link href="">Feedback</Link>
          <Link href="">Orders</Link>
          <Link href="">Returns</Link>
          <Link href="">Report a problem</Link>
        </div>
      </div>
      <div className="final-section">
        <div className="w-auto p-1 flex flex-1 items-center justify-start gap-10 md:gap-5 lg:gap-10 md:pl-3">
          <Link href="">
            <BiBriefcase className="text-primary" />
            Gift Cards
          </Link>
          <Link href="">
            <AiFillQuestionCircle className="text-primary" />
            Help Center
          </Link>
        </div>
        <div className=" p-1 flex items-center justify-start md:justify-around flex-1 gap-10 md:gap-3 lg:gap-10">
          <a
            href=""
            className="text-x-small md:text-x-small lg:text-small text-dark font-open-sans"
          >
            Terms of Service
          </a>
          <a
            href=""
            className="text-x-small md:text-x-small lg:text-small text-dark font-open-sans"
          >
            Privacy Policy
          </a>
        </div>
        <div className="w-fit flex-1 items-center justify-around gap-10">
          <Link
            href="https://linkedin.com/in/danielidokodev"
            target="blank"
            className="text-small md:text-x-small lg:text-small font-open-sans text-gray-700 md:text-dark lg:text-gray-700 "
          >
            Copyright @Bettar Shop | 2025
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
