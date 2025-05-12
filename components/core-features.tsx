"use client"

import Image from "next/image"
import { motion } from "framer-motion"

export function CoreFeatures() {
  return (
    <section className="py-16 bg-black text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Text content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl font-bold mb-6">Core Features</h2>
            <div className="space-y-4 text-sm">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                viewport={{ once: true }}
                className="text-white/80"
              >
                "Our" High Values
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                viewport={{ once: true }}
                className="text-white/80"
              >
                Experience How We Go Beyond Fabric, Making A Reflection Of Your Personality. The Materials And Designs
                Have Been Carefully Selected For The Perfect Fit, Style, Durability, And Luxury From Design.
              </motion.p>
            </div>
          </motion.div>

          {/* Image showcase */}
          <div className="grid grid-cols-3 gap-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="img-hover-zoom"
            >
              <Image
                src="/images/front.png"
                alt="Suit front view"
                width={300}
                height={500}
                className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="img-hover-zoom"
            >
              <Image
                src="/images/side.png"
                alt="Suit side view"
                width={300}
                height={500}
                className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="img-hover-zoom"
            >
              <Image
                src="/images/back.png"
                alt="Suit back view"
                width={300}
                height={500}
                className="w-full h-[200px] sm:h-[250px] md:h-[300px] object-cover"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
