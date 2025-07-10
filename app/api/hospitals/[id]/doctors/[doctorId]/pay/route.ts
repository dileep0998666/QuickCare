import { type NextRequest, NextResponse } from "next/server"

const hospitalUrls: Record<string, string> = {
  hospa: "https://quickcare-hospa-production.up.railway.app",
  hospb: "https://quickcare-hospb-production.up.railway.app",
}

export async function POST(request: NextRequest, { params }: { params: { id: string; doctorId: string } }) {
  try {
    const hospitalId = params.id
    const doctorId = params.doctorId
    const hospitalUrl = hospitalUrls[hospitalId]

    if (!hospitalUrl) {
      return NextResponse.json({ error: "Hospital not found" }, { status: 404 })
    }

    const body = await request.json()

    const response = await fetch(`${hospitalUrl}/api/doctors/${doctorId}/pay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      return NextResponse.json({ error: "Payment failed", details: errorData }, { status: response.status })
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error processing payment:", error)
    return NextResponse.json({ error: "Failed to process payment", details: error.message }, { status: 500 })
  }
}
