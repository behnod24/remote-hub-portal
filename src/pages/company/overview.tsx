
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import CompanyDashboardLayout from '@/components/company/dashboard/CompanyDashboardLayout'
import { CompanyStatsCard } from '@/components/company/dashboard/CompanyStatsCard'
import { CompanyInfo } from '@/components/company/dashboard/CompanyInfo'
import { useCompanyData } from '@/hooks/useCompanyData'
import { Building2, Users, MapPin, Activity } from 'lucide-react'

export default function CompanyOverview() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { company, stats, loading } = useCompanyData(user?.id)

  if (!user) {
    navigate('/auth/signin')
    return null
  }

  return (
    <CompanyDashboardLayout currentPath="/company/dashboard">
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-white">Company Overview</h1>
          {company && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <CompanyStatsCard
                icon={Building2}
                label="Team Members"
                value={stats.totalTeamMembers}
              />
              <CompanyStatsCard
                icon={MapPin}
                label="Locations"
                value={stats.totalLocations}
              />
              <CompanyStatsCard
                icon={Activity}
                label="Active Projects"
                value={stats.activeProjects}
              />
              <CompanyStatsCard
                icon={Users}
                label="Company Size"
                value={company.company_size || 'N/A'}
              />
            </div>
          )}
          {company && <CompanyInfo company={company} />}
        </div>
      </div>
    </CompanyDashboardLayout>
  )
}
