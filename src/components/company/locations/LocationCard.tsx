
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MapPin, Trash2 } from 'lucide-react'

interface LocationCardProps {
  location: {
    id: string
    address: string
    city: string
    state: string
    country: string
    postal_code: string
    is_headquarters: boolean
  }
  isAdmin: boolean
  onDelete: (id: string) => void
}

export default function LocationCard({ location, isAdmin, onDelete }: LocationCardProps) {
  return (
    <Card className="p-4 bg-[#1c1c1c] border-0">
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
            onClick={() => onDelete(location.id)}
          >
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
        )}
      </div>
    </Card>
  )
}
