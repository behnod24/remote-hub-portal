
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
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-[100]">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <button
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="h-6 w-6" />
            </button>
            <Link to="/" className="flex items-center">
              {logoUrl && (
                <img 
                  src={logoUrl} 
                  alt="PamirHub Logo" 
                  className="h-8 w-auto md:h-10 object-contain"
                  onError={(e) => console.error('Error loading image:', e)}
                />
              )}
            </Link>
            <MainNavigation />
          </div>
          
          <UserMenu user={user} isAuthPage={isAuthPage} currentPage={currentPage} />
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
