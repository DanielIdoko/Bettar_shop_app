import React from "react";
import { headlineFeatures } from "../constants";

const InfoBar = () => {
  return (
    <div className="infobar">
      <div className="flex-1 w-fit h-full">
        <select
          name="shipping locations"
          id="shipping-locations"
          className="shipping-location-select"
        >
          {/* Icon here */}
          <option value="Accra" defaultValue={"Accra"}>
            Ship to Accra
          </option>
          <option value="USA">Ship to USA</option>
          <option value="UK">Ship to UK</option>
        </select>
      </div>

      <div className="headline-features">
        {headlineFeatures.map(({ id, icon, text }) => (
          <span key={id}>
            {icon}
            {text}
          </span>
        ))}
      </div>
    </div>
  );
};

export default InfoBar;
