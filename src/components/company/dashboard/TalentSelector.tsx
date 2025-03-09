
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { TalentProfile } from '@/types/company'
import { typeHelper } from '@/types/supabase'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'

interface TalentSelectorProps {
  sector: string | null;
  onSelect: (talent: TalentProfile) => void;
}

export default function TalentSelector({ sector, onSelect }: TalentSelectorProps) {
  const [talents, setTalents] = useState<TalentProfile[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()
  
  useEffect(() => {
    const fetchTalents = async () => {
      try {
        setLoading(true)
        let query = supabase.from('talent_profiles').select('*')
        
        if (sector) {
          query = query.eq('sector', sector)
        }
        
        const { data, error } = await query
        
        if (error) throw error
        
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
  
  if (loading) {
    return <div>Loading talents...</div>
  }
  
  if (talents.length === 0) {
    return (
      <Card>
        <CardContent className="p-6">
          <p className="text-center">No talents found{sector ? ` in the ${sector} sector` : ''}.</p>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {talents.map((talent) => (
        <Card key={talent.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-6">
            <div className="space-y-2">
              <h3 className="font-medium">Talent ID: {talent.id}</h3>
              <p>Sector: {talent.sector.replace('_', ' ')}</p>
              <p>Experience: {talent.years_of_experience} years</p>
              <p>Hourly Rate: ${talent.hourly_rate}/hr</p>
              <p>Status: {talent.availability_status ? 'Available' : 'Unavailable'}</p>
              <Button 
                onClick={() => onSelect(talent)}
                disabled={!talent.availability_status}
                className="w-full mt-4"
              >
                Select Talent
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
