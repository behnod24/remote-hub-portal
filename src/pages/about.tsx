
import React, { useEffect, useRef } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ContentLayout from "@/components/layout/ContentLayout";

interface TeamMember {
  name: string;
  role: string;
  background: string;
  image: string;
}

const teamMembers: TeamMember[] = [{
  name: "Sarah Chen",
  role: "Chief Technology Officer",
  background: "Former tech lead at Google, Microsoft, and Amazon.",
  image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
}, {
  name: "Michael Torres",
  role: "Head of Product",
  background: "Product design team at Apple, Meta, and Twitter.",
  image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
}, {
  name: "Emma Williams",
  role: "Engineering Director",
  background: "Lead engineering teams at Netflix, Slack, and Dropbox.",
  image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
}, {
  name: "David Kim",
  role: "Founder & CEO",
  background: "Former co-founder of TechStart. Early staff at Spotify.",
  image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
}];

export default function AboutPage() {
  const [emblaRef] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
    draggable: true,
    speed: 20,
    startIndex: 0,
    direction: 'ltr',
    dragFree: true,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 },
      '(min-width: 1280px)': { slidesToScroll: 4 }
    }
  });

  const autoplayRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const startAutoplay = () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }

      autoplayRef.current = setInterval(() => {
        const emblaNode = emblaRef.current;
        if (emblaNode) {
          const api = emblaNode.emblaApi;
          if (api) {
            api.scrollNext();
          }
        }
      }, 3000); // Scroll every 3 seconds
    };

    startAutoplay();

    return () => {
      if (autoplayRef.current) {
        clearInterval(autoplayRef.current);
      }
    };
  }, [emblaRef]);

  return (
    <ContentLayout 
      title="About Us" 
      breadcrumbs={[{ label: "About Us" }]}
    >
      <div className="relative min-h-screen w-full">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 opacity-70" />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 px-4 sm:px-6 lg:px-8 pt-8 pb-12 sm:pt-12 sm:pb-16">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600 tracking-tight">
              We are the people who make up PamirHub
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-4">
              Our philosophy is simple; hire great people and give them the resources and support to do their best work.
            </p>
          </div>
        </section>

        {/* Team Section with Carousel */}
        <section className="relative z-10 py-12 sm:py-16">
          <div className="overflow-hidden px-4 sm:px-6 lg:px-8" ref={emblaRef}>
            <div className="flex -mx-4">
              {teamMembers.map((member, index) => (
                <div 
                  key={index} 
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] xl:flex-[0_0_25%] px-4 animate-slide-in-right"
                  style={{
                    animation: `slide-in-right 0.5s ease-out ${index * 0.1}s`,
                    opacity: 0,
                    animationFillMode: 'forwards'
                  }}
                >
                  <div className="h-full text-center bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <div className="aspect-square w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 mx-auto mb-4 overflow-hidden rounded-lg">
                      <img 
                        src={member.image} 
                        alt={member.name} 
                        className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold line-clamp-1">{member.name}</h3>
                    <p className="text-red-600 text-sm sm:text-base mt-1">{member.role}</p>
                    <p className="text-xs sm:text-sm text-gray-500 mt-2 line-clamp-2">{member.background}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Careers Section */}
        <section className="relative z-10 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block animate-spin mb-6 sm:mb-8">
              <div className="w-6 h-6 sm:w-8 sm:h-8 border-4 border-red-600 border-t-transparent rounded-full" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600">
              We're looking for talented people
            </h2>
            <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-6 sm:mb-8 px-4">
              PamirHub is growing fast, and we are always looking for passionate, dynamic, and talented individuals to join our distributed team all around the world.
            </p>
            <button className="w-full sm:w-auto px-6 sm:px-8 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:opacity-90 text-base sm:text-lg transition-all duration-300 hover:shadow-lg">
              View Open Positions
            </button>
          </div>
        </section>
      </div>
    </ContentLayout>
  );
}
