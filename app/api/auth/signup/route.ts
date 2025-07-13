import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import User from "@/models/User"
import { createAuthResponse } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    const { name, email, password, phone } = await request.json()

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json({ success: false, message: "Name, email, and password are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Password must be at least 6 characters long" },
        { status: 400 },
      )
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() })
    if (existingUser) {
      return NextResponse.json({ success: false, message: "User with this email already exists" }, { status: 409 })
    }

    // Create new user
    const user = await User.create({
      name: name.trim(),
      email: email.toLowerCase(),
      password,
      phone: phone?.trim(),
    })

    return createAuthResponse(user, "Account created successfully")
  } catch (error: any) {
    console.error("Signup error:", error)

    if (error.code === 11000) {
      return NextResponse.json({ success: false, message: "Email already exists" }, { status: 409 })
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err: any) => err.message)
      return NextResponse.json({ success: false, message: messages.join(", ") }, { status: 400 })
    }

    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
