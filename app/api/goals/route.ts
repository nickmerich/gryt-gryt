import { type NextRequest, NextResponse } from "next/server"
import { getUserFromSession } from "@/lib/auth"
import { GoalService } from "@/lib/goal-service"

export async function GET(request: NextRequest) {
  try {
    const user = await getUserFromSession(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const goals = await GoalService.getUserGoals(user.id)

    return NextResponse.json({ goals })
  } catch (error) {
    console.error("Failed to get goals:", error)
    return NextResponse.json({ error: "Failed to get goals" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getUserFromSession(request)
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const goalData = await request.json()
    const goal = await GoalService.createGoal({
      ...goalData,
      userId: user.id,
    })

    return NextResponse.json({ goal })
  } catch (error) {
    console.error("Failed to create goal:", error)
    return NextResponse.json({ error: "Failed to create goal" }, { status: 500 })
  }
}
