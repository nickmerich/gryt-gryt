"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, ArrowRight, BookOpen } from "lucide-react"

interface JournalEntry {
  id: number
  title: string
  excerpt: string
  date: string
  mood: "happy" | "neutral" | "sad" | "excited" | "tired"
}

export default function RecentJournals() {
  const [journals, setJournals] = useState<JournalEntry[]>([
    {
      id: 1,
      title: "Making progress with meditation",
      excerpt:
        "Today I managed to meditate for 15 minutes without getting distracted. I'm starting to feel the benefits...",
      date: "2025-06-03",
      mood: "happy",
    },
    {
      id: 2,
      title: "Struggling with consistency",
      excerpt: "I missed my workout today. Need to find a way to stay motivated even when I'm tired after work...",
      date: "2025-06-01",
      mood: "sad",
    },
    {
      id: 3,
      title: "Weekly reflection",
      excerpt:
        "Looking back at this week, I've made good progress with most of my habits. Reading every day has been...",
      date: "2025-05-28",
      mood: "neutral",
    },
  ])

  const getMoodEmoji = (mood: string) => {
    switch (mood) {
      case "happy":
        return "😊"
      case "neutral":
        return "😐"
      case "sad":
        return "😔"
      case "excited":
        return "😃"
      case "tired":
        return "😴"
      default:
        return "😐"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
  }

  return (
    <div className="space-y-4">
      {journals.length > 0 ? (
        <>
          {journals.map((journal) => (
            <Link href={`/dashboard/journal/${journal.id}`} key={journal.id}>
              <div className="border-2 border-black rounded-xl p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{journal.title}</h3>
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{formatDate(journal.date)}</span>
                    <span className="text-lg ml-1">{getMoodEmoji(journal.mood)}</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{journal.excerpt}</p>
              </div>
            </Link>
          ))}

          <div className="text-center pt-2">
            <Link href="/dashboard/journal">
              <Button variant="link" className="text-amber-600">
                View all journal entries <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </div>
        </>
      ) : (
        <div className="text-center py-8">
          <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-2" />
          <h3 className="font-bold text-gray-500 mb-2">No Journal Entries Yet</h3>
          <p className="text-gray-500 mb-4">Start documenting your journey and reflections</p>
          <Link href="/dashboard/journal/new">
            <Button className="bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold">
              Write First Entry
            </Button>
          </Link>
        </div>
      )}
    </div>
  )
}
