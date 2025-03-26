import { CircleAlert } from "lucide-react";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { InformationCard } from "../components/Payment/InformationCard";
import { PaymentCard } from "../components/Payment/PaymentCard";
import { CancelPolicy } from "../components/Reservation/CancelPolicy";
import { SummaryCard } from "../components/Payment/SummaryCard";

export const PaymentPage = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvc: "",
  });
  return (
    <div className="py-8 sm:w-5/6 w-auto sm:px-0 px-3 flex justify-center items-center gap-7 mx-auto">
      <div className="w-full h-auto flex justify-start items-start flex-col gap-3">
        <div className="w-full h-auto flex gap-2 sm:flex-row flex-col">
          <motion.div
            className="sm:w-4/6 flex flex-col gap-3"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-accent-color sm:text-3xl text-xl font-bold drop-shadow-xl">
              Check Out
            </h1>
            <div className="bg-orange-100 w-full rounded-lg p-3 flex gap-2 justify-start items-center border border-base-content/10 shadow-md">
              <span className="bg-orange-300/50 p-1 rounded-full">
                <CircleAlert className="text-orange-400" />
              </span>
              <p className="sm:text-base text-sm font-semibold">
                Your Booking is on Hold
              </p>
            </div>
            <InformationCard />
            <PaymentCard setFormData={setFormData} formData={formData} />
            <CancelPolicy />
          </motion.div>
          <SummaryCard formData={formData} />
        </div>
      </div>
    </div>
  );
};
