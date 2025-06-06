export interface GoalStreak {
  id: string
  goalId: string
  userId: string
  currentStreak: number
  longestStreak: number
  lastAchievedDate: Date | null
  streakStartDate: Date | null
  totalAchievements: number
  achievementDates: Date[]
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface StreakMilestone {
  days: number
  title: string
  description: string
  icon: string
  color: string
  gpReward: number
}

export interface StreakStats {
  currentStreak: number
  longestStreak: number
  totalDays: number
  successRate: number
  lastWeekSuccess: number
  monthlyProgress: { month: string; achievements: number; total: number }[]
}

export class GoalStreakService {
  static readonly STREAK_MILESTONES: StreakMilestone[] = [
    { days: 3, title: "Getting Started", description: "3 days in a row!", icon: "🌱", color: "#22c55e", gpReward: 50 },
    {
      days: 7,
      title: "One Week Wonder",
      description: "A full week of success!",
      icon: "⭐",
      color: "#3b82f6",
      gpReward: 100,
    },
    {
      days: 14,
      title: "Two Week Titan",
      description: "Two weeks strong!",
      icon: "💪",
      color: "#8b5cf6",
      gpReward: 200,
    },
    {
      days: 21,
      title: "Habit Former",
      description: "21 days - building habits!",
      icon: "🏗️",
      color: "#f59e0b",
      gpReward: 300,
    },
    {
      days: 30,
      title: "Monthly Master",
      description: "30 days of dedication!",
      icon: "👑",
      color: "#ef4444",
      gpReward: 500,
    },
    {
      days: 50,
      title: "Consistency Champion",
      description: "50 days unstoppable!",
      icon: "🏆",
      color: "#06b6d4",
      gpReward: 750,
    },
    {
      days: 100,
      title: "Century Achiever",
      description: "100 days of excellence!",
      icon: "💎",
      color: "#8b5cf6",
      gpReward: 1000,
    },
    {
      days: 365,
      title: "Year-Long Legend",
      description: "A full year of success!",
      icon: "🌟",
      color: "#f59e0b",
      gpReward: 2000,
    },
  ]

  static async getGoalStreak(goalId: string): Promise<GoalStreak | null> {
    // Mock implementation - in real app, this would query the database
    return {
      id: `streak_${goalId}`,
      goalId,
      userId: "user_1",
      currentStreak: 12,
      longestStreak: 28,
      lastAchievedDate: new Date(),
      streakStartDate: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      totalAchievements: 45,
      achievementDates: this.generateMockAchievementDates(45),
      isActive: true,
      createdAt: new Date("2024-01-01"),
      updatedAt: new Date(),
    }
  }

  static async updateGoalStreak(goalId: string, achieved: boolean, date: Date = new Date()): Promise<GoalStreak> {
    const existingStreak = await this.getGoalStreak(goalId)

    if (!existingStreak) {
      // Create new streak
      return {
        id: `streak_${goalId}`,
        goalId,
        userId: "user_1",
        currentStreak: achieved ? 1 : 0,
        longestStreak: achieved ? 1 : 0,
        lastAchievedDate: achieved ? date : null,
        streakStartDate: achieved ? date : null,
        totalAchievements: achieved ? 1 : 0,
        achievementDates: achieved ? [date] : [],
        isActive: achieved,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    }

    // Update existing streak
    const yesterday = new Date(date)
    yesterday.setDate(yesterday.getDate() - 1)

    const lastAchieved = existingStreak.lastAchievedDate
    const isConsecutive = lastAchieved && this.isSameDay(lastAchieved, yesterday)

    let newCurrentStreak = existingStreak.currentStreak
    let newStreakStartDate = existingStreak.streakStartDate

    if (achieved) {
      if (isConsecutive || existingStreak.currentStreak === 0) {
        newCurrentStreak = existingStreak.currentStreak + 1
        if (existingStreak.currentStreak === 0) {
          newStreakStartDate = date
        }
      } else {
        // Streak broken, start new one
        newCurrentStreak = 1
        newStreakStartDate = date
      }
    } else {
      // Goal not achieved today
      if (lastAchieved && !this.isSameDay(lastAchieved, yesterday)) {
        newCurrentStreak = 0
        newStreakStartDate = null
      }
    }

    const updatedStreak: GoalStreak = {
      ...existingStreak,
      currentStreak: newCurrentStreak,
      longestStreak: Math.max(existingStreak.longestStreak, newCurrentStreak),
      lastAchievedDate: achieved ? date : existingStreak.lastAchievedDate,
      streakStartDate: newStreakStartDate,
      totalAchievements: achieved ? existingStreak.totalAchievements + 1 : existingStreak.totalAchievements,
      achievementDates: achieved ? [...existingStreak.achievementDates, date] : existingStreak.achievementDates,
      isActive: newCurrentStreak > 0,
      updatedAt: new Date(),
    }

    return updatedStreak
  }

  static calculateStreakStats(streak: GoalStreak, totalDays: number): StreakStats {
    const successRate = (streak.totalAchievements / totalDays) * 100

    // Calculate last week success
    const lastWeek = new Date()
    lastWeek.setDate(lastWeek.getDate() - 7)
    const lastWeekAchievements = streak.achievementDates.filter((date) => date >= lastWeek).length
    const lastWeekSuccess = (lastWeekAchievements / 7) * 100

    // Calculate monthly progress
    const monthlyProgress = this.calculateMonthlyProgress(streak.achievementDates)

    return {
      currentStreak: streak.currentStreak,
      longestStreak: streak.longestStreak,
      totalDays: streak.totalAchievements,
      successRate: Math.round(successRate),
      lastWeekSuccess: Math.round(lastWeekSuccess),
      monthlyProgress,
    }
  }

  static getNextMilestone(currentStreak: number): StreakMilestone | null {
    return this.STREAK_MILESTONES.find((milestone) => milestone.days > currentStreak) || null
  }

  static getAchievedMilestones(currentStreak: number): StreakMilestone[] {
    return this.STREAK_MILESTONES.filter((milestone) => milestone.days <= currentStreak)
  }

  static getStreakMotivation(streak: GoalStreak): string {
    const { currentStreak } = streak

    if (currentStreak === 0) {
      return "Every journey begins with a single step. Start your streak today! 🚀"
    } else if (currentStreak < 3) {
      return `Great start! You're ${3 - currentStreak} day${3 - currentStreak === 1 ? "" : "s"} away from your first milestone! 🌱`
    } else if (currentStreak < 7) {
      return `You're building momentum! ${7 - currentStreak} more day${7 - currentStreak === 1 ? "" : "s"} to reach one week! ⭐`
    } else if (currentStreak < 21) {
      return `Fantastic consistency! You're ${21 - currentStreak} day${21 - currentStreak === 1 ? "" : "s"} away from forming a solid habit! 💪`
    } else if (currentStreak < 30) {
      return `You're unstoppable! Just ${30 - currentStreak} more day${30 - currentStreak === 1 ? "" : "s"} to reach a full month! 👑`
    } else {
      return `Incredible dedication! You're a true habit master with ${currentStreak} days! Keep going! 🏆`
    }
  }

  private static isSameDay(date1: Date, date2: Date): boolean {
    return date1.toDateString() === date2.toDateString()
  }

  private static generateMockAchievementDates(count: number): Date[] {
    const dates: Date[] = []
    const today = new Date()

    for (let i = 0; i < count; i++) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      dates.push(date)
    }

    return dates.reverse()
  }

  private static calculateMonthlyProgress(
    achievementDates: Date[],
  ): { month: string; achievements: number; total: number }[] {
    const monthlyData: { [key: string]: { achievements: number; total: number } } = {}

    // Get last 6 months
    for (let i = 5; i >= 0; i--) {
      const date = new Date()
      date.setMonth(date.getMonth() - i)
      const monthKey = date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      const daysInMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

      monthlyData[monthKey] = {
        achievements: 0,
        total: daysInMonth,
      }
    }

    // Count achievements per month
    achievementDates.forEach((date) => {
      const monthKey = date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
      if (monthlyData[monthKey]) {
        monthlyData[monthKey].achievements++
      }
    })

    return Object.entries(monthlyData).map(([month, data]) => ({
      month,
      achievements: data.achievements,
      total: data.total,
    }))
  }
}
