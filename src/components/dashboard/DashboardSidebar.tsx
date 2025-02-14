import { useState } from 'react';
import { Link } from 'react-router-dom';
import { User, Users, LayoutDashboard, Linkedin, Presentation, FileText, MessageSquare, Settings, HelpCircle, ChevronDown, Menu } from 'lucide-react';

interface DashboardSidebarProps {
  userEmail: string;
  userRole: string;
  avatarUrl: string | null;
}

interface MenuItem {
  icon: any;
  label: string;
  subMenus?: string[];
}

const menuItems: MenuItem[] = [{
  icon: User,
  label: "Company Profile",
  subMenus: ["Overview", "Company Details", "Branding", "Locations"]
}, {
  icon: Users,
  label: "Employees",
  subMenus: ["All Employees", "Departments", "Roles", "Performance"]
}, {
  icon: LayoutDashboard,
  label: "Projects",
  subMenus: ["Active Projects", "Completed", "Timeline", "Resources"]
}, {
  icon: Linkedin,
  label: "Jobs",
  subMenus: ["Job Listings", "Applications", "Interviews", "Offers"]
}, {
  icon: Presentation,
  label: "Reports & Analytics",
  subMenus: ["Dashboard", "Financial", "Performance", "Custom Reports"]
}, {
  icon: FileText,
  label: "File Management",
  subMenus: ["Documents", "Images", "Videos", "Archives"]
}, {
  icon: MessageSquare,
  label: "Messaging",
  subMenus: ["Inbox", "Sent", "Drafts", "Templates"]
}, {
  icon: Settings,
  label: "Settings & Security",
  subMenus: ["General", "Security", "Notifications", "Integrations"]
}, {
  icon: HelpCircle,
  label: "Support & Help",
  subMenus: ["Documentation", "FAQs", "Contact Support", "Training"]
}];

export default function DashboardSidebar({
  userEmail,
  userRole,
  avatarUrl
}: DashboardSidebarProps) {
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const toggleMenu = (label: string) => {
    setExpandedMenus(prev => prev.includes(label) ? prev.filter(item => item !== label) : [...prev, label]);
  };
  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => !prev);
  };
  return <div className={`transition-all duration-300 ${isSidebarCollapsed ? 'w-16' : 'w-80'}`}>
      <div className="flex h-full min-h-[700px] flex-col justify-between bg-black p-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className={`flex gap-3 ${isSidebarCollapsed ? 'hidden' : ''}`}>
              <div className="h-10 w-10 rounded-full bg-[#292929]">
                {avatarUrl ? <img src={avatarUrl} alt="Profile" className="h-full w-full rounded-full object-cover" /> : <User className="h-full w-full p-2 text-white" />}
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
            <button onClick={toggleSidebar} className="rounded-full p-2 hover:bg-[#292929] transition-colors">
              <Menu className="text-white h-6 w-6" />
            </button>
          </div>

          <nav className="flex flex-col gap-2">
            <Link to="/dashboard" className={`flex items-center gap-3 px-3 py-2 text-white hover:bg-[#292929] rounded-full transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}>
              <LayoutDashboard className="" />
              {!isSidebarCollapsed && <span className="text-sm font-medium mx-[6px]">Dashboard</span>}
            </Link>
            
            {menuItems.map((item, index) => <div key={index} className="flex flex-col">
                <button onClick={() => toggleMenu(item.label)} className={`flex items-center gap-3 px-3 py-2 text-white hover:bg-[#292929] rounded-full transition-colors ${isSidebarCollapsed ? 'justify-center' : ''}`}>
                  <item.icon className={isSidebarCollapsed ? "h-10 w-10" : "h-6 w-6"} />
                  {!isSidebarCollapsed && <>
                      <span className="flex-1 text-sm font-medium my-0 mx-[31px]">{item.label}</span>
                      <ChevronDown className={`h-4 w-4 transition-transform ${expandedMenus.includes(item.label) ? 'rotate-180' : ''}`} />
                    </>}
                </button>
                
                {!isSidebarCollapsed && expandedMenus.includes(item.label) && <div className="ml-12 mt-1 flex flex-col gap-1">
                    {item.subMenus?.map((subMenu, subIndex) => <Link key={subIndex} to="#" className="px-3 py-2 text-sm text-[#ABABAB] hover:text-white transition-colors">
                        {subMenu}
                      </Link>)}
                  </div>}
              </div>)}
          </nav>
        </div>
      </div>
    </div>;
}
