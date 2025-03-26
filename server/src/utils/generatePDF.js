import PDFDocument from "pdfkit";
import fs from "fs";
import axios from "axios";

function generatePlayerId() {
  // Create a unique identifier with "GLFR" prefix followed by a random number
  const randomNum = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `GLFR${randomNum}`;
}

export const generateGolfReceiptPDF = async (bookingDetails, pdfPath) => {
  return new Promise(async (resolve, reject) => {
    // Create a PDF document with slightly reduced margins to match the Trip.com format
    const doc = new PDFDocument({
      margin: 40,
      size: "A4",
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

      // Fetch course image if available
      let courseImageBuffer = null;
      if (bookingDetails.courseImage) {
        const courseImageResponse = await axios.get(
          bookingDetails.courseImage,
          {
            responseType: "arraybuffer",
          }
        );
        courseImageBuffer = Buffer.from(courseImageResponse.data, "binary");
      }

      // Company Header
      doc.image(logoBuffer, 50, 40, { width: 150 });

      // Company details
      doc
        .fontSize(10)
        .font("Helvetica")
        .text("CIMSO Golf Booking Pte. Ltd.", 50, 90)
        .text(`Company No/GST Reg. No: ${"23446576554"}`, 50, 105);

      // Booking details
      doc
        .fontSize(10)
        .text(
          `Booking No. ${
            bookingDetails.bookingId || Math.floor(Math.random() * 10000000000)
          }`,
          50,
          130
        )
        .text(
          `Date of Booking: ${new Date().toLocaleString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
            month: "long",
            day: "numeric",
            year: "numeric",
            timeZoneName: "short",
          })}`,
          50,
          145
        );

      // Receipt Title
      doc
        .fontSize(14)
        .font("Helvetica-Bold")
        .text("E-Receipt", 0, 175, { align: "center" })
        .moveDown(0.8);

      // Contact Info Table
      const contactY = doc.y;
      drawTable(
        doc,
        contactY,
        "Contact Info",
        [
          { label: "Contact Name", value: bookingDetails.userName || "N/A" },
          { label: "Email", value: bookingDetails.email || "N/A" },
        ],
        true
      ); // Set centeredTitle to true

      // Players Table
      const playersY = doc.y + 15;
      const players = [
        {
          name: bookingDetails.userName || "Player 1",
          id: bookingDetails.playerId || generatePlayerId(),
          location: bookingDetails.location,
          hole: bookingDetails.hole,
        },
      ];
      drawPlayersTable(doc, playersY, "Players & Booking Details", players);

      // Golf Course Info Table
      const golfCourseY = doc.y + 15;
      drawTable(
        doc,
        golfCourseY,
        "Golf Course",
        [
          {
            label: bookingDetails.courseTitle,
            value: bookingDetails.dateTime,
            rightValue: bookingDetails.packageName || "None",
          },
        ],
        true
      ); // Set centeredTitle to true

      // Price Summary Table
      const priceY = doc.y + 15;
      drawPriceTable(
        doc,
        priceY,
        "Price Summary",
        [
          {
            label: "Golf Fee",
            value: `${bookingDetails.currency || "THB"} ${
              bookingDetails.price - (bookingDetails.taxes || 0)
            }`,
          },
          {
            label: "Taxes & Fees",
            value: `${bookingDetails.currency || "THB"} ${
              bookingDetails.taxes || 0
            }`,
          },
          {
            label: "Total",
            value: `${bookingDetails.currency || "THB"} ${
              bookingDetails.price
            }`,
          },
        ],
        true
      ); // Set centeredTitle to true

      // Automatic generation note
      doc
        .fontSize(10)
        .font("Helvetica")
        .text("This receipt is automatically generated.", 0, doc.y + 20, {
          align: "center",
        })
        .moveDown(1);

      // Add Golf Course Image if available
      if (courseImageBuffer) {
        // Calculate remaining space
        const remainingSpace = 700 - doc.y; // A4 height is roughly 842, allow for footer
        const imageHeight = Math.min(200, remainingSpace * 0.7); // Use at most 70% of remaining space

        doc
          .image(courseImageBuffer, {
            width: 300,
            height: imageHeight,
            align: "center",
            fit: [300, imageHeight],
          })
          .moveDown(1);
      }

      // Company Stamp/Footer
      const stampY = doc.y + 20;
      drawStamp(doc, stampY);

      // Page number
      doc.fontSize(10).text("1", 50, 750);

      // Footer company name
      doc
        .fontSize(8)
        .text("CIMSO Golf Booking Pte. Ltd.", 0, 780, { align: "center" });

      doc.end();
      stream.on("finish", () => resolve());
      stream.on("error", reject);
    } catch (error) {
      console.error("Error generating PDF:", error);
      reject(error);
    }
  });
};

// Helper function to draw tables
function drawTable(doc, yPosition, title, rows, centeredTitle = true) {
  const width = 515;
  const leftColWidth = 150;
  const x = 40;

  // Draw table header
  doc
    .moveTo(x, yPosition)
    .lineTo(x + width, yPosition)
    .stroke();

  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(title, x, yPosition + 5, { align: "center", width: width });

  // Add a line to separate the title from the field names
  const titleSeparatorY = yPosition + 20;
  doc
    .moveTo(x, titleSeparatorY)
    .lineTo(x + width, titleSeparatorY)
    .stroke();

  // Field names row
  const headerHeight = 40; // Increased to accommodate the title separator

  // Draw field names based on whether we have three columns or two
  doc.fontSize(9).font("Helvetica-Bold");

  if (rows[0] && rows[0].rightValue) {
    // Three-column layout field names
    doc
      .text("Course Name", x + 5, titleSeparatorY + 5)
      .text("Date & Time", x + 200, titleSeparatorY + 5)
      .text("Package", x + 350, titleSeparatorY + 5);
  } else {
    // Two-column layout field names
    doc
      .text("Field", x + 5, titleSeparatorY + 5)
      .text("Value", x + leftColWidth + 5, titleSeparatorY + 5, {
        align: "right",
        width: width - leftColWidth - 10,
      });
  }

  // Line below field names
  doc
    .moveTo(x, yPosition + headerHeight)
    .lineTo(x + width, yPosition + headerHeight)
    .stroke();

  // Draw table rows
  let y = yPosition + headerHeight;

  rows.forEach((row) => {
    const rowHeight = 25;
    y += rowHeight;

    doc
      .fontSize(10)
      .font("Helvetica")
      .text(row.label, x + 5, y - rowHeight + 5);

    if (row.rightValue) {
      // Three-column layout
      doc
        .fontSize(10)
        .font("Helvetica")
        .text(row.value, x + 200, y - rowHeight + 5)
        .text(row.rightValue, x + 350, y - rowHeight + 5);
    } else {
      // Two-column layout
      doc
        .fontSize(10)
        .font("Helvetica")
        .text(row.value, x + leftColWidth + 5, y - rowHeight + 5, {
          align: "right",
          width: width - leftColWidth - 10,
        });
    }

    doc
      .moveTo(x, y)
      .lineTo(x + width, y)
      .stroke();
  });

  // Draw vertical lines
  doc.moveTo(x, yPosition).lineTo(x, y).stroke();

  if (rows[0] && rows[0].rightValue) {
    // Three columns - make lines start from title separator
    doc
      .moveTo(x + 190, titleSeparatorY)
      .lineTo(x + 190, y)
      .stroke()
      .moveTo(x + 340, titleSeparatorY)
      .lineTo(x + 340, y)
      .stroke();
  } else {
    // Two columns - make line start from title separator
    doc
      .moveTo(x + leftColWidth, titleSeparatorY)
      .lineTo(x + leftColWidth, y)
      .stroke();
  }

  doc
    .moveTo(x + width, yPosition)
    .lineTo(x + width, y)
    .stroke();

  doc.y = y + 5;
}

// Helper function to draw players table
function drawPlayersTable(doc, yPosition, title, players) {
  const width = 515;
  const x = 40;

  // Draw table header
  doc
    .moveTo(x, yPosition)
    .lineTo(x + width, yPosition)
    .stroke();

  doc
    .fontSize(10)
    .font("Helvetica-Bold")
    .text(title, x, yPosition + 5, { align: "center", width: width });

  // Add a line to separate the title from the column headers
  const titleSeparatorY = yPosition + 20;
  doc
    .moveTo(x, titleSeparatorY)
    .lineTo(x + width, titleSeparatorY)
    .stroke();

  // Column headers row
  const headerHeight = 40; // Increased to accommodate the title separator

  // Draw column headers
  doc
    .fontSize(9)
    .font("Helvetica-Bold")
    .text("Name", x + 5, titleSeparatorY + 5)
    .text("Location", x + 150, titleSeparatorY + 5)
    .text("Holes", x + 280, titleSeparatorY + 5)
    .text("ID", x + 400, titleSeparatorY + 5);

  // Line below column headers
  doc
    .moveTo(x, yPosition + headerHeight)
    .lineTo(x + width, yPosition + headerHeight)
    .stroke();

  // Draw table rows
  let y = yPosition + headerHeight;

  players.forEach((player) => {
    const rowHeight = 25;
    y += rowHeight;

    doc
      .fontSize(10)
      .font("Helvetica")
      .text(player.name, x + 5, y - rowHeight + 5)
      .text(player.location || "N/A", x + 150, y - rowHeight + 5)
      .text(player.hole || "18", x + 280, y - rowHeight + 5)
      .text(player.id, x + 400, y - rowHeight + 5);

    doc
      .moveTo(x, y)
      .lineTo(x + width, y)
      .stroke();
  });

  // Draw vertical lines
  doc.moveTo(x, yPosition).lineTo(x, y).stroke();

  // Column dividers - now start from the title separator line
  doc
    .moveTo(x + 140, titleSeparatorY)
    .lineTo(x + 140, y)
    .stroke();

  doc
    .moveTo(x + 270, titleSeparatorY)
    .lineTo(x + 270, y)
    .stroke();

  doc
    .moveTo(x + 390, titleSeparatorY)
    .lineTo(x + 390, y)
    .stroke();

  doc
    .moveTo(x + width, yPosition)
    .lineTo(x + width, y)
    .stroke();

  doc.y = y + 5;
}

// Helper function to draw price table
function drawPriceTable(doc, yPosition, title, rows, centeredTitle = true) {
  const width = 515;
  const leftColWidth = 380;
  const x = 40;

  // Draw table header
  doc
    .moveTo(x, yPosition)
    .lineTo(x + width, yPosition)
    .stroke();

  doc.fontSize(10).font("Helvetica-Bold");

  if (centeredTitle) {
    // Center the main title across the entire table
    doc.text(title, x, yPosition + 5, { align: "center", width: width });

    // Add "Amount" label in the second column
    doc
      .moveTo(x + leftColWidth, yPosition)
      .lineTo(x + leftColWidth, yPosition + 25)
      .stroke();

    doc.text("Amount", x + leftColWidth, yPosition + 5, {
      align: "center",
      width: width - leftColWidth,
    });
  } else {
    doc
      .text(title, x + 5, yPosition + 5)
      .text("Amount", x + leftColWidth + 50, yPosition + 5);
  }

  const headerHeight = 25;
  doc
    .moveTo(x, yPosition + headerHeight)
    .lineTo(x + width, yPosition + headerHeight)
    .stroke();

  // Draw table rows
  let y = yPosition + headerHeight;

  rows.forEach((row, index) => {
    const rowHeight = 25;
    y += rowHeight;

    // Use bold for the total row
    if (index === rows.length - 1) {
      doc.font("Helvetica-Bold");
    } else {
      doc.font("Helvetica");
    }

    doc
      .fontSize(10)
      .text(row.label, x + 5, y - rowHeight + 5)
      .text(row.value, x + leftColWidth + 5, y - rowHeight + 5, {
        align: "right",
        width: width - leftColWidth - 10,
      });

    doc
      .moveTo(x, y)
      .lineTo(x + width, y)
      .stroke();
  });

  // Draw vertical lines
  doc.moveTo(x, yPosition).lineTo(x, y).stroke();

  doc
    .moveTo(x + leftColWidth, yPosition)
    .lineTo(x + leftColWidth, y)
    .stroke();

  doc
    .moveTo(x + width, yPosition)
    .lineTo(x + width, y)
    .stroke();

  doc.y = y + 5;
}

// Helper function to draw company stamp
function drawStamp(doc, yPosition) {
  const centerX = 130;
  const radius = 40;

  // Draw circle
  doc.circle(centerX, yPosition + radius, radius).stroke();

  // Add company details inside stamp
  doc
    .fontSize(8)
    .font("Helvetica")
    .text("CIMSO GOLF", centerX - 30, yPosition + radius - 15)
    .text("Reg. No:", centerX - 25, yPosition + radius)
    .text("23446576554", centerX - 30, yPosition + radius + 10);

  // Add dotted line below stamp
  const lineY = yPosition + radius * 2 + 20;
  let dashX = 50;
  const lineWidth = 150;

  while (dashX < 50 + lineWidth) {
    doc
      .moveTo(dashX, lineY)
      .lineTo(dashX + 5, lineY)
      .stroke();
    dashX += 10;
  }

  // Add company name below dotted line
  doc
    .fontSize(8)
    .font("Helvetica")
    .text("CIMSO Golf Booking Pte. Ltd.", 50, lineY + 10);

  doc.y = lineY + 30;
}
