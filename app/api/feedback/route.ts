import { NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"
import { sql } from "@/lib/database"

export async function POST(request: Request) {
  try {
    const user = await getCurrentUser()

    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { type, content } = await request.json()

    if (!type || (type !== "rating" && !content)) {
      return NextResponse.json({ message: "Invalid feedback data" }, { status: 400 })
    }

    // Store feedback in database
    await sql`
      INSERT INTO user_feedback (user_id, feedback_type, content)
      VALUES (${user.id}, ${type}, ${JSON.stringify(content)})
    `

    return NextResponse.json({ message: "Feedback submitted successfully" }, { status: 201 })
  } catch (error: any) {
    console.error("Feedback submission error:", error)
    return NextResponse.json({ message: error.message || "Failed to submit feedback" }, { status: 500 })
  }
}
