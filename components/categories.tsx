"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"

// Sample data for categories
const categories = [
  {
    id: "corporate",
    title: "Cooperate",
    image: "/images/corporate/corporate-bg.png",
    alt: "Man in burgundy suit",
    path: "/pages/categories/corporate",
  },
  {
    id: "bridal",
    title: "Bridal/Nuptials",
    image: "/images/bridal/bridal-bg.png",
    alt: "Man in white tuxedo",
    path: "/pages/categories/bridal",
  },
  {
    id: "red-carpet",
    title: "Red Carpet Events",
    image: "/images/red-carpet/red-carpet-bg.png",
    alt: "Man in black tuxedo with sunglasses",
    path: "/pages/categories/red-carpet",
  },
]

export function Categories() {
  return (
    <section className="bg-white px-5">
      <div className="w-full">
        <div className="flex flex-col">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative w-full h-[500px]"
            >
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.alt}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="bg-[rgba(0,0,0,0.7)] text-white px-12 py-4 mb-4">
                  <h3 className="text-2xl font-bold text-center">{category.title}</h3>
                </div>
                <Link href={category.path} className="text-white hover:underline text-sm">
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
