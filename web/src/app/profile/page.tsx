"use client";
import React, { useEffect } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import Spinner from "../../../components/ui/spinner";

const Profile = () => {
  const { fetchAuthenticatedUser, user, isLoading } = useAuthStore();

  useEffect(() => {
    if (!user) fetchAuthenticatedUser();
  }, [user, fetchAuthenticatedUser]);

  if (isLoading) return <Spinner />;
  return <div>Profile</div>;
};

export default Profile;
