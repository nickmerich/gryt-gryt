import { NextResponse } from "next/server"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // Try to import and check database connection
    let dbHealthy = false
    let dbError = null

    try {
      const { checkDatabaseConnection } = await import("@/lib/database")
      dbHealthy = await checkDatabaseConnection()
    } catch (error) {
      console.error("Database connection check failed:", error)
      dbError = error instanceof Error ? error.message : "Unknown database error"
    }

    const health = {
      status: dbHealthy ? "healthy" : "degraded",
      timestamp: new Date().toISOString(),
      database: dbHealthy ? "connected" : "disconnected",
      environment: process.env.NODE_ENV || "unknown",
      version: process.env.npm_package_version || "1.0.0",
      ...(dbError && { databaseError: dbError }),
    }

    // Return 200 even if database is down, but indicate degraded status
    return NextResponse.json(health, {
      status: 200,
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
