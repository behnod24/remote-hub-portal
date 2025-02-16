
import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { useToast } from '@/components/ui/use-toast'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import TalentSelector from './TalentSelector'
import ProjectRequirementsForm from './ProjectRequirementsForm'
import { TalentProfile, ProjectRequirement } from '@/types/company'

export default function TalentSearch() {
  const [selectedSector, setSelectedSector] = useState<string>('engineering')
  const [selectedTalent, setSelectedTalent] = useState<TalentProfile | null>(null)
  const { user } = useAuth()
  const { toast } = useToast()

  const handleTalentSelect = async (talent: TalentProfile) => {
    try {
      // First create a new project
      const { data: project, error: projectError } = await supabase
        .from('projects')
        .insert([{
          name: `Project with Talent ${talent.id}`,
          status: 'pending'
        }])
        .select()
        .single()

      if (projectError) throw projectError

      // Then create the application
      const { error: applicationError } = await supabase
        .from('project_applications')
        .insert([{
          talent_id: talent.id,
          company_id: user?.id, // Assuming the logged-in user represents the company
          status: 'pending'
        }])

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
