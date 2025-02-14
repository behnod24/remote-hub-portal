
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
              <Link href="/hire-employee" className="nav-link">Hire Employee</Link>
              <Link href="/companies" className="nav-link">Companies</Link>
              <Link href="/how-it-works" className="nav-link">How It Works</Link>
              <Link href="/blog" className="nav-link">Blog</Link>
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
      
      {/* Mobile menu */}
      <div className={`
        lg:hidden fixed inset-0 z-50 bg-background transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <Link href="/" className="text-2xl font-display font-bold text-primary">
              JobHub
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex-1 p-4 space-y-4">
            <Link href="/hire-employee" className="block py-2 text-lg">Hire Employee</Link>
            <Link href="/companies" className="block py-2 text-lg">Companies</Link>
            <Link href="/how-it-works" className="block py-2 text-lg">How It Works</Link>
            <Link href="/blog" className="block py-2 text-lg">Blog</Link>
            <Link href="/contact" className="block py-2 text-lg">Contact</Link>
          </nav>
          <div className="p-4 border-t space-y-4">
            <Button className="w-full">Create account</Button>
            <Button variant="outline" className="w-full">Sign in</Button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
