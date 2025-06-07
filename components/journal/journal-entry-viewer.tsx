"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Edit, Trash2, ArrowLeft, Lock } from "lucide-react"
import { format } from "date-fns"

interface JournalEntry {
  id: number
  title: string
  content: string
  entry_date: string
  tags: Array<{ id: number; name: string; color: string }>
  mood_rating?: number
  is_private: boolean
  created_at: string
  updated_at: string
}

interface JournalEntryViewerProps {
  entry: JournalEntry
  onEdit: () => void
  onDelete: () => void
  onBack: () => void
}

export default function JournalEntryViewer({ entry, onEdit, onDelete, onBack }: JournalEntryViewerProps) {
  const getMoodEmoji = (rating?: number) => {
    const emojis = ["😢", "😕", "😐", "😊", "😄"]
    const labels = ["Very Sad", "Sad", "Neutral", "Happy", "Very Happy"]
    return rating ? { emoji: emojis[rating - 1], label: labels[rating - 1] } : null
  }

  const mood = getMoodEmoji(entry.mood_rating)

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <Button variant="outline" onClick={onBack} className="border-2 border-black w-fit">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Journal
        </Button>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={onEdit}
            className="border-2 border-blue-300 hover:border-blue-400 text-blue-600"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Button
            variant="destructive"
            onClick={() => {
              if (confirm("Are you sure you want to delete this entry?")) {
                onDelete()
              }
            }}
            className="bg-red-500 hover:bg-red-600 border-2 border-black"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      {/* Entry Card */}
      <Card className="border-4 border-black bg-white">
        <CardHeader className="bg-gray-50 border-b-4 border-black">
          <div className="space-y-4">
            {/* Title and Privacy */}
            <div className="flex items-start justify-between gap-4">
              <CardTitle className="text-2xl font-black text-black leading-tight">{entry.title}</CardTitle>
              {entry.is_private && (
                <Badge variant="secondary" className="bg-gray-200 text-gray-700 border border-gray-400">
                  <Lock className="h-3 w-3 mr-1" />
                  Private
                </Badge>
              )}
            </div>

            {/* Meta Information */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span className="font-semibold">{format(new Date(entry.entry_date), "EEEE, MMMM dd, yyyy")}</span>
              </div>

              {mood && (
                <div className="flex items-center gap-2">
                  <span className="text-lg">{mood.emoji}</span>
                  <span className="font-semibold">{mood.label}</span>
                </div>
              )}

              <div className="text-xs text-gray-500">
                {entry.created_at !== entry.updated_at ? (
                  <>Updated {format(new Date(entry.updated_at), "MMM dd, yyyy • h:mm a")}</>
                ) : (
                  <>Created {format(new Date(entry.created_at), "MMM dd, yyyy • h:mm a")}</>
                )}
              </div>
            </div>

            {/* Tags */}
            {entry.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {entry.tags.map((tag) => (
                  <Badge
                    key={tag.id}
                    variant="secondary"
                    className="bg-green-100 text-green-800 border border-green-600"
                  >
                    {tag.name}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6">
          {/* Content */}
          <div
            className="prose prose-lg max-w-none text-gray-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: entry.content }}
          />
        </CardContent>
      </Card>
    </div>
  )
}
