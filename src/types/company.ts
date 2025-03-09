
export interface ProjectApplication {
  id: string;
  company_id: string;
  talent_id: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface ProjectRequirement {
  id: string;
  project_id: string;
  title: string;
  description?: string;
  required_skills: string[];
  priority: 'low' | 'medium' | 'high'; // Strictly typed to match database constraints
  status: 'open' | 'in-progress' | 'completed';
  created_at: string;
  updated_at: string;
}

export interface TalentProfile {
  id: string;
  user_id: string;
  sector: 'engineering' | 'software_development' | 'design' | 'sales_marketing';
  years_of_experience: number;
  hourly_rate: number;
  availability_status: boolean;
  created_at?: string;
  updated_at?: string;
}

// Used for the team.tsx page
export interface TeamMember {
  id: string;
  user_id: string;
  role: 'admin' | 'manager' | 'member';
  title?: string;
  department?: string;
  position?: string; // This property is used in team.tsx
  start_date?: string;
  is_active: boolean;
  email?: string;
  can_manage_team: boolean;
  can_manage_projects: boolean;
  can_manage_talents: boolean;
  permissions: string[];
  first_name?: string;
  last_name?: string;
  company_id?: string;
}
