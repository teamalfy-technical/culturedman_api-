import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const webhookURL = process.env.N8N_WEBHOOK_URL

    if (!webhookURL) {
      console.error("❌ Missing N8N_WEBHOOK_URL in env")
      return NextResponse.json({ error: "Missing webhook URL" }, { status: 500 })
    }

    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    const text = await response.text() // n8n may not return valid JSON

    console.log("📡 Webhook Response Status:", response.status)
    console.log("📡 Webhook Response Body:", text)

    if (!response.ok) {
      return NextResponse.json(
        { error: "n8n webhook failed", status: response.status, body: text },
        { status: 500 }
      )
    }

    try {
      const parsed = JSON.parse(text)
      return NextResponse.json(parsed, { status: 200 })
    } catch {
      return NextResponse.json({ result: text }, { status: 200 })
    }
  } catch (error) {
    console.error("❌ Stylist API error:", error)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
