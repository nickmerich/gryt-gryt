import { type NextRequest, NextResponse } from "next/server"
import { mockEmailNotifications, type EmailNotification } from "@/lib/email-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const status = searchParams.get("status")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // In production, fetch from database with filters
    let notifications = mockEmailNotifications.filter((n) => n.userId === userId)

    if (status) {
      notifications = notifications.filter((n) => n.status === status)
    }

    return NextResponse.json({ notifications })
  } catch (error) {
    console.error("Failed to fetch scheduled emails:", error)
    return NextResponse.json({ error: "Failed to fetch scheduled emails" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const notification = body as Omit<EmailNotification, "id" | "createdAt" | "updatedAt">

    // In production, save to database and schedule for delivery
    const scheduledNotification: EmailNotification = {
      ...notification,
      id: `email_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    console.log("Scheduled email notification:", scheduledNotification)

    return NextResponse.json({ notification: scheduledNotification })
  } catch (error) {
    console.error("Failed to schedule email:", error)
    return NextResponse.json({ error: "Failed to schedule email notification" }, { status: 500 })
  }
}
