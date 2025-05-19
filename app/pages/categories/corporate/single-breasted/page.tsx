import { PageLayout } from "@/components/page-layout"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Sample single breasted collection data
const singleBreastedCollection = [
  {
    id: "single-breasted-1",
    image: "/images/corporate/single-breasted/single-breasted-1.png",
    alt: "Man in burgundy single breasted suit",
  },
  {
    id: "single-breasted-2",
    image: "/images/corporate/single-breasted/single-breasted-2.png",
    alt: "Man in navy blue single breasted suit",
  },
  {
    id: "single-breasted-3",
    image: "/images/corporate/single-breasted/single-breasted-3.png",
    alt: "Man in gray single breasted suit",
  },
  {
    id: "single-breasted-4",
    image: "/images/corporate/single-breasted/single-breasted-4.png",
    alt: "Man in black single breasted suit",
  },
]

export default function SingleBreastedPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/pages/categories/corporate" className="flex items-center text-black">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-black my-4 text-center flex-1">Single Breasted</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {singleBreastedCollection.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div className="relative aspect-square rounded-md overflow-hidden mb-4">
                <Image src={item.image || "/placeholder.svg"} alt={item.alt} fill className="object-cover" />
              </div>
              <Link
                href={`/pages/categories/corporate/single-breasted/${item.id}`}
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
