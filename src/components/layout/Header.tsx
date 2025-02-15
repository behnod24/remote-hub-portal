import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Search, Bell, Menu, User } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [logoUrl, setLogoUrl] = useState("")
  const { user } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchLogo = async () => {
      try {
        const { data: { publicUrl } } = supabase
          .storage
          .from('site-assets')
          .getPublicUrl('logo.png') // Added .png extension
        
        if (publicUrl) {
          console.log('Logo URL:', publicUrl) // Debug log
          setLogoUrl(publicUrl)
        }
      } catch (error) {
        console.error('Error fetching logo:', error)
      }
    }

    fetchLogo()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const truncateEmail = (email: string) => {
    if (email.length > 20) {
      return email.substring(0, 17) + '...'
    }
    return email
  }

  return (
    <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
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
                  onError={(e) => console.error('Error loading image:', e)} // Debug handler
                />
              )}
            </Link>
            <nav className="hidden lg:flex items-center space-x-6">
              <Link to="/hire-employee" className="nav-link">Hire Employee</Link>
              <Link to="/companies" className="nav-link">Companies</Link>
              <Link to="/how-it-works" className="nav-link">How It Works</Link>
              <Link to="/blog" className="nav-link">Blog</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <Button variant="ghost" size="icon">
                  <Search className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Bell className="h-5 w-5" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2">
                      <User className="h-5 w-5" />
                      <span className="hidden sm:inline">{truncateEmail(user.email || '')}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem>
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() => navigate('/auth/signin')}>
                  Sign in
                </Button>
                <Button onClick={() => navigate('/auth/signup')}>
                  Create account
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`
        lg:hidden fixed inset-0 z-50 bg-background transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <Link to="/" className="flex items-center">
              {logoUrl && (
                <img 
                  src={logoUrl} 
                  alt="PamirHub Logo" 
                  className="h-8 w-auto object-contain"
                  onError={(e) => console.error('Error loading image:', e)} // Debug handler
                />
              )}
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <Menu className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex-1 p-4 space-y-4">
            <Link to="/hire-employee" className="block py-2 text-lg">Hire Employee</Link>
            <Link to="/companies" className="block py-2 text-lg">Companies</Link>
            <Link to="/how-it-works" className="block py-2 text-lg">How It Works</Link>
            <Link to="/blog" className="block py-2 text-lg">Blog</Link>
            <Link to="/contact" className="block py-2 text-lg">Contact</Link>
          </nav>
          <div className="p-4 border-t space-y-4">
            {!user && (
              <>
                <Button className="w-full" onClick={() => navigate('/auth/signup')}>
                  Create account
                </Button>
                <Button variant="outline" className="w-full" onClick={() => navigate('/auth/signin')}>
                  Sign in
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
