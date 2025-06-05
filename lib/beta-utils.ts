import { sql } from "./database"

// Beta user types
export interface BetaUser {
  id: string
  email: string
  name: string
  inviteCode: string
  invitedAt: Date
  registeredAt?: Date
  userId?: number
  lastActiveAt?: Date
}

// In-memory beta users for development
// In production, these would be stored in the database
const BETA_USERS: BetaUser[] = [
  {
    id: "beta-1",
    email: "friend1@example.com",
    name: "Alex Johnson",
    inviteCode: "BETA001",
    invitedAt: new Date(),
  },
  {
    id: "beta-2",
    email: "friend2@example.com",
    name: "Jamie Smith",
    inviteCode: "BETA002",
    invitedAt: new Date(),
  },
  {
    id: "beta-3",
    email: "friend3@example.com",
    name: "Taylor Brown",
    inviteCode: "BETA003",
    invitedAt: new Date(),
  },
  // Add more beta users as needed
]

// Beta code validation
export function validateBetaCode(code: string): boolean {
  return BETA_USERS.some((user) => user.inviteCode === code)
}

// Get beta user by code
export function getBetaUserByCode(code: string): BetaUser | null {
  return BETA_USERS.find((user) => user.inviteCode === code) || null
}

// Record beta registration
export async function recordBetaRegistration(inviteCode: string, userId: number): Promise<void> {
  try {
    // Find the beta user
    const betaUser = BETA_USERS.find((user) => user.inviteCode === inviteCode)

    if (betaUser) {
      // Update in-memory for development
      betaUser.registeredAt = new Date()
      betaUser.userId = userId

      // In production, update the database
      await sql`
        INSERT INTO beta_users (invite_code, email, name, user_id, registered_at)
        VALUES (${inviteCode}, ${betaUser.email}, ${betaUser.name}, ${userId}, ${new Date()})
        ON CONFLICT (invite_code) 
        DO UPDATE SET user_id = ${userId}, registered_at = ${new Date()}
      `
    }
  } catch (error) {
    console.error("Failed to record beta registration:", error)
  }
}

// Record beta user activity
export async function recordBetaActivity(userId: number): Promise<void> {
  try {
    // Find the beta user
    const betaUser = BETA_USERS.find((user) => user.userId === userId)

    if (betaUser) {
      // Update in-memory for development
      betaUser.lastActiveAt = new Date()

      // In production, update the database
      await sql`
        UPDATE beta_users 
        SET last_active_at = ${new Date()}
        WHERE user_id = ${userId}
      `
    }
  } catch (error) {
    console.error("Failed to record beta activity:", error)
  }
}

// Generate new beta invite code
export function generateBetaInviteCode(): string {
  return "BETA" + Math.random().toString(36).substring(2, 8).toUpperCase()
}

// Get beta metrics
export async function getBetaMetrics(): Promise<{
  totalInvites: number
  registrations: number
  activeUsers: number
}> {
  // For development, calculate from in-memory data
  const totalInvites = BETA_USERS.length
  const registrations = BETA_USERS.filter((u) => u.registeredAt).length
  const activeUsers = BETA_USERS.filter(
    (u) => u.lastActiveAt && u.lastActiveAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  ).length

  // In production, query the database
  try {
    const metrics = await sql`
      SELECT 
        COUNT(*) as total_invites,
        COUNT(registered_at) as registrations,
        COUNT(CASE WHEN last_active_at > NOW() - INTERVAL '7 days' THEN 1 END) as active_users
      FROM beta_users
    `

    return {
      totalInvites: metrics[0]?.total_invites || totalInvites,
      registrations: metrics[0]?.registrations || registrations,
      activeUsers: metrics[0]?.active_users || activeUsers,
    }
  } catch (error) {
    console.error("Failed to get beta metrics:", error)

    // Fall back to in-memory data
    return {
      totalInvites,
      registrations,
      activeUsers,
    }
  }
}
