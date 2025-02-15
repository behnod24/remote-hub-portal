
import { Search, Settings, User, LayoutDashboard, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/components/ui/use-toast'

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
  const { signOut } = useAuth()
  const { toast } = useToast()

  const handleSignOut = async () => {
    try {
      await signOut()
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      })
    } catch (error) {
      console.error('Error signing out:', error)
      toast({
        title: "Error signing out",
        description: "There was a problem signing you out. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <header className="flex items-center justify-between border-b border-[#292929] px-10 py-3">
      <div className="flex items-center gap-4 text-white">
        <div className="h-4 w-4 text-white">
          <LayoutDashboard className="h-full w-full" />
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
            className="rounded-full bg-[#292929] hover:bg-[#363636] transition-colors"
            onClick={onSettingsClick}
          >
            <Settings className="h-5 w-5 text-white" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="rounded-full bg-[#292929] hover:bg-[#363636] transition-colors"
              >
                <User className="h-5 w-5 text-white" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className="w-56 bg-[#1F1F1F] border-[#292929] text-white" 
              align="end"
            >
              <DropdownMenuLabel className="text-[#ABABAB]">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-[#292929]" />
              <DropdownMenuItem 
                onClick={onSettingsClick}
                className="text-white hover:bg-[#292929] cursor-pointer"
              >
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem 
                onClick={handleSignOut}
                className="text-white hover:bg-[#292929] cursor-pointer"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
