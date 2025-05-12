"use client"

import { motion } from "framer-motion"
import { CheckCircle } from "lucide-react"

interface AppointmentConfirmationProps {
  message: string
}

export function AppointmentConfirmation({ message }: AppointmentConfirmationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto bg-gray-100 p-8 rounded-md text-center"
    >
      <div className="flex justify-center mb-6">
        <CheckCircle className="h-16 w-16 text-green-600" />
      </div>
      <h2 className="text-2xl font-bold mb-4">Appointment Scheduled</h2>
      <p className="text-lg">{message}</p>
      <div className="mt-8">
        <p className="text-gray-600">
          If you need to reschedule or cancel your appointment, please contact us at least 24 hours in advance.
        </p>
      </div>
    </motion.div>
  )
}
