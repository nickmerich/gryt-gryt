import { NextResponse } from "next/server"
import { createUser, getUserByEmail } from "@/lib/database"
import { hashPassword, createSession, setAuthCookie } from "@/lib/auth"
import { validateBetaCode, recordBetaRegistration } from "@/lib/beta-utils"

export async function POST(request: Request) {
  try {
    const { email, password, username, inviteCode } = await request.json()

    // Validate beta code
    if (!validateBetaCode(inviteCode)) {
      return NextResponse.json({ message: "Invalid beta invitation code" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create user
    const user = await createUser(email, hashedPassword, username)

    // Record beta registration
    await recordBetaRegistration(inviteCode, user.id)

    // Create session
    const sessionToken = await createSession({
      id: user.id,
      email: user.email,
      username: user.username,
      level: user.level,
      total_gp: user.total_gp,
    })

    // Set auth cookie
    await setAuthCookie(sessionToken)

    return NextResponse.json(
      {
        message: "Registration successful",
        user: {
          id: user.id,
          email: user.email,
          username: user.username,
        },
      },
      { status: 201 },
    )
  } catch (error: any) {
    console.error("Beta registration error:", error)
    return NextResponse.json({ message: error.message || "Registration failed" }, { status: 500 })
  }
}
