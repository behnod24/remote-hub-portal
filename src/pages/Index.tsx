
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
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
  Instagram
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/layout/Header";

const Index = () => {
  return (
    <div>
      <Header />
      {/* Hero Section */}
      <section className="relative h-[800px]">
        <div className="absolute inset-0 bg-gradient-to-r from-[#E50914]/90 to-[#C2185B]/90">
          <img
            src="https://storage.googleapis.com/uxpilot-auth.appspot.com/188712bd96-3c2b0183a9e372a1a6c2.png"
            alt="professionals working in modern office space"
            className="w-full h-full object-cover mix-blend-overlay"
          />
        </div>
        <div className="relative container mx-auto px-6 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <h1 className="text-5xl font-bold leading-tight mb-6">Hire Top Remote Talent, Scale Your Business</h1>
            <p className="text-xl mb-8">Connect with exceptional global talent and transform your business with PamirHub's remote workforce solutions.</p>
            <div className="flex space-x-4">
              <Button size="lg" variant="secondary" className="px-8 text-[#E50914]">
                Hire Talent
              </Button>
              <Button size="lg" variant="outline" className="px-8 border-white text-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-16">Why Choose PamirHub</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <CheckCircle className="h-10 w-10 text-[#E50914] mb-4" />
              <h3 className="text-xl font-bold mb-4">Verified Global Talent</h3>
              <p className="text-gray-600">Access pre-vetted professionals from around the world, ensuring top-quality expertise for your projects.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <Wallet className="h-10 w-10 text-[#E50914] mb-4" />
              <h3 className="text-xl font-bold mb-4">Cost-Effective Solutions</h3>
              <p className="text-gray-600">Optimize your budget with flexible hiring options and competitive rates for global talent.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <ChartLine className="h-10 w-10 text-[#E50914] mb-4" />
              <h3 className="text-xl font-bold mb-4">Scalable Workforce</h3>
              <p className="text-gray-600">Easily scale your team up or down based on your business needs and project requirements.</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 relative overflow-hidden bg-gradient-to-br from-[#E50914]/5 to-[#C2185B]/5">
        <div className="container mx-auto px-6 relative">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#E50914] to-[#C2185B] text-transparent bg-clip-text">
              Seamless Remote Workforce Management
            </h2>
            <p className="text-xl text-gray-600">
              We handle your entire workforce, from hiring to execution, ensuring efficiency and top-tier results.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-[#E50914] to-[#C2185B] opacity-20" />
            
            {/* Timeline items */}
            <div className="space-y-12">
              {/* Timeline item 1 */}
              <TimelineItem
                icon={<ClipboardList className="text-white" />}
                title="Companies Submit Project Requirements"
                description="Businesses provide their project details, workforce needs, and operational goals to PamirHub."
                isLeft
              />

              {/* Timeline item 2 */}
              <TimelineItem
                icon={<UsersRound className="text-white" />}
                title="PamirHub Assigns Top Talent"
                description="PamirHub selects the best-suited professionals from its expert workforce based on skillset and role requirements."
              />

              {/* Timeline item 3 */}
              <TimelineItem
                icon={<Building2 className="text-white" />}
                title="PamirHub Manages All Work & Operations"
                description="Employees are officially hired and managed by PamirHub, which oversees all work activities and quality control."
                isLeft
              />

              {/* Timeline item 4 */}
              <TimelineItem
                icon={<CircleCheck className="text-white" />}
                title="PamirHub Delivers Results & Solutions"
                description="All tasks, projects, and deliverables meet high-quality standards before final presentation to the company."
              />

              {/* Timeline item 5 */}
              <TimelineItem
                icon={<ChartLine className="text-white" />}
                title="Continuous Monitoring & Performance"
                description="Real-time reporting and feedback loops ensure efficiency, productivity, and client satisfaction."
                isLeft
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
          <h2 className="text-3xl font-bold text-center mb-16">What Our Clients Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "CEO, TechStart",
                image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg",
                text: "PamirHub transformed our hiring process. We found exceptional talent quickly and efficiently."
              },
              {
                name: "Michael Chen",
                role: "CTO, DataFlow",
                image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg",
                text: "The quality of talent we've accessed through PamirHub has exceeded our expectations."
              },
              {
                name: "Emma Davis",
                role: "HR Director, GlobalTech",
                image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg",
                text: "Seamless experience from posting jobs to onboarding remote talent. Highly recommended!"
              }
            ].map((testimonial, i) => (
              <div key={i} className="bg-white p-8 rounded-xl shadow-lg">
                <div className="flex items-center mb-6">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
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

      {/* CTA Section */}
      <section className="py-20">
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
  );
};

// Timeline Item Component
const TimelineItem = ({ icon, title, description, isLeft = false }) => {
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
  );
};

export default Index;
