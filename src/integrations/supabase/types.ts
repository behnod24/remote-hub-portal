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
          created_at: string | null
          description: string | null
          id: string
          logo_url: string | null
          name: string
          primary_color: string | null
          secondary_color: string | null
          updated_at: string | null
          website_url: string | null
        }
        Insert: {
          brand_guidelines?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name: string
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Update: {
          brand_guidelines?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          logo_url?: string | null
          name?: string
          primary_color?: string | null
          secondary_color?: string | null
          updated_at?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      company_dashboard_preferences: {
        Row: {
          company_id: string | null
          created_at: string
          id: string
          preferred_sectors: Database["public"]["Enums"]["sector_type"][] | null
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          id?: string
          preferred_sectors?:
            | Database["public"]["Enums"]["sector_type"][]
            | null
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          id?: string
          preferred_sectors?:
            | Database["public"]["Enums"]["sector_type"][]
            | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "company_dashboard_preferences_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: true
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
        ]
      }
      company_locations: {
        Row: {
          address: string
          city: string
          company_id: string | null
          country: string
          created_at: string | null
          id: string
          is_headquarters: boolean | null
          postal_code: string | null
          state: string | null
          updated_at: string | null
        }
        Insert: {
          address: string
          city: string
          company_id?: string | null
          country: string
          created_at?: string | null
          id?: string
          is_headquarters?: boolean | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string | null
        }
        Update: {
          address?: string
          city?: string
          company_id?: string | null
          country?: string
          created_at?: string | null
          id?: string
          is_headquarters?: boolean | null
          postal_code?: string | null
          state?: string | null
          updated_at?: string | null
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
          company_id: string
          created_at: string | null
          role: string
          user_id: string
        }
        Insert: {
          company_id: string
          created_at?: string | null
          role: string
          user_id: string
        }
        Update: {
          company_id?: string
          created_at?: string | null
          role?: string
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
          {
            foreignKeyName: "company_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      company_profiles: {
        Row: {
          company_id: string | null
          company_size: string | null
          created_at: string | null
          founding_year: number | null
          id: string
          industry: string | null
          mission_statement: string | null
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          company_size?: string | null
          created_at?: string | null
          founding_year?: number | null
          id?: string
          industry?: string | null
          mission_statement?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          company_size?: string | null
          created_at?: string | null
          founding_year?: number | null
          id?: string
          industry?: string | null
          mission_statement?: string | null
          updated_at?: string | null
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
          accepts_marketing: boolean | null
          accepts_privacy: boolean
          created_at: string | null
          email: string
          first_name: string
          id: string
          last_name: string
          location: string | null
          message: string
          phone: string | null
          recaptcha_token: string | null
          team_size: string | null
        }
        Insert: {
          accepts_marketing?: boolean | null
          accepts_privacy?: boolean
          created_at?: string | null
          email: string
          first_name: string
          id?: string
          last_name: string
          location?: string | null
          message: string
          phone?: string | null
          recaptcha_token?: string | null
          team_size?: string | null
        }
        Update: {
          accepts_marketing?: boolean | null
          accepts_privacy?: boolean
          created_at?: string | null
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          location?: string | null
          message?: string
          phone?: string | null
          recaptcha_token?: string | null
          team_size?: string | null
        }
        Relationships: []
      }
      files: {
        Row: {
          company_id: string | null
          created_at: string | null
          id: string
          mime_type: string
          name: string
          project_id: string | null
          size: number
          storage_path: string
          task_id: string | null
          updated_at: string | null
          uploaded_by: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          mime_type: string
          name: string
          project_id?: string | null
          size: number
          storage_path: string
          task_id?: string | null
          updated_at?: string | null
          uploaded_by?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          id?: string
          mime_type?: string
          name?: string
          project_id?: string | null
          size?: number
          storage_path?: string
          task_id?: string | null
          updated_at?: string | null
          uploaded_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "files_company_id_fkey"
            columns: ["company_id"]
            isOneToOne: false
            referencedRelation: "companies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "files_uploaded_by_fkey"
            columns: ["uploaded_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_applications: {
        Row: {
          company_id: string | null
          created_at: string
          id: string
          status: string | null
          talent_id: string | null
          updated_at: string
        }
        Insert: {
          company_id?: string | null
          created_at?: string
          id?: string
          status?: string | null
          talent_id?: string | null
          updated_at?: string
        }
        Update: {
          company_id?: string | null
          created_at?: string
          id?: string
          status?: string | null
          talent_id?: string | null
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
      project_members: {
        Row: {
          created_at: string | null
          project_id: string
          role: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          project_id: string
          role: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          project_id?: string
          role?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_members_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      project_requirements: {
        Row: {
          created_at: string
          description: string | null
          id: string
          priority: string | null
          project_id: string | null
          required_skills: string[] | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          priority?: string | null
          project_id?: string | null
          required_skills?: string[] | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          priority?: string | null
          project_id?: string | null
          required_skills?: string[] | null
          status?: string | null
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
          company_id: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          status: string | null
          updated_at: string | null
        }
        Insert: {
          company_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          status?: string | null
          updated_at?: string | null
        }
        Update: {
          company_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: string | null
          updated_at?: string | null
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
      sentiment_data: {
        Row: {
          created_at: string | null
          date_recorded: string
          id: string
          sentiment_score: number
          tweet_count: number
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          date_recorded: string
          id?: string
          sentiment_score: number
          tweet_count: number
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          date_recorded?: string
          id?: string
          sentiment_score?: number
          tweet_count?: number
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sentiment_data_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      site_settings: {
        Row: {
          created_at: string
          id: string
          logo_url: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          logo_url?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          logo_url?: string
          updated_at?: string
        }
        Relationships: []
      }
      talent_profiles: {
        Row: {
          availability_status: boolean | null
          created_at: string
          hourly_rate: number | null
          id: string
          sector: Database["public"]["Enums"]["sector_type"]
          updated_at: string
          user_id: string | null
          years_of_experience: number | null
        }
        Insert: {
          availability_status?: boolean | null
          created_at?: string
          hourly_rate?: number | null
          id?: string
          sector: Database["public"]["Enums"]["sector_type"]
          updated_at?: string
          user_id?: string | null
          years_of_experience?: number | null
        }
        Update: {
          availability_status?: boolean | null
          created_at?: string
          hourly_rate?: number | null
          id?: string
          sector?: Database["public"]["Enums"]["sector_type"]
          updated_at?: string
          user_id?: string | null
          years_of_experience?: number | null
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_to: string | null
          created_at: string | null
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          project_id: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          project_id?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          project_id?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tasks_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          can_manage_projects: boolean | null
          can_manage_talents: boolean | null
          can_manage_team: boolean | null
          company_id: string | null
          created_at: string | null
          department: string | null
          id: string
          is_active: boolean | null
          permissions: Json | null
          role: string
          start_date: string | null
          title: string | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          can_manage_projects?: boolean | null
          can_manage_talents?: boolean | null
          can_manage_team?: boolean | null
          company_id?: string | null
          created_at?: string | null
          department?: string | null
          id?: string
          is_active?: boolean | null
          permissions?: Json | null
          role: string
          start_date?: string | null
          title?: string | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          can_manage_projects?: boolean | null
          can_manage_talents?: boolean | null
          can_manage_team?: boolean | null
          company_id?: string | null
          created_at?: string | null
          department?: string | null
          id?: string
          is_active?: boolean | null
          permissions?: Json | null
          role?: string
          start_date?: string | null
          title?: string | null
          updated_at?: string | null
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
      tweets: {
        Row: {
          author: string
          content: string
          created_at: string | null
          id: string
          posted_at: string
          sentiment: string
          user_id: string | null
        }
        Insert: {
          author: string
          content: string
          created_at?: string | null
          id?: string
          posted_at: string
          sentiment: string
          user_id?: string | null
        }
        Update: {
          author?: string
          content?: string
          created_at?: string | null
          id?: string
          posted_at?: string
          sentiment?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "tweets_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
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
          created_at: string | null
          id: string
          phone: string | null
          position: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          settings: Json | null
          user_id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          company_name?: string | null
          created_at?: string | null
          id?: string
          phone?: string | null
          position?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          settings?: Json | null
          user_id: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          company?: string | null
          company_name?: string | null
          created_at?: string | null
          id?: string
          phone?: string | null
          position?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          settings?: Json | null
          user_id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email: string
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_company_member: {
        Args: {
          user_id: string
          company_id: string
        }
        Returns: boolean
      }
      set_recaptcha_secret: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      sector_type:
        | "engineering"
        | "software_development"
        | "design"
        | "sales_marketing"
      team_member_role: "admin" | "manager" | "member"
      user_role: "admin" | "user"
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
