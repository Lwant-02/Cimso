import React from "react";
import { Link } from "react-router-dom";

export const FormLink = ({ link, status, statusName }) => {
  return (
    <Link className="mt-4 flex justify-center items-center w-full" to={link}>
      <p className="text-sm">{status}</p>
      <p className="text-sm text-accent-color underline ">{statusName}</p>
    </Link>
  );
};
