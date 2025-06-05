import { NextResponse } from "next/server"

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json({ error: "Not available in production" }, { status: 403 })
  }

  const envVars = {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_VARS: Object.keys(process.env)
      .filter((key) => key.includes("DATABASE") || key.includes("NEON") || key.includes("POSTGRES"))
      .reduce(
        (acc, key) => {
          acc[key] = process.env[key] ? "SET" : "NOT_SET"
          return acc
        },
        {} as Record<string, string>,
      ),
  }

  return NextResponse.json(envVars)
}
