
import { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  badge?: string
}

export const ServiceCard = ({ icon, title, description, badge }: ServiceCardProps) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300 animate-fade-in">
      <div className="transition-transform duration-300 hover:scale-110">
        {icon}
      </div>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-xl font-bold">{title}</h3>
        {badge && (
          <Badge variant="secondary" className="text-xs bg-[#ffedee] text-[#E50914]">
            {badge}
          </Badge>
        )}
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}
