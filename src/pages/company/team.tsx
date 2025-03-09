import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { TeamMember } from '@/types/company'
import { typeHelper } from '@/types/supabase'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'

export default function TeamPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isAddingMember, setIsAddingMember] = useState(false)
  const [newMember, setNewMember] = useState({
    first_name: '',
    last_name: '',
    email: '',
    position: '',
    department: '',
  })
  const [companyId, setCompanyId] = useState<string>('')

  const fetchCompany = async () => {
    if (!user) return

    try {
      const { data, error } = await supabase
        .from('company_members')
        .select('company_id')
        .eq('user_id', user.id)
        .single()

      if (error) throw error

      if (data) {
        setCompanyId(data.company_id)
      }
    } catch (error) {
      console.error('Error fetching company:', error)
      toast({
        title: 'Error',
        description: 'Could not load company. Please try again.',
        variant: 'destructive',
      })
    }
  }

  useEffect(() => {
    const fetchTeamMembers = async () => {
      if (!companyId) return
      
      try {
        // Fetch team members
        const { data, error } = await supabase
          .from('team_members')
          .select('*')
          .eq('company_id', companyId)
        
        if (error) throw error
        
        // Convert to TeamMember type
        const typedTeamMembers = typeHelper<TeamMember[]>()(data || [])
        setTeamMembers(typedTeamMembers)
      } catch (error) {
        console.error('Error fetching team members:', error)
        toast({
          title: 'Error',
          description: 'Could not load team members. Please try again.',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchCompany()
    fetchTeamMembers()
  }, [user, toast])

  const handleInviteUser = async () => {
    try {
      // In a real app, we would check if the user exists in the 'users' table
      // For now, we'll just add them to team_members
      const { error } = await supabase
        .from('team_members')
        .insert({
          company_id: companyId,
          first_name: newMember.first_name,
          last_name: newMember.last_name,
          email: newMember.email,
          position: newMember.position,
          department: newMember.department,
        })

      if (error) throw error

      // Fetch the newly created team member
      const { data: newData } = await supabase
        .from('team_members')
        .select('*')
        .eq('email', newMember.email)
        .single()

      // Update the local state
      setTeamMembers(prev => [...prev, typeHelper<TeamMember>()(newData)])
      setIsAddingMember(false)
      setNewMember({
        first_name: '',
        last_name: '',
        email: '',
        position: '',
        department: '',
      })

      toast({
        title: 'Success',
        description: 'Team member added successfully!',
      })
    } catch (error) {
      console.error('Error inviting user:', error)
      toast({
        title: 'Error',
        description: 'Could not invite user. Please try again.',
        variant: 'destructive',
      })
    }
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Team Members</CardTitle>
          <CardDescription>Manage your team members here.</CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <p>Loading team members...</p>
          ) : (
            <div className="grid gap-4">
              {teamMembers.map(member => (
                <div key={member.id} className="border rounded-md p-4">
                  <p>
                    {member.first_name} {member.last_name}
                  </p>
                  <p>Email: {member.email}</p>
                  <p>Position: {member.position}</p>
                  <p>Department: {member.department}</p>
                </div>
              ))}
              {isAddingMember ? (
                <div className="border rounded-md p-4">
                  <Label>First Name</Label>
                  <Input
                    type="text"
                    value={newMember.first_name}
                    onChange={e =>
                      setNewMember({ ...newMember, first_name: e.target.value })
                    }
                  />
                  <Label>Last Name</Label>
                  <Input
                    type="text"
                    value={newMember.last_name}
                    onChange={e =>
                      setNewMember({ ...newMember, last_name: e.target.value })
                    }
                  />
                  <Label>Email</Label>
                  <Input
                    type="email"
                    value={newMember.email}
                    onChange={e =>
                      setNewMember({ ...newMember, email: e.target.value })
                    }
                  />
                  <Label>Position</Label>
                  <Input
                    type="text"
                    value={newMember.position}
                    onChange={e =>
                      setNewMember({ ...newMember, position: e.target.value })
                    }
                  />
                  <Label>Department</Label>
                  <Input
                    type="text"
                    value={newMember.department}
                    onChange={e =>
                      setNewMember({ ...newMember, department: e.target.value })
                    }
                  />
                  <Button onClick={handleInviteUser}>Invite User</Button>
                </div>
              ) : (
                <Button onClick={() => setIsAddingMember(true)}>Add Team Member</Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
