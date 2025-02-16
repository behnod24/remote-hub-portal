
import { Card } from '@/components/ui/card'
import { LucideIcon } from 'lucide-react'

interface CompanyStatsCardProps {
  icon: LucideIcon
  label: string
  value: string | number
}

export function CompanyStatsCard({ icon: Icon, label, value }: CompanyStatsCardProps) {
  return (
    <Card className="p-4 bg-[#1c1c1c] border-0">
      <div className="flex items-center gap-3">
        <Icon className="h-5 w-5 text-primary" />
        <div>
          <p className="text-sm text-gray-400">{label}</p>
          <p className="text-xl font-semibold text-white">{value}</p>
        </div>
      </div>
    </Card>
  )
}
