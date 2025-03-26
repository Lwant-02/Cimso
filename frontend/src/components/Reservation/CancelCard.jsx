import { motion } from "framer-motion";
import { CircleCheckBig } from "lucide-react";
import { useBookingStore } from "../../store/useBookingStore";
import { Spinner } from "../UI/Spinner";

export const CancelCard = () => {
  const { cancelBookings, isGettingCancelBookings } = useBookingStore();

  if (isGettingCancelBookings) {
    return (
      <div className="sm:w-5/6 w-auto  h-72 flex justify-center items-center">
        <Spinner size="size-8" />
      </div>
    );
  }

  const formattedDate = (date) => {
    const formatOne = date.split("T")[0];
    return formatOne;
  };
  return (
    <>
      {cancelBookings.map((booking, index) => (
        <motion.div
          className="sm:w-4/6 w-full p-3 bg-white rounded-lg border border-base-content/10 shadow-lg flex flex-col justify-center items-center gap-3"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          key={index}
        >
          <div className="w-full bg-accent-color/90 flex justify-start items-center p-3 rounded-lg gap-1">
            <CircleCheckBig className="sm:size-5 size-4 text-primary-color" />
            <p className="font-semibold text-primary-color sm:text-sm text-xs">
              It may take 1 business day to confirm.
            </p>
          </div>
          <div className="w-full flex justify-start items-center gap-3">
            <div className="avatar">
              <div className="w-24 rounded">
                <img src={booking.golfPic} alt={booking.courseName} />
              </div>
            </div>
            <div>
              <p className="sm:text-lg text-sm  font-bold drop-shadow-xl">
                {booking.courseName}
              </p>
              <p className="font-semibold text-xs sm:text-base">
                Total Price-฿{booking.totalPrice}
              </p>
              <p className="font-semibold text-xs sm:text-base">
                Cancel Date-{formattedDate(booking.cancelDate)}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </>
  );
};
