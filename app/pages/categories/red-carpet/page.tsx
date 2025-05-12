import { PageLayout } from "@/components/page-layout"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

// Sample red carpet collection data
const redCarpetCollection = [
  {
    id: "red-carpet-1",
    image: "/images/red-carpet-1.jpg",
    alt: "Man in black tuxedo with sunglasses",
  },
  {
    id: "red-carpet-2",
    image: "/images/red-carpet-2.jpg",
    alt: "Man in velvet dinner jacket",
  },
  {
    id: "red-carpet-3",
    image: "/images/red-carpet-3.jpg",
    alt: "Man in white dinner jacket",
  },
  {
    id: "red-carpet-4",
    image: "/images/red-carpet-4.jpg",
    alt: "Man in patterned suit",
  },
  {
    id: "red-carpet-5",
    image: "/images/red-carpet-5.jpg",
    alt: "Man in gold suit",
  },
  {
    id: "red-carpet-6",
    image: "/images/red-carpet-6.jpg",
    alt: "Man in silver tuxedo",
  },
]

export default function RedCarpetPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Link href="/" className="flex items-center text-black">
            <ArrowLeft className="h-5 w-5" />
          </Link>
          <h1 className="text-3xl font-bold text-center flex-1">Red Carpet Events</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {redCarpetCollection.map((item) => (
            <div key={item.id} className="flex flex-col">
              <div className="relative aspect-square rounded-md overflow-hidden mb-4">
                <Image src={item.image || "/placeholder.svg"} alt={item.alt} fill className="object-cover" />
              </div>
              <Link
                href={`/pages/categories/red-carpet/${item.id}`}
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
