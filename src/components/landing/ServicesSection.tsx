
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

export const ServicesSection = () => {
  return (
    <section className="py-20 bg-gray-50" id="services">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-16">Our Services</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ServiceCard 
            icon={<CheckCircle className="h-10 w-10 text-[#E50914] mb-4" />}
            title="Web & Software Development"
            description="Complete development solutions from requirements to deployment, all managed by our remote talent teams"
          />
          <ServiceCard 
            icon={<Wallet className="h-10 w-10 text-[#E50914] mb-4" />}
            title="Design & Creative Services"
            description="Professional design services including UX/UI, graphic design, and branding, delivered by our remote creative experts"
          />
          <ServiceCard 
            icon={<ChartLine className="h-10 w-10 text-[#E50914] mb-4" />}
            title="Sales & Marketing"
            description="Strategic marketing services to grow your business, handled remotely by our specialized marketing teams"
          />
          <ServiceCard 
            icon={<Send className="h-10 w-10 text-[#E50914] mb-4" />}
            title="Social Media Management"
            description="Comprehensive social media presence building and management by dedicated remote specialists"
          />
          <ServiceCard 
            icon={<Construction className="h-10 w-10 text-[#E50914] mb-4" />}
            title="Mechanical Engineering"
            description="Our expert engineering teams deliver professional mechanical designs, analyses, and solutions remotely"
          />
          <ServiceCard 
            icon={<CircuitBoard className="h-10 w-10 text-[#E50914] mb-4" />}
            title="Electrical Engineering"
            description="Remote electrical engineering services including circuit design, system architecture, and implementation"
          />
          <ServiceCard 
            icon={<DraftingCompass className="h-10 w-10 text-[#E50914] mb-4" />}
            title="Product Design"
            description="End-to-end product design services from concept to detailed specifications, all delivered by remote experts"
          />
          <ServiceCard 
            icon={<Ruler className="h-10 w-10 text-[#E50914] mb-4" />}
            title="Civil Engineering & Architecture"
            description="Comprehensive civil engineering and architectural services delivered remotely by qualified professionals"
          />
        </div>
      </div>
    </section>
  )
}
