export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      companies: {
        Row: {
          brand_guidelines: string | null
          created_at: string
          description: string | null
          id: string
          logo_url: string | null
          name: string
          primary_color: string | null
          secondary_color: string | null
          updated_at: string
          website_url: string | null
        }
        Insert: {
          brand_guidelines?: string | null
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Update: {
          brand_guidelines?: string | null
          created_at?: string
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string
          website_url?: string | null
        }
        Relationships: []
      }
      company_locations: {
        Row: {
          address: string
          city: string
          company_id: string
          country: string
          created_at: string
          id: string
          is_headquarters: boolean | null
          postal_code: string | null
          state: string | null
          updated_at: string
        }
        Insert: {
          address: string
          city: string
          company_id: string
          country: string
          created_at?: string
          id?: string
          is_headquarters?: boolean | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string
        }
        Update: {
          address?: string
          city?: string
          company_id?: string
          country?: string
          created_at?: string
          id?: string
          is_headquarters?: boolean | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_locations_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_members: {
        Row: {
          can_manage_projects: boolean | null
          can_manage_talents: boolean | null
          can_manage_team: boolean | null
          company_id: string
          created_at: string
          department: string | null
          id: string
          role: string
          title: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          can_manage_projects?: boolean | null
          can_manage_talents?: boolean | null
          can_manage_team?: boolean | null
          company_id: string
          created_at?: string
          department?: string | null
          id?: string
          role?: string
          title?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          can_manage_projects?: boolean | null
          can_manage_talents?: boolean | null
          can_manage_team?: boolean | null
          company_id?: string
          created_at?: string
          department?: string | null
          id?: string
          role?: string
          title?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_members_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_profiles: {
        Row: {
          company_id: string
          company_size: string | null
          created_at: string
          founding_year: number | null
          id: string
          industry: string | null
          mission_statement: string | null
          updated_at: string
        }
        Insert: {
          company_id: string
          company_size?: string | null
          created_at?: string
          founding_year?: number | null
          id?: string
          industry?: string | null
          mission_statement?: string | null
          updated_at?: string
        }
        Update: {
          company_id?: string
          company_size?: string | null
          created_at?: string
          founding_year?: number | null
          id?: string
          industry?: string | null
          mission_statement?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_profiles_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_submissions: {
        Row: {
          accepts_marketing: boolean
          accepts_privacy: boolean
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          location: string | null
          message: string
          phone: string
          team_size: string | null
        }
        Insert: {
          accepts_marketing?: boolean
          accepts_privacy?: boolean
          created_at?: string
          email: string
          first_name: string
          id?: string
          last_name: string
          location?: string | null
          message: string
          phone: string
          team_size?: string | null
        }
        Update: {
          accepts_marketing?: boolean
          accepts_privacy?: boolean
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          location?: string | null
          message?: string
          phone?: string
          team_size?: string | null
        }
        Relationships: []
      }
      project_applications: {
        Row: {
          company_id: string
          created_at: string
          id: string
          status: string
          talent_id: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          id?: string
          status: string
          talent_id: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          id?: string
          status?: string
          talent_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_applications_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_applications_talent_id_fkey"
            columns: ["talent_id"]
            isOneToOne: false
            referencedRelation: "talent_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      project_requirements: {
        Row: {
          created_at: string
          description: string | null
          id: string
          priority: string
          project_id: string
          required_skills: string[] | null
          status: string
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          priority?: string
          project_id: string
          required_skills?: string[] | null
          status?: string
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          priority?: string
          project_id?: string
          required_skills?: string[] | null
          status?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_requirements_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          company_id: string
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          name: string
          start_date: string | null
          status: string
          updated_at: string
        }
        Insert: {
          company_id: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name: string
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Update: {
          company_id?: string
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          name?: string
          start_date?: string | null
          status?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      talent_profiles: {
        Row: {
          availability_status: boolean
          created_at: string
          hourly_rate: number
          id: string
          sector: string
          updated_at: string
          user_id: string
          years_of_experience: number
        }
        Insert: {
          availability_status?: boolean
          created_at?: string
          hourly_rate: number
          id?: string
          sector: string
          updated_at?: string
          user_id: string
          years_of_experience: number
        }
        Update: {
          availability_status?: boolean
          created_at?: string
          hourly_rate?: number
          id?: string
          sector?: string
          updated_at?: string
          user_id?: string
          years_of_experience?: number
        }
        Relationships: []
      }
      team_members: {
        Row: {
          can_manage_projects: boolean
          can_manage_talents: boolean
          can_manage_team: boolean
          company_id: string
          created_at: string
          department: string | null
          email: string | null
          first_name: string
          id: string
          is_active: boolean
          last_name: string
          permissions: string[] | null
          position: string | null
          role: string
          start_date: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          can_manage_projects?: boolean
          can_manage_talents?: boolean
          can_manage_team?: boolean
          company_id: string
          created_at?: string
          department?: string | null
          email?: string | null
          first_name: string
          id?: string
          is_active?: boolean
          last_name: string
          permissions?: string[] | null
          position?: string | null
          role?: string
          start_date?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          can_manage_projects?: boolean
          can_manage_talents?: boolean
          can_manage_team?: boolean
          company_id?: string
          created_at?: string
          department?: string | null
          email?: string | null
          first_name?: string
          id?: string
          is_active?: boolean
          last_name?: string
          permissions?: string[] | null
          position?: string | null
          role?: string
          start_date?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "team_members_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          company: string | null
          company_name: string | null
          created_at: string
          id: string
          phone: string | null
          position: string | null
          role: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          company_name?: string | null
          created_at?: string
          id?: string
          phone?: string | null
          position?: string | null
          role?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          company_name?: string | null
          created_at?: string
          id?: string
          phone?: string | null
          position?: string | null
          role?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
