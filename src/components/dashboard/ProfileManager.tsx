
import { useState, useCallback } from 'react'
import { Upload, Trash2, Save } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useToast } from '@/components/ui/use-toast'
import { supabase } from '@/integrations/supabase/client'

interface ProfileData {
  avatar_url: string | null
  bio: string | null
  phone: string | null
  company: string | null
  position: string | null
  role: 'admin' | 'user'
}

interface ProfileManagerProps {
  userId: string
  initialProfile: ProfileData
  onProfileUpdate: (profile: ProfileData) => void
  isAdmin: boolean
}

export default function ProfileManager({ userId, initialProfile, onProfileUpdate, isAdmin }: ProfileManagerProps) {
  const [profile, setProfile] = useState<ProfileData>(initialProfile)
  const [isUploading, setIsUploading] = useState(false)
  const { toast } = useToast()

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const fileExt = file.name.split('.').pop()
      const filePath = `${userId}/${crypto.randomUUID()}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('profile_images')
        .upload(filePath, file)

      if (uploadError) throw uploadError

      const { data: { publicUrl } } = supabase.storage
        .from('profile_images')
        .getPublicUrl(filePath)

      const updatedProfile = { ...profile, avatar_url: publicUrl }
      await updateProfile(updatedProfile)
      setProfile(updatedProfile)
      onProfileUpdate(updatedProfile)

      toast({
        title: "Success",
        description: "Profile image updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload image",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const updateProfile = async (updatedProfile: ProfileData) => {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update(updatedProfile)
        .eq('user_id', userId)

      if (error) throw error

      toast({
        title: "Success",
        description: "Profile updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile",
        variant: "destructive",
      })
    }
  }

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }))
  }

  return (
    <div className="space-y-6 p-6 bg-[#1c1c1c] rounded-lg">
      <div className="flex items-center gap-4">
        <div className="relative h-24 w-24">
          <img
            src={profile.avatar_url || '/placeholder.svg'}
            alt="Profile"
            className="h-full w-full rounded-full object-cover"
          />
          <label className="absolute bottom-0 right-0 cursor-pointer">
            <div className="rounded-full bg-primary p-2 hover:bg-primary/80">
              <Upload className="h-4 w-4 text-white" />
            </div>
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={isUploading}
            />
          </label>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <label className="text-sm text-white/60">Bio</label>
            <Textarea
              value={profile.bio || ''}
              onChange={(e) => handleInputChange('bio', e.target.value)}
              className="mt-1"
              placeholder="Tell us about yourself"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="text-sm text-white/60">Phone</label>
          <Input
            value={profile.phone || ''}
            onChange={(e) => handleInputChange('phone', e.target.value)}
            className="mt-1"
            placeholder="Phone number"
          />
        </div>
        <div>
          <label className="text-sm text-white/60">Company</label>
          <Input
            value={profile.company || ''}
            onChange={(e) => handleInputChange('company', e.target.value)}
            className="mt-1"
            placeholder="Company name"
          />
        </div>
        <div>
          <label className="text-sm text-white/60">Position</label>
          <Input
            value={profile.position || ''}
            onChange={(e) => handleInputChange('position', e.target.value)}
            className="mt-1"
            placeholder="Your position"
          />
        </div>
        {isAdmin && (
          <div>
            <label className="text-sm text-white/60">Role</label>
            <select
              value={profile.role}
              onChange={(e) => handleInputChange('role', e.target.value as 'admin' | 'user')}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        )}
      </div>

      <div className="flex justify-end gap-2">
        <Button onClick={() => updateProfile(profile)}>
          <Save className="mr-2 h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  )
}
