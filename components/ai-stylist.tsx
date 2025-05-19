"use client"

import { motion } from "framer-motion"
import Link from "next/link"

export function AiStylist() {
  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-neutral-100 shadow-md rounded-[2vw] py-10 md:py-12 px-4 md:px-8 md:mx:8 text-center">
        <h2 className="text-2xl font-bold mb-4 text-black">Get Your Personal AI Stylist</h2>
        <p className="text-sm text-black max-w-2xl mx-auto mb-6">
        At The Cultured Man, we believe that true style goes beyond just wearing a well-tailored suit—it’s about expressing confidence, sophistication, and individuality. To help you achieve the perfect look, we offer an AI-powered style advisor and expert styling services tailored to your needs.
        </p>
        {/* <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}> */}
          <div className="flex justify-center">
            <Link href="/pages/ai-stylist">
              <button className="try-stylist-btn flex items-center py-8 hover:border-2 border-black rounded-pill">
                <span>TRY OUR AI STYLIST</span>
                <span className="arrow-line"></span>
              </button>
            </Link>  
          </div>
          
        {/* </motion.div> */}
      </motion.div>
    </div>
  </section>
  )
}
