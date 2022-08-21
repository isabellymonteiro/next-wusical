import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export const middleware = async (req: NextRequest) => {
  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  })

  if (!session) {
    const loginUrl = new URL('/login', req.nextUrl)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/',
    '/discover',
    '/discover/:slug',
    '/quiz',
    '/suggestions',
    '/favorites',
    '/change-password'
  ],
}
