'use client';
import React from "react";
import { bottomProfileSidebarLinks, profileSidebarLinks } from "../constants";
import Link from "next/link";
import { NavLink } from "./NavLink";
import { LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ProfileSidebar = () => {
  const { user } = useAuthStore();

  if (!user) return null;

  return (
    <aside className="profile-sidebar">
      <nav className="w-full h-[70%] flex flex-col py-7 gap-4">
        {profileSidebarLinks.map(({ url, title, icon, id }) => (
          <NavLink
            href={`/profile/${user._id}${url}`}
            key={id}
            className="profile-sidebar-link"
            activeClassName="bg-muted font-semibold text-gray-600"
          >
            {icon}
            {title}
          </NavLink>
        ))}
      </nav>
      <nav className="w-full h-fit py-1">
        {bottomProfileSidebarLinks.map(({ url, title, icon, color, id }) => (
          <NavLink
            href={`/profile/${user._id}${url}`}
            key={id}
            className="profile-sidebar-link"
            activeClassName="bg-muted font-semibold text-gray-600"
          >
            {icon}
            {title}
          </NavLink>
        ))}
        <Link
          href={`/profile/${user._id}/logout`}
          className="text-error flex p-2 items-center gap-3 text-small cursor-pointer"
        >
          <LogOut size={16} /> Logout
        </Link>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;
