
import { useEffect } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { menuItems } from "./MainNavigation"
import { User } from "@supabase/supabase-js"

interface MobileMenuProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  logoUrl: string;
  user: User | null;
}

const MobileMenu = ({ isOpen, setIsOpen, logoUrl, user }: MobileMenuProps) => {
  const location = useLocation()
  const navigate = useNavigate()
  const isActive = (path: string) => location.pathname === path

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <div 
      className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-[200] transition-opacity duration-300 ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={() => setIsOpen(false)}
    >
      <div 
        className={`fixed inset-y-0 left-0 w-[280px] bg-white/100 shadow-2xl transform transition-transform duration-300 z-[201] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b bg-white">
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
        <nav className="flex flex-col p-4 bg-white">
          {menuItems.map((item) => (
            <div key={item.path} className="flex flex-col">
              <Link
                to={item.path}
                className={`flex items-center gap-2 px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  isActive(item.path)
                    ? 'text-[#E50914] bg-red-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
              {item.submenu && (
                <div className="ml-4 space-y-1">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.path}
                      to={subItem.path}
                      className="block px-4 py-2 text-sm text-gray-600 hover:text-[#E50914] hover:bg-gray-50 rounded-lg"
                      onClick={() => setIsOpen(false)}
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
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
  )
}

export default MobileMenu
