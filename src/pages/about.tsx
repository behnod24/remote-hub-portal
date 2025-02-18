
import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import ContentLayout from "@/components/layout/ContentLayout";

interface TeamMember {
  name: string;
  role: string;
  background: string;
  image: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Sarah Chen",
    role: "Chief Technology Officer",
    background: "Former tech lead at Google, Microsoft, and Amazon.",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-1.jpg"
  },
  {
    name: "Michael Torres",
    role: "Head of Product",
    background: "Product design team at Apple, Meta, and Twitter.",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg"
  },
  {
    name: "Emma Williams",
    role: "Engineering Director",
    background: "Lead engineering teams at Netflix, Slack, and Dropbox.",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg"
  },
  {
    name: "David Kim",
    role: "Founder & CEO",
    background: "Former co-founder of TechStart. Early staff at Spotify.",
    image: "https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
  }
];

export default function AboutPage() {
  const [emblaRef] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 640px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 4 }
    }
  });

  return (
    <ContentLayout 
      title="About Us"
      breadcrumbs={[{ label: "About Us" }]}
    >
      <div className="relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 opacity-70" />
        </div>

        {/* Hero Section */}
        <section className="relative z-10 pt-8 pb-16">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600">
              We are the people who make up PamirHub
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
              Our philosophy is simple; hire great people and give them the resources and support to do their best work.
            </p>
          </div>
        </section>

        {/* Team Section with Carousel */}
        <section className="relative z-10 py-16">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {teamMembers.map((member, index) => (
                <div key={index} className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_25%] px-4">
                  <div className="text-center bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-xl shadow-lg transform hover:-translate-y-1 transition-transform duration-300">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-32 h-32 sm:w-48 sm:h-48 rounded-lg mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-red-600">{member.role}</p>
                    <p className="text-sm text-gray-500 mt-2">{member.background}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Careers Section */}
        <section className="relative z-10 py-16 sm:py-20">
          <div className="text-center">
            <div className="inline-block animate-spin mb-8">
              <div className="w-8 h-8 border-4 border-red-600 border-t-transparent rounded-full" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-rose-600">
              We're looking for talented people
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              PamirHub is growing fast, and we are always looking for passionate, dynamic, and talented individuals to join our distributed team all around the world.
            </p>
            <button className="px-6 sm:px-8 py-3 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg hover:opacity-90 text-base sm:text-lg transition-all duration-300 hover:shadow-lg">
              View Open Positions
            </button>
          </div>
        </section>

        {/* Footer Note */}
        <div className="relative z-10 text-center py-8 text-gray-500 text-sm">
          © {new Date().getFullYear()} PamirHub. All rights reserved.
        </div>
      </div>
    </ContentLayout>
  );
}
