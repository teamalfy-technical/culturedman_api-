"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

// Sample data for categories with multiple background images
const categories = [
  {
    id: "corporate",
    title: "Cooperate",
    images: [
      "/images/corporate/corporate-bg.png",
      "/images/corporate/corporate-bg2.png",
      "/images/corporate/corporate-bg3.png",
      "/images/corporate/corporate-bg4.png",
    ],
    alt: "Man in burgundy suit",
    path: "/pages/categories/corporate",
  },
  {
    id: "bridal",
    title: "Bridal/Nuptials",
    images: ["/images/bridal/bridal-bg.png", "/images/bridal/bridal-bg2.png", "/images/bridal/bridal-bg3.png","/images/bridal/bridal-bg4.png"],
    alt: "Man in white tuxedo",
    path: "/pages/categories/bridal",
  },
  {
    id: "red-carpet",
    title: "Red Carpet Events",
    images: [
      "/images/red-carpet/red-carpet-bg.png",
      "/images/red-carpet/red-carpet-bg2.png",
      "/images/red-carpet/red-carpet-bg3.png",
      "/images/red-carpet/red-carpet-bg4.png",
    ],
    alt: "Man in black tuxedo with sunglasses",
    path: "/pages/categories/red-carpet",
  },
]

export function Categories() {
  // State to track current background image for each category
  const [currentBgIndices, setCurrentBgIndices] = useState<number[]>(categories.map(() => 0))

  // Set up auto-rotation for background images
  useEffect(() => {
    const intervals = categories.map((_, index) => {
      return setInterval(
        () => {
          setCurrentBgIndices((prev) => {
            const newIndices = [...prev]
            newIndices[index] = (newIndices[index] + 1) % categories[index].images.length
            return newIndices
          })
        },
        5000 + index * 1000,
      ) // Stagger the intervals for each category
    })

    // Clean up intervals on unmount
    return () => {
      intervals.forEach((interval) => clearInterval(interval))
    }
  }, [])

  return (
    <section className="bg-white md:px-8">
      <div className="w-full">
        <div className="flex flex-col">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative w-full bg-center h-[800px]"
            >
              {/* Render all background images with opacity transitions */}
              {category.images.map((image, imgIndex) => (
                <div
                  key={imgIndex}
                  className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                    imgIndex === currentBgIndices[index] ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="absolute inset-0 bg-black/30 mix-blend-multiply" />
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${category.alt} background ${imgIndex + 1}`}
                    fill
                    className="object-cover"
                    priority={index === 0 && imgIndex === 0}
                  />
                </div>
              ))}

              <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                <Link href={category.path} className="bg-[rgba(0,0,0,0.7)] text-white px-12 py-4 mb-4 hover:bg-black text-sm">
                    <h3 className="text-2xl font-bold text-center">{category.title}</h3>
                </Link>
                <Link href={category.path} className="text-white hover:underline hover:text-black text-sm">
                  Discover More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
