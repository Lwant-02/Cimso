import PDFDocument from "pdfkit";
import axios from "axios";
import fs from "fs";

export const generateGolfCertificatePDF = async (
  certificateDetails,
  pdfPath
) => {
  return new Promise(async (resolve, reject) => {
    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
      layout: "landscape", // Landscape orientation for certificates
    });
    const stream = fs.createWriteStream(pdfPath);
    doc.pipe(stream);

    try {
      // Fetch logo
      const logoResponse = await axios.get(
        "https://www.cimso.com/wp-content/uploads/2020/01/cimso-logo-300-transparent.png",
        { responseType: "arraybuffer" }
      );
      const logoBuffer = Buffer.from(logoResponse.data, "binary");

      // Set background color
      doc.rect(0, 0, doc.page.width, doc.page.height).fill("#f4f7fa");

      // Add decorative border
      const borderWidth = 15;
      doc
        .rect(
          borderWidth,
          borderWidth,
          doc.page.width - borderWidth * 2,
          doc.page.height - borderWidth * 2
        )
        .lineWidth(2)
        .strokeColor("#3498db")
        .stroke();

      // Add inner gold border
      doc
        .rect(
          borderWidth + 10,
          borderWidth + 10,
          doc.page.width - borderWidth * 2 - 20,
          doc.page.height - borderWidth * 2 - 20
        )
        .lineWidth(1)
        .strokeColor("#e6c034")
        .stroke();

      // Add certificate title
      doc
        .fontSize(32)
        .font("Helvetica-Bold")
        .fillColor("#3498db")
        .text("CERTIFICATE OF ACHIEVEMENT", 0, 70, { align: "center" });

      // Add "Presented to" text with a gap
      doc
        .fontSize(16)
        .font("Helvetica")
        .fillColor("#666666")
        .text("PRESENTED TO", 0, 120, { align: "center" }); // Adjusted y-position to 120

      // Add player name
      doc
        .fontSize(36)
        .font("Helvetica-Bold")
        .fillColor("#333333")
        .text(certificateDetails.playerName, 0, 140, { align: "center" }); // Adjusted y-position to 140

      // Add golden line under name
      const nameWidth = doc.widthOfString(certificateDetails.playerName);
      const centerX = doc.page.width / 2;
      doc
        .moveTo(centerX - nameWidth / 2 - 20, 185) // Adjusted y-position to 185
        .lineTo(centerX + nameWidth / 2 + 20, 185)
        .lineWidth(2)
        .strokeColor("#e6c034")
        .stroke();

      // Add achievement text
      doc
        .fontSize(16)
        .font("Helvetica")
        .fillColor("#666666")
        .text(
          certificateDetails.position === "Participant"
            ? "For participating in the"
            : `For achieving ${certificateDetails.position} place in the`,
          0,
          205, // Adjusted y-position to 205
          { align: "center" }
        );

      // Add tournament name
      doc
        .fontSize(24)
        .font("Helvetica-Bold")
        .fillColor("#3498db")
        .text(certificateDetails.tournamentName, 0, 230, { align: "center" }); // Adjusted y-position to 230

      // Add score if available
      if (certificateDetails.score) {
        doc
          .fontSize(16)
          .font("Helvetica")
          .fillColor("#666666")
          .text(`with a score of ${certificateDetails.score}`, 0, 265, {
            align: "center",
          });
      }

      // Add date and location
      doc
        .fontSize(16)
        .font("Helvetica")
        .fillColor("#666666")
        .text(
          `Held on ${certificateDetails.date} at ${certificateDetails.location}`,
          0,
          certificateDetails.score ? 295 : 265, // Adjusted y-position
          { align: "center" }
        );

      // Add organization logo
      doc.image(logoBuffer, 50, doc.page.height - 100, { width: 120 });

      // Signature lines
      const signLineY = doc.page.height - 120; // Adjusted to fit within the page

      // First signature
      doc.moveTo(280, signLineY).lineTo(430, signLineY).lineWidth(1).stroke();
      doc.fontSize(12).text("Tournament Director", 280, signLineY + 10, {
        width: 150,
        align: "center",
      });

      // Second signature
      doc.moveTo(530, signLineY).lineTo(680, signLineY).lineWidth(1).stroke();
      doc.fontSize(12).text("Club President", 530, signLineY + 10, {
        width: 150,
        align: "center",
      });

      // Add Certificate ID and Issued Date below the Club President signature
      const certificateId =
        certificateDetails.certificateId || generateCertificateId();
      const issuedDate = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      // Certificate ID
      doc
        .fontSize(10)
        .fillColor("#999999")
        .text(`Certificate ID: ${certificateId}`, 530, signLineY + 30, {
          width: 150,
          align: "center",
        });

      // Issued Date
      doc
        .fontSize(10)
        .fillColor("#999999")
        .text(`Issued: ${issuedDate}`, 530, signLineY + 45, {
          width: 150,
          align: "center",
        });

      doc.end();
      stream.on("finish", () => resolve());
      stream.on("error", reject);
    } catch (error) {
      console.error("Error generating certificate PDF:", error);
      reject(error);
    }
  });
};

function generateCertificateId() {
  return (
    "GC" +
    Date.now().toString().substring(6) +
    Math.floor(Math.random() * 1000)
      .toString()
      .padStart(3, "0")
  );
}
