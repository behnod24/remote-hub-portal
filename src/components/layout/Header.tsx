
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Menu, Sun, Moon } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"
import MainNavigation from "./navigation/MainNavigation"
import UserMenu from "./navigation/UserMenu"
import MobileMenu from "./navigation/MobileMenu"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  isAuthPage?: boolean;
  currentPage?: 'signin' | 'signup';
}

const Header = ({ isAuthPage, currentPage }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [logoUrl, setLogoUrl] = useState("")
  const [isDarkMode, setIsDarkMode] = useState(false)
  const { user } = useAuth()

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const { data: { publicUrl } } = supabase
          .storage
          .from('site-assets')
          .getPublicUrl('logo.png')
        
        if (publicUrl) {
          console.log('Logo URL:', publicUrl)
          setLogoUrl(publicUrl)
        }
      } catch (error) {
        console.error('Error fetching logo:', error)
      }
    }

    fetchLogo()
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // Here you would implement actual dark mode toggling with a theme system
  }

  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm shadow-sm z-50 h-[72px] md:h-[80px]">
      <div className="container mx-auto h-full flex items-center px-6">
        <div className="flex items-center justify-between w-full">
          <Link to="/front-pages/landing-page" className="flex items-center text-2xl font-bold text-purple-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
            PamirHub
          </Link>
          
          <MainNavigation />
          
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
            
            {user ? (
              <UserMenu user={user} isAuthPage={isAuthPage} currentPage={currentPage} />
            ) : (
              <Button 
                className="hidden md:flex bg-purple-600 hover:bg-purple-700" 
                asChild
              >
                <Link to="/auth/signin">Login / Register</Link>
              </Button>
            )}
            
            <button 
              className="lg:hidden text-gray-700 hover:text-purple-600"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
      <MobileMenu 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        logoUrl={logoUrl}
        user={user}
      />
    </header>
  )
}

export default Header
