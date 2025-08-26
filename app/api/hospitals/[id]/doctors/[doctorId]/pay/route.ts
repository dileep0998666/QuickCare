import { type NextRequest, NextResponse } from "next/server"

const hospitalUrls: Record<string, string> = {
  hospa: "https://quickcare-hospa.onrender.com",
  hospb: "https://quickcare-hospb.onrender.com",
}

export async function POST(request: NextRequest, { params }: { params: { id: string; doctorId: string } }) {
  try {
    const hospitalId = params.id
    const doctorId = params.doctorId
    const hospitalUrl = hospitalUrls[hospitalId]

    console.log(`💳 Payment request - Hospital: ${hospitalId}, Doctor: ${doctorId}`)
    console.log(`🔗 Payment URL: ${hospitalUrl}`)

    if (!hospitalUrl) {
      return NextResponse.json({ error: "Hospital not found" }, { status: 404 })
    }

    const body = await request.json()
    console.log(`📝 Payment data:`, body)

    const fullUrl = `${hospitalUrl}/api/doctors/${doctorId}/pay`
    console.log(`📡 Posting to: ${fullUrl}`)

    const response = await fetch(fullUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(15000), // 15 second timeout for payments
    })

    console.log(`📊 Payment response status: ${response.status}`)

    if (!response.ok) {
      const errorText = await response.text()
      console.error(`❌ Payment failed: ${response.status} - ${errorText}`)
      
      let errorData = {}
      try {
        errorData = JSON.parse(errorText)
      } catch {
        errorData = { message: errorText }
      }
      
      return NextResponse.json({ 
        error: "Payment failed", 
        details: errorData,
        status: response.status 
      }, { status: response.status })
    }

    const data = await response.json()
    console.log(`✅ Payment successful:`, data)
    return NextResponse.json(data)
  } catch (error) {
    console.error("❌ Error processing payment:", error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ 
      error: "Failed to process payment", 
      details: errorMessage 
    }, { status: 500 })
  }
}
