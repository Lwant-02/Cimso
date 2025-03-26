import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

import { connectDB } from "./lib/db.js";
import { authRouter } from "./route/auths.route.js";
import { bookingRouter } from "./route/bookings.route.js";
import { chatBotRouter } from "./route/chat-bot.route.js";
import { courseRouter } from "./route/courses.route.js";
import { sendMailRouter } from "./route/send-mail.route.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
const __dirname = path.resolve();

// Middleware
app.use(cors({ origin: "http://localhost:3001", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/v1/api/auths", authRouter);
app.use("/v1/api/bookings", bookingRouter);
app.use("/v1/api/chat", chatBotRouter);
app.use("/v1/api/courses", courseRouter);
app.use("/v1/api/emails", sendMailRouter);

// Serve static files from the build directory
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
  connectDB();
});
