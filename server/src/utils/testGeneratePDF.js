import { generateGolfReceiptPDF } from "./generatePDF.js";
import { fileURLToPath } from "url";
import path from "path";
import { generateGolfCertificatePDF } from "./generateCertificate.js";

// Example booking details to test the function
// const bookingDetails = {
//   userName: "John Doe",
//   courseTitle: "Green Valley Golf Course",
//   courseImage:
//     "https://res.cloudinary.com/dt28nxrrx/image/upload/v1740416673/6_wqlcd1.jpg", // Replace with a valid image URL
//   price: 100,
//   location: "123 Golf St, Golf City",
//   dateTime: "2025-03-20 10:00 AM",
//   email: "john.doe@example.com",
//   golfer: 1,
//   hole: 18,
//   packageName: "Standard Package",
// };

// Get the directory name using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pdfPath = path.join(__dirname, "Certificate.pdf");

// Call the generateReceiptPDF function to generate the receipt PDF
// generateGolfReceiptPDF(bookingDetails, pdfPath)
//   .then(() => {
//     console.log("PDF generated successfully!");
//   })
//   .catch((error) => {
//     console.error("Error generating PDF:", error);
//   });
const certificateDetails = {
  playerName: "John Smith",
  tournamentName: "Annual Spring Golf Championship",
  date: "March 15, 2025",
  location: "Pinehurst Golf Club",
  position: "1st Place", // or "2nd Place", "3rd Place", "Participant"
  score: "68", // optional
  certificateId: "GC2025001", // optional, will generate random if not provided
};

// Generate the certificate
generateGolfCertificatePDF(certificateDetails, pdfPath)
  .then(() => {
    console.log("Certificate generated successfully");
  })
  .catch((error) => {
    console.log("Error generateing certificate:", error);
  });
