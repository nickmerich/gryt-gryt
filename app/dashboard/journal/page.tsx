"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, Search, Filter, Calendar, BookOpen, ArrowRight, Edit, Trash2, MoreHorizontal, Tag } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface JournalEntry {
  id: number
  title: string
  excerpt: string
  content: string
  date: string
  mood: "happy" | "neutral" | "sad" | "excited" | "tired"
  tags: string[]
}

export default function JournalPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [journals, setJournals] = useState<JournalEntry[]>([
    {
      id: 1,
      title: "Making progress with meditation",
      excerpt:
        "Today I managed to meditate for 15 minutes without getting distracted. I'm starting to feel the benefits of daily practice.",
      content:
        "Today I managed to meditate for 15 minutes without getting distracted. I'm starting to feel the benefits of daily practice. My mind feels clearer and I'm noticing that I'm less reactive to stressful situations. I've been using the guided meditation app which has been really helpful for keeping me focused.",
      date: "2025-06-03",
      mood: "happy",
      tags: ["meditation", "mindfulness", "progress"],
    },
    {
      id: 2,
      title: "Struggling with consistency",
      excerpt: "I missed my workout today. Need to find a way to stay motivated even when I'm tired after work.",
      content:
        "I missed my workout today. Need to find a way to stay motivated even when I'm tired after work. Maybe I should try morning workouts instead? Or find a workout buddy for accountability? I know exercise makes me feel better but sometimes the initial motivation is hard to find.",
      date: "2025-06-01",
      mood: "sad",
      tags: ["exercise", "motivation", "challenges"],
    },
    {
      id: 3,
      title: "Weekly reflection",
      excerpt:
        "Looking back at this week, I've made good progress with most of my habits. Reading every day has been easier than expected.",
      content:
        "Looking back at this week, I've made good progress with most of my habits. Reading every day has been easier than expected. I've finished two books already this month! The meditation habit is also becoming more natural. Still struggling with consistent exercise but I'm not giving up. Overall, I feel like I'm moving in the right direction.",
      date: "2025-05-28",
      mood: "neutral",
      tags: ["reflection", "reading", "weekly-review"],
    },
    {
      id: 4,
      title: "New goal: Learning Spanish",
      excerpt: "I've decided to add a new habit to my routine - learning Spanish for 15 minutes every day.",
      content:
        "I've decided to add a new habit to my routine - learning Spanish for 15 minutes every day. I've always wanted to learn another language, and with my trip to Spain planned for next year, this seems like the perfect time to start. I've downloaded Duolingo and found some beginner podcasts. Excited to see how much I can learn in the next few months!",
      date: "2025-05-25",
      mood: "excited",
      tags: ["spanish", "learning", "new-habit"],
    },
    {
      id: 5,
      title: "Feeling overwhelmed",
      excerpt:
        "Too many habits at once might be counterproductive. Thinking about prioritizing and maybe dropping some for now.",
      content:
        "Too many habits at once might be counterproductive. Thinking about prioritizing and maybe dropping some for now. I think I need to focus on the core habits that give me the most benefit - meditation, reading, and exercise. The others can wait until these become more automatic. Quality over quantity.",
      date: "2025-05-20",
      mood: "tired",
      tags: ["overwhelm", "prioritization", "self-care"],
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
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  const filteredJournals = journals.filter(
    (journal) =>
      journal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      journal.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      journal.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

  // Group journals by month
  const groupedJournals = filteredJournals.reduce((groups: Record<string, JournalEntry[]>, journal) => {
    const date = new Date(journal.date)
    const monthYear = date.toLocaleDateString("en-US", { month: "long", year: "numeric" })

    if (!groups[monthYear]) {
      groups[monthYear] = []
    }

    groups[monthYear].push(journal)
    return groups
  }, {})

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-black text-black">Journal</h1>
        <Link href="/dashboard/journal/new">
          <Button className="bg-red-500 hover:bg-red-600 text-white rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Plus className="h-4 w-4 mr-2" /> New Entry
          </Button>
        </Link>
      </div>

      <Card className="border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search journal entries..."
              className="pl-9 border-2 border-black rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="rounded-xl border-2 border-black font-bold hover:bg-red-50">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="bg-white/50 border-2 border-black rounded-xl p-1 mb-4">
            <TabsTrigger
              value="all"
              className="rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white font-bold"
            >
              All Entries
            </TabsTrigger>
            <TabsTrigger
              value="moods"
              className="rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white font-bold"
            >
              By Mood
            </TabsTrigger>
            <TabsTrigger
              value="tags"
              className="rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white font-bold"
            >
              By Tag
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            {Object.keys(groupedJournals).length > 0 ? (
              Object.entries(groupedJournals).map(([monthYear, entries]) => (
                <div key={monthYear} className="mb-8">
                  <h2 className="text-xl font-bold mb-4 text-black">{monthYear}</h2>
                  <div className="space-y-4">
                    {entries.map((journal) => (
                      <JournalCard key={journal.id} journal={journal} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <EmptyState query={searchQuery} />
            )}
          </TabsContent>

          <TabsContent value="moods">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {["happy", "excited", "neutral", "tired", "sad"].map((mood) => (
                <Button
                  key={mood}
                  variant="outline"
                  className="border-2 border-black rounded-xl font-bold h-auto py-3 justify-center hover:bg-red-50"
                >
                  <span className="text-2xl mr-2">{getMoodEmoji(mood)}</span>
                  <span className="capitalize">{mood}</span>
                </Button>
              ))}
            </div>

            <div className="space-y-4">
              {filteredJournals
                .filter((journal) => journal.mood === "happy")
                .slice(0, 3)
                .map((journal) => (
                  <JournalCard key={journal.id} journal={journal} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="tags">
            <div className="flex flex-wrap gap-2 mb-6">
              {Array.from(new Set(journals.flatMap((j) => j.tags)))
                .slice(0, 10)
                .map((tag) => (
                  <Button
                    key={tag}
                    variant="outline"
                    size="sm"
                    className="border-2 border-black rounded-xl font-bold hover:bg-red-50"
                  >
                    <Tag className="h-3 w-3 mr-1" /> {tag}
                  </Button>
                ))}
            </div>

            <div className="space-y-4">
              {filteredJournals
                .filter((journal) => journal.tags.includes("meditation"))
                .map((journal) => (
                  <JournalCard key={journal.id} journal={journal} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
            <h2 className="text-lg font-bold">Journal Stats</h2>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="border-2 border-black rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-black">{journals.length}</div>
                <div className="text-sm text-gray-500">Total Entries</div>
              </div>
              <div className="border-2 border-black rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-black">12</div>
                <div className="text-sm text-gray-500">Days Journaled</div>
              </div>
              <div className="border-2 border-black rounded-xl p-4 text-center">
                <div className="text-3xl font-bold">😊</div>
                <div className="text-sm text-gray-500">Most Common Mood</div>
              </div>
              <div className="border-2 border-black rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-black">3</div>
                <div className="text-sm text-gray-500">Current Streak</div>
              </div>
            </div>
          </div>
        </Card>

        <Card className="border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-gradient-to-r from-black to-gray-800 p-4 text-white">
            <h2 className="text-lg font-bold">Mood Tracker</h2>
          </div>
          <div className="p-4">
            <div className="flex flex-col items-center">
              <div className="flex items-end h-40 gap-3 mb-2">
                {["happy", "excited", "neutral", "tired", "sad"].map((mood) => {
                  const count = journals.filter((j) => j.mood === mood).length
                  const height = count > 0 ? (count / journals.length) * 100 : 10

                  return (
                    <div key={mood} className="flex flex-col items-center">
                      <div
                        className={`w-12 rounded-t-lg ${
                          mood === "happy"
                            ? "bg-red-400"
                            : mood === "excited"
                              ? "bg-red-300"
                              : mood === "neutral"
                                ? "bg-gray-400"
                                : mood === "tired"
                                  ? "bg-gray-500"
                                  : "bg-red-500"
                        }`}
                        style={{ height: `${height}%` }}
                      />
                      <div className="text-2xl mt-2">{getMoodEmoji(mood)}</div>
                      <div className="text-xs text-gray-500">{count}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function JournalCard({ journal }: { journal: JournalEntry }) {
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
    <div className="border-2 border-black rounded-xl p-4 hover:bg-red-50 transition-colors">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <Link href={`/dashboard/journal/${journal.id}`}>
            <h3 className="font-bold text-lg hover:text-red-600 transition-colors text-black">{journal.title}</h3>
          </Link>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(journal.date)}</span>
            </div>
            <span className="text-lg">{getMoodEmoji(journal.mood)}</span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Edit className="h-4 w-4 mr-2" /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600">
              <Trash2 className="h-4 w-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <p className="text-gray-600 mb-3 line-clamp-2">{journal.excerpt}</p>

      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {journal.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-xs bg-red-100 px-2 py-1 rounded-full text-red-800">
              {tag}
            </span>
          ))}
          {journal.tags.length > 3 && <span className="text-xs text-gray-500">+{journal.tags.length - 3} more</span>}
        </div>

        <Link href={`/dashboard/journal/${journal.id}`}>
          <Button variant="link" size="sm" className="p-0 h-auto text-red-600">
            Read more <ArrowRight className="h-3 w-3 ml-1" />
          </Button>
        </Link>
      </div>
    </div>
  )
}

function EmptyState({ query }: { query: string }) {
  if (query) {
    return (
      <div className="text-center py-8">
        <Search className="h-12 w-12 text-gray-300 mx-auto mb-2" />
        <h3 className="font-bold text-gray-500 mb-2">No entries found</h3>
        <p className="text-gray-500 mb-4">No journal entries match your search for "{query}"</p>
        <Button
          variant="outline"
          className="rounded-xl border-2 border-black font-bold hover:bg-red-50"
          onClick={() => window.location.reload()}
        >
          Clear search
        </Button>
      </div>
    )
  }

  return (
    <div className="text-center py-8">
      <BookOpen className="h-12 w-12 text-gray-300 mx-auto mb-2" />
      <h3 className="font-bold text-gray-500 mb-2">No journal entries yet</h3>
      <p className="text-gray-500 mb-4">Start documenting your journey and reflections</p>
      <Link href="/dashboard/journal/new">
        <Button className="bg-red-500 hover:bg-red-600 text-white rounded-xl border-2 border-black font-bold">
          <Plus className="h-4 w-4 mr-2" /> Write First Entry
        </Button>
      </Link>
    </div>
  )
}
