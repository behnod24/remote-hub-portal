
import { Card } from '@/components/ui/card'
import { DisplayCompany } from '@/types/company-types'

interface CompanyInfoProps {
  company: DisplayCompany
}

export function CompanyInfo({ company }: CompanyInfoProps) {
  return (
    <Card className="p-6 bg-[#1c1c1c] border-0 mt-6">
      <h2 className="text-xl font-semibold text-white mb-4">About {company.name}</h2>
      <div className="space-y-4">
        <p className="text-gray-300">{company.description}</p>
        {company.mission_statement && (
          <div className="mt-4">
            <h3 className="text-lg font-medium text-white mb-2">Mission Statement</h3>
            <p className="text-gray-300">{company.mission_statement}</p>
          </div>
        )}
        {company.industry && (
          <div className="text-gray-300">
            <span className="font-medium text-white">Industry:</span> {company.industry}
          </div>
        )}
      </div>
    </Card>
  )
}
