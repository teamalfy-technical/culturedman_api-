"use client"

import { PageLayout } from "@/components/page-layout"
import { ProductDetail } from "@/components/product-detail"
import { notFound } from "next/navigation"
import { useParams } from "next/navigation"

// Sample single breasted collection data with more details
const doubleBreastedCollection = {
  "double-breasted-1": {
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
        src: "/images/corporate/double-breasted/double-breasted-1.png",
        alt: "Man in burgundy suit - front view",
      },
      {
        src: "/images/corporate/double-breasted/double-breasted-1.png",
        alt: "Man in burgundy suit - side view",
      },
      {
        src: "/images/corporate/double-breasted/double-breasted-1.png",
        alt: "Man in burgundy suit - back view",
      },
    ],
  },
  "double-breasted-2": {
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
        src: "/images/corporate/double-breasted/double-breasted-2.jpeg",
        alt: "Man in navy blue suit - front view",
      },
      {
        src: "/images/corporate/double-breasted/double-breasted-2.jpeg",
        alt: "Man in navy blue suit - side view",
      },
      {
        src: "/images/corporate/double-breasted/double-breasted-2.jpeg",
        alt: "Man in navy blue suit - back view",
      },
    ],
  },
  "double-breasted-3": {
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
        src: "/images/corporate/double-breasted/double-breasted-3.jpeg",
        alt: "Man in gray pinstripe suit - front view",
      },
      {
        src: "/images/corporate/double-breasted/double-breasted-3.jpeg",
        alt: "Man in gray pinstripe suit - side view",
      },
      {
        src: "/images/corporate/double-breasted/double-breasted-3.jpeg",
        alt: "Man in gray pinstripe suit - back view",
      },
    ],
  },
  "double-breasted-4": {
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
        src: "/images/corporate/double-breasted/double-breasted-4.jpeg",
        alt: "Man in black suit with tie - front view",
      },
      {
        src: "/images/corporate/double-breasted/double-breasted-4.jpeg",
        alt: "Man in black suit with tie - side view",
      },
      {
        src: "/images/corporate/double-breasted/double-breasted-4.jpeg",
        alt: "Man in black suit with tie - back view",
      },
    ],
  },
  "double-breasted-5": {
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
        src: "/images/corporate/double-breasted/double-breasted-5.jpeg",
        alt: "Man in black suit with tie - front view",
      },
      {
        src: "/images/corporate/double-breasted/double-breasted-5.jpeg",
        alt: "Man in black suit with tie - side view",
      },
      {
        src: "/images/corporate/double-breasted/double-breasted-5.jpeg",
        alt: "Man in black suit with tie - back view",
      },
    ],
  },
  "double-breasted-6": {
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
        src: "/images/corporate/double-breasted/double-breasted-6.jpeg",
        alt: "Man in black suit with tie - front view",
      },
      {
        src: "/images/corporate/double-breasted/double-breasted-6.jpeg",
        alt: "Man in black suit with tie - side view",
      },
      {
        src: "/images/corporate/double-breasted/double-breasted-6.jpeg",
        alt: "Man in black suit with tie - back view",
      },
    ],
  },
}

export default function DoubleBreastedItemPage() {
  const params = useParams()
  const id = params.id as string
  const item = doubleBreastedCollection[id as keyof typeof doubleBreastedCollection]

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
        backLink="/pages/categories/corporate/double-breasted"
        backLinkText="Back to Single Breasted Collection"
      />
    </PageLayout>
  )
}
