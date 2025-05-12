"use client"

import type React from "react"

import { useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { ChevronDown, Calendar, Clock, ArrowRight, Loader2 } from "lucide-react"
import { submitAppointmentForm } from "@/app/actions/appointment-actions"
import { AppointmentConfirmation } from "@/components/appointment-confirmation"
import type { AppointmentResult } from "@/app/actions/appointment-actions"

export default function ScheduleAppointmentPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    preferredContact: "",
    appointmentDate: "",
    appointmentTime: "",
    forSomeoneElse: "",
    hearAboutUs: "",
  })

  const [preferredContactOpen, setPreferredContactOpen] = useState(false)
  const [hearAboutUsOpen, setHearAboutUsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [result, setResult] = useState<AppointmentResult | null>(null)

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
    if (!formData.email) return "Email is required"
    if (!formData.phone) return "Phone number is required"
    if (!formData.preferredContact) return "Preferred contact method is required"
    if (!formData.appointmentDate) return "Appointment date is required"
    if (!formData.appointmentTime) return "Appointment time is required"
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
      const result = await submitAppointmentForm(formData)
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

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        {/* Main heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Schedule An Appointment</h1>

        {/* Description paragraph */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-gray-700">
            At The Cultured Man, We Understand That True Luxury Is In The Details. Whether You're Looking For A
            Perfectly Tailored Suit, Style Consultation, Or Personalized Shopping Experience, Our Appointment-Based
            Services Ensure You Receive The Undivided Attention And Expertise You Deserve.
          </p>
        </div>

        {!result?.success ? (
          /* Appointment Form */
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

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email" className="block text-black font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border-b border-black py-2 focus:outline-none focus:border-black bg-transparent text-black"
                  required
                />
              </div>

              {/* Phone */}
              <div className="form-group">
                <label htmlFor="phone" className="block text-black font-medium mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border-b border-black py-2 focus:outline-none focus:border-black bg-transparent text-black"
                  required
                />
              </div>

              {/* Preferred Method Of Contact */}
              <div className="form-group">
                <label htmlFor="preferredContact" className="block text-black font-medium mb-2">
                  Preferred Method Of Contact
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setPreferredContactOpen(!preferredContactOpen)}
                    className="w-full border-b border-black py-2 text-left flex justify-between items-center focus:outline-none focus:border-black bg-transparent text-black"
                  >
                    <span>{formData.preferredContact || "Select contact method"}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {preferredContactOpen && (
                    <div className="absolute z-10 w-full bg-white shadow-lg mt-1">
                      {["Email", "Phone", "Text Message"].map((method) => (
                        <div
                          key={method}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                          onClick={() => {
                            handleSelectChange("preferredContact", method)
                            setPreferredContactOpen(false)
                          }}
                        >
                          {method}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Appointment Date */}
              <div className="form-group">
                <label htmlFor="appointmentDate" className="block text-black font-medium mb-2">
                  Appointment Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    id="appointmentDate"
                    name="appointmentDate"
                    value={formData.appointmentDate}
                    onChange={handleChange}
                    className="w-full border-b border-black py-2 focus:outline-none focus:border-black bg-transparent text-black pr-10"
                    required
                  />
                  <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>
              </div>

              {/* Are You Requesting This Appointment For Someone Else */}
              <div className="form-group">
                <label htmlFor="forSomeoneElse" className="block text-black font-medium mb-2">
                  Are You Requesting This Appointment For Someone Else
                </label>
                <input
                  type="text"
                  id="forSomeoneElse"
                  name="forSomeoneElse"
                  value={formData.forSomeoneElse}
                  onChange={handleChange}
                  className="w-full border-b border-black py-2 focus:outline-none focus:border-black bg-transparent text-black"
                />
              </div>

              {/* How Did You Hear About Us */}
              <div className="form-group">
                <label htmlFor="hearAboutUs" className="block text-black font-medium mb-2">
                  How Did You Hear About Us
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setHearAboutUsOpen(!hearAboutUsOpen)}
                    className="w-full border-b border-black py-2 text-left flex justify-between items-center focus:outline-none focus:border-black bg-transparent text-black"
                  >
                    <span>{formData.hearAboutUs || "Select option"}</span>
                    <ChevronDown className="h-4 w-4" />
                  </button>
                  {hearAboutUsOpen && (
                    <div className="absolute z-10 w-full bg-white shadow-lg mt-1">
                      {["Social Media", "Friend/Family", "Google Search", "Magazine", "Event", "Other"].map(
                        (option) => (
                          <div
                            key={option}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-black"
                            onClick={() => {
                              handleSelectChange("hearAboutUs", option)
                              setHearAboutUsOpen(false)
                            }}
                          >
                            {option}
                          </div>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Appointment Time */}
              <div className="form-group">
                <label htmlFor="appointmentTime" className="block text-black font-medium mb-2">
                  Appointment Time
                </label>
                <div className="relative">
                  <input
                    type="time"
                    id="appointmentTime"
                    name="appointmentTime"
                    value={formData.appointmentTime}
                    onChange={handleChange}
                    className="w-full border-b border-black py-2 focus:outline-none focus:border-black bg-transparent text-black pr-10"
                    required
                  />
                  <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500" />
                </div>
              </div>

              {/* Form Error */}
              {formError && <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm">{formError}</div>}

              {/* Submit Button */}
              <div className="mt-12 flex justify-center">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-black text-white py-3 px-8 rounded-full flex items-center justify-center disabled:opacity-70 w-full max-w-xs"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      <span>PROCESSING...</span>
                    </>
                  ) : (
                    <>
                      <span className="mr-2">SUBMIT</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation */
          <AppointmentConfirmation message={result.message || "Your appointment has been scheduled."} />
        )}
      </div>
    </PageLayout>
  )
}
