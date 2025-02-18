
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Menu } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"
import MainNavigation from "./navigation/MainNavigation"
import UserMenu from "./navigation/UserMenu"
import MobileMenu from "./navigation/MobileMenu"

interface HeaderProps {
  isAuthPage?: boolean;
  currentPage?: 'signin' | 'signup';
}

const Header = ({ isAuthPage, currentPage }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [logoUrl, setLogoUrl] = useState("")
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

  return (
    <header className="fixed w-full bg-gradient-to-r from-white/95 to-gray-50/95 backdrop-blur-sm shadow-sm z-50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-[#E50914]">
            {logoUrl ? (
              <img src={logoUrl} alt="PamirHub Logo" className="h-8 w-auto md:h-10" />
            ) : (
              "PamirHub"
            )}
          </Link>
          <MainNavigation />
          <div className="flex items-center space-x-4">
            <UserMenu user={user} isAuthPage={isAuthPage} currentPage={currentPage} />
            <button 
              className="lg:hidden text-gray-700 hover:text-[#E50914]"
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
