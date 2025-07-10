import mongoose, { Schema, model, models } from "mongoose";

const reviewSchema = new Schema(
  {
    hospitalId: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String },
  },
  { timestamps: true }
);

const Review = models.Review || model("Review", reviewSchema);
export default Review;
