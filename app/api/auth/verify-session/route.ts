import { type NextRequest, NextResponse } from "next/server"
import { getCurrentUser } from "@/lib/auth"

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    console.log("[VERIFY SESSION] Checking current user session...")

    const user = await getCurrentUser()

    if (!user) {
      console.log("[VERIFY SESSION] No valid session found")
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    console.log(`[VERIFY SESSION] Valid session found for user: ${user.email}`)
    return NextResponse.json({
      authenticated: true,
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        level: user.level,
        total_gp: user.total_gp,
      },
    })
  } catch (error) {
    console.error("[VERIFY SESSION] Session verification error:", error)
    return NextResponse.json({ error: "Session verification failed" }, { status: 500 })
  }
}
