
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Search, Bell, Menu } from "lucide-react"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link href="/" className="text-2xl font-display font-bold text-primary">
              JobHub
            </Link>
            <nav className="hidden lg:flex items-center space-x-6">
              <Link href="/companies" className="nav-link">Companies</Link>
              <Link href="/about" className="nav-link">About us</Link>
              <Link href="/contact" className="nav-link">Contact</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost">Sign in</Button>
              <Button>Create account</Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
