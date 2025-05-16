"use server"

import { revalidatePath } from "next/cache"

export type AppointmentFormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  preferredContact: string
  appointmentDate: string
  appointmentTime: string
  forSomeoneElse: string
  hearAboutUs: string
  googleCalendarLink?: string
}

export type AppointmentResult = {
  success: boolean
  message?: string
  error?: string
  calendarLink?: string
}

export async function submitAppointmentForm(formData: AppointmentFormData): Promise<AppointmentResult> {
  try {
    // Validate form data
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.preferredContact ||
      !formData.appointmentDate ||
      !formData.appointmentTime
    ) {
      return {
        success: false,
        error: "Please fill in all required fields",
      }
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      return {
        success: false,
        error: "Please enter a valid email address",
      }
    }

    // Validate phone number (simple validation)
    const phoneRegex = /^\+?[0-9\s\-()]{8,20}$/
    if (!phoneRegex.test(formData.phone)) {
      return {
        success: false,
        error: "Please enter a valid phone number",
      }
    }

    // Validate appointment date and time
    const currentDate = new Date()
    const appointmentDate = new Date(`${formData.appointmentDate}T${formData.appointmentTime}`)

    if (appointmentDate < currentDate) {
      return {
        success: false,
        error: "Please select a future date and time for your appointment",
      }
    }

    // Format date and time for display
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

    // In a real application, you would:
    // 1. Save the appointment to a database
    // 2. Send confirmation emails with Google Calendar link
    // 3. Potentially integrate directly with Google Calendar API

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Revalidate the path to ensure fresh data
    revalidatePath("/pages/schedule-appointment")

    return {
      success: true,
      message: `Thank you, ${formData.firstName}! Your appointment has been scheduled for ${formattedDate} at ${formattedTime}. We will contact you via your preferred method (${formData.preferredContact}) to confirm the details.`,
      calendarLink: formData.googleCalendarLink,
    }
  } catch (error) {
    console.error("Error submitting appointment form:", error)
    return {
      success: false,
      error: "An error occurred while processing your request. Please try again.",
    }
  }
}
