
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  const { data: { session } } = await supabase.auth.getSession()

  // Protected routes
  const protectedPaths = [
    '/hire-employee',
    '/companies/manage',
    '/companies/dashboard',
    '/blog/admin',
    '/blog/create',
    '/blog/edit',
  ]

  // Public routes that should never redirect to signin
  const publicPaths = [
    '/',
    '/auth/signin',
    '/auth/signup',
    '/auth/reset-password',
    '/blog',
    '/companies',
    '/contact',
    '/how-it-works',
  ]

  const isProtectedPath = protectedPaths.some(path => 
    request.nextUrl.pathname.startsWith(path)
  )

  const isPublicPath = publicPaths.some(path =>
    request.nextUrl.pathname === path
  )

  // Only redirect to signin if it's a protected path and user is not authenticated
  if (isProtectedPath && !session) {
    return NextResponse.redirect(new URL('/auth/signin', request.url))
  }

  return response
}

export const config = {
  matcher: [
    '/',
    '/auth/:path*',
    '/hire-employee/:path*',
    '/companies/:path*',
    '/blog/:path*',
    '/contact',
    '/how-it-works',
  ],
}
