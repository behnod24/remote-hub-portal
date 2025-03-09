
import { Link } from "react-router-dom";
import { Twitter, Linkedin, Instagram, Facebook, Youtube, Mail, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link to="/front-pages/landing-page" className="flex items-center text-2xl font-bold text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              </svg>
              PamirHub
            </Link>
            <p className="text-gray-400">
              Most Powerful & Comprehensive comprehensive digital and engineering services delivered remotely by our professional teams.
            </p>

            <div className="space-y-4">
              <p className="text-gray-300">Subscribe to newsletter</p>
              <div className="flex">
                <Input 
                  type="email" 
                  placeholder="Your email" 
                  className="bg-gray-800 border-gray-700 text-white mr-2" 
                />
                <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>

          {/* Digital Services Links */}
          <div className="lg:ml-auto">
            <h4 className="text-lg font-semibold mb-6">Digital Services</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/services/software-development" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Web & Software Development
                </Link>
              </li>
              <li>
                <Link to="/services/design" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Design & Creative Services
                </Link>
              </li>
              <li>
                <Link to="/services/marketing" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Sales & Marketing
                </Link>
              </li>
              <li>
                <Link to="/services/social-media" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Social Media Management
                </Link>
              </li>
            </ul>
          </div>

          {/* Engineering Services Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Engineering Services</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/services/mechanical-engineering" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Mechanical Engineering
                </Link>
              </li>
              <li>
                <Link to="/services/electrical-engineering" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Electrical Engineering
                </Link>
              </li>
              <li>
                <Link to="/services/product-design" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Product Design
                </Link>
              </li>
              <li>
                <Link to="/services/civil-engineering" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Civil Engineering & Architecture
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/front-pages/landing-page" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/front-pages/landing-page#about" className="text-gray-400 hover:text-white transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/front-pages/landing-page#how-it-works" className="text-gray-400 hover:text-white transition-colors duration-300">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/front-pages/landing-page#contact" className="text-gray-400 hover:text-white transition-colors duration-300">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm order-2 md:order-1">
              © 2025 PamirHub. All rights reserved.
            </p>
            <div className="flex space-x-4 mb-4 md:mb-0 order-1 md:order-2">
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="YouTube">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Back to top and Buy Now buttons */}
      <div className="fixed bottom-6 right-6 z-10 flex flex-col space-y-2">
        <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md shadow-lg">
          Contact Us
        </button>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="bg-indigo-600 hover:bg-indigo-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
