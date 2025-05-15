import Link from "next/link"
import { PageLayout } from "@/components/page-layout"
import { CheckCircle } from "lucide-react"

export default function ThankYouPage() {
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-600" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-black">Thank You!</h1>

          <p className="text-lg mb-8 text-black">
            Your message has been received. We appreciate your interest and will get back to you shortly.
          </p>

          <Link
            href="/"
            className="bg-black text-white py-3 px-8 rounded-full inline-block hover:bg-neutral-800 transition-colors"
          >
            Return to Home
          </Link>
        </div>
      </div>
    </PageLayout>
  )
}
