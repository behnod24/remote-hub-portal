
import { Link } from 'react-router-dom'
import { 
  User, Users, LayoutDashboard, Linkedin, 
  Presentation, FileText, MessageSquare, 
  Settings, HelpCircle 
} from 'lucide-react'

interface DashboardSidebarProps {
  userEmail: string
  userRole: string
  avatarUrl: string | null
}

export default function DashboardSidebar({ userEmail, userRole, avatarUrl }: DashboardSidebarProps) {
  return (
    <div className="w-80">
      <div className="flex h-full min-h-[700px] flex-col justify-between bg-black p-4">
        <div className="flex flex-col gap-4">
          <div className="flex gap-3">
            <div className="h-10 w-10 rounded-full bg-[#292929]">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="Profile"
                  className="h-full w-full rounded-full object-cover"
                />
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

          <nav className="flex flex-col gap-2">
            <Link to="/dashboard" className="flex items-center gap-3 rounded-full bg-[#292929] px-3 py-2">
              <LayoutDashboard className="h-6 w-6 text-white" />
              <span className="text-sm font-medium text-white">Dashboard</span>
            </Link>
            {[
              { icon: User, label: "Company Profile" },
              { icon: Users, label: "Employees" },
              { icon: LayoutDashboard, label: "Projects" },
              { icon: Linkedin, label: "Jobs" },
              { icon: Presentation, label: "Reports & Analytics" },
              { icon: FileText, label: "File Management" },
              { icon: MessageSquare, label: "Messaging" },
              { icon: Settings, label: "Settings & Security" },
              { icon: HelpCircle, label: "Support & Help" },
            ].map((item, index) => (
              <Link
                key={index}
                to="#"
                className="flex items-center gap-3 px-3 py-2 text-white hover:bg-[#292929] rounded-full transition-colors"
              >
                <item.icon className="h-6 w-6" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
