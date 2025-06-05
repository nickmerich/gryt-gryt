import { neon } from "@neondatabase/serverless"

// Environment variable validation with fallbacks
const getDatabaseUrl = () => {
  // Try multiple possible environment variable names
  const possibleVars = [
    process.env.NEON_NEON_DATABASE_URL,
    process.env.NEON_NEON_DATABASE_URL,
    process.env.DATABASE_URL,
    process.env.POSTGRES_URL,
  ]

  const databaseUrl = possibleVars.find((url) => url && url.trim() !== "")

  if (!databaseUrl) {
    console.error(
      "Available environment variables:",
      Object.keys(process.env).filter(
        (key) => key.includes("DATABASE") || key.includes("NEON") || key.includes("POSTGRES"),
      ),
    )
    throw new Error(`
      Database URL not found. Please set one of the following environment variables:
      - NEON_DATABASE_URL
      - NEON_NEON_DATABASE_URL  
      - DATABASE_URL
      - POSTGRES_URL
      
      Current NODE_ENV: ${process.env.NODE_ENV}
    `)
  }

  return databaseUrl
}

export const sql = neon(getDatabaseUrl())

export interface User {
  id: number
  email: string
  username: string
  level: number
  total_gp: number
  current_streak: number
  created_at: string
  updated_at: string
}

export interface Habit {
  id: number
  user_id: number
  name: string
  description?: string
  category: string
  target_frequency: string
  target_value: number
  target_unit?: string
  color: string
  icon?: string
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface HabitLog {
  id: number
  habit_id: number
  user_id: number
  completed_at: string
  value: number
  notes?: string
  gp_earned: number
}

export interface Achievement {
  id: number
  user_id: number
  achievement_type: string
  achievement_name: string
  description?: string
  gp_reward: number
  earned_at: string
  is_milestone: boolean
}

// Database helper functions with error handling
export async function createUser(email: string, passwordHash: string, username: string): Promise<User> {
  try {
    const result = await sql`
      INSERT INTO users (email, password_hash, username)
      VALUES (${email}, ${passwordHash}, ${username})
      RETURNING id, email, username, level, total_gp, current_streak, created_at, updated_at
    `
    return result[0] as User
  } catch (error: any) {
    console.error("Database error in createUser:", error)
    if (error.message?.includes("duplicate key")) {
      throw new Error("Email or username already exists")
    }
    throw new Error("Failed to create user")
  }
}

export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await sql`
      SELECT id, email, username, level, total_gp, current_streak, created_at, updated_at
      FROM users 
      WHERE email = ${email}
    `
    return (result[0] as User) || null
  } catch (error) {
    console.error("Database error in getUserByEmail:", error)
    return null
  }
}

export async function getUserHabits(userId: number): Promise<Habit[]> {
  try {
    const result = await sql`
      SELECT * FROM habits 
      WHERE user_id = ${userId} AND is_active = true
      ORDER BY created_at DESC
    `
    return result as Habit[]
  } catch (error) {
    console.error("Database error in getUserHabits:", error)
    return []
  }
}

export async function createHabit(habitData: Omit<Habit, "id" | "created_at" | "updated_at">): Promise<Habit> {
  try {
    const result = await sql`
      INSERT INTO habits (user_id, name, description, category, target_frequency, target_value, target_unit, color, icon, is_active)
      VALUES (${habitData.user_id}, ${habitData.name}, ${habitData.description || ""}, ${habitData.category}, 
              ${habitData.target_frequency}, ${habitData.target_value}, ${habitData.target_unit || ""}, 
              ${habitData.color}, ${habitData.icon || ""}, ${habitData.is_active})
      RETURNING *
    `
    return result[0] as Habit
  } catch (error) {
    console.error("Database error in createHabit:", error)
    throw new Error("Failed to create habit")
  }
}

export async function logHabitCompletion(userId: number, habitId: number, value = 1, gpEarned = 10): Promise<HabitLog> {
  try {
    const result = await sql`
      INSERT INTO habit_logs (user_id, habit_id, value, gp_earned)
      VALUES (${userId}, ${habitId}, ${value}, ${gpEarned})
      RETURNING *
    `

    // Update user's total GP
    await sql`
      UPDATE users 
      SET total_gp = total_gp + ${gpEarned}, updated_at = CURRENT_TIMESTAMP
      WHERE id = ${userId}
    `

    return result[0] as HabitLog
  } catch (error) {
    console.error("Database error in logHabitCompletion:", error)
    throw new Error("Failed to log habit completion")
  }
}

export async function getUserAchievements(userId: number): Promise<Achievement[]> {
  try {
    const result = await sql`
      SELECT * FROM achievements 
      WHERE user_id = ${userId}
      ORDER BY earned_at DESC
    `
    return result as Achievement[]
  } catch (error) {
    console.error("Database error in getUserAchievements:", error)
    return []
  }
}

export async function calculateStreak(userId: number, habitId: number): Promise<number> {
  try {
    const result = await sql`
      WITH RECURSIVE streak_calc AS (
        SELECT 
          DATE(completed_at) as log_date,
          ROW_NUMBER() OVER (ORDER BY DATE(completed_at) DESC) as day_num
        FROM habit_logs 
        WHERE user_id = ${userId} AND habit_id = ${habitId}
        AND DATE(completed_at) >= CURRENT_DATE - INTERVAL '30 days'
        GROUP BY DATE(completed_at)
        ORDER BY DATE(completed_at) DESC
      ),
      consecutive_days AS (
        SELECT 
          log_date,
          day_num,
          log_date + INTERVAL '1 day' * day_num as expected_date
        FROM streak_calc
      )
      SELECT COUNT(*) as streak
      FROM consecutive_days
      WHERE expected_date = CURRENT_DATE + INTERVAL '1 day' * day_num
    `

    return result[0]?.streak || 0
  } catch (error) {
    console.error("Database error in calculateStreak:", error)
    return 0
  }
}

// Health check function
export async function checkDatabaseConnection(): Promise<boolean> {
  try {
    await sql`SELECT 1`
    return true
  } catch (error) {
    console.error("Database connection failed:", error)
    return false
  }
}
