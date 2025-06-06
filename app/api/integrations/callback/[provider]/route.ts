import { type NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/auth"
import { createIntegration, type IntegrationType } from "@/lib/integration-service"

// OAuth configuration for different providers
const oauthConfigs = {
  twitter: {
    tokenUrl: "https://api.twitter.com/2/oauth2/token",
    clientId: process.env.TWITTER_CLIENT_ID || "",
    clientSecret: process.env.TWITTER_CLIENT_SECRET || "",
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/callback/twitter`,
    type: "social" as IntegrationType,
  },
  facebook: {
    tokenUrl: "https://graph.facebook.com/v18.0/oauth/access_token",
    clientId: process.env.FACEBOOK_CLIENT_ID || "",
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/callback/facebook`,
    type: "social" as IntegrationType,
  },
  strava: {
    tokenUrl: "https://www.strava.com/oauth/token",
    clientId: process.env.STRAVA_CLIENT_ID || "",
    clientSecret: process.env.STRAVA_CLIENT_SECRET || "",
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/callback/strava`,
    type: "fitness" as IntegrationType,
  },
  fitbit: {
    tokenUrl: "https://api.fitbit.com/oauth2/token",
    clientId: process.env.FITBIT_CLIENT_ID || "",
    clientSecret: process.env.FITBIT_CLIENT_SECRET || "",
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/callback/fitbit`,
    type: "fitness" as IntegrationType,
  },
  goodreads: {
    tokenUrl: "https://www.goodreads.com/oauth/access_token",
    clientId: process.env.GOODREADS_CLIENT_ID || "",
    clientSecret: process.env.GOODREADS_CLIENT_SECRET || "",
    redirectUri: `${process.env.NEXT_PUBLIC_APP_URL}/api/integrations/callback/goodreads`,
    type: "reading" as IntegrationType,
  },
}

export async function GET(request: NextRequest, { params }: { params: { provider: string } }) {
  try {
    const { provider } = params
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get("code")
    const state = searchParams.get("state")
    const error = searchParams.get("error")

    // Check for errors from the OAuth provider
    if (error) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/integrations?error=${error}`)
    }

    if (!code) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/integrations?error=missing_code`)
    }

    // Verify the state parameter (CSRF protection)
    // In a real app, you'd verify against a stored state

    // Get the user session
    const session = await getSession(request)
    if (!session || !session.user) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/login?redirect=/dashboard/integrations`)
    }

    const config = oauthConfigs[provider as keyof typeof oauthConfigs]
    if (!config) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/integrations?error=invalid_provider`)
    }

    // Exchange the authorization code for an access token
    const tokenResponse = await fetch(config.tokenUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64")}`,
      },
      body: new URLSearchParams({
        grant_type: "authorization_code",
        code,
        redirect_uri: config.redirectUri,
      }).toString(),
    })

    if (!tokenResponse.ok) {
      const errorData = await tokenResponse.text()
      console.error("Token exchange error:", errorData)
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/integrations?error=token_exchange_failed`,
      )
    }

    const tokenData = await tokenResponse.json()

    // Store the integration in the database
    await createIntegration(
      session.user.id,
      config.type,
      provider as any,
      tokenData.access_token,
      tokenData.refresh_token,
      tokenData.expires_in ? new Date(Date.now() + tokenData.expires_in * 1000) : undefined,
      { scope: tokenData.scope },
    )

    // Redirect back to the integrations page with success message
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/integrations?success=true&provider=${provider}`,
    )
  } catch (error) {
    console.error("Callback error:", error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard/integrations?error=server_error`)
  }
}
