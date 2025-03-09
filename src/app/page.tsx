
import { HeroSection } from "@/components/landing/HeroSection"
import { ServicesSection } from "@/components/landing/ServicesSection"
import { HowItWorksSection } from "@/components/landing/HowItWorksSection"
import { TestimonialsSection } from "@/components/landing/TestimonialsSection"
import { NewsletterSection } from "@/components/landing/NewsletterSection"
import { ForCompaniesSection } from "@/components/landing/ForCompaniesSection"
import { CTASection } from "@/components/landing/CTASection"

export default function Home() {
  return (
    <div>
      <HeroSection />
      <ServicesSection />
      <HowItWorksSection />
      <TestimonialsSection />
      <NewsletterSection />
      <ForCompaniesSection />
      <CTASection />
    </div>
  )
}
