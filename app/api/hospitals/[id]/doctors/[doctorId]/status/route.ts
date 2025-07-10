import { type NextRequest, NextResponse } from "next/server"

const hospitalUrls: Record<string, string> = {
  hospa: "https://quickcare-hospa-production.up.railway.app",
  hospb: "https://quickcare-hospb-production.up.railway.app",
}

export async function GET(request: NextRequest, { params }: { params: { id: string; doctorId: string } }) {
  try {
    const hospitalId = params.id
    const doctorId = params.doctorId
    const hospitalUrl = hospitalUrls[hospitalId]

    if (!hospitalUrl) {
      return NextResponse.json({ error: "Hospital not found" }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const name = searchParams.get("name")

    if (!name) {
      return NextResponse.json({ error: "Patient name is required" }, { status: 400 })
    }

    const response = await fetch(`${hospitalUrl}/api/doctors/${doctorId}/status?name=${encodeURIComponent(name)}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    if (!response.ok) {
      throw new Error(`Hospital API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error checking status:", error)
    return NextResponse.json({ error: "Failed to check status", details: error.message }, { status: 500 })
  }
}
