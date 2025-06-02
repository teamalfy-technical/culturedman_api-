// // File: /pages/api/stylist.js
// export default async function handler(req, res) {
//   if (req.method !== 'POST') return res.status(405).end();

//   try {
//     const webhookURL = process.env.N8N_WEBHOOK_URL;

//     const n8nRes = await fetch(webhookURL, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(req.body),
//     });

//     const data = await n8nRes.json();
//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to connect to stylist engine.' });
//   }
// }
// File: /pages/api/stylist.ts
export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const webhookURL = process.env.N8N_WEBHOOK_URL;

    if (!webhookURL) {
      console.error("❌ Missing N8N_WEBHOOK_URL in env");
      return res.status(500).json({ error: "Missing webhook URL" });
    }

    const response = await fetch(webhookURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body),
    });

    const body = await response.text(); // capture full response (even non-JSON)

    console.log("📡 Webhook Response Status:", response.status);
    console.log("📡 Webhook Response Body:", body);

    if (!response.ok) {
      return res.status(500).json({
        error: "n8n webhook failed",
        status: response.status,
        body,
      });
    }

    return res.status(200).json(JSON.parse(body));
  } catch (error) {
    console.error("❌ Stylist API error:", error);
    return res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
}
