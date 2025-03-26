import { motion } from "framer-motion";
import { MapPinned, SquareMousePointer, Star } from "lucide-react";
import { CustomButton } from "../UI/CustomButton";
import { useAuthStore } from "../../store/useAuthStore";
import { LocationPart } from "../UI/LocationPart";
import { useNewAuthStore } from "../../store/useNewAuthStore";

export const AboutCourseCard = ({
  name,
  description,
  rating,
  location_city,
  location_country,
  yard,
  discount,
  image,
}) => {
  // const { authUser } = useAuthStore();
  const { authUser } = useNewAuthStore();

  return (
    <motion.div
      className="bg-white w-full h-auto rounded-lg shadow-lg p-5 flex gap-8 flex-col"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="w-full h-auto  sm:p-5 flex gap-8 sm:flex-row flex-col ">
        <div className="sm:w-3/6 w-full flex flex-col justify-start items-start gap-3 ">
          <h1 className="text-accent-color sm:text-2xl text-xl font-bold">
            About {name}
          </h1>
          {discount > 0 && (
            <div className="badge badge-secondary badge-sm ">
              Discount-{discount}%
            </div>
          )}
          <p className="text-sm text-justify">{description}</p>
          <div className="flex flex-col gap-2 justify-start items-start ">
            <span className="flex justify-center items-center gap-1">
              <Star className=" p-1 size-7 rounded-full text-accent-color bg-gray-200" />
              <p className="text-sm ">{rating} Reviews</p>
            </span>
            <span className="flex justify-center items-center gap-1">
              <MapPinned className=" p-1 size-7 rounded-full text-accent-color bg-gray-200" />
              <LocationPart city={location_city} country={location_country} />
            </span>
            <span className="flex justify-center items-center gap-1">
              <SquareMousePointer className=" p-1 size-7 rounded-full text-accent-color bg-gray-200" />
              <p className="text-sm ">{yard} yards</p>
            </span>
          </div>
          {!authUser && (
            <CustomButton
              buttonName="Book This Course"
              type="secondaryButton"
              url="/signin"
            />
          )}
        </div>
        <div className="flex-1 justify-center items-center flex ">
          <img
            src={image}
            alt={name}
            className="size-80 object-cover rounded-lg"
          />
        </div>
      </div>
    </motion.div>
  );
};
