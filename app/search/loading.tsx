import { PageLayout } from "@/components/page-layout"
import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-16 w-16 animate-spin text-black mb-6" />
          <h1 className="text-2xl font-bold mb-2 text-black">Searching...</h1>
          <p className="text-black">Looking for the perfect outfit for you</p>
        </div>
      </div>
    </PageLayout>
  )
}
