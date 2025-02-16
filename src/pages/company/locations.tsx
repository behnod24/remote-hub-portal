
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
import { MapPin, Plus, Trash2 } from 'lucide-react'

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
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newLocation, setNewLocation] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    is_headquarters: false
  })

  useEffect(() => {
    if (!user) {
      navigate('/auth/signin')
      return
    }

    const fetchLocations = async () => {
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

          // Fetch locations
          const { data: locationData } = await supabase
            .from('company_locations')
            .select('*')
            .eq('company_id', memberData.company_id)

          if (locationData) {
            setLocations(locationData)
          }
        }
      } catch (error) {
        console.error('Error fetching locations:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchLocations()
  }, [user, navigate])

  const handleAddLocation = async () => {
    if (!companyId || !isAdmin) return

    try {
      const { data, error } = await supabase
        .from('company_locations')
        .insert({
          company_id: companyId,
          ...newLocation
        })
        .select()
        .single()

      if (error) throw error

      setLocations(prev => [...prev, data])
      setNewLocation({
        address: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        is_headquarters: false
      })
      setIsDialogOpen(false)

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
          {isAdmin && (
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Location
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-[#1c1c1c] border-0">
                <DialogHeader>
                  <DialogTitle className="text-white">Add Location</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-gray-400">Address</label>
                    <Input
                      value={newLocation.address}
                      onChange={(e) => setNewLocation(prev => ({ ...prev, address: e.target.value }))}
                      className="mt-1 bg-[#292929] border-0"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400">City</label>
                      <Input
                        value={newLocation.city}
                        onChange={(e) => setNewLocation(prev => ({ ...prev, city: e.target.value }))}
                        className="mt-1 bg-[#292929] border-0"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">State</label>
                      <Input
                        value={newLocation.state}
                        onChange={(e) => setNewLocation(prev => ({ ...prev, state: e.target.value }))}
                        className="mt-1 bg-[#292929] border-0"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-gray-400">Country</label>
                      <Input
                        value={newLocation.country}
                        onChange={(e) => setNewLocation(prev => ({ ...prev, country: e.target.value }))}
                        className="mt-1 bg-[#292929] border-0"
                      />
                    </div>
                    <div>
                      <label className="text-sm text-gray-400">Postal Code</label>
                      <Input
                        value={newLocation.postal_code}
                        onChange={(e) => setNewLocation(prev => ({ ...prev, postal_code: e.target.value }))}
                        className="mt-1 bg-[#292929] border-0"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="is_headquarters"
                      checked={newLocation.is_headquarters}
                      onChange={(e) => setNewLocation(prev => ({ ...prev, is_headquarters: e.target.checked }))}
                      className="rounded border-gray-400 text-primary focus:ring-primary"
                    />
                    <label htmlFor="is_headquarters" className="text-sm text-gray-400">
                      Headquarters
                    </label>
                  </div>
                  <Button onClick={handleAddLocation} className="w-full">
                    Add Location
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          )}
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {locations.map((location) => (
            <Card key={location.id} className="p-4 bg-[#1c1c1c] border-0">
              <div className="flex justify-between items-start">
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-white">{location.address}</p>
                    <p className="text-sm text-gray-400">
                      {location.city}, {location.state}
                    </p>
                    <p className="text-sm text-gray-400">
                      {location.country} {location.postal_code}
                    </p>
                    {location.is_headquarters && (
                      <span className="mt-2 inline-block px-2 py-1 text-xs bg-primary/10 text-primary rounded">
                        Headquarters
                      </span>
                    )}
                  </div>
                </div>
                {isAdmin && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteLocation(location.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>
            </Card>
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
