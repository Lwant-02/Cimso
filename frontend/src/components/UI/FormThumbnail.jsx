import React from "react";
import { motion } from "framer-motion";
import { CustomButton } from "./CustomButton";
import { MainLogo } from "../../utils/constant";
import { useUtilsStore } from "../../store/useUtilsStore";

export const FormThumbnail = ({ title, subTitle }) => {
  const { setActiveTab } = useUtilsStore();
  return (
    <motion.div
      className="flex flex-col justify-center items-center sm:w-1/2 w-full gap-2 h-auto"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-2xl mt-2 font-bold font-poppin">
        <img src={MainLogo} alt="Logo" />
      </div>
      <p className="text-primary-color sm:text-4xl text-xl mt-2 font-bold ">
        {title}
      </p>
      <p className="text-base text-primary-color/80">{subTitle}</p>
      <CustomButton
        buttonName="Back To Home"
        url="/"
        type="secondaryButton"
        onClick={() => setActiveTab("home")}
      />
    </motion.div>
  );
};
