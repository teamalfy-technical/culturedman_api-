"use server"

import { sendToWebhook } from "@/lib/webhook-utils"

export async function testN8nWebhook(): Promise<{ success: boolean; message: string }> {
  try {
    const webhookUrl = process.env.N8N_WEBHOOK_URL

    if (!webhookUrl) {
      return {
        success: false,
        message: "N8N_WEBHOOK_URL environment variable is not set",
      }
    }

    const testData = {
      test: true,
      message: "This is a test from the AI Stylist application",
      timestamp: new Date().toISOString(),
    }

    const response = await sendToWebhook(webhookUrl, testData, process.env.N8N_API_KEY)

    if (!response.ok) {
      return {
        success: false,
        message: `Error: ${response.status} ${response.statusText}`,
      }
    }

    return {
      success: true,
      message: "Successfully connected to n8n webhook",
    }
  } catch (error) {
    console.error("Error testing n8n webhook:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}
