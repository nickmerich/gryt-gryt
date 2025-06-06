import { type NextRequest, NextResponse } from "next/server"
import { EmailService, type EmailNotification } from "@/lib/email-service"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { notifications } = body as { notifications: Omit<EmailNotification, "id" | "createdAt" | "updatedAt">[] }

    if (!notifications || !Array.isArray(notifications)) {
      return NextResponse.json({ error: "Invalid notifications data" }, { status: 400 })
    }

    const emailService = EmailService.getInstance()

    if (notifications.length === 1) {
      const success = await emailService.sendEmail(notifications[0])
      return NextResponse.json({ success, sent: success ? 1 : 0, failed: success ? 0 : 1 })
    } else {
      const results = await emailService.sendBulkEmails(notifications)
      const sent = results.filter(Boolean).length
      const failed = results.length - sent

      return NextResponse.json({
        success: sent > 0,
        sent,
        failed,
        results,
      })
    }
  } catch (error) {
    console.error("Email send error:", error)
    return NextResponse.json({ error: "Failed to send email notifications" }, { status: 500 })
  }
}
