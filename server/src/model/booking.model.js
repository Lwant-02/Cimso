import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    user: {
      name: { type: String, required: true },
      email: { type: String, required: true },
    },
    bookingDate: { type: String, required: true },
    bookingTime: { type: String, required: true },
    golfPic: { type: String, required: true },
    location: {
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    courseName: { type: String, required: true },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Golf",
      required: true,
    },
    golfers: { type: Number, required: true },
    holes: { type: Number, required: true },
    packageType: {
      name: { type: String, default: "" },
      price: { type: Number, default: 0 },
    },
    holePrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Booking =
  mongoose.models.Bookings || mongoose.model("Booking", bookingSchema);

const cancelBookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    courseName: { type: String, required: true },
    golfPic: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    cancelDate: { type: String, required: true },
  },
  { timestamps: true }
);

export const CancelBookingData =
  mongoose.models.CancelBookings ||
  mongoose.model("CancelBooking", cancelBookingSchema);
