import { Star } from "lucide-react";
import React from "react";

export const Rating = ({ styles, rating }) => {
  return (
    <div className={` ${styles} flex justify-start items-center gap-2 `}>
      <Star className="size-4 text-accent-color" />
      <p className="sm:text-sm text-xs ">{rating} Reviews</p>
    </div>
  );
};
