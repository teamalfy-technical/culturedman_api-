"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { PageLayout } from "@/components/page-layout"
import Image from "next/image"
import Link from "next/link"
import { Loader2 } from "lucide-react"

// Mock product data for demonstration
const mockProducts = [
  {
    id: 1,
    name: "Classic Black Suit",
    category: "Corporate",
    image: "/images/corporate-1.jpg",
    // // price: "$899",
  },
  {
    id: 2,
    name: "Navy Blue Blazer",
    category: "Corporate",
    image: "/images/corporate-2.jpg",
    // price: "$799",
  },
  {
    id: 3,
    name: "White Tuxedo",
    category: "Bridal",
    image: "/images/bridal-1.jpg",
    // price: "$1,199",
  },
  {
    id: 4,
    name: "Gray Pinstripe Suit",
    category: "Corporate",
    image: "/images/corporate-3.jpg",
    // price: "$849",
  },
  {
    id: 5,
    name: "Black Tuxedo",
    category: "Red Carpet",
    image: "/images/red-carpet-1.jpg",
    // price: "$1,099",
  },
  {
    id: 6,
    name: "Beige Summer Suit",
    category: "Casual",
    image: "/images/suit-light-gray.png",
    // price: "$749",
  },
]

// Add this after the mockProducts array
const categoryKeywords = {
  bridal: ["bridal", "wedding", "groom", "nuptial", "matrimony", "marriage", "tuxedo", "white tie"],
  corporate: ["corporate", "business", "executive", "office", "professional", "work", "formal", "suit"],
  "red-carpet": ["red carpet", "dinner", "gala", "formal event", "black tie", "evening", "premiere", "awards"],
}

// Add this function before the SearchPage component
function getCategorySuggestions(query: string): { category: string; displayName: string }[] {
  const suggestions: { category: string; displayName: string }[] = []
  const lowerQuery = query.toLowerCase()

  for (const [category, keywords] of Object.entries(categoryKeywords)) {
    if (keywords.some((keyword) => lowerQuery.includes(keyword))) {
      suggestions.push({
        category,
        displayName: category === "red-carpet" ? "Red Carpet" : category.charAt(0).toUpperCase() + category.slice(1),
      })
    }
  }

  return suggestions
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<typeof mockProducts>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call with a small delay
    setLoading(true)

    const timer = setTimeout(() => {
      // Filter products based on search query
      if (query) {
        const filteredProducts = mockProducts.filter(
          (product) =>
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.category.toLowerCase().includes(query.toLowerCase()),
        )
        setResults(filteredProducts)
      } else {
        setResults([])
      }
      setLoading(false)
    }, 1000) // Increased delay to make loading state more visible

    return () => clearTimeout(timer)
  }, [query])

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center mb-6">
          <h1 className="text-2xl font-bold text-black text-center">Search Results for: "{query}"</h1>
          {loading && (
            <div className="ml-4">
              <Loader2 className="h-5 w-5 animate-spin text-black" />
            </div>
          )}
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="h-12 w-12 animate-spin text-black mb-4" />
            <p className="text-gray-600">Searching for products...</p>
          </div>
        ) : (
          <>
            {/* Category Suggestions */}
            {query && (
              <div className="mb-8">
                {getCategorySuggestions(query).length > 0 && (
                  <div className="bg-gray-100 p-4 rounded-md">
                    <h2 className="text-lg font-semibold text-black mb-2">Category Suggestions:</h2>
                    <div className="flex flex-wrap gap-2">
                      {getCategorySuggestions(query).map((suggestion) => (
                        <Link
                          key={suggestion.category}
                          href={`/pages/categories/${suggestion.category}`}
                          className="bg-black text-black px-4 py-2 rounded-full text-sm hover:bg-gray-800 transition-colors"
                        >
                          Browse {suggestion.displayName} Collection
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Search Results */}
            {results.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {results.map((product) => (
                  <div key={product.id} className="border p-4 rounded-md shadow-sm hover:shadow-md transition-shadow">
                    <div className="relative h-64 mb-4">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover rounded-md"
                      />
                    </div>
                    <h2 className="text-lg font-semibold">{product.name}</h2>
                    <p className="text-sm text-gray-600 mb-2">Category: {product.category}</p>
                    {/* <p className="text-lg font-bold">{product.// price}</p> */}
                    <Link
                      href={`/pages/categories/${product.category.toLowerCase().replace(" ", "-")}/${product.id}`}
                      className="mt-4 inline-block bg-black text-white py-2 px-4 rounded-full text-sm"
                    >
                      View Details
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg mb-4 text-black">No products found matching your search.</p>
                <p className="text-black">Try using different keywords or browse our categories.</p>
                <div className="mt-8 flex md:flex-nowrap flex-wrap  justify-center gap-4">
                  <Link href="/pages/categories/bridal" className="bg-black hover:bg-neutral-900 text-white px-4 py-2 rounded-full text-sm mb-4">
                    Bridal Collection
                  </Link>
                  <Link
                    href="/pages/categories/corporate"
                    className="bg-black hover:bg-neutral-900 text-white px-4 py-2 rounded-full text-sm mb-4" 
                  >Corporate Collection
                  </Link>
                  <Link
                    href="/pages/categories/red-carpet"
                    className="bg-black hover:bg-neutral-900 text-white px-4 py-2 rounded-full text-sm mb-4"
                  >
                    Red Carpet Collection
                  </Link>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </PageLayout>
  )
}
