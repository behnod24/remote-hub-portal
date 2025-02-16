
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { CompanyStats, DisplayCompany, SupabaseResponse } from '@/types/company-types'

export function useCompanyData(userId: string | undefined) {
  const [loading, setLoading] = useState(true)
  const [company, setCompany] = useState<DisplayCompany | null>(null)
  const [stats, setStats] = useState<CompanyStats>({
    totalTeamMembers: 0,
    totalLocations: 0,
    activeProjects: 0
  })

  useEffect(() => {
    if (!userId) return

    const fetchCompanyData = async () => {
      try {
        const { data: memberData, error } = await supabase
          .from('company_members')
          .select(`
            company_id,
            companies:company_id (
              id,
              name,
              description,
              company_profiles (
                mission_statement,
                industry,
                company_size
              )
            )
          `)
          .eq('user_id', userId)
          .maybeSingle()

        if (error) throw error

        if (memberData) {
          const typedData = memberData as unknown as SupabaseResponse
          const companyProfile = typedData.companies.company_profiles?.[0] || {
            mission_statement: null,
            industry: null,
            company_size: null
          }
          
          const mergedData: DisplayCompany = {
            id: typedData.companies.id,
            name: typedData.companies.name,
            description: typedData.companies.description,
            ...companyProfile
          }
          
          setCompany(mergedData)

          const { count: teamCount } = await supabase
            .from('team_members')
            .select('*', { count: 'exact', head: true })
            .eq('company_id', typedData.companies.id)

          const { count: locationCount } = await supabase
            .from('company_locations')
            .select('*', { count: 'exact', head: true })
            .eq('company_id', typedData.companies.id)

          const { count: projectCount } = await supabase
            .from('projects')
            .select('*', { count: 'exact', head: true })
            .eq('company_id', typedData.companies.id)
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
  }, [userId])

  return { company, stats, loading }
}
