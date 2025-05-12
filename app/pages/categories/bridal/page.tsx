import { PageLayout } from "@/components/page-layout"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Sample bridal collection data
const bridalCollection = [
  {
    id: "bridal-1",
    image: "/images/bridal/bridal-1.png",
    alt: "Man in white tuxedo with black bow tie",
  },
  {
    id: "bridal-2",
    image: "/images/bridal/bridal-2.png",
    alt: "Group of men in black tuxedos",
  },
  {
    id: "bridal-3",
    image: "/images/bridal/bridal-3.png",
    alt: "Man in white dinner jacket",
  },
  {
    id: "bridal-4",
    image: "/images/bridal/bridal-4.png",
    alt: "Group of groomsmen in matching suits",
  },
  {
    id: "bridal-5",
    image: "/images/bridal/bridal-5.png",
    alt: "Man in white jacket at wedding",
  },
  {
    id: "bridal-6",
    image: "/images/bridal/bridal-6.png",
    alt: "Group photo with men in formal wear",
  },
]

export default function BridalPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center text-black">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-center flex-1 text-black mb-4">Bridal</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {bridalCollection.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div className="relative aspect-square rounded-md overflow-hidden mb-4">
                <Image src={item.image || "/placeholder.svg"} alt={item.alt} fill className="object-cover" />
              </div>
              <Link
                href={`/pages/categories/bridal/${item.id}`}
                className="bg-[#1a1a1a] text-white py-3 px-6 rounded-full flex items-center justify-center"
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
