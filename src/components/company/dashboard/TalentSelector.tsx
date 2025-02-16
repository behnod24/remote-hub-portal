
import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/components/ui/use-toast'
import { supabase } from '@/integrations/supabase/client'
import { TalentProfile } from '@/types/company'
import { Loader2 } from 'lucide-react'

interface TalentSelectorProps {
  sector: string
  onSelect: (talent: TalentProfile) => void
}

export default function TalentSelector({ sector, onSelect }: TalentSelectorProps) {
  const [talents, setTalents] = useState<TalentProfile[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        const { data, error } = await supabase
          .from('talent_profiles')
          .select('*')
          .eq('sector', sector)
          .eq('availability_status', true)

        if (error) throw error

        setTalents(data || [])
      } catch (error: any) {
        toast({
          title: 'Error',
          description: 'Failed to load talents. Please try again.',
          variant: 'destructive',
        })
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              onClick={() => onSelect(talent)}
            >
              Select Talent
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
