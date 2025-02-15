
"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { supabase } from "@/integrations/supabase/client"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft } from "lucide-react"
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

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

function ContactForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<FormErrors>({})
  
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
    <div className="relative flex min-h-screen flex-col bg-[#FFFFFF]">
      <div className="flex h-full grow flex-col">
        <div className="gap-4 md:gap-6 px-4 md:px-6 flex flex-1 flex-col md:flex-row justify-center py-5">
          {/* Left sidebar - company info */}
          <div className="md:w-80 w-full md:max-w-[320px]">
            <div className="flex h-full min-h-0 md:min-h-[700px] flex-col justify-between bg-[#FFFFFF] p-4">
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div
                    className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
                    style={{backgroundImage: 'url("/placeholder.svg")'}}
                  />
                  <h1 className="text-black text-base font-medium leading-normal">PamirHub</h1>
                </div>
                <div className="flex flex-col gap-2">
                  <Link to="/" className="flex items-center gap-3 px-3 py-2 rounded-full bg-[#EEEEEE] hover:bg-[#E0E0E0] transition-colors">
                    <ArrowLeft className="text-black h-6 w-6" />
                    <p className="text-black text-sm font-medium leading-normal">Back to site</p>
                  </Link>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm8,191.63V152h24a8,8,0,0,0,0-16H136V112a16,16,0,0,1,16-16h16a8,8,0,0,0,0-16H152a32,32,0,0,0-32,32v24H96a8,8,0,0,0,0,16h24v63.63a88,88,0,1,1,16,0Z"/>
                    </svg>
                  </div>
                  <p className="text-black text-sm font-medium leading-normal">@PamirHub</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M247.39,68.94A8,8,0,0,0,240,64H209.57A48.66,48.66,0,0,0,168.1,40a46.91,46.91,0,0,0-33.75,13.7A47.9,47.9,0,0,0,120,88v6.09C79.74,83.47,46.81,50.72,46.46,50.37a8,8,0,0,0-13.65,4.92c-4.31,47.79,9.57,79.77,22,98.18a110.93,110.93,0,0,0,21.88,24.2c-15.23,17.53-39.21,26.74-39.47,26.84a8,8,0,0,0-3.85,11.93c.75,1.12,3.75,5.05,11.08,8.72C53.51,229.7,65.48,232,80,232c70.67,0,129.72-54.42,135.75-124.44l29.91-29.9A8,8,0,0,0,247.39,68.94ZM202.31,98.35a8,8,0,0,0-2.32,5.14C196,166.58,143.28,216,80,216c-10.56,0-18-1.4-23.22-3.08,11.51-6.25,27.56-17,37.88-32.48A8,8,0,0,0,92,169.08c-.47-.27-43.91-26.34-44-96,16,13,45.25,33.17,78.67,38.79A8,8,0,0,0,136,104V88a32,32,0,0,1,9.6-22.92A30.94,30.94,0,0,1,167.9,56c12.66.16,24.49,7.88,29.44,19.21A8,8,0,0,0,204.67,80h16Z"/>
                    </svg>
                  </div>
                  <p className="text-black text-sm font-medium leading-normal">@PamirHub</p>
                </div>
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="text-black">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M216,24H40A16,16,0,0,0,24,40V216a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V40A16,16,0,0,0,216,24Zm0,192H40V40H216V216ZM96,112v64a8,8,0,0,1-16,0V112a8,8,0,0,1,16,0Zm88,28v36a8,8,0,0,1-16,0V140a20,20,0,0,0-40,0v36a8,8,0,0,1-16,0V112a8,8,0,0,1,15.79-1.78A36,36,0,0,1,184,140ZM100,84A12,12,0,1,1,88,72,12,12,0,0,1,100,84Z"/>
                    </svg>
                  </div>
                  <p className="text-black text-sm font-medium leading-normal">@PamirHub</p>
                </div>
              </div>
            </div>
          </div>

          {/* Main form content */}
          <div className="flex-1 max-w-[960px] w-full">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-wrap justify-between gap-3 p-4">
                <div className="flex w-full flex-col gap-3">
                  <h2 className="text-black text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">We'd love to help</h2>
                  <p className="text-neutral-500 text-base font-normal leading-normal">Reach out and we'll get in touch within 24 hours.</p>
                </div>
              </div>

              {/* Form fields */}
              <div className="space-y-6 px-4">
                {/* Name fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col">
                    <p className="text-black text-base font-medium leading-normal pb-2">
                      First name *
                      {errors.first_name && <span className="text-red-500 text-sm ml-1">{errors.first_name}</span>}
                    </p>
                    <Input
                      placeholder="First name"
                      value={formData.first_name}
                      onChange={e => setFormData(prev => ({ ...prev, first_name: e.target.value }))}
                      className="rounded-xl h-14 border-[#E0E0E0] bg-[#FFFFFF] focus:border-[#E0E0E0]"
                    />
                  </label>
                  <label className="flex flex-col">
                    <p className="text-black text-base font-medium leading-normal pb-2">
                      Last name *
                      {errors.last_name && <span className="text-red-500 text-sm ml-1">{errors.last_name}</span>}
                    </p>
                    <Input
                      placeholder="Last name"
                      value={formData.last_name}
                      onChange={e => setFormData(prev => ({ ...prev, last_name: e.target.value }))}
                      className="rounded-xl h-14 border-[#E0E0E0] bg-[#FFFFFF] focus:border-[#E0E0E0]"
                    />
                  </label>
                </div>

                {/* Email field */}
                <label className="flex flex-col">
                  <p className="text-black text-base font-medium leading-normal pb-2">
                    Email *
                    {errors.email && <span className="text-red-500 text-sm ml-1">{errors.email}</span>}
                  </p>
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="rounded-xl h-14 border-[#E0E0E0] bg-[#FFFFFF] focus:border-[#E0E0E0]"
                  />
                </label>

                {/* Phone field */}
                <label className="flex flex-col">
                  <p className="text-black text-base font-medium leading-normal pb-2">
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

                {/* Company size and location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <label className="flex flex-col">
                    <p className="text-black text-base font-medium leading-normal pb-2">Company size</p>
                    <Input
                      placeholder="1-50 people"
                      value={formData.team_size}
                      onChange={e => setFormData(prev => ({ ...prev, team_size: e.target.value }))}
                      className="rounded-xl h-14 border-[#E0E0E0] bg-[#FFFFFF] focus:border-[#E0E0E0]"
                    />
                  </label>
                  <label className="flex flex-col">
                    <p className="text-black text-base font-medium leading-normal pb-2">Location</p>
                    <Input
                      placeholder="New Zealand"
                      value={formData.location}
                      onChange={e => setFormData(prev => ({ ...prev, location: e.target.value }))}
                      className="rounded-xl h-14 border-[#E0E0E0] bg-[#FFFFFF] focus:border-[#E0E0E0]"
                    />
                  </label>
                </div>

                {/* Message field */}
                <label className="flex flex-col">
                  <p className="text-black text-base font-medium leading-normal pb-2">
                    Message *
                    {errors.message && <span className="text-red-500 text-sm ml-1">{errors.message}</span>}
                  </p>
                  <Textarea
                    placeholder="Leave us a message..."
                    value={formData.message}
                    onChange={e => setFormData(prev => ({ ...prev, message: e.target.value }))}
                    className="rounded-xl min-h-36 border-[#E0E0E0] bg-[#FFFFFF] focus:border-[#E0E0E0]"
                  />
                </label>

                {/* Checkboxes */}
                <div className="space-y-4">
                  <label className="flex gap-x-3 py-3 items-start">
                    <input
                      type="checkbox"
                      checked={formData.accepts_privacy}
                      onChange={e => setFormData(prev => ({ ...prev, accepts_privacy: e.target.checked }))}
                      className="mt-1 h-5 w-5 rounded border-[#E0E0E0] border-2 bg-transparent text-[#EA2831] checked:bg-[#EA2831] checked:border-[#EA2831] focus:ring-0 focus:ring-offset-0"
                    />
                    <div className="flex flex-col">
                      <p className="text-black text-base font-normal leading-normal">
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
                      className="mt-1 h-5 w-5 rounded border-[#E0E0E0] border-2 bg-transparent text-[#EA2831] checked:bg-[#EA2831] checked:border-[#EA2831] focus:ring-0 focus:ring-offset-0"
                    />
                    <p className="text-black text-base font-normal leading-normal">
                      I would like to receive news and updates via email
                    </p>
                  </label>
                </div>

                {/* Submit button */}
                <div className="flex justify-center py-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex min-w-[84px] w-full max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-[#EA2831] text-[#FFFFFF] text-base font-bold leading-normal tracking-[0.015em] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="truncate">{loading ? 'Sending...' : 'Send message'}</span>
                  </button>
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
