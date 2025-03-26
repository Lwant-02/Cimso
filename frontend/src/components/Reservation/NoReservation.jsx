import React from "react";
import { motion } from "framer-motion";
import { CustomButton } from "../UI/CustomButton";
import { useUtilsStore } from "../../store/useUtilsStore";

export const NoReservation = () => {
  const { setActiveTab } = useUtilsStore();
  return (
    <motion.div
      className="sm:w-4/6 w-full p-3 bg-white rounded-lg border border-base-content/10 shadow-lg flex flex-col justify-center items-center gap-3"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h3 className=" sm:text-2xl font-bold drop-shadow-xl flex justify-center items-center">
        Booking Not Found
      </h3>
      <p className="font-semibold sm:text-sm text-xs flex justify-center items-center text-center">
        You don't have any booking yet! Please make a reservation to see it
        here.
      </p>
      <CustomButton
        buttonName="Book Now"
        url="/courses"
        type="secondaryButton"
        onClick={() => setActiveTab("courses")}
      />
    </motion.div>
  );
};
