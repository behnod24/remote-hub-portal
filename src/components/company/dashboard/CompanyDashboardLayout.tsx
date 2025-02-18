
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  Users, 
  Search, 
  MessageSquare, 
  CreditCard, 
  Settings,
  Menu,
  ChevronLeft,
  Bell,
  Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';
import { Avatar } from '@/components/ui/avatar';

interface CompanyDashboardLayoutProps {
  children: React.ReactNode;
  currentPath: string;
}

const navItems = [
  { 
    path: '/company/dashboard', 
    label: 'Dashboard Overview', 
    icon: LayoutDashboard 
  },
  { 
    path: '/company/dashboard/jobs', 
    label: 'Job Listings', 
    icon: Briefcase 
  },
  { 
    path: '/company/dashboard/applications', 
    label: 'Applications', 
    icon: Users 
  },
  { 
    path: '/company/dashboard/talent', 
    label: 'Talent Search', 
    icon: Search 
  },
  { 
    path: '/company/dashboard/messages', 
    label: 'Messages', 
    icon: MessageSquare 
  },
  { 
    path: '/company/dashboard/billing', 
    label: 'Billing', 
    icon: CreditCard 
  },
  { 
    path: '/company/dashboard/settings', 
    label: 'Settings', 
    icon: Settings 
  }
];

export default function CompanyDashboardLayout({ children, currentPath }: CompanyDashboardLayoutProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isMobile = useIsMobile();
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-gray-900 border-b border-gray-700">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-white"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="text-white hover:bg-gray-800 flex items-center gap-2"
            >
              <ChevronLeft className="h-4 w-4" />
              Back
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <Mail className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-white hover:bg-gray-800">
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar 
              className="h-8 w-8 cursor-pointer"
              onClick={() => navigate('/company/profile')}
            />
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside 
          className={`
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            fixed lg:static lg:translate-x-0 
            z-40 h-[calc(100vh-4rem)] w-64 
            bg-gray-900 border-r border-gray-700
            transition-transform duration-200 ease-in-out
          `}
        >
          <nav className="p-4 space-y-2">
            {navItems.map((item) => {
              const isActive = currentPath === item.path;
              const Icon = item.icon;
              
              return (
                <Button
                  key={item.path}
                  variant="ghost"
                  className={`w-full justify-start gap-3 ${
                    isActive 
                      ? 'bg-red-900/50 text-red-400' 
                      : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </Button>
              );
            })}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] p-6 bg-gray-800">
          {children}
        </main>
      </div>
    </div>
  );
}
