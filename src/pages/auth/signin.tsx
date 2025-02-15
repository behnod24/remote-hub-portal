import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Lock } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) {
        if (error.message.includes('Invalid login credentials')) {
          toast.error('Invalid email or password. Please check your credentials or sign up if you don\'t have an account.', {
            style: {
              background: '#FF3333',
              color: '#FFFFFF',
              border: '1px solid #FF0000',
            },
          })
        } else if (error.message.includes('Email not confirmed')) {
          toast.error('Please verify your email address before signing in. Check your inbox for the verification link.', {
            style: {
              background: '#FF3333',
              color: '#FFFFFF',
              border: '1px solid #FF0000',
            },
          })
        } else {
          toast.error(error.message, {
            style: {
              background: '#FF3333',
              color: '#FFFFFF',
              border: '1px solid #FF0000',
            },
          })
        }
      } else if (data?.user) {
        toast.success('Successfully signed in!', {
          style: {
            background: '#4CAF50',
            color: '#FFFFFF',
            border: '1px solid #45A049',
          },
        })
        // The redirect will be handled by AuthContext
      }
    } catch (error: any) {
      toast.error('An unexpected error occurred. Please try again.', {
        style: {
          background: '#FF3333',
          color: '#FFFFFF',
          border: '1px solid #FF0000',
        },
      })
      console.error('Sign in error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header isAuthPage={true} currentPage="signin" />
      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-gradient-start to-gradient-end py-16 px-4">
        <div className="w-full max-w-md">
          <div className="glass-card p-8 md:p-10">
            <h1 className="text-3xl font-bold text-center mb-8">Sign In</h1>

            <form onSubmit={handleSignIn} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary" />
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-text-secondary" />
                  <Input
                    type="password"
                    placeholder="Enter your password"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>

              <Button type="submit" className="w-full text-white" disabled={isLoading}>
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-text-secondary">
              <Link to="/auth/reset-password" className="hover:text-text">
                Forgot your password?
              </Link>
            </div>

            <div className="mt-4 text-center text-sm text-text-secondary">
              Don't have an account?{' '}
              <Link to="/auth/signup" className="text-primary hover:text-primary/80">
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}
