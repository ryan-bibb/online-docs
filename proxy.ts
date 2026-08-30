import { NextRequest, NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

const publicRoutes = ['/login', '/signup']

const secretKey = process.env.SESSION_SECRET
const encodedKey = secretKey ? new TextEncoder().encode(secretKey) : null

async function hasValidSession(req: NextRequest) {
  const cookie = req.cookies.get('session')?.value
  if (!cookie || !encodedKey) return false

  try {
    await jwtVerify(cookie, encodedKey, { algorithms: ['HS256'] })
    return true
  } catch {
    return false
  }
}

export default async function proxy(req: NextRequest) {
  const isPublicRoute = publicRoutes.includes(req.nextUrl.pathname)
  const authenticated = await hasValidSession(req)

  if (!isPublicRoute && !authenticated) {
    return NextResponse.redirect(new URL('/login', req.nextUrl))
  }

  if (isPublicRoute && authenticated) {
    return NextResponse.redirect(new URL('/home', req.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}
