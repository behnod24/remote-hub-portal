
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import CompanyDashboardLayout from '@/components/company/dashboard/CompanyDashboardLayout'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Card } from '@/components/ui/card'

interface CompanyProfile {
  id: string
  name: string
  description: string
  website_url: string
  mission_statement?: string
  founding_year?: number
  industry?: string
  company_size?: string
}

export default function CompanyProfile() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [profile, setProfile] = useState<CompanyProfile | null>(null)

  useEffect(() => {
    if (!user) {
      navigate('/auth/signin')
      return
    }

    const fetchProfile = async () => {
      try {
        // Check if user is admin
        const { data: memberData } = await supabase
          .from('company_members')
          .select('company_id, role')
          .eq('user_id', user.id)
          .single()

        if (memberData) {
          setIsAdmin(memberData.role === 'admin')

          // Fetch company profile
          const { data: companyData } = await supabase
            .from('companies')
            .select(`
              *,
              company_profiles(*)
            `)
            .eq('id', memberData.company_id)
            .single()

          if (companyData) {
            setProfile({
              ...companyData,
              ...companyData.company_profiles?.[0]
            })
          }
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProfile()
  }, [user, navigate])

  const handleSave = async () => {
    if (!profile || !isAdmin) return

    try {
      setSaving(true)

      // Update companies table
      const { error: companyError } = await supabase
        .from('companies')
        .update({
          name: profile.name,
          description: profile.description,
          website_url: profile.website_url
        })
        .eq('id', profile.id)

      if (companyError) throw companyError

      // Update company_profiles table
      const { error: profileError } = await supabase
        .from('company_profiles')
        .upsert({
          company_id: profile.id,
          mission_statement: profile.mission_statement,
          founding_year: profile.founding_year,
          industry: profile.industry,
          company_size: profile.company_size
        })

      if (profileError) throw profileError

      toast({
        title: "Success",
        description: "Company profile updated successfully",
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: "Error",
        description: "Failed to update company profile",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (!user) return null

  if (loading) {
    return (
      <CompanyDashboardLayout currentPath="/company/dashboard/profile">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
        </div>
      </CompanyDashboardLayout>
    )
  }

  return (
    <CompanyDashboardLayout currentPath="/company/dashboard/profile">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Company Profile</h1>
          {isAdmin && (
            <Button 
              onClick={handleSave}
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          )}
        </div>

        {profile && (
          <Card className="p-6 bg-[#1c1c1c] border-0">
            <div className="space-y-4">
              <div>
                <label className="text-sm text-gray-400">Company Name</label>
                <Input
                  value={profile.name}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, name: e.target.value } : null)}
                  disabled={!isAdmin}
                  className="mt-1 bg-[#292929] border-0"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Description</label>
                <Textarea
                  value={profile.description}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, description: e.target.value } : null)}
                  disabled={!isAdmin}
                  className="mt-1 bg-[#292929] border-0"
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Website URL</label>
                <Input
                  value={profile.website_url || ''}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, website_url: e.target.value } : null)}
                  disabled={!isAdmin}
                  className="mt-1 bg-[#292929] border-0"
                  placeholder="https://example.com"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Mission Statement</label>
                <Textarea
                  value={profile.mission_statement || ''}
                  onChange={(e) => setProfile(prev => prev ? { ...prev, mission_statement: e.target.value } : null)}
                  disabled={!isAdmin}
                  className="mt-1 bg-[#292929] border-0"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-400">Founding Year</label>
                  <Input
                    type="number"
                    value={profile.founding_year || ''}
                    onChange={(e) => setProfile(prev => prev ? { ...prev, founding_year: parseInt(e.target.value) } : null)}
                    disabled={!isAdmin}
                    className="mt-1 bg-[#292929] border-0"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">Industry</label>
                  <Input
                    value={profile.industry || ''}
                    onChange={(e) => setProfile(prev => prev ? { ...prev, industry: e.target.value } : null)}
                    disabled={!isAdmin}
                    className="mt-1 bg-[#292929] border-0"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-400">Company Size</label>
                  <select
                    value={profile.company_size || ''}
                    onChange={(e) => setProfile(prev => prev ? { ...prev, company_size: e.target.value } : null)}
                    disabled={!isAdmin}
                    className="mt-1 w-full bg-[#292929] border-0 rounded-md text-white"
                  >
                    <option value="">Select size</option>
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="501+">501+ employees</option>
                  </select>
                </div>
              </div>
            </div>
          </Card>
        )}
      </div>
    </CompanyDashboardLayout>
  )
}
