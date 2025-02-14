
import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail } from 'lucide-react'

export default function ResetPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/update-password`,
      })
      if (error) throw error
      setMessage('Check your email for the password reset link')
      setError('')
    } catch (error: any) {
      setError(error.message)
      setMessage('')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gradient-start to-gradient-end">
      <div className="w-full max-w-md">
        <div className="glass-card p-8">
          <h1 className="text-3xl font-bold text-center mb-8">Reset Password</h1>
          
          {error && (
            <div className="bg-red-50 text-red-500 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}

          {message && (
            <div className="bg-green-50 text-green-600 p-4 rounded-lg mb-6">
              {message}
            </div>
          )}

          <form onSubmit={handleResetPassword} className="space-y-6">
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

            <Button type="submit" className="w-full">
              Send Reset Link
            </Button>
          </form>

          <div className="mt-6 text-center text-sm text-text-secondary">
            Remember your password?{' '}
            <Link href="/auth/signin" className="text-primary hover:text-primary/80">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
