import React from "react";
import { motion } from "framer-motion";
import { Rating } from "./Rating";

export const ReviewCard = ({ delay, rating, name, pic, comment, day }) => {
  return (
    <motion.div
      className="card sm:card-sm card-xs sm:w-72 w-auto sm:p-0 p-2 bg-base-100  shadow-lg cursor-pointer "
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: delay }}
      viewport={{ once: true }}
    >
      <div className="card-body gap-3 ">
        <p className="text-xs opacity-50">{day}</p>
        <div className="flex justify-center items-center w-full gap-4">
          <div className="avatar">
            <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2">
              <img src={pic} alt={name} />
            </div>
          </div>
          <div className="flex justify-start items-center w-full ">
            <Rating
              styles="flex justify-center items-center "
              rating={rating}
            />
          </div>
        </div>

        <h2 className="card-title sm:text-base text-sm">{name}</h2>
        <p className="sm:text-sm text-xs text-justify">{comment}</p>
      </div>
    </motion.div>
  );
};
