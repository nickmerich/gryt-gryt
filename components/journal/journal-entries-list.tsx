"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Search, Filter, Edit, Trash2, Eye, Lock } from "lucide-react"
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

interface JournalEntriesListProps {
  entries: JournalEntry[]
  onEdit: (entry: JournalEntry) => void
  onDelete: (id: number) => void
  onView: (entry: JournalEntry) => void
  isLoading?: boolean
}

export default function JournalEntriesList({
  entries,
  onEdit,
  onDelete,
  onView,
  isLoading = false,
}: JournalEntriesListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTag, setSelectedTag] = useState<string>("all") // Updated default value
  const [sortBy, setSortBy] = useState<"date" | "title" | "mood">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")

  // Get all unique tags
  const allTags = Array.from(new Set(entries.flatMap((entry) => entry.tags.map((tag) => tag.name))))

  // Filter and sort entries
  const filteredEntries = entries
    .filter((entry) => {
      const matchesSearch =
        entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        entry.content.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesTag = selectedTag === "all" || entry.tags.some((tag) => tag.name === selectedTag)
      return matchesSearch && matchesTag
    })
    .sort((a, b) => {
      let comparison = 0

      switch (sortBy) {
        case "date":
          comparison = new Date(a.entry_date).getTime() - new Date(b.entry_date).getTime()
          break
        case "title":
          comparison = a.title.localeCompare(b.title)
          break
        case "mood":
          comparison = (a.mood_rating || 0) - (b.mood_rating || 0)
          break
      }

      return sortOrder === "desc" ? -comparison : comparison
    })

  const getMoodEmoji = (rating?: number) => {
    const emojis = ["😢", "😕", "😐", "😊", "😄"]
    return rating ? emojis[rating - 1] : "😐"
  }

  const stripHtml = (html: string) => {
    return html.replace(/<[^>]*>/g, "").substring(0, 150) + "..."
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <Card key={i} className="border-4 border-black animate-pulse">
            <CardHeader className="bg-gray-200 h-20" />
            <CardContent className="bg-gray-100 h-32" />
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filters */}
      <Card className="border-4 border-black bg-white">
        <CardHeader className="bg-gray-50 border-b-4 border-black">
          <CardTitle className="text-lg font-black text-black">
            <Filter className="inline mr-2 h-5 w-5" />
            Filter & Search
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search entries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-2 border-gray-300"
              />
            </div>

            {/* Tag Filter */}
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="border-2 border-gray-300">
                <SelectValue placeholder="Filter by tag" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All tags</SelectItem> {/* Updated value prop */}
                {allTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort By */}
            <Select value={sortBy} onValueChange={(value: "date" | "title" | "mood") => setSortBy(value)}>
              <SelectTrigger className="border-2 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="date">Sort by Date</SelectItem>
                <SelectItem value="title">Sort by Title</SelectItem>
                <SelectItem value="mood">Sort by Mood</SelectItem>
              </SelectContent>
            </Select>

            {/* Sort Order */}
            <Select value={sortOrder} onValueChange={(value: "asc" | "desc") => setSortOrder(value)}>
              <SelectTrigger className="border-2 border-gray-300">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest First</SelectItem>
                <SelectItem value="asc">Oldest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredEntries.length} of {entries.length} entries
      </div>

      {/* Entries List */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card className="border-4 border-black bg-white">
            <CardContent className="p-8 text-center">
              <div className="text-gray-400 text-lg">
                {entries.length === 0 ? "No journal entries yet" : "No entries match your filters"}
              </div>
              <div className="text-gray-500 text-sm mt-2">
                {entries.length === 0 ? "Start writing your first entry!" : "Try adjusting your search or filters"}
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry) => (
            <Card key={entry.id} className="border-4 border-black bg-white hover:shadow-lg transition-shadow">
              <CardHeader className="bg-gray-50 border-b-4 border-black">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <CardTitle className="text-lg font-black text-black truncate">{entry.title}</CardTitle>
                    {entry.is_private && <Lock className="h-4 w-4 text-gray-500" />}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <Calendar className="h-4 w-4" />
                    {format(new Date(entry.entry_date), "MMM dd, yyyy")}
                    {entry.mood_rating && <span className="text-lg ml-2">{getMoodEmoji(entry.mood_rating)}</span>}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <div className="space-y-3">
                  {/* Content Preview */}
                  <p className="text-gray-700 leading-relaxed">{stripHtml(entry.content)}</p>

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

                  {/* Actions */}
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                      {entry.created_at !== entry.updated_at && "Updated "}
                      {format(new Date(entry.updated_at), "MMM dd, yyyy • h:mm a")}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onView(entry)}
                        className="border-2 border-gray-300 hover:border-gray-400"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(entry)}
                        className="border-2 border-blue-300 hover:border-blue-400 text-blue-600"
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          if (confirm("Are you sure you want to delete this entry?")) {
                            onDelete(entry.id)
                          }
                        }}
                        className="border-2 border-red-300 hover:border-red-400 text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  )
}
