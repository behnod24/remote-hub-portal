
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

interface ProjectRequirementsFormProps {
  projectId: string;
  onSubmit: (requirement: ProjectRequirement) => void;
}

export default function ProjectRequirementsForm({ projectId, onSubmit }: ProjectRequirementsFormProps) {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [requirements, setRequirements] = useState<ProjectRequirement[]>([])
  const [newRequirement, setNewRequirement] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    required_skills: [] as string[],
  })

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
      setLoading(true)
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
      const typedRequirement = typeHelper<ProjectRequirement>()(data)
      setRequirements([...requirements, typedRequirement])
      
      // Call the onSubmit prop with the new requirement
      onSubmit(typedRequirement)
      
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
    } finally {
      setLoading(false)
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Requirements</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleRequirementSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              value={newRequirement.title}
              onChange={(e) => setNewRequirement({ ...newRequirement, title: e.target.value })}
              required
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
              value={newRequirement.priority}
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
          <Button type="submit" disabled={loading}>
            {loading ? 'Adding...' : 'Add Requirement'}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
