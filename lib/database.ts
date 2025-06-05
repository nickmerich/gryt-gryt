import { neon } from "@neondatabase/serverless"

if (!process.env.NEON_NEON_DATABASE_URL) {
  throw new Error("NEON_DATABASE_URL environment variable is required")
}

export const sql = neon(process.env.NEON_DATABASE_URL)

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

// Database helper functions
export async function createUser(email: string, passwordHash: string, username: string): Promise<User> {
  const result = await sql`
    INSERT INTO users (email, password_hash, username)
    VALUES (${email}, ${passwordHash}, ${username})
    RETURNING id, email, username, level, total_gp, current_streak, created_at, updated_at
  `
  return result[0] as User
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const result = await sql`
    SELECT id, email, username, level, total_gp, current_streak, created_at, updated_at
    FROM users 
    WHERE email = ${email}
  `
  return (result[0] as User) || null
}

export async function getUserHabits(userId: number): Promise<Habit[]> {
  const result = await sql`
    SELECT * FROM habits 
    WHERE user_id = ${userId} AND is_active = true
    ORDER BY created_at DESC
  `
  return result as Habit[]
}

export async function createHabit(habitData: Omit<Habit, "id" | "created_at" | "updated_at">): Promise<Habit> {
  const result = await sql`
    INSERT INTO habits (user_id, name, description, category, target_frequency, target_value, target_unit, color, icon)
    VALUES (${habitData.user_id}, ${habitData.name}, ${habitData.description}, ${habitData.category}, 
            ${habitData.target_frequency}, ${habitData.target_value}, ${habitData.target_unit}, 
            ${habitData.color}, ${habitData.icon})
    RETURNING *
  `
  return result[0] as Habit
}

export async function logHabitCompletion(userId: number, habitId: number, value = 1, gpEarned = 10): Promise<HabitLog> {
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
}

export async function getUserAchievements(userId: number): Promise<Achievement[]> {
  const result = await sql`
    SELECT * FROM achievements 
    WHERE user_id = ${userId}
    ORDER BY earned_at DESC
  `
  return result as Achievement[]
}

export async function calculateStreak(userId: number, habitId: number): Promise<number> {
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
}
