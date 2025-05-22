"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronDown } from "lucide-react"

// Common country codes with flags
const countryCodes = [
  { code: "+233", country: "GH", flag: "🇬🇭", name: "Ghana" },
  { code: "+1", country: "US", flag: "🇺🇸", name: "United States" },
  { code: "+44", country: "GB", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+234", country: "NG", flag: "🇳🇬", name: "Nigeria" },
  { code: "+27", country: "ZA", flag: "🇿🇦", name: "South Africa" },
  { code: "+254", country: "KE", flag: "🇰🇪", name: "Kenya" },
  { code: "+971", country: "AE", flag: "🇦🇪", name: "UAE" },
  { code: "+49", country: "DE", flag: "🇩🇪", name: "Germany" },
  { code: "+33", country: "FR", flag: "🇫🇷", name: "France" },
  { code: "+86", country: "CN", flag: "🇨🇳", name: "China" },
  { code: "+91", country: "IN", flag: "🇮🇳", name: "India" },
]

interface PhoneInputProps {
  value: string
  onChange: (value: string, formattedValue: string) => void
  required?: boolean
  className?: string
}

export function PhoneInput({ value, onChange, required = false, className = "" }: PhoneInputProps) {
  const [countryCode, setCountryCode] = useState("+233") // Default to Ghana
  const [phoneNumber, setPhoneNumber] = useState("")
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  // Set isMounted to true after component mounts to prevent hydration errors
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Parse the initial value if provided
  useEffect(() => {
    if (value && isMounted) {
      // Check if the value starts with a country code
      const matchedCountry = countryCodes.find((country) => value.startsWith(country.code))
      if (matchedCountry) {
        setCountryCode(matchedCountry.code)
        setPhoneNumber(value.substring(matchedCountry.code.length).trim())
      } else {
        setPhoneNumber(value)
      }
    }
  }, [value, isMounted])

  // Format phone number as user types
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value

    // Remove any non-digit characters except for spaces and dashes
    const cleaned = input.replace(/[^\d\s-]/g, "")

    setPhoneNumber(cleaned)

    // Combine country code and phone number
    const fullNumber = `${countryCode} ${cleaned}`
    onChange(fullNumber, fullNumber)
  }

  // Handle country code selection
  const selectCountryCode = (code: string) => {
    setCountryCode(code)
    setDropdownOpen(false)

    // Update the full phone number with the new country code
    const fullNumber = `${code} ${phoneNumber}`
    onChange(fullNumber, fullNumber)
  }

  // Get the selected country data
  const selectedCountry = countryCodes.find((country) => country.code === countryCode) || countryCodes[0]

  if (!isMounted) {
    return null
  }

  return (
    <div className={`relative flex ${className}`}>
      {/* Country code dropdown */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setDropdownOpen(!dropdownOpen)}
          className="flex items-center border-b border-black py-2 px-2 focus:outline-none bg-transparent text-black min-w-[90px]"
        >
          <span className="mr-1">{selectedCountry.flag}</span>
          <span className="mr-1">{selectedCountry.code}</span>
          <ChevronDown className="h-4 w-4" />
        </button>

        {dropdownOpen && (
          <div className="absolute z-20 mt-1 w-60 bg-white shadow-lg rounded-md max-h-60 overflow-y-auto">
            {countryCodes.map((country) => (
              <div
                key={country.code}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                onClick={() => selectCountryCode(country.code)}
              >
                <span className="mr-2">{country.flag}</span>
                <span className="mr-2">{country.name}</span>
                <span className="text-gray-500">{country.code}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Phone number input */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        className="w-full border-b border-black py-2 pl-2 focus:outline-none focus:border-black bg-transparent text-black"
        placeholder="Phone number"
        required={required}
      />

      {/* Hidden input to store the full phone number for form submission */}
      <input type="hidden" name="phone" value={`${countryCode} ${phoneNumber}`} />
    </div>
  )
}
