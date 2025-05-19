import { PageLayout } from "@/components/page-layout"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Sample corporate collection data
const corporateCollection = [
  {
    id: "single-breasted",
    image: "/images/corporate/single-breasted/single-breasted-1.png",
    alt: "Man in burgundy suit",
    path: "/pages/categories/corporate/single-breasted",
    title: "Single Breasted",
  },
  {
    id: "double-breasted",
    image: "/images/corporate/double-breasted/double-breasted-1.png",
    alt: "Man in navy blue suit",
    path: "/pages/categories/corporate/double-breasted",
    title: "Double Breasted",
  },
  {
    id: "overcoat",
    image: "/images/corporate/overcoat/overcoat-1.png",
    alt: "Man in gray pinstripe suit",
    path: "/pages/categories/corporate/overcoat",
    title: "Overcoats",
  },
  {
    id: "safari-suit",
    image: "/images/corporate/safari-suit/safari-suit-1.png",
    alt: "Man in black suit with tie",
    path: "/pages/categories/corporate/safari-suit",
    title: "Safari Suits",
  },
]

export default function CorporatePage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center text-black">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-black my-4 text-center flex-1">Corporate</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {corporateCollection.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div className="relative aspect-square rounded-md overflow-hidden mb-4">
                <Image src={item.image || "/placeholder.svg"} alt={item.alt} fill className="object-cover" />
              </div>
              <Link
                href={item.path}
                className="bg-black text-white py-3 px-6 rounded-full flex items-center justify-center"
              >
                <span className="mr-2 uppercase">{item.title}</span>
                <span className="text-lg">→</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}
