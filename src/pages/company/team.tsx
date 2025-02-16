
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import CompanyDashboardLayout from '@/components/company/dashboard/CompanyDashboardLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { useToast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, UserPlus, Mail, Building, MoreVertical } from 'lucide-react'

interface TeamMember {
  id: string
  user_id: string
  role: 'admin' | 'manager' | 'member'
  title?: string
  department?: string
  start_date?: string
  is_active: boolean
  email?: string
  can_manage_team: boolean
  can_manage_projects: boolean
  can_manage_talents: boolean
  permissions: string[]
}

export default function CompanyTeam() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [companyId, setCompanyId] = useState<string | null>(null)
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [newMember, setNewMember] = useState({
    email: '',
    role: 'member',
    title: '',
    department: '',
    can_manage_team: false,
    can_manage_projects: false,
    can_manage_talents: false
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/auth/signin')
      return
    }

    const fetchTeamData = async () => {
      try {
        const { data: companyMember, error: memberError } = await supabase
          .from('company_members')
          .select('company_id, role')
          .eq('user_id', user.id)
          .maybeSingle()

        if (memberError) throw memberError

        if (companyMember) {
          setIsAdmin(companyMember.role === 'admin')
          setCompanyId(companyMember.company_id)

          const { data: teamData, error: teamError } = await supabase
            .from('team_members')
            .select(`
              *,
              users:user_id (
                email
              )
            `)
            .eq('company_id', companyMember.company_id)

          if (teamError) throw teamError

          if (teamData) {
            setTeamMembers(teamData.map(member => ({
              ...member,
              email: member.users?.email
            })))
          }
        }
      } catch (error) {
        console.error('Error fetching team data:', error)
        toast({
          title: "Error",
          description: "Failed to load team data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTeamData()
  }, [user, navigate, toast])

  const handleAddMember = async () => {
    if (!companyId || !isAdmin) return

    try {
      const { data: userData, error: userError } = await supabase
        .from('users')
        .select('id, email')
        .eq('email', newMember.email)
        .maybeSingle()

      if (userError) throw userError

      if (!userData) {
        toast({
          title: "Error",
          description: "User not found. Please ensure the email is correct.",
          variant: "destructive",
        })
        return
      }

      // First add company member
      const { error: companyMemberError } = await supabase
        .from('company_members')
        .insert({
          company_id: companyId,
          user_id: userData.id,
          role: newMember.role
        })

      if (companyMemberError) throw companyMemberError

      // Then add team member
      const { data: newTeamMember, error: memberError } = await supabase
        .from('team_members')
        .insert({
          company_id: companyId,
          user_id: userData.id,
          role: newMember.role,
          title: newMember.title,
          department: newMember.department,
          can_manage_team: newMember.can_manage_team,
          can_manage_projects: newMember.can_manage_projects,
          can_manage_talents: newMember.can_manage_talents
        })
        .select(`
          *,
          users:user_id (
            email
          )
        `)
        .single()

      if (memberError) throw memberError

      toast({
        title: "Success",
        description: "Team member added successfully",
      })

      if (newTeamMember) {
        setTeamMembers(prev => [...prev, {
          ...newTeamMember,
          email: userData.email
        }])
      }

      setNewMember({
        email: '',
        role: 'member',
        title: '',
        department: '',
        can_manage_team: false,
        can_manage_projects: false,
        can_manage_talents: false
      })
      setIsDialogOpen(false)
    } catch (error) {
      console.error('Error adding team member:', error)
      toast({
        title: "Error",
        description: "Failed to add team member",
        variant: "destructive",
      })
    }
  }

  const handleUpdateMember = async (memberId: string, updates: Partial<TeamMember>) => {
    try {
      const { error: updateError } = await supabase
        .from('team_members')
        .update(updates)
        .eq('id', memberId)

      if (updateError) throw updateError

      setTeamMembers(prev =>
        prev.map(member =>
          member.id === memberId
            ? { ...member, ...updates }
            : member
        )
      )

      toast({
        title: "Success",
        description: "Team member updated successfully",
      })
    } catch (error) {
      console.error('Error updating team member:', error)
      toast({
        title: "Error",
        description: "Failed to update team member",
        variant: "destructive",
      })
    }
  }

  const handleRemoveMember = async (memberId: string, userId: string) => {
    try {
      // Remove from team_members
      const { error: teamError } = await supabase
        .from('team_members')
        .delete()
        .eq('id', memberId)

      if (teamError) throw teamError

      // Remove from company_members
      const { error: companyError } = await supabase
        .from('company_members')
        .delete()
        .eq('user_id', userId)
        .eq('company_id', companyId)

      if (companyError) throw companyError

      setTeamMembers(prev => prev.filter(member => member.id !== memberId))

      toast({
        title: "Success",
        description: "Team member removed successfully",
      })
    } catch (error) {
      console.error('Error removing team member:', error)
      toast({
        title: "Error",
        description: "Failed to remove team member",
        variant: "destructive",
      })
    }
  }

  if (!user) return null

  return (
    <CompanyDashboardLayout currentPath="/company/dashboard/team">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Team Members</h1>
          {isAdmin && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="mr-2 h-4 w-4" />
                  Add Member
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1c1c1c] border-0">
                <DialogHeader>
                  <DialogTitle className="text-white">Add Team Member</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Email</label>
                    <Input
                      value={newMember.email}
                      onChange={(e) => setNewMember(prev => ({ ...prev, email: e.target.value }))}
                      className="mt-1 bg-[#292929] border-0"
                      type="email"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Role</label>
                    <select
                      value={newMember.role}
                      onChange={(e) => setNewMember(prev => ({ ...prev, role: e.target.value }))}
                      className="mt-1 w-full bg-[#292929] border-0 rounded-md text-white"
                    >
                      <option value="member">Member</option>
                      <option value="manager">Manager</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Title</label>
                    <Input
                      value={newMember.title}
                      onChange={(e) => setNewMember(prev => ({ ...prev, title: e.target.value }))}
                      className="mt-1 bg-[#292929] border-0"
                    />
                  </div>
                  <div>
                    <label className="text-sm text-gray-400">Department</label>
                    <Input
                      value={newMember.department}
                      onChange={(e) => setNewMember(prev => ({ ...prev, department: e.target.value }))}
                      className="mt-1 bg-[#292929] border-0"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="manage-team">Can Manage Team</Label>
                      <Switch
                        id="manage-team"
                        checked={newMember.can_manage_team}
                        onCheckedChange={(checked) => 
                          setNewMember(prev => ({ ...prev, can_manage_team: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="manage-projects">Can Manage Projects</Label>
                      <Switch
                        id="manage-projects"
                        checked={newMember.can_manage_projects}
                        onCheckedChange={(checked) => 
                          setNewMember(prev => ({ ...prev, can_manage_projects: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label htmlFor="manage-talents">Can Manage Talents</Label>
                      <Switch
                        id="manage-talents"
                        checked={newMember.can_manage_talents}
                        onCheckedChange={(checked) => 
                          setNewMember(prev => ({ ...prev, can_manage_talents: checked }))
                        }
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddMember} className="w-full">
                    Add Member
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member) => (
            <Card key={member.id} className="p-4 bg-[#1c1c1c] border-0">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{member.email}</h3>
                    <p className="text-sm text-gray-400 capitalize">{member.role}</p>
                  </div>
                </div>
                {isAdmin && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-[#292929] border-0">
                      <DropdownMenuItem
                        onClick={() => handleUpdateMember(member.id, {
                          can_manage_team: !member.can_manage_team
                        })}
                        className="text-white"
                      >
                        {member.can_manage_team ? 'Remove' : 'Add'} Team Management
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleUpdateMember(member.id, {
                          can_manage_projects: !member.can_manage_projects
                        })}
                        className="text-white"
                      >
                        {member.can_manage_projects ? 'Remove' : 'Add'} Project Management
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleUpdateMember(member.id, {
                          can_manage_talents: !member.can_manage_talents
                        })}
                        className="text-white"
                      >
                        {member.can_manage_talents ? 'Remove' : 'Add'} Talent Management
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleRemoveMember(member.id, member.user_id)}
                        className="text-red-500"
                      >
                        Remove Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
              {(member.title || member.department) && (
                <div className="mt-4 space-y-2">
                  {member.title && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Building className="h-4 w-4" />
                      {member.title}
                    </div>
                  )}
                  {member.department && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <Mail className="h-4 w-4" />
                      {member.department}
                    </div>
                  )}
                </div>
              )}
              {isAdmin && (
                <div className="mt-4 pt-4 border-t border-gray-800">
                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                    <div>Team: {member.can_manage_team ? '✓' : '×'}</div>
                    <div>Projects: {member.can_manage_projects ? '✓' : '×'}</div>
                    <div>Talents: {member.can_manage_talents ? '✓' : '×'}</div>
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>

        {teamMembers.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-400">No team members found</p>
          </div>
        )}
      </div>
    </CompanyDashboardLayout>
  )
}
