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

// Enhanced session management with comprehensive debugging
export async function createSession(user: SessionUser, rememberMe = false): Promise<string> {
  const sessionToken = generateSessionToken()
  const expiresAt = new Date(Date.now() + (rememberMe ? 30 : 7) * 24 * 60 * 60 * 1000)

  try {
    console.log(`[AUTH] Creating session for user ${user.id} (${user.email})`)
    console.log(`[AUTH] Session token: ${sessionToken.substring(0, 8)}...`)
    console.log(`[AUTH] Expires at: ${expiresAt.toISOString()}`)

    // Clean up any existing sessions for this user
    const deleteResult = await sql`
      DELETE FROM user_sessions 
      WHERE user_id = ${user.id}
    `
    console.log(`[AUTH] Cleaned up existing sessions for user ${user.id}`)

    // Create new session
    const insertResult = await sql`
      INSERT INTO user_sessions (user_id, session_token, expires_at, created_at)
      VALUES (${user.id}, ${sessionToken}, ${expiresAt}, CURRENT_TIMESTAMP)
      RETURNING id, user_id, session_token, expires_at
    `

    console.log(`[AUTH] Session created successfully:`, insertResult[0])
    return sessionToken
  } catch (error) {
    console.error("[AUTH] Failed to create session:", error)
    throw new Error("Session creation failed")
  }
}

export async function getSessionUser(sessionToken: string): Promise<SessionUser | null> {
  if (!sessionToken || !isValidSessionToken(sessionToken)) {
    console.log("[AUTH] Invalid or missing session token")
    return null
  }

  try {
    console.log(`[AUTH] Looking up session: ${sessionToken.substring(0, 8)}...`)

    const result = await sql`
      SELECT 
        u.id, 
        u.email, 
        u.username, 
        u.level, 
        u.total_gp, 
        s.expires_at,
        s.created_at
      FROM users u
      JOIN user_sessions s ON u.id = s.user_id
      WHERE s.session_token = ${sessionToken} 
      AND s.expires_at > CURRENT_TIMESTAMP
    `

    console.log(`[AUTH] Session query returned ${result.length} results`)

    const sessionData = result[0]
    if (!sessionData) {
      console.log("[AUTH] No valid session found")
      return null
    }

    const user: SessionUser = {
      id: sessionData.id,
      email: sessionData.email,
      username: sessionData.username,
      level: sessionData.level || 1,
      total_gp: sessionData.total_gp || 0,
    }

    console.log(`[AUTH] Valid session found for user: ${user.email} (ID: ${user.id})`)
    console.log(`[AUTH] Session expires: ${sessionData.expires_at}`)
    return user
  } catch (error) {
    console.error("[AUTH] Failed to get session user:", error)
    return null
  }
}

export async function getCurrentUser(): Promise<SessionUser | null> {
  try {
    const cookieStore = cookies()
    const sessionToken = cookieStore.get("session-id")?.value

    console.log(`[AUTH] getCurrentUser - Session token present: ${sessionToken ? "YES" : "NO"}`)

    if (!sessionToken) {
      console.log("[AUTH] No session token found in cookies")
      return null
    }

    return getSessionUser(sessionToken)
  } catch (error) {
    console.error("[AUTH] Failed to get current user:", error)
    return null
  }
}

export async function deleteSession(sessionToken: string): Promise<void> {
  if (!sessionToken || !isValidSessionToken(sessionToken)) {
    return
  }

  try {
    console.log(`[AUTH] Deleting session: ${sessionToken.substring(0, 8)}...`)

    const result = await sql`
      DELETE FROM user_sessions 
      WHERE session_token = ${sessionToken}
    `

    console.log("[AUTH] Session deleted successfully")
  } catch (error) {
    console.error("[AUTH] Failed to delete session:", error)
  }
}

// Simplified cleanup function to avoid JSON parsing issues
export async function cleanupExpiredSessions(): Promise<void> {
  try {
    console.log("[AUTH] Starting session cleanup...")

    await sql`
      DELETE FROM user_sessions 
      WHERE expires_at < CURRENT_TIMESTAMP
    `

    console.log("[AUTH] Session cleanup completed successfully")
  } catch (error) {
    console.error("[AUTH] Failed to cleanup expired sessions:", error)
    // Don't throw error - cleanup failure shouldn't block login
  }
}

// Validate session token format
export function isValidSessionToken(token: string): boolean {
  if (!token || typeof token !== "string") {
    return false
  }

  // UUID v4 format validation
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  const isValid = uuidRegex.test(token)

  if (!isValid) {
    console.log(`[AUTH] Invalid session token format: ${token.substring(0, 8)}...`)
  }

  return isValid
}

// Get user by email for login
export async function getUserByEmail(email: string): Promise<any> {
  if (!email || typeof email !== "string") {
    return null
  }

  try {
    console.log(`[AUTH] Looking up user by email: ${email}`)

    const result = await sql`
      SELECT id, email, username, password_hash, level, total_gp, created_at
      FROM users 
      WHERE email = ${email.toLowerCase().trim()}
      LIMIT 1
    `

    const user = result[0]
    console.log(`[AUTH] User lookup result: ${user ? "FOUND" : "NOT FOUND"}`)

    if (user) {
      console.log(`[AUTH] User details: ID=${user.id}, Email=${user.email}, Username=${user.username}`)
    }

    return user || null
  } catch (error) {
    console.error("[AUTH] Failed to get user by email:", error)
    return null
  }
}

function generateSessionToken(): string {
  return crypto.randomUUID()
}

// Enhanced cookie management with debugging
export function setAuthCookie(sessionToken: string, rememberMe = false): void {
  const cookieStore = cookies()
  const maxAge = rememberMe ? 30 * 24 * 60 * 60 : 7 * 24 * 60 * 60

  console.log(`[AUTH] Setting auth cookie: ${sessionToken.substring(0, 8)}...`)
  console.log(`[AUTH] Cookie maxAge: ${maxAge} seconds (${rememberMe ? "30 days" : "7 days"})`)

  cookieStore.set("session-id", sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge,
    path: "/",
  })

  console.log("[AUTH] Auth cookie set successfully")
}

export function clearAuthCookie(): void {
  const cookieStore = cookies()
  console.log("[AUTH] Clearing auth cookie")
  cookieStore.delete("session-id")
  console.log("[AUTH] Auth cookie cleared")
}
