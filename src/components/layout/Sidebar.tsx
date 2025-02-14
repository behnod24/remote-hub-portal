
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { 
  Briefcase, 
  Code, 
  PenTool, 
  Book, 
  Coffee,
  Music,
  Camera,
  Laptop,
  ChevronRight
} from "lucide-react"

const categories = [
  { icon: Code, label: "Technology", count: 1234 },
  { icon: Briefcase, label: "Business", count: 856 },
  { icon: PenTool, label: "Design", count: 643 },
  { icon: Book, label: "Education", count: 432 },
  { icon: Coffee, label: "Hospitality", count: 321 },
  { icon: Music, label: "Arts", count: 234 },
  { icon: Camera, label: "Media", count: 187 },
  { icon: Laptop, label: "Remote", count: 976 },
]

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  return (
    <aside className={`
      fixed left-0 top-0 z-40 h-screen border-r bg-background transition-all duration-300
      ${isCollapsed ? "w-20" : "w-64"}
      lg:relative
    `}>
      <div className="flex h-full flex-col">
        <div className="p-4 border-b">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="ml-auto"
          >
            <ChevronRight className={`h-4 w-4 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`} />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          <nav className="space-y-2">
            {categories.map((category) => (
              <Link
                key={category.label}
                href={`/categories/${category.label.toLowerCase()}`}
                className={`
                  flex items-center gap-3 rounded-lg px-3 py-2 text-text-secondary 
                  transition-colors hover:bg-secondary/50 hover:text-text
                `}
              >
                <category.icon className="h-5 w-5 shrink-0" />
                {!isCollapsed && (
                  <div className="flex flex-1 items-center justify-between">
                    <span>{category.label}</span>
                    <span className="text-sm text-muted-foreground">
                      {category.count}
                    </span>
                  </div>
                )}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
