import React from "react";
import { motion } from "framer-motion";
import { CalendarClock } from "lucide-react";
import DateNavigator from "../UI/DateNavigator";
import { TimeCard } from "./TimeCard";
import { timeSlots } from "../../utils/constant";
import { OrderContainer } from "./OrderContainer";
import { Hole } from "./Hole"; // Updated Hole component
import { useParams } from "react-router-dom";
import { useNewBookingStore } from "../../store/useNewBookingStore";

export const BookingContainer = () => {
  const { hole, bookings, dateAndTime, setHole } = useNewBookingStore();
  const { courseId } = useParams();
  const defaultHole = hole ? hole : 9;

  // Set default hole if none is selected
  React.useEffect(() => {
    if (!hole) {
      setHole(defaultHole);
    }
  }, [hole, setHole, defaultHole]);

  const formatDate = (passDate) => {
    const options = { weekday: "short", day: "2-digit", month: "short" };
    const date = new Date(passDate);
    return date.toLocaleDateString("en-GB", options);
  };

  const isBooked = (time) => {
    if (!bookings || !bookings.bookings || bookings.bookings.length === 0) {
      return false;
    }

    const courseBookings = bookings.bookings.filter(
      (booking) => booking.course_id === Number(courseId)
    );

    const bookedSlot = courseBookings.find((booking) => {
      const formattedBookingDate = formatDate(booking.booking_date).trim();
      const formattedSelectedDate = dateAndTime.trim();
      return (
        formattedBookingDate === formattedSelectedDate &&
        booking.holes === (hole || defaultHole) &&
        booking.booking_time === time
      );
    });
    return !!bookedSlot;
  };

  return (
    <motion.div
      className="bg-white w-full h-auto rounded-lg shadow-lg p-5 flex flex-col"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full h-full sm:p-5 flex sm:gap-2 gap-5 sm:flex-row flex-col">
        <div className="sm:w-4/6 flex flex-col justify-start items-start bg-primary-color rounded-xl overflow-hidden shadow-md border border-base-content/10">
          <h1 className="text-primary-color text-xl font-bold h-14 bg-accent-color w-full flex justify-center items-center">
            Available Tee Times
          </h1>
          <div className="w-full h-auto flex flex-col justify-center sm:mt-0 mt-3">
            <div className="flex justify-between items-center px-3">
              <span className="text-black/50 text-xs font-bold flex gap-1 justify-start items-center">
                <CalendarClock className="size-4" />
                <p>Date and Time</p>
              </span>
              <DateNavigator />
            </div>
            <div className="px-3 w-full flex sm:flex-row flex-col gap-3 mt-3">
              <Hole holeNumber={9} />
              <Hole holeNumber={18} />
            </div>
            {/* Time Slots */}
            <div className="grid sm:grid-cols-6 grid-cols-3 gap-2 p-3 h-full w-full sm:mt-8">
              {timeSlots.map((time) => (
                <TimeCard
                  key={time.time}
                  time={time.time}
                  price={
                    hole === 9
                      ? time.price9
                      : hole === 18
                      ? time.price18
                      : time.price9 // Default to 9 if no hole selected
                  }
                  isBooked={isBooked(time.time)}
                />
              ))}
            </div>
          </div>
        </div>
        <OrderContainer />
      </div>
    </motion.div>
  );
};
