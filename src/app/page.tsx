
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, MapPin, Briefcase, Building2, Globe } from "lucide-react"

export default function Home() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold font-display">
          Find Your Next Career Opportunity
        </h1>
        <p className="text-text-secondary text-lg md:text-xl max-w-2xl mx-auto">
          Browse through thousands of job opportunities from top companies worldwide
        </p>
        
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row gap-4 p-4 glass-card">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary" />
              <Input className="pl-10" placeholder="Job title or keyword" />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary" />
              <Input className="pl-10" placeholder="Location" />
            </div>
            <Button size="lg" className="shrink-0">
              Search Jobs
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-display">Featured Jobs</h2>
          <Button variant="ghost">View all jobs</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="glass-card p-6 space-y-4">
              <div className="flex gap-4">
                <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0">
                  <Image
                    src={`https://picsum.photos/seed/${i}/200/200`}
                    alt="Company logo"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold">Senior Software Engineer</h3>
                  <p className="text-text-secondary">TechCorp Inc.</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-secondary/50 rounded-full text-sm">Full-time</span>
                <span className="px-3 py-1 bg-secondary/50 rounded-full text-sm">Remote</span>
                <span className="px-3 py-1 bg-secondary/50 rounded-full text-sm">$120k-$150k</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary text-sm">Posted 2 days ago</span>
                <Button>Apply Now</Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Companies */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold font-display">Featured Companies</h2>
          <Button variant="ghost">View all companies</Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="glass-card p-6 text-center space-y-4">
              <div className="relative w-20 h-20 mx-auto rounded-full overflow-hidden">
                <Image
                  src={`https://picsum.photos/seed/${i + 10}/200/200`}
                  alt="Company logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">TechCorp Inc.</h3>
                <p className="text-text-secondary">Technology • 1000+ employees</p>
              </div>
              <div className="flex justify-center gap-4 text-text-secondary text-sm">
                <span className="flex items-center gap-1">
                  <Briefcase className="h-4 w-4" />
                  24 jobs
                </span>
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Multiple locations
                </span>
              </div>
              <Button variant="outline" className="w-full">View Company</Button>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="glass-card p-8 md:p-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <div className="flex justify-center">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold">10,000+</div>
            <div className="text-text-secondary">Active Jobs</div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-center">
              <Building2 className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold">1,000+</div>
            <div className="text-text-secondary">Companies</div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-center">
              <Globe className="h-8 w-8 text-primary" />
            </div>
            <div className="text-3xl font-bold">50+</div>
            <div className="text-text-secondary">Countries</div>
          </div>
        </div>
      </section>
    </div>
  )
}
