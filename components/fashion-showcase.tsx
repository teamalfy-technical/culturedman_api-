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
  const scrollUpContainerRef = useRef<HTMLDivElement>(null)
  const scrollDownContainerRef = useRef<HTMLDivElement>(null)

  // Implement scrolling effects
  useEffect(() => {
    // Scroll Up Container (bottom to top)
    const scrollUpContainer = scrollUpContainerRef.current
    let scrollUpAnimationId: number
    let scrollUpPosition = 0
    const scrollUpSpeed = 0.5 // pixels per frame

    // Scroll Down Container (top to bottom)
    const scrollDownContainer = scrollDownContainerRef.current
    let scrollDownAnimationId: number
    let scrollDownPosition = 0
    const scrollDownSpeed = 0.5 // pixels per frame

    if (!scrollUpContainer || !scrollDownContainer) return

    const containerHeight = scrollUpContainer.scrollHeight / 2

    // Scroll up animation (bottom to top)
    const scrollUp = () => {
      scrollUpPosition += scrollUpSpeed

      // Reset when we've scrolled through half the content
      if (scrollUpPosition >= containerHeight) {
        scrollUpPosition = 0
      }

      if (scrollUpContainer) {
        scrollUpContainer.scrollTop = scrollUpPosition
      }

      scrollUpAnimationId = requestAnimationFrame(scrollUp)
    }

    // Scroll down animation (top to bottom)
    const scrollDown = () => {
      scrollDownPosition += scrollDownSpeed

      // Reset when we've scrolled through half the content
      if (scrollDownPosition >= containerHeight) {
        scrollDownPosition = 0
      }

      if (scrollDownContainer) {
        // Invert the scroll direction
        scrollDownContainer.scrollTop = containerHeight - scrollDownPosition
      }

      scrollDownAnimationId = requestAnimationFrame(scrollDown)
    }

    // Start animations
    scrollUpAnimationId = requestAnimationFrame(scrollUp)
    scrollDownAnimationId = requestAnimationFrame(scrollDown)

    // Pause on hover or touch
    const handlePause = () => {
      cancelAnimationFrame(scrollUpAnimationId)
      cancelAnimationFrame(scrollDownAnimationId)
    }

    const handleResume = () => {
      scrollUpAnimationId = requestAnimationFrame(scrollUp)
      scrollDownAnimationId = requestAnimationFrame(scrollDown)
    }

    scrollUpContainer.addEventListener("mouseenter", handlePause)
    scrollUpContainer.addEventListener("mouseleave", handleResume)
    scrollUpContainer.addEventListener("touchstart", handlePause)
    scrollUpContainer.addEventListener("touchend", handleResume)

    scrollDownContainer.addEventListener("mouseenter", handlePause)
    scrollDownContainer.addEventListener("mouseleave", handleResume)
    scrollDownContainer.addEventListener("touchstart", handlePause)
    scrollDownContainer.addEventListener("touchend", handleResume)

    return () => {
      cancelAnimationFrame(scrollUpAnimationId)
      cancelAnimationFrame(scrollDownAnimationId)

      if (scrollUpContainer) {
        scrollUpContainer.removeEventListener("mouseenter", handlePause)
        scrollUpContainer.removeEventListener("mouseleave", handleResume)
        scrollUpContainer.removeEventListener("touchstart", handlePause)
        scrollUpContainer.removeEventListener("touchend", handleResume)
      }

      if (scrollDownContainer) {
        scrollDownContainer.removeEventListener("mouseenter", handlePause)
        scrollDownContainer.removeEventListener("mouseleave", handleResume)
        scrollDownContainer.removeEventListener("touchstart", handlePause)
        scrollDownContainer.removeEventListener("touchend", handleResume)
      }
    }
  }, [])

  return (
    <section className="py-16 bg-black m-2 rounded-md">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white m-1 md:m-4 rounded-md my-auto">
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
              Elevate Your Wardrobe With Our Perfect Craft. Discover Your Signature Style Through Our Bespoke Tailoring
              Services. We Are Here To Serve You.
            </p>
            <p className="text-md text-black mt-4">
              From The Finest Fabrics To The Most Exquisite Details, Our Bespoke Suits Are Designed To Make You Look And
              Feel Your Best. Book An Appointment Today.
            </p>
          </motion.div>

          {/* Image grid with two different scroll directions */}
          <div className="md:col-span-2 grid grid-cols-2 gap-2 h-[500px] md:h-[600px]">
            {/* Left column - scrolling up */}
            <div className="h-full overflow-hidden" ref={scrollUpContainerRef}>
              <div className="grid grid-cols-1 gap-2 h-auto">
                {/* First set of images */}
                {fashionImages.map((item) => (
                  <div key={item.id} className="overflow-hidden h-[200px]">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.alt}
                      width={400}
                      height={300}
                      className="w-full h-full rounded-md object-cover"
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
                      className="w-full h-full rounded-md object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right column - scrolling down */}
            <div className="h-full overflow-hidden" ref={scrollDownContainerRef}>
              <div className="grid grid-cols-1 gap-2 h-auto">
                {/* First set of images */}
                {fashionImages.map((item) => (
                  <div key={`right-${item.id}`} className="overflow-hidden h-[200px]">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.alt}
                      width={400}
                      height={300}
                      className="w-full rounded-md h-full object-cover"
                    />
                  </div>
                ))}

                {/* Duplicate images for seamless scrolling */}
                {fashionImages.map((item) => (
                  <div key={`right-dup-${item.id}`} className="overflow-hidden h-[200px]">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.alt}
                      width={400}
                      height={300}
                      className="w-full rounded-md h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
