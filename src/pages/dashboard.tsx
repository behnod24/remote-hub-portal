
import { useState, useEffect } from 'react'
import { AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { useNavigate, useLocation } from 'react-router-dom'
import ProfileManager from '@/components/dashboard/ProfileManager'
import { useToast } from '@/components/ui/use-toast'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import SentimentAnalysis from '@/components/dashboard/SentimentAnalysis'
import TweetList from '@/components/dashboard/TweetList'
import { useIsMobile } from '@/hooks/use-mobile'
import CompanyDashboardLayout from '@/components/company/dashboard/CompanyDashboardLayout'
import TalentSearch from '@/components/company/dashboard/TalentSearch'

const sentimentData = [
  { name: 'Mon', value: 65 },
  { name: 'Tue', value: 75 },
  { name: 'Wed', value: 70 },
  { name: 'Thu', value: 80 },
  { name: 'Fri', value: 85 },
  { name: 'Sat', value: 77 },
  { name: 'Sun', value: 82 },
]

const tweets = [
  {
    id: 1,
    content: "Bitcoin is the future of finance! #BTC",
    author: "@elonmusk",
    timeAgo: "1h ago"
  },
  {
    id: 2,
    content: "Crypto markets looking strong today",
    author: "@jack",
    timeAgo: "2d ago"
  },
  {
    id: 3,
    content: "Web3 is evolving faster than ever",
    author: "@vitalik",
    timeAgo: "3d ago"
  }
]

interface UserProfile {
  avatar_url: string | null
  bio: string | null
  phone: string | null
  company: string | null
  company_name: string | null
  position: string | null
  role: 'admin' | 'user'
}

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState("")
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [showProfileManager, setShowProfileManager] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const isMobile = useIsMobile()
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile)
  const location = useLocation();

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.id) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle()

        if (error) throw error

        if (data) {
          setUserProfile(data)
        } else {
          const { data: newProfile, error: createError } = await supabase
            .from('user_profiles')
            .insert([{ 
              user_id: user.id,
              role: 'user'
            }])
            .select('*')
            .maybeSingle()

          if (createError) throw createError
          
          if (newProfile) {
            setUserProfile(newProfile)
          }
        }
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to load profile'
        setError(errorMessage)
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [user, toast])

  if (location.pathname.startsWith('/company/dashboard')) {
    return (
      <CompanyDashboardLayout currentPath={location.pathname}>
        {location.pathname === '/company/dashboard/talent' ? (
          <TalentSearch />
        ) : (
          <div className="text-white">
            <h1 className="text-2xl font-bold mb-4">
              {location.pathname === '/company/dashboard' && 'Dashboard Overview'}
              {location.pathname === '/company/dashboard/jobs' && 'Job Listings'}
              {location.pathname === '/company/dashboard/applications' && 'Applications'}
              {location.pathname === '/company/dashboard/messages' && 'Messages'}
              {location.pathname === '/company/dashboard/billing' && 'Billing'}
              {location.pathname === '/company/dashboard/settings' && 'Settings'}
            </h1>
            <p className="text-white/60">This section is under development.</p>
          </div>
        )}
      </CompanyDashboardLayout>
    );
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center gap-4">
          <AlertCircle className="h-12 w-12 text-red-500" />
          <h2 className="text-xl font-semibold">Error Loading Dashboard</h2>
          <p className="text-gray-400">{error}</p>
          <Button 
            onClick={() => window.location.reload()}
            variant="outline"
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-black">
      <div className="flex h-full grow flex-col">
        <div className="absolute top-4 left-4 z-50 flex items-center space-x-6">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-white hover:text-primary px-4 py-2 h-10 text-sm md:text-base"
          >
            Back to Site
          </Button>
          <span className="text-white text-base md:text-lg font-semibold whitespace-nowrap">
            PamirHub
          </span>
        </div>

        <DashboardHeader
          companyName={userProfile?.company_name}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onSettingsClick={() => setShowProfileManager(true)}
        />

        <div className="flex flex-1 flex-col lg:flex-row gap-1 px-2 md:px-6 py-5">
          {(isSidebarOpen || !isMobile) && (
            <div className={`${isMobile ? 'fixed inset-0 z-50 bg-black/50' : ''}`} onClick={() => isMobile && setIsSidebarOpen(false)}>
              <div className={`${isMobile ? 'w-64 h-full' : ''}`} onClick={e => e.stopPropagation()}>
                <DashboardSidebar
                  userEmail={user?.email || ''}
                  userRole={userProfile?.role || 'user'}
                  avatarUrl={userProfile?.avatar_url}
                  onClose={() => setIsSidebarOpen(false)}
                  isMobile={isMobile}
                />
              </div>
            </div>
          )}

          <div className="flex flex-1 flex-col max-w-full lg:max-w-[960px]">
            {showProfileManager && userProfile ? (
              <ProfileManager
                userId={user?.id || ''}
                initialProfile={userProfile}
                onProfileUpdate={handleProfileUpdate}
                isAdmin={userProfile.role === 'admin'}
              />
            ) : (
              <>
                <div className="flex items-center justify-between px-4 pb-3 pt-6">
                  <h1 className="text-2xl md:text-[32px] font-bold leading-tight text-white">
                    Sentiment analysis
                  </h1>
                  {isMobile && (
                    <Button
                      variant="ghost"
                      onClick={() => setIsSidebarOpen(true)}
                      className="lg:hidden text-white"
                    >
                      Menu
                    </Button>
                  )}
                </div>

                <div className="flex flex-wrap gap-4 px-4 py-6">
                  <div className="w-full md:w-auto">
                    <SentimentAnalysis data={sentimentData} />
                  </div>
                  <div className="w-full md:w-auto">
                    <SentimentAnalysis data={sentimentData} />
                  </div>
                </div>

                <div className="px-4">
                  <TweetList tweets={tweets} />
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
