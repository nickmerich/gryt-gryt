// Beta user setup and monitoring script
export interface BetaUser {
  email: string
  name: string
  inviteCode: string
  invitedAt: Date
  registeredAt?: Date
  lastActiveAt?: Date
}

export const BETA_USERS: BetaUser[] = [
  // Add beta user emails here
  { email: "friend1@example.com", name: "Friend 1", inviteCode: "BETA001", invitedAt: new Date() },
  { email: "friend2@example.com", name: "Friend 2", inviteCode: "BETA002", invitedAt: new Date() },
  // ... add more beta users
]

export function generateBetaInviteCode(): string {
  return "BETA" + Math.random().toString(36).substr(2, 6).toUpperCase()
}

export function validateBetaCode(code: string): boolean {
  return BETA_USERS.some((user) => user.inviteCode === code)
}

export function getBetaUserByCode(code: string): BetaUser | null {
  return BETA_USERS.find((user) => user.inviteCode === code) || null
}

// Analytics tracking for beta
export interface BetaMetrics {
  totalInvites: number
  registrations: number
  activeUsers: number
  habitsCreated: number
  completionRate: number
}

export function calculateBetaMetrics(): BetaMetrics {
  const totalInvites = BETA_USERS.length
  const registrations = BETA_USERS.filter((u) => u.registeredAt).length
  const activeUsers = BETA_USERS.filter(
    (u) => u.lastActiveAt && u.lastActiveAt > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  ).length

  return {
    totalInvites,
    registrations,
    activeUsers,
    habitsCreated: 0, // To be calculated from database
    completionRate: 0, // To be calculated from database
  }
}
