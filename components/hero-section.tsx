"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import 'aos/dist/aos.css';
// import AOS from 'aos';

// Hero background images
const heroBackgrounds = [
  "/images/hero-image1.png",
  "/images/hero-image2.png",
  "/images/hero-image3.png",
  "/images/hero-image4.png"
]

export function HeroSection() {
  const [currentBg, setCurrentBg] = useState(0)

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % heroBackgrounds.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="hero-bg min-h-screen bg-white mt-[100px] lg:mx-8 rounded-[1vw] px-3 relative overflow-visible">
      {/* Cultured Man Logo */}
      <div className="flex justify-center relative">
        <img className="flex justify-center logo -mt-8 overflow-visible z-10 bg-white rounded-[1vw] px-10" width="200px" height="100px" src="/images/cultured-man-logo.png" alt="cultured-man logo" />
      </div>
      {/* Background Image */}
      <div className="absolute inset-0 w-full h-full rounded-[1vw]">
        {heroBackgrounds.map((bg, index) => (
          <div
            key={index}
            className={`bg-white absolute inset-0 w-full h-full rounded-[1vw] transition-opacity duration-1000 ${
              index === currentBg ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0  mix-blend-multiply" />
            <Image
              src={bg || "/placeholder.svg"}
              alt="Hero background"
              fill
              className="object-cover rounded-[1vw]"
              priority={index === 0}
            />
          </div>
        ))}
      </div>
      
      {/* Content */}
      
      <div className="container mx-auto px-4 relative h-full">
        <div className="flex flex-col md:flex-row justify-between items-center my-20">
          {/* Left side content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 text-white"
          >
            <h1 className="text-6xl my-auto md:text-6xl  font-playfair font-light leading-tight text-white mb-6">
              Redefining Elegance.
              <br />
              The Art Of Bespoke
              <br />
              Tailoring
            </h1>
            <p className="text-white/90 text-xl mb-10">
              Elevate Your Wardrobe With Our Fashion Finds. Discover Your
              <br className="hidden md:block" />
              Signature Style.
            </p>
            {/* Hero Buttons */}
            <div className="flex-row space-y-4 mb-8">
              <Link href="/pages/ai-stylist">
                <button className="try-stylist-btn group py-8 mb-3">
                  <span>TRY OUR AI STYLIST</span>
                  <span className="arrow-line"></span>
                </button>
              </Link>
              <Link href="/pages/schedule-appointment">
                <button className="book-consultation-btn">BOOK CONSULTATION APPOINTMENT</button>
              </Link>      
            </div>
          </motion.div>

          {/* Right side is filled by the background image - nothing to add here */}
          <div className="w-full md:w-1/2 h-full"></div>
        </div>
      </div>
    </section>
  )
}
