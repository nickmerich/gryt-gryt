import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSessionUser, isValidSessionToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for static files, API routes, and specific paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/icons/")
  ) {
    return NextResponse.next()
  }

  const sessionToken = request.cookies.get("session-id")?.value

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/studio", "/admin"]
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Public routes that should redirect if authenticated
  const publicRoutes = ["/login", "/signup"]
  const isPublicRoute = publicRoutes.includes(pathname)

  console.log(`Middleware: ${pathname}, Session: ${sessionToken ? "exists" : "none"}`)

  if (isProtectedRoute) {
    if (!sessionToken) {
      console.log(`Redirecting to login: no session token`)
      return NextResponse.redirect(new URL("/login", request.url))
    }

    if (!isValidSessionToken(sessionToken)) {
      console.log(`Redirecting to login: invalid session token format`)
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.delete("session-id")
      return response
    }

    try {
      const user = await getSessionUser(sessionToken)
      if (!user) {
        console.log(`Redirecting to login: invalid session`)
        const response = NextResponse.redirect(new URL("/login", request.url))
        response.cookies.delete("session-id")
        return response
      }
      console.log(`Access granted for user: ${user.email}`)
    } catch (error) {
      console.error("Session validation error:", error)
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.delete("session-id")
      return response
    }
  }

  if (isPublicRoute && sessionToken && isValidSessionToken(sessionToken)) {
    try {
      const user = await getSessionUser(sessionToken)
      if (user) {
        console.log(`Redirecting authenticated user to dashboard`)
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch (error) {
      console.error("Session check error:", error)
      // Continue to public route if session check fails
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
