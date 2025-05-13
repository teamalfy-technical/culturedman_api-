"use client"

import { PageLayout } from "@/components/page-layout"
import { ProductDetail } from "@/components/product-detail"
import { notFound } from "next/navigation"
import { useParams } from "next/navigation"

// Sample corporate collection data with more details
const corporateCollection = {
  "corporate-1": {
    title: "Executive Burgundy Suit",
    colour: "Burgundy",
    size: "42 Regular",
    fit: "Modern",
    details: [
      "Material: 100% Italian Wool",
      "Two Button Closure",
      "Notch Lapel",
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
        src: "/images/corporate/single-breasted/single-breasted-1.png",
        alt: "Man in burgundy suit - front view",
      },
      {
        src: "/images/corporate/single-breasted/single-breasted-1.png",
        alt: "Man in burgundy suit - side view",
      },
      {
        src: "/images/corporate/single-breasted/single-breasted-1.png",
        alt: "Man in burgundy suit - back view",
      },
    ],
  },
  "corporate-2": {
    title: "Classic Navy Business Suit",
    colour: "Navy",
    size: "40 Regular",
    fit: "Classic",
    details: [
      "Material: Super 120s Wool",
      "Two Button Closure",
      "Notch Lapel",
      "Fully Lined Jacket",
      "Classic Fit",
      "Center Vent",
      "Flat Front Pants",
      "Pick-Stitched Details",
      "Hand Finished",
      "Dry Clean Only",
    ],
    images: [
      {
        src: "/images/corporate/double-breasted/double-breasted-1.png",
        alt: "Man in navy blue suit - front view",
      },
      {
        src: "/images/corporate/double-breasted/double-breasted-1.png",
        alt: "Man in navy blue suit - side view",
      },
      {
        src: "/images/corporate/double-breasted/double-breasted-1.png",
        alt: "Man in navy blue suit - back view",
      },
    ],
  },
  // Additional items would be defined here with similar structure
  "corporate-3": {
    title: "Gray Pinstripe Suit",
    colour: "Gray Pinstripe",
    size: "44 Regular",
    fit: "Modern",
    details: [
      "Material: Wool Blend with Subtle Pinstripes",
      "Two Button Closure",
      "Notch Lapel",
      "Fully Lined Jacket",
      "Modern Fit",
      "Double Vent",
      "Flat Front Pants",
      "Custom Alterations Available",
      "Hand Finished Details",
      "Dry Clean Only",
    ],
    images: [
      {
        src: "/images/corporate/overcoat/overcoat-1.png",
        alt: "Man in gray pinstripe suit - front view",
      },
      {
        src: "/images/corporate/overcoat/overcoat-1.png",
        alt: "Man in gray pinstripe suit - side view",
      },
      {
        src: "/images/corporate/overcoat/overcoat-1.png",
        alt: "Man in gray pinstripe suit - back view",
      },
    ],
  },
  "corporate-4": {
    title: "Black Professional Suit",
    colour: "Black",
    size: "40 Regular",
    fit: "Slim",
    details: [
      "Material: Super 130s Wool",
      "Two Button Closure",
      "Notch Lapel",
      "Fully Lined Jacket",
      "Slim Fit Design",
      "Side Vents",
      "Flat Front Pants",
      "Signature Lining",
      "Hand Finished Details",
      "Dry Clean Only",
    ],
    images: [
      {
        src: "/images/corporate/safari-suit/safari-suit-1.png",
        alt: "Man in black suit with tie - front view",
      },
      {
        src: "/images/corporate/safari-suit/safari-suit-1.png",
        alt: "Man in black suit with tie - side view",
      },
      {
        src: "/images/corporate/safari-suit/safari-suit-1.png",
        alt: "Man in black suit with tie - back view",
      },
    ],
  },
  "corporate-5": {
    title: "Light Gray Business Suit",
    colour: "Light Gray",
    size: "42 Regular",
    fit: "Modern",
    details: [
      "Material: Lightweight Wool",
      "Two Button Closure",
      "Notch Lapel",
      "Fully Lined Jacket",
      "Modern Fit",
      "Side Vents",
      "Flat Front Pants",
      "Half-Canvas Construction",
      "Hand Finished Details",
      "Dry Clean Only",
    ],
    images: [
      {
        src: "/images/corporate-5.jpg",
        alt: "Man in light gray suit - front view",
      },
      {
        src: "/images/corporate-5-alt1.jpg",
        alt: "Man in light gray suit - side view",
      },
      {
        src: "/images/corporate-5-alt2.jpg",
        alt: "Man in light gray suit - back view",
      },
    ],
  },
  "corporate-6": {
    title: "Charcoal Executive Suit",
    colour: "Charcoal",
    size: "44 Regular",
    fit: "Classic",
    details: [
      "Material: Super 150s Wool",
      "Two Button Closure",
      "Notch Lapel",
      "Fully Lined Jacket",
      "Executive Fit",
      "Side Vents",
      "Flat Front Pants",
      "Hand Finished Details",
      "Bemberg Lining",
      "Dry Clean Only",
    ],
    images: [
      {
        src: "/images/corporate-6.jpg",
        alt: "Man in charcoal suit - front view",
      },
      {
        src: "/images/corporate-6-alt1.jpg",
        alt: "Man in charcoal suit - side view",
      },
      {
        src: "/images/corporate-6-alt2.jpg",
        alt: "Man in charcoal suit - back view",
      },
    ],
  },
}

export default function CorporateItemPage() {
  const params = useParams()
  const id = params.id as string
  const item = corporateCollection[id as keyof typeof corporateCollection]

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
        backLink="/pages/categories/corporate"
        backLinkText="Back to Corporate Collection"
      />
    </PageLayout>
  )
}
