
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/components/ui/use-toast'
import { TalentProfile, ProjectApplication, ProjectRequirement } from '@/types/company'
import { typeHelper, ProjectApplicationWithDetails } from '@/types/supabase'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs'
import TalentSelector from './TalentSelector'
import ProjectRequirementsForm from './ProjectRequirementsForm'

export default function TalentSearch() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [applications, setApplications] = useState<ProjectApplicationWithDetails[]>([])
  const [companyId, setCompanyId] = useState<string | null>(null)
  const [selectedTalent, setSelectedTalent] = useState<TalentProfile | null>(null)
  const [selectedSector, setSelectedSector] = useState<string | null>(null)

  useEffect(() => {
    const fetchCompanyAndApplications = async () => {
      if (!user) return
      
      try {
        // First get the company_id for the current user
        const { data: companyData, error: companyError } = await supabase
          .from('company_members')
          .select('company_id')
          .eq('user_id', user.id)
          .maybeSingle()
        
        if (companyError) throw companyError
        
        if (companyData) {
          setCompanyId(companyData.company_id)
          
          // Then fetch project applications for this company
          // Use any for non-schema tables
          const { data: applicationsData, error: applicationsError } = await (supabase
            .from('project_applications')
            .select(`
              *,
              talents:talent_id (*)
            `)
            .eq('company_id', companyData.company_id) as any)
          
          if (applicationsError) throw applicationsError
          
          if (applicationsData) {
            setApplications(typeHelper<ProjectApplicationWithDetails[]>()(applicationsData))
          }
        }
      } catch (error: any) {
        console.error('Error fetching applications:', error)
        toast({
          title: 'Error',
          description: error.message || 'Failed to load applications',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchCompanyAndApplications()
  }, [user, toast])

  const handleTalentSelect = async (talent: TalentProfile) => {
    try {
      if (!companyId) {
        throw new Error("Company ID is required");
      }
      
      // First create a new project
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert({
          name: `Project with Talent ${talent.id}`,
          status: 'pending',
          company_id: companyId
        })
        .select()
        .single()

      if (projectError) throw projectError

      // Then create the application
      const { error: applicationError } = await supabase
        .from('project_applications')
        .insert({
          talent_id: talent.id,
          company_id: companyId,
          status: 'pending'
        })

      if (applicationError) throw applicationError

      setSelectedTalent(talent)
      toast({
        title: 'Success',
        description: 'Talent selected successfully. Please add project requirements.',
      })
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to select talent. Please try again.',
        variant: 'destructive',
      })
    }
  }

  const handleRequirementSubmit = (requirement: ProjectRequirement) => {
    // The form component handles the submission
    setSelectedTalent(null) // Reset selection after submission
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col space-y-4">
        <h1 className="text-2xl font-bold text-white">Talent Search</h1>
        <Card className="p-4">
          <Select value={selectedSector} onValueChange={setSelectedSector}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Select sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="engineering">Engineering</SelectItem>
              <SelectItem value="software_development">Software Development</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="sales_marketing">Sales & Marketing</SelectItem>
            </SelectContent>
          </Select>
        </Card>
      </div>

      <Tabs defaultValue="search" className="space-y-4">
        <TabsList>
          <TabsTrigger value="search">Search Talents</TabsTrigger>
          <TabsTrigger value="requirements" disabled={!selectedTalent}>
            Project Requirements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-4">
          <TalentSelector
            sector={selectedSector}
            onSelect={handleTalentSelect}
          />
        </TabsContent>

        <TabsContent value="requirements">
          {selectedTalent && (
            <div className="space-y-4">
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Add Project Requirements</h2>
                <ProjectRequirementsForm
                  projectId={selectedTalent.id}
                  onSubmit={handleRequirementSubmit}
                />
              </Card>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
