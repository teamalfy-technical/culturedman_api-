"use client"

import { useRef, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

// Sample data for fashion showcase images - first column (scrolling up)
const fashionImagesColumn1 = [
  {
    id: "col1-1",
    image: "/images/showcase1.png",
    alt: "Man in beige suit",
  },
  {
    id: "col1-2",
    image: "/images/showcase2.png",
    alt: "Man in navy blue suit",
  },
  {
    id: "col1-3",
    image: "/images/showcase3.png",
    alt: "Man in casual outfit",
  },
  {
    id: "col1-4",
    image: "/images/showcase4.png",
    alt: "Man in gray suit",
  },
  // {
  //   id: "col1-5",
  //   image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop",
  //   alt: "Man in white shirt",
  // },
  // {
  //   id: "col1-6",
  //   image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=1974&auto=format&fit=crop",
  //   alt: "Man in beige suit with tie",
  // },
]

// Sample data for fashion showcase images - second column (scrolling down)
const fashionImagesColumn2 = [
  {
    id: "col2-1",
    image: "/images/showcase5.png",
    alt: "Man in black suit",
  },
  {
    id: "col2-2",
    image: "/images/showcase6.png",
    alt: "Man in casual blazer",
  },
  {
    id: "col2-3",
    image: "/images/showcase7.png",
    alt: "Man in tuxedo",
  },
  {
    id: "col2-4",
    image: "/images/showcase8.png",
    alt: "Man in formal wear",
  },
//   {
//     id: "col2-5",
//     image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1974&auto=format&fit=crop",
//     alt: "Man in business casual",
//   },
//   {
//     id: "col2-6",
//     image: "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?q=80&w=2070&auto=format&fit=crop",
//     alt: "Man in stylish outfit",
//   },
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
    <section className="py-16 mx-8 bg-black m-2 rounded-[2vw]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white m-1 md:m-4 rounded-[1vw] my-auto">
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
                {/* First set of images - Column 1 */}
                {fashionImagesColumn1.map((item) => (
                  <div key={item.id} className="overflow-hidden h-[400px]">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.alt}
                      width={300}
                      height={600}
                      className="w-full h-full rounded-md object-contain"
                    />
                  </div>
                ))}

                {/* Duplicate images for seamless scrolling - Column 1 */}
                {fashionImagesColumn1.map((item) => (
                  <div key={`dup-${item.id}`} className="overflow-hidden h-[400px]">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.alt}
                      width={300}
                      height={600}
                      className="w-full h-full rounded-md object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Right column - scrolling down */}
            <div className="h-full overflow-hidden" ref={scrollDownContainerRef}>
              <div className="grid grid-cols-1 gap-2 h-auto">
                {/* First set of images - Column 2 (different images) */}
                {fashionImagesColumn2.map((item) => (
                  <div key={item.id} className="overflow-hidden h-[400px]">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.alt}
                      width={300}
                      height={600}
                      className="w-full rounded-md h-full object-contain"
                    />
                  </div>
                ))}

                {/* Duplicate images for seamless scrolling - Column 2 */}
                {fashionImagesColumn2.map((item) => (
                  <div key={`dup-${item.id}`} className="overflow-hidden h-[400px]">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.alt}
                      width={300}
                      height={600}
                      className="w-full rounded-md h-full object-contain"
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
