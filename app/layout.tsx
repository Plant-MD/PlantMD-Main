import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "@/components/ui/sonner"
import Layout from "@/components/layout"
import Footer from "@/components/footer"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Plant MD - Diagnose Plant Disease Instantly",
  description:
    "PlantMD is a smart mobile application that helps farmers identify plant diseases early and suggest reliable treatment methods using advanced AI technology.",
  keywords: "plant disease, agriculture, farming, AI diagnosis, plant health, crop management",
  authors: [{ name: "Plant MD Team" }],
  creator: "Plant MD",
  publisher: "Plant MD",
  openGraph: {
    title: "Plant MD - Diagnose Plant Disease Instantly",
    description: "Smart mobile application for early plant disease identification using AI technology.",
    url: "https://plantmd.com",
    siteName: "Plant MD",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Plant MD - AI Plant Disease Diagnosis",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Plant MD - Diagnose Plant Disease Instantly",
    description: "Smart mobile application for early plant disease identification using AI technology.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <Layout>
          {children}
        </Layout>
        <Footer />
        <Toaster />
      </body>
    </html>
  )
}