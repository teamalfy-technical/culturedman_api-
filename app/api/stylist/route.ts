import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const webhookURL = process.env.N8N_WEBHOOK_URL

    console.log("🧪 Env webhook URL:", webhookURL)
    console.log("📤 Request body:", body)

    if (!webhookURL) {
      return NextResponse.json({ error: "Missing webhook URL" }, { status: 500 })
    }

    const n8nRes = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    const raw = await n8nRes.text()

    console.log("📡 Webhook response status:", n8nRes.status)
    console.log("📡 Webhook response body:", raw)

    if (!n8nRes.ok) {
      return NextResponse.json(
        { error: "n8n webhook failed", status: n8nRes.status, body: raw },
        { status: 500 }
      )
    }

    try {
      return NextResponse.json(JSON.parse(raw), { status: 200 })
    } catch {
      return NextResponse.json({ result: raw }, { status: 200 })
    }
  } catch (err: any) {
    console.error("❌ Stylist route error:", err)
    return NextResponse.json(
      {
        error: "Internal server error",
        message: err.message || "Unknown error",
      },
      { status: 500 }
    )
  }
}
