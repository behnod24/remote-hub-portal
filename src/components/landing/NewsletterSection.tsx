
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from "lucide-react"

export const NewsletterSection = () => {
  return (
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
  )
}
