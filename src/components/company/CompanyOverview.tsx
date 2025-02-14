
import { useEffect, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { Card } from '@/components/ui/card'
import { Building2, MapPin, Globe, Users } from 'lucide-react'

interface CompanyStats {
  totalLocations: number
  totalEmployees: number
}

export default function CompanyOverview() {
  const { user } = useAuth()
  const [company, setCompany] = useState<any>(null)
  const [stats, setStats] = useState<CompanyStats>({ totalLocations: 0, totalEmployees: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!user) return

      try {
        // Fetch company where user is a member
        const { data: memberData } = await supabase
          .from('company_members')
          .select('company_id')
          .eq('user_id', user.id)
          .single()

        if (memberData) {
          // Fetch company details
          const { data: companyData } = await supabase
            .from('companies')
            .select('*')
            .eq('id', memberData.company_id)
            .single()

          if (companyData) {
            setCompany(companyData)

            // Fetch stats
            const { count: locationsCount } = await supabase
              .from('company_locations')
              .select('*', { count: 'exact', head: true })
              .eq('company_id', companyData.id)

            const { count: employeesCount } = await supabase
              .from('company_members')
              .select('*', { count: 'exact', head: true })
              .eq('company_id', companyData.id)

            setStats({
              totalLocations: locationsCount || 0,
              totalEmployees: employeesCount || 0
            })
          }
        }
      } catch (error) {
        console.error('Error fetching company data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyData()
  }, [user])

  if (loading) {
    return <div className="flex items-center justify-center p-8">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  }

  if (!company) {
    return <div className="p-8 text-center text-gray-500">No company data found</div>
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-4">
        {company.logo_url ? (
          <img src={company.logo_url} alt={company.name} className="h-16 w-16 rounded-lg object-cover" />
        ) : (
          <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
            <Building2 className="h-8 w-8 text-gray-400" />
          </div>
        )}
        <div>
          <h1 className="text-2xl font-bold text-white">{company.name}</h1>
          <p className="text-gray-400">{company.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
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
            <Users className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-gray-400">Employees</p>
              <p className="text-xl font-semibold text-white">{stats.totalEmployees}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-[#1c1c1c] border-0">
          <div className="flex items-center gap-3">
            <Globe className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-gray-400">Website</p>
              <a 
                href={company.website_url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {company.website_url ? 'Visit website' : 'Not available'}
              </a>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
