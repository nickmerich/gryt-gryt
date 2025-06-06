import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { getUserIntegrations, deleteIntegration, syncIntegrationData } from "@/lib/integration-service"

export async function GET(request: NextRequest) {
  try {
    // Get the user session
    const session = await getSession(request)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Get the user's integrations
    const integrations = await getUserIntegrations(session.user.id)

    // Remove sensitive data before returning
    const safeIntegrations = integrations.map((integration) => {
      const { accessToken, refreshToken, ...safeData } = integration
      return {
        ...safeData,
        hasValidToken: !!accessToken && (!integration.expiresAt || new Date(integration.expiresAt) > new Date()),
      }
    })

    return NextResponse.json({ integrations: safeIntegrations })
  } catch (error) {
    console.error("Failed to get integrations:", error)
    return NextResponse.json({ error: "Failed to get integrations" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Get the user session
    const session = await getSession(request)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Get the integration ID from the request body
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ error: "Integration ID is required" }, { status: 400 })
    }

    // Delete the integration
    const success = await deleteIntegration(id)

    if (!success) {
      return NextResponse.json({ error: "Failed to delete integration" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete integration:", error)
    return NextResponse.json({ error: "Failed to delete integration" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    // Get the user session
    const session = await getSession(request)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    // Get the integration ID from the request body
    const { id, action } = await request.json()
    if (!id) {
      return NextResponse.json({ error: "Integration ID is required" }, { status: 400 })
    }

    if (action === "sync") {
      // Get the user's integrations
      const integrations = await getUserIntegrations(session.user.id)
      const integration = integrations.find((i) => i.id === id)

      if (!integration) {
        return NextResponse.json({ error: "Integration not found" }, { status: 404 })
      }

      // Sync the integration data
      const success = await syncIntegrationData(integration)

      if (!success) {
        return NextResponse.json({ error: "Failed to sync integration data" }, { status: 500 })
      }

      return NextResponse.json({ success: true })
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 })
  } catch (error) {
    console.error("Failed to process integration action:", error)
    return NextResponse.json({ error: "Failed to process integration action" }, { status: 500 })
  }
}
