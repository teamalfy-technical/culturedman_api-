import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import "./phone-input.css" // Import the phone input styles
import { ThemeProvider } from "@/components/theme-provider"

export const metadata: Metadata = {
  title: "Bespoke Tailoring | Redefining Elegance",
  description: "Experience the art of bespoke tailoring with our premium collection of handcrafted suits.",
  icons: {
    icon: [
      { url: "/images/favicon-32x32.png", sizes: "32x32" },
      { url: "/icon.png", sizes: "192x192" },
    ],
    apple: { url: "/apple-icon.png", sizes: "180x180" },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-serif">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
