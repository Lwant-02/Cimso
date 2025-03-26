import React from "react";
import { motion } from "framer-motion";
import { Footer } from "../components/UI/Footer";
import { aboutImages } from "../utils/constant";

export const AboutPage = () => {
  return (
    <>
      <div className="py-8 sm:w-5/6 w-auto sm:px-0 px-3 flex flex-col justify-center items-center gap-7 mx-auto">
        <div className=" w-full h-auto flex justify-center items-center sm:flex-row flex-col gap-3">
          <div className="sm:w-1/2 p-3 flex flex-col gap-3">
            <motion.div
              className="flex flex-col justify-start items-start gap-2"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <h1 className="text-accent-color sm:text-5xl text-xl font-bold drop-shadow-xl">
                Passion for Golf, Excellence in Service
              </h1>
              <p className="text-accent-color/70 text-base mt-2 font-bold text-justify">
                Welcome to Cimso Online Golf Booking, your ultimate destination
                for all things golf. Whether you're a beginner, a weekend
                warrior, or a seasoned pro, we are dedicated to providing you
                with the best golf equipment, expert advice, and an unmatched
                shopping experience.
              </p>
            </motion.div>
            <motion.div
              className="flex flex-col justify-start items-start gap-2"
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h2 className="text-accent-color sm:text-5xl text-xl font-bold drop-shadow-xl">
                Our Mission
              </h2>
              <p className="text-accent-color/70 text-base mt-2 font-bold text-justify">
                At Cimso Online Golf Booking, we believe that golf is more than
                just a game—it’s a passion, a lifestyle, and a journey toward
                improvement. Our mission is to bring high-quality golf products,
                innovative technology, and professional insights to players of
                all levels, helping them perform their best on the course.
              </p>
            </motion.div>
          </div>
          <motion.div
            className="flex-1 flex"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className=" w-1/2 flex flex-col gap-3 p-2">
              <img src={aboutImages.image1} alt="Logo" />
              <img src={aboutImages.image5} alt="Logo" />
            </div>
            <div className="flex-1 flex flex-col gap-3 p-2">
              <img src={aboutImages.image3} alt="Logo" />
              <img src={aboutImages.image4} alt="Logo" />
            </div>
          </motion.div>
        </div>
        <div className=" w-full h-auto flex justify-center items-center sm:flex-row flex-col gap-3">
          <motion.div
            className="flex-1 sm:order-1 order-2"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            <div className="flex p-2">
              <img src={aboutImages.image2} alt="Logo" />
            </div>
          </motion.div>
          <motion.div
            className="sm:w-1/2 p-3 flex flex-col gap-2 sm:order-2 order-1"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="flex flex-col justify-start items-start gap-3">
              <h1 className="text-accent-color sm:text-5xl text-xl font-bold drop-shadow-xl">
                Join Our Golf Community
              </h1>
              <p className="text-accent-color/70 text-base mt-2 font-bold text-justify">
                At Cimso Online Golf Booking, we don’t just sell golf gear—we
                build a community of golf lovers. Follow us for tips, product
                updates, and exclusive deals. Let's take your game to the next
                level! Play Better. Swing Smarter. Enjoy Golf.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <Footer />
    </>
  );
};
