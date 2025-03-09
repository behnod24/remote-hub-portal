import { useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { TalentProfile } from '@/types/company'
import { typeHelper } from '@/types/supabase'
import { useToast } from '@/components/ui/use-toast'

// Define the props interface
interface TalentSelectorProps {
  // Add any props you need
}

export default function TalentSelector(props: TalentSelectorProps) {
  const [talents, setTalents] = useState<TalentProfile[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchTalents = async () => {
      try {
        setLoading(true)
        
        // Use any for non-schema tables
        const { data, error } = await (supabase
          .from('talent_profiles')
          .select('*') as any)
        
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
  }, [toast])

  return (
    <div>
      {loading ? (
        <p>Loading talents...</p>
      ) : (
        <ul>
          {talents.map(talent => (
            <li key={talent.id}>
              {talent.id} - {talent.sector}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
