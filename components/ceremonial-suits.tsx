"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Sample data for ceremonial suits
const suitItems = [
  {
    id: 1,
    className:"rounded-md ceremonial-suits-img",
    image: "/images/suits/ceremonial-suit-1.png",
    alt: "Man in light gray suit",
    title: "The Ivory Elegance",
    description:
      "A timeless light gray suit crafted from premium Italian wool, perfect for daytime ceremonies and summer events.",
    details:
      "Features a modern slim fit with a two-button closure, notch lapels, and hand-stitched details throughout. Pairs perfectly with our custom Egyptian cotton shirts.",
      isNew: true,
  },
  {
    id: 2,
    className:"rounded-md ceremonial-suits-img",
    image: "/images/suits/ceremonial-suit-2.png",
    alt: "Man in navy blue suit",
    title: "The Midnight Azure",
    description:
      "Our signature navy blue suit, designed for the modern gentleman who appreciates subtle sophistication.",
    details:
      "Constructed with Super 150s wool with a touch of cashmere for exceptional comfort and drape. Features our signature slim lapels and surgeon cuffs.",
    isNew: true,
    // featured: "Featured Collection",
    // edition: "Curated Formal Edition",
  },
  {
    id: 3,
    className:"rounded-md ceremonial-suits-img",
    image: "/images/suits/ceremonial-suit-3.png",
    alt: "Man in gray suit with red tie",
    title: "The Executive",
    description: "A versatile charcoal gray suit that transitions seamlessly from boardroom to formal evening events.",
    details:
      "Made from durable yet luxurious worsted wool with natural stretch. The half-canvassed construction ensures a perfect fit that improves with wear.",
      isNew: true,
  },
]

export function CeremonialSuits() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  // Navigation functions for mobile slider
  const goToPrev = () => {
    setActiveIndex((prev) => (prev === 0 ? suitItems.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setActiveIndex((prev) => (prev === suitItems.length - 1 ? 0 : prev + 1))
  }

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX
  }

  const handleTouchEnd = () => {
    if (touchStartX.current - touchEndX.current > 50) {
      // Swipe left
      goToNext()
    } else if (touchEndX.current - touchStartX.current > 50) {
      // Swipe right
      goToPrev()
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-4xl text-black font-bold mb-6 text-center"
        >
          Ceremonial Suits
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-4xl mx-auto mb-12 text-gray-800"
        >
          Introducing The Ultimate In Elegance: A High-End Tuxedo Suit Or Blazer, Designed For The Discerning Gentleman,
          Exclusively From Our Atelier.
        </motion.p>

        {/* Desktop View - Grid with Flip Cards */}
        <div className="hidden md:grid grid-cols-3 rounded-[1vw] gap-6">
          {suitItems.map((item) => (
            <div key={item.id} className="flip-card rounded-[1vw] cursor-pointer ceremonial-suits-img">
              <div className="flip-card-inner">
                {/* Front of card */}
                <div className="flip-card-front relative rounded-[1vw] overflow-hidden">
                  {item.isNew && (
                    <div className="absolute top-4 left-4 bg-white text-black text-xs px-3 py-1 rounded-full z-10">
                      NEW
                    </div>
                  )}

                  {/* {item.featured && (
                    <div className="absolute right-4 top-0 h-full flex items-center">
                      <div className="vertical-text text-white text-xs space-y-2">
                        <div className="rotate-90 origin-left transform translate-x-4">{item.featured}</div>
                        <div className="rotate-90 origin-left transform translate-x-4">{item.edition}</div>
                      </div>
                    </div>
                  )} */}

                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.alt}
                    width={400}
                    height={600}
                    className="w-full h-[500px] object-cover rounded-[1vw]"
                  />
                </div>

                {/* Back of card */}
                <div className="flip-card-back bg-white rounded-lg shadow-md text-black p-6 flex flex-col justify-center border-4 border-neutral-200">
                  <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                  <p className="mb-4">{item.description}</p>
                  <p className="text-sm text-black">{item.details}</p>
                  {/* <button className="mt-6 border border-white text-white py-2 px-4 hover:bg-white hover:text-black transition-colors">
                    View Details
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View - Slider */}
        <div className="md:hidden">
          <div
            className="relative"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div className="overflow-hidden">
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              >
                {suitItems.map((item) => (
                  <div key={item.id} className="w-full flex-shrink-0 relative">
                    {item.isNew && (
                      <div className="absolute top-4 left-4 bg-white text-black text-xs px-3 py-1 rounded-full z-10">
                        NEW
                      </div>
                    )}

                    {/* {item.featured && (
                      <div className="absolute right-4 top-0 h-full flex items-center">
                        <div className="vertical-text text-white text-xs space-y-2">
                          <div className="rotate-90 origin-left transform translate-x-4">{item.featured}</div>
                          <div className="rotate-90 origin-left transform translate-x-4">{item.edition}</div>
                        </div>
                      </div>
                    )} */}

                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.alt}
                      width={400}
                      height={600}
                      className="w-full h-[450px] object-cover rounded-md"
                    />

                    <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white border-solid  roundede-md p-4">
                      <h3 className="text-lg font-bold">{item.title}</h3>
                      <p className="text-sm text-black line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          {/* Mobile navigation dots */}
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {suitItems.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-4 h-4 rounded-full ${index === activeIndex ? "bg-black" : "bg-gray-300"}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
