import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"

export const dynamic = "force-dynamic"

// OAuth configuration for different providers
const oauthConfigs = {
  twitter: {
    authUrl: "https://twitter.com/i/oauth2/authorize",
    clientId: process.env.TWITTER_CLIENT_ID || "",
    scope: "tweet.read users.read offline.access",
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/callback/twitter`,
  },
  facebook: {
    authUrl: "https://www.facebook.com/v18.0/dialog/oauth",
    clientId: process.env.FACEBOOK_CLIENT_ID || "",
    scope: "public_profile,user_posts",
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/callback/facebook`,
  },
  strava: {
    authUrl: "https://www.strava.com/oauth/authorize",
    clientId: process.env.STRAVA_CLIENT_ID || "",
    scope: "read,activity:read",
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/callback/strava`,
  },
  fitbit: {
    authUrl: "https://www.fitbit.com/oauth2/authorize",
    clientId: process.env.FITBIT_CLIENT_ID || "",
    scope: "activity heartrate sleep",
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/callback/fitbit`,
  },
  goodreads: {
    authUrl: "https://www.goodreads.com/oauth/authorize",
    clientId: process.env.GOODREADS_CLIENT_ID || "",
    scope: "read",
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/callback/goodreads`,
  },
}

export async function GET(request: NextRequest) {
  try {
    // Get the provider from the query string
    const url = new URL(request.url)
    const provider = url.searchParams.get("provider")

    if (!provider || !oauthConfigs[provider as keyof typeof oauthConfigs]) {
      return NextResponse.json({ error: "Invalid or unsupported provider" }, { status: 400 })
    }

    // Get the user session
    const session = await getSession(request)
    if (!session || !session.user) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 })
    }

    const config = oauthConfigs[provider as keyof typeof oauthConfigs]

    // Generate a random state for CSRF protection
    const state = crypto.randomUUID()

    // Store the state in the session or a database for verification later
    // This is simplified - in a real app, you'd store this securely

    // Build the authorization URL
    const authUrl = new URL(config.authUrl)
    authUrl.searchParams.append("client_id", config.clientId)
    authUrl.searchParams.append("redirect_uri", config.redirectUri)
    authUrl.searchParams.append("scope", config.scope)
    authUrl.searchParams.append("state", state)
    authUrl.searchParams.append("response_type", "code")

    // Redirect to the authorization URL
    return NextResponse.json({ url: authUrl.toString() })
  } catch (error) {
    console.error("Authorization error:", error)
    return NextResponse.json({ error: "Failed to initiate authorization" }, { status: 500 })
  }
}
