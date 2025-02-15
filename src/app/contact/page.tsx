"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Moon, Sun } from "lucide-react"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { Progress } from "@/components/ui/progress"

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
  const [currentStep, setCurrentStep] = useState(0)
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
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    if (currentStep > 0) {
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

      toast({
        title: "Success",
        description: "Your message has been sent. We'll get back to you within 24 hours.",
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
      
      setCurrentStep(0)
    } catch (error) {
      console.error('Error submitting form:', error)
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`relative flex min-h-screen flex-col ${darkMode ? 'bg-gray-900 text-white' : 'bg-[#FFFFFF]'}`}>
      <div className="flex h-full grow flex-col">
        {/* Theme toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
        >
          {darkMode ? <Sun className="h-6 w-6" /> : <Moon className="h-6 w-6" />}
        </button>

        {/* Progress bar */}
        <div className="w-full px-4 py-2">
          <div className="max-w-[960px] mx-auto">
            <div className="flex justify-between mb-2">
              {STEPS.map((step, index) => (
                <span
                  key={step}
                  className={`text-sm ${index === currentStep ? 'font-bold' : ''} ${
                    darkMode ? 'text-white' : 'text-black'
                  }`}
                >
                  {step}
                </span>
              ))}
            </div>
            <Progress value={(currentStep + 1) * (100 / STEPS.length)} className="w-full" />
          </div>
        </div>

        <div className="gap-4 md:gap-6 px-4 md:px-6 flex flex-1 flex-col md:flex-row justify-center py-5">
          {/* Left sidebar - company info */}
          <div className="md:w-80 w-full md:max-w-[320px]">
            <div className={`flex h-full min-h-0 md:min-h-[700px] flex-col justify-between p-4 ${
              darkMode ? 'bg-gray-800' : 'bg-[#FFFFFF]'
            }`}>
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                    style={{backgroundImage: 'url("/placeholder.svg")'}}
                  />
                  <h1 className={`text-base font-medium leading-normal ${
                    darkMode ? 'text-white' : 'text-black'
                  }`}>PamirHub</h1>
                </div>
                <div className="flex flex-col gap-2">
                  <Link 
                    to="/" 
                    className={`flex items-center gap-3 px-3 py-2 rounded-full transition-colors ${
                      darkMode 
                        ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                        : 'bg-[#EEEEEE] hover:bg-[#E0E0E0] text-black'
                    }`}
                  >
                    <ArrowLeft className="h-6 w-6" />
                    <p className="text-sm font-medium leading-normal">Back to site</p>
                  </Link>
                </div>
              </div>
              
              {/* ... keep existing code (social media links) */}
            </div>
          </div>

          {/* Main form content */}
          <div className="flex-1 max-w-[960px] w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <div className="flex w-full flex-col gap-3">
                  <h2 className={`text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em] ${
                    darkMode ? 'text-white' : 'text-black'
                  }`}>We'd love to help</h2>
                  <p className={`text-base font-normal leading-normal ${
                    darkMode ? 'text-gray-300' : 'text-neutral-500'
                  }`}>Reach out and we'll get in touch within 24 hours.</p>
                </div>
              </div>

              {/* Multi-step form content */}
              <div className="space-y-6 px-4">
                {currentStep === 0 && (
                  <div className="space-y-6">
                    {/* Basic Info Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="flex flex-col">
                        <p className={`text-base font-medium leading-normal pb-2 ${
                          darkMode ? 'text-white' : 'text-black'
                        }`}>
                          First name *
                          {errors.first_name && <span className="text-red-500 text-sm ml-1">{errors.first_name}</span>}
                        </p>
                        <Input
                          placeholder="First name"
                          value={formData.first_name}
                          onChange={e => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                          className={`rounded-xl h-14 ${
                            darkMode 
                              ? 'bg-gray-800 border-gray-700 text-white' 
                              : 'border-[#E0E0E0] bg-[#FFFFFF]'
                          }`}
                        />
                      </label>
                      <label className="flex flex-col">
                        <p className={`text-base font-medium leading-normal pb-2 ${
                          darkMode ? 'text-white' : 'text-black'
                        }`}>
                          Last name *
                          {errors.last_name && <span className="text-red-500 text-sm ml-1">{errors.last_name}</span>}
                        </p>
                        <Input
                          placeholder="Last name"
                          value={formData.last_name}
                          onChange={e => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                          className={`rounded-xl h-14 ${
                            darkMode 
                              ? 'bg-gray-800 border-gray-700 text-white' 
                              : 'border-[#E0E0E0] bg-[#FFFFFF]'
                          }`}
                        />
                      </label>
                    </div>

                    <label className="flex flex-col">
                      <p className={`text-base font-medium leading-normal pb-2 ${
                        darkMode ? 'text-white' : 'text-black'
                      }`}>
                        Email *
                        {errors.email && <span className="text-red-500 text-sm ml-1">{errors.email}</span>}
                      </p>
                      <Input
                        type="email"
                        placeholder="Email address"
                        value={formData.email}
                        onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className={`rounded-xl h-14 ${
                          darkMode 
                            ? 'bg-gray-800 border-gray-700 text-white' 
                            : 'border-[#E0E0E0] bg-[#FFFFFF]'
                        }`}
                      />
                    </label>

                    <label className="flex flex-col">
                      <p className={`text-base font-medium leading-normal pb-2 ${
                        darkMode ? 'text-white' : 'text-black'
                      }`}>
                        Phone *
                        {errors.phone && <span className="text-red-500 text-sm ml-1">{errors.phone}</span>}
                      </p>
                      <PhoneInput
                        country={'us'}
                        value={formData.phone}
                        onChange={phone => setFormData(prev => ({ ...prev, phone }))}
                        containerClass="!w-full"
                        inputClass={`!w-full !h-14 !rounded-xl ${
                          darkMode 
                            ? '!bg-gray-800 !border-gray-700 !text-white' 
                            : '!border-[#E0E0E0] !bg-[#FFFFFF]'
                        }`}
                        buttonClass={`!border-[#E0E0E0] !rounded-l-xl ${
                          darkMode ? '!bg-gray-700' : ''
                        }`}
                      />
                    </label>
                  </div>
                )}

                {currentStep === 1 && (
                  <div className="space-y-6">
                    {/* Company Details Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="flex flex-col">
                        <p className={`text-base font-medium leading-normal pb-2 ${
                          darkMode ? 'text-white' : 'text-black'
                        }`}>Company size</p>
                        <Input
                          placeholder="1-50 people"
                          value={formData.team_size}
                          onChange={e => setFormData(prev => ({ ...prev, team_size: e.target.value }))}
                          className={`rounded-xl h-14 ${
                            darkMode 
                              ? 'bg-gray-800 border-gray-700 text-white' 
                              : 'border-[#E0E0E0] bg-[#FFFFFF]'
                          }`}
                        />
                      </label>
                      <label className="flex flex-col">
                        <p className={`text-base font-medium leading-normal pb-2 ${
                          darkMode ? 'text-white' : 'text-black'
                        }`}>Location</p>
                        <Input
                          placeholder="New Zealand"
                          value={formData.location}
                          onChange={e => {
                            setFormData(prev => ({ ...prev, location: e.target.value }))
                            // Trigger AI suggestion when location changes
                            suggestCompanySize()
                          }}
                          className={`rounded-xl h-14 ${
                            darkMode 
                              ? 'bg-gray-800 border-gray-700 text-white' 
                              : 'border-[#E0E0E0] bg-[#FFFFFF]'
                          }`}
                        />
                      </label>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div className="space-y-6">
                    {/* Message and Terms Fields */}
                    <label className="flex flex-col">
                      <p className={`text-base font-medium leading-normal pb-2 ${
                        darkMode ? 'text-white' : 'text-black'
                      }`}>
                        Message *
                        {errors.message && <span className="text-red-500 text-sm ml-1">{errors.message}</span>}
                      </p>
                      <Textarea
                        placeholder="Leave us a message..."
                        value={formData.message}
                        onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                        className={`rounded-xl min-h-36 ${
                          darkMode 
                            ? 'bg-gray-800 border-gray-700 text-white' 
                            : 'border-[#E0E0E0] bg-[#FFFFFF]'
                        }`}
                      />
                    </label>

                    <div className="space-y-4">
                      <label className="flex gap-x-3 py-3 items-start">
                        <input
                          type="checkbox"
                          checked={formData.accepts_privacy}
                          onChange={e => setFormData(prev => ({ ...prev, accepts_privacy: e.target.checked }))}
                          className={`mt-1 h-5 w-5 rounded border-2 bg-transparent text-[#EA2831] checked:bg-[#EA2831] checked:border-[#EA2831] focus:ring-0 focus:ring-offset-0 ${
                            darkMode ? 'border-gray-600' : 'border-[#E0E0E0]'
                          }`}
                        />
                        <div className="flex flex-col">
                          <p className={`text-base font-normal leading-normal ${
                            darkMode ? 'text-white' : 'text-black'
                          }`}>
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
                          className={`mt-1 h-5 w-5 rounded border-2 bg-transparent text-[#EA2831] checked:bg-[#EA2831] checked:border-[#EA2831] focus:ring-0 focus:ring-offset-0 ${
                            darkMode ? 'border-gray-600' : 'border-[#E0E0E0]'
                          }`}
                        />
                        <p className={`text-base font-normal leading-normal ${
                          darkMode ? 'text-white' : 'text-black'
                        }`}>
                          I would like to receive news and updates via email
                        </p>
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation buttons */}
                <div className="flex justify-between py-3">
                  {currentStep > 0 && (
                    <button
                      type="button"
                      onClick={handlePrev}
                      className={`px-6 py-2 rounded-full ${
                        darkMode 
                          ? 'bg-gray-700 text-white hover:bg-gray-600' 
                          : 'bg-[#EEEEEE] text-black hover:bg-[#E0E0E0]'
                      }`}
                    >
                      Previous
                    </button>
                  )}
                  
                  {currentStep < STEPS.length - 1 ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      className="ml-auto px-6 py-2 rounded-full bg-[#EA2831] text-white hover:bg-[#D62429]"
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={loading}
                      className="ml-auto flex min-w-[84px] items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-[#EA2831] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#D62429] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <span className="truncate">{loading ? 'Sending...' : 'Send message'}</span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function ContactPage() {
  return <ContactForm />
}
