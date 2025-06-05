import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { getUserHabits, createHabit } from "@/lib/database"

export async function GET() {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const habits = await getUserHabits(user.id)
    return NextResponse.json({ habits })
  } catch (error) {
    console.error("Get habits error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const habitData = await request.json()

    const habit = await createHabit({
      user_id: user.id,
      name: habitData.name,
      description: habitData.description || "",
      category: habitData.category || "General",
      target_frequency: habitData.target_frequency || "daily",
      target_value: habitData.target_value || 1,
      target_unit: habitData.target_unit || "",
      color: habitData.color || "#22c55e",
      icon: habitData.icon || "",
      is_active: true,
    })

    return NextResponse.json({ habit })
  } catch (error) {
    console.error("Create habit error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
