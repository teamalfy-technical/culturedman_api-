"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, Menu, X, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showMobileSearch, setShowMobileSearch] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  // Add this mapping of search terms to category pages right after the state declarations
  const categoryKeywords = {
    bridal: ["bridal", "wedding", "groom", "nuptial", "matrimony", "marriage", "tuxedo", "white tie"],
    corporate: ["corporate", "business", "executive", "office", "professional", "work", "formal", "suit"],
    "red-carpet": ["red carpet", "dinner", "gala", "formal event", "black tie", "evening", "premiere", "awards"],
  }

  // Check if we're on the homepage
  const isHomePage = pathname === "/"

  // Set isMounted to true after component mounts to avoid hydration issues
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Reset search state when pathname changes (navigation completes)
  useEffect(() => {
    setIsSearching(false)
  }, [pathname])

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Replace the existing handleSearch function with this updated version
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchQuery.trim()) {
      // Set searching state to true to show loader
      setIsSearching(true)

      const query = searchQuery.trim().toLowerCase()

      // Check if the search query matches any category keywords
      let categoryMatch = null

      for (const [category, keywords] of Object.entries(categoryKeywords)) {
        if (keywords.some((keyword) => query.includes(keyword))) {
          categoryMatch = category
          break
        }
      }

      // Add a small delay to make the loader visible
      setTimeout(() => {
        if (categoryMatch) {
          // Redirect to the matching category page
          router.push(`/pages/categories/${categoryMatch}`)
        } else {
          // Fall back to regular search results page
          router.push(`/search?q=${encodeURIComponent(query)}`)
        }

        // Reset search query
        setSearchQuery("")
        setShowMobileSearch(false)

        // Note: isSearching will be reset by the useEffect that watches pathname
      }, 500)
    }
  }

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
        setShowMobileSearch(false)
      }
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 py-4 lg:rounded-full lg:mx-8 lg:my-2 transition-all duration-300 ${
        scrolled ? "bg-black/90 backdrop-blur-md" : "bg-black"
      }`}
    >
      <div className="container mx-auto px-4">
        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between px-5">
          {/* Desktop Navigation Links */}
          <nav className="flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-white/80 text-sm">
              Home
            </Link>
            <Link href="/pages/about" className="text-white hover:text-white/80 text-sm">
              About Us
            </Link>
            <Link href="/pages/contact" className="text-white hover:text-white/80 text-sm">
              Contact Us
            </Link>
          </nav>

          {/* Desktop Logo - Show on non-homepage */}
          {!isHomePage && isMounted && (
            <Link href="/" className="absolute left-1/2 transform -translate-x-1/2">
              <Image
                src="/images/footer-logo.png"
                alt="The Cultured Man Logo"
                width={90}
                height={90}
                className="object-contain"
              />
            </Link>
          )}

          {/* Search Box */}
          <form onSubmit={handleSearch} className="relative">
            <Input
              type="search"
              placeholder="Search Product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-64 bg-white border-0 text-black placeholder:text-gray-400 rounded-full pl-4 pr-10 h-9"
              disabled={isSearching}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              {isSearching ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <button type="submit" aria-label="Search">
                  <Search className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Mobile Header */}
        <div className="flex md:hidden items-center justify-between">
          {/* Mobile menu button */}
          <button className="text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          {/* Mobile Logo - Always centered */}
          {isMounted && (
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/">
                <Image
                  src="https://cultured-man.teamalfy.co.uk/images/footer-logo.png"
                  alt="The Cultured Man Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                />
              </Link>
            </div>
          )}

          {/* Mobile search icon */}
          <button
            className="text-white"
            onClick={() => !isSearching && setShowMobileSearch(!showMobileSearch)}
            aria-label="Search"
            disabled={isSearching}
          >
            {isSearching ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : showMobileSearch ? (
              <X className="h-5 w-5" />
            ) : (
              <Search className="h-5 w-5" />
            )}
          </button>
        </div>

        {/* Mobile Search Bar - Slide down when active */}
        <AnimatePresence>
          {showMobileSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4"
            >
              <form onSubmit={handleSearch} className="relative">
                <Input
                  type="search"
                  placeholder="Search Product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border-0 text-black placeholder:text-gray-400 rounded-full pl-4 pr-10 h-9"
                  autoFocus
                  disabled={isSearching}
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  {isSearching ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <button type="submit" aria-label="Search">
                      <Search className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black overflow-hidden"
          >
            <div className="p-4 flex flex-col space-y-4">
              <Link
                href="/"
                className="text-white hover:text-white/80 text-sm py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/pages/about"
                className="text-white hover:text-white/80 text-sm py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="/pages/contact"
                className="text-white hover:text-white/80 text-sm py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
