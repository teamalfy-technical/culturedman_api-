"use client"

import { PageLayout } from "@/components/page-layout"
import { ProductDetail } from "@/components/product-detail"
import { notFound } from "next/navigation"
import { useParams } from "next/navigation"

// Sample red carpet collection data with more details
const redCarpetCollection = {
  "red-carpet-1": {
    title: "Single Breasted Suit",
    colour: "Black",
    size: "36 Short",
    fit: "Modern",
    details: [
      "Material: Poly / Rayon",
      "Two Button Jacket Closure",
      "Classic Notch Lapel",
      "Modern Fit And Slim Fit Jacket Fully Lined",
      "Modern Fit Or Slim Fit Suit",
      "Side Vents",
      "Flat Front Pants, Lined To The Knee",
      "Unhemmed For Tailoring",
      "Hand Sawn",
      "Dry Clean Only",
    ],
    images: [
      {
        src: "/images/red-carpet/red-carpet-1.png",
        alt: "Man in black tuxedo with sunglasses - front view",
      },
      {
        src: "/images/red-carpet/red-carpet-1.png",
        alt: "Man in black tuxedo with sunglasses - side view",
      },
      {
        src: "/images/red-carpet/red-carpet-1.png",
        alt: "Man in black tuxedo with sunglasses - back view",
      },
    ],
  },
  "red-carpet-2": {
    title: "Velvet Dinner Jacket",
    colour: "Burgundy",
    size: "38 Regular",
    fit: "Slim",
    details: [
      "Material: Premium Cotton Velvet",
      "Single Button Closure",
      "Satin Shawl Collar",
      "Fully Lined Jacket",
      "Slim Fit Design",
      "Side Vents",
      "Matching Trousers Available",
      "Hand Finished Details",
      "Dry Clean Only",
    ],
    images: [
      {
        src: "/images/red-carpet/red-carpet-2.png",
        alt: "Man in velvet dinner jacket - front view",
      },
      {
        src: "/images/red-carpet/red-carpet-2.png",
        alt: "Man in velvet dinner jacket - side view",
      },
      {
        src: "/images/red-carpet/red-carpet-2.png",
        alt: "Man in velvet dinner jacket - back view",
      },
    ],
  },
  "red-carpet-3": {
    title: "White Dinner Jacket",
    colour: "White",
    size: "40 Regular",
    fit: "Classic",
    details: [
      "Material: Wool Blend",
      "Single Button Closure",
      "Peak Lapel with Satin Facing",
      "Fully Lined Jacket",
      "Classic Fit",
      "Center Vent",
      "Black Trousers Included",
      "Hand Finished Details",
      "Dry Clean Only",
    ],
    images: [
      {
        src: "/images/red-carpet/red-carpet-3.png",
        alt: "Man in white dinner jacket - front view",
      },
      {
        src: "/images/red-carpet/red-carpet-3.png",
        alt: "Man in white dinner jacket - side view",
      },
      {
        src: "/images/red-carpet/red-carpet-3.png",
        alt: "Man in white dinner jacket - back view",
      },
    ],
  },
  "red-carpet-4": {
    title: "Patterned Formal Suit",
    colour: "Blue Pattern",
    size: "42 Long",
    fit: "Modern",
    details: [
      "Material: Custom Jacquard Fabric",
      "Two Button Closure",
      "Notch Lapel",
      "Fully Lined Jacket",
      "Modern Fit",
      "Side Vents",
      "Flat Front Pants",
      "Hand Finished Details",
      "Dry Clean Only",
    ],
    images: [
      {
        src: "/images/red-carpet/red-carpet-4.png",
        alt: "Man in patterned suit - front view",
      },
      {
        src: "/images/red-carpet/red-carpet-4.png",
        alt: "Man in patterned suit - side view",
      },
      {
        src: "/images/red-carpet/red-carpet-4.png",
        alt: "Man in patterned suit - back view",
      },
    ],
  },
  "red-carpet-5": {
    title: "Gold Metallic Suit",
    colour: "Gold",
    size: "40 Regular",
    fit: "Slim",
    details: [
      "Material: Metallic Blend Fabric",
      "Single Button Closure",
      "Shawl Collar",
      "Fully Lined Jacket",
      "Slim Fit Design",
      "Side Vents",
      "Flat Front Pants",
      "Hand Finished Details",
      "Dry Clean Only",
    ],
    images: [
      {
        src: "/images/red-carpet/red-carpet-5.png",
        alt: "Man in gold suit - front view",
      },
      {
        src: "/images/red-carpet/red-carpet-5.png",
        alt: "Man in gold suit - side view",
      },
      {
        src: "/images/red-carpet/red-carpet-5.png",
        alt: "Man in gold suit - back view",
      },
    ],
  },
  "red-carpet-6": {
    title: "Silver Anniversary Tuxedo",
    colour: "Silver",
    size: "38 Short",
    fit: "Classic",
    details: [
      "Material: Wool Blend with Silver Threads",
      "Single Button Closure",
      "Peak Lapel",
      "Fully Lined Jacket",
      "Classic Fit",
      "Side Vents",
      "Flat Front Pants",
      "Hand Finished Details",
      "Dry Clean Only",
    ],
    images: [
      {
        src: "/images/red-carpet/red-carpet-6.png",
        alt: "Man in silver tuxedo - front view",
      },
      {
        src: "/images/red-carpet/red-carpet-6.png",
        alt: "Man in silver tuxedo - side view",
      },
      {
        src: "/images/red-carpet/red-carpet-6.png",
        alt: "Man in silver tuxedo - back view",
      },
    ],
  },
}

export default function RedCarpetItemPage() {
  const params = useParams()
  const id = params.id as string
  const item = redCarpetCollection[id as keyof typeof redCarpetCollection]

  if (!item) {
    notFound()
  }

  return (
    <PageLayout>
      <ProductDetail
        title={item.title}
        colour={item.colour}
        size={item.size}
        fit={item.fit}
        details={item.details}
        images={item.images}
        backLink="/pages/categories/red-carpet"
        backLinkText="Back to Red Carpet Collection"
      />
    </PageLayout>
  )
}
