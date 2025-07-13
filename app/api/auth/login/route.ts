import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import User from "@/models/User"
import { createAuthResponse } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const { email, password } = await request.json()

    // Validation
    if (!email || !password) {
      return NextResponse.json({ success: false, message: "Email and password are required" }, { status: 400 })
    }

    // Find user and include password for comparison
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password")

    if (!user) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
      return NextResponse.json({ success: false, message: "Invalid email or password" }, { status: 401 })
    }

    return createAuthResponse(user, "Login successful")
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
