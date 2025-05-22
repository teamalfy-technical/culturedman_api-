"use client"

import { Suspense } from "react"
import { useEffect, useState } from "react"
import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { CheckCircle } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { AppointmentConfirmation } from "@/components/appointment-confirmation"

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="py-16 text-center">Loading...</div>}>
      <ThankYouPageContent />
    </Suspense>
  )
}

export function ThankYouPageContent() {
  const searchParams = useSearchParams()
  const [googleMapsLink, setGoogleMapsLink] = useState<string | null>(null)
  const [googleCalendarLink, setGoogleCalendarLink] = useState<string | null>(null)
  const [appointmentDetails, setAppointmentDetails] = useState<string | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [isAppointment, setIsAppointment] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Get parameters from URL
    const firstName = searchParams.get("firstName")
    const lastName = searchParams.get("lastName")
    const details = searchParams.get("appointmentDetails")
    const mapsLink = searchParams.get("googleMapsLink")
    const calendarLink = searchParams.get("googleCalendarLink")

    // Set state with URL parameters
    if (firstName && lastName) {
      setName(`${firstName} ${lastName}`)
    } else if (firstName) {
      setName(firstName)
    }

    if (details) {
      setAppointmentDetails(decodeURIComponent(details))
      setIsAppointment(true)
    }

    if (mapsLink) {
      setGoogleMapsLink(decodeURIComponent(mapsLink))
      setIsAppointment(true)
    }

    if (calendarLink) {
      setGoogleCalendarLink(decodeURIComponent(calendarLink))
      setIsAppointment(true)
    }

    setIsLoading(false)
  }, [searchParams])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-black"></div>
      </div>
    )
  }

  // If this is an appointment confirmation, use the AppointmentConfirmation component
  if (isAppointment && appointmentDetails) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-16">
          <AppointmentConfirmation
            message={`${name ? `Thank you, ${name}! ` : "Thank you! "} Your appointment has been scheduled successfully. ${appointmentDetails}. Kindly Click on "Add to Calendar" to Confirm Appointment Date and Time`}
            calendarLink={googleCalendarLink || undefined}
            mapsLink={googleMapsLink || undefined}
          />
        </div>
      </PageLayout>
    )
  }

  // Otherwise, show the standard thank you message
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-black">Thank You!</h1>

          <p className="text-lg mb-8 text-black">
            Your message has been received. We appreciate your interest and will get back to you shortly.
          </p>

          <Link
            href="/"
            className="bg-black text-white py-3 px-8 rounded-full inline-block hover:bg-neutral-800 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
