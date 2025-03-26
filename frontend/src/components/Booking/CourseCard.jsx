import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { CustomButton } from "../UI/CustomButton";
import { ArrowRight, MapPinned } from "lucide-react";
import { Rating } from "../UI/Rating";
import { useUtilsStore } from "../../store/useUtilsStore";
import { CustomStatus } from "../UI/CustomStatus";
// import { useAuthStore } from "../../store/useAuthStore";
import { LocationPart } from "../UI/LocationPart";
import { useNewAuthStore } from "../../store/useNewAuthStore";

export const CourseCard = ({
  delay,
  status,
  image,
  name,
  subDescription,
  rating,
  discount,
  id,
  location_city,
  location_country,
}) => {
  // const { authUser } = useAuthStore();
  const { authUser } = useNewAuthStore();
  const { openModal, setActiveTab } = useUtilsStore();

  const handleBookNow = () => {
    if (!authUser) {
      openModal();
    }
    setActiveTab("booking");
  };

  return (
    <motion.div
      className="w-full "
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: delay }}
      viewport={{ once: true, amount: 0.01 }}
    >
      <div className="card sm:card-sm card-xs p-2 bg-base-100 sm:w-80 h-[390px] shadow-lg backdrop-blur-lg hover:scale-105 transition-transform duration-300 cursor-pointer">
        <figure className="relative w-full overflow-hidden h-[150px]">
          <span className="badge badge-md absolute top-3 left-3 rounded-lg bg-accent text-white border-none">
            {status}
          </span>
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {name}
            {discount > 0 && (
              <div className="badge badge-secondary text-primary-color badge-sm">
                {discount}%
              </div>
            )}
          </h2>
          <p className="text-sm">{subDescription}</p>
          <Rating rating={rating} />
          <span className="flex justify-start items-center gap-1 w-full ">
            <MapPinned className="size-4 text-accent-color " />
            <LocationPart city={location_city} country={location_country} />
          </span>
          <div className="card-actions flex justify-between  items-center">
            <CustomButton
              buttonName="Book Now"
              type="secondaryButton"
              onClick={handleBookNow}
              url={authUser && `/booking-detail/${id}`}
            />
            <Link
              className="flex gap-1 justify-center items-center"
              to={`/booking-detail/${id}`}
              onClick={() => setActiveTab("booking")}
            >
              <p className="text-sm underline cursor-pointer">View Detail</p>
              <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      </div>
      <CustomStatus
        title="Unlock Features"
        buttonTitle="Sign In"
        subTitle="Please! Sign in first in order to continue this booking!"
        url="/signin"
        hasButton={true}
      />
    </motion.div>
  );
};
