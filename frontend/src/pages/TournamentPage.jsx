import React, { useState } from "react";
import { motion } from "framer-motion";
import { tournamentsImages } from "../utils/constant";
import { LocationPart } from "../components/UI/LocationPart";
import { ArrowLeft, CalendarDays, MapPin, Timer } from "lucide-react";
import { AvatarGroup } from "../components/UI/AvatarGroup";
import { CustomButton } from "../components/UI/CustomButton";
import { useUtilsStore } from "../store/useUtilsStore";
import { useNavigate } from "react-router-dom";
import { TournamentFormModal } from "../components/UI/TournamentFormModal";
import { CustomStatus } from "../components/UI/CustomStatus";
import TournamentCarousel from "../components/UI/TournamentCarousel";
// import { useAuthStore } from "../store/useAuthStore";
import { useNewAuthStore } from "../store/useNewAuthStore";

export const TournamentPage = () => {
  // const { authUser } = useAuthStore();
  const { authUser } = useNewAuthStore();
  const { setActiveTab } = useUtilsStore();
  const navigate = useNavigate();

  return (
    <div className="relative mx-auto flex-1 overflow-auto overflow-y-auto justify-center items-center flex flex-col sm:w-5/6 w-auto pb-7">
      <motion.div
        className="relative w-full sm:h-[40vh] h-[30vh] bg-cover bg-center "
        style={{ backgroundImage: `url(${tournamentsImages.mainLogo})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="p-5">
          <button
            className={`flex size-9 gap-1 rounded-full justify-center items-center bg-accent-color border-none text-white btn btn-primary shadow-2xl drop-shadow-lg p-1`}
            onClick={() => {
              navigate(-1);
              setActiveTab("home");
            }}
            type="button"
          >
            <ArrowLeft className="sm:size-6 size-5" />
          </button>
        </div>
      </motion.div>
      <motion.div
        className="w-full py-3 flex sm:flex-row flex-col justify-between items-start sm:gap-0 gap-2 sm:px-0 px-2"
        animate={{ opacity: 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <div className="sm:px-0 px-1 w-1/2 items-start flex flex-col gap-2 sm:order-1 order-2">
          <div className="flex gap-1 justify-center items-center">
            <MapPin className="sm:size-5 size-4" />
            <LocationPart
              city="PathumThani"
              country="Thailand"
              style="sm:text-sm text-xs text-accent-color font-bold"
            />
          </div>
          <div className="flex gap-1 justify-center items-center mb-1">
            <Timer className="sm:size-5 size-4" />
            <p className="sm:text-sm text-xs text-accent-color font-bold">
              13:00-18:00 PM
            </p>
          </div>
          <div className="flex gap-1 justify-center items-center">
            <CalendarDays className="sm:size-5 size-4" />
            <p className="sm:text-sm text-xs text-accent-color font-bold">
              23 April, 2025
            </p>
          </div>
        </div>
        <div className=" flex-1 items-center flex justify-end sm:px-0 px-1 h-full gap-1 sm:order-2 order-1">
          <AvatarGroup />
          <p className="sm:text-sm text-xs text-accent-color font-bold">
            Attendees confirmed!
          </p>
        </div>
      </motion.div>
      <motion.div
        className="w-full h-auto flex flex-col justify-center mt-3 items-start gap-4 sm:px-0 px-3"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
      >
        <h1 className="sm:text-5xl text-2xl font-bold drop-shadow-xl">
          <span className="text-accent-color">Legends Golf Championship </span>–
          The Ultimate Golfing Challenge
        </h1>
        <p className=" text-base mt-2 font-bold text-justify">
          The{" "}
          <span className="text-accent-color">Legends Golf Championship</span>{" "}
          is where precision meets passion. Set against the stunning backdrop of
          Legends Golf Championship, this tournament brings together the finest
          golfers from around the world to compete for the ultimate title.
          Whether you're a seasoned professional or an enthusiastic fan, this is
          an event you won’t want to miss!
        </p>
        {authUser ? (
          <CustomButton
            buttonName="Register Now"
            type="secondaryButton"
            onClick={() => {
              document.getElementById("tournament_modal").showModal();
            }}
          />
        ) : (
          <CustomButton
            buttonName="Sign In To Continue"
            url="/signin"
            type="secondaryButton"
          />
        )}
      </motion.div>
      <motion.div
        className="w-full h-auto  mt-4  sm:px-0 px-3 flex flex-col"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <h3 className=" text-xl font-bold mb-5">Tournament Highlights</h3>
        <div className="w-full h-full flex sm:flex-row flex-col justify-between items-start sm:gap-0 gap-4">
          <div className="flex flex-col justify-start items-start gap-4 flex-1 sm:order-1 order-2">
            <div className="flex justify-start sm:items-center items-start gap-2">
              <span className="text-lg">🌟</span>
              <p className=" text-base text-accent-color font-bold ">
                World-Class Course: Play on the breathtaking Legends Golf
                Championship.
              </p>
            </div>
            <div className="flex justify-start sm:items-center items-start gap-2">
              <span className="text-lg">🏆</span>
              <p className=" text-base text-accent-color font-bold ">
                Elite Competition: Compete against top-tier players.
              </p>
            </div>
            <div className="flex justify-start sm:items-center items-start gap-2">
              <span className="text-lg">💰</span>
              <p className=" text-base text-accent-color font-bold ">
                Big Rewards: Prize pool of 50000 THB
              </p>
            </div>
            <div className="flex justify-start sm:items-center items-start gap-2">
              <span className="text-lg">🎉</span>
              <p className=" text-base text-accent-color font-bold ">
                Fan Experience: Interactive zones, food stalls, and live
                entertainment
              </p>
            </div>
          </div>
          <div className="sm:w-1/2 w-full flex justify-center items-center sm:order-2 order-1">
            <TournamentCarousel />
          </div>
        </div>
      </motion.div>
      <TournamentFormModal
        closeModal={() => {
          document.getElementById("tournament_modal").close();
        }}
      />
      <CustomStatus
        status="success"
        title="Registration Success"
        subTitle="Your registration has been successfully registered and please check your email for more information."
        hasButton={false}
      />
    </div>
  );
};
