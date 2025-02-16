
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { X } from 'lucide-react'
import { TalentProfile } from '@/types/company'
import { useToast } from '@/components/ui/use-toast'

interface SelectedTalentListProps {
  talents: TalentProfile[]
  onRemove: (talentId: string) => void
}

export default function SelectedTalentList({ talents, onRemove }: SelectedTalentListProps) {
  const { toast } = useToast()

  const handleInvite = () => {
    toast({
      title: "Invitation Sent",
      description: `Invitations sent to ${talents.length} selected talents.`,
    })
  }

  return (
    <Card className="p-4 sticky top-4">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Selected Talents</h3>
          <Badge variant="secondary">{talents.length}</Badge>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto">
          {talents.map(talent => (
            <Card key={talent.id} className="p-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">ID: {talent.id.slice(0, 8)}</p>
                  <p className="text-sm text-gray-500">${talent.hourly_rate}/hour</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onRemove(talent.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {talents.length > 0 && (
          <Button 
            className="w-full"
            onClick={handleInvite}
          >
            Invite Selected ({talents.length})
          </Button>
        )}

        {talents.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            No talents selected yet
          </p>
        )}
      </div>
    </Card>
  )
}
