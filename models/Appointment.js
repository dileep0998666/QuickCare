import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  userName: { type: String, required: true }, // For quick access
  userEmail: { type: String, required: true }, // For notifications
  hospitalId: { type: String, required: true },
  doctorId: { type: String, required: true },
  doctorName: { type: String, required: true },
  specialization: { type: String, required: true },

  // Patient details
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ["male", "female", "other"] },
  reason: { type: String, required: true },
  location: { type: String, required: true },

  // Appointment details
  fee: { type: Number, required: true },
  currency: { type: String, default: "INR" },
  transactionId: { type: String, required: true },
  queuePosition: { type: Number },
  estimatedWaitTime: { type: String },

  // Status tracking
  status: {
    type: String,
    enum: ["booked", "confirmed", "in-progress", "completed", "cancelled"],
    default: "booked",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "completed", "failed", "refunded"],
    default: "completed",
  },

  // Timestamps
  appointmentDate: { type: Date, default: Date.now },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
})

// Update the updatedAt field before saving
appointmentSchema.pre("save", function (next) {
  this.updatedAt = Date.now()
  next()
})

export default mongoose.models.Appointment || mongoose.model("Appointment", appointmentSchema)
