"use client";

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import FormLayout from "@/components/layout/FormLayout";
import confetti from 'canvas-confetti';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
interface ContactFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  team_size: string;
  location: string;
  message: string;
  accepts_privacy: boolean;
  accepts_marketing: boolean;
}
interface FormErrors extends Partial<Record<keyof ContactFormData, string>> {}
const STORAGE_KEY = 'contact_form_data';
const STEPS = ['Basic Info', 'Company Details', 'Message'];
const COMPANY_SIZES = ["1-10 employees", "11-50 employees", "51-200 employees", "201-500 employees", "501-1000 employees", "1000+ employees"];

// Expanded list of cities by country code with major cities first
const CITIES_BY_COUNTRY: {
  [key: string]: string[];
} = {
  us: ["New York", "Los Angeles", "Chicago", "Albuquerque", "Atlanta", "Austin", "Baltimore", "Boston", "Charlotte", "Columbus", "Dallas", "Denver", "Fort Worth", "Houston", "Indianapolis", "Jacksonville", "Las Vegas", "Miami", "Milwaukee", "Nashville", "Philadelphia", "Phoenix", "Portland", "San Antonio", "San Diego", "San Francisco", "San Jose", "Seattle", "Washington DC"],
  gb: ["London", "Manchester", "Birmingham", "Aberdeen", "Bath", "Belfast", "Brighton", "Bristol", "Cambridge", "Cardiff", "Chester", "Coventry", "Durham", "Edinburgh", "Exeter", "Glasgow", "Leeds", "Leicester", "Liverpool", "Newcastle", "Norwich", "Nottingham", "Oxford", "Plymouth", "Portsmouth", "Sheffield", "Southampton", "Swansea", "York"],
  ca: ["Toronto", "Vancouver", "Montreal", "Brampton", "Burnaby", "Calgary", "Edmonton", "Halifax", "Hamilton", "Kitchener", "London", "Longueuil", "Mississauga", "Ottawa", "Quebec City", "Regina", "Richmond", "Saskatoon", "St. John's", "Surrey", "Victoria", "Waterloo", "Windsor", "Winnipeg"],
  au: ["Sydney", "Melbourne", "Brisbane", "Adelaide", "Albury", "Ballarat", "Bendigo", "Bunbury", "Bundaberg", "Cairns", "Canberra", "Darwin", "Geelong", "Gold Coast", "Hobart", "Launceston", "Mackay", "Newcastle", "Perth", "Rockhampton", "Toowoomba", "Townsville", "Wagga Wagga", "Wollongong"],
  nz: ["Auckland", "Wellington", "Christchurch", "Blenheim", "Cambridge", "Dunedin", "Gisborne", "Hamilton", "Invercargill", "Levin", "Masterton", "Napier", "Nelson", "New Plymouth", "Palmerston North", "Papakura", "Porirua", "Pukekohe", "Queenstown", "Rotorua", "Timaru", "Tauranga", "Whanganui", "Whangarei"],
  de: ["Berlin", "Hamburg", "Munich", "Augsburg", "Bielefeld", "Bochum", "Bonn", "Bremen", "Cologne", "Dortmund", "Dresden", "Duisburg", "Düsseldorf", "Essen", "Frankfurt", "Hanover", "Karlsruhe", "Leipzig", "Mannheim", "Münster", "Nuremberg", "Stuttgart", "Wiesbaden", "Wuppertal"],
  fr: ["Paris", "Marseille", "Lyon", "Aix-en-Provence", "Angers", "Bordeaux", "Brest", "Dijon", "Grenoble", "Le Havre", "Le Mans", "Lille", "Montpellier", "Nantes", "Nice", "Nîmes", "Reims", "Rennes", "Saint-Étienne", "Strasbourg", "Toulon", "Toulouse", "Tours", "Villeurbanne"],
  es: ["Madrid", "Barcelona", "Valencia", "Alicante", "Badalona", "Bilbao", "Cartagena", "Córdoba", "Elche", "Gijón", "Granada", "L'Hospitalet", "Las Palmas", "Málaga", "Murcia", "Oviedo", "Palma", "Sabadell", "Seville", "Terrassa", "Valladolid", "Vigo", "Vitoria", "Zaragoza"],
  it: ["Rome", "Milan", "Naples", "Bari", "Bologna", "Brescia", "Catania", "Florence", "Genoa", "Messina", "Modena", "Padua", "Palermo", "Parma", "Perugia", "Prato", "Ravenna", "Reggio Calabria", "Reggio Emilia", "Taranto", "Trieste", "Turin", "Venice", "Verona"],
  jp: ["Tokyo", "Osaka", "Yokohama", "Chiba", "Fukuoka", "Hamamatsu", "Hiroshima", "Kanazawa", "Kawasaki", "Kitakyushu", "Kobe", "Kumamoto", "Kyoto", "Matsuyama", "Nagoya", "Niigata", "Sagamihara", "Sakai", "Saitama", "Sendai", "Shizuoka", "Sapporo", "Utsunomiya"],
  tr: ["Istanbul", "Ankara", "Izmir", "Adana", "Antalya", "Aydın", "Balıkesir", "Bursa", "Çanakkale", "Denizli", "Diyarbakır", "Edirne", "Erzurum", "Eskişehir", "Gaziantep", "Kayseri", "Konya", "Kütahya", "Malatya", "Manisa", "Mersin", "Muğla", "Ordu", "Rize", "Sakarya", "Samsun", "Tekirdağ", "Trabzon", "Urfa", "Van"]
};
function ContactForm() {
  const {
    toast
  } = useToast();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [currentStep, setCurrentStep] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const [logoUrl, setLogoUrl] = useState("");
  const [bgUrl, setBgUrl] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [availableCities, setAvailableCities] = useState<string[]>([]);
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
  });
  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const {
          data: {
            publicUrl: logoPublicUrl
          }
        } = supabase.storage.from('site-assets').getPublicUrl('logo.png');
        if (logoPublicUrl) {
          console.log('Contact Form Logo URL:', logoPublicUrl);
          setLogoUrl(logoPublicUrl);
        }
        const {
          data: {
            publicUrl: bgPublicUrl
          }
        } = supabase.storage.from('site-assets').getPublicUrl('Wave Abstract-min.png');
        if (bgPublicUrl) {
          console.log('Contact Form Background URL:', bgPublicUrl);
          setBgUrl(bgPublicUrl);
        }
      } catch (error) {
        console.error('Error fetching assets:', error);
      }
    };
    fetchAssets();
  }, []);

  // Update cities when country changes
  const handlePhoneChange = (value: string, country: any) => {
    setFormData(prev => ({
      ...prev,
      phone: value
    }));
    if (country?.countryCode) {
      const countryCode = country.countryCode.toLowerCase();
      setSelectedCountry(countryCode);
      const cities = CITIES_BY_COUNTRY[countryCode] || [];
      console.log('Selected country:', countryCode, 'Available cities:', cities); // Debug log
      setAvailableCities(cities);
      // Reset location if the current location is not in the new cities list
      if (!cities.includes(formData.location)) {
        setFormData(prev => ({
          ...prev,
          location: ""
        }));
      }
    }
  };
  const suggestCompanySize = async () => {
    if (formData.location && !formData.team_size) {
      try {
        const {
          data,
          error
        } = await supabase.functions.invoke('suggest-company-size', {
          body: {
            location: formData.location
          }
        });
        if (!error && data.suggestion) {
          setFormData(prev => ({
            ...prev,
            team_size: data.suggestion
          }));
          toast({
            title: "AI Suggestion",
            description: `Based on your location, we suggest: ${data.suggestion}`
          });
        }
      } catch (error) {
        console.error('Error getting AI suggestion:', error);
      }
    }
  };
  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    if (!formData.message) newErrors.message = "Message is required";
    if (!formData.accepts_privacy) newErrors.accepts_privacy = "You must accept the privacy policy";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const validateFirstStep = () => {
    const newErrors: FormErrors = {};
    if (!formData.first_name) newErrors.first_name = "First name is required";
    if (!formData.last_name) newErrors.last_name = "Last name is required";
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    if (!formData.phone) newErrors.phone = "Phone number is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleNext = () => {
    if (currentStep === 1) {
      if (!validateFirstStep()) {
        toast({
          title: "Validation Error",
          description: "Please fill in all required fields before proceeding.",
          variant: "destructive"
        });
        return;
      }
    }
    if (currentStep < STEPS.length) {
      setCurrentStep(prev => prev + 1);
    }
  };
  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };
  const triggerConfetti = () => {
    const count = 200;
    const defaults = {
      origin: {
        y: 0.7
      }
    };
    function fire(particleRatio: number, opts: any) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
        spread: 90,
        startVelocity: 30
      });
    }
    fire(0.25, {
      spread: 26,
      startVelocity: 55
    });
    fire(0.2, {
      spread: 60
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45
    });
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please check all required fields and try again.",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    try {
      const {
        error: dbError
      } = await supabase.from('contact_submissions').insert([{
        first_name: formData.first_name,
        last_name: formData.last_name,
        email: formData.email,
        phone: formData.phone,
        team_size: formData.team_size,
        location: formData.location,
        message: formData.message,
        accepts_privacy: formData.accepts_privacy,
        accepts_marketing: formData.accepts_marketing
      }]);
      if (dbError) throw dbError;
      const {
        error: emailError
      } = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...formData
        }
      });
      if (emailError) throw emailError;
      setShowSuccess(true);
      triggerConfetti();
      toast({
        title: "Message Sent Successfully",
        description: <div className="mt-2 flex flex-col gap-2">
            <p className="text-green-600 dark:text-green-400">
              Thank you for contacting us, {formData.first_name}!
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              We'll get back to you within 24 hours at {formData.email}
            </p>
          </div>,
        className: "w-full md:max-w-md",
        duration: 5000
      });
      localStorage.removeItem(STORAGE_KEY);
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
      });
      setCurrentStep(1);
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Error Sending Message",
        description: <div className="mt-2 flex flex-col gap-2">
            <p className="text-red-600 dark:text-red-400">
              Something went wrong while sending your message.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Please try again or contact support if the problem persists.
            </p>
          </div>,
        variant: "destructive",
        className: "w-full md:max-w-md"
      });
    } finally {
      setLoading(false);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col">
                <p className="text-base font-medium leading-normal pb-2">
                  First name *
                  {errors.first_name && <span className="text-red-500 text-sm ml-1">{errors.first_name}</span>}
                </p>
                <Input placeholder="First name" value={formData.first_name} onChange={e => setFormData(prev => ({
                ...prev,
                first_name: e.target.value
              }))} className="rounded-xl h-14 border-[#E0E0E0] bg-[#FFFFFF]" />
              </label>
              <label className="flex flex-col">
                <p className="text-base font-medium leading-normal pb-2">
                  Last name *
                  {errors.last_name && <span className="text-red-500 text-sm ml-1">{errors.last_name}</span>}
                </p>
                <Input placeholder="Last name" value={formData.last_name} onChange={e => setFormData(prev => ({
                ...prev,
                last_name: e.target.value
              }))} className="rounded-xl h-14 border-[#E0E0E0] bg-[#FFFFFF]" />
              </label>
            </div>

            <label className="flex flex-col">
              <p className="text-base font-medium leading-normal pb-2">
                Email *
                {errors.email && <span className="text-red-500 text-sm ml-1">{errors.email}</span>}
              </p>
              <Input type="email" placeholder="Email address" value={formData.email} onChange={e => setFormData(prev => ({
              ...prev,
              email: e.target.value
            }))} className="rounded-xl h-14 border-[#E0E0E0] bg-[#FFFFFF]" />
            </label>

            <label className="flex flex-col">
              <p className="text-base font-medium leading-normal pb-2">
                Phone *
                {errors.phone && <span className="text-red-500 text-sm ml-1">{errors.phone}</span>}
              </p>
              <PhoneInput country={'us'} value={formData.phone} onChange={(phone, country) => handlePhoneChange(phone, country)} containerClass="!w-full" inputClass="!w-full !h-14 !rounded-xl !border-[#E0E0E0] !bg-[#FFFFFF]" buttonClass="!border-[#E0E0E0] !rounded-l-xl" />
            </label>
          </div>;
      case 2:
        return <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <label className="flex flex-col relative"> {/* Added relative positioning */}
                <p className="text-base font-medium leading-normal pb-2">Company size</p>
                <Select value={formData.team_size} onValueChange={value => setFormData(prev => ({
                ...prev,
                team_size: value
              }))}>
                  <SelectTrigger className="rounded-xl h-14 border-[#E0E0E0] bg-[#FFFFFF]">
                    <SelectValue placeholder="Select company size" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-white"> {/* Added high z-index and explicit background */}
                    {COMPANY_SIZES.map(size => <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </label>
              <label className="flex flex-col relative"> {/* Added relative positioning */}
                <p className="text-base font-medium leading-normal pb-2">Location</p>
                <Select value={formData.location} onValueChange={value => setFormData(prev => ({
                ...prev,
                location: value
              }))} disabled={availableCities.length === 0}>
                  <SelectTrigger className="rounded-xl h-14 border-[#E0E0E0] bg-[#FFFFFF]">
                    <SelectValue placeholder={availableCities.length === 0 ? "Select a country first" : "Select city"} />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-white"> {/* Added high z-index and explicit background */}
                    {availableCities.map(city => <SelectItem key={city} value={city}>
                        {city}
                      </SelectItem>)}
                  </SelectContent>
                </Select>
              </label>
            </div>
          </div>;
      case 3:
        return <div className="space-y-6">
            <label className="flex flex-col">
              <p className="text-base font-medium leading-normal pb-2">
                Message *
                {errors.message && <span className="text-red-500 text-sm ml-1">{errors.message}</span>}
              </p>
              <Textarea placeholder="Leave us a message..." value={formData.message} onChange={e => setFormData(prev => ({
              ...prev,
              message: e.target.value
            }))} className="rounded-xl min-h-36 border-[#E0E0E0] bg-[#FFFFFF]" />
            </label>

            <div className="space-y-4">
              <label className="flex gap-x-3 py-3 items-start">
                <input type="checkbox" checked={formData.accepts_privacy} onChange={e => setFormData(prev => ({
                ...prev,
                accepts_privacy: e.target.checked
              }))} className="mt-1 h-5 w-5 rounded border-2 bg-transparent text-[#EA2831] checked:bg-[#EA2831] checked:border-[#EA2831] focus:ring-0 focus:ring-offset-0 border-[#E0E0E0]" />
                <div className="flex flex-col">
                  <p className="text-base font-normal leading-normal">
                    I agree to the processing of personal data according to the Privacy Policy *
                  </p>
                  {errors.accepts_privacy && <span className="text-red-500 text-sm">{errors.accepts_privacy}</span>}
                </div>
              </label>
              <label className="flex gap-x-3 py-3 items-start">
                <input type="checkbox" checked={formData.accepts_marketing} onChange={e => setFormData(prev => ({
                ...prev,
                accepts_marketing: e.target.checked
              }))} className="mt-1 h-5 w-5 rounded border-2 bg-transparent text-[#EA2831] checked:bg-[#EA2831] checked:border-[#EA2831] focus:ring-0 focus:ring-offset-0 border-[#E0E0E0]" />
                <p className="text-base font-normal leading-normal">
                  I would like to receive news and updates via email
                </p>
              </label>
            </div>
          </div>;
      default:
        return null;
    }
  };
  return <div className="min-h-screen relative">
      <div className="fixed inset-0" style={{
      backgroundImage: `url(${bgUrl})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      opacity: 0.1,
      zIndex: -1
    }} />

      <div className="relative z-[1]"> {/* Adjusted z-index to be explicit and lower than dropdowns */}
        <FormLayout title={<div className="flex items-center gap-4">
              
              <Link to="/" className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-gray-100 hover:bg-gray-200 rounded-full transition-colors">
                <ArrowLeft className="h-4 w-4" />
                Back to Site
              </Link>
            </div>} currentStep={currentStep} totalSteps={STEPS.length} onNext={currentStep < STEPS.length ? handleNext : undefined} onPrev={currentStep > 1 ? handlePrev : undefined} isLastStep={currentStep === STEPS.length}>
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

            {showSuccess && <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm animate-fade-in z-50">
                <div className="text-center space-y-4 animate-scale-in">
                  <h3 className="text-2xl font-bold text-green-600">Message Sent Successfully!</h3>
                  <p className="text-gray-600">Thank you for reaching out. We'll be in touch soon!</p>
                </div>
              </div>}

            {renderStepContent()}

            {currentStep === STEPS.length && <div className="flex justify-center py-3">
                <button type="submit" disabled={loading} className="flex min-w-[84px] w-full max-w-[480px] items-center justify-center overflow-hidden rounded-full h-12 px-5 bg-[#EA2831] text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-[#D62429] disabled:opacity-50 disabled:cursor-not-allowed">
                  <span className="truncate">{loading ? 'Sending...' : 'Send message'}</span>
                </button>
              </div>}
          </form>
        </FormLayout>
      </div>
    </div>;
}
export default function ContactPage() {
  return <ContactForm />;
}