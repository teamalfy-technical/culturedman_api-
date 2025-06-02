import { type NextRequest, NextResponse } from "next/server"
import { sendToN8nStylist } from "@/lib/n8n-client"

export async function POST(request: NextRequest) {
  try {
    // Test data
    const testData = {
      firstName: "John",
      lastName: "Doe",
      height: 180,
      weight: 75,
      preferredFit: "Slim Fit",
      occasion: "Business Meeting",
      timestamp: new Date().toISOString(),
      source: "test-endpoint",
    }

    console.log("Testing n8n webhook with data:", testData)

    const result = await sendToN8nStylist(testData)

    return NextResponse.json({
      success: true,
      message: "n8n webhook test successful",
      n8nResponse: result,
    })
  } catch (error) {
    console.error("n8n webhook test failed:", error)

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred",
      },
      { status: 500 },
    )
  }
}

export async function GET() {
  return NextResponse.json({
    message: "Use POST method to test n8n webhook",
    testEndpoint: "/api/test-n8n",
    method: "POST",
  })
}
