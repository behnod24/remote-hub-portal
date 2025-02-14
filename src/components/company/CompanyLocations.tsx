
import { useState, useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { useToast } from '@/components/ui/use-toast'
import { MapPin, Plus, X, CheckCircle } from 'lucide-react'

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
  const { toast } = useToast()
  const [isAdmin, setIsAdmin] = useState(false)
  const [companyId, setCompanyId] = useState<string | null>(null)
  const [locations, setLocations] = useState<Location[]>([])
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newLocation, setNewLocation] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    is_headquarters: false
  })

  useEffect(() => {
    const fetchData = async () => {
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
          setCompanyId(memberData.company_id)

          // Fetch company locations
          const { data: locationData, error } = await supabase
            .from('company_locations')
            .select('*')
            .eq('company_id', memberData.company_id)
            .order('is_headquarters', { ascending: false })

          if (error) throw error
          setLocations(locationData || [])
        }
      } catch (error) {
        console.error('Error fetching locations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [user])

  const handleAddLocation = async () => {
    if (!companyId) return

    try {
      const { data, error } = await supabase
        .from('company_locations')
        .insert([
          {
            ...newLocation,
            company_id: companyId
          }
        ])
        .select()

      if (error) throw error

      setLocations(prev => [...prev, data[0]])
      setShowAddForm(false)
      setNewLocation({
        address: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        is_headquarters: false
      })

      toast({
        title: "Success",
        description: "Location added successfully",
      })
    } catch (error) {
      console.error('Error adding location:', error)
      toast({
        title: "Error",
        description: "Failed to add location",
        variant: "destructive",
      })
    }
  }

  const handleDeleteLocation = async (id: string) => {
    try {
      const { error } = await supabase
        .from('company_locations')
        .delete()
        .eq('id', id)

      if (error) throw error

      setLocations(prev => prev.filter(location => location.id !== id))
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

  if (loading) {
    return <div className="flex items-center justify-center p-8">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
    </div>
  }

  return (
    <div className="space-y-6 p-6">
      {isAdmin && (
        <div className="flex justify-end">
          <Button onClick={() => setShowAddForm(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Location
          </Button>
        </div>
      )}

      {showAddForm && (
        <Card className="p-4 bg-[#1c1c1c] border-0">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Add New Location</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowAddForm(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm text-gray-400">Address</label>
                <Input
                  value={newLocation.address}
                  onChange={(e) => setNewLocation(prev => ({ ...prev, address: e.target.value }))}
                  className="mt-1 bg-[#1c1c1c] border-0"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">City</label>
                <Input
                  value={newLocation.city}
                  onChange={(e) => setNewLocation(prev => ({ ...prev, city: e.target.value }))}
                  className="mt-1 bg-[#1c1c1c] border-0"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">State</label>
                <Input
                  value={newLocation.state}
                  onChange={(e) => setNewLocation(prev => ({ ...prev, state: e.target.value }))}
                  className="mt-1 bg-[#1c1c1c] border-0"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Country</label>
                <Input
                  value={newLocation.country}
                  onChange={(e) => setNewLocation(prev => ({ ...prev, country: e.target.value }))}
                  className="mt-1 bg-[#1c1c1c] border-0"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400">Postal Code</label>
                <Input
                  value={newLocation.postal_code}
                  onChange={(e) => setNewLocation(prev => ({ ...prev, postal_code: e.target.value }))}
                  className="mt-1 bg-[#1c1c1c] border-0"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="is_headquarters"
                  checked={newLocation.is_headquarters}
                  onChange={(e) => setNewLocation(prev => ({ ...prev, is_headquarters: e.target.checked }))}
                  className="rounded border-gray-300"
                />
                <label htmlFor="is_headquarters" className="text-sm text-gray-400">
                  Headquarters
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={handleAddLocation}>
                Add Location
              </Button>
            </div>
          </div>
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {locations.map((location) => (
          <Card key={location.id} className="p-4 bg-[#1c1c1c] border-0">
            <div className="flex justify-between">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-primary mt-1" />
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-white">{location.city}</p>
                    {location.is_headquarters && (
                      <span className="flex items-center gap-1 text-xs text-primary">
                        <CheckCircle className="h-3 w-3" />
                        HQ
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400">{location.address}</p>
                  <p className="text-sm text-gray-400">
                    {location.state && `${location.state}, `}{location.country} {location.postal_code}
                  </p>
                </div>
              </div>
              {isAdmin && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteLocation(location.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {locations.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No locations found
        </div>
      )}
    </div>
  )
}
