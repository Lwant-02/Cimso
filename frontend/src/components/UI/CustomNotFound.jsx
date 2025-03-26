import React from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { CustomButton } from "./CustomButton";

export const CustomNotFound = ({
  type,
  title,
  buttonIcon,
  url,
  buttonName,
}) => {
  const pageNotFound = (
    <DotLottieReact
      src="https://lottie.host/fc958ff8-e2e2-4cd9-9e52-9c56d67e7dcc/PDvQCiooc6.lottie"
      loop
      autoplay
      style={{ width: "450px", height: "450px" }}
    />
  );

  const dataNotFound = (
    <DotLottieReact
      src="https://lottie.host/6a67160a-89c6-4053-a40a-fd1169499156/DbruH4z0Re.lottie"
      loop
      autoplay
    />
  );
  return (
    <motion.div
      className="sm:w-4/6 w-full flex flex-col justify-center items-center gap-2 "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex justify-center items-center gap-3 flex-col">
        {type === "page" && pageNotFound}
        {type === "data" && dataNotFound}
      </div>
      <h1 className="text-accent-color sm:text-xl text-lg font-bold drop-shadow-xl w-full sm:w-4/6 flex justify-center items-center">
        {title}
      </h1>
      {type === "page" && (
        <CustomButton buttonName={buttonName} url={url} icon={buttonIcon} />
      )}
    </motion.div>
  );
};
