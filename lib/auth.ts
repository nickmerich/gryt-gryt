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
    await sql`
      INSERT INTO user_sessions (user_id, session_token, expires_at)
      VALUES (${user.id}, ${sessionToken}, ${expiresAt})
    `
    return sessionToken
  } catch (error) {
    console.error("Failed to create session:", error)
    throw new Error("Session creation failed")
  }
}

export async function getSessionUser(sessionToken: string): Promise<SessionUser | null> {
  try {
    const result = await sql`
      SELECT u.id, u.email, u.username, u.level, u.total_gp
      FROM users u
      JOIN user_sessions s ON u.id = s.user_id
      WHERE s.session_token = ${sessionToken} 
      AND s.expires_at > CURRENT_TIMESTAMP
    `

    return (result[0] as SessionUser) || null
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
  try {
    await sql`
      DELETE FROM user_sessions 
      WHERE session_token = ${sessionToken}
    `
  } catch (error) {
    console.error("Failed to delete session:", error)
  }
}

export async function setAuthCookie(sessionToken: string): Promise<void> {
  const cookieStore = cookies()
  cookieStore.set("session-id", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
    path: "/",
  })
}

export async function clearAuthCookie(): Promise<void> {
  const cookieStore = cookies()
  cookieStore.delete("session-id")
}

function generateSessionToken(): string {
  return crypto.randomUUID()
}

// Cleanup expired sessions
export async function cleanupExpiredSessions(): Promise<void> {
  try {
    await sql`
      DELETE FROM user_sessions 
      WHERE expires_at < CURRENT_TIMESTAMP
    `
  } catch (error) {
    console.error("Failed to cleanup expired sessions:", error)
  }
}
