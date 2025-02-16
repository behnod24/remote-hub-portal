
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Code2, MonitorPlay, PenTool, MessageSquare } from 'lucide-react';

type Sector = 'engineering' | 'software_development' | 'design' | 'sales_marketing';

interface SectorInfo {
  id: Sector;
  icon: any;
  label: string;
  description: string;
}

const sectors: SectorInfo[] = [
  {
    id: 'engineering',
    icon: Code2,
    label: 'Engineering',
    description: 'Find top engineering talent across various disciplines'
  },
  {
    id: 'software_development',
    icon: MonitorPlay,
    label: 'Software Development',
    description: 'Connect with skilled software developers and architects'
  },
  {
    id: 'design',
    icon: PenTool,
    label: 'Design',
    description: 'Discover creative designers for your projects'
  },
  {
    id: 'sales_marketing',
    icon: MessageSquare,
    label: 'Sales & Marketing',
    description: 'Hire experts in sales, marketing, and growth'
  }
];

export default function TalentSearch() {
  const [selectedSector, setSelectedSector] = useState<Sector | null>(null);

  // Fetch talent counts by sector
  const { data: talentCounts, isLoading } = useQuery({
    queryKey: ['talent-counts'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('talent_profiles')
        .select('sector')
        .eq('availability_status', true);

      if (error) throw error;

      const counts: Record<Sector, number> = {
        engineering: 0,
        software_development: 0,
        design: 0,
        sales_marketing: 0
      };

      data?.forEach(profile => {
        if (profile.sector) {
          counts[profile.sector as Sector]++;
        }
      });

      return counts;
    }
  });

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Find Top Talent</h2>
        <p className="text-white/80">Browse experts by sector and connect with the perfect match for your needs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sectors.map((sector) => (
          <motion.div
            key={sector.id}
            className={`
              p-6 rounded-lg border cursor-pointer transition-all
              ${selectedSector === sector.id 
                ? 'border-primary bg-primary/10' 
                : 'border-white/10 hover:border-white/20 bg-white/5'
              }
            `}
            onClick={() => setSelectedSector(sector.id)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-full bg-primary/20">
                  <sector.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">{sector.label}</h3>
                  <p className="text-white/60 text-sm mt-1">{sector.description}</p>
                </div>
              </div>
              <div className="text-primary font-bold">
                {isLoading ? '...' : talentCounts?.[sector.id] || 0}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedSector && (
        <div className="mt-8">
          <Button className="bg-primary text-white hover:bg-primary/90">
            View {sectors.find(s => s.id === selectedSector)?.label} Experts
          </Button>
        </div>
      )}
    </div>
  );
}
