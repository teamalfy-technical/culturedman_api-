"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Search, Menu, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Searching for:", searchQuery)
    // For example, redirect to search results page
    // router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
  }

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false)
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
      <div className="container mx-auto flex items-center justify-between">
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8">
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

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>

        {/* Search Box */}
        <form onSubmit={handleSearch} className="relative hidden md:block">
          <Input
            type="search"
            placeholder="Search Product..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-64 bg-white border-0 text-black placeholder:text-gray-400 rounded-full pl-4 pr-10 h-9"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            aria-label="Search"
          >
            <Search className="h-4 w-4" />
          </button>
        </form>

        {/* Mobile search icon */}
        <button
          className="md:hidden text-white"
          onClick={() => {
            /* Toggle mobile search */
          }}
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
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

              {/* Mobile search */}
              <form onSubmit={handleSearch} className="relative mt-2">
                <Input
                  type="search"
                  placeholder="Search Product..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white border-0 text-black placeholder:text-gray-400 rounded-full pl-4 pr-10 h-9"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
