import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useUtilsStore } from "../../store/useUtilsStore";

export const FeatureCourseCard = ({ delay, name, description, image }) => {
  const { setActiveTab } = useUtilsStore();
  const navigate = useNavigate();
  return (
    <button
      className="flex justify-center items-center hover:scale-105 transition-transform duration-300 "
      onClick={() => {
        navigate("/courses");
        setActiveTab("courses");
      }}
    >
      <motion.div
        className="cursor-pointer card sm:card-sm card-xs p-1  bg-base-100  sm:h-[370px] h-80 w-80 shadow-md "
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: delay }}
        viewport={{ once: true, amount: 0.1 }}
      >
        <figure className="w-full h-[180px] overflow-hidden  flex justify-center items-center">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </figure>

        <div className="card-body">
          <h2 className="card-title sm:text-base text-sm ">{name}</h2>
          <p className="sm:text-sm text-xs text-justify">{description}</p>
        </div>
      </motion.div>
    </button>
  );
};
