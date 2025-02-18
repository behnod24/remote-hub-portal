"use client";

import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
interface FormLayoutProps {
  children: ReactNode;
  title: ReactNode;
  currentStep?: number;
  totalSteps?: number;
  onNext?: () => void;
  onPrev?: () => void;
  isLastStep?: boolean;
}
const FormLayout = ({
  children,
  title,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  isLastStep
}: FormLayoutProps) => {
  return <div className="min-h-screen">
      <div className="my-[3px] py-0">
        <div className="">
          <div className="flex items-center justify-between">
            {title}
          </div>
          {totalSteps && <div className="mt-4 flex items-center gap-2 my-[14px]">
              <div className="flex-1 h-2 bg-secondary/30 rounded-full overflow-hidden">
                <div className="h-full bg-[#EA2831] transition-all duration-300" style={{
              width: `${currentStep! / totalSteps * 100}%`
            }} />
              </div>
              <span className="text-sm text-text-secondary">
                Step {currentStep} of {totalSteps}
              </span>
            </div>}
        </div>
      </div>
      <div className="container py-0">
        <div className="max-w-2xl mx-auto">
          {children}
          
          {(onNext || onPrev) && <div className="mt-8 flex justify-between">
              {onPrev && <Button variant="outline" onClick={onPrev} className="rounded-full px-6">
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous Step
                </Button>}
              {onNext && <Button className="ml-auto rounded-full px-6 bg-[#EA2831] text-white hover:bg-[#D62429]" onClick={onNext}>
                  {isLastStep ? "Submit" : "Next Step"}
                  {!isLastStep && <ChevronRight className="ml-2 h-4 w-4" />}
                </Button>}
            </div>}
        </div>
      </div>
    </div>;
};
export default FormLayout;