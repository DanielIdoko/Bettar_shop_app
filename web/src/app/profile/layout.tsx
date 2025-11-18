import React from "react";
import ProfileSidebar from "../../../components/ProfileSidebar";

const ProfileLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <section className="w-full h-full flex">
      <ProfileSidebar />
      {children}
    </section>
  );
};

export default ProfileLayout;
