"use client"

import Image from "next/image"
import { motion } from "framer-motion"

// Sample data for categories
const categories = [
  {
    id: 1,
    title: "Corporate",
    image: "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?q=80&w=1780&auto=format&fit=crop",
    alt: "Man in burgundy suit",
  },
  {
    id: 2,
    title: "Bridal/Nuptials",
    image: "https://images.unsplash.com/photo-1596436889106-be35e843f974?q=80&w=1770&auto=format&fit=crop",
    alt: "Man in white tuxedo",
  },
  {
    id: 3,
    title: "Red Carpet Events",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1771&auto=format&fit=crop",
    alt: "Man in black tuxedo with sunglasses",
  },
]

export function Categories() {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="space-y-4 md:space-y-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-md"
            >
              <div className="img-hover-zoom">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.alt}
                  width={1200}
                  height={600}
                  className="w-full h-[250px] md:h-[400px] object-cover"
                />
              </div>
              <div className="category-overlay">
                <h3 className="text-xl font-bold mb-1">{category.title}</h3>
                <button className="text-white hover:underline text-sm">Discover More</button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
