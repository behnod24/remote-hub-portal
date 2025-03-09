
import { Button } from "@/components/ui/button"
import { 
  ClipboardList, 
  UsersRound, 
  Send, 
  CheckCircle 
} from "lucide-react"
import { TimelineItem } from "./TimelineItem"
import Link from "next/link"

export const HowItWorksSection = () => {
  return (
    <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#E50914]/5 to-[#C2185B]/5" id="how-it-works">
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
              icon={<ClipboardList className="text-white" />}
              title="Submit Your Project"
              description="Share your project requirements across any technical or creative field"
              isLeft
            />

            <TimelineItem
              icon={<UsersRound className="text-white" />}
              title="PamirHub Team Assessment"
              description="Our specialists review your needs and assemble the perfect remote team"
              benefit="No recruitment headaches - we handle all talent management"
            />

            <TimelineItem
              icon={<Send className="text-white" />}
              title="Solution Delivery"
              description="Our skilled teams handle all aspects of project execution remotely"
              benefit="Single point of contact for all project communications"
              isLeft
            />

            <TimelineItem
              icon={<CheckCircle className="text-white" />}
              title="Quality Results"
              description="Receive completed projects on time with ongoing support and maintenance"
              benefit="Consistent quality from specialized teams across all fields"
            />
          </div>
        </div>

        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold mb-6">Transform Your Workforce with PamirHub Today!</h3>
          <div className="flex justify-center gap-4">
            <a href="#contact">
              <Button 
                size="lg" 
                className="px-8 bg-gradient-to-r from-[#E50914] to-[#C2185B] hover:from-[#C2185B] hover:to-[#E50914] transition-all duration-300 transform hover:scale-105"
              >
                Start Your Project Journey
              </Button>
            </a>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 border-[#E50914] text-[#E50914] hover:bg-gradient-to-r hover:from-[#E50914] hover:to-[#C2185B] hover:text-white"
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
