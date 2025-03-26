import { CircleAlert } from "lucide-react";
import React from "react";

export const CancelPolicy = () => {
  return (
    <div className="w-full bg-white mt-2 rounded-lg p-3 border border-base-content/10 ">
      <span className="flex justify-start items-center gap-2">
        <p className="sm:text-lg text-sm font-bold drop-shadow-xl text-accent-color">
          Cancellation policy
        </p>
        <span className="bg-orange-300/50 p-1 rounded-full">
          <CircleAlert className="text-orange-400" />
        </span>
      </span>
      <p className="sm:text-sm text-xs font-semibold text-justify">
        Cancel for free anytime in advance, otherwise you will be charged 100%
        of the service price for not showing up.
      </p>
    </div>
  );
};
