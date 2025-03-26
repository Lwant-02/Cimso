import React from "react";
import { motion } from "framer-motion";
import { useUtilsStore } from "../../store/useUtilsStore";
import { CustomButton } from "../UI/CustomButton";

export const CancelNotFound = () => {
  const { setActiveTab } = useUtilsStore();
  return (
    <motion.div
      className="sm:w-4/6 w-full p-3 bg-white rounded-lg border border-base-content/10 shadow-lg flex flex-col justify-center items-center gap-3"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <h3 className=" sm:text-2xl font-bold drop-shadow-xl flex justify-center items-center">
        Cancel Booking Not Found
      </h3>
      <p className="font-semibold sm:text-sm text-xs flex justify-center items-center">
        You don't have any cancelled bookings.
      </p>
      <CustomButton
        buttonName="Book Now"
        url="/booking"
        type="secondaryButton"
        onClick={() => setActiveTab("booking")}
      />
    </motion.div>
  );
};
