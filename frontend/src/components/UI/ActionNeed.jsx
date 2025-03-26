import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import React from "react";
import { motion } from "framer-motion";
import { CustomButton } from "./CustomButton";
import { ArrowRight } from "lucide-react";

export const ActionNeed = () => {
  return (
    <motion.div
      className="flex flex-col justify-center items-center w-full"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <DotLottieReact
        src="https://lottie.host/12901a40-b5f3-49ec-824c-30706ee8cf66/FUsS9RV6iq.lottie"
        loop
        autoplay
      />
      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="sm:text-3xl text-xl font-semibold">Unlock Features</h1>
        <p className="sm:text-xl text-sm font-semibold">
          You need to sign in first to see your reservations!
        </p>
        <CustomButton
          buttonName="Sign In"
          icon={<ArrowRight />}
          type="secondaryButton"
          url="/signin"
        />
      </div>
    </motion.div>
  );
};
