
/**
 * This file provides type helpers for Supabase queries
 * Use these helpers when you need to work with database tables
 * until the official types.ts file is properly updated
 */

export type Tables = {
  companies: {
    id: string;
    name: string;
    description: string | null;
    website_url: string | null;
    logo_url: string | null;
    primary_color: string | null;
    secondary_color: string | null;
    brand_guidelines: string | null;
    created_at: string;
    updated_at: string;
  };
  company_profiles: {
    id: string;
    company_id: string;
    mission_statement: string | null;
    founding_year: number | null;
    industry: string | null;
    company_size: string | null;
    created_at: string;
    updated_at: string;
  };
  company_members: {
    id: string;
    company_id: string;
    user_id: string;
    role: string;
    title: string | null;
    department: string | null;
    can_manage_team: boolean | null;
    can_manage_projects: boolean | null;
    can_manage_talents: boolean | null;
    created_at: string;
    updated_at: string;
  };
  company_locations: {
    id: string;
    company_id: string;
    address: string;
    city: string;
    state: string | null;
    country: string;
    postal_code: string | null;
    is_headquarters: boolean | null;
    created_at: string;
    updated_at: string;
  };
  team_members: {
    id: string;
    company_id: string;
    first_name: string;
    last_name: string;
    email: string | null;
    position: string | null;
    department: string | null;
    start_date: string | null;
    created_at: string;
    updated_at: string;
  };
  projects: {
    id: string;
    company_id: string;
    name: string;
    description: string | null;
    status: string;
    start_date: string | null;
    end_date: string | null;
    created_at: string;
    updated_at: string;
  };
  project_requirements: {
    id: string;
    project_id: string;
    title: string;
    description: string | null;
    required_skills: string[] | null;
    priority: string;
    status: string;
    created_at: string;
    updated_at: string;
  };
  contact_submissions: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    team_size: string | null;
    location: string | null;
    message: string;
    accepts_privacy: boolean;
    accepts_marketing: boolean;
    created_at: string;
  };
};

/**
 * Type assertion helper for Supabase queries
 * Example usage:
 * 
 * import { supabase } from '@/integrations/supabase/client';
 * import { typeHelper } from '@/utils/supabaseTypes';
 * 
 * // Then in your component:
 * const { data } = await typeHelper(
 *   supabase.from('companies').select('*')
 * );
 */
export const typeHelper = <T>(query: any) => {
  return query as unknown as Promise<{ data: T; error: any }>;
};

/**
 * Helper function to type table names for Supabase queries
 */
export const table = <T extends keyof Tables>(tableName: T) => {
  return tableName;
};
