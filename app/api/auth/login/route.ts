import { type NextRequest, NextResponse } from "next/server"
import { verifyPassword, createSession, cleanupExpiredSessions, getUserByEmail } from "@/lib/auth"

export async function POST(request: NextRequest) {
  const timestamp = new Date().toISOString()
  console.log(`\n[LOGIN API ${timestamp}] === LOGIN ATTEMPT START ===`)

  try {
    const body = await request.json()
    const { email, password, rememberMe } = body

    console.log(`[LOGIN API] Email: ${email}`)
    console.log(`[LOGIN API] Remember me: ${rememberMe}`)

    // Validate input
    if (!email || !password) {
      console.log("[LOGIN API] Missing email or password")
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    if (typeof email !== "string" || typeof password !== "string") {
      console.log("[LOGIN API] Invalid input format")
      return NextResponse.json({ error: "Invalid input format" }, { status: 400 })
    }

    // Clean up expired sessions (non-blocking)
    try {
      await cleanupExpiredSessions()
    } catch (cleanupError) {
      console.warn("[LOGIN API] Session cleanup failed, continuing with login:", cleanupError)
    }

    // Get user by email
    console.log("[LOGIN API] Looking up user...")
    const user = await getUserByEmail(email)
    if (!user) {
      console.log(`[LOGIN API] User not found: ${email}`)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    console.log(`[LOGIN API] User found: ${user.email} (ID: ${user.id})`)

    // Verify password
    console.log("[LOGIN API] Verifying password...")
    const isValidPassword = await verifyPassword(password, user.password_hash)
    if (!isValidPassword) {
      console.log(`[LOGIN API] Invalid password for user: ${email}`)
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 })
    }

    console.log("[LOGIN API] Password verified successfully")

    // Create session
    console.log("[LOGIN API] Creating session...")
    const sessionToken = await createSession(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        level: user.level || 1,
        total_gp: user.total_gp || 0,
      },
      rememberMe,
    )

    console.log("[LOGIN API] Session created, preparing response...")

    // Create response with detailed success info
    const responseData = {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        level: user.level || 1,
        total_gp: user.total_gp || 0,
      },
      redirectTo: "/dashboard",
      sessionInfo: {
        tokenPreview: sessionToken.substring(0, 8) + "...",
        rememberMe,
        timestamp,
      },
    }

    const response = NextResponse.json(responseData)

    // Set cookie with appropriate expiration
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60

    response.cookies.set("session-id", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge,
      path: "/",
    })

    console.log(`[LOGIN API] Cookie set with maxAge: ${maxAge} seconds`)
    console.log(`[LOGIN API] Login successful for user: ${email}`)
    console.log(`[LOGIN API] === LOGIN ATTEMPT SUCCESS ===\n`)

    return response
  } catch (error) {
    console.error(`[LOGIN API] === LOGIN ATTEMPT FAILED ===`)
    console.error("[LOGIN API] Login error:", error)

    // Handle specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json({ error: "Invalid request format" }, { status: 400 })
    }

    return NextResponse.json({ error: "An unexpected error occurred. Please try again." }, { status: 500 })
  }
}
