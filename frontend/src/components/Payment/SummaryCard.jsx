import { useEffect } from "react";
import { motion } from "framer-motion";
import { SummaryInfo } from "./SummaryInfo";
import { CustomButton } from "../UI/CustomButton";
import { useUtilsStore } from "../../store/useUtilsStore";
import { CustomStatus } from "../UI/CustomStatus";
import { LocationPart } from "../UI/LocationPart";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useNewBookingStore } from "../../store/useNewBookingStore";
import { useNewAuthStore } from "../../store/useNewAuthStore";
// import { useBookingStore } from "../../store/useBookingStore";
// import { useAuthStore } from "../../store/useAuthStore";

export const SummaryCard = ({ formData }) => {
  // const {
  //   getCourse,
  //   course,
  //   dateAndTime,
  //   timeAndPrice,
  //   golfer,
  //   hole,
  //   packageType,
  //   setHole,
  //   setTimeAndPrice,
  //   setPackage,
  //   setGolfer,
  // } = useBookingStore();
  // const { authUser } = useAuthStore();
  const {
    getCourse,
    course,
    dateAndTime,
    timeAndPrice,
    golfer,
    hole,
    packageType,
    setHole,
    setTimeAndPrice,
    setPackage,
    setGolfer,
    createBooking,
    packageId,
  } = useNewBookingStore();
  const { authUser } = useNewAuthStore();
  const { openModal, closeModal, setActiveTab, sentConfirmEmail } =
    useUtilsStore();
  const { courseId } = useParams();
  const navigate = useNavigate();

  const totalPrice =
    packageType.price && timeAndPrice.price
      ? Number(packageType.price) + Number(timeAndPrice.price) * Number(golfer)
      : packageType.price || timeAndPrice.price * Number(golfer) || 0;

  useEffect(() => {
    getCourse(courseId);
  }, [courseId, getCourse]);

  const handlSubmitBooking = async (e) => {
    e.preventDefault();

    if (!formData.cardNumber || !formData.expiryDate || !formData.cvc) {
      toast.error("Please fill out all payment details first!");
      return;
    }

    //Create booking
    const bookingRes = await createBooking({
      customer_id: authUser.id,
      booking_date: dateAndTime,
      booking_time: timeAndPrice.time,
      location_city: course.location_city,
      location_country: course.location_country,
      course_id: courseId,
      golfers: golfer,
      holes: hole,
      package_id: packageId,
      hole_price: timeAndPrice.price,
      total_price: totalPrice,
      coupon_code: "",
      status: "confirmed",
    });

    const emailInfo = {
      userName: authUser.full_name,
      courseTitle: course.course_name,
      courseImage: course.image_url,
      price: totalPrice,
      location: `${course.location_city} > ${course.location_country}`,
      dateTime: `${dateAndTime} at ${timeAndPrice.time}`,
      email: authUser.email,
      golfer: golfer,
      hole: hole,
      packageName: packageType.title,
    };
    console.log("Summary:", bookingRes);

    if (bookingRes) {
      openModal();
      setActiveTab("reservation");
      //Here we sent the email
      setTimeout(() => {
        closeModal();
        setHole(null);
        setPackage({});
        setTimeAndPrice({});
        setGolfer(null);
        navigate(`/reservation`);
      }, 3000);
      await sentConfirmEmail(emailInfo);
    } else {
      toast.error("Booking failed. Please try again.");
    }
  };

  return (
    <motion.div
      className="flex-1 bg-white rounded-lg p-3 shadow-md pt-5 pb-5 "
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <p className="text-lg font-semibold">Summary</p>
      <form
        className="w-full h-auto border-t border-base-content/10 mt-2 flex flex-col gap-5"
        onSubmit={handlSubmitBooking}
      >
        <SummaryInfo
          name="Course Name"
          value={course.course_name}
          style="mt-5"
        />
        <SummaryInfo
          name="Location"
          value={
            <LocationPart
              city={course.location_city}
              country={course.location_country}
            />
          }
        />
        <SummaryInfo name="Date" value={dateAndTime} style="mt-4" />
        <SummaryInfo name="Time" value={timeAndPrice.time} />
        <SummaryInfo name="Number of Golfer" value={golfer} />
        <SummaryInfo name="Hole" value={hole} />
        <SummaryInfo name="Package Name" value={packageType.title || "-"} />
        <SummaryInfo name="Hole Price" value={` ฿${timeAndPrice.price || 0}`} />
        <SummaryInfo
          name="Package Price"
          value={` ฿${packageType.price || 0}`}
        />
        <SummaryInfo
          name="Total"
          value={`฿ ${totalPrice}`}
          style="mt-5 border-t border-base-content/20 pt-3"
          textStyle="text-lg font-semibold"
          valueStyle="text-lg font-semibold"
        />
        <CustomButton
          buttonName="Pay for My Booking"
          onClick={handlSubmitBooking}
          type="submitButton"
        />
      </form>
      <CustomStatus
        status="success"
        title="Booking Success"
        subTitle="Booking has been successfully booked and redirecting you to the booking page."
        hasButton={false}
      />
    </motion.div>
  );
};
