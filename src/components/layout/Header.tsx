
import { useState, useEffect } from "react"
import { Link, useNavigate, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, User, X, UserPlus, Grid, Info, BookOpen, Mail } from "lucide-react"
import { supabase } from "@/integrations/supabase/client"
import { useAuth } from "@/contexts/AuthContext"

interface HeaderProps {
  isAuthPage?: boolean;
  currentPage?: 'signin' | 'signup';
}

const Header = ({ isAuthPage, currentPage }: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [logoUrl, setLogoUrl] = useState("")
  const { user } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

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

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    navigate('/')
  }

  const menuItems = [
    { label: 'Hire Talent', path: '/hire-talent', icon: UserPlus },
    { label: 'Sectors', path: '/sectors', icon: Grid },
    { label: 'How It Works', path: '/how-it-works', icon: Info },
    { label: 'Blog', path: '/blog', icon: BookOpen },
    { label: 'Contact', path: '/contact', icon: Mail }
  ]

  const isActive = (path: string) => location.pathname === path

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
                  onError={(e) => console.error('Error loading image:', e)}
                />
              )}
            </Link>
            <nav className="hidden lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`flex items-center gap-2 px-3 py-2 text-base font-medium transition-colors duration-200 ${
                    isActive(item.path)
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-gray-600 hover:text-gray-900 hover:border-b-2 hover:border-gray-200'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          
          <div className="flex items-center gap-4">
            {user ? (
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
            ) : (
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
            )}
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={`
        lg:hidden fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transform transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        <div className="fixed inset-0 z-50 bg-white">
          <div className="flex h-16 items-center justify-between px-4 border-b">
            <Link to="/" className="flex items-center" onClick={() => setIsOpen(false)}>
              {logoUrl && (
                <img 
                  src={logoUrl} 
                  alt="PamirHub Logo" 
                  className="h-8 w-auto object-contain"
                />
              )}
            </Link>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
              <X className="h-6 w-6" />
            </Button>
          </div>
          <nav className="flex flex-col p-4">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-2 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'text-primary bg-primary/5'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Link>
            ))}
            {!user && (
              <div className="mt-4 space-y-2 px-4">
                <Button 
                  className="w-full bg-red-500 hover:bg-red-600 text-white" 
                  onClick={() => {
                    navigate('/auth/signup')
                    setIsOpen(false)
                  }}
                >
                  Sign Up
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    navigate('/auth/signin')
                    setIsOpen(false)
                  }}
                >
                  Login
                </Button>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header
