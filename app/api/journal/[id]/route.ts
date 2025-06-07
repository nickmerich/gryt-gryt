import { type NextRequest, NextResponse } from "next/server"
import { neon } from "@neondatabase/serverless"

const sql = neon(process.env.NEON_NEON_DATABASE_URL!)

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const entryId = params.id

    const [entry] = await sql`
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
      WHERE je.id = ${entryId}
      GROUP BY je.id
    `

    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 })
    }

    return NextResponse.json({ entry })
  } catch (error) {
    console.error("Error fetching journal entry:", error)
    return NextResponse.json({ error: "Failed to fetch entry" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const entryId = params.id
    const { title, content, entryDate, tags, moodRating, isPrivate } = await request.json()

    // Update journal entry
    const [entry] = await sql`
      UPDATE journal_entries 
      SET title = ${title}, content = ${content}, entry_date = ${entryDate}, 
          mood_rating = ${moodRating || null}, is_private = ${isPrivate || false},
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ${entryId}
      RETURNING *
    `

    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 })
    }

    // Remove existing tags
    await sql`DELETE FROM journal_entry_tags WHERE entry_id = ${entryId}`

    // Handle new tags
    if (tags && tags.length > 0) {
      const userId = entry.user_id

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
          VALUES (${entryId}, ${tag.id})
        `
      }
    }

    return NextResponse.json({ entry, success: true })
  } catch (error) {
    console.error("Error updating journal entry:", error)
    return NextResponse.json({ error: "Failed to update entry" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const entryId = params.id

    const [entry] = await sql`
      DELETE FROM journal_entries 
      WHERE id = ${entryId}
      RETURNING *
    `

    if (!entry) {
      return NextResponse.json({ error: "Entry not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting journal entry:", error)
    return NextResponse.json({ error: "Failed to delete entry" }, { status: 500 })
  }
}
