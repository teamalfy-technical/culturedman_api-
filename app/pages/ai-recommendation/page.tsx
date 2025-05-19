"use client"

import { PageLayout } from "@/components/page-layout"
import { OutfitCard } from "@/components/outfit-card"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"

// Sample outfit data
const outfits = [
  {
    id: "navy-suit",
    image: "/images/outfit-navy-suit.png",
    alt: "Man in navy blue suit",
  },
  {
    id: "blue-pattern",
    image: "/images/outfit-blue-pattern.png",
    alt: "Man in blue patterned tuxedo with bow tie",
  },
  {
    id: "white-blazer",
    image: "/images/outfit-white-blazer.png",
    alt: "Man in white blazer with black pants",
  },
  {
    id: "beige-blazer",
    image: "/images/outfit-beige-blazer.png",
    alt: "Man in beige blazer with orange shirt",
  },
  {
    id: "dark-suit",
    image: "/images/outfit-dark-suit.png",
    alt: "Man in dark suit with red tie",
  },
  {
    id: "gold-suit",
    image: "/images/outfit-gold-suit.png",
    alt: "Man in gold suit with patterned tie",
  },
]

export default function AIRecommendationsPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/pages/ai-stylist">
            <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }} className="flex items-center text-black">
              <ArrowLeft className="h-5 w-5 mr-2" />
            </motion.div>
          </Link>
          <h1 className="text-3xl text-black md:text-4xl font-bold text-center flex-1">AI Recommendations</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16 mb-16">
          {outfits.map((outfit, index) => (
            <OutfitCard key={outfit.id} image={outfit.image} alt={outfit.alt} id={outfit.id} delay={index * 0.1} />
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
