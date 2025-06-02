"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { PageLayout } from "@/components/page-layout"
import { ChevronDown, Loader2 } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { submitStylistForm } from "@/app/actions/stylist-actions"
import type { StylistResult } from "@/app/actions/stylist-actions"

export default function AiStylistPage() {
  // Initialize state with empty values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    height: "",
    weight: "",
    preferredFit: "",
    occasion: "",
  })

  const [preferredFitOpen, setPreferredFitOpen] = useState(false)
  const [occasionOpen, setOccasionOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [result, setResult] = useState<StylistResult | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  // Add this useEffect to prevent hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateForm = () => {
    if (!formData.firstName) return "First name is required"
    if (!formData.lastName) return "Last name is required"
    if (!formData.height) return "Height is required"
    if (!formData.weight) return "Weight is required"
    if (!formData.preferredFit) return "Preferred fit is required"
    if (!formData.occasion) return "Occasion is required"
    return null
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    const error = validateForm()
    if (error) {
      setFormError(error)
      return
    }

    setFormError(null)
    setIsSubmitting(true)

    try {
      // Use a try-catch to handle potential errors from the server action
      const result = await submitStylistForm(formData)
      setResult(result)

      if (!result.success) {
        setFormError(result.error || "An error occurred")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
      setFormError("An unexpected error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  // Return early if not mounted to prevent hydration errors
  if (!isMounted) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
        </div>
      </PageLayout>
    )
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Main heading */}
        <h1 className="text-3xl md:text-4xl text-black font-bold text-center mb-8">Your Personal AI Stylist</h1>

        {/* Description paragraph */}
        <div className="max-w-4xl mx-auto text-center mb-8">
          <p className="text-gray-700">
            At The Cultured Man, We Believe That True Style Goes Beyond Just Wearing A Well-Tailored Suit—It's About
            Expressing Confidence, Sophistication, And Individuality. To Help You Achieve The Perfect Look, We Offer An
            AI-Powered Style Advisor And Expert Styling Services Tailored To Your Needs.
          </p>
        </div>

        {/* Quick link to recommendations */}
        {/* <div className="max-w-4xl mx-auto text-center mb-16">
          <Link href="/pages/ai-recommendations">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white py-2 px-6 rounded-full"
            >
              View AI Recommendations
            </motion.button>
          </Link>
        </div> */}

        {!result?.success ? (
          /* Stylist Form */
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* First Name */}
              <div className="form-group">
                <label htmlFor="firstName" className="block text-black font-medium mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full border-b border-black py-2 focus:outline-none focus:border-black bg-transparent text-black"
                  required
                />
              </div>

              {/* Last Name */}
              <div className="form-group">
                <label htmlFor="lastName" className="block text-black font-medium mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full border-b border-black py-2 focus:outline-none focus:border-black bg-transparent text-black"
                  required
                />
              </div>

              {/* Height */}
              <div className="form-group">
                <label htmlFor="height" className="block text-black font-medium mb-2">
                  Height (cm)
                </label>
                <input
                  type="number"
                  id="height"
                  name="height"
                  value={formData.height}
                  onChange={handleChange}
                  className="w-full border-b border-black py-2 focus:outline-none focus:border-black bg-transparent text-black"
                  required
                />
              </div>

              {/* Weight */}
              <div className="form-group">
                <label htmlFor="weight" className="block text-black font-medium mb-2">
                  Weight (Kg)
                </label>
                <input
                  type="number"
                  id="weight"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  className="w-full border-b border-black py-2 focus:outline-none focus:border-black bg-transparent text-black"
                  required
                />
              </div>

              {/* Preferred Fit */}
              <div className="form-group">
                <label htmlFor="preferredFit" className="block text-black font-medium mb-2">
                  Preferred Fit
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setPreferredFitOpen(!preferredFitOpen)}
                    className="w-full border-b border-black py-2 text-left flex justify-between items-center focus:outline-none focus:border-black bg-transparent text-black"
                  >
                    <span>{formData.preferredFit || "Select fit"}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {preferredFitOpen && (
                    <div className="absolute z-10 w-full bg-white shadow-lg mt-1">
                      {["Slim Fit", "Regular Fit", "Relaxed Fit", "Tailored Fit"].map((fit) => (
                        <div
                          key={fit}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                          onClick={() => {
                            handleSelectChange("preferredFit", fit)
                            setPreferredFitOpen(false)
                          }}
                        >
                          {fit}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Occasion */}
              <div className="form-group">
                <label htmlFor="occasion" className="block text-black font-medium mb-2">
                  Occasion
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOccasionOpen(!occasionOpen)}
                    className="w-full border-b border-black py-2 text-left flex justify-between items-center focus:outline-none focus:border-black bg-transparent text-black"
                  >
                    <span>{formData.occasion || "Select occasion"}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {occasionOpen && (
                    <div className="absolute z-10 w-full bg-white shadow-lg mt-1">
                      {["Business Meeting", "Wedding", "Casual Event", "Formal Dinner", "Interview", "Date Night"].map(
                        (occasion) => (
                          <div
                            key={occasion}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                            onClick={() => {
                              handleSelectChange("occasion", occasion)
                              setOccasionOpen(false)
                            }}
                          >
                            {occasion}
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Form Error */}
              {formError && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{formError}</div>}

              {/* Submit Button */}
              <div className="mt-12 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white py-3 px-8 rounded-full flex items-center justify-center disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      <span>PROCESSING...</span>
                    </>
                  ) : (
                    <>
                      <span className="mr-2">GET RECOMMENDATIONS</span>
                      <span className="arrow-line"></span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Recommendations */
          <div className="text-center">
            <p className="mb-8">{result.message}</p>
            <Link href="/pages/ai-recommendation">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white py-3 px-8 rounded-full"
              >
                View Recommendations
              </motion.button>
            </Link>
          </div>
        )}
      </div>
    </PageLayout>
  )
}
