
import { useState } from 'react';
import { motion } from "framer-motion";
import { Code2, MonitorPlay, PenTool, MessageSquare } from "lucide-react";
import ContentLayout from "@/components/layout/ContentLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function SectorsPage() {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);

  const sectors = [
    {
      id: 'engineering',
      icon: Code2,
      title: "Engineering",
      expertCount: "60+",
      description: "Access top-tier engineering talent across multiple disciplines, from mechanical to electrical engineering.",
      skills: ["Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Systems Engineering"]
    },
    {
      id: 'software',
      icon: MonitorPlay,
      title: "Software Development",
      expertCount: "85+",
      description: "Connect with skilled software developers proficient in various programming languages and frameworks.",
      skills: ["Full-Stack Development", "Mobile Development", "Cloud Architecture", "DevOps"]
    },
    {
      id: 'design',
      icon: PenTool,
      title: "Design",
      expertCount: "150+",
      description: "Find creative designers who excel in UX/UI, graphic design, and product design.",
      skills: ["UI/UX Design", "Graphic Design", "Product Design", "Brand Design"]
    },
    {
      id: 'marketing',
      icon: MessageSquare,
      title: "Sales & Marketing",
      expertCount: "130+",
      description: "Discover marketing experts who can drive growth and enhance your brand presence.",
      skills: ["Digital Marketing", "Content Strategy", "Social Media", "Sales Strategy"]
    }
  ];

  return (
    <ContentLayout 
      title="Explore Our Sectors"
      breadcrumbs={[{ label: "Sectors" }]}
    >
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center space-y-6 pb-12 border-b">
          <h1 className="text-4xl md:text-5xl font-bold text-primary">
            Find Expert Talent Across Key Sectors
          </h1>
          <p className="text-lg text-text-secondary max-w-3xl mx-auto">
            Access our diverse pool of pre-vetted professionals across engineering, software development, 
            design, and marketing sectors.
          </p>
        </section>

        {/* Sectors Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {sectors.map((sector) => (
            <motion.div
              key={sector.id}
              className="glass-card overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <sector.icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold">{sector.title}</h3>
                      <p className="text-sm text-text-secondary">{sector.expertCount} Experts Available</p>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-sm">
                    {sector.expertCount}
                  </Badge>
                </div>

                <p className="text-text-secondary">
                  {sector.description}
                </p>

                <div className="space-y-3">
                  <h4 className="font-semibold">Popular Skills:</h4>
                  <div className="flex flex-wrap gap-2">
                    {sector.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button 
                  className="w-full mt-4"
                  onClick={() => setSelectedSector(sector.id)}
                >
                  View {sector.title} Experts
                </Button>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 border-t">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-2xl font-bold">Ready to Find Your Next Expert?</h2>
            <p className="text-text-secondary">
              Connect with our team to discuss your specific needs and find the perfect expert for your project.
            </p>
            <Button size="lg">
              Contact Us Today
            </Button>
          </div>
        </section>
      </div>
    </ContentLayout>
  );
}
