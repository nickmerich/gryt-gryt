import { sql } from "@/lib/database"

export type IntegrationType =
  | "fitness"
  | "nutrition"
  | "productivity"
  | "reading"
  | "social"
  | "finance"
  | "mindfulness"

export type IntegrationProvider =
  | "apple_health"
  | "google_fit"
  | "fitbit"
  | "strava"
  | "myfitnesspal"
  | "loseit"
  | "cronometer"
  | "rescuetime"
  | "screen_time"
  | "forest"
  | "kindle"
  | "goodreads"
  | "audible"
  | "libby"
  | "twitter"
  | "facebook"
  | "instagram"
  | "spotify"
  | "youtube"

export interface Integration {
  id: string
  userId: string
  type: IntegrationType
  provider: IntegrationProvider
  accessToken: string
  refreshToken?: string
  expiresAt?: Date
  metadata?: Record<string, any>
  createdAt: Date
  updatedAt: Date
  lastSyncedAt?: Date
  isActive: boolean
  error?: string
}

export interface IntegrationData {
  provider: IntegrationProvider
  data: any
  timestamp: Date
}

export async function createIntegration(
  userId: string,
  type: IntegrationType,
  provider: IntegrationProvider,
  accessToken: string,
  refreshToken?: string,
  expiresAt?: Date,
  metadata?: Record<string, any>,
): Promise<Integration> {
  try {
    const result = await sql`
      INSERT INTO user_integrations (
        user_id, 
        type, 
        provider, 
        access_token, 
        refresh_token, 
        expires_at, 
        metadata,
        is_active
      )
      VALUES (
        ${userId}, 
        ${type}, 
        ${provider}, 
        ${accessToken}, 
        ${refreshToken || null}, 
        ${expiresAt ? expiresAt.toISOString() : null}, 
        ${metadata ? JSON.stringify(metadata) : null},
        true
      )
      RETURNING 
        id, 
        user_id as "userId", 
        type, 
        provider, 
        access_token as "accessToken", 
        refresh_token as "refreshToken", 
        expires_at as "expiresAt", 
        metadata, 
        created_at as "createdAt", 
        updated_at as "updatedAt", 
        last_synced_at as "lastSyncedAt", 
        is_active as "isActive",
        error
    `
    return result[0] as Integration
  } catch (error) {
    console.error("Failed to create integration:", error)
    throw new Error(`Failed to create integration: ${error instanceof Error ? error.message : String(error)}`)
  }
}

export async function getUserIntegrations(userId: string): Promise<Integration[]> {
  try {
    const result = await sql`
      SELECT 
        id, 
        user_id as "userId", 
        type, 
        provider, 
        access_token as "accessToken", 
        refresh_token as "refreshToken", 
        expires_at as "expiresAt", 
        metadata, 
        created_at as "createdAt", 
        updated_at as "updatedAt", 
        last_synced_at as "lastSyncedAt", 
        is_active as "isActive",
        error
      FROM user_integrations
      WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `
    return result as Integration[]
  } catch (error) {
    console.error("Failed to get user integrations:", error)
    return []
  }
}

export async function updateIntegration(
  id: string,
  updates: Partial<Omit<Integration, "id" | "userId" | "createdAt">>,
): Promise<Integration | null> {
  try {
    const updateFields = Object.entries(updates)
      .filter(([_, value]) => value !== undefined)
      .map(([key, value]) => {
        // Convert camelCase to snake_case
        const snakeKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
        return { key: snakeKey, value }
      })

    if (updateFields.length === 0) return null

    // Build the dynamic SQL update statement
    const updateStatements = updateFields.map(({ key }, index) => `${key} = $${index + 1}`)
    const updateValues = updateFields.map(({ value }) =>
      value instanceof Date ? value.toISOString() : typeof value === "object" ? JSON.stringify(value) : value,
    )

    const query = `
      UPDATE user_integrations
      SET ${updateStatements.join(", ")}, updated_at = NOW()
      WHERE id = $${updateFields.length + 1}
      RETURNING 
        id, 
        user_id as "userId", 
        type, 
        provider, 
        access_token as "accessToken", 
        refresh_token as "refreshToken", 
        expires_at as "expiresAt", 
        metadata, 
        created_at as "createdAt", 
        updated_at as "updatedAt", 
        last_synced_at as "lastSyncedAt", 
        is_active as "isActive",
        error
    `

    const result = await sql.query(query, [...updateValues, id])
    return result.rows[0] as Integration
  } catch (error) {
    console.error("Failed to update integration:", error)
    return null
  }
}

export async function deleteIntegration(id: string): Promise<boolean> {
  try {
    await sql`
      DELETE FROM user_integrations
      WHERE id = ${id}
    `
    return true
  } catch (error) {
    console.error("Failed to delete integration:", error)
    return false
  }
}

export async function syncIntegrationData(integration: Integration): Promise<boolean> {
  try {
    // Update last synced timestamp
    await updateIntegration(integration.id, {
      lastSyncedAt: new Date(),
      error: undefined,
    })

    return true
  } catch (error) {
    console.error(`Failed to sync data for ${integration.provider}:`, error)

    // Update with error
    await updateIntegration(integration.id, {
      error: error instanceof Error ? error.message : String(error),
    })

    return false
  }
}
