import React from "react";

export const Divider = ({ name, textStyle }) => {
  return (
    <div className="divider divider-neutral ">
      <p className={textStyle}>{name}</p>
    </div>
  );
};
