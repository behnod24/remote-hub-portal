
"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/hooks/use-toast"
import { ArrowLeft, Moon, Sun } from "lucide-react"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import FormLayout from "@/components/layout/FormLayout"

interface ContactFormData {
  first_name: string
  last_name: string
  email: string
  phone: string
  team_size: string
  location: string
  message: string
  accepts_privacy: boolean
  accepts_marketing: boolean
}

interface FormErrors extends Partial<Record<keyof ContactFormData, string>> {}

const STORAGE_KEY = 'contact_form_data'
const STEPS = ['Basic Info', 'Company Details', 'Message']

function ContactForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  const [currentStep, setCurrentStep] = useState(1)
  const [darkMode, setDarkMode] = useState(false)
  
  const [formData, setFormData] = useState<ContactFormData>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    team_size: "",
    location: "",
    message: "",
    accepts_privacy: false,
    accepts_marketing: false
  })

  // Load saved form data and detect system theme preference
  useEffect(() => {
    // Load saved form data
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      setFormData(JSON.parse(savedData))
    }

    // Detect system theme preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true)
    }

    // Listen for theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      setDarkMode(e.matches)
    })
  }, [])

  // Save form data when it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData))
  }, [formData])

  // AI suggestions for company size based on location
  const suggestCompanySize = async () => {
    if (formData.location && !formData.team_size) {
      try {
        const { data, error } = await supabase.functions.invoke('suggest-company-size', {
          body: { location: formData.location }
        })
        
        if (!error && data.suggestion) {
          setFormData(prev => ({ ...prev, team_size: data.suggestion }))
          toast({
            title: "AI Suggestion",
            description: `Based on your location, we suggest: ${data.suggestion}`,
          })
        }
      } catch (error) {
        console.error('Error getting AI suggestion:', error)
      }
    }
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}
    
    if (!formData.first_name) newErrors.first_name = "First name is required"
    if (!formData.last_name) newErrors.last_name = "Last name is required"
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address"
    }
    if (!formData.phone) newErrors.phone = "Phone number is required"
    if (!formData.message) newErrors.message = "Message is required"
    if (!formData.accepts_privacy) newErrors.accepts_privacy = "You must accept the privacy policy"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check all required fields and try again.",
        variant: "destructive"
      })
      return
    }

    setLoading(true)

    try {
      // First save to database
      const { error: dbError } = await supabase
        .from('contact_submissions')
        .insert([{
          first_name: formData.first_name,
          last_name: formData.last_name,
          email: formData.email,
          phone: formData.phone,
          team_size: formData.team_size,
          location: formData.location,
          message: formData.message,
          accepts_privacy: formData.accepts_privacy,
          accepts_marketing: formData.accepts_marketing
        }])

      if (dbError) throw dbError

      // Then send emails
      const { error: emailError } = await supabase.functions.invoke('send-contact-email', {
        body: { ...formData }
      })

      if (emailError) throw emailError

      // Show success toast with responsive styling
      toast({
        title: "Message Sent Successfully",
        description: (
          <div className="mt-2 flex flex-col gap-2">
            <p className="text-green-600 dark:text-green-400">
              Thank you for contacting us, {formData.first_name}!
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We'll get back to you within 24 hours at {formData.email}
            </p>
          </div>
        ),
        className: "w-full md:max-w-md",
        duration: 5000,
      })

      // Clear saved form data
      localStorage.removeItem(STORAGE_KEY)

      // Reset form
      setFormData({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        team_size: "",
        location: "",
        message: "",
        accepts_privacy: false,
        accepts_marketing: false
      })
      
      setCurrentStep(1)
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "Error Sending Message",
        description: (
          <div className="mt-2 flex flex-col gap-2">
            <p className="text-red-600 dark:text-red-400">
              Something went wrong while sending your message.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please try again or contact support if the problem persists.
            </p>
          </div>
        ),
        variant: "destructive",
        className: "w-full md:max-w-md",
      })
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            {/* Basic Info Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <p className="text-base font-medium leading-normal pb-2">
                  First name *
                  {errors.first_name && <span className="text-red-500 text-sm ml-1">{errors.first_name}</span>}
                </p>
                <Input
                  placeholder="First name"
                  value={formData.first_name}
                  onChange={e => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                  className="rounded-xl h-14 border-[#E0E0E0] bg-[#FFFFFF]"
                />
              </label>
              <label className="flex flex-col">
                <p className="text-base font-medium leading-normal pb-2">
                  Last name *
                  {errors.last_name && <span className="text-red-500 text-sm ml-1">{errors.last_name}</span>}
                </p>
                <Input
                  placeholder="Last name"
                  value={formData.last_name}
                  onChange={e => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                  className="rounded-xl h-14 border-[#E0E0E0] bg-[#FFFFFF]"
                />
              </label>
            </div>

            <label className="flex flex-col">
              <p className="text-base font-medium leading-normal pb-2">
                Email *
                {errors.email && <span className="text-red-500 text-sm ml-1">{errors.email}</span>}
              </p>
              <Input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="rounded-xl h-14 border-[#E0E0E0] bg-[#FFFFFF]"
              />
            </label>

            <label className="flex flex-col">
              <p className="text-base font-medium leading-normal pb-2">
                Phone *
                {errors.phone && <span className="text-red-500 text-sm ml-1">{errors.phone}</span>}
              </p>
              <PhoneInput
                country={'us'}
                value={formData.phone}
                onChange={phone => setFormData(prev => ({ ...prev, phone }))}
                containerClass="!w-full"
                inputClass="!w-full !h-14 !rounded-xl !border-[#E0E0E0] !bg-[#FFFFFF]"
                buttonClass="!border-[#E0E0E0] !rounded-l-xl"
              />
            </label>
          </div>
        )

      case 2:
        return (
          <div className="space-y-6">
            {/* Company Details Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <p className="text-base font-medium leading-normal pb-2">Company size</p>
                <Input
                  placeholder="1-50 people"
                  value={formData.team_size}
                  onChange={e => setFormData(prev => ({ ...prev, team_size: e.target.value }))}
                  className="rounded-xl h-14 border-[#E0E0E0] bg-[#FFFFFF]"
                />
              </label>
              <label className="flex flex-col">
                <p className="text-base font-medium leading-normal pb-2">Location</p>
                <Input
                  placeholder="New Zealand"
                  value={formData.location}
                  onChange={e => {
                    setFormData(prev => ({ ...prev, location: e.target.value }))
                    suggestCompanySize()
                  }}
                  className="rounded-xl h-14 border-[#E0E0E0] bg-[#FFFFFF]"
                />
              </label>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            {/* Message and Terms Fields */}
            <label className="flex flex-col">
              <p className="text-base font-medium leading-normal pb-2">
                Message *
                {errors.message && <span className="text-red-500 text-sm ml-1">{errors.message}</span>}
              </p>
              <Textarea
                placeholder="Leave us a message..."
                value={formData.message}
                onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="rounded-xl min-h-36 border-[#E0E0E0] bg-[#FFFFFF]"
              />
            </label>

            <div className="space-y-4">
              <label className="flex gap-x-3 py-3 items-start">
                <input
                  type="checkbox"
                  checked={formData.accepts_privacy}
                  onChange={e => setFormData(prev => ({ ...prev, accepts_privacy: e.target.checked }))}
                  className="mt-1 h-5 w-5 rounded border-2 bg-transparent text-[#EA2831] checked:bg-[#EA2831] checked:border-[#EA2831] focus:ring-0 focus:ring-offset-0 border-[#E0E0E0]"
                />
                <div className="flex flex-col">
                  <p className="text-base font-normal leading-normal">
                    I agree to the processing of personal data according to the Privacy Policy *
                  </p>
                  {errors.accepts_privacy && (
                    <span className="text-red-500 text-sm">{errors.accepts_privacy}</span>
                  )}
                </div>
              </label>
              <label className="flex gap-x-3 py-3 items-start">
                <input
                  type="checkbox"
                  checked={formData.accepts_marketing}
                  onChange={e => setFormData(prev => ({ ...prev, accepts_marketing: e.target.checked }))}
                  className="mt-1 h-5 w-5 rounded border-2 bg-transparent text-[#EA2831] checked:bg-[#EA2831] checked:border-[#EA2831] focus:ring-0 focus:ring-offset-0 border-[#E0E0E0]"
                />
                <p className="text-base font-normal leading-normal">
                  I would like to receive news and updates via email
                </p>
              </label>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <FormLayout
      title={
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div
                className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                style={{backgroundImage: 'url("/placeholder.svg")'}}
              />
              <h1 className="text-base font-medium leading-normal">PamirHub</h1>
            </div>
            <Link 
              to="/" 
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Site
            </Link>
          </div>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
          </button>
        </div>
      }
      currentStep={currentStep}
      totalSteps={STEPS.length}
      onNext={currentStep < STEPS.length ? handleNext : undefined}
      onPrev={currentStep > 1 ? handlePrev : undefined}
      isLastStep={currentStep === STEPS.length}
      nextButtonClassName="w-full sm:w-auto px-6 py-2 bg-[#EA2831] text-white rounded-full hover:bg-[#D62429] transition-colors"
      prevButtonClassName="w-full sm:w-auto px-6 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex w-full flex-col gap-3">
            <h2 className="text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">
              We'd love to help
            </h2>
            <p className="text-neutral-500 text-base font-normal leading-normal">
              Reach out and we'll get in touch within 24 hours.
            </p>
          </div>
        </div>

        {renderStepContent()}

        {currentStep === STEPS.length && (
          <div className="flex justify-center py-3">
            <button
              type="submit"
              disabled={loading}
              className="flex min-w-[84px] w-full max-w-[480px] items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-[#EA2831] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#D62429] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="truncate">{loading ? 'Sending...' : 'Send message'}</span>
            </button>
          </div>
        )}
      </form>
    </FormLayout>
  )
}

export default function ContactPage() {
  return <ContactForm />
}
