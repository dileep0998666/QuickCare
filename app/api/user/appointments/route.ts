import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Appointment from "@/models/Appointment"
import { getUserFromRequest } from "@/lib/auth"

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromRequest(request)

    if (!user) {
      return NextResponse.json({ success: false, message: "Not authenticated" }, { status: 401 })
    }

    await dbConnect()

    const appointments = await Appointment.find({ userId: user._id }).sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      appointments,
    })
  } catch (error) {
    console.error("Error fetching user appointments:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
