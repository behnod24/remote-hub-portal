
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  Search, Bell, Menu, User, Settings, 
  Gauge, Users, LayoutDashboard, Linkedin, 
  Presentation, FileText, MessageSquare, 
  HelpCircle, Twitter 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

// Sample data - replace with real data from your API
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

export default function Dashboard() {
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [userProfile, setUserProfile] = useState<{ avatar_url: string | null }>({ avatar_url: null })

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user?.id) {
        const { data, error } = await supabase
          .from('user_profiles')
          .select('avatar_url')
          .eq('user_id', user.id)
          .single()

        if (data) {
          setUserProfile(data)
        }
      }
    }

    fetchUserProfile()
  }, [user])

  return (
    <div className="relative flex min-h-screen flex-col bg-black">
      <div className="flex h-full grow flex-col">
        <header className="flex items-center justify-between border-b border-[#292929] px-10 py-3">
          <div className="flex items-center gap-4 text-white">
            <div className="h-4 w-4">
              <LayoutDashboard />
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">
              Crypto Sentiment Dashboard
            </h2>
          </div>
          
          <div className="flex flex-1 justify-end gap-8">
            <div className="flex min-w-40 max-w-64">
              <div className="relative flex w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                  <Search className="h-5 w-5 text-[#ABABAB]" />
                </div>
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-xl border-none bg-[#292929] pl-10 text-white placeholder:text-[#ABABAB]"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="rounded-full bg-[#292929]">
                <Settings className="h-5 w-5 text-white" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full bg-[#292929]">
                <User className="h-5 w-5 text-white" />
              </Button>
            </div>
          </div>
        </header>

        <div className="flex flex-1 gap-1 px-6 py-5">
          {/* Sidebar */}
          <div className="w-80">
            <div className="flex h-full min-h-[700px] flex-col justify-between bg-black p-4">
              <div className="flex flex-col gap-4">
                <div className="flex gap-3">
                  <div className="h-10 w-10 rounded-full bg-[#292929]">
                    {userProfile?.avatar_url ? (
                      <img
                        src={userProfile.avatar_url}
                        alt="Profile"
                        className="h-full w-full rounded-full object-cover"
                      />
                    ) : (
                      <User className="h-full w-full p-2 text-white" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <h1 className="text-base font-medium text-white">
                      {user?.email}
                    </h1>
                    <p className="text-sm text-[#ABABAB]">View profile</p>
                  </div>
                </div>

                <nav className="flex flex-col gap-2">
                  <Link to="/dashboard" className="flex items-center gap-3 rounded-full bg-[#292929] px-3 py-2">
                    <Gauge className="h-6 w-6 text-white" />
                    <span className="text-sm font-medium text-white">Dashboard</span>
                  </Link>
                  {[
                    { icon: User, label: "Company Profile" },
                    { icon: Users, label: "Employees" },
                    { icon: LayoutDashboard, label: "Projects" },
                    { icon: Linkedin, label: "Jobs" },
                    { icon: Presentation, label: "Reports & Analytics" },
                    { icon: FileText, label: "File Management" },
                    { icon: MessageSquare, label: "Messaging" },
                    { icon: Settings, label: "Settings & Security" },
                    { icon: HelpCircle, label: "Support & Help" },
                  ].map((item, index) => (
                    <Link
                      key={index}
                      to="#"
                      className="flex items-center gap-3 px-3 py-2 text-white hover:bg-[#292929] rounded-full transition-colors"
                    >
                      <item.icon className="h-6 w-6" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex flex-1 flex-col max-w-[960px]">
            <h1 className="px-4 pb-3 pt-6 text-[32px] font-bold leading-tight text-white">
              Sentiment analysis
            </h1>

            <div className="flex flex-wrap gap-4 px-4 py-6">
              {/* Sentiment Analysis Card */}
              <div className="flex min-w-72 flex-1 flex-col gap-2">
                <p className="text-base font-medium text-white">Sentiment Analysis</p>
                <p className="text-[32px] font-bold leading-tight text-white">
                  75% Positive
                </p>
                <p className="text-base text-[#ABABAB]">Last 24h +5%</p>
                <div className="min-h-[180px] py-4">
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={sentimentData}>
                      <XAxis dataKey="name" stroke="#ABABAB" />
                      <YAxis stroke="#ABABAB" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#ABABAB"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bitcoin Popularity Card */}
              <div className="flex min-w-72 flex-1 flex-col gap-2">
                <p className="text-base font-medium text-white">Bitcoin Popularity</p>
                <p className="text-[32px] font-bold leading-tight text-white">
                  1200 Tweets
                </p>
                <p className="text-base text-[#ABABAB]">Last 7d -2%</p>
                <div className="min-h-[180px] py-4">
                  <ResponsiveContainer width="100%" height={180}>
                    <LineChart data={sentimentData}>
                      <XAxis dataKey="name" stroke="#ABABAB" />
                      <YAxis stroke="#ABABAB" />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#ABABAB"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Highlight Posts */}
            <h2 className="px-4 pb-3 pt-5 text-[22px] font-bold leading-tight text-white">
              Highlight posts
            </h2>
            
            {tweets.map((tweet) => (
              <div
                key={tweet.id}
                className="flex items-center justify-between gap-4 bg-black px-4 py-2 min-h-[72px]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#292929] shrink-0">
                    <Twitter className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex flex-col justify-center">
                    <p className="text-base font-medium text-white line-clamp-1">
                      {tweet.content}
                    </p>
                    <p className="text-sm text-[#ABABAB] line-clamp-2">
                      {tweet.author}
                    </p>
                  </div>
                </div>
                <div className="shrink-0">
                  <p className="text-sm text-[#ABABAB]">{tweet.timeAgo}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
