"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Sample data for featured collection
const featuredItems = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop",
    alt: "Man in beige suit",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1593032465175-481ac7f401f0?q=80&w=1780&auto=format&fit=crop",
    alt: "Man in navy blue suit",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1780&auto=format&fit=crop",
    alt: "Man in gray suit",
  },
]

export function FeaturedCollection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null)
  const touchStartX = useRef(0)
  const touchEndX = useRef(0)

  // Navigation functions
  const goToPrev = () => {
    setDirection(-1)
    setActiveIndex((prev) => (prev === 0 ? featuredItems.length - 1 : prev - 1))
  }

  const goToNext = () => {
    setDirection(1)
    setActiveIndex((prev) => (prev === featuredItems.length - 1 ? 0 : prev + 1))
  }

  // Auto play functionality
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      goToNext()
    }, 5000)

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
      }
    }
  }, [activeIndex])

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
          className="text-2xl font-bold mb-4 text-center"
        >
          Featured Collection
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          viewport={{ once: true }}
          className="text-sm text-center max-w-4xl mx-auto mb-12 text-gray-600"
        >
          At The Cultured Man, Every Piece Is Crafted With The Utmost Of Craftsmanship, Heritage, And Attention To The
          Smallest Details. Highlighting The Finest In Luxury Menswear, Handcrafted With Precision And Designed To
          Elevate Your Style To Unprecedented Heights.
        </motion.p>

        {/* Desktop View */}
        <div className="hidden md:grid grid-cols-3 gap-6">
          {featuredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="overflow-hidden img-hover-zoom"
            >
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.alt}
                width={400}
                height={600}
                className="w-full h-[500px] object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Mobile Carousel */}
        <div
          className="relative md:hidden"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {featuredItems.map((item) => (
                <div key={item.id} className="w-full flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.alt}
                    width={400}
                    height={600}
                    className="w-full h-[400px] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation controls */}
          <button
            onClick={goToPrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="flex justify-center mt-6">
          <div className="flex space-x-2">
            {featuredItems.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`slider-dot ${index === activeIndex ? "active" : ""}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
