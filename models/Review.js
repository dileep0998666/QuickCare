import mongoose, { Schema, model, models } from "mongoose"

const reviewSchema = new Schema(
  {
    hospitalId: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    userName: { type: String, required: true }, // For display purposes
    rating: {
      type: Number,
      required: true,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating cannot exceed 5"],
    },
    comment: {
      type: String,
      maxLength: [500, "Comment cannot exceed 500 characters"],
    },
    // Prevent duplicate reviews
    isVerified: { type: Boolean, default: false }, // Future: verify if user actually visited
  },
  {
    timestamps: true,
  },
)

// Create compound index to prevent duplicate reviews from same user for same hospital
reviewSchema.index({ hospitalId: 1, userId: 1 }, { unique: true })

const Review = models.Review || model("Review", reviewSchema)
export default Review
