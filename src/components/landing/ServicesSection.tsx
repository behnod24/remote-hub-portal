
import {
  CheckCircle,
  Wallet,
  ChartLine,
  Send,
  Construction,
  CircuitBoard,
  DraftingCompass,
  Ruler
} from "lucide-react"
import { ServiceCard } from "./ServiceCard"
import { Badge } from "@/components/ui/badge"

export const ServicesSection = () => {
  return (
    <section className="py-20 bg-gray-50" id="services">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">Our Services</h2>
        
        {/* Digital Services */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-6 text-center">Digital Services</h3>
          <p className="text-gray-600 text-center mb-10">All services delivered remotely by PamirHub's skilled teams</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard 
              icon={<CheckCircle className="h-10 w-10 text-[#E50914] mb-4" />}
              title="Web & Software Development"
              description="Custom software solutions developed by our remote teams"
              badge="Managed Service"
            />
            <ServiceCard 
              icon={<Wallet className="h-10 w-10 text-[#E50914] mb-4" />}
              title="Design & Creative Services"
              description="Professional design solutions delivered by our skilled specialists"
              badge="Managed Service"
            />
            <ServiceCard 
              icon={<ChartLine className="h-10 w-10 text-[#E50914] mb-4" />}
              title="Sales & Marketing"
              description="Comprehensive marketing strategies executed by our expert teams"
              badge="Managed Service"
            />
            <ServiceCard 
              icon={<Send className="h-10 w-10 text-[#E50914] mb-4" />}
              title="Social Media Management"
              description="Complete social media presence management by our dedicated staff"
              badge="Managed Service"
            />
          </div>
        </div>
        
        {/* Engineering Services */}
        <div>
          <h3 className="text-2xl font-bold mb-6 text-center">Engineering Services</h3>
          <p className="text-gray-600 text-center mb-10">All services delivered remotely by PamirHub's skilled teams</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ServiceCard 
              icon={<Construction className="h-10 w-10 text-[#E50914] mb-4" />}
              title="Mechanical Engineering"
              description="Professional mechanical design and analysis by our expert engineers"
              badge="Managed Service"
            />
            <ServiceCard 
              icon={<CircuitBoard className="h-10 w-10 text-[#E50914] mb-4" />}
              title="Electrical Engineering"
              description="Specialized electrical systems design and consulting by our technical teams"
              badge="Managed Service"
            />
            <ServiceCard 
              icon={<DraftingCompass className="h-10 w-10 text-[#E50914] mb-4" />}
              title="Product Design"
              description="End-to-end product development from concept to manufacturing specifications"
              badge="Managed Service"
            />
            <ServiceCard 
              icon={<Ruler className="h-10 w-10 text-[#E50914] mb-4" />}
              title="Civil Engineering & Architecture"
              description="Comprehensive structural and architectural design solutions"
              badge="Managed Service"
            />
          </div>
        </div>
        
        <div className="text-center mt-12 text-gray-600">
          <p>PamirHub handles all aspects from talent selection to project delivery</p>
        </div>
      </div>
    </section>
  )
}
