
import { ReactNode } from "react"

interface TimelineItemProps {
  icon: ReactNode
  title: string
  description: string
  benefit?: string
  isLeft?: boolean
}

export const TimelineItem = ({ icon, title, description, benefit, isLeft = false }: TimelineItemProps) => {
  return (
    <div className="relative flex items-center gap-8 group">
      {isLeft ? (
        <>
          <div className="w-1/2 pr-12 text-right">
            <div className="mb-4 p-6 bg-white rounded-xl shadow-lg shadow-[#E50914]/5 hover:shadow-xl transition duration-300 animate-fade-in">
              <h3 className="text-xl font-bold mb-2 text-[#E50914]">{title}</h3>
              <p className="text-gray-600">{description}</p>
              {benefit && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm font-medium text-[#C2185B]">{benefit}</p>
                </div>
              )}
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#E50914] to-[#C2185B] rounded-full border-4 border-white flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300">
            {icon}
          </div>
          <div className="w-1/2" />
        </>
      ) : (
        <>
          <div className="w-1/2" />
          <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#E50914] to-[#C2185B] rounded-full border-4 border-white flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300">
            {icon}
          </div>
          <div className="w-1/2 pl-12">
            <div className="mb-4 p-6 bg-white rounded-xl shadow-lg shadow-[#E50914]/5 hover:shadow-xl transition duration-300 animate-fade-in">
              <h3 className="text-xl font-bold mb-2 text-[#E50914]">{title}</h3>
              <p className="text-gray-600">{description}</p>
              {benefit && (
                <div className="mt-3 pt-3 border-t border-gray-100">
                  <p className="text-sm font-medium text-[#C2185B]">{benefit}</p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
