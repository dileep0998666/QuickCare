import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Review from "@/models/Review";

export async function POST(req: NextRequest) {
  await dbConnect();

  const data = await req.json();

  // Extract ID from the URL
  const urlParts = req.nextUrl.pathname.split("/");
  const hospitalId = urlParts[urlParts.indexOf("hospitals") + 1];

  const review = new Review({ ...data, hospitalId });
  await review.save();

  return NextResponse.json({ message: "Review submitted", review });
}

export async function GET(req: NextRequest) {
  await dbConnect();

  const urlParts = req.nextUrl.pathname.split("/");
  const hospitalId = urlParts[urlParts.indexOf("hospitals") + 1];

  const reviews = await Review.find({ hospitalId }).sort({ createdAt: -1 });

  return NextResponse.json({ reviews });
}
