import React from "react";
import { Link } from "react-router-dom";
import { Spinner } from "./Spinner";
import { useAuthStore } from "../../store/useAuthStore";
import { useBookingStore } from "../../store/useBookingStore";
import { useNewAuthStore } from "../../store/useNewAuthStore";

export const CustomButton = ({
  url,
  buttonName,
  icon,
  type,
  style,
  onClick,
  textStyle,
}) => {
  // const { isSigningup, isSigningin, isUpdatingAccount } = useAuthStore();
  const { isSigningup, isSigningin, isUpdatingAccount } = useNewAuthStore();
  const { isCreatingBooking, isCancelBooking } = useBookingStore();

  const primaryButton = (
    <Link
      to={url && url}
      className={`flex gap-1 justify-center items-center bg-[#0c0b22] border-none text-white rounded-xl btn btn-primary shadow-md drop-shadow-md ${style}`}
      onClick={onClick}
      type="button"
    >
      <div className="text-sm">{buttonName}</div>
      {icon && <span>{icon}</span>}
    </Link>
  );

  const secondaryButton = (
    <Link
      to={url && url}
      className={`flex gap-1 justify-center items-center bg-accent-color border-none text-white rounded-xl btn btn-primary shadow-md drop-shadow-md ${style}`}
      onClick={onClick}
      type="button"
    >
      <div className={`text-sm ${textStyle}`}>{buttonName}</div>
      {icon && <span>{icon}</span>}
    </Link>
  );

  const submitButton = (
    <button
      className={`flex gap-1 justify-center items-center bg-accent-color border-none text-white rounded-xl btn btn-primary shadow-md drop-shadow-md ${style}`}
      onClick={onClick}
      type="submit"
    >
      {isSigningin ||
      isSigningup ||
      isUpdatingAccount ||
      isCreatingBooking ||
      isCancelBooking ? (
        <Spinner />
      ) : (
        <div className="w-full flex justify-center items-center">
          <div className={`text-sm ${textStyle}`}>{buttonName}</div>
          <span>{icon}</span>
        </div>
      )}
    </button>
  );

  return (
    <>
      {type === "primaryButton" && primaryButton}
      {type === "secondaryButton" && secondaryButton}
      {type === "submitButton" && submitButton}
    </>
  );
};
