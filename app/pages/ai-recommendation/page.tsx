"use client"

import { useEffect, useState } from "react"
import { PageLayout } from "@/components/page-layout"
import { ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

type Card = {
  id: string
  image: string
  alt: string
  path?: string
}

const corporateCollection: Card[] = [
  {
    id: "single-breasted",
    image: "/images/corporate/single-breasted/single-breasted-1.png",
    alt: "Man in burgundy suit",
    path: "/pages/categories/corporate/single-breasted",
  },
  {
    id: "double-breasted",
    image: "/images/corporate/double-breasted/double-breasted-1.png",
    alt: "Man in navy blue suit",
    path: "/pages/categories/corporate/double-breasted",
  },
  {
    id: "overcoat",
    image: "/images/corporate/overcoat/overcoat-1.png",
    alt: "Man in gray pinstripe suit",
    path: "/pages/categories/corporate/overcoat",
  },
  {
    id: "safari-suit",
    image: "/images/corporate/safari-suit/safari-suit-1.png",
    alt: "Man in black suit with tie",
    path: "/pages/categories/corporate/safari-suit",
  },
]

const redCarpetCollection: Card[] = [
  { id: "red-carpet-1", image: "/images/red-carpet/red-carpet-1.png", alt: "Man in black tuxedo with sunglasses" },
  { id: "red-carpet-2", image: "/images/red-carpet/red-carpet-2.png", alt: "Man in velvet dinner jacket" },
  { id: "red-carpet-3", image: "/images/red-carpet/red-carpet-3.png", alt: "Man in white dinner jacket" },
  { id: "red-carpet-4", image: "/images/red-carpet/red-carpet-4.png", alt: "Man in patterned suit" },
  { id: "red-carpet-5", image: "/images/red-carpet/red-carpet-5.png", alt: "Man in gold suit" },
  { id: "red-carpet-6", image: "/images/red-carpet/red-carpet-6.png", alt: "Man in silver tuxedo" },
]

const bridalCollection: Card[] = [
  { id: "bridal-1", image: "/images/bridal/bridal-1.png", alt: "Man in white tuxedo with black bow tie" },
  { id: "bridal-2", image: "/images/bridal/bridal-2.png", alt: "Group of men in black tuxedos" },
  { id: "bridal-3", image: "/images/bridal/bridal-3.png", alt: "Man in white dinner jacket" },
  { id: "bridal-4", image: "/images/bridal/bridal-4.png", alt: "Group of groomsmen in matching suits" },
  { id: "bridal-5", image: "/images/bridal/bridal-5.png", alt: "Man in white jacket at wedding" },
  { id: "bridal-6", image: "/images/bridal/bridal-6.png", alt: "Group photo with men in formal wear" },
]

export default function AIRecommendationsPage() {
  const [occasion, setOccasion] = useState("")
  const [cards, setCards] = useState<Card[]>([])
  const [collectionType, setCollectionType] = useState<"corporate" | "red-carpet" | "bridal">("corporate")

  useEffect(() => {
    const raw = localStorage.getItem("stylistFormData")
    if (raw) {
      try {
        const parsed = JSON.parse(raw)
        const userOccasion: string = parsed?.occasion ?? ""
        setOccasion(userOccasion)

        if (userOccasion === "Formal") {
          setCollectionType("corporate")
          setCards(corporateCollection)
        } else if (userOccasion === "Red Carpet") {
          setCollectionType("red-carpet")
          setCards(redCarpetCollection)
        } else if (userOccasion === "Wedding") {
          setCollectionType("bridal")
          setCards(bridalCollection)
        } else {
          setCollectionType("corporate")
          setCards(corporateCollection)
        }
      } catch (err) {
        console.error("❌ Failed to parse stylistFormData:", err)
      }
    }
  }, [])

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

        <h2 className="text-xl font-semibold text-black mb-4 text-center">
          {occasion ? `Recommended for: ${occasion}` : "Corporate Recommendations"}
        </h2>

        <div className={`grid grid-cols-1 ${collectionType === "corporate" ? "md:grid-cols-4" : "md:grid-cols-3"} gap-8`}>
          {cards.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div className="relative aspect-square rounded-md overflow-hidden mb-4">
                <Image src={item.image || "/placeholder.svg"} alt={item.alt} fill className="object-cover" />
              </div>
              <Link
                href={
                  item.path
                    ? item.path
                    : `/pages/categories/${collectionType}/${item.id}`
                }
                className={`py-3 px-6 rounded-full flex items-center justify-center ${
                  collectionType === "red-carpet" ? "bg-[#1a1a1a] text-white" : "bg-black text-white"
                }`}
              >
                <span className="mr-2 uppercase">{collectionType === "corporate" ? item.id.replace("-", " ") : "Details"}</span>
                <span className="text-lg">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
