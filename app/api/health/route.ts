import { NextResponse } from "next/server"
import { checkDatabaseConnection } from "@/lib/database"

export async function GET() {
  try {
    const dbHealthy = await checkDatabaseConnection()

    const health = {
      status: dbHealthy ? "healthy" : "unhealthy",
      timestamp: new Date().toISOString(),
      database: dbHealthy ? "connected" : "disconnected",
      environment: process.env.NODE_ENV || "unknown",
      version: process.env.npm_package_version || "1.0.0",
    }

    return NextResponse.json(health, {
      status: dbHealthy ? 200 : 503,
    })
  } catch (error) {
    console.error("Health check failed:", error)
    return NextResponse.json(
      {
        status: "error",
        message: "Health check failed",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
