
import { Link, useLocation } from "react-router-dom"
import { UserPlus, Grid, Info, DollarSign, BookOpen, Users, Mail } from "lucide-react"

export const menuItems = [
  { label: 'Hire Talent', path: '/hire-talent', icon: UserPlus },
  { label: 'Sectors', path: '/sectors', icon: Grid },
  { label: 'How It Works', path: '/how-it-works', icon: Info },
  { label: 'Pricing', path: '/pricing', icon: DollarSign },
  { label: 'Blog', path: '/blog', icon: BookOpen },
  { label: 'About Us', path: '/about', icon: Users },
  { label: 'Contact', path: '/contact', icon: Mail }
]

const MainNavigation = () => {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path

  return (
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
  )
}

export default MainNavigation
