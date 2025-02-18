
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import Index from '@/pages/Index'
import NotFound from '@/pages/NotFound'
import SignIn from '@/pages/auth/signin'
import SignUp from '@/pages/auth/signup'
import ResetPassword from '@/pages/auth/reset-password'
import Dashboard from '@/pages/dashboard'
import Blog from '@/pages/blog'
import Contact from '@/app/contact/page'
import HireTalent from '@/pages/hire-talent'
import HowItWorks from '@/pages/how-it-works'
import Sectors from '@/pages/sectors'
import AboutUs from '@/pages/about'
import Pricing from '@/pages/pricing'
import { AuthProvider } from '@/contexts/AuthContext'
import TalentSearchPage from '@/pages/talent/TalentSearchPage'
import CompanyOverview from '@/pages/company/overview'
import CompanyProfile from '@/pages/company/profile'
import CompanyTeam from '@/pages/company/team'
import CompanyLocations from '@/pages/company/locations'

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth/signin" element={<SignIn />} />
              <Route path="/auth/signup" element={<SignUp />} />
              <Route path="/auth/reset-password" element={<ResetPassword />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/company/dashboard" element={<CompanyOverview />} />
              <Route path="/company/dashboard/profile" element={<CompanyProfile />} />
              <Route path="/company/dashboard/team" element={<CompanyTeam />} />
              <Route path="/company/dashboard/locations" element={<CompanyLocations />} />
              <Route path="/company/dashboard/talent" element={<TalentSearchPage />} />
              <Route path="/company/dashboard/jobs" element={<Dashboard />} />
              <Route path="/company/dashboard/applications" element={<Dashboard />} />
              <Route path="/company/dashboard/messages" element={<Dashboard />} />
              <Route path="/company/dashboard/billing" element={<Dashboard />} />
              <Route path="/company/dashboard/settings" element={<Dashboard />} />
              <Route path="/hire-talent" element={<HireTalent />} />
              <Route path="/sectors" element={<Sectors />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster />
      </AuthProvider>
    </Router>
  )
}

export default App
