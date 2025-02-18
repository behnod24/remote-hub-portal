
import { Link, useLocation } from "react-router-dom"
import { ChevronDown } from "lucide-react"

export const menuItems = [
  {
    label: 'Hire Talent',
    path: '/hire-talent',
    submenu: [
      { label: 'Find Talent', path: '/hire-talent/find' },
      { label: 'Post a Job', path: '/hire-talent/post' }
    ]
  },
  { label: 'Sectors', path: '/sectors' },
  { label: 'How It Works', path: '/how-it-works' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'About Us', path: '/about' },
  { label: 'Contact', path: '/contact' }
]

const MainNavigation = () => {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="hidden lg:flex items-center space-x-6">
      {menuItems.map((item) => (
        <div key={item.path} className="group relative">
          <Link 
            to={item.path}
            className={`flex items-center space-x-1 py-2 text-gray-700 hover:text-[#E50914] transition-colors ${
              isActive(item.path) ? 'text-[#E50914]' : ''
            }`}
          >
            <span>{item.label}</span>
            {item.submenu && <ChevronDown className="h-4 w-4" />}
          </Link>
          
          {item.submenu && (
            <div className="absolute top-full left-0 hidden group-hover:block bg-white rounded-lg shadow-lg py-2 w-48">
              {item.submenu.map((subItem) => (
                <Link
                  key={subItem.path}
                  to={subItem.path}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#E50914]"
                >
                  {subItem.label}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}

export default MainNavigation
