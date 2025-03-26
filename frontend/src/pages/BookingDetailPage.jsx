import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { AboutCourseCard } from "../components/BookingDetail/AboutCourseCard";
import { BookingContainer } from "../components/BookingDetail/BookingContainer";
// import { useAuthStore } from "../store/useAuthStore";
import { Packages } from "../components/UI/Packages";
import { images } from "../utils/constant";
// import { useBookingStore } from "../store/useBookingStore";
import { CustomButton } from "../components/UI/CustomButton";
import { useNavigate, useParams } from "react-router-dom";
import { useUtilsStore } from "../store/useUtilsStore";
import { useNewAuthStore } from "../store/useNewAuthStore";
import { useNewBookingStore } from "../store/useNewBookingStore";

export const BookingDetailPage = () => {
  // const { authUser } = useAuthStore();
  const { authUser } = useNewAuthStore();
  // const {
  //   course,
  //   getCourse,
  //   setPackage,
  //   setHole,
  //   setTimeAndPrice,
  //   getBookings,
  // } = useBookingStore();
  const {
    course,
    getCourse,
    setPackage,
    setHole,
    setTimeAndPrice,
    getBookings,
    packages,
    bookings,
  } = useNewBookingStore();
  const navigate = useNavigate();
  const { setActiveTab } = useUtilsStore();
  const { courseId } = useParams();

  useEffect(() => {
    if (!courseId) navigate(-1);
    getCourse(courseId);
  }, [navigate, courseId]);

  useEffect(() => {
    getBookings(authUser?.id);
  }, [authUser?.id]);

  return (
    <div className="relative w-full flex-1 overflow-auto overflow-y-auto justify-center items-center flex flex-col">
      <motion.div
        className="relative w-full sm:h-[60vh] h-[45vh] bg-cover bg-center"
        style={{ backgroundImage: `url(${images.bookingDetailLogo})` }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="absolute inset-0 bg-black opacity-30" />
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-6">
          <h1 className="text-primary-color sm:text-5xl text-xl font-bold drop-shadow-xl">
            Experience Luxury Redefined at {course?.course_name}
          </h1>
          <p className="text-primary-color sm:text-2xl text-sm mt-2 font-bold">
            {course?.sub_description}
          </p>
          <CustomButton
            buttonName="Back To Courses"
            type="secondaryButton"
            style="mt-2"
            url="/courses"
            onClick={() => {
              setPackage({});
              setHole(null);
              setTimeAndPrice({});
              setActiveTab("courses");
            }}
          />
        </div>
      </motion.div>
      <div className="py-8 sm:w-5/6 w-full sm:px-0 px-3 flex flex-col gap-4 ">
        <AboutCourseCard
          description={course?.description}
          discount={course?.discount}
          location_city={course?.location_city}
          location_country={course?.location_country}
          name={course?.course_name}
          rating={course?.rating}
          yard={course?.yard}
          image={course?.image_url}
        />
        <motion.div
          className="w-full flex flex-col justify-center items-center gap-4 bg-white h-auto rounded-lg shadow-lg p-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-accent-color sm:text-2xl text-xl font-bold w-full text-center">
            Try our package?
          </p>
          <div className="w-full flex justify-between items-center sm:flex-row flex-col sm:gap-0 gap-4">
            {packages.map((item) => (
              <Packages
                key={item.name}
                title={item.name}
                price={item.price}
                badge="Most popular"
                isFeatrue={item.is_featured}
                features={item.features}
                isHome={false}
                id={item.id}
              />
            ))}
          </div>
        </motion.div>
        {authUser && <BookingContainer />}
      </div>
    </div>
  );
};
