
import { Search, Settings, User, LayoutDashboard } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface DashboardHeaderProps {
  companyName: string | null
  searchQuery: string
  onSearchChange: (value: string) => void
  onSettingsClick: () => void
}

export default function DashboardHeader({
  companyName,
  searchQuery,
  onSearchChange,
  onSettingsClick
}: DashboardHeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-[#292929] px-10 py-3">
      <div className="flex items-center gap-4 text-white">
        <div className="h-4 w-4">
          <LayoutDashboard />
        </div>
        <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
          {companyName || 'Crypto Sentiment Dashboard'}
        </h2>
      </div>
      
      <div className="flex flex-1 justify-end gap-8">
        <div className="flex min-w-40 max-w-64">
          <div className="relative flex w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-5 w-5 text-[#ABABAB]" />
            </div>
            <Input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full rounded-xl border-none bg-[#292929] pl-10 text-white placeholder:text-[#ABABAB]"
            />
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="rounded-full bg-[#292929]"
            onClick={onSettingsClick}
          >
            <Settings className="h-5 w-5 text-white" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full bg-[#292929]">
            <User className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </header>
  )
}
