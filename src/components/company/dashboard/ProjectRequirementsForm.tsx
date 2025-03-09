import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { useToast } from '@/components/ui/use-toast'
import { ProjectRequirement } from '@/types/company'
import { typeHelper } from '@/types/supabase'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'

export default function ProjectRequirementsForm() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [projectId, setProjectId] = useState<string | null>(null)
  const [projects, setProjects] = useState<any[]>([])
  const [requirements, setRequirements] = useState<ProjectRequirement[]>([])
  const [newRequirement, setNewRequirement] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high', // Type cast to ensure correct type
    required_skills: [] as string[],
  })

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user) return
      
      try {
        // Fetch company ID
        const { data: companyData, error: companyError } = await supabase
          .from('company_members')
          .select('company_id')
          .eq('user_id', user.id)
          .single()
        
        if (companyError) throw companyError
        
        if (companyData) {
          // Fetch projects for the company
          const { data: projectData, error: projectError } = await supabase
            .from('projects')
            .select('id, name')
            .eq('company_id', companyData.company_id)
          
          if (projectError) throw projectError
          
          setProjects(projectData || [])
          setLoading(false)
        }
      } catch (error: any) {
        console.error('Error fetching projects:', error)
        toast({
          title: 'Error',
          description: error.message || 'Failed to load projects',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchProjects()
  }, [user, toast])

  const handleRequirementSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!projectId) {
      toast({
        title: 'Error',
        description: 'No project selected',
        variant: 'destructive',
      })
      return
    }
    
    try {
      const { data, error } = await supabase
        .from('project_requirements')
        .insert({
          project_id: projectId,
          title: newRequirement.title,
          description: newRequirement.description || null,
          priority: newRequirement.priority,
          required_skills: newRequirement.required_skills,
          status: 'open',
        })
        .select()
        .single()
      
      if (error) throw error
      
      // Add the new requirement to the state
      setRequirements([...requirements, typeHelper<ProjectRequirement>()(data)])
      
      // Reset the form
      setNewRequirement({
        title: '',
        description: '',
        priority: 'medium',
        required_skills: [],
      })
      
      toast({
        title: 'Success',
        description: 'Requirement added successfully',
      })
    } catch (error: any) {
      console.error('Error adding requirement:', error)
      toast({
        title: 'Error',
        description: error.message || 'Failed to add requirement',
        variant: 'destructive',
      })
    }
  }

  const handleSkillChange = (skill: string) => {
    if (newRequirement.required_skills.includes(skill)) {
      setNewRequirement({
        ...newRequirement,
        required_skills: newRequirement.required_skills.filter((s) => s !== skill),
      })
    } else {
      setNewRequirement({
        ...newRequirement,
        required_skills: [...newRequirement.required_skills, skill],
      })
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Requirements Form</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRequirementSubmit} className="space-y-4">
          <div>
            <Label htmlFor="project">Select Project</Label>
            <Select onValueChange={setProjectId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              value={newRequirement.title}
              onChange={(e) => setNewRequirement({ ...newRequirement, title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newRequirement.description}
              onChange={(e) => setNewRequirement({ ...newRequirement, description: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <Select
              onValueChange={(value) =>
                setNewRequirement({ ...newRequirement, priority: value as 'low' | 'medium' | 'high' })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Required Skills</Label>
            <div className="flex flex-wrap gap-2">
              {['JavaScript', 'React', 'Node.js', 'SQL', 'TypeScript'].map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={skill}
                    checked={newRequirement.required_skills.includes(skill)}
                    onCheckedChange={() => handleSkillChange(skill)}
                  />
                  <Label htmlFor={skill}>{skill}</Label>
                </div>
              ))}
            </div>
          </div>
          <Button type="submit">Add Requirement</Button>
        </form>
      </CardContent>
    </Card>
  )
}
