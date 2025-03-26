import React from "react";
import { reviewers } from "../../utils/constant";

export const AvatarGroup = () => {
  return (
    <div className="avatar-group -space-x-2">
      {reviewers.map((reviewer, index) => (
        <div className="avatar border-none" key={index}>
          <div className="w-6 h-6">
            <img src={reviewer.picture} alt={reviewer.name} />
          </div>
        </div>
      ))}
      <div className="avatar avatar-placeholder border-none">
        <div className="bg-neutral text-neutral-content w-6 h-6">
          <span className="text-xs">+99</span>
        </div>
      </div>
    </div>
  );
};
