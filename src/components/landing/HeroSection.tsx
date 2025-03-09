
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export const HeroSection = () => {
  // For typing animation effect
  const [displayText, setDisplayText] = useState("")
  const completeText = "PamirHub: We Build, Design, and Innovate—All Remotely."
  const [currentIndex, setCurrentIndex] = useState(0)
  
  useEffect(() => {
    if (currentIndex < completeText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + completeText[currentIndex])
        setCurrentIndex(currentIndex + 1)
      }, 50) // Speed of typing
      
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, completeText])

  // Function to highlight key words
  const highlightKeywords = (text: string) => {
    const keywords = ["Build", "Design", "Innovate", "Remotely"]
    let formattedText = text
    
    keywords.forEach(keyword => {
      const regex = new RegExp(`(${keyword})`, 'g')
      formattedText = formattedText.replace(regex, `<span class="text-[#E50914] font-bold">$1</span>`)
    })
    
    return formattedText
  }
  
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
          <h1 
            className="text-5xl font-bold leading-tight mb-6"
            dangerouslySetInnerHTML={{ __html: highlightKeywords(displayText) }}
          ></h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
            className="text-xl mb-4"
          >
            Connecting companies with elite remote talent for all your technical and creative needs
          </motion.p>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="text-lg mb-8"
          >
            Professional services delivered remotely and on time, every time
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, duration: 0.8 }}
            className="flex space-x-4"
          >
            <Link href="#contact" scroll={false}>
              <Button 
                size="lg" 
                variant="secondary" 
                className="px-8 text-[#E50914] transition-transform duration-300 hover:scale-105 hover:shadow-lg"
              >
                Find Your Solution
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline" 
              className="px-8 border-white text-white hover:bg-white/10 transition-transform duration-300 hover:scale-105"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
