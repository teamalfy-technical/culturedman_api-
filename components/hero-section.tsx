"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import 'aos/dist/aos.css';

const desktopBackgrounds = [
  "/images/hero-image1.webp",
  "/images/hero-image2.webp",
  "/images/hero-image3.webp",
  "/images/hero-image4.webp"
]

const mobileBackgrounds = [
  "/images/hero-image-mobile-1.webp",
  "/images/hero-image-mobile-2.webp",
  "/images/hero-image-mobile-3.webp",
  "/images/hero-image-mobile-4.webp"
]

export function HeroSection() {
  const [currentBg, setCurrentBg] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % (isMobile ? mobileBackgrounds.length : desktopBackgrounds.length))
    }, 5000)
    return () => clearInterval(interval)
  }, [isMobile])

  const heroBackgrounds = isMobile ? mobileBackgrounds : desktopBackgrounds

  return (
    <section className="hero-bg min-h-screen bg-white md:mt-[100px] lg:mx-8 rounded-[1vw] px-3 relative overflow-visible">
      <div className="flex justify-center relative">
        <img className="flex justify-center logo -mt-8 overflow-visible z-10 bg-white rounded-[1vw] px-10" width="200px" height="100px" src="/images/cultured-man-logo.png" alt="cultured-man logo" />
      </div>
      <div className="absolute inset-0 w-full h-full rounded-[1vw]">
        {heroBackgrounds.map((bg, index) => (
          <div
            key={index}
            className={`bg-white absolute inset-0 w-full h-full rounded-[1vw] transition-opacity duration-1000 ${
              index === currentBg ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="absolute inset-0 mix-blend-multiply" />
            <Image
              src={bg || "/placeholder.svg"}
              alt="Hero background"
              fill
              className="md:object-cover object-auto rounded-[1vw]"
              priority={index === 0} // Only first image gets priority for optimized loading
            />
          </div>
        ))}
      </div>

      <div className="container mx-auto my-auto px-4 relative md:h-full">
        <div className="flex flex-col md:flex-row justify-between items-center my-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full md:w-1/2 text-white"
          >
            <h1 className="text-4xl my-auto md:text-6xl font-playfair font-light leading-tight text-white mb-6">
              Redefining Elegance. The Art Of Bespoke Tailoring
            </h1>
            <p className="text-white/90 text-xl mb-10">
              Elevate Your Wardrobe With Our Fashion Finds. Discover Your <br className="hidden md:block" /> Signature Style.
            </p>
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

          <div className="w-full md:w-1/2 h-full"></div>
        </div>
      </div>
    </section>
  )
}