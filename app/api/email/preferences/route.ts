import { type NextRequest, NextResponse } from "next/server"
import { mockEmailPreferences, type EmailPreferences } from "@/lib/email-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // In production, fetch from database
    const preferences = { ...mockEmailPreferences, userId }

    return NextResponse.json({ preferences })
  } catch (error) {
    console.error("Failed to fetch email preferences:", error)
    return NextResponse.json({ error: "Failed to fetch email preferences" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, preferences } = body as { userId: string; preferences: Partial<EmailPreferences> }

    if (!userId) {
      return NextResponse.json({ error: "User ID is required" }, { status: 400 })
    }

    // In production, update database
    const updatedPreferences: EmailPreferences = {
      ...mockEmailPreferences,
      ...preferences,
      userId,
      updatedAt: new Date().toISOString(),
    }

    return NextResponse.json({ preferences: updatedPreferences })
  } catch (error) {
    console.error("Failed to update email preferences:", error)
    return NextResponse.json({ error: "Failed to update email preferences" }, { status: 500 })
  }
}
