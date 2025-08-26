import { type NextRequest, NextResponse } from "next/server"

const hospitalUrls: Record<string, string> = {
  hospa: "https://quickcare-hospa.onrender.com",
  hospb: "https://quickcare-hospb.onrender.com",
}

export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const hospitalId = params.id
    const hospitalUrl = hospitalUrls[hospitalId]

    console.log(`🏥 Hospital ID: ${hospitalId}`)
    console.log(`🔗 Hospital URL: ${hospitalUrl}`)

    if (!hospitalUrl) {
      return NextResponse.json(
        { error: "Hospital not found" },
        { status: 404 }
      )
    }

    const fullUrl = `${hospitalUrl}/api/doctors`
    console.log(`📡 Fetching from: ${fullUrl}`)

    const response = await fetch(fullUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Add timeout to prevent hanging
      signal: AbortSignal.timeout(10000), // 10 second timeout
    })

    console.log(`📊 Response status: ${response.status}`)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ Hospital API error: ${response.status} - ${errorText}`)
      throw new Error(`Hospital API error: ${response.status} - ${errorText}`)
    }

    const data = await response.json()
    console.log(`✅ Successfully fetched ${data.length || 0} doctors`)
    return NextResponse.json(data)
  } catch (error) {
    console.error("❌ Error fetching doctors:", error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json(
      { error: "Failed to fetch doctors", details: errorMessage },
      { status: 500 }
    )
  }
}
