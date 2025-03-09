
import { Link, useLocation } from "react-router-dom"
import { ChevronDown } from "lucide-react"

export const menuItems = [
  { 
    label: 'Home', 
    path: '/front-pages/landing-page'
  },
  {
    label: 'Services',
    path: '/services',
    submenu: [
      { label: 'Web & Software Development', path: '/services/software-development' },
      { label: 'Design & Creative Services', path: '/services/design' },
      { label: 'Sales & Marketing', path: '/services/marketing' },
      { label: 'Social Media Management', path: '/services/social-media' },
      { label: 'Mechanical Engineering', path: '/services/mechanical-engineering' },
      { label: 'Electrical Engineering', path: '/services/electrical-engineering' },
      { label: 'Product Design', path: '/services/product-design' },
      { label: 'Civil Engineering & Architecture', path: '/services/civil-engineering' }
    ]
  },
  { label: 'How It Works', path: '/front-pages/landing-page#how-it-works' },
  { label: 'For Companies', path: '/front-pages/landing-page#for-companies' },
  { label: 'About Us', path: '/front-pages/landing-page#about' },
  { label: 'Contact', path: '/front-pages/landing-page#contact' }
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
            className={`flex items-center space-x-1 py-2 text-gray-700 hover:text-[#E63946] transition-colors ${
              isActive(item.path) ? 'text-[#E63946]' : ''
            }`}
          >
            <span>{item.label}</span>
            {item.submenu && <ChevronDown className="h-4 w-4" />}
          </Link>
          
          {item.submenu && (
            <div className="absolute top-full left-0 hidden group-hover:block bg-white rounded-lg shadow-lg py-2 w-64 z-50">
              {item.submenu.map((subItem) => (
                <Link
                  key={subItem.path}
                  to={subItem.path}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#E63946]"
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
