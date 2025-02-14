
"use client"

import { ReactNode } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface FormLayoutProps {
  children: ReactNode
  title: string
  currentStep?: number
  totalSteps?: number
  onNext?: () => void
  onPrev?: () => void
  isLastStep?: boolean
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
  return (
    <div className="min-h-screen">
      <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container py-4">
          <h1 className="text-3xl font-bold">{title}</h1>
          {totalSteps && (
            <div className="mt-4 flex items-center gap-2">
              <div className="flex-1 h-2 bg-secondary/30 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${(currentStep! / totalSteps) * 100}%` }}
                />
              </div>
              <span className="text-sm text-text-secondary">
                Step {currentStep} of {totalSteps}
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="container py-8">
        <div className="max-w-2xl mx-auto">
          {children}
          
          {(onNext || onPrev) && (
            <div className="mt-8 flex justify-between">
              {onPrev && (
                <Button variant="outline" onClick={onPrev}>
                  <ChevronLeft className="mr-2 h-4 w-4" />
                  Previous Step
                </Button>
              )}
              {onNext && (
                <Button className="ml-auto" onClick={onNext}>
                  {isLastStep ? "Submit" : "Next Step"}
                  {!isLastStep && <ChevronRight className="ml-2 h-4 w-4" />}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default FormLayout
