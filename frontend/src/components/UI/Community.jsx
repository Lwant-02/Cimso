import React from "react";
import { motion } from "framer-motion";
import { CommunityCard } from "./CommunityCard";
import { useNewBookingStore } from "../../store/useNewBookingStore";

export const Community = () => {
  const { networkUsers } = useNewBookingStore();
  const get_10_user = networkUsers.slice(0, 8);
  const url =
    "https://res.cloudinary.com/dxmvqasul/image/upload/v1743003585/Rectangle_6704_cvbblm.png";
  return (
    <div className="w-full flex flex-col justify-center items-center gap-3">
      <motion.div
        className="relative w-full sm:h-[25vh] h-[15vh]  bg-cover bg-center flex justify-center items-center rounded-md"
        style={{ backgroundImage: `url(${url})` }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-primary-color sm:text-5xl text-xl font-bold drop-shadow-xl text-center">
          Hit the fairways with friends and fellow golfers
        </h1>
      </motion.div>
      <motion.p
        className="w-full flex items-start justify-start text-base font-semibold"
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        Nearby People
      </motion.p>
      <div className="grid sm:grid-cols-4 grid-cols-2 place-items-center gap-3">
        {get_10_user.map((user, index) => (
          <CommunityCard
            key={index}
            bio={user.bio}
            facebook_url={user.facebook_url}
            linkedin_url={user.linkedin_url}
            name={user.full_name}
            twitter_url={user.x_url}
          />
        ))}
      </div>
    </div>
  );
};
