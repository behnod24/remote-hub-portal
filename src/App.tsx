
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
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
import Pricing from '@/pages/pricing'
import AboutUs from '@/pages/about'
import { AuthProvider } from '@/contexts/AuthContext'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/reset-password" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/hire-talent" element={<HireTalent />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/sectors" element={<Sectors />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </Router>
  )
}

export default App
