import React from "react";
import { useNavigate } from "react-router-dom";
import { useUtilsStore } from "../../store/useUtilsStore";
// import { useAuthStore } from "../../store/useAuthStore";
import { useNewAuthStore } from "../../store/useNewAuthStore";

export const AuthIcon = () => {
  // const { authUser } = useAuthStore();
  const { authUser } = useNewAuthStore();
  const { closeDrawer } = useUtilsStore();
  const navigate = useNavigate();

  const defaultUrl =
    "https://res.cloudinary.com/dt28nxrrx/image/upload/v1738487430/vector-flat-illustration-grayscale-avatar-600nw-2264922221_vltchf.webp";

  return (
    <div className="gap-3 flex justify-center items-center">
      <div
        className="avatar cursor-pointer tooltip tooltip-bottom  flex sm:flex-row flex-col items-center justify-center gap-2"
        onClick={() => {
          navigate(`/profile/${authUser.full_name}`);
          closeDrawer();
        }}
        data-tip={authUser.full_name}
      >
        <div className="ring-primary ring-offset-base-100 sm:w-12 w-20 rounded-full ring ring-offset-2 sm:order-2 order-1">
          <img
            src={authUser.profile_pic || defaultUrl}
            alt={authUser.full_name}
          />
        </div>
        <p className="text-lg font-semibold sm:hidden flex sm:order-1 order-2">
          {authUser.full_name}
        </p>
      </div>
    </div>
  );
};
