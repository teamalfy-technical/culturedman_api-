import { PageLayout } from "@/components/page-layout"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Sample overcoat collection data
const overcoatCollection = [
  {
    id: "overcoat-1",
    image: "/images/corporate/overcoat/over-coat.jpg",
    alt: "Man in camel overcoat",
  },
  {
    id: "overcoat-2",
    image: "/images/corporate/overcoat/overcoat-1.png",
    alt: "Man in navy blue overcoat",
  },
  {
    id: "overcoat-3",
    image: "/images/corporate/overcoat/over-coat-2.jpg",
    alt: "Man in charcoal overcoat",
  },
  {
    id: "overcoat-4",
    image: "/images/corporate/overcoat/over-coat-3.jpg",
    alt: "Man in black overcoat",
  },
   {
    id: "overcoat-5",
    image: "/images/corporate/overcoat/over-coat-4.jpg",
    alt: "Man in black overcoat",
  },
   {
    id: "overcoat-6",
    image: "/images/corporate/overcoat/over-coat-5.jpg",
    alt: "Man in black overcoat",
  },
]

export default function OvercoatPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/pages/categories/corporate" className="flex items-center text-black">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-black my-4 text-center flex-1">Overcoats</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {overcoatCollection.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div className="relative aspect-square rounded-md overflow-hidden mb-4">
                <Image src={item.image || "/placeholder.svg"} alt={item.alt} fill className="object-cover center-center" />
              </div>
              <Link
                href={`/pages/categories/overcoat/${item.id}`}
                className="bg-black text-white py-3 px-6 rounded-full flex items-center justify-center"
              >
                <span className="mr-2">DETAILS</span>
                <span className="text-lg">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
