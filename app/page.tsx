import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { CeremonialSuits } from "@/components/ceremonial-suits"
// import { FeaturedCollection } from "@/components/featured-collection"
import { Categories } from "@/components/categories"
import { StylistSection } from "@/components/stylist-section"
import { FashionShowcase } from "@/components/fashion-showcase"
import { Footer } from "@/components/footer"
// import { NavigationArrows } from "@/components/navigation-arrows"
import { ScrollToTop } from "@/components/scroll-to-top"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Header component */}
      <Header />

      {/* Main content */}
      <div className="flex-1">
        {/* Hero section */}
        <HeroSection />

        {/* Ceremonial Suits section */}
        <CeremonialSuits />

        {/* Featured collection */}
        {/* <FeaturedCollection /> */}

        {/* Categories */}
        <Categories />

        {/* AI stylist */}
        <StylistSection />

        {/* Fashion showcase */}
        <FashionShowcase />
      </div>

      {/* Navigation arrows */}
      {/* <NavigationArrows /> */}

      {/* Scroll to top button */}
      <ScrollToTop />

      {/* Footer */}
      <Footer />
    </main>
  )
}
