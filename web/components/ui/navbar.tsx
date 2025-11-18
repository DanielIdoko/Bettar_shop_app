"use client";
import Link from "next/link";
import React from "react";
import SearchBar from "../SearchBar";
import { useAuthStore } from "../../store/useAuthStore";
import ProfileIcon from "../profileicon";
import { Button } from "@/components/ui/button";
import {} from "react-icons/ai";
import { BiCart, BiHeart } from "react-icons/bi";
import Image from "next/image";

const NavBar = () => {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <header className="navbar">
      <Link href="/">
        <Image
          src="https://chatgpt.com/backend-api/estuary/content?id=file_00000000cc4871f4945c5a96a168ad3b&ts=489527&p=fs&cid=1&sig=2d556b00432ad209c2a3474b97687b0795bc0d52ab9920f329b8dd422fd21c2c&v=0"
          alt="Bettar Shop logo"
          width={100}
          height={50}
        />
      </Link>
      <SearchBar />
      {/* Icons */}
      <div
        className="w-fit h-full items-center gap-1 md:gap-4 flex
      "
      >
        <div className="nav-icon">
          <BiCart size={22} />
          <span className="count cart-count">0</span>
        </div>
        <div className="nav-icon">
          <BiHeart size={22} />
          <span className="count favourite-count">0</span>
        </div>
      </div>

      {isAuthenticated && user ? (
        <ProfileIcon avatar_url={user?.avatar} username={user?.name} userId={user?._id}/>
      ) : (
        <div className="h-full w-fit p-2 flex items-center gap-4 ml-0">
          <Button
            variant="outline"
            className="text-x-small md:text-small font-open-sans"
          >
            <Link href="/Register">Sign Up</Link>
          </Button>
          <Button
            variant="default"
            className="text-x-small md:text-small text-white font-open-sans"
          >
            <Link href="/Login">Login</Link>
          </Button>
        </div>
      )}
    </header>
  );
};

export default NavBar;
