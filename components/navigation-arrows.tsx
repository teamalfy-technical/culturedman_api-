"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export function NavigationArrows() {
  const scrollToPrevSection = () => {
    window.scrollBy({
      top: -window.innerHeight,
      behavior: "smooth",
    })
  }

  const scrollToNextSection = () => {
    window.scrollBy({
      top: window.innerHeight,
      behavior: "smooth",
    })
  }

  return (
    <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-40 flex flex-col gap-4">
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <button
          onClick={scrollToPrevSection}
          className="rounded-full bg-white text-black hover:bg-white/90 border-none shadow-md w-10 h-10 flex items-center justify-center"
          aria-label="Previous section"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <button
          onClick={scrollToNextSection}
          className="rounded-full bg-white text-black hover:bg-white/90 border-none shadow-md w-10 h-10 flex items-center justify-center"
          aria-label="Next section"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </motion.div>
    </div>
  )
}
