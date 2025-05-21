"use client"

import { motion } from "framer-motion"
import { CheckCircle, Calendar, MapPin } from "lucide-react"
import Link from "next/link"

interface AppointmentConfirmationProps {
  message: string
  calendarLink?: string
  mapsLink?: string
}

export function AppointmentConfirmation({ message, calendarLink, mapsLink }: AppointmentConfirmationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-gray-100 p-8 rounded-md text-center text-black"
    >
      <div className="flex justify-center mb-6">
        <CheckCircle className="h-16 w-16 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold mb-4 text-black">Appointment Scheduled</h2>
      <p className="text-lg mb-6">{message}</p>

      <div className="flex flex-col md:flex-row gap-4 text-black justify-center mt-6 mb-8">
        {mapsLink && (
          <Link
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors"
          >
            <MapPin className="mr-2 h-5 w-5" />
            View Location
          </Link>
        )}

        {calendarLink && (
          <Link
            href={calendarLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors"
          >
            <Calendar className="mr-2 h-5 w-5" />
            Add to Google Calendar
          </Link>
        )}
      </div>

      <div className="mt-8">
        <p className="text-gray-600">
          If you need to reschedule or cancel your appointment, please contact us on <a className="font-bold text-blue-500" href="tel:+233533078542">+233533078542</a> / <a className="font-bold text-blue-500" href="tel:+233547270254">+233547270254</a> at least 24 hours in advance.
        </p>
      </div>
    </motion.div>
  )
}
