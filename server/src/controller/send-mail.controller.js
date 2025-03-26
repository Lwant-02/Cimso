import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { acccountEmail, transporter } from "../config/nodemailer.config.js";
import {
  generateBookingCancellationTemplate,
  generateConfrimTemplate,
  generateWelcomeEmailTemplate,
  generateTournamentConfirmationEmail,
  generateTournamentCertificateEmail,
} from "../utils/email-template.js";
import { generateGolfReceiptPDF } from "../utils/generatePDF.js";
import { generateGolfCertificatePDF } from "../utils/generateCertificate.js";

export const SendMailConfirm = async (req, res) => {
  const {
    userName,
    courseTitle,
    courseImage,
    price,
    location,
    dateTime,
    email,
    golfer,
    hole,
    packageName,
  } = req.body;
  try {
    //Generate the pdf file first
    // Get the directory name for the current module
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const pdfPath = path.join(__dirname, "GolfBookingReceipt.pdf");
    await generateGolfReceiptPDF(
      {
        userName,
        courseTitle,
        courseImage,
        price,
        location,
        dateTime,
        golfer,
        hole,
        packageName,
        email,
      },
      pdfPath
    );

    const subject = "Cimso Online Golf Booking Confirmation✅";
    const message = generateConfrimTemplate({
      userName,
      courseTitle,
      courseImage,
      price,
      location,
      dateTime,
      golfer,
      hole,
      packageName,
      email,
    });
    const mailOption = {
      from: acccountEmail,
      to: email,
      subject: subject,
      html: message,
      attachments: [
        {
          filename: "E-Receipt.pdf",
          path: pdfPath,
          contentType: "application/pdf",
        },
      ],
    };
    // Send email
    transporter.sendMail(mailOption, (error, info) => {
      // Remove the temporary PDF after sending
      fs.unlinkSync(pdfPath);

      if (error) {
        console.error("Error sending mail:", error);
        return res.status(500).json({ message: "Error sending email!" });
      }
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Email sent successfully!" });
    });
  } catch (error) {
    console.log("Error in SendMailConfirm:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const SendMailCancel = async (req, res) => {
  const { userName, courseName, courseImage, price, cancellationDate, email } =
    req.body;
  try {
    const subject = "Cimso Online Golf Booking Cancellation⛳";
    const message = generateBookingCancellationTemplate({
      userName,
      courseTitle: courseName,
      courseImage,
      courseName,
      price,
      cancellationDate,
    });
    const mailOption = {
      from: acccountEmail,
      to: email,
      subject: subject,
      html: message,
    };
    transporter.sendMail(mailOption, (error, info) => {
      if (error) return console.log(error, "Error sending mail.");
      console.log("Email sent:" + info.response);
    });
  } catch (error) {
    console.log("Error in SendMailCancel:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const SendWelcomeMail = async (req, res) => {
  const { userName, email } = req.body;
  try {
    const subject = "Welcome to Cimso Online Golf Booking🎉";
    const message = generateWelcomeEmailTemplate({ userName });
    const mailOption = {
      from: acccountEmail,
      to: email,
      subject: subject,
      html: message,
    };
    transporter.sendMail(mailOption, (error, info) => {
      if (error) return console.log(error, "Error sending mail.");
      console.log("Email sent:" + info.response);
    });
  } catch (error) {
    console.log("Error in SendWelcomeMail:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const SendMailTournament = async (req, res) => {
  const { name, email, phone, tournamentName, date, time, location } = req.body;
  try {
    const subject = `🏆 Get Ready! Your Spot in ${tournamentName} is Confirmed!`;
    const message = generateTournamentConfirmationEmail({
      name,
      email,
      phone,
      tournamentName,
      date,
      time,
      location,
    });
    const mailOption = {
      from: acccountEmail,
      to: email,
      subject: subject,
      html: message,
    };
    transporter.sendMail(mailOption, (error, info) => {
      if (error) return console.log(error, "Error sending mail.");
      console.log("Email sent:" + info.response);
      res.status(200).json({ success: true });
    });
  } catch (error) {
    console.log("Error in SendMailTournament:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};

export const SendCertificate = async (req, res) => {
  const { playerName, email, position, score, tournamentName, date, location } =
    req.body;
  try {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    const pdfPath = path.join(__dirname, "Certificate.pdf");
    const certificateDetails = {
      playerName: playerName,
      tournamentName: tournamentName,
      date: date,
      location: location,
      position: position,
      score: score,
    };
    await generateGolfCertificatePDF(certificateDetails, pdfPath);
    const subject = `🏆 Congratulations, ${playerName}! Your Golf Achievement Awaits!`;
    const message = generateTournamentCertificateEmail({
      playerName,
      tournamentName,
      date,
      location,
      position,
    });
    const mailOption = {
      from: acccountEmail,
      to: email,
      subject: subject,
      html: message,
      attachments: [
        {
          filename: "Certificate.pdf",
          path: pdfPath,
          contentType: "application/pdf",
        },
      ],
    };
    // Send email
    transporter.sendMail(mailOption, (error, info) => {
      // Remove the temporary PDF after sending
      fs.unlinkSync(pdfPath);

      if (error) {
        console.error("Error sending mail:", error);
        return res.status(500).json({ message: "Error sending email!" });
      }
      console.log("Email sent: " + info.response);
      res.status(200).json({ message: "Email sent successfully!" });
    });
  } catch (error) {
    console.log("Error in SendCertificate:", error.message);
    res.status(500).json({ message: "Internal server error!" });
  }
};
