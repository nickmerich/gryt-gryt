import { type NextRequest, NextResponse } from "next/server"
import { verifyPassword, createSession, cleanupExpiredSessions, getUserByEmail } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password, rememberMe } = body

    console.log(`Login attempt for email: ${email}`)

    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        {
          error: "Email and password are required",
        },
        { status: 400 },
      )
    }

    if (typeof email !== "string" || typeof password !== "string") {
      return NextResponse.json(
        {
          error: "Invalid input format",
        },
        { status: 400 },
      )
    }

    // Clean up expired sessions (non-blocking)
    try {
      await cleanupExpiredSessions()
    } catch (cleanupError) {
      console.warn("Session cleanup failed, continuing with login:", cleanupError)
    }

    // Get user by email
    const user = await getUserByEmail(email)
    if (!user) {
      console.log(`User not found: ${email}`)
      return NextResponse.json(
        {
          error: "Invalid email or password",
        },
        { status: 401 },
      )
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash)
    if (!isValidPassword) {
      console.log(`Invalid password for user: ${email}`)
      return NextResponse.json(
        {
          error: "Invalid email or password",
        },
        { status: 401 },
      )
    }

    // Create session
    const sessionToken = await createSession({
      id: user.id,
      email: user.email,
      username: user.username,
      level: user.level || 1,
      total_gp: user.total_gp || 0,
    })

    // Create response
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        level: user.level || 1,
        total_gp: user.total_gp || 0,
      },
      redirectTo: "/dashboard",
    })

    // Set cookie with appropriate expiration
    const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60 // 30 days or 7 days

    response.cookies.set("session-id", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge,
      path: "/",
    })

    console.log(`Login successful for user: ${email}`)
    return response
  } catch (error) {
    console.error("Login error:", error)

    // Handle specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        {
          error: "Invalid request format",
        },
        { status: 400 },
      )
    }

    return NextResponse.json(
      {
        error: "An unexpected error occurred. Please try again.",
      },
      { status: 500 },
    )
  }
}
