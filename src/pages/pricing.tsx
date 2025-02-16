
import React from 'react';
import ContentLayout from "@/components/layout/ContentLayout";

export default function PricingPage() {
  return (
    <ContentLayout 
      title="Pricing"
      breadcrumbs={[{ label: "Pricing" }]}
    >
      <div className="space-y-8">
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-text-secondary">
            Our pricing page is under development. Check back soon!
          </p>
        </div>
      </div>
    </ContentLayout>
  );
}
