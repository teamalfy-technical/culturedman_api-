"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"
import { motion } from "framer-motion"

export function FashionFingertips() {
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
          Fashion At Your Fingertips
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Left image - full width on mobile, 2/3 on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-1 md:col-span-2 img-hover-zoom"
          >
            <Image
              src="/images/fashion1.png"
              alt="Man in brown suit"
              width={800}
              height={500}
              className="w-full h-[300px] sm:h-[400px] object-cover"
            />
          </motion.div>

          {/* Collection stats card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
            className="bg-black text-white p-6 flex flex-col justify-between hover-scale"
          >
            <div>
              <motion.h3
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.4 }}
                viewport={{ once: true }}
                className="text-3xl font-bold"
              >
                1200+
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.4 }}
                viewport={{ once: true }}
                className="text-lg font-medium mt-2"
              >
                Designer Collection
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5, duration: 0.4 }}
                viewport={{ once: true }}
                className="text-sm text-white/70 mt-4"
              >
                Elevate Your Wardrobe With Our Perfect Craft. Discover Your Signature Style Through Our Bespoke
                Tailoring Services. We Are Here To Serve You.
              </motion.p>
            </div>
            <div className="mt-auto">
              <motion.div whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="outline"
                  className="mt-4 border-white text-white hover:bg-white hover:text-black group"
                >
                  Shop Now
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Bottom image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-1 img-hover-zoom"
          >
            <Image
              src="/images/fashion2.png"
              alt="Man in white shirt"
              width={400}
              height={300}
              className="w-full h-[250px] object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
