import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight, Briefcase, Code, PenTool, MessageSquare } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator 
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [backgroundUrl, setBackgroundUrl] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const { data: logoData } = supabase
          .storage
          .from('site-assets')
          .getPublicUrl('logo.png')
        
        if (logoData.publicUrl) {
          console.log('Logo URL:', logoData.publicUrl)
          setLogoUrl(logoData.publicUrl)
        }

        const { data: bgData } = supabase
          .storage
          .from('site-assets')
          .getPublicUrl('background.png')
        
        if (bgData.publicUrl) {
          console.log('Background URL:', bgData.publicUrl)
          setBackgroundUrl(bgData.publicUrl)
        }
      } catch (error) {
        console.error('Error fetching assets:', error)
      }
    }

    fetchAssets()
  }, [])

  const categories = [
    { icon: Code, title: "Engineering", count: "500+" },
    { icon: PenTool, title: "Design", count: "300+" },
    { icon: Briefcase, title: "Sales", count: "400+" },
    { icon: MessageSquare, title: "Marketing", count: "250+" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      <nav className="fixed w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center">
              {logoUrl && (
                <img 
                  src={logoUrl} 
                  alt="PamirHub Logo" 
                  className="h-8 w-auto md:h-10 object-contain"
                  onError={(e) => console.error('Error loading image:', e)}
                />
              )}
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link to="/hire-employee" className="nav-link">Hire Employee</Link>
              <Link to="/companies" className="nav-link">Companies</Link>
              <Link to="/how-it-works" className="nav-link">How It Works</Link>
              <Link to="/blog" className="nav-link">Blog</Link>
              <Link to="/contact" className="nav-link">Contact</Link>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="gap-2">
                      <User className="h-5 w-5" />
                      <span className="hidden sm:inline">
                        {user.email ? (user.email.length > 20 ? user.email.substring(0, 17) + '...' : user.email) : ''}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuItem onClick={() => navigate('/dashboard')}>
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      Profile Settings
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={async () => {
                      await supabase.auth.signOut()
                      navigate('/')
                    }}>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <button 
                    className="px-4 py-2 text-text-secondary hover:text-text transition-colors"
                    onClick={() => navigate('/auth/signin')}
                  >
                    Login
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={() => navigate('/auth/signup')}
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>

            <button 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden pt-20">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <Link to="/hire-employee" className="nav-link" onClick={() => setIsMenuOpen(false)}>Hire Employee</Link>
              <Link to="/companies" className="nav-link" onClick={() => setIsMenuOpen(false)}>Companies</Link>
              <Link to="/how-it-works" className="nav-link" onClick={() => setIsMenuOpen(false)}>How It Works</Link>
              <Link to="/blog" className="nav-link" onClick={() => setIsMenuOpen(false)}>Blog</Link>
              <Link to="/contact" className="nav-link" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              {user ? (
                <>
                  <button 
                    className="text-left px-4 py-2 text-text-secondary hover:text-text transition-colors"
                    onClick={() => navigate('/dashboard')}
                  >
                    Dashboard
                  </button>
                  <button 
                    className="text-left px-4 py-2 text-text-secondary hover:text-text transition-colors"
                    onClick={() => navigate('/profile')}
                  >
                    Profile Settings
                  </button>
                  <button 
                    className="text-left px-4 py-2 text-text-secondary hover:text-text transition-colors"
                    onClick={async () => {
                      await supabase.auth.signOut()
                      navigate('/')
                      setIsMenuOpen(false)
                    }}
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <div className="pt-4 flex flex-col space-y-4">
                  <button 
                    className="px-4 py-2 text-text-secondary hover:text-text transition-colors"
                    onClick={() => {
                      setIsMenuOpen(false)
                      navigate('/auth/signin')
                    }}
                  >
                    Login
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={() => {
                      setIsMenuOpen(false)
                      navigate('/auth/signup')
                    }}
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <section className="relative min-h-[80vh] md:min-h-[70vh] flex items-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: backgroundUrl ? `url(${backgroundUrl})` : 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            backgroundSize: 'cover', // Changed to cover for better mobile display
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: 0.8
          }}
        />
        
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent z-1" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/90 via-white/50 to-white/90 z-1" />
        
        <div className="container mx-auto px-4 pt-20 md:pt-32 pb-12 md:pb-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className="text-3xl sm:text-4xl md:text-6xl font-bold mb-4 md:mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary px-2 md:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Modernizing Workforce Hiring <br className="hidden md:block" />for Companies
            </motion.h1>
            <motion.p 
              className="text-base sm:text-lg md:text-xl text-text-secondary mb-6 md:mb-8 max-w-3xl mx-auto px-4 md:px-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              PamirHub's expert team delivers engineering, IT, design, sales, and marketing solutions 
              remotely—efficient, cost-effective, and hassle-free.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-x-4 px-4 md:px-0"
            >
              <button className="btn-primary inline-flex items-center text-sm md:text-base">
                Hire Experts Today
                <ChevronRight className="ml-2 w-4 h-4 md:w-5 md:h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Expert Talent Categories</h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Access a diverse pool of skilled professionals across various domains
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                className="glass-card p-6 text-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
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
    </div>
  );
};

export default Index;
