
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  CheckCircle, 
  Laptop, 
  Rocket, 
  Send, 
  User, 
  CheckCheck, 
  FileText, 
  Gem, 
  ArrowRight, 
  ChevronRight,
  Mail,
  Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Index = () => {
  const [email, setEmail] = useState("");

  // Company logos for testimonials section
  const companyLogos = [
    { name: "Airbnb", logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg" },
    { name: "Netflix", logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" },
    { name: "Pinterest", logo: "https://upload.wikimedia.org/wikipedia/commons/3/35/Pinterest_Logo.svg" },
    { name: "Dribbble", logo: "https://upload.wikimedia.org/wikipedia/commons/3/32/Dribbble_logo.svg" },
    { name: "Coinbase", logo: "https://upload.wikimedia.org/wikipedia/commons/1/17/Coinbase_logo.svg" }
  ];

  // Testimonials data
  const testimonials = [
    {
      company: "Pinterest",
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/35/Pinterest_Logo.svg",
      text: "I've never used a theme as versatile and flexible as PamirHub. It's my go to for building dashboard sites on almost any project.",
      rating: 5,
      author: {
        name: "Eugenia Moore",
        role: "Founder of Pinterest",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
      }
    },
    {
      company: "Netflix",
      logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
      text: "PamirHub is awesome, and I particularly enjoy knowing that if I get stuck on something, their support team is always there to help.",
      rating: 5,
      author: {
        name: "Tommy Haffman",
        role: "Founder of Netflix",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
      }
    },
    {
      company: "Airbnb",
      logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_B%C3%A9lo.svg",
      text: "This service is superior in so many ways. The quality, the design, the regular updates, the support... It's the whole package. Excellent work.",
      rating: 4,
      author: {
        name: "Eugenia Moore",
        role: "CTO of Airbnb",
        avatar: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
      }
    }
  ];

  // FAQ items
  const faqItems = [
    {
      question: "Do you charge for each upgrade?",
      answer: "No, all upgrades are included in your subscription."
    },
    {
      question: "What is regular license?",
      answer: "Regular license allows you to use the product for a single project."
    },
    {
      question: "What is extended license?",
      answer: "Extended license allows you to use the product for unlimited projects."
    },
    {
      question: "Which license is applicable for SASS application?",
      answer: "For SaaS applications, you should purchase the extended license."
    }
  ];

  // Team members
  const teamMembers = [
    {
      name: "Sophie Gilbert",
      role: "Project Manager",
      image: "/lovable-uploads/fd513458-1e4c-40cf-bee7-392447603295.png",
      bgColor: "bg-purple-100"
    },
    {
      name: "Paul Miles",
      role: "UI Designer",
      image: "/lovable-uploads/4a53fc79-394a-41b3-8b38-d68feb6d98c4.png",
      bgColor: "bg-cyan-100"
    },
    {
      name: "Nannie Ford",
      role: "Development Lead",
      image: "/lovable-uploads/baf990af-728b-4b2b-8bdd-df90951aa48f.png",
      bgColor: "bg-pink-100"
    },
    {
      name: "Chris Watkins",
      role: "Marketing Manager",
      image: "/lovable-uploads/8b096a07-779b-4c18-bb7d-0df00eaf107a.png",
      bgColor: "bg-green-100"
    }
  ];

  // Features
  const features = [
    {
      icon: <Laptop className="h-10 w-10 text-purple-500" />,
      title: "Quality Code",
      description: "Code structure that all developers will easily understand and fall in love with."
    },
    {
      icon: <Rocket className="h-10 w-10 text-purple-500" />,
      title: "Continuous Updates",
      description: "Free updates for the next 12 months, including new demos and features."
    },
    {
      icon: <CheckCheck className="h-10 w-10 text-purple-500" />,
      title: "Starter Kit",
      description: "Start your project quickly without having to remove unnecessary features."
    },
    {
      icon: <FileText className="h-10 w-10 text-purple-500" />,
      title: "API Ready",
      description: "Just change the endpoint and see your own data loaded within seconds."
    },
    {
      icon: <User className="h-10 w-10 text-purple-500" />,
      title: "Excellent Support",
      description: "An easy-to-follow doc with lots of references and code examples."
    },
    {
      icon: <FileText className="h-10 w-10 text-purple-500" />,
      title: "Well Documented",
      description: "An easy-to-follow doc with lots of references and code examples."
    }
  ];

  // Stats
  const stats = [
    {
      icon: <Laptop className="h-12 w-12 text-purple-500" />,
      value: "7.1k+",
      label: "Support Tickets Resolved"
    },
    {
      icon: <User className="h-12 w-12 text-green-500" />,
      value: "50k+",
      label: "Join creatives community"
    },
    {
      icon: <Gem className="h-12 w-12 text-blue-500" />,
      value: "4.8/5",
      label: "Highly Rated Products"
    },
    {
      icon: <CheckCircle className="h-12 w-12 text-orange-500" />,
      value: "100%",
      label: "Money Back Guarantee"
    }
  ];

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    // Add subscription logic here
    alert(`Subscribed with email: ${email}`);
    setEmail("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section - Main Banner */}
        <section className="relative py-20 bg-gradient-to-r from-purple-50 to-purple-100 overflow-hidden">
          <div className="container mx-auto px-6 pt-10 pb-16">
            <div className="flex flex-col lg:flex-row items-center">
              <div className="w-full lg:w-1/2 mb-12 lg:mb-0">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-center lg:text-left">
                  <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">All in one sass</span> application for your business
                </h1>
                <p className="text-gray-600 text-lg mb-8 text-center lg:text-left">
                  No coding required to make customizations. The live customizer has everything your marketing need.
                </p>
                <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
                  <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg">
                    Get Early Access
                  </Button>
                  <div className="flex items-center text-sm text-gray-600">
                    <span className="mr-2">Join community</span>
                    <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-purple-300"></div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-1/2 lg:pl-12">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="relative"
                >
                  <img
                    src="/lovable-uploads/89938f02-0c82-49db-ba99-db8f9de3133e.png"
                    alt="Dashboard preview"
                    className="w-full h-auto rounded-lg shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
                Useful Feature
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need</h2>
              <p className="text-xl text-gray-600">
                to start your next project
              </p>
              <p className="text-gray-500 mt-4">
                Not just a set of tools, the package includes ready-to-deploy conceptual application.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="p-6 border border-gray-100 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <div className="mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="border border-gray-100 rounded-xl p-8 text-center hover:shadow-md transition-shadow">
                  <div className="flex justify-center mb-4">
                    {stat.icon}
                  </div>
                  <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
                Real Customers Reviews
              </div>
              <h2 className="text-3xl font-bold mb-4">What people say</h2>
              <p className="text-gray-600">
                See what our customers have to say about their experience.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                  <img src={testimonial.logo} alt={testimonial.company} className="h-8 mb-6" />
                  <p className="text-gray-600 mb-6">{testimonial.text}</p>
                  <div className="flex text-yellow-400 mb-4">
                    {Array(5).fill(0).map((_, i) => (
                      <span key={i}>
                        {i < testimonial.rating ? "★" : "☆"}
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.author.avatar} 
                      alt={testimonial.author.name} 
                      className="w-12 h-12 rounded-full object-cover mr-4" 
                    />
                    <div>
                      <h4 className="font-bold">{testimonial.author.name}</h4>
                      <p className="text-gray-600 text-sm">{testimonial.author.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-12 space-x-2">
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-purple-100 transition-colors">
                <ArrowRight className="h-4 w-4 transform rotate-180" />
              </button>
              <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-purple-100 transition-colors">
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </section>

        {/* Company Logos */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-wrap justify-center items-center gap-12">
              {companyLogos.map((company, index) => (
                <img 
                  key={index} 
                  src={company.logo} 
                  alt={company.name} 
                  className="h-8 md:h-10 opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" 
                />
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
                Our Great Team
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Supported <span className="text-gray-600">by Real People</span>
              </h2>
              <p className="text-gray-600">
                Who is behind these great-looking interfaces?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="text-center">
                  <div className={`rounded-2xl overflow-hidden ${member.bgColor} mb-4`}>
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-auto object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="text-gray-500">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
                FAQ
              </div>
              <h2 className="text-3xl font-bold mb-4">
                Frequently asked <span className="text-purple-600">questions</span>
              </h2>
              <p className="text-gray-600">
                Browse through these FAQs to find answers to commonly asked questions.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="flex flex-col md:flex-row gap-8 md:gap-16">
                <div className="md:w-1/2">
                  <img 
                    src="/lovable-uploads/5b6b444b-f3c2-493b-82a9-467dc7bfc893.png" 
                    alt="Developer with programming languages" 
                    className="w-full h-auto"
                  />
                </div>
                <div className="md:w-1/2">
                  <div className="space-y-4">
                    {faqItems.map((item, index) => (
                      <div key={index} className="border-b border-gray-200 pb-4">
                        <button className="flex justify-between items-center w-full text-left focus:outline-none">
                          <h3 className="text-lg font-medium">{item.question}</h3>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-block px-3 py-1 bg-purple-100 text-purple-600 rounded-full text-sm font-medium mb-4">
                Contact Us
              </div>
              <h2 className="text-3xl font-bold mb-4">Let's work <span className="text-gray-600">together</span></h2>
              <p className="text-gray-600">
                Any question or remark? just write us a message
              </p>
            </div>

            <div className="flex flex-col md:flex-row gap-8 max-w-5xl mx-auto">
              <div className="md:w-1/2 bg-white p-6 rounded-xl relative">
                <div className="border-2 border-dashed border-purple-300 border-opacity-50 absolute -top-5 -left-5 w-full h-full rounded-xl"></div>
                <div className="relative">
                  <img 
                    src="/lovable-uploads/d0bba3d2-4a1e-4321-8ddb-a8b09a6df697.png" 
                    alt="Customer support representative" 
                    className="w-full h-auto rounded-lg"
                  />
                  <div className="mt-8">
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                        <Mail className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <p className="font-medium">example@gamil.com</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-4">
                        <Phone className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">+123 568 963</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:w-1/2 bg-white p-8 rounded-xl">
                <h3 className="text-xl font-bold mb-6">Send a message</h3>
                <p className="text-gray-600 mb-6">If you would like to discuss anything related to payment, account, licensing, partnerships, or have pre-sales questions, you're at the right place.</p>
                
                <form className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full name</label>
                      <Input id="fullName" className="w-full" placeholder="Your name" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email address</label>
                      <Input id="email" type="email" className="w-full" placeholder="Your email" />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <Textarea id="message" className="w-full min-h-[150px]" placeholder="Your message" />
                    </div>
                  </div>
                  <Button className="bg-purple-600 hover:bg-purple-700 w-full md:w-auto">
                    Send Inquiry
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Back to top button */}
        <div className="fixed bottom-6 right-6 z-10">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-purple-600 hover:bg-purple-700 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
