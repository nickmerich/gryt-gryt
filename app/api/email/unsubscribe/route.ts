import { type NextRequest, NextResponse } from "next/server"
import { EmailService } from "@/lib/email-service"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.json({ error: "Unsubscribe token is required" }, { status: 400 })
    }

    const emailService = EmailService.getInstance()
    const tokenData = emailService.validateUnsubscribeToken(token)

    if (!tokenData) {
      return NextResponse.json({ error: "Invalid unsubscribe token" }, { status: 400 })
    }

    // In production, update user preferences in database
    console.log(`Unsubscribing user ${tokenData.userId}`)

    return NextResponse.json({
      success: true,
      message: "Successfully unsubscribed from email notifications",
    })
  } catch (error) {
    console.error("Unsubscribe error:", error)
    return NextResponse.json({ error: "Failed to process unsubscribe request" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, types } = body as { email: string; types?: string[] }

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // In production, update specific notification types for the email
    console.log(`Unsubscribing ${email} from types:`, types || "all")

    return NextResponse.json({
      success: true,
      message: "Successfully updated email preferences",
    })
  } catch (error) {
    console.error("Unsubscribe error:", error)
    return NextResponse.json({ error: "Failed to update email preferences" }, { status: 500 })
  }
}
