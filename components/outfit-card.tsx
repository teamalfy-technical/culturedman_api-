"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface OutfitCardProps {
  image: string
  alt: string
  id: string
  delay?: number
}

export function OutfitCard({ image, alt, id, delay = 0 }: OutfitCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -10 }}
      className="flex flex-col items-center"
    >
      <motion.div
        whileHover={{ scale: 1.03 }}
        transition={{ duration: 0.3 }}
        className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl mb-4"
      >
        <Image
          src={image || "/placeholder.svg"}
          alt={alt}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
        />
      </motion.div>
      <Link href={`/pages/outfit/${id}`}>
        <motion.button
          whileHover={{ scale: 1.05, backgroundColor: "#333" }}
          whileTap={{ scale: 0.95 }}
          className="bg-black text-white py-2 px-8 rounded-full flex items-center justify-between min-w-[180px]"
        >
          <span className="uppercase text-sm font-medium">Details</span>
          <ArrowRight className="h-4 w-4 ml-2" />
        </motion.button>
      </Link>
    </motion.div>
  )
}
