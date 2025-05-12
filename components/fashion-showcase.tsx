"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

// Sample data for fashion showcase images
const fashionImages = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?q=80&w=1974&auto=format&fit=crop",
    alt: "Man in suit 1",
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop",
    alt: "Man in suit 2",
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop",
    alt: "Man in suit 3",
  },
  {
    id: 4,
    image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?q=80&w=1974&auto=format&fit=crop",
    alt: "Man in suit 4",
  },
  {
    id: 5,
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
    alt: "Man in suit 5",
  },
  {
    id: 6,
    image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop",
    alt: "Man in suit 6",
  },
]

export function FashionShowcase() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  // Manual infinite scroll implementation
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current
    if (!scrollContainer) return

    let animationFrameId: number
    let scrollPosition = 0
    const scrollSpeed = 0.5 // pixels per frame
    const containerHeight = scrollContainer.scrollHeight / 2

    const scroll = () => {
      scrollPosition += scrollSpeed

      // Reset when we've scrolled through half the content (since it's duplicated)
      if (scrollPosition >= containerHeight) {
        scrollPosition = 0
      }

      if (scrollContainer) {
        scrollContainer.scrollTop = scrollPosition
      }

      animationFrameId = requestAnimationFrame(scroll)
    }

    // Start the animation
    animationFrameId = requestAnimationFrame(scroll)

    // Pause on hover or touch
    const handlePause = () => {
      cancelAnimationFrame(animationFrameId)
    }

    const handleResume = () => {
      animationFrameId = requestAnimationFrame(scroll)
    }

    scrollContainer.addEventListener("mouseenter", handlePause)
    scrollContainer.addEventListener("mouseleave", handleResume)
    scrollContainer.addEventListener("touchstart", handlePause)
    scrollContainer.addEventListener("touchend", handleResume)

    return () => {
      cancelAnimationFrame(animationFrameId)
      if (scrollContainer) {
        scrollContainer.removeEventListener("mouseenter", handlePause)
        scrollContainer.removeEventListener("mouseleave", handleResume)
        scrollContainer.removeEventListener("touchstart", handlePause)
        scrollContainer.removeEventListener("touchend", handleResume)
      }
    }
  }, [])

  return (
    <section className="py-16 bg-black m-2 rounded-md">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white m-1 md:m-4 rounded-md">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-black p-6 md:col-span-1 my-auto"
          >
            <div className="mb-4">
              <span className="text-xs uppercase bg-black rounded-full text-white px-2 py-1">Fashion</span>
            </div>
            <h3 className="text-2xl md:text-3xl mb-3 text-black font-bold">
              Dive Into A World
              <br />
              Of Endless Fashion
              <br />
              Possibilities
            </h3>
            <p className="text-md text-black mt-4">
              Elevate your wardrobe with our fashion finds. Discover your signature style.
            </p>
            <p className="text-md text-black mt-4">
              From neckties and bowties to cufflinks and socks, each piece is designed to complement our suits while reflecting the rich cultural heritage of Africa.
            </p>
          </motion.div>

          {/* Image grid with vertical scroll */}
          <div className="md:col-span-2 h-[500px] md:h-[600px] overflow-hidden" ref={scrollContainerRef}>
            <div className="grid grid-cols-2 gap-2 h-auto">
              {/* First set of images */}
              {fashionImages.map((item) => (
                <div key={item.id} className="overflow-hidden h-[200px]">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.alt}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}

              {/* Duplicate images for seamless scrolling */}
              {fashionImages.map((item) => (
                <div key={`dup-${item.id}`} className="overflow-hidden h-[200px]">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.alt}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
