"use client"

import { PageLayout } from "@/components/page-layout"
import { ChevronDown, Loader2 } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

type FormData = {
  firstName: string
  lastName: string
  height: string
  weight: string
  preferredFit: string
  occasion: string
}

export function AiStylist() {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    height: "",
    weight: "",
    preferredFit: "",
    occasion: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const res = await fetch("/api/stylist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      const responseText = await res.text()
      console.log("❌ API status:", res.status)
      console.log("❌ API response:", responseText)

      if (!res.ok) throw new Error("Failed to get stylist response")

      // Store formData for use in AI Recommendation page
      localStorage.setItem("stylistFormData", JSON.stringify(formData))

      try {
        const result = JSON.parse(responseText)
        console.log("✅ Parsed result:", result)
        localStorage.setItem("stylistResult", JSON.stringify(result))
      } catch {
        console.warn("⚠️ Response was not valid JSON")
      }

      router.push("/pages/ai-recommendation")
    } catch (err) {
      console.error(err)
      setError("An error occurred while submitting your request.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageLayout>
      <div className="container mx-auto md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="py-10 md:py-12 px-4 md:px-8 text-center"
        >
          <h1 className="text-3xl md:text-4xl text-black font-bold text-center mb-8">Your Personal AI Stylist</h1>

          <div className="max-w-4xl mx-auto text-center mb-8">
            <p className="text-gray-700">
              At The Cultured Man, we believe that true style goes beyond just wearing a well-tailored suit—it’s about
              expressing confidence, sophistication, and individuality. To help you achieve the perfect look, we offer
              an AI-powered style advisor and expert styling services tailored to your needs.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto text-left space-y-6 text-black">
            <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} className="w-full px-4 py-4 border-b border-black bg-white text-black placeholder:text-black" required />
            <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} className="w-full px-4 py-4 border-b border-black bg-white text-black placeholder:text-black" required />
            <input type="text" name="height" placeholder="Height (cm)" value={formData.height} onChange={handleChange} className="w-full px-4 py-4 border-b border-black bg-white text-black placeholder:text-black" required />
            <input type="text" name="weight" placeholder="Weight (kg)" value={formData.weight} onChange={handleChange} className="w-full px-4 py-4 border-b border-black bg-white text-black placeholder:text-black" required />

            <select name="preferredFit" value={formData.preferredFit} onChange={handleChange} className="w-full px-4 py-4 border-b border-black bg-white text-black placeholder:text-black" required>
              <option value="">Select Preferred Fit</option>
              <option value="Slim Fit">Slim Fit</option>
              <option value="Regular Fit">Regular Fit</option>
              <option value="Loose Fit">Loose Fit</option>
            </select>

            <select name="occasion" value={formData.occasion} onChange={handleChange} className="w-full px-4 py-4 border-b border-black bg-white text-black placeholder:text-black" required>
              <option value="">Select Occasion</option>
              <option value="Corporate">Corporate</option>
              <option value="Red Carpet">Red Carpet</option>
              <option value="Wedding">Wedding</option>
            </select>

            <div className="flex items-center text-center justify-center">
              <button
                type="submit"
                disabled={loading}
                className="group bg-black text-white px-6 py-3 flex items-center justify-center rounded-full hover:bg-neutral-900"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Analyzing...
                  </>
                ) : (
                  <>
                    Get Recommendations
                    <span className="arrow-line ml-2 transition-transform duration-200 ease-in-out group-hover:translate-x-1"></span>
                  </>
                )}
              </button>

              {/* <button type="submit" disabled={loading} className="bg-black text-white px-6 py-3 flex items-center justify-center rounded-full">
                {loading ? <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Submitting...</> : "Get Recommendations"}
              </button> */}
            </div>

            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
          </form>
        </motion.div>
      </div>
    </PageLayout>
  )
}
