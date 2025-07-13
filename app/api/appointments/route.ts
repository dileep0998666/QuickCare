import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Appointment from "@/models/Appointment"
import { getUserFromRequest } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)

    if (!user) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    }

    await dbConnect()
    const data = await req.json()

    // Ensure the appointment is associated with the authenticated user
    const appointmentData = {
      ...data,
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
    }

    const appointment = new Appointment(appointmentData)
    await appointment.save()

    return NextResponse.json({
      success: true,
      appointment,
    })
  } catch (error) {
    console.error("Error creating appointment:", error)
    return NextResponse.json({ success: false, message: "Failed to create appointment" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)

    if (!user) {
      return NextResponse.json({ success: false, message: "Authentication required" }, { status: 401 })
    }

    await dbConnect()

    // Only return appointments for the authenticated user
    const appointments = await Appointment.find({ userId: user._id }).sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      appointments,
    })
  } catch (error) {
    console.error("Error fetching appointments:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch appointments" }, { status: 500 })
  }
}
