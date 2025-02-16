
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User } from "lucide-react"
import { User as SupabaseUser } from "@supabase/supabase-js"
import { supabase } from "@/integrations/supabase/client"

interface UserMenuProps {
  user: SupabaseUser | null;
  isAuthPage?: boolean;
  currentPage?: 'signin' | 'signup';
}

const UserMenu = ({ user, isAuthPage, currentPage }: UserMenuProps) => {
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  if (user) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2">
            <User className="h-5 w-5" />
            <span className="hidden sm:inline">
              {user.email && user.email.length > 20 
                ? user.email.substring(0, 17) + '...' 
                : user.email}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuItem onClick={() => navigate('/dashboard')}>
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem>
            Profile Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut}>
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }

  return (
    <div className="flex items-center gap-4">
      {!isAuthPage ? (
        <>
          <Button 
            variant="ghost" 
            className="text-base font-medium hover:bg-transparent hover:text-primary"
            onClick={() => navigate('/auth/signin')}
          >
            Login
          </Button>
          <Button 
            className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-6 py-2"
            onClick={() => navigate('/auth/signup')}
          >
            Sign Up
          </Button>
        </>
      ) : (
        currentPage === 'signin' ? (
          <Button 
            className="bg-red-500 hover:bg-red-600 text-white rounded-lg px-6 py-2"
            onClick={() => navigate('/auth/signup')}
          >
            Sign Up
          </Button>
        ) : (
          <Button 
            variant="ghost"
            className="text-base font-medium hover:bg-transparent hover:text-primary" 
            onClick={() => navigate('/auth/signin')}
          >
            Login
          </Button>
        )
      )}
    </div>
  )
}

export default UserMenu
