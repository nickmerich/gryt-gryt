import { type NextRequest, NextResponse } from "next/server"
import { getUserFromSession } from "@/lib/auth"
import { GoalStreakService } from "@/lib/goal-streak-service"

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromSession(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const goalId = searchParams.get("goalId")

    if (!goalId) {
      return NextResponse.json({ error: "Goal ID is required" }, { status: 400 })
    }

    const streak = await GoalStreakService.getGoalStreak(goalId)
    if (!streak) {
      return NextResponse.json({ error: "Streak not found" }, { status: 404 })
    }

    const stats = GoalStreakService.calculateStreakStats(streak, 30) // Last 30 days
    const nextMilestone = GoalStreakService.getNextMilestone(streak.currentStreak)
    const achievedMilestones = GoalStreakService.getAchievedMilestones(streak.currentStreak)
    const motivation = GoalStreakService.getStreakMotivation(streak)

    return NextResponse.json({
      streak,
      stats,
      nextMilestone,
      achievedMilestones,
      motivation,
    })
  } catch (error) {
    console.error("Failed to get goal streak:", error)
    return NextResponse.json({ error: "Failed to get goal streak" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromSession(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { goalId, achieved, date } = await request.json()

    if (!goalId || typeof achieved !== "boolean") {
      return NextResponse.json({ error: "Goal ID and achieved status are required" }, { status: 400 })
    }

    const streak = await GoalStreakService.updateGoalStreak(goalId, achieved, date ? new Date(date) : new Date())

    const stats = GoalStreakService.calculateStreakStats(streak, 30)
    const nextMilestone = GoalStreakService.getNextMilestone(streak.currentStreak)
    const motivation = GoalStreakService.getStreakMotivation(streak)

    return NextResponse.json({
      streak,
      stats,
      nextMilestone,
      motivation,
    })
  } catch (error) {
    console.error("Failed to update goal streak:", error)
    return NextResponse.json({ error: "Failed to update goal streak" }, { status: 500 })
  }
}
