
"use client"

import { ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

interface ContentLayoutProps {
  children: ReactNode
  title: string
  breadcrumbs: Array<{
    label: string
    href?: string
  }>
}

const ContentLayout = ({ children, title, breadcrumbs }: ContentLayoutProps) => {
  const navigate = useNavigate()

  const handleNavigate = (href: string | undefined) => {
    if (href) {
      navigate(href)
    }
  }

  return (
    <div className="min-h-screen">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-4">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink 
                  className="cursor-pointer"
                  onClick={() => handleNavigate("/")}
                >
                  Home
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
              {breadcrumbs.map((crumb, index) => (
                <BreadcrumbItem key={crumb.label}>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <>
                      <BreadcrumbLink 
                        className="cursor-pointer"
                        onClick={() => handleNavigate(crumb.href)}
                      >
                        {crumb.label}
                      </BreadcrumbLink>
                      <BreadcrumbSeparator>
                        <ChevronRight className="h-4 w-4" />
                      </BreadcrumbSeparator>
                    </>
                  )}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <h1 className="text-3xl font-bold mt-4">{title}</h1>
        </div>
      </div>
      <div className="container py-8">
        {children}
      </div>
    </div>
  )
}

export default ContentLayout
