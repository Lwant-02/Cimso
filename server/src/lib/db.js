import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATA_BASE_URL);
    console.log("Successfully connected to database.");
  } catch (error) {
    console.error("Error connecting to database:", error.message);
    process.exit(1);
  }
};
