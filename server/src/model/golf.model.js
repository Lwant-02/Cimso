import mongoose from "mongoose";

const golfSchema = new mongoose.Schema(
  {
    courseName: { type: String, required: true },
    subDescription: { type: String, required: true },
    yard: { type: String, required: true },
    location: {
      city: { type: String, required: true },
      country: { type: String, required: true },
    },
    description: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    discount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Golf = mongoose.models.Golf || mongoose.model("Golf", golfSchema);
