import React from "react";

export const LocationPart = ({ city, country, style }) => {
  return (
    <div className={`breadcrumbs ${style ? style : "text-sm"}`}>
      <ul>
        <li>{city}</li>
        <li>{country}</li>
      </ul>
    </div>
  );
};
