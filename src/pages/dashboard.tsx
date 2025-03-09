
import { useState, useEffect } from 'react'
import { 
  LayoutDashboard,
  Users,
  CheckCircle,
  ChartBar,
  Folder,
  Bell,
  Mail,
  Menu
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/integrations/supabase/client'
import { useNavigate } from 'react-router-dom'
import { useToast } from '@/components/ui/use-toast'
import { Avatar } from '@/components/ui/avatar'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { UserProfile, typeHelper } from '@/types/supabase'

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!user?.id) {
        setIsLoading(false)
        return
      }

      try {
        setIsLoading(true)
        setError(null)

        // Use any for non-schema tables
        const { data, error } = await (supabase
          .from('user_profiles')
          .select('*')
          .eq('user_id', user.id)
          .maybeSingle() as any)

        if (error) throw error

        if (data) {
          setUserProfile(typeHelper<UserProfile>()(data))
        }
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to load profile'
        setError(errorMessage)
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
        console.error('Error fetching user profile:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchUserProfile()
  }, [user, toast])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-900">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    )
  }

  const statsCards = [
    {
      label: 'Total Projects',
      value: '24',
      icon: Folder,
      color: 'red',
      progress: 75
    },
    {
      label: 'Active Tasks',
      value: '48',
      icon: CheckCircle,
      color: 'pink',
      progress: 60
    },
    {
      label: 'Team Members',
      value: '12',
      icon: Users,
      color: 'red',
      progress: 85
    },
    {
      label: 'Productivity',
      value: '89%',
      icon: ChartBar,
      color: 'pink',
      progress: 89
    }
  ]

  return (
    <div className="flex min-h-screen bg-gray-900">
      <aside className={`w-64 ${isSidebarOpen ? 'block' : 'hidden'} lg:block`}>
        <div className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform bg-gray-900 border-r border-gray-700">
          <div className="h-full px-3 py-4 overflow-y-auto">
            <div className="mb-4 px-2">
              <h1 className="text-xl font-bold text-red-400">PamirHub</h1>
            </div>
            <nav className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 bg-red-900/50 text-red-400"
                onClick={() => navigate('/dashboard')}
              >
                <LayoutDashboard className="h-5 w-5" />
                Dashboard
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 bg-red-900/50 text-red-400"
                onClick={() => navigate('/company/dashboard')}
              >
                <Folder className="h-5 w-5" />
                Company Dashboard
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 bg-red-900/50 text-red-400"
                onClick={() => navigate('/profile')}
              >
                <Avatar className="h-5 w-5" />
                Profile
              </Button>
            </nav>
          </div>
        </div>
      </aside>

      <main className="flex-1 bg-gray-800">
        <header className="bg-gray-900 border-b border-gray-700 px-4 py-2.5">
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-white"
            >
              <Menu className="h-6 w-6" />
            </Button>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="text-white">
                <Mail className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-white">
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar 
                className="h-8 w-8 cursor-pointer"
                onClick={() => navigate('/profile')}
              />
            </div>
          </div>
        </header>

        <div className="p-6">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-white mb-2">
              Welcome, {userProfile?.company_name || 'User'}!
            </h2>
            <p className="text-xl text-gray-400">Here's your dashboard overview</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statsCards.map((stat, index) => (
              <Card key={index} className="bg-gray-800 hover:bg-gray-750 transition-colors border-gray-700">
                <div className="flex flex-col gap-4 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-gray-400 mb-2">{stat.label}</p>
                      <p className="text-xl font-semibold text-white">{stat.value}</p>
                    </div>
                    <div className={`bg-${stat.color}-900 p-3 rounded-lg`}>
                      <stat.icon className={`h-6 w-6 text-${stat.color}-400`} />
                    </div>
                  </div>
                  <Progress value={stat.progress} className="bg-gray-700" indicatorClassName={`bg-${stat.color}-600`} />
                </div>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gray-800 border-gray-700">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-lg font-bold text-white">Recent Projects</h5>
                  <Button variant="outline" size="sm" className="border-red-400 text-red-400 hover:bg-red-900">
                    View All
                  </Button>
                </div>
              </div>
            </Card>

            <Card className="bg-gray-800 border-gray-700">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h5 className="text-lg font-bold text-white">Team Members</h5>
                  <Button variant="default" size="sm" className="bg-red-600 hover:bg-red-700">
                    Request Talent
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
