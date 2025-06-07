import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get("userId")
    const date = searchParams.get("date")
    const tag = searchParams.get("tag")

    if (!userId) {
      return NextResponse.json({ error: "User ID required" }, { status: 400 })
    }

    let query = `
      SELECT 
        je.*,
        COALESCE(
          json_agg(
            json_build_object('id', jt.id, 'name', jt.name, 'color', jt.color)
          ) FILTER (WHERE jt.id IS NOT NULL), 
          '[]'
        ) as tags
      FROM journal_entries je
      LEFT JOIN journal_entry_tags jet ON je.id = jet.entry_id
      LEFT JOIN journal_tags jt ON jet.tag_id = jt.id
      WHERE je.user_id = $1
    `

    const params = [userId]
    let paramIndex = 2

    if (date) {
      query += ` AND je.entry_date = $${paramIndex}`
      params.push(date)
      paramIndex++
    }

    if (tag) {
      query += ` AND jt.name = $${paramIndex}`
      params.push(tag)
      paramIndex++
    }

    query += ` GROUP BY je.id ORDER BY je.entry_date DESC, je.created_at DESC`

    const entries = await sql(query, params)

    return NextResponse.json({ entries })
  } catch (error) {
    console.error("Error fetching journal entries:", error)
    return NextResponse.json({ error: "Failed to fetch entries" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId, title, content, entryDate, tags, moodRating, isPrivate } = await request.json()

    if (!userId || !title || !content || !entryDate) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Create journal entry
    const [entry] = await sql`
      INSERT INTO journal_entries (user_id, title, content, entry_date, mood_rating, is_private)
      VALUES (${userId}, ${title}, ${content}, ${entryDate}, ${moodRating || null}, ${isPrivate || false})
      RETURNING *
    `

    // Handle tags if provided
    if (tags && tags.length > 0) {
      for (const tagName of tags) {
        // Create tag if it doesn't exist
        const [tag] = await sql`
          INSERT INTO journal_tags (user_id, name)
          VALUES (${userId}, ${tagName})
          ON CONFLICT (user_id, name) DO UPDATE SET name = EXCLUDED.name
          RETURNING id
        `

        // Link tag to entry
        await sql`
          INSERT INTO journal_entry_tags (entry_id, tag_id)
          VALUES (${entry.id}, ${tag.id})
          ON CONFLICT (entry_id, tag_id) DO NOTHING
        `
      }
    }

    return NextResponse.json({ entry, success: true })
  } catch (error) {
    console.error("Error creating journal entry:", error)
    return NextResponse.json({ error: "Failed to create entry" }, { status: 500 })
  }
}
