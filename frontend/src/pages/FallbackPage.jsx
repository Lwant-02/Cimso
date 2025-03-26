import React from "react";
import { CustomNotFound } from "../components/UI/CustomNotFound";
import { ArrowRight } from "lucide-react";

export const FallbackPage = () => {
  return (
    <div className="py-8 sm:w-5/6 h-full w-auto sm:px-0 px-3 flex flex-col justify-center items-center gap-7 mx-auto">
      <div className=" w-full h-auto flex justify-center items-center flex-col gap-3 p-5 ">
        <CustomNotFound
          type="page"
          title="Page Not Found"
          buttonName="Go Back"
          buttonIcon={<ArrowRight />}
          url="/"
        />
      </div>
    </div>
  );
};
