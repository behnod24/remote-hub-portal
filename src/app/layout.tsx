
import type { Metadata } from "next"
import { Inter, Outfit } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Sidebar from "@/components/layout/Sidebar"
import Footer from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" })

export const metadata: Metadata = {
  title: "JobHub - Modern Job Board Platform",
  description: "Find your next career opportunity with JobHub",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} font-sans`}>
        <div className="flex min-h-screen">
          <Sidebar />
          <div className="flex-1">
            <Header />
            <main className="container mx-auto px-4 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  )
}
