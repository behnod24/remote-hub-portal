
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { Upload, Palette } from 'lucide-react'

export default function CompanyBranding() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isAdmin, setIsAdmin] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [company, setCompany] = useState({
    id: '',
    logo_url: '',
    primary_color: '',
    secondary_color: '',
    brand_guidelines: '',
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

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) {
      toast({
        title: "Permission Denied",
        description: "Only admins can update company branding",
        variant: "destructive",
      })
      return
    }

    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)
      const fileExt = file.name.split('.').pop()
      const filePath = `company-logos/${company.id}/${Math.random()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('company-assets')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('company-assets')
        .getPublicUrl(filePath)

      await supabase
        .from('companies')
        .update({ logo_url: publicUrl })
        .eq('id', company.id)

      setCompany(prev => ({ ...prev, logo_url: publicUrl }))
      toast({
        title: "Success",
        description: "Logo updated successfully",
      })
    } catch (error) {
      console.error('Error uploading logo:', error)
      toast({
        title: "Error",
        description: "Failed to upload logo",
        variant: "destructive",
      })
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    if (!isAdmin) {
      toast({
        title: "Permission Denied",
        description: "Only admins can update company branding",
        variant: "destructive",
      })
      return
    }

    try {
      setSaving(true)
      const { error } = await supabase
        .from('companies')
        .update({
          primary_color: company.primary_color,
          secondary_color: company.secondary_color,
          brand_guidelines: company.brand_guidelines,
        })
        .eq('id', company.id)

      if (error) throw error

      toast({
        title: "Success",
        description: "Branding updated successfully",
      })
    } catch (error) {
      console.error('Error updating branding:', error)
      toast({
        title: "Error",
        description: "Failed to update branding",
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
          <label className="text-sm text-gray-400">Company Logo</label>
          <div className="mt-2 flex items-center gap-4">
            {company.logo_url ? (
              <img src={company.logo_url} alt="Company Logo" className="h-16 w-16 rounded-lg object-cover" />
            ) : (
              <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100">
                <Upload className="h-6 w-6 text-gray-400" />
              </div>
            )}
            {isAdmin && (
              <label className="cursor-pointer">
                <Button disabled={uploading}>
                  {uploading ? 'Uploading...' : 'Upload New Logo'}
                </Button>
                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  disabled={uploading}
                />
              </label>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div>
            <label className="text-sm text-gray-400">Primary Color</label>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-gray-400" />
              <Input
                type="color"
                value={company.primary_color || '#000000'}
                onChange={(e) => setCompany(prev => ({ ...prev, primary_color: e.target.value }))}
                disabled={!isAdmin}
                className="h-10 w-20 bg-[#1c1c1c] border-0"
              />
              <Input
                value={company.primary_color || ''}
                onChange={(e) => setCompany(prev => ({ ...prev, primary_color: e.target.value }))}
                disabled={!isAdmin}
                placeholder="#000000"
                className="bg-[#1c1c1c] border-0"
              />
            </div>
          </div>

          <div>
            <label className="text-sm text-gray-400">Secondary Color</label>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5 text-gray-400" />
              <Input
                type="color"
                value={company.secondary_color || '#000000'}
                onChange={(e) => setCompany(prev => ({ ...prev, secondary_color: e.target.value }))}
                disabled={!isAdmin}
                className="h-10 w-20 bg-[#1c1c1c] border-0"
              />
              <Input
                value={company.secondary_color || ''}
                onChange={(e) => setCompany(prev => ({ ...prev, secondary_color: e.target.value }))}
                disabled={!isAdmin}
                placeholder="#000000"
                className="bg-[#1c1c1c] border-0"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-400">Brand Guidelines</label>
          <Textarea
            value={company.brand_guidelines || ''}
            onChange={(e) => setCompany(prev => ({ ...prev, brand_guidelines: e.target.value }))}
            disabled={!isAdmin}
            className="mt-1 bg-[#1c1c1c] border-0"
            rows={6}
            placeholder="Enter your brand guidelines here..."
          />
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
