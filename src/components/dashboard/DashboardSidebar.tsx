
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User, 
  Users, 
  LayoutDashboard, 
  Building2, 
  Briefcase,
  FileText, 
  MessageSquare, 
  Settings, 
  HelpCircle, 
  ChevronDown, 
  Menu, 
  X,
  Search,
  Star,
  GraduationCap 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DashboardSidebarProps {
  userEmail: string;
  userRole: string;
  avatarUrl: string | null;
  onClose?: () => void;
  isMobile?: boolean;
}

interface MenuItem {
  icon: any;
  label: string;
  subMenus?: { name: string; path: string; }[];
}

const menuItems: MenuItem[] = [{
  icon: Building2,
  label: "Company",
  subMenus: [
    { name: "Overview", path: "/company/dashboard" },
    { name: "Profile", path: "/company/dashboard/profile" },
    { name: "Team Members", path: "/company/dashboard/team" },
    { name: "Locations", path: "/company/dashboard/locations" }
  ]
}, {
  icon: GraduationCap,
  label: "Talent Management",
  subMenus: [
    { name: "Talent Search", path: "/company/dashboard/talent/search" },
    { name: "Talent Pool", path: "/company/dashboard/talent/pool" },
    { name: "Skills Database", path: "/company/dashboard/talent/skills" },
    { name: "Recruitment Analytics", path: "/company/dashboard/talent/analytics" },
    { name: "Candidate Search", path: "/company/dashboard/talent/candidates" },
    { name: "Applications", path: "/company/dashboard/talent/applications" },
    { name: "Assessments", path: "/company/dashboard/talent/assessments" },
    { name: "Interview Schedule", path: "/company/dashboard/talent/interviews" },
    { name: "Talent Pipeline", path: "/company/dashboard/talent/pipeline" },
    { name: "Onboarding", path: "/company/dashboard/talent/onboarding" }
  ]
}, {
  icon: Star,
  label: "Performance",
  subMenus: [
    { name: "Reviews", path: "/company/dashboard/performance/reviews" },
    { name: "Skills Matrix", path: "/company/dashboard/performance/skills" },
    { name: "Development Plans", path: "/company/dashboard/performance/development" },
    { name: "Certifications", path: "/company/dashboard/performance/certifications" }
  ]
}, {
  icon: Users,
  label: "Employees",
  subMenus: [
    { name: "All Employees", path: "/company/dashboard/employees" },
    { name: "Departments", path: "/company/dashboard/departments" },
    { name: "Roles", path: "/company/dashboard/roles" },
    { name: "Performance", path: "/company/dashboard/employee-performance" }
  ]
}, {
  icon: LayoutDashboard,
  label: "Projects",
  subMenus: [
    { name: "Active Projects", path: "/company/dashboard/projects/active" },
    { name: "Completed", path: "/company/dashboard/projects/completed" },
    { name: "Timeline", path: "/company/dashboard/projects/timeline" },
    { name: "Resources", path: "/company/dashboard/projects/resources" }
  ]
}, {
  icon: Briefcase,
  label: "Jobs",
  subMenus: [
    { name: "Job Listings", path: "/company/dashboard/jobs" },
    { name: "Applications", path: "/company/dashboard/applications" },
    { name: "Interviews", path: "/company/dashboard/interviews" },
    { name: "Offers", path: "/company/dashboard/offers" }
  ]
}, {
  icon: FileText,
  label: "Documents",
  subMenus: [
    { name: "All Files", path: "/company/dashboard/documents" },
    { name: "Shared", path: "/company/dashboard/documents/shared" },
    { name: "Templates", path: "/company/dashboard/documents/templates" },
    { name: "Archives", path: "/company/dashboard/documents/archives" }
  ]
}, {
  icon: MessageSquare,
  label: "Messages",
  subMenus: [
    { name: "Inbox", path: "/company/dashboard/messages" },
    { name: "Sent", path: "/company/dashboard/messages/sent" },
    { name: "Drafts", path: "/company/dashboard/messages/drafts" },
    { name: "Archive", path: "/company/dashboard/messages/archive" }
  ]
}, {
  icon: Settings,
  label: "Settings",
  subMenus: [
    { name: "General", path: "/company/dashboard/settings" },
    { name: "Security", path: "/company/dashboard/settings/security" },
    { name: "Notifications", path: "/company/dashboard/settings/notifications" },
    { name: "Billing", path: "/company/dashboard/settings/billing" }
  ]
}, {
  icon: HelpCircle,
  label: "Help & Support",
  subMenus: [
    { name: "Documentation", path: "/company/dashboard/help" },
    { name: "FAQs", path: "/company/dashboard/help/faqs" },
    { name: "Contact Support", path: "/company/dashboard/help/support" },
    { name: "Training", path: "/company/dashboard/help/training" }
  ]
}];

export default function DashboardSidebar({
  userEmail,
  userRole,
  avatarUrl,
  onClose,
  isMobile
}: DashboardSidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => 
      prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]
    );
  };

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };

  return (
    <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-80'} ${isMobile ? 'h-full' : ''}`}>
      <div className="flex h-full flex-col justify-between bg-black p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className={`flex gap-3 ${isSidebarCollapsed ? 'hidden' : ''}`}>
              <div className="h-10 w-10 rounded-full bg-[#292929]">
                {avatarUrl ? (
                  <img src={avatarUrl} alt="Profile" className="h-full w-full rounded-full object-cover" />
                ) : (
                  <User className="h-full w-full p-2 text-white" />
                )}
              </div>
              <div className="flex flex-col">
                <h1 className="text-base font-medium text-white">
                  {userEmail}
                </h1>
                <p className="text-sm text-[#ABABAB]">
                  {userRole === 'admin' ? 'Admin' : 'User'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {isMobile && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={onClose}
                  className="text-white hover:bg-[#292929]"
                >
                  <X className="h-5 w-5" />
                </Button>
              )}
              {!isMobile && (
                <button
                  onClick={toggleSidebar}
                  className="rounded-full p-2 hover:bg-[#292929] transition-colors"
                >
                  <Menu className="text-white h-6 w-6" />
                </button>
              )}
            </div>
          </div>

          <nav className="flex flex-col gap-2">
            <Link
              to="/dashboard"
              className={`flex items-center gap-3 px-3 py-2 text-white hover:bg-[#292929] rounded-full transition-colors ${
                isSidebarCollapsed ? 'justify-center' : ''
              }`}
            >
              <LayoutDashboard className={isSidebarCollapsed ? "h-6 w-6" : ""} />
              {!isSidebarCollapsed && (
                <span className="text-sm font-medium mx-[6px]">Dashboard</span>
              )}
            </Link>

            {menuItems.map((item, index) => (
              <div key={index} className="flex flex-col">
                <button
                  onClick={() => toggleMenu(item.label)}
                  className={`flex items-center gap-3 px-3 py-2 text-white hover:bg-[#292929] rounded-full transition-colors ${
                    isSidebarCollapsed ? 'justify-center' : ''
                  }`}
                >
                  <item.icon className={isSidebarCollapsed ? "h-6 w-6" : ""} />
                  {!isSidebarCollapsed && (
                    <>
                      <span className="flex-1 text-sm font-medium my-0 mx-[31px]">
                        {item.label}
                      </span>
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${
                          expandedMenus.includes(item.label) ? 'rotate-180' : ''
                        }`}
                      />
                    </>
                  )}
                </button>

                {!isSidebarCollapsed && expandedMenus.includes(item.label) && (
                  <div className="ml-12 mt-1 flex flex-col gap-1">
                    {item.subMenus?.map((subMenu, subIndex) => (
                      <Link
                        key={subIndex}
                        to={subMenu.path}
                        className="px-3 py-2 text-sm text-[#ABABAB] hover:text-white transition-colors"
                      >
                        {subMenu.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
