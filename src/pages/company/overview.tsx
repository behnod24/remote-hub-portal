
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import CompanyDashboardLayout from '@/components/company/dashboard/CompanyDashboardLayout'
import { Card } from '@/components/ui/card'
import { Building2, Users, MapPin, Activity } from 'lucide-react'

interface CompanyStats {
  totalTeamMembers: number
  totalLocations: number
  activeProjects: number
}

interface CompanyData {
  id: string
  name: string
  description: string
  mission_statement?: string
  industry?: string
  company_size?: string
}

export default function CompanyOverview() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [company, setCompany] = useState<CompanyData | null>(null)
  const [stats, setStats] = useState<CompanyStats>({
    totalTeamMembers: 0,
    totalLocations: 0,
    activeProjects: 0
  })

  useEffect(() => {
    if (!user) {
      navigate('/auth/signin')
      return
    }

    const fetchCompanyData = async () => {
      try {
        // Get user's company
        const { data: memberData } = await supabase
          .from('company_members')
          .select('company_id, companies(*, company_profiles(*))')
          .eq('user_id', user.id)
          .single()

        if (memberData?.companies) {
          const companyData = {
            ...memberData.companies,
            ...memberData.companies.company_profiles?.[0]
          }
          setCompany(companyData)

          // Fetch stats
          const { count: teamCount } = await supabase
            .from('team_members')
            .select('*', { count: 'exact', head: true })
            .eq('company_id', companyData.id)

          const { count: locationCount } = await supabase
            .from('company_locations')
            .select('*', { count: 'exact', head: true })
            .eq('company_id', companyData.id)

          const { count: projectCount } = await supabase
            .from('projects')
            .select('*', { count: 'exact', head: true })
            .eq('company_id', companyData.id)
            .eq('status', 'active')

          setStats({
            totalTeamMembers: teamCount || 0,
            totalLocations: locationCount || 0,
            activeProjects: projectCount || 0
          })
        }
      } catch (error) {
        console.error('Error fetching company data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyData()
  }, [user, navigate])

  if (!user) return null

  return (
    <CompanyDashboardLayout currentPath="/company/dashboard">
      <div className="space-y-6">
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-bold text-white">Company Overview</h1>
          {company && (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Card className="p-4 bg-[#1c1c1c] border-0">
                <div className="flex items-center gap-3">
                  <Building2 className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-400">Team Members</p>
                    <p className="text-xl font-semibold text-white">{stats.totalTeamMembers}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-[#1c1c1c] border-0">
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-400">Locations</p>
                    <p className="text-xl font-semibold text-white">{stats.totalLocations}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-[#1c1c1c] border-0">
                <div className="flex items-center gap-3">
                  <Activity className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-400">Active Projects</p>
                    <p className="text-xl font-semibold text-white">{stats.activeProjects}</p>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-[#1c1c1c] border-0">
                <div className="flex items-center gap-3">
                  <Users className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-gray-400">Company Size</p>
                    <p className="text-xl font-semibold text-white">{company.company_size || 'N/A'}</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {company && (
            <Card className="p-6 bg-[#1c1c1c] border-0 mt-6">
              <h2 className="text-xl font-semibold text-white mb-4">About {company.name}</h2>
              <div className="space-y-4">
                <p className="text-gray-300">{company.description}</p>
                {company.mission_statement && (
                  <div className="mt-4">
                    <h3 className="text-lg font-medium text-white mb-2">Mission Statement</h3>
                    <p className="text-gray-300">{company.mission_statement}</p>
                  </div>
                )}
                {company.industry && (
                  <div className="text-gray-300">
                    <span className="font-medium text-white">Industry:</span> {company.industry}
                  </div>
                )}
              </div>
            </Card>
          )}
        </div>
      </div>
    </CompanyDashboardLayout>
  )
}
