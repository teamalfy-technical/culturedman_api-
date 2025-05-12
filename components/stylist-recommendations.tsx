"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import type { RecommendationItem } from "@/app/actions/stylist-actions"

interface StylistRecommendationsProps {
  recommendations: RecommendationItem[]
  message: string
}

export function StylistRecommendations({ recommendations, message }: StylistRecommendationsProps) {
  return (
    <div className="mt-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-100 p-6 rounded-md mb-8"
      >
        <p className="text-center text-lg">{message}</p>
      </motion.div>

      <h2 className="text-2xl font-bold mb-6 text-center">AI Recommendations</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {recommendations.map((item) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-md overflow-hidden shadow-md"
          >
            <div className="relative h-[300px]">
              <Image src={item.imageUrl || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">{item.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm">
                    <span className="font-medium">Color:</span> {item.color}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Fit:</span> {item.fit}
                  </p>
                </div>
                <p className="text-lg font-bold">{item.price}</p>
              </div>
              <button className="mt-4 w-full bg-black text-white py-2 px-4 rounded hover:bg-black/90 transition-colors">
                View Details
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
