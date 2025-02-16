
export interface ProjectApplication {
  id: string
  company_id: string
  talent_id: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface ProjectRequirement {
  id: string
  project_id: string
  title: string
  description?: string
  required_skills: string[]
  priority: 'low' | 'medium' | 'high'
  status: 'open' | 'in-progress' | 'completed'
  created_at: string
  updated_at: string
}

export interface TalentProfile {
  id: string
  user_id: string
  sector: 'engineering' | 'software_development' | 'design' | 'sales_marketing'
  years_of_experience: number
  hourly_rate: number
  availability_status: boolean
}
