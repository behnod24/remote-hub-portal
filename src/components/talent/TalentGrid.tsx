
import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Loader2, Check } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { supabase } from '@/integrations/supabase/client'
import { TalentProfile } from '@/types/company'
import { typeHelper } from '@/types/supabase'

interface TalentGridProps {
  sector: string | null
  onSelect: (talent: TalentProfile) => void
  selectedTalents: TalentProfile[]
}

export default function TalentGrid({ sector, onSelect, selectedTalents }: TalentGridProps) {
  const [talents, setTalents] = useState<TalentProfile[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchTalents = async () => {
      setLoading(true)
      try {
        // Use any for non-schema tables 
        let query = supabase.from('talent_profiles').select('*') as any
        
        if (query) {
          query = query.eq('availability_status', true)

          if (sector) {
            query = query.eq('sector', sector)
          }

          const { data, error } = await query

          if (error) throw error

          // Use the type helper to convert the data
          setTalents(data ? typeHelper<TalentProfile[]>()(data) : [])
        }
      } catch (error: any) {
        toast({
          title: 'Error',
          description: 'Failed to load talents. Please try again.',
          variant: 'destructive',
        })
        console.error('Error fetching talents:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTalents()
  }, [sector, toast])

  if (loading) {
    return (
      <div className="flex justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {talents.map((talent) => (
        <Card key={talent.id} className="p-4 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold">Talent ID: {talent.id.slice(0, 8)}</h3>
              <p className="text-sm text-gray-500">Experience: {talent.years_of_experience} years</p>
            </div>
            <Badge>{talent.sector}</Badge>
          </div>
          <div className="space-y-2">
            <p className="text-sm">Rate: ${talent.hourly_rate}/hour</p>
            <Button 
              className="w-full"
              variant={selectedTalents.some(t => t.id === talent.id) ? "secondary" : "default"}
              onClick={() => onSelect(talent)}
            >
              {selectedTalents.some(t => t.id === talent.id) ? (
                <>
                  <Check className="w-4 h-4 mr-2" />
                  Selected
                </>
              ) : (
                'Select Talent'
              )}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
