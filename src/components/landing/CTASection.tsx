
import { Button } from "@/components/ui/button"

export const CTASection = () => {
  return (
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
  )
}
