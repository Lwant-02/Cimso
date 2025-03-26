import React from "react";
import { motion } from "framer-motion";
import { SinginFrom } from "../components/signin/SinginFrom";
import { FormThumbnail } from "../components/UI/FormThumbnail";
import { images } from "../utils/constant";

export const SingInPage = () => {
  return (
    <div className="relative w-full min-h-screen flex-1 overflow-auto overflow-y-auto justify-center items-center flex flex-col">
      <div
        className="relative w-full min-h-screen bg-cover bg-center bg-red-500"
        style={{ backgroundImage: `url(${images.formLogo})` }}
      >
        <div className="absolute inset-0 bg-black opacity-50" />
        <div className="relative z-10 flex sm:flex-row flex-col items-center justify-center text-center h-full px-6 w-full gap-3 mt-12">
          <FormThumbnail
            subTitle="Log in to access your personalized golf insights, real-time coaching tips, and exclusive course recommendations."
            title="Welcome Back to the Ultimate Golf Experience!"
          />
          <motion.div
            className="sm:w-2/6 w-full sm:mb-0 mb-5 bg-white h-auto p-8 rounded-xl shadow-lg flex flex-col justify-center items-center gap-5"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex flex-col w-full h-auto justify-start items-start">
              <p className="capitalize text-sm font-semibold">WELCOME BACK</p>
              <h1 className="text-lg sm:text-2xl font-bold drop-shadow-xl text-accent-color">
                Login To Your Account
              </h1>
            </div>
            <SinginFrom />
          </motion.div>
        </div>
      </div>
    </div>
  );
};
