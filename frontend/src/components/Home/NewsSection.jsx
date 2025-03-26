import React from "react";
import { ArrowRight, Award, ChartNoAxesCombined, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Carousel from "../UI/Carousel";
import { CustomButton } from "../UI/CustomButton";

export const NewsSection = () => {
  return (
    <motion.div
      className="flex w-auto bg-white h-auto rounded-lg shadow-lg p-5 gap-8 flex-col sm:flex-row border border-base-content/10 "
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="sm:w-[40%] w-full flex justify-center items-center sm:order-1 order-2">
        <Carousel />
      </div>
      <div className="sm:w-3/6 w-full sm:flex-row flex-col justify-start items-start gap-3 sm:order-2 order-1">
        <h1 className="text-accent-color text-2xl font-bold">
          The Legends Golf Championship Awaits!
        </h1>
        <p className="text-sm text-justify mt-2">
          Get ready to tee off in our Legends Golf Championship Tournament!
          Compete against players of all skill levels in an exciting,
          action-packed competition. Whether you're a seasoned pro or a weekend
          warrior, this tournament is your chance to show off your golfing
          skills. Play through custom-designed courses, take on daily
          challenges, and earn rewards for your performance.
        </p>
        <div className="flex flex-col gap-2 justify-start items-start mt-3">
          <span className="flex justify-center items-center gap-1">
            <Award className=" p-1 size-7 rounded-full text-accent-color bg-gray-200" />
            <p className="text-sm ">
              Best Score, Longest Drive, Closest to the Pin, and More
            </p>
          </span>
          <span className="flex justify-center items-center gap-1">
            <Zap className=" p-1 size-7 rounded-full text-accent-color bg-gray-200" />
            <p className="text-sm ">
              Win in-game items, badges, and real-world prizes!
            </p>
          </span>
          <span className="flex justify-center items-center gap-1">
            <ChartNoAxesCombined className=" p-1 size-7 rounded-full text-accent-color bg-gray-200 " />
            <p className="text-sm ">
              Sign up and play at your convenience through our online booking
              system.
            </p>
          </span>

          <CustomButton
            buttonName="More Details"
            icon={<ArrowRight className="size-5" />}
            url="/tournament"
            type="secondaryButton"
          />
        </div>
      </div>
    </motion.div>
  );
};
