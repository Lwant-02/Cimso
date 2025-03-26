import { Loader } from "lucide-react";
import React from "react";

export const Spinner = ({ size }) => {
  return (
    <div className="w-full flex justify-center items-center">
      <Loader className={`animate-spin ${size}`} />
    </div>
  );
};
