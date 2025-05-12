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
      {
        id: "bm-slim-2",
        name: "Charcoal Slim Fit Suit",
        description: "A versatile charcoal slim fit suit that projects confidence and professionalism.",
        imageUrl: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop",
        price: "$799",
        color: "Charcoal",
        fit: "Slim Fit",
      },
    ],
    "Regular Fit": [
      {
        id: "bm-reg-1",
        name: "Classic Regular Fit Gray Suit",
        description: "A timeless regular fit gray suit for a comfortable yet professional appearance.",
        imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1780&auto=format&fit=crop",
        price: "$849",
        color: "Gray",
        fit: "Regular Fit",
      },
    ],
  },
  Wedding: {
    "Slim Fit": [
      {
        id: "wed-slim-1",
        name: "Black Slim Fit Tuxedo",
        description: "An elegant black slim fit tuxedo perfect for formal weddings and special occasions.",
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1771&auto=format&fit=crop",
        price: "$1,199",
        color: "Black",
        fit: "Slim Fit",
      },
    ],
    "Regular Fit": [
      {
        id: "wed-reg-1",
        name: "Navy Regular Fit Tuxedo",
        description: "A sophisticated navy regular fit tuxedo for wedding celebrations.",
        imageUrl: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1780&auto=format&fit=crop",
        price: "$1,099",
        color: "Navy",
        fit: "Regular Fit",
      },
    ],
  },
  "Casual Event": {
    "Slim Fit": [
      {
        id: "cas-slim-1",
        name: "Beige Slim Fit Blazer",
        description: "A stylish beige slim fit blazer for casual events and social gatherings.",
        imageUrl: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=1974&auto=format&fit=crop",
        price: "$599",
        color: "Beige",
        fit: "Slim Fit",
      },
    ],
    "Regular Fit": [
      {
        id: "cas-reg-1",
        name: "Light Gray Regular Fit Blazer",
        description: "A comfortable light gray regular fit blazer for casual yet refined occasions.",
        imageUrl: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop",
        price: "$549",
        color: "Light Gray",
        fit: "Regular Fit",
      },
    ],
  },
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
  {
    id: "default-2",
    name: "Charcoal Gray Suit",
    description: "A timeless charcoal gray suit suitable for various events.",
    imageUrl: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1780&auto=format&fit=crop",
    price: "$749",
    color: "Charcoal",
    fit: "Regular Fit",
  },
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

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Get recommendations based on occasion and fit
    let recommendations: RecommendationItem[] = []

    if (mockRecommendations[formData.occasion]?.[formData.preferredFit]) {
      recommendations = mockRecommendations[formData.occasion][formData.preferredFit]
    } else {
      // Fallback to default recommendations
      recommendations = defaultRecommendations
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
