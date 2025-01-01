"use client";
import React, { useEffect } from "react";
import ProfileSidebar from "../../../../components/ProfileSidebar";
import Spinner from "../../../../components/ui/spinner";
import { useAuthStore } from "../../../../store/useAuthStore";

const ProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { fetchAuthenticatedUser, user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!user) fetchAuthenticatedUser();
  }, [user, fetchAuthenticatedUser]);

  if (isLoading) return <Spinner />;
  return (
    <section className="w-full h-full flex">
      <ProfileSidebar />
      {children}
    </section>
  );
};

export default ProfileLayout;
