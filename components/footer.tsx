"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter} from "lucide-react"
import { FaPinterest, FaTiktok } from "react-icons/fa"
import { FaXTwitter } from "react-icons/fa6";
export function Footer() {
  return (
    <footer className="bg-white text-white lg:py-4 sm:py-0 lg:px-8 md:px-2">
      <div className="container bg-black rounded-[2vw] py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8  ">
          {/* Left Column */}
          <div className="flex flex-col space-y-6 order-2 md:order-1 text-center md:text-left">
            <h4 className="text-base font-medium">HELP & INFORMATION</h4>
            <Link href="/pages/help" className="text-sm hover:underline">
              Help
            </Link>
            <div className="mt-auto">
              <p className="text-sm text-white/70">Copyright @2025</p>
            </div>
          </div>

          {/* Center Column */}
          <div className="flex flex-col items-center justify-between order-1 md:order-2 mb-8 md:mb-0">
            <div className="flex flex-col items-center">
              <div className="flex justify-center">
                <img className="px-10" width="200px" height="100px" src="/images/footer-logo.png" alt="cultured-man logo white" />
              </div>
            </div>
            <div className="flex space-x-6 mt-8">
              <Link href="https://www.instagram.com/theculturedman_?igsh=NGZ5bmNrYWU3aXFj" className="text-white hover:text-white/80">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="https://pin.it/as9NwEZga" >
                <FaPinterest className="h-5 w-5 text-white hover:text-white/80" />
              </Link>
              <Link href="https://www.facebook.com/theculturedman.est/" className="text-white hover:text-white/80">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="https://www.tiktok.com/@theculturedman001?_t=ZM-8wXaypXtxsE&_r=1" className="text-white hover:text-white/80">
                <FaTiktok className="h-5 w-5 text-white hover:text-white/80" />
                <span className="sr-only">Tiktok</span>
              </Link>
              {/* <a
                href="https://x.com/theculturedman_"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-white/80"
              >
                <FaXTwitter className="h-5 w-5 text-white hover:text-white/80" />
                <span className="sr-only">Twitter</span>
              </a> */}
              <Link href="https://x.com/theculturedman_" className="text-white hover:text-white/80">
                <FaXTwitter className="h-5 w-5 text-white hover:text-white/80" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col items-center md:items-end space-y-6 order-3 md:order-3">
            <h4 className="text-base font-medium">MORE DETAILS</h4>
            <Link href="/pages/about" className="text-sm hover:underline">
              About us
            </Link>
            <Link href="/pages/contact" className="text-sm hover:underline">
              Contact Us
            </Link>
            <Link href="/pages/privacy" className="text-sm hover:underline text-white-300">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
