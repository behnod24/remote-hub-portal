
import ContentLayout from "@/components/layout/ContentLayout"
import { 
  ClipboardList, 
  UsersRound, 
  Send, 
  CheckCircle,
  ArrowRight
} from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HowItWorksPage() {
  return (
    <ContentLayout 
      title="How It Works"
      breadcrumbs={[{ label: "How It Works" }]}
    >
      <div className="space-y-12 max-w-4xl mx-auto">
        <div className="glass-card p-8">
          <h2 className="text-2xl font-semibold mb-4">Our Process</h2>
          <p className="text-gray-600 mb-8">
            PamirHub provides a streamlined approach to accessing global talent across technical and creative fields. 
            Our managed service model allows you to focus on results while we handle all aspects of talent management.
          </p>
          
          <div className="space-y-10">
            {/* Step 1 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#E50914] to-[#C2185B] flex items-center justify-center text-white">
                <ClipboardList size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#E50914]">1. Submit Your Project</h3>
                <p className="text-gray-600 mb-3">
                  Share your project requirements across any technical or creative field. Whether you need software development, 
                  design services, marketing expertise, or engineering solutions, we've got you covered.
                </p>
                <div className="bg-[#ffedee] p-4 rounded-lg">
                  <p className="text-[#E50914] font-medium">What you provide:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                    <li>Project objectives and requirements</li>
                    <li>Timeline and budget parameters</li>
                    <li>Technical specifications (if applicable)</li>
                    <li>Any existing resources or constraints</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#E50914] to-[#C2185B] flex items-center justify-center text-white">
                <UsersRound size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#E50914]">2. PamirHub Team Assessment</h3>
                <p className="text-gray-600 mb-3">
                  Our specialists review your needs and assemble the perfect remote team. We match your project requirements with 
                  our pool of vetted professionals who have the right skills and experience.
                </p>
                <div className="bg-[#ffedee] p-4 rounded-lg">
                  <p className="text-[#E50914] font-medium">What we do:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                    <li>Analyze your project requirements</li>
                    <li>Select the best-matched talent from our global pool</li>
                    <li>Assemble a dedicated team with complementary skills</li>
                    <li>Develop a detailed project execution plan</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#E50914] to-[#C2185B] flex items-center justify-center text-white">
                <Send size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#E50914]">3. Solution Delivery</h3>
                <p className="text-gray-600 mb-3">
                  Our skilled teams handle all aspects of project execution remotely. We manage the entire workflow, 
                  provide regular updates, and ensure seamless communication throughout the project lifecycle.
                </p>
                <div className="bg-[#ffedee] p-4 rounded-lg">
                  <p className="text-[#E50914] font-medium">Our delivery approach:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                    <li>Agile project management with regular sprints</li>
                    <li>Transparent progress tracking and reporting</li>
                    <li>Quality assurance at every stage</li>
                    <li>Single point of contact for simplified communication</li>
                  </ul>
                </div>
              </div>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-[#E50914] to-[#C2185B] flex items-center justify-center text-white">
                <CheckCircle size={28} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#E50914]">4. Quality Results</h3>
                <p className="text-gray-600 mb-3">
                  Receive completed projects on time with ongoing support and maintenance. We ensure that all deliverables meet
                  your specifications and provide continuous support after project completion.
                </p>
                <div className="bg-[#ffedee] p-4 rounded-lg">
                  <p className="text-[#E50914] font-medium">What you receive:</p>
                  <ul className="list-disc pl-5 mt-2 space-y-1 text-gray-700">
                    <li>High-quality project deliverables</li>
                    <li>Comprehensive documentation</li>
                    <li>Knowledge transfer sessions</li>
                    <li>Ongoing maintenance and support options</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="glass-card p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Experience the PamirHub difference with our comprehensive remote team approach. 
            Get access to top global talent without the hassle of recruitment, management, or coordination.
          </p>
          <Button 
            size="lg"
            className="px-8 bg-gradient-to-r from-[#E50914] to-[#C2185B] hover:from-[#C2185B] hover:to-[#E50914] transition-all duration-300 transform hover:scale-105"
          >
            Start Your Project Journey
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </ContentLayout>
  )
}
