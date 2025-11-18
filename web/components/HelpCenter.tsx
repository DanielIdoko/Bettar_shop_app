import React from "react";
import { helpOptions } from "../constants";

const HelpCenter = () => {
  return (
    <section className="help-center">
      <div className="w-fit h-full md:flex-1">
        <h4 className="font-semibold font-open-sans text-small">We're always here to help</h4>
        <p className="text-small text-gray-400">You can get help by choosing any of these options</p>
      </div>

      <div className="w-fit h-full flex gap-3 items-center flex-wrap font-open-sans">
        {helpOptions.map((option) => (
          <div key={option.id} className="flex h-full p-1 items-center gap-3"> 
            {option.icon}
            <div className="h-full">
              <h5 className="text-gray-400 text-x-small">{option.title}</h5>
              <p className="text-dark text-small font-semibold">{option.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HelpCenter;
