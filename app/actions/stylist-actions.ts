"use server"

import { revalidatePath } from "next/cache"

export type StylistFormData = {
  firstName: string
  lastName: string
  height: string
  weight: string
  preferredFit: string
  occasion: string
}

export type RecommendationItem = {
  id: string
  name: string
  description: string
  imageUrl: string
  price: string
  color: string
  fit: string
}

export type StylistResult = {
  success: boolean
  message?: string
  recommendations?: RecommendationItem[]
  error?: string
}

// Mock recommendations based on occasion and fit
const mockRecommendations: Record<string, Record<string, RecommendationItem[]>> = {
  "Business Meeting": {
    "Slim Fit": [
      {
        id: "bm-slim-1",
        name: "Modern Slim Fit Navy Suit",
        description: "A contemporary slim fit navy suit perfect for business meetings and professional settings.",
        imageUrl: "https://images.unsplash.com/photo-1593032465175-481ac7f401f0?q=80&w=1780&auto=format&fit=crop",
        price: "$899",
        color: "Navy",
        fit: "Slim Fit",
      },
      // Other items...
    ],
    // Other fits...
  },
  // Other occasions...
}

// Default recommendations if no match is found
const defaultRecommendations: RecommendationItem[] = [
  {
    id: "default-1",
    name: "Classic Navy Suit",
    description: "A versatile navy suit that works for almost any occasion.",
    imageUrl: "https://images.unsplash.com/photo-1593032465175-481ac7f401f0?q=80&w=1780&auto=format&fit=crop",
    price: "$799",
    color: "Navy",
    fit: "Regular Fit",
  },
  // Other default items...
]

export async function submitStylistForm(formData: StylistFormData): Promise<StylistResult> {
  try {
    // Validate form data
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.height ||
      !formData.weight ||
      !formData.preferredFit ||
      !formData.occasion
    ) {
      return {
        success: false,
        error: "All fields are required",
      }
    }

    // Get recommendations based on occasion and fit
    let recommendations: RecommendationItem[] = []

    if (mockRecommendations[formData.occasion]?.[formData.preferredFit]) {
      recommendations = mockRecommendations[formData.occasion][formData.preferredFit]
    } else {
      // Fallback to default recommendations
      recommendations = defaultRecommendations
    }

    // Send data to n8n webhook
    try {
      const webhookUrl = process.env.N8N_WEBHOOK_URL

      if (!webhookUrl) {
        console.error("N8N_WEBHOOK_URL environment variable is not set")
        // Continue with the flow even if webhook URL is not set
      } else {
        // Prepare data for n8n
        const n8nData = {
          ...formData,
          timestamp: new Date().toISOString(),
          recommendationCount: recommendations.length,
          recommendationIds: recommendations.map((rec) => rec.id),
        }

        // Send data to n8n webhook
        const response = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.N8N_API_KEY || ""}`, // Include API key if available
          },
          body: JSON.stringify(n8nData),
        })

        if (!response.ok) {
          console.error(`Error sending data to n8n: ${response.status} ${response.statusText}`)
          // Continue with the flow even if webhook call fails
        }
      }
    } catch (webhookError) {
      console.error("Error sending data to n8n webhook:", webhookError)
      // Continue with the flow even if webhook call fails
    }

    // Revalidate the path to ensure fresh data
    revalidatePath("/pages/ai-stylist")

    return {
      success: true,
      message: `Thank you, ${formData.firstName}! Here are your personalized recommendations.`,
      recommendations,
    }
  } catch (error) {
    console.error("Error submitting stylist form:", error)
    return {
      success: false,
      error: "An error occurred while processing your request. Please try again.",
    }
  }
}
