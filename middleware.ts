import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export const middleware = async (req: NextRequest) => {
  if (req.nextUrl.pathname.startsWith('/_next')) {
    return NextResponse.next();
  }

  const session = await getToken({
    req: req,
    secret: process.env.NEXTAUTH_SECRET,
    raw: true,
  })

  if (!session) {
    const loginUrl = new URL('/', req.nextUrl)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard',
    '/discover',
    '/discover/:slug',
    '/quiz',
    '/suggestions',
    '/change-password'
  ],
}
