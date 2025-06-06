import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getSessionUser, isValidSessionToken } from "@/lib/auth"

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const timestamp = new Date().toISOString()

  console.log(`\n[MIDDLEWARE ${timestamp}] Processing: ${pathname}`)

  // Skip middleware for static files, API routes, and specific paths
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") ||
    pathname === "/favicon.ico" ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/icons/")
  ) {
    console.log(`[MIDDLEWARE] Skipping static/API route: ${pathname}`)
    return NextResponse.next()
  }

  const sessionToken = request.cookies.get("session-id")?.value
  console.log(`[MIDDLEWARE] Session token present: ${sessionToken ? "YES" : "NO"}`)

  if (sessionToken) {
    console.log(`[MIDDLEWARE] Session token: ${sessionToken.substring(0, 8)}...`)
  }

  // Protected routes that require authentication
  const protectedRoutes = ["/dashboard", "/admin"]
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  // Public routes that should redirect if authenticated
  const publicRoutes = ["/login", "/signup"]
  const isPublicRoute = publicRoutes.includes(pathname)

  console.log(`[MIDDLEWARE] Route type: ${isProtectedRoute ? "PROTECTED" : isPublicRoute ? "PUBLIC" : "GENERAL"}`)

  // Handle protected routes
  if (isProtectedRoute) {
    console.log("[MIDDLEWARE] Checking authentication for protected route...")

    if (!sessionToken) {
      console.log("[MIDDLEWARE] No session token - redirecting to login")
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      return NextResponse.redirect(loginUrl)
    }

    if (!isValidSessionToken(sessionToken)) {
      console.log("[MIDDLEWARE] Invalid session token format - redirecting to login")
      const response = NextResponse.redirect(new URL("/login", request.url))
      response.cookies.delete("session-id")
      return response
    }

    try {
      console.log("[MIDDLEWARE] Validating session with database...")
      const user = await getSessionUser(sessionToken)

      if (!user) {
        console.log("[MIDDLEWARE] Session validation failed - redirecting to login")
        const loginUrl = new URL("/login", request.url)
        loginUrl.searchParams.set("redirect", pathname)
        const response = NextResponse.redirect(loginUrl)
        response.cookies.delete("session-id")
        return response
      }

      console.log(`[MIDDLEWARE] Access granted for user: ${user.email} (ID: ${user.id})`)

      // Add user info to headers for debugging
      const response = NextResponse.next()
      response.headers.set("x-user-id", user.id.toString())
      response.headers.set("x-user-email", user.email)
      return response
    } catch (error) {
      console.error("[MIDDLEWARE] Session validation error:", error)
      const loginUrl = new URL("/login", request.url)
      loginUrl.searchParams.set("redirect", pathname)
      const response = NextResponse.redirect(loginUrl)
      response.cookies.delete("session-id")
      return response
    }
  }

  // Handle public routes (redirect authenticated users)
  if (isPublicRoute && sessionToken && isValidSessionToken(sessionToken)) {
    console.log("[MIDDLEWARE] Checking if authenticated user should be redirected...")
    try {
      const user = await getSessionUser(sessionToken)
      if (user) {
        console.log(`[MIDDLEWARE] Redirecting authenticated user ${user.email} to dashboard`)
        return NextResponse.redirect(new URL("/dashboard", request.url))
      }
    } catch (error) {
      console.error("[MIDDLEWARE] Session check error:", error)
      // Continue to public route if session check fails
    }
  }

  console.log("[MIDDLEWARE] Allowing request to proceed")
  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)"],
}
