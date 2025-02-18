
import { ReactNode } from "react"
import { Button } from "../ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"

interface FormLayoutProps {
  children: ReactNode
  title: ReactNode
  currentStep: number
  totalSteps: number
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
    <div className="min-h-screen flex flex-col px-4 sm:px-6 lg:px-8 py-12">
      <div className="mx-auto w-full max-w-4xl space-y-8">
        <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
          {title}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            Step {currentStep} of {totalSteps}
          </div>
        </div>

        <div className="bg-white/80 backdrop-blur-sm shadow-sm rounded-xl p-6 sm:p-8">
          {children}
        </div>

        {(onNext || onPrev) && (
          <div className="flex justify-between mt-8 gap-4">
            {onPrev ? (
              <Button
                onClick={onPrev}
                variant="outline"
                className="flex items-center gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Previous
              </Button>
            ) : (
              <div />
            )}
            {onNext && !isLastStep && (
              <Button
                onClick={onNext}
                className="flex items-center gap-2 bg-[#EA2831] hover:bg-[#D62429]"
              >
                Next
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default FormLayout
