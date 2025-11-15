import { Bell, Grid, Home, Search, ShoppingCart, User } from "lucide-react";
import React from "react";
import { NavLink } from "./NavLink";

const bottomNavigation = [
  {
    id: 1,
    name: "Home",
    href: "/",
    icon: <Home size={20} />,
  },
  {
    id: 2,
    name: "Categories",
    href: "/categories",
    icon: <Grid size={20} />,
  },
  {
    id: 3,
    name: "Search",
    href: "/search",
    icon: <Search size={20} />,
  },
   {
    id: 8,
    name: "Notifications",
    href: '/notifications',
    icon: <Bell size={20} />
  },
  {
    id: 5,
    name: "Profile",
    href: "/profile",
    icon: <User size={20} />,
  },
];

const BottomNav = () => {
  return (
    <div className="bottom-nav">
      {bottomNavigation.map(({ id, name, href, icon }) => (
        <NavLink
          href={href}
          key={id}
          className="flex flex-col items-center gap-1 text-small"
          activeClassName="text-primary"
        >
          {icon}
        </NavLink>
      ))}
    </div>
  );
};

export default BottomNav;
