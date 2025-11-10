import { ArrowDown } from "lucide-react";
import Image from "next/image";
import React from "react";

type ProfileIcon = {
  avatar_url?: string;
  username?: string;
};

const ProfileIcon = ({ avatar_url, username }: ProfileIcon) => {
  return (
    <div className="profileicon">
      <Image src={avatar_url!} alt={`avatar of ${username}`} />
      <div className="h-full w-fit">
        <p className="text-x-small text-gray-400">Welcome Back</p>
        <p className="text-small text-dark font-open-sans font-bold">{username}</p>
      </div>
      <div className="w-fit h-full p-1 flex items-center">
        <ArrowDown size={28} className="rounded-full p-1 cursor-pointer hover:bg-muted transition duration-300 ease-in"/>
      </div>
    </div>
  );
};

export default ProfileIcon;
