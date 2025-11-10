"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils"; 

type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  activeClassName?: string;
  className?: string;
};

export const NavLink = ({
  href,
  children,
  activeClassName,
  className,
}: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "transition-colors duration-200",
        className,
        isActive && activeClassName
      )}
    >
      {children}
    </Link>
  );
};
