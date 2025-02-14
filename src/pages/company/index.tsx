
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import CompanyOverview from '@/components/company/CompanyOverview'
import CompanyDetails from '@/components/company/CompanyDetails'
import CompanyBranding from '@/components/company/CompanyBranding'
import CompanyLocations from '@/components/company/CompanyLocations'

export default function CompanyProfilePage() {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState(() => {
    const hash = location.hash.replace('#', '')
    return hash || 'overview'
  })

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <CompanyOverview />
      case 'details':
        return <CompanyDetails />
      case 'branding':
        return <CompanyBranding />
      case 'locations':
        return <CompanyLocations />
      default:
        return <CompanyOverview />
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <div className="border-b border-[#292929]">
        <div className="flex space-x-4 px-6">
          {[
            { id: 'overview', label: 'Overview' },
            { id: 'details', label: 'Company Details' },
            { id: 'branding', label: 'Branding' },
            { id: 'locations', label: 'Locations' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {renderContent()}
    </div>
  )
}
