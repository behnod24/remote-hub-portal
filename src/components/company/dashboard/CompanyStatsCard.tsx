
import { Card } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface CompanyStatsCardProps {
  icon: LucideIcon
  label: string
  value: string | number
  progress?: number
  color?: 'red' | 'pink'
}

export function CompanyStatsCard({ 
  icon: Icon, 
  label, 
  value, 
  progress = 75,
  color = 'red' 
}: CompanyStatsCardProps) {
  return (
    <Card className="bg-gray-800 hover:bg-gray-750 transition-colors border-gray-700">
      <div className="flex flex-col gap-4 p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-gray-400 mb-2">{label}</p>
            <p className="text-xl font-semibold text-white">{value}</p>
          </div>
          <div className={`bg-${color}-900 p-3 rounded-lg`}>
            <Icon className={`h-6 w-6 text-${color}-400`} />
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div 
            className={`h-2 bg-${color}-600 rounded-full`}
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </Card>
  )
}
