export interface Goal {
  id: string
  userId: string
  integrationProvider: string
  integrationType: string
  metric: string
  targetValue: number
  targetType: "daily" | "weekly" | "monthly"
  goalType: "minimum" | "maximum" | "exact"
  color: string
  isActive: boolean
  createdAt: Date
  updatedAt: Date
  deadline?: Date
  description?: string
}

export interface GoalProgress {
  goalId: string
  currentValue: number
  targetValue: number
  percentage: number
  status: "on_track" | "behind" | "ahead" | "completed"
  daysRemaining?: number
}

export class GoalService {
  static async createGoal(goal: Omit<Goal, "id" | "createdAt" | "updatedAt">): Promise<Goal> {
    // In a real implementation, this would make an API call to create the goal
    const newGoal: Goal = {
      id: Math.random().toString(36).substring(7),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...goal,
    }
    return newGoal
  }

  static async getUserGoals(userId: string): Promise<Goal[]> {
    // Mock data for demonstration
    return [
      {
        id: "goal_1",
        userId,
        integrationProvider: "strava",
        integrationType: "fitness",
        metric: "steps",
        targetValue: 10000,
        targetType: "daily",
        goalType: "minimum",
        color: "#ef4444",
        isActive: true,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
        description: "Walk 10,000 steps daily",
      },
      {
        id: "goal_2",
        userId,
        integrationProvider: "myfitnesspal",
        integrationType: "nutrition",
        metric: "calories",
        targetValue: 2000,
        targetType: "daily",
        goalType: "maximum",
        color: "#f97316",
        isActive: true,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
        description: "Stay under 2000 calories per day",
      },
      {
        id: "goal_3",
        userId,
        integrationProvider: "rescuetime",
        integrationType: "productivity",
        metric: "focusTime",
        targetValue: 120,
        targetType: "daily",
        goalType: "minimum",
        color: "#3b82f6",
        isActive: true,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
        description: "Focus for at least 2 hours daily",
      },
      {
        id: "goal_4",
        userId,
        integrationProvider: "goodreads",
        integrationType: "reading",
        metric: "pagesRead",
        targetValue: 30,
        targetType: "daily",
        goalType: "minimum",
        color: "#8b5cf6",
        isActive: true,
        createdAt: new Date("2024-01-01"),
        updatedAt: new Date(),
        description: "Read 30 pages every day",
      },
    ]
  }

  static calculateGoalProgress(goal: Goal, data: any[]): GoalProgress {
    const relevantData = data.filter((d) => d[goal.metric] !== undefined)

    if (relevantData.length === 0) {
      return {
        goalId: goal.id,
        currentValue: 0,
        targetValue: goal.targetValue,
        percentage: 0,
        status: "behind",
      }
    }

    let currentValue = 0

    switch (goal.targetType) {
      case "daily":
        // Use the latest day's value
        currentValue = relevantData[relevantData.length - 1]?.[goal.metric] || 0
        break
      case "weekly":
        // Use the last 7 days average
        const last7Days = relevantData.slice(-7)
        currentValue = last7Days.reduce((sum, d) => sum + (d[goal.metric] || 0), 0) / 7
        break
      case "monthly":
        // Use the last 30 days average
        const last30Days = relevantData.slice(-30)
        currentValue = last30Days.reduce((sum, d) => sum + (d[goal.metric] || 0), 0) / 30
        break
    }

    const percentage = (currentValue / goal.targetValue) * 100

    let status: GoalProgress["status"] = "on_track"

    switch (goal.goalType) {
      case "minimum":
        if (percentage >= 100) status = "completed"
        else if (percentage >= 80) status = "on_track"
        else if (percentage >= 50) status = "behind"
        else status = "behind"
        break
      case "maximum":
        if (percentage <= 100) status = "on_track"
        else status = "ahead"
        break
      case "exact":
        if (Math.abs(percentage - 100) <= 5) status = "on_track"
        else if (percentage < 95) status = "behind"
        else status = "ahead"
        break
    }

    return {
      goalId: goal.id,
      currentValue: Math.round(currentValue),
      targetValue: goal.targetValue,
      percentage: Math.round(percentage),
      status,
    }
  }
}
