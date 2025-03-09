
import { Button } from "@/components/ui/button"
import { 
  ClipboardList, 
  UsersRound, 
  Building2, 
  CircleCheck 
} from "lucide-react"
import { TimelineItem } from "./TimelineItem"

export const HowItWorksSection = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#E50914]/5 to-[#C2185B]/5">
      <div className="container mx-auto px-6 relative">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#E50914] to-[#C2185B] text-transparent bg-clip-text">
            How PamirHub Works
          </h2>
          <p className="text-xl text-gray-600">
            PamirHub handles all talent management - you only deal with results, not individual contractors
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-[#E50914] to-[#C2185B] opacity-20" />
          
          {/* Timeline items */}
          <div className="space-y-12">
            <TimelineItem
              icon={<ClipboardList />}
              title="Submit your project requirements"
              description="Businesses provide their project details, workforce needs, and operational goals to PamirHub."
              isLeft
            />

            <TimelineItem
              icon={<UsersRound />}
              title="PamirHub reviews and provides a tailored solution with the right talent team"
              description="PamirHub selects the best-suited professionals from its expert workforce based on skillset and role requirements."
            />

            <TimelineItem
              icon={<Building2 />}
              title="Our skilled specialists deliver quality work remotely"
              description="Employees are officially hired and managed by PamirHub, which oversees all work activities and quality control."
              isLeft
            />

            <TimelineItem
              icon={<CircleCheck />}
              title="Receive completed projects on time, every time"
              description="All tasks, projects, and deliverables meet high-quality standards before final presentation to the company."
            />
          </div>
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-6">Transform Your Workforce with PamirHub Today!</h3>
          <div className="flex justify-center gap-4">
            <Button size="lg" className="px-8 bg-gradient-to-r from-[#E50914] to-[#C2185B] hover:from-[#C2185B] hover:to-[#E50914]">
              Hire Remote Workforce
            </Button>
            <Button size="lg" variant="outline" className="px-8 border-[#E50914] text-[#E50914] hover:bg-gradient-to-r hover:from-[#E50914] hover:to-[#C2185B] hover:text-white">
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
