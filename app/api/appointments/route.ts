import { NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import Appointment from "@/models/Appointment";

export async function POST(req: Request) {
  await dbConnect();
  const data = await req.json();
  const appointment = new Appointment(data);
  await appointment.save();
  return NextResponse.json(appointment);
}

export async function GET() {
  await dbConnect();
  const appointments = await Appointment.find({});
  return NextResponse.json(appointments);
}
