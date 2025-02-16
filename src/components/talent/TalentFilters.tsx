
import { Button } from "@/components/ui/button"

const sectors = [
  { id: 'engineering', label: 'Engineering' },
  { id: 'software_development', label: 'Software Development' },
  { id: 'design', label: 'Design' },
  { id: 'sales_marketing', label: 'Sales & Marketing' }
]

interface TalentFiltersProps {
  selectedSector: string | null
  onSectorChange: (sector: string | null) => void
}

export default function TalentFilters({ selectedSector, onSectorChange }: TalentFiltersProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-4">
      <h3 className="text-lg font-semibold">Filter by Sector</h3>
      <div className="flex flex-wrap gap-2">
        {sectors.map(sector => (
          <Button
            key={sector.id}
            variant={selectedSector === sector.id ? "default" : "outline"}
            onClick={() => onSectorChange(selectedSector === sector.id ? null : sector.id)}
            className="text-sm"
          >
            {sector.label}
          </Button>
        ))}
      </div>
    </div>
  )
}
