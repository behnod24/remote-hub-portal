
export interface CompanyStats {
  totalTeamMembers: number
  totalLocations: number
  activeProjects: number
}

export interface CompanyProfile {
  mission_statement: string | null
  industry: string | null
  company_size: string | null
}

export interface Company {
  id: string
  name: string
  description: string | null
  company_profiles: CompanyProfile[]
}

export type DisplayCompany = Omit<Company, 'company_profiles'> & CompanyProfile

export interface SupabaseCompany {
  id: string
  name: string
  description: string | null
  company_profiles: Array<{
    mission_statement: string | null
    industry: string | null
    company_size: string | null
  }>
}

export interface SupabaseResponse {
  company_id: string
  companies: SupabaseCompany
}
