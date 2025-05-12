import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

interface PageLayoutProps {
  children: React.ReactNode
}

export function PageLayout({ children }: PageLayoutProps) {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header component */}
      <Header />

      {/* Main content */}
      <div className="flex-1 pt-24 pb-16">{children}</div>

      {/* Footer */}
      <Footer />
    </main>
  )
}
