"use client"

import Image from "next/image"
import { motion } from "framer-motion"

// Sample Instagram posts data
const instagramPosts = [
  { id: 1, image: "/images/insta1.png", alt: "Instagram post 1" },
  { id: 2, image: "/images/insta2.png", alt: "Instagram post 2" },
  { id: 3, image: "/images/insta3.png", alt: "Instagram post 3" },
  { id: 4, image: "/images/insta4.png", alt: "Instagram post 4" },
  { id: 5, image: "/images/insta5.png", alt: "Instagram post 5" },
]

export function InstagramFeed() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-2xl font-bold mb-8 text-center"
        >
          Our Instagram Feed
        </motion.h2>

        {/* Mobile view (2 columns) */}
        <div className="grid grid-cols-2 gap-4 md:hidden">
          {instagramPosts.slice(0, 4).map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="overflow-hidden img-hover-zoom"
            >
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.alt}
                width={300}
                height={300}
                className="w-full aspect-square object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* Desktop view (5 columns) */}
        <div className="hidden md:grid grid-cols-5 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.03 }}
              className="overflow-hidden img-hover-zoom"
            >
              <Image
                src={post.image || "/placeholder.svg"}
                alt={post.alt}
                width={300}
                height={300}
                className="w-full aspect-square object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
