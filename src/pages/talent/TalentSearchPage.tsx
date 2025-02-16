
import { useState } from 'react'
import ContentLayout from "@/components/layout/ContentLayout"
import TalentFilters from "@/components/talent/TalentFilters"
import TalentGrid from "@/components/talent/TalentGrid"
import SelectedTalentList from "@/components/talent/SelectedTalentList"
import { TalentProfile } from "@/types/company"

export default function TalentSearchPage() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null)
  const [selectedTalents, setSelectedTalents] = useState<TalentProfile[]>([])

  const handleSectorChange = (sector: string | null) => {
    setSelectedSector(sector)
  }

  const handleTalentSelect = (talent: TalentProfile) => {
    setSelectedTalents(prev => {
      const exists = prev.some(t => t.id === talent.id)
      if (exists) return prev
      return [...prev, talent]
    })
  }

  const handleTalentRemove = (talentId: string) => {
    setSelectedTalents(prev => prev.filter(t => t.id !== talentId))
  }

  return (
    <ContentLayout 
      title="Talent Search"
      breadcrumbs={[{ label: "Dashboard" }, { label: "Talent Search" }]}
    >
      <div className="space-y-6">
        <TalentFilters 
          selectedSector={selectedSector}
          onSectorChange={handleSectorChange}
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <TalentGrid 
              sector={selectedSector}
              onSelect={handleTalentSelect}
              selectedTalents={selectedTalents}
            />
          </div>
          <div>
            <SelectedTalentList 
              talents={selectedTalents}
              onRemove={handleTalentRemove}
            />
          </div>
        </div>
      </div>
    </ContentLayout>
  )
}
