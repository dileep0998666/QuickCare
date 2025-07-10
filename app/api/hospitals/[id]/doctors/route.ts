import { type NextRequest, NextResponse } from "next/server"

const hospitalUrls: Record<string, string> = {
  hospa: "https://quickcare-hospa-production.up.railway.app",
  hospb: "https://quickcare-hospb-production.up.railway.app",
}

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const hospitalId = params.id
    const hospitalUrl = hospitalUrls[hospitalId]

    if (!hospitalUrl) {
      return NextResponse.json({ error: "Hospital not found" }, { status: 404 })
    }

    const response = await fetch(`${hospitalUrl}/api/doctors`, {
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
    console.error("Error fetching doctors:", error)
    return NextResponse.json({ error: "Failed to fetch doctors", details: error.message }, { status: 500 })
  }
}
