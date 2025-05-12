"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

// Mock product data for demonstration
const mockProducts = [
  { id: 1, name: "Classic Black Suit", category: "Corporate" },
  { id: 2, name: "Navy Blue Blazer", category: "Corporate" },
  { id: 3, name: "White Tuxedo", category: "Bridal" },
  { id: 4, name: "Gray Pinstripe Suit", category: "Corporate" },
  { id: 5, name: "Black Tuxedo", category: "Red Carpet" },
  { id: 6, name: "Beige Summer Suit", category: "Casual" },
]

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q") || ""
  const [results, setResults] = useState<typeof mockProducts>([])

  useEffect(() => {
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
  }, [query])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Search Results for: {query}</h1>

          {results.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {results.map((product) => (
                <div key={product.id} className="border p-4 rounded">
                  <h2 className="text-lg font-semibold">{product.name}</h2>
                  <p className="text-sm text-gray-600">Category: {product.category}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No products found matching your search.</p>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
