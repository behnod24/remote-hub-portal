
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Code, PenTool, Briefcase, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/layout/Header";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const { data: bgData } = supabase.storage.from('site-assets').getPublicUrl('background.png');
        if (bgData.publicUrl) {
          console.log('Background URL:', bgData.publicUrl);
          setBackgroundUrl(bgData.publicUrl);
        }
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };
    fetchAssets();
  }, []);

  const categories = [{
    icon: Code,
    title: "Engineering",
    count: "500+"
  }, {
    icon: PenTool,
    title: "Design",
    count: "300+"
  }, {
    icon: Briefcase,
    title: "Sales",
    count: "400+"
  }, {
    icon: MessageSquare,
    title: "Marketing",
    count: "250+"
  }];

  return <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <Header />
      
      <section className="relative min-h-[80vh] md:min-h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0" style={{
        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.8
      }} />
        
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent z-1" />
        
        <div className="container mx-auto px-4 pt-20 md:pt-32 pb-12 md:pb-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary px-2 md:px-0" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5
          }}>
              Modernizing Workforce Hiring <br className="hidden md:block" />for Companies
            </motion.h1>
            <motion.p className="text-base sm:text-lg md:text-xl text-text-secondary mb-6 md:mb-8 max-w-3xl mx-auto px-4 md:px-0" initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.2
          }}>
              PamirHub's expert team delivers engineering, IT, design, sales, and marketing solutions 
              remotely—efficient, cost-effective, and hassle-free.
            </motion.p>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            duration: 0.5,
            delay: 0.4
          }} className="space-x-4 px-4 md:px-0">
              <button className="btn-primary inline-flex items-center text-sm md:text-base">
                Hire Experts Today
                <ChevronRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative py-20" style={{
        backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="relative z-10 container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Expert Talent Categories</h2>
            <p className="text-white/90 max-w-2xl mx-auto">
              Access a diverse pool of skilled professionals across various domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div 
                key={category.title} 
                className="bg-white rounded-2xl shadow-lg p-6 text-center" 
                initial={{
                  opacity: 0,
                  y: 20
                }} 
                animate={{
                  opacity: 1,
                  y: 0
                }} 
                transition={{
                  duration: 0.5,
                  delay: index * 0.1
                }}
              >
                <category.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                <p className="text-text-secondary">{category.count} Experts</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="glass-card p-8 md:p-12 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Transform Your Workforce?
            </h2>
            <p className="text-text-secondary mb-8 max-w-2xl mx-auto">
              Join hundreds of companies that have already modernized their hiring process with PamirHub
            </p>
            <button className="btn-primary">
              Get Started Today
            </button>
          </div>
        </div>
      </section>
    </div>;
};

export default Index;
