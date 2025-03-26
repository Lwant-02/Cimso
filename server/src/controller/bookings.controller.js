import { Booking, CancelBookingData } from "../model/booking.model.js";

export const CreateBooking = async (req, res) => {
  const {
    userId,
    user,
    bookingDate,
    courseId,
    golfers,
    holes,
    packageType,
    holePrice,
    totalPrice,
    golfPic,
    location,
    courseName,
    bookingTime,
  } = req.body;

  if (!userId || !courseId || !bookingDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const newBooking = await Booking.create({
      userId,
      user,
      bookingDate,
      courseId,
      golfers,
      holes,
      packageType,
      holePrice,
      totalPrice,
      golfPic,
      location,
      courseName,
      bookingTime,
    });
    res.status(201).json(newBooking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const GetBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().lean();
    if (bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found." });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const GetUserBookings = async (req, res) => {
  const { _id } = req.user;
  try {
    const bookings = await Booking.find({ userId: _id })
      .sort({ createdAt: -1 })
      .lean();
    if (bookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No bookings found for this user" });
    }
    res.status(200).json(bookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const CancelBooking = async (req, res) => {
  const { bookingId } = req.params;
  try {
    const booking = await Booking.findByIdAndDelete(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }
    res.status(200).json({ message: "Successfully canceled the booking." });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const InsertCancelBooking = async (req, res) => {
  const { userId } = req.params;
  const { courseName, golfPic, totalPrice, cancelDate } = req.body;

  if (!courseName || !golfPic || !totalPrice || !cancelDate) {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const newCancelBooking = await CancelBookingData.create({
      userId,
      courseName,
      golfPic,
      totalPrice,
      cancelDate,
    });
    res.status(201).json(newCancelBooking);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const GetCancelBookings = async (req, res) => {
  const { _id } = req.user;
  try {
    const cancelBookings = await CancelBookingData.find({ userId: _id }).lean();
    if (cancelBookings.length === 0) {
      return res
        .status(404)
        .json({ message: "No cancelled bookings found for this user" });
    }
    res.status(200).json(cancelBookings);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
