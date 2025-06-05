import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { sql } from "./database"

export interface AuthUser {
  id: number
  email: string
  username: string
  level: number
  total_gp: number
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function createSession(user: AuthUser): Promise<string> {
  const sessionId = crypto.randomUUID()
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days

  await sql`
    INSERT INTO user_sessions (id, user_id, expires_at)
    VALUES (${sessionId}, ${user.id}, ${expiresAt})
  `

  return sessionId
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const cookieStore = cookies()
    const sessionId = cookieStore.get("session-id")?.value

    if (!sessionId) return null

    const result = await sql`
      SELECT u.id, u.email, u.username, u.level, u.total_gp
      FROM users u
      JOIN user_sessions s ON u.id = s.user_id
      WHERE s.id = ${sessionId} AND s.expires_at > NOW()
    `

    return (result[0] as AuthUser) || null
  } catch {
    return null
  }
}

export async function setAuthCookie(sessionId: string) {
  const cookieStore = cookies()

  cookieStore.set("session-id", sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  })
}

export async function clearAuthCookie() {
  const cookieStore = cookies()
  const sessionId = cookieStore.get("session-id")?.value

  if (sessionId) {
    // Delete session from database
    await sql`DELETE FROM user_sessions WHERE id = ${sessionId}`
  }

  cookieStore.delete("session-id")
}
