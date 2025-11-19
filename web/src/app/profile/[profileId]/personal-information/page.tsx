"use client";
import React, { useState } from "react";
import { useAuthStore } from "../../../../../store/useAuthStore";
import Spinner from "../../../../../components/ui/spinner";
import Image from "next/image";
import Link from "next/link";
import { Pencil } from "lucide-react";
import Warning from "../../../../../components/ui/warning";
import { Button } from "@/components/ui/button";
import "react-phone-input-2/lib/style.css";
import PhoneInput from "react-phone-input-2";
import MessageModal from "../../../../../components/ui/modal";

const PersonalInformation = () => {
  const { user, isLoading, error, updateUserProfile } = useAuthStore();
  const [profileUser, setProfileUser] = useState<any>({
    name: user?.name,
    email: user?.email,
    phone: user?.phone,
    country: user?.country,
  });
  const [buttonClicked, setButtonClicked] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  if (isLoading) {
    return <Spinner />;
  }

  // Save changes handler
  const handleSaveChanges = async () => {
    await updateUserProfile(
      user!._id,
      profileUser.name,
      profileUser.email,
      profileUser.phone,
      profileUser.country
    );

    if (user) {
      setModalOpen(true);
    }

    setButtonClicked(false);
    console.log("Saved user information:", profileUser);
  };

  return (
    <section className="p-5 w-full ">
      {modalOpen === true && (
        <MessageModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          title="Profile Updated"
          message="Your profile information has been successfully updated."
          variant="success"
        />
      )}
      <h3 className="profile-heading">Personal Information</h3>
      {user?.isEmailVerified === false && (
        <Warning
          message="  Your email is not verified. Please verify your email to access all
        features."
        />
      )}
      <div className="py-5 w-fit h-fit relative">
        <Image
          src={user?.avatar! || "/default-profile.png"}
          alt={user?.name + "'s profile image"}
          className="border border-muted rounded-full object-contain"
          width={150}
          height={200}
          loading="eager"
        />
        <Link
          href={""}
          className="text-x-small flex items-center gap-2 w-fit p-2 ml-5 cursor-pointer rounded-full text-primary bg-white font-open-sans absolute bottom-1 right-0 hover:shadow-md transition duration-200 ease-in z-40"
        >
          <Pencil size={10} /> Edit avatar
        </Link>
      </div>
      <div className="p-3">
        <p className="font-open-sans font-semibold text-small py-2">Name</p>
        <input
          type="text"
          value={buttonClicked ? profileUser.name : user?.name}
          onChange={(e) =>
            setProfileUser({ ...profileUser, name: e.target.value })
          }
          className="p-2 text-small w-md bg-muted border border-gray-200 rounded-md text-gray-500"
        />
        <p className="font-open-sans font-semibold text-small mt-3 py-2">
          Email
        </p>
        <input
          type="text"
          value={buttonClicked ? profileUser.email : user?.email}
          onChange={(e) =>
            setProfileUser({ ...profileUser, email: e.target.value })
          }
          className="p-2 text-small w-md bg-muted border border-gray-200 rounded-md text-gray-500"
        />
        <p className="font-open-sans font-semibold text-small mt-3 py-2">
          Phone Number
        </p>
        {/* <input
          type="text"
          value={
            buttonClicked ? profileUser.phone : user?.phone! || "Not provided"
          }
          onChange={(e) =>
            setProfileUser({ ...profileUser, phone: e.target.value })
          }
          className="p-2 text-small w-md bg-muted border border-gray-200 rounded-md text-gray-500"
        /> */}
        <PhoneInput
          country={user?.country || "us"}
          countryCodeEditable={false}
          disableDropdown={!buttonClicked}
          placeholder="Enter phone number"
          value={buttonClicked ? profileUser.phone : user?.phone || ""}
          onChange={(phone, country) =>
            setProfileUser({
              ...profileUser,
              phone,
              country:
                "countryCode" in country
                  ? country.countryCode.toLowerCase()
                  : profileUser.country || "us",
            })
          }
          inputClass="!w-md !p-2 !px-13 !text-small !bg-muted !border !border-gray-200 !rounded-md !text-gray-500"
        />
      </div>
      <div className="w-fit flex items-center gap-2 px-3 mt-6">
        <Button
          className="flex items-center gap-2 font-open-sans font-semibold cursor-pointer"
          onClick={() => setButtonClicked(!buttonClicked)}
        >
          <Pencil size={16} />
          Edit Information
        </Button>
        {buttonClicked && (
          <Button
            className="flex items-center bg-success border border-success gap-2 font-open-sans font-semibold hover:bg-transparent hover:text-success transition duration-300 ease-in cursor-pointer"
            onClick={handleSaveChanges}
          >
            {isLoading ? "Saving..." : "Save Changes"}
          </Button>
        )}
        {buttonClicked && (
          <Button
            className="flex items-center bg-transparent gap-2 font-open-sans font-semibold text-error hover:bg-error/5  transition duration-300 ease-in cursor-pointer"
            onClick={() => setButtonClicked(false)}
          >
            {isLoading ? "Canceling..." : "Cancel Changes"}
          </Button>
        )}
      </div>
    </section>
  );
};

export default PersonalInformation;
