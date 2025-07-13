import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/dbConnect"
import Review from "@/models/Review"
import { getUserFromRequest } from "@/lib/auth"

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromRequest(req)

    if (!user) {
      return NextResponse.json({ success: false, message: "Please log in to submit a review" }, { status: 401 })
    }

    await dbConnect()

    const data = await req.json()

    // Extract ID from the URL
    const urlParts = req.nextUrl.pathname.split("/")
    const hospitalId = urlParts[urlParts.indexOf("hospitals") + 1]

    // Check if user already reviewed this hospital
    const existingReview = await Review.findOne({
      hospitalId,
      userId: user._id,
    })

    if (existingReview) {
      return NextResponse.json({ success: false, message: "You have already reviewed this hospital" }, { status: 409 })
    }

    const review = new Review({
      ...data,
      hospitalId,
      userId: user._id,
      userName: user.name,
    })

    await review.save()

    return NextResponse.json({
      success: true,
      message: "Review submitted successfully",
      review,
    })
  } catch (error) {
    console.error("Error submitting review:", error)

    if (error.code === 11000) {
      return NextResponse.json({ success: false, message: "You have already reviewed this hospital" }, { status: 409 })
    }

    return NextResponse.json({ success: false, message: "Failed to submit review" }, { status: 500 })
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect()

    const urlParts = req.nextUrl.pathname.split("/")
    const hospitalId = urlParts[urlParts.indexOf("hospitals") + 1]

    const reviews = await Review.find({ hospitalId }).sort({ createdAt: -1 }).populate("userId", "name", "User")

    return NextResponse.json({
      success: true,
      reviews,
    })
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ success: false, message: "Failed to fetch reviews" }, { status: 500 })
  }
}
