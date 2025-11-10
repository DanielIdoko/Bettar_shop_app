import React from "react";

const Spinner = () => {
  return (
    <div className="w-full h-fit p-5 flex flex-col items-center gap-4">
      <span className="loader"></span>
      <p className="text-md text-primary-lighter font-semibold">Loading</p>
    </div>
  );
};

export default Spinner;
