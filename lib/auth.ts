import jwt from "jsonwebtoken"
import type { NextRequest } from "next/server"
import User from "@/models/User"
import dbConnect from "@/lib/dbConnect"

const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production"

export interface JWTPayload {
  userId: string
  email: string
  name: string
  role: string
}

export function generateToken(payload: JWTPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" })
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload
  } catch (error) {
    return null
  }
}

export async function getUserFromRequest(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value

    if (!token) {
      return null
    }

    const payload = verifyToken(token)
    if (!payload) {
      return null
    }

    await dbConnect()
    const user = await User.findById(payload.userId)

    return user
  } catch (error) {
    console.error("Error getting user from request:", error)
    return null
  }
}

export function createAuthResponse(user: any, message = "Success") {
  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    name: user.name,
    role: user.role,
  })

  const response = new Response(
    JSON.stringify({
      success: true,
      message,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    },
  )

  // Set HTTP-only cookie
  response.headers.set(
    "Set-Cookie",
    `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  )

  return response
}
