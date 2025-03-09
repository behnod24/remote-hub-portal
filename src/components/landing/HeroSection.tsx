
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export const HeroSection = () => {
  return (
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
  )
}
