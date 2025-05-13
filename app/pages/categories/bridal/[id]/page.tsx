"use client"

import { PageLayout } from "@/components/page-layout"
import { ProductDetail } from "@/components/product-detail"
import { notFound } from "next/navigation"
import { useParams } from "next/navigation"

// Sample bridal collection data with more details
const bridalCollection = {
  "bridal-1": {
    title: "Classic White Tuxedo",
    colour: "Black",
    size: "40 Regular",
    fit: "Modern",
    details: [
      "Material: Premium Italian Fabric",
      "Single Button Closure",
      "Shawl Collar with Satin Facing",
      "Fully Lined Jacket",
      "Modern Fit Design",
      "Side Vents",
      "Flat Front Pants, Lined To The Knee",
      "Unhemmed For Tailoring",
      "Hand Finished Details",
      "Dry Clean Only",
    ],
    images: [
      {
        src: "/images/bridal/bridal-1.png",
        alt: "Man in white tuxedo - front view",
      },
      {
        src: "/images/bridal/bridal-1.png",
        alt: "Man in white tuxedo - side view",
      },
      {
        src: "/images/bridal/bridal-1.png",
        alt: "Man in white tuxedo - back view",
      },
    ],
  },
  "bridal-2": {
    title: "Groomsmen Collection",
    colour: "Black",
    size: "Various",
    fit: "Classic",
    details: [
      "Material: Wool Blend",
      "Two Button Closure",
      "Notch Lapel",
      "Fully Lined Jacket",
      "Classic Fit",
      "Center Vent",
      "Flat Front Pants",
      "Group Fitting Available",
      "Hand Finished Details",
      "Dry Clean Only",
    ],
    images: [
      {
        src: "/images/bridal/bridal-2.png",
        alt: "Group of men in black tuxedos - front view",
      },
      {
        src: "/images/bridal/bridal-2.png",
        alt: "Group of men in black tuxedos - side view",
      },
      {
        src: "/images/bridal/bridal-2.png",
        alt: "Group of men in black tuxedos - back view",
      },
    ],
  },
  // Additional items would be defined here with similar structure
  "bridal-3": {
    title: "White Dinner Jacket",
    colour: "White",
    size: "42 Regular",
    fit: "Slim",
    details: [
      "Material: Super 120s Wool",
      "Single Button Closure",
      "Satin Peak Lapel",
      "Fully Lined Jacket",
      "Slim Fit Design",
      "Side Vents",
      "Black Satin Trousers Available",
      "Hand Finished Details",
      "Dry Clean Only",
    ],
    images: [
      {
        src: "/images/bridal/bridal-3.png",
        alt: "Man in white dinner jacket - front view",
      },
      {
        src: "/images/bridal/bridal-3.png",
        alt: "Man in white dinner jacket - side view",
      },
      {
        src: "/images/bridal/bridal-3.png",
        alt: "Man in white dinner jacket - back view",
      },
    ],
  },
  "bridal-4": {
    title: "Matching Groomsmen Suits",
    colour: "Black",
    size: "Various",
    fit: "Modern",
    details: [
      "Material: Wool Blend",
      "Two Button Closure",
      "Notch Lapel",
      "Fully Lined Jacket",
      "Modern Fit",
      "Side Vents",
      "Flat Front Pants",
      "Group Discounts Available",
      "Hand Finished Details",
      "Dry Clean Only",
    ],
    images: [
      {
        src: "/images/bridal/bridal-4.png",
        alt: "Group of groomsmen in matching suits - front view",
      },
      {
        src: "/images/bridal/bridal-4.png",
        alt: "Group of groomsmen in matching suits - side view",
      },
      {
        src: "/images/bridal/bridal-4.png",
        alt: "Group of groomsmen in matching suits - back view",
      },
    ],
  },
  "bridal-5": {
    title: "Reception White Jacket",
    colour: "White",
    size: "40 Regular",
    fit: "Modern",
    details: [
      "Material: Lightweight Wool Blend",
      "Single Button Closure",
      "Satin Shawl Collar",
      "Fully Lined Jacket",
      "Modern Fit",
      "Side Vents",
      "Perfect for Destination Weddings",
      "Hand Finished Details",
      "Dry Clean Only",
    ],
    images: [
      {
        src: "/images/bridal/bridal-5.png",
        alt: "Man in white jacket at wedding - front view",
      },
      {
        src: "/images/bridal/bridal-5.png",
        alt: "Man in white jacket at wedding - side view",
      },
      {
        src: "/images/bridal/bridal-5.png",
        alt: "Man in white jacket at wedding - back view",
      },
    ],
  },
  "bridal-6": {
    title: "Wedding Party Collection",
    colour: "Black",
    size: "Various",
    fit: "Classic",
    details: [
      "Material: Premium Wool",
      "Two Button Closure",
      "Notch Lapel",
      "Fully Lined Jacket",
      "Classic Fit",
      "Side Vents",
      "Matching Accessories Available",
      "Group Fittings",
      "Hand Finished Details",
      "Dry Clean Only",
    ],
    images: [
      {
        src: "/images/bridal/bridal-6.png",
        alt: "Wedding party in formal wear - front view",
      },
      {
        src: "/images/bridal/bridal-6.png",
        alt: "Wedding party in formal wear - side view",
      },
      {
        src: "/images/bridal/bridal-6.png",
        alt: "Wedding party in formal wear - back view",
      },
    ],
  },
}

export default function BridalItemPage() {
  const params = useParams()
  const id = params.id as string
  const item = bridalCollection[id as keyof typeof bridalCollection]

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
        backLink="/pages/categories/bridal"
        backLinkText="Back to Bridal Collection"
      />
    </PageLayout>
  )
}
