import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

export const acccountEmail = "cimsonoreply@gmail.com";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: acccountEmail,
    pass: process.env.EMAIL_PASSWORD,
  },
});
