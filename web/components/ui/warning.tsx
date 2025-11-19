import React from "react";

const Warning = ({ message }: { message: string }) => {
  return (
    <div
      className="bg-yellow-100 border border-yellow-200 rounded-md text-yellow-700 p-4 my-5"
      role="alert"
    >
      <p className="font-open-sans text-small">{message}</p>
    </div>
  );
};

export default Warning;
