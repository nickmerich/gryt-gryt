import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { sql } from "./database"

export interface SessionUser {
  id: number
  email: string
  username: string
  level: number
  total_gp: number
}

// Password hashing
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12
  return bcrypt.hash(password, saltRounds)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

// Session management
export async function createSession(user: SessionUser): Promise<string> {
  const sessionToken = generateSessionToken()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  try {
    // Clean up any existing sessions for this user
    await sql`
      DELETE FROM user_sessions 
      WHERE user_id = ${user.id}
    `

    // Create new session
    await sql`
      INSERT INTO user_sessions (user_id, session_token, expires_at, created_at)
      VALUES (${user.id}, ${sessionToken}, ${expiresAt}, CURRENT_TIMESTAMP)
    `

    console.log(`Session created for user ${user.id}`)
    return sessionToken
  } catch (error) {
    console.error("Failed to create session:", error)
    throw new Error("Session creation failed")
  }
}

export async function getSessionUser(sessionToken: string): Promise<SessionUser | null> {
  if (!sessionToken || !isValidSessionToken(sessionToken)) {
    return null
  }

  try {
    const result = await sql`
      SELECT u.id, u.email, u.username, u.level, u.total_gp
      FROM users u
      JOIN user_sessions s ON u.id = s.user_id
      WHERE s.session_token = ${sessionToken} 
      AND s.expires_at > CURRENT_TIMESTAMP
    `

    const user = result[0] as SessionUser
    if (user) {
      console.log(`Valid session found for user: ${user.email}`)
    }

    return user || null
  } catch (error) {
    console.error("Failed to get session user:", error)
    return null
  }
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get("session-id")?.value

    if (!sessionToken) {
      return null
    }

    return getSessionUser(sessionToken)
  } catch (error) {
    console.error("Failed to get current user:", error)
    return null
  }
}

export async function deleteSession(sessionToken: string): Promise<void> {
  if (!sessionToken || !isValidSessionToken(sessionToken)) {
    return
  }

  try {
    await sql`
      DELETE FROM user_sessions 
      WHERE session_token = ${sessionToken}
    `
    console.log("Session deleted successfully")
  } catch (error) {
    console.error("Failed to delete session:", error)
  }
}

export function setAuthCookie(sessionToken: string): void {
  const cookieStore = cookies()

  cookieStore.set("session-id", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  })

  console.log("Auth cookie set successfully")
}

export function clearAuthCookie(): void {
  const cookieStore = cookies()
  cookieStore.delete("session-id")
  console.log("Auth cookie cleared")
}

function generateSessionToken(): string {
  return crypto.randomUUID()
}

// Cleanup expired sessions - Fixed to handle database response properly
export async function cleanupExpiredSessions(): Promise<number> {
  try {
    await sql`
      DELETE FROM user_sessions 
      WHERE expires_at < CURRENT_TIMESTAMP
    `

    // Get count of remaining sessions for logging
    const countResult = await sql`
      SELECT COUNT(*) as count FROM user_sessions
    `

    const remainingSessions = countResult[0]?.count || 0
    console.log(`Session cleanup completed. Remaining sessions: ${remainingSessions}`)

    return Number(remainingSessions)
  } catch (error) {
    console.error("Failed to cleanup expired sessions:", error)
    // Don't throw error - cleanup failure shouldn't block login
    return 0
  }
}

// Validate session token format
export function isValidSessionToken(token: string): boolean {
  if (!token || typeof token !== "string") {
    return false
  }

  // UUID v4 format validation
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidRegex.test(token)
}

// Get user by email for login
export async function getUserByEmail(email: string): Promise<any> {
  if (!email || typeof email !== "string") {
    return null
  }

  try {
    const result = await sql`
      SELECT id, email, username, password_hash, level, total_gp, created_at
      FROM users 
      WHERE email = ${email.toLowerCase().trim()}
      LIMIT 1
    `

    return result[0] || null
  } catch (error) {
    console.error("Failed to get user by email:", error)
    return null
  }
}
