
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
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useIsMobile } from '@/hooks/use-mobile';

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

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-black border-b border-white/10">
        <div className="px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleSidebar}
              className="lg:hidden text-white"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <span className="text-white font-semibold text-lg">Company Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-white/80 text-sm">{user?.email}</span>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          fixed lg:static lg:translate-x-0 
          z-40 h-[calc(100vh-4rem)] w-64 
          bg-black border-r border-white/10 
          transition-transform duration-200 ease-in-out
        `}>
          <nav className="p-4 space-y-2">
            {navItems.map((item) => (
              <Button
                key={item.path}
                variant="ghost"
                className={`w-full justify-start gap-3 ${
                  currentPath === item.path 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-white hover:bg-white/5'
                }`}
                onClick={() => navigate(item.path)}
              >
                <item.icon className="h-5 w-5" />
                {item.label}
              </Button>
            ))}
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 min-h-[calc(100vh-4rem)] p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
