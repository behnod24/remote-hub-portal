import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  CheckCircle, 
  Wallet, 
  ChevronDown,
  ClipboardList,
  UsersRound,
  Building2,
  CircleCheck,
  ChartLine,
  Send,
  Twitter,
  Linkedin,
  Instagram,
  Cpu,
  CircuitBoard,
  Construction,
  Compass,
  Ruler,
  DraftingCompass,
  Users,
  DollarSign,
  Award,
  Briefcase,
  Code,
  PackageCheck
} from "lucide-react"

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[800px]" id="hero">
        <div className="absolute inset-0 bg-gradient-to-r from-[#E50914]/90 to-[#C2185B]/90">
          <Image
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/188712bd96-3c2b0183a9e372a1a6c2.png"
            alt="professionals working in modern office space"
            fill
            className="object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold leading-tight mb-6">PamirHub: We Build, Design, and Innovate—All Remotely.</h1>
            <p className="text-xl mb-4">Connecting companies with elite remote talent for all your technical and creative needs</p>
            <p className="text-lg mb-8">Professional services delivered remotely and on time, every time</p>
            <div className="flex space-x-4">
              <Link href="/front-pages/landing-page#contact">
                <Button size="lg" variant="secondary" className="px-8 text-[#E50914]">
                  Find Your Solution
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services Section */}
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

      {/* How PamirHub Works Section */}
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
              {/* Timeline item 1 */}
              <TimelineItem
                icon={<ClipboardList />}
                title="Submit your project requirements"
                description="Businesses provide their project details, workforce needs, and operational goals to PamirHub."
                isLeft
              />

              {/* Timeline item 2 */}
              <TimelineItem
                icon={<UsersRound />}
                title="PamirHub reviews and provides a tailored solution with the right talent team"
                description="PamirHub selects the best-suited professionals from its expert workforce based on skillset and role requirements."
              />

              {/* Timeline item 3 */}
              <TimelineItem
                icon={<Building2 />}
                title="Our skilled specialists deliver quality work remotely"
                description="Employees are officially hired and managed by PamirHub, which oversees all work activities and quality control."
                isLeft
              />

              {/* Timeline item 4 */}
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

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Why Companies Choose PamirHub</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CTO, TechInnovate",
                image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
                text: "PamirHub's engineering team delivered exceptional quality mechanical designs that integrated perfectly with our existing systems. All done remotely and on schedule."
              },
              {
                name: "Michael Chen",
                role: "CEO, GlobalTech Solutions",
                image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
                text: "The comprehensive software development services from PamirHub saved us months of recruitment efforts. Their remote team delivers enterprise-grade solutions consistently."
              },
              {
                name: "Emma Davis",
                role: "Product Director, InnovateCorp",
                image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
                text: "PamirHub's remote electrical engineering team managed our complex project with exceptional precision. Their all-in-one service model eliminates the hassle of coordinating multiple contractors."
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                  <div className="relative w-12 h-12">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="rounded-full object-cover"
                    />
                  </div>
                  <div className="ml-4">
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="text-yellow-400 mb-4">★★★★★</div>
                <p className="text-gray-600">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-[#E50914] to-[#C2185B] relative overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20 shadow-xl">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-4">Join 10,000+ Business Leaders</h2>
                <p className="text-xl mb-8 text-white/80">Get weekly insights on remote hiring and workforce management.</p>
                <form className="flex flex-col md:flex-row gap-4 max-w-md mx-auto">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-6 py-4 bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:ring-white/50"
                  />
                  <Button size="lg" variant="secondary" className="gap-2">
                    Subscribe <Send className="h-4 w-4" />
                  </Button>
                </form>
                <p className="mt-4 text-sm text-white/60">Join our newsletter and get 20% off your first remote hire</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Companies Section */}
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

      {/* CTA Section */}
      <section className="py-20" id="contact">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8">Ready to Transform Your Workforce?</h2>
          <div className="flex justify-center gap-6">
            <Button size="lg" className="px-8 bg-[#E50914] hover:bg-[#C2185B]">
              I Want to Hire Talent
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 border-[#E50914] text-[#E50914] hover:bg-[#E50914] hover:text-white"
            >
              I Am a Remote Worker
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

// Service Card Component
function ServiceCard({ icon, title, description }) {
  return (
    <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
      {icon}
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

// Timeline Item Component
function TimelineItem({ icon, title, description, isLeft = false }) {
  return (
    <div className="relative flex items-center gap-8 group">
      {isLeft ? (
        <>
          <div className="w-1/2 pr-12 text-right">
            <div className="mb-4 p-6 bg-white rounded-xl shadow-lg shadow-[#E50914]/5 hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-bold mb-2 text-[#E50914]">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#E50914] to-[#C2185B] rounded-full border-4 border-white flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300">
            {icon}
          </div>
          <div className="w-1/2" />
        </>
      ) : (
        <>
          <div className="w-1/2" />
          <div className="absolute left-1/2 -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-[#E50914] to-[#C2185B] rounded-full border-4 border-white flex items-center justify-center shadow-lg group-hover:scale-110 transition duration-300">
            {icon}
          </div>
          <div className="w-1/2 pl-12">
            <div className="mb-4 p-6 bg-white rounded-xl shadow-lg shadow-[#E50914]/5 hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-bold mb-2 text-[#E50914]">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
