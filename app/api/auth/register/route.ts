import { type NextRequest, NextResponse } from "next/server"
import { createUser } from "@/lib/database"
import { hashPassword, createSession, setAuthCookie } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password, username } = await request.json()

    if (!email || !password || !username) {
      return NextResponse.json({ error: "Email, password, and username are required" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters" }, { status: 400 })
    }

    const passwordHash = await hashPassword(password)

    try {
      const user = await createUser(email, passwordHash, username)

      // Create session
      const sessionId = await createSession({
        id: user.id,
        email: user.email,
        username: user.username,
        level: user.level,
        total_gp: user.total_gp,
      })

      await setAuthCookie(sessionId)

      return NextResponse.json({
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
          level: user.level,
          total_gp: user.total_gp,
        },
      })
    } catch (error: any) {
      if (error.message?.includes("duplicate key")) {
        return NextResponse.json({ error: "Email or username already exists" }, { status: 409 })
      }
      throw error
    }
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
