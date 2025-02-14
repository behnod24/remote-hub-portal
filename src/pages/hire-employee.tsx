
import React from 'react';
import FormLayout from "@/components/layout/FormLayout";

export default function HireEmployeePage() {
  return (
    <FormLayout 
      title="Post a Job"
      currentStep={1}
      totalSteps={3}
    >
      <div className="space-y-8">
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold mb-4">Coming Soon</h2>
          <p className="text-text-secondary">
            The job posting functionality is under development. Check back soon!
          </p>
        </div>
      </div>
    </FormLayout>
  );
}
