import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar } from '@/components/ui/avatar'
import { useToast } from '@/components/ui/use-toast'
import { Loader2, Upload, Save } from 'lucide-react'
import { typeHelper, UserProfile } from '@/types/supabase'

interface ProfileManagerProps {
  // Add any props if needed
}

export default function ProfileManager() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    avatar_url: null,
    bio: '',
    phone: '',
    company: '',
    position: '',
  })

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user) return
      
      try {
        setLoading(true)
        
        // Use any for non-schema tables
        const { data, error } = await (supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle() as any)
        
        if (error) throw error
        
        if (data) {
          setProfile({
            ...profile,
            ...typeHelper<UserProfile>()(data),
          })
        }
      } catch (error) {
        console.error('Error fetching profile:', error)
        toast({
          title: 'Error',
          description: 'Could not load your profile. Please try again.',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchProfile()
  }, [user, toast])

  const handleSaveProfile = async () => {
    if (!user) return

    try {
      setSaving(true)

      const { error } = await supabase
        .from('user_profiles')
        .upsert({
          id: profile.id,
          user_id: user.id,
          avatar_url: profile.avatar_url,
          bio: profile.bio,
          phone: profile.phone,
          company: profile.company,
          company_name: profile.company_name,
          position: profile.position,
          role: profile.role || 'user',
          updated_at: new Date().toISOString(),
        }, { onConflict: 'user_id' })

      if (error) throw error

      toast({
        title: 'Profile Updated',
        description: 'Your profile has been updated successfully.',
      })
    } catch (error) {
      console.error('Error updating profile:', error)
      toast({
        title: 'Error',
        description: 'Failed to update your profile. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setUploading(true)

      const fileName = `avatar-${user.id}-${Date.now()}`
      const filePath = `avatars/${fileName}`

      const { data, error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: false,
        })

      if (error) throw error

      const publicURL = supabase.storage.from('avatars').getPublicUrl(filePath).data.publicUrl

      setProfile({ ...profile, avatar_url: publicURL })
      toast({
        title: 'Avatar Uploaded',
        description: 'Your avatar has been uploaded successfully.',
      })
    } catch (error) {
      console.error('File upload error:', error)
      toast({
        title: 'Error',
        description: 'Failed to upload avatar. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setUploading(false)
    }
  }

  return (
    <Card className="bg-gray-800 border-gray-700 p-6 space-y-6">
      <h2 className="text-2xl font-semibold text-white">Profile Management</h2>
      {loading ? (
        <div className="flex justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar src={profile.avatar_url || undefined} className="h-16 w-16" />
            <div>
              <Button variant="secondary" asChild disabled={uploading}>
                <label htmlFor="avatar-upload" className="cursor-pointer">
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Avatar
                    </>
                  )}
                </label>
              </Button>
              <Input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/*"
                onChange={handleFileUpload}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Bio</label>
            <Textarea
              value={profile.bio || ''}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              className="mt-1 bg-gray-700 text-white border-gray-600 focus:border-primary focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Phone</label>
            <Input
              type="tel"
              value={profile.phone || ''}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              className="bg-gray-700 text-white border-gray-600 focus:border-primary focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Company</label>
            <Input
              type="text"
              value={profile.company || ''}
              onChange={(e) => setProfile({ ...profile, company: e.target.value })}
              className="bg-gray-700 text-white border-gray-600 focus:border-primary focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300">Position</label>
            <Input
              type="text"
              value={profile.position || ''}
              onChange={(e) => setProfile({ ...profile, position: e.target.value })}
              className="bg-gray-700 text-white border-gray-600 focus:border-primary focus:ring-primary"
            />
          </div>

          <Button onClick={handleSaveProfile} disabled={saving} className="w-full">
            {saving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Profile
              </>
            )}
          </Button>
        </div>
      )}
    </Card>
  )
}
