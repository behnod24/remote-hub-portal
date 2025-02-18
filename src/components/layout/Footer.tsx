
import { Link } from "react-router-dom";
import { Twitter, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return <footer className="backdrop-blur-sm text-white py-16 bg-red-600">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent">
              PamirHub
            </h3>
            <p className="max-w-sm text-white/90">
              Connecting global talent with innovative companies through our comprehensive remote workforce solutions.
            </p>
            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              <a href="#" className="p-2 bg-red-700/50 rounded-lg hover:bg-red-500/50 transition-colors duration-300" aria-label="Twitter">
                <Twitter className="h-5 w-5 text-white hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-red-700/50 rounded-lg hover:bg-red-500/50 transition-colors duration-300" aria-label="LinkedIn">
                <Linkedin className="h-5 w-5 text-white hover:text-white" />
              </a>
              <a href="#" className="p-2 bg-red-700/50 rounded-lg hover:bg-red-500/50 transition-colors duration-300" aria-label="Instagram">
                <Instagram className="h-5 w-5 text-white hover:text-white" />
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-white/80 hover:text-white transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/careers" className="text-white/80 hover:text-white transition-colors duration-300">
                  Careers
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-white/80 hover:text-white transition-colors duration-300">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Resources</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/help" className="text-white/80 hover:text-white transition-colors duration-300">
                  Help Center
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-white/80 hover:text-white transition-colors duration-300">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-white/80 hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6 text-white">Contact</h4>
            <ul className="space-y-4">
              <li className="text-white/80">
                <strong className="text-white">Email:</strong>
                <br />
                <a href="mailto:contact@pamirhub.com" className="hover:text-white transition-colors duration-300">
                  contact@pamirhub.com
                </a>
              </li>
              <li className="text-white/80">
                <strong className="text-white">Address:</strong>
                <br />
                123 Innovation Street
                <br />
                Tech Valley, CA 94043
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/80 text-sm">
              &copy; {new Date().getFullYear()} PamirHub. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <Link to="/terms" className="text-white/80 hover:text-white text-sm transition-colors duration-300">
                Terms
              </Link>
              <Link to="/privacy" className="text-white/80 hover:text-white text-sm transition-colors duration-300">
                Privacy
              </Link>
              <Link to="/cookies" className="text-white/80 hover:text-white text-sm transition-colors duration-300">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>;
};

export default Footer;
