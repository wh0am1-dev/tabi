import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|icon.png|apple-icon.png|manifest.webmanifest).*)'
  ]
}

export default auth(req => {
  if (!req.auth && req.nextUrl.pathname !== '/login')
    return NextResponse.redirect(new URL('/login', req.nextUrl.origin))

  if (req.auth && req.nextUrl.pathname === '/login')
    return NextResponse.redirect(new URL('/', req.nextUrl.origin))

  return NextResponse.next()
})
