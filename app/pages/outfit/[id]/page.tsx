"use client"

import { PageLayout } from "@/components/page-layout"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useParams } from "next/navigation"

// Sample outfit data - in a real app, this would come from a database or API
const outfitData = {
  "navy-suit": {
    title: "Navy Blue Suit",
    description:
      "A classic navy blue suit that exudes confidence and sophistication. Perfect for business meetings, formal events, and professional settings.",
    image: "/images/outfit-navy-suit.png",
    price: "$899",
    details: ["100% Italian wool", "Slim fit design", "Two-button closure", "Notch lapel", "Four interior pockets"],
  },
  "blue-pattern": {
    title: "Blue Patterned Tuxedo",
    description:
      "A stunning blue patterned tuxedo with a shawl collar. This statement piece is perfect for galas, weddings, and special occasions.",
    image: "/images/outfit-blue-pattern.png",
    price: "$1,299",
    details: ["Patterned jacquard fabric", "Shawl collar", "Single-button closure", "Satin details", "Custom fit"],
  },
  "white-blazer": {
    title: "White Blazer with Black Pants",
    description:
      "A crisp white blazer paired with tailored black pants. This versatile combination works for both casual and semi-formal events.",
    image: "/images/outfit-white-blazer.png",
    price: "$799",
    details: ["Cotton-blend blazer", "Slim fit design", "Two-button closure", "Notch lapel", "Wool-blend pants"],
  },
  "beige-blazer": {
    title: "Beige Blazer with Orange Shirt",
    description:
      "A sophisticated beige blazer with a vibrant orange shirt. This combination is perfect for making a statement at social events and gatherings.",
    image: "/images/outfit-beige-blazer.png",
    price: "$749",
    details: ["Linen-blend blazer", "Slim fit design", "Two-button closure", "Notch lapel", "100% cotton shirt"],
  },
  "dark-suit": {
    title: "Dark Suit with Red Tie",
    description:
      "A professional dark suit paired with a bold red tie. This classic combination is perfect for business meetings and formal occasions.",
    image: "/images/outfit-dark-suit.png",
    price: "$949",
    details: ["100% wool suit", "Modern fit", "Two-button closure", "Notch lapel", "Silk tie"],
  },
  "gold-suit": {
    title: "Gold Suit with Patterned Tie",
    description:
      "A bold gold suit paired with a patterned tie. This unique combination is perfect for making a statement at special events and celebrations.",
    image: "/images/outfit-gold-suit.png",
    price: "$1,099",
    details: ["Wool-blend fabric", "Slim fit design", "Two-button closure", "Notch lapel", "Silk patterned tie"],
  },
}

export default function OutfitDetailPage() {
  const params = useParams()
  const id = params.id as string
  const outfit = outfitData[id as keyof typeof outfitData] || {
    title: "Outfit Not Found",
    description: "The outfit you're looking for could not be found.",
    image: "/placeholder.svg",
    price: "N/A",
    details: [],
  }

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/pages/ai-recommendations">
            <motion.div whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }} className="flex items-center text-black">
              <ArrowLeft className="h-5 w-5 mr-2" />
              <span>Back to Recommendations</span>
            </motion.div>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative aspect-[3/4] rounded-2xl overflow-hidden"
          >
            <Image src={outfit.image || "/placeholder.svg"} alt={outfit.title} fill className="object-cover" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col justify-center"
          >
            <h1 className="text-3xl font-bold mb-4">{outfit.title}</h1>
            <p className="text-xl font-bold mb-6">{outfit.price}</p>
            <p className="text-gray-700 mb-8">{outfit.description}</p>

            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4">Details</h2>
              <ul className="space-y-2">
                {outfit.details.map((detail, index) => (
                  <li key={index} className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-black text-white py-3 px-8 rounded-full self-start"
            >
              BOOK APPOINTMENT
            </motion.button>
          </motion.div>
        </div>
      </div>
    </PageLayout>
  )
}
