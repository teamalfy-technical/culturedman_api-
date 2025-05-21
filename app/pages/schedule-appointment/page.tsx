"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { PageLayout } from "@/components/page-layout"
import { ChevronDown, Calendar, Clock, Loader2 } from "lucide-react"
import { AppointmentConfirmation } from "@/components/appointment-confirmation"

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
  const [isSuccess, setIsSuccess] = useState(false)
  const [confirmationMessage, setConfirmationMessage] = useState("")
  const [googleMapsLink, setGoogleMapsLink] = useState("")
  const [googleCalendarLink, setGoogleCalendarLink] = useState("")
  // Add the isMounted state to prevent hydration errors
  const [isMounted, setIsMounted] = useState(false)

  // Add useEffect to set isMounted after component mounts
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
    if (!formData.email) return "Email is required"
    if (!formData.phone) return "Phone number is required"
    if (!formData.preferredContact) return "Preferred contact method is required"
    if (!formData.appointmentDate) return "Appointment date is required"
    if (!formData.appointmentTime) return "Appointment time is required"
    return null
  }

  // Generate Google Maps link
  const generateGoogleMapsLink = () => {
    // Use the specific Google Maps link provided
    return "https://maps.app.goo.gl/pZ7P5FkkmCeNJ6pt9"
  }

  // Generate Google Calendar link with location
  const generateGoogleCalendarLink = (data: typeof formData, mapsLink: string) => {
    if (!data.appointmentDate || !data.appointmentTime) return ""

    // Format date and time for Google Calendar
    const [year, month, day] = data.appointmentDate.split("-")
    const [hours, minutes] = data.appointmentTime.split(":")

    // Create start and end dates (appointments last 1 hour by default)
    const startDate = new Date(Number(year), Number(month) - 1, Number(day), Number(hours), Number(minutes))
    const endDate = new Date(startDate.getTime() + 60 * 60 * 1000) // Add 1 hour

    // Format dates for Google Calendar URL
    const formatDate = (date: Date) => {
      return date.toISOString().replace(/-|:|\.\d+/g, "")
    }

    const startDateFormatted = formatDate(startDate)
    const endDateFormatted = formatDate(endDate)

    // Create event details
    const eventName = encodeURIComponent(`Appointment with The Cultured Man`)
    const eventDetails = encodeURIComponent(
      `Appointment details:\nName: ${data.firstName} ${data.lastName}\nEmail: ${data.email}\nPhone: ${data.phone}\nPreferred Contact: ${data.preferredContact}\n\nLocation: The Cultured Man\nDirections: ${mapsLink}`,
    )
    const location = encodeURIComponent("The Cultured Man")

    // Generate Google Calendar link with location
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${eventName}&details=${eventDetails}&location=${location}&dates=${startDateFormatted}/${endDateFormatted}&add=${encodeURIComponent(data.email)}&add=info.theculturedman@gmail.com&ctz=local&crm=AVAILABLE&trp=true`
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Validate form
    const error = validateForm()
    if (error) {
      setFormError(error)
      return
    }

    setFormError(null)
    setIsSubmitting(true)

    // Generate Google Maps link
    const mapsLink = generateGoogleMapsLink()
    setGoogleMapsLink(mapsLink)

    // Generate Google Calendar link with location
    const calendarLink = generateGoogleCalendarLink(formData, mapsLink)
    setGoogleCalendarLink(calendarLink)

    // Format date and time for display
    const appointmentDate = new Date(`${formData.appointmentDate}T${formData.appointmentTime}`)
    const dateOptions: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
    const timeOptions: Intl.DateTimeFormatOptions = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }

    const formattedDate = appointmentDate.toLocaleDateString("en-US", dateOptions)
    const formattedTime = appointmentDate.toLocaleTimeString("en-US", timeOptions)

    // Update the confirmation message to be more specific about the location

    // Create confirmation message
    const message = `Thank you, ${formData.firstName}! Your appointment has been scheduled for ${formattedDate} at ${formattedTime}. We will contact you via your preferred method (${formData.preferredContact}) to confirm the details. You can find our location on Google Maps using the button below. Click on Add to Calendar button to add appoibtment to calendar. We look forward to seeing you at The Cultured Man!`
    setConfirmationMessage(message)

    // Let the form submit naturally to FormSubmit
    // FormSubmit will handle the redirect back to the thank-you page

    // Reset form state after a delay to simulate submission
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)
    }, 1500)
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
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8">Schedule An Appointment</h1>

        {/* Description paragraph */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <p className="text-gray-700">
            At The Cultured Man, We Understand That True Luxury Is In The Details. Whether You're Looking For A
            Perfectly Tailored Suit, Style Consultation, Or Personalized Shopping Experience, Our Appointment-Based
            Services Ensure You Receive The Undivided Attention And Expertise You Deserve.
          </p>
        </div>

        {!isSuccess ? (
          /* Appointment Form */
          <div className="max-w-2xl mx-auto">
            <form
              action="https://formsubmit.co/2cd8fe56d03bf1dc7c4460dfcde9a017"
              method="POST"
              className="space-y-8"
              onSubmit={handleSubmit}
            >
              {/* FormSubmit configuration */}
              <input type="hidden" name="_subject" value="New Appointment Request" />
              <input type="hidden" name="_next" value="https://theculturedman.com/thank-you" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="text" name="_honey" style={{ display: "none" }} />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_format" value="plain" />

              {/* Hidden fields for Google Maps and Calendar links */}
              <input type="hidden" name="googleMapsLink" id="googleMapsLink" value={googleMapsLink} />
              <input type="hidden" name="googleCalendarLink" id="googleCalendarLink" value={googleCalendarLink} />

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
                <input type="hidden" name="preferredContact" value={formData.preferredContact} />
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
                    min={new Date().toISOString().split("T")[0]} // Set min date to today
                    className="w-full border-b border-black py-2 focus:outline-none focus:border-black bg-transparent text-black pr-10 date-input-custom"
                    required
                  />
                  <Calendar className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
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
                <input type="hidden" name="hearAboutUs" value={formData.hearAboutUs} />
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
                    min="09:00"
                    max="20:00"
                    step="1800" // 30-minute intervals
                    className="w-full border-b border-black py-2 focus:outline-none focus:border-black bg-transparent text-black pr-10 time-input-custom"
                    required
                  />
                  <Clock className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-500 pointer-events-none" />
                </div>
                <p className="text-xs text-gray-500 mt-1">Business hours: 9:00 AM - 8:00 PM</p>
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
                      <span className="arrow-line"></span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation */
          <AppointmentConfirmation
            message={confirmationMessage}
            calendarLink={googleCalendarLink}
            mapsLink={googleMapsLink}
          />
        )}
      </div>
    </PageLayout>
  )
}
