import express from "express";
import {
  CancelBooking,
  CreateBooking,
  GetBookings,
  GetCancelBookings,
  GetUserBookings,
  InsertCancelBooking,
} from "../controller/bookings.controller.js";
import { Middleware } from "../middleware/middleware.js";

export const bookingRouter = express();

bookingRouter.post("/create-booking", Middleware, CreateBooking);

bookingRouter.get("/get-bookings", Middleware, GetBookings);

bookingRouter.delete("/cancel-booking/:bookingId", Middleware, CancelBooking);

bookingRouter.post(
  "/insert-cancel-booking/:userId",
  Middleware,
  InsertCancelBooking
);

bookingRouter.get("/get-user-bookings", Middleware, GetUserBookings);

bookingRouter.get("/get-cancel-bookings", Middleware, GetCancelBookings);
