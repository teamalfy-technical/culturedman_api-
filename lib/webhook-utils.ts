/**
 * Utility functions for working with webhooks
 */

/**
 * Sends data to a webhook URL
 *
 * @param url The webhook URL
 * @param data The data to send
 * @param apiKey Optional API key for authentication
 * @returns Response from the webhook
 */
export async function sendToWebhook(url: string, data: any, apiKey?: string): Promise<Response> {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  }

  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`
  }

  return fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(data),
  })
}

/**
 * Formats data for n8n webhook
 *
 * @param data The raw data
 * @param additionalFields Additional fields to include
 * @returns Formatted data for n8n
 */
export function formatN8nData(data: any, additionalFields: Record<string, any> = {}): Record<string, any> {
  return {
    ...data,
    timestamp: new Date().toISOString(),
    source: "ai-stylist-form",
    ...additionalFields,
  }
}
