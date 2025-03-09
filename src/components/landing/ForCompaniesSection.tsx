
import { Button } from "@/components/ui/button"
import { 
  Users, 
  DollarSign, 
  Award, 
  Briefcase, 
  Code, 
  PackageCheck 
} from "lucide-react"

export const ForCompaniesSection = () => {
  return (
    <section className="py-20 bg-white" id="for-companies">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl font-bold mb-4">Why Partner With PamirHub</h2>
          <p className="text-xl text-gray-600 mb-4">
            The smarter way to access global talent across technical and creative fields
          </p>
          <p className="text-lg text-gray-600">
            PamirHub manages all aspects of talent delivery - you focus on results, not hiring
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Card 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <Users className="h-10 w-10 text-[#E50914] mb-4" />
            <h3 className="text-xl font-bold mb-4">Complete Talent Solution</h3>
            <p className="text-gray-600">From software to engineering, we handle all your remote project needs with our skilled teams</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <DollarSign className="h-10 w-10 text-[#E50914] mb-4" />
            <h3 className="text-xl font-bold mb-4">Cost Efficiency</h3>
            <p className="text-gray-600">Save up to 70% compared to traditional hiring and contracting</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <Award className="h-10 w-10 text-[#E50914] mb-4" />
            <h3 className="text-xl font-bold mb-4">Quality Guaranteed</h3>
            <p className="text-gray-600">Expertly vetted professionals for every type of project, technical or creative</p>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <Briefcase className="h-10 w-10 text-[#E50914] mb-4" />
            <h3 className="text-xl font-bold mb-4">Simplified Management</h3>
            <p className="text-gray-600">Single point of contact for all your projects across multiple disciplines</p>
          </div>

          {/* Card 5 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <Code className="h-10 w-10 text-[#E50914] mb-4" />
            <h3 className="text-xl font-bold mb-4">Technical Excellence</h3>
            <p className="text-gray-600">Access to specialized engineering talent for mechanical, electrical, civil, and architectural projects</p>
          </div>

          {/* Card 6 */}
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
            <PackageCheck className="h-10 w-10 text-[#E50914] mb-4" />
            <h3 className="text-xl font-bold mb-4">Seamless Delivery</h3>
            <p className="text-gray-600">Timely delivery of complex technical and creative projects managed end-to-end</p>
          </div>
        </div>

        <div className="text-center">
          <Button 
            size="lg" 
            className="px-8 bg-gradient-to-r from-[#E50914] to-[#C2185B] hover:from-[#C2185B] hover:to-[#E50914] group"
          >
            <span className="inline-block transition-transform group-hover:translate-x-1">Start Your Project</span>
          </Button>
        </div>
      </div>
    </section>
  )
}
