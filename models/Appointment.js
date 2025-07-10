const appointmentSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  hospitalId: { type: String, required: true },
  doctorId: { type: String },
  date: { type: Date, required: true },
  symptoms: { type: String },
  status: { type: String, enum: ['booked', 'completed', 'cancelled'], default: 'booked' },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.models.Appointment || mongoose.model('Appointment', appointmentSchema)
