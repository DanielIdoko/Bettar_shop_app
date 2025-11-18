'use client'
import { useLinkStatus } from "next/link";
import React from "react";

const Spinner = () => {
  const { pending } = useLinkStatus();
  return (
    <div className="w-full h-fit p-5 flex flex-col items-center gap-4">
      <span className="loader"></span>
      {pending && <p className="text-small text-center">Loading...</p>}
    </div>
  );
};

export default Spinner;
