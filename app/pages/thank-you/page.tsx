"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { CheckCircle, Calendar, MapPin } from "lucide-react"
import { useSearchParams } from "next/navigation"

export default function ThankYouPage() {
  const searchParams = useSearchParams()
  const [googleMapsLink, setGoogleMapsLink] = useState<string | null>(null)
  const [googleCalendarLink, setGoogleCalendarLink] = useState<string | null>(null)
  const [isAppointment, setIsAppointment] = useState(false)

  useEffect(() => {
    // Check if this is a thank you page for an appointment
    const mapsLink = searchParams.get("googleMapsLink")
    const calendarLink = searchParams.get("googleCalendarLink")

    if (mapsLink) {
      setGoogleMapsLink(mapsLink)
      setIsAppointment(true)
    }

    if (calendarLink) {
      setGoogleCalendarLink(calendarLink)
      setIsAppointment(true)
    }
  }, [searchParams])

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6">Thank You!</h1>

          <p className="text-lg mb-8">
            {isAppointment
              ? "Your appointment has been scheduled. We look forward to seeing you at our location!"
              : "Your message has been received. We appreciate your interest and will get back to you shortly."}
          </p>

          {isAppointment && (
            <div className="flex flex-col md:flex-row gap-4 justify-center mt-6 mb-8">
              {googleMapsLink && (
                <Link
                  href={googleMapsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <MapPin className="mr-2 h-5 w-5" />
                  View Our Location
                </Link>
              )}

              {googleCalendarLink && (
                <Link
                  href={googleCalendarLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <Calendar className="mr-2 h-5 w-5" />
                  Add to Google Calendar
                </Link>
              )}
            </div>
          )}

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
