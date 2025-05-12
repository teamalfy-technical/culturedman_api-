"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface ProductImage {
  src: string
  alt: string
}

interface ProductDetail {
  title: string
  colour: string
  size: string
  fit: string
  details: string[]
  images: ProductImage[]
  backLink: string
  backLinkText: string
}

export function ProductDetail({ title, colour, size, fit, details, images, backLink, backLinkText }: ProductDetail) {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Link href={backLink} className="flex items-center text-black">
          <ArrowLeft className="h-5 w-5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Product Images */}
        <div className="flex flex-col">
          <div className="relative aspect-[4/5] rounded-md overflow-hidden mb-4 border border-gray-200">
            <Image
              src={images[selectedImage].src || "/placeholder.svg"}
              alt={images[selectedImage].alt}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex space-x-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-24 h-24 border ${selectedImage === index ? "border-black" : "border-gray-200"}`}
              >
                <Image src={image.src || "/placeholder.svg"} alt={image.alt} fill className="object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Information */}
        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-8">{title}</h1>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div>
              <h2 className="font-medium">Colour</h2>
              <p>{colour}</p>
            </div>
            <div>
              <h2 className="font-medium">Size</h2>
              <p>{size}</p>
            </div>
            <div>
              <h2 className="font-medium">Fit</h2>
              <p>{fit}</p>
            </div>
          </div>

          <ul className="list-disc pl-5 mb-8 space-y-2">
            {details.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>

          <Link
            href="/pages/schedule-appointment"
            className="border border-black text-black py-3 px-6 rounded-full text-center uppercase tracking-wide hover:bg-black hover:text-white transition-colors"
          >
            BOOK CONSULTATION APPOINTMENT
          </Link>
        </div>
      </div>
    </div>
  )
}
