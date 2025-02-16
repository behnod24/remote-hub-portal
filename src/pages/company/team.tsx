
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import CompanyDashboardLayout from '@/components/company/dashboard/CompanyDashboardLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { User, UserPlus, Mail, Building } from 'lucide-react'

interface TeamMember {
  id: string
  user_id: string
  role: string
  title?: string
  department?: string
  start_date?: string
  is_active: boolean
  email?: string
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
    department: ''
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  useEffect(() => {
    if (!user) {
      navigate('/auth/signin')
      return
    }

    const fetchTeamData = async () => {
      try {
        // Check if user is admin
        const { data: memberData } = await supabase
          .from('company_members')
          .select('company_id, role')
          .eq('user_id', user.id)
          .single()

        if (memberData) {
          setIsAdmin(memberData.role === 'admin')
          setCompanyId(memberData.company_id)

          // Fetch team members with user emails
          const { data: teamData } = await supabase
            .from('team_members')
            .select(`
              *,
              users:user_id (
                email
              )
            `)
            .eq('company_id', memberData.company_id)

          if (teamData) {
            setTeamMembers(teamData.map(member => ({
              ...member,
              email: member.users?.email
            })))
          }
        }
      } catch (error) {
        console.error('Error fetching team data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamData()
  }, [user, navigate])

  const handleAddMember = async () => {
    if (!companyId || !isAdmin) return

    try {
      // First check if user exists
      const { data: userData } = await supabase
        .from('users')
        .select('id, email')
        .eq('email', newMember.email)
        .single()

      if (!userData) {
        toast({
          title: "Error",
          description: "User not found. Please ensure the email is correct.",
          variant: "destructive",
        })
        return
      }

      // Add team member
      const { data: newTeamMember, error: memberError } = await supabase
        .from('team_members')
        .insert({
          company_id: companyId,
          user_id: userData.id,
          role: newMember.role,
          title: newMember.title,
          department: newMember.department
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

      // Add new member to state
      if (newTeamMember) {
        setTeamMembers(prev => [...prev, {
          ...newTeamMember,
          email: userData.email
        }])
      }

      // Reset form and close dialog
      setNewMember({
        email: '',
        role: 'member',
        title: '',
        department: ''
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
                    <p className="text-sm text-gray-400">{member.role}</p>
                  </div>
                </div>
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
