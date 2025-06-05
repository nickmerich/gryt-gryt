import { type NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/database"
import { verifyPassword, createSession, setAuthCookie } from "@/lib/auth"

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 })
    }

    // Get user with password hash
    const result = await sql`
      SELECT id, email, username, password_hash, level, total_gp
      FROM users 
      WHERE email = ${email}
    `

    const user = result[0]
    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    const isValidPassword = await verifyPassword(password, user.password_hash)
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Create session
    const sessionId = await createSession({
      id: user.id,
      email: user.email,
      username: user.username,
      level: user.level,
      total_gp: user.total_gp,
    })

    // Set auth cookie
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
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
