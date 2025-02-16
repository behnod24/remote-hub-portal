
import { useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

interface LocationFormProps {
  companyId: string
  onLocationAdded: (location: any) => void
}

export default function LocationForm({ companyId, onLocationAdded }: LocationFormProps) {
  const { toast } = useToast()
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [newLocation, setNewLocation] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    postal_code: '',
    is_headquarters: false
  })

  const handleAddLocation = async () => {
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

      onLocationAdded(data)
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

  return (
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
  )
}
