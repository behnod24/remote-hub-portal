
import { Database } from '@/integrations/supabase/types'

// Type helper to work with Supabase tables
export function typeHelper<T>() {
  return (data: unknown) => data as T
}

// Create types for tables not in the Supabase schema
export interface UserProfile {
  id: string
  user_id: string
  avatar_url: string | null
  bio: string | null
  phone: string | null
  company: string | null
  company_name: string | null
  position: string | null
  role: 'admin' | 'user'
}

export interface ProjectApplicationWithDetails extends ProjectApplication {
  talents?: TalentProfile
}

// Define proper types for database tables
export type Tables = Database['public']['Tables']
export type DbProject = Tables['projects']['Row']
export type DbProjectRequirement = Tables['project_requirements']['Row']
export type DbCompanyMember = Tables['company_members']['Row']
export type DbTeamMember = Tables['team_members']['Row']
