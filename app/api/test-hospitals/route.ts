import { NextResponse } from 'next/server';

const hospitalUrls: Record<string, string> = {
  hospa: "https://quickcare-hospa.onrender.com",
  hospb: "https://quickcare-hospb.onrender.com",
}

export async function GET() {
  const results = [];

  for (const [hospitalId, hospitalUrl] of Object.entries(hospitalUrls)) {
    try {
      console.log(`Testing ${hospitalId}: ${hospitalUrl}`);
      
      const response = await fetch(`${hospitalUrl}/api/doctors`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(10000),
      });

      results.push({
        hospitalId,
        hospitalUrl,
        status: response.status,
        ok: response.ok,
        statusText: response.statusText,
        accessible: response.ok
      });

    } catch (error) {
      results.push({
        hospitalId,
        hospitalUrl,
        error: error instanceof Error ? error.message : String(error),
        accessible: false
      });
    }
  }

  return NextResponse.json({ results });
}