
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import CompanyDashboardLayout from '@/components/company/dashboard/CompanyDashboardLayout'
import { useToast } from '@/components/ui/use-toast'
import LocationForm from '@/components/company/locations/LocationForm'
import LocationCard from '@/components/company/locations/LocationCard'

interface Location {
  id: string
  address: string
  city: string
  state: string
  country: string
  postal_code: string
  is_headquarters: boolean
}

export default function CompanyLocations() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const { toast } = useToast()
  const [loading, setLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)
  const [companyId, setCompanyId] = useState<string | null>(null)
  const [locations, setLocations] = useState<Location[]>([])

  useEffect(() => {
    if (!user) {
      navigate('/auth/signin')
      return
    }

    const fetchLocations = async () => {
      try {
        const { data: memberData, error: memberError } = await supabase
          .from('company_members')
          .select('company_id, role')
          .maybeSingle()

        if (memberError) throw memberError

        if (memberData) {
          setIsAdmin(memberData.role === 'admin')
          setCompanyId(memberData.company_id)

          const { data: locationData, error: locationError } = await supabase
            .from('company_locations')
            .select('*')
            .eq('company_id', memberData.company_id)

          if (locationError) throw locationError

          if (locationData) {
            setLocations(locationData)
          }
        }
      } catch (error) {
        console.error('Error fetching locations:', error)
        toast({
          title: "Error",
          description: "Failed to fetch locations. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchLocations()
  }, [user, navigate, toast])

  const handleDeleteLocation = async (locationId: string) => {
    if (!isAdmin) return

    try {
      const { error } = await supabase
        .from('company_locations')
        .delete()
        .eq('id', locationId)

      if (error) throw error

      setLocations(prev => prev.filter(loc => loc.id !== locationId))
      toast({
        title: "Success",
        description: "Location deleted successfully",
      })
    } catch (error) {
      console.error('Error deleting location:', error)
      toast({
        title: "Error",
        description: "Failed to delete location",
        variant: "destructive",
      })
    }
  }

  if (!user) return null

  return (
    <CompanyDashboardLayout currentPath="/company/dashboard/locations">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white">Company Locations</h1>
          {isAdmin && companyId && (
            <LocationForm
              companyId={companyId}
              onLocationAdded={(location) => setLocations(prev => [...prev, location])}
            />
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <LocationCard
              key={location.id}
              location={location}
              isAdmin={isAdmin}
              onDelete={handleDeleteLocation}
            />
          ))}
        </div>

        {locations.length === 0 && !loading && (
          <div className="text-center py-8">
            <p className="text-gray-400">No locations found</p>
          </div>
        )}
      </div>
    </CompanyDashboardLayout>
  )
}
