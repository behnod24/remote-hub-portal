
import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { TalentProfile } from '@/types/company'
import { typeHelper } from '@/types/supabase'
import { useToast } from '@/components/ui/use-toast'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Define the props interface
interface TalentSelectorProps {
  sector: string | null;
  onSelect: (talent: TalentProfile) => void;
  // Add any other props you need
}

export default function TalentSelector({ sector, onSelect }: TalentSelectorProps) {
  const [talents, setTalents] = useState<TalentProfile[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        setLoading(true)
        
        // Use any for non-schema tables
        let query = supabase
          .from('talent_profiles')
          .select('*') as any
        
        if (sector) {
          query = query.eq('sector', sector)
        }
        
        const { data, error } = await query
        
        if (error) {
          throw error
        }
        
        if (data) {
          setTalents(typeHelper<TalentProfile[]>()(data))
        }
      } catch (error: any) {
        console.error('Error fetching talents:', error)
        toast({
          title: 'Error',
          description: error.message || 'Failed to load talents',
          variant: 'destructive',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchTalents()
  }, [sector, toast])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {loading ? (
        <p>Loading talents...</p>
      ) : talents.length > 0 ? (
        talents.map(talent => (
          <Card key={talent.id} className="p-4">
            <div className="flex flex-col space-y-2">
              <h3 className="font-medium">Talent ID: {talent.id}</h3>
              <p>Sector: {talent.sector}</p>
              <p>Experience: {talent.years_of_experience} years</p>
              <p>Hourly Rate: ${talent.hourly_rate}/hr</p>
              <p>Availability: {talent.availability_status ? 'Available' : 'Unavailable'}</p>
              <Button 
                variant="outline" 
                onClick={() => onSelect(talent)}
                className="mt-2"
              >
                Select Talent
              </Button>
            </div>
          </Card>
        ))
      ) : (
        <p>No talents found{sector ? ` in ${sector} sector` : ''}.</p>
      )}
    </div>
  )
}
