import React from "react";
// import { useBookingStore } from "../../store/useBookingStore";
import { useNewBookingStore } from "../../store/useNewBookingStore";

export const TimeCard = ({ time, price, isBooked }) => {
  // const { course, setTimeAndPrice, timeAndPrice } = useBookingStore();
  const { course, setTimeAndPrice, timeAndPrice } = useNewBookingStore();
  const discountRate = (course?.discount ?? 0) / 100;
  const hasDiscount = price * (1 - discountRate);

  return (
    <div
      className={`sm:w-28 rounded-lg overflow-hidden cursor-pointer border border-base-content/10 shadow-md hover:bg-accent-color transition-colors ${
        time === timeAndPrice.time && "bg-accent-color"
      } duration-300 group ${isBooked ? "bg-red-400 pointer-events-none" : ""}`}
      onClick={() => !isBooked && setTimeAndPrice({ time, price: hasDiscount })}
    >
      <p
        className={`text-xs h-7 flex justify-center items-center border-b border-base-content/10 font-semibold group-hover:text-primary-color ${
          time === timeAndPrice.time && "text-primary-color"
        } `}
      >
        {time}
      </p>

      <div className="flex flex-col justify-center items-center w-full h-11 bg-gray-50">
        {isBooked ? (
          <p className="text-sm  flex justify-center items-center  font-semibold w-full">
            Unavalible
          </p>
        ) : (
          <>
            {course?.discount > 0 && (
              <p className="text-xs line-through">{price}</p>
            )}
            <p className="text-sm  flex justify-center items-center  font-semibold w-full">
              ฿{hasDiscount}
            </p>
          </>
        )}
      </div>
    </div>
  );
};
