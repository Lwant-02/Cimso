import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    fullName: { type: String, required: true },
    password: { type: String, required: true, minLength: 8 },
    profilePic: { type: String, default: "" },
    phone: { type: String, default: "" },
  },
  { timestamps: true }
);

export const User = mongoose.models.user || mongoose.model("user", userSchema);
