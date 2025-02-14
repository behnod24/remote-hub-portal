
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Globe, Building } from 'lucide-react'

export default function CompanyDetails() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [company, setCompany] = useState({
    id: '',
    name: '',
    description: '',
    website_url: '',
  })

  useEffect(() => {
    const fetchCompanyData = async () => {
      if (!user) return

      try {
        // Fetch user's company role
        const { data: memberData } = await supabase
          .from('company_members')
          .select('company_id, role')
          .eq('user_id', user.id)
          .single()

        if (memberData) {
          setIsAdmin(memberData.role === 'admin')

          // Fetch company details
          const { data: companyData } = await supabase
            .from('companies')
            .select('*')
            .eq('id', memberData.company_id)
            .single()

          if (companyData) {
            setCompany(companyData)
          }
        }
      } catch (error) {
        console.error('Error fetching company data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCompanyData()
  }, [user])

  const handleSave = async () => {
    if (!isAdmin) {
      toast({
        title: "Permission Denied",
        description: "Only admins can update company details",
        variant: "destructive",
      })
      return
    }

    try {
      setSaving(true)
      const { error } = await supabase
        .from('companies')
        .update({
          name: company.name,
          description: company.description,
          website_url: company.website_url,
        })
        .eq('id', company.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Company details updated successfully",
      })
    } catch (error) {
      console.error('Error updating company:', error)
      toast({
        title: "Error",
        description: "Failed to update company details",
        variant: "destructive",
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center p-8">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  }

  return (
    <div className="space-y-6 p-6">
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-400">Company Name</label>
          <div className="flex items-center gap-2">
            <Building className="h-5 w-5 text-gray-400" />
            <Input
              value={company.name}
              onChange={(e) => setCompany(prev => ({ ...prev, name: e.target.value }))}
              disabled={!isAdmin}
              className="bg-[#1c1c1c] border-0"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-400">Description</label>
          <Textarea
            value={company.description}
            onChange={(e) => setCompany(prev => ({ ...prev, description: e.target.value }))}
            disabled={!isAdmin}
            className="mt-1 bg-[#1c1c1c] border-0"
            rows={4}
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Website URL</label>
          <div className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-gray-400" />
            <Input
              value={company.website_url}
              onChange={(e) => setCompany(prev => ({ ...prev, website_url: e.target.value }))}
              disabled={!isAdmin}
              className="bg-[#1c1c1c] border-0"
              placeholder="https://example.com"
            />
          </div>
        </div>

        {isAdmin && (
          <div className="flex justify-end">
            <Button 
              onClick={handleSave} 
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
