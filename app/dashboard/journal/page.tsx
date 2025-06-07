"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import JournalEntriesList from "@/components/journal/journal-entries-list"
import JournalEntryForm from "@/components/journal/journal-entry-form"
import JournalEntryViewer from "@/components/journal/journal-entry-viewer"
import { Plus, BookOpen, TrendingUp, Calendar, Tag } from "lucide-react"

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

type ViewMode = "list" | "form" | "view"

export default function JournalPage() {
  const [entries, setEntries] = useState<JournalEntry[]>([])
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)

  // Mock user ID - replace with actual auth
  const userId = 1

  useEffect(() => {
    fetchEntries()
  }, [])

  const fetchEntries = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/journal?userId=${userId}`)
      const data = await response.json()

      if (data.entries) {
        setEntries(data.entries)
      }
    } catch (error) {
      console.error("Error fetching entries:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSaveEntry = async (entryData: Omit<JournalEntry, "id">) => {
    try {
      setIsSaving(true)

      const url = selectedEntry ? `/api/journal/${selectedEntry.id}` : "/api/journal"
      const method = selectedEntry ? "PUT" : "POST"

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...entryData, userId }),
      })

      if (response.ok) {
        await fetchEntries()
        setViewMode("list")
        setSelectedEntry(null)
      }
    } catch (error) {
      console.error("Error saving entry:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleDeleteEntry = async (id: number) => {
    try {
      const response = await fetch(`/api/journal/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        await fetchEntries()
        setViewMode("list")
        setSelectedEntry(null)
      }
    } catch (error) {
      console.error("Error deleting entry:", error)
    }
  }

  const handleNewEntry = () => {
    setSelectedEntry(null)
    setViewMode("form")
  }

  const handleEditEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry)
    setViewMode("form")
  }

  const handleViewEntry = (entry: JournalEntry) => {
    setSelectedEntry(entry)
    setViewMode("view")
  }

  const handleBackToList = () => {
    setViewMode("list")
    setSelectedEntry(null)
  }

  // Calculate stats
  const totalEntries = entries.length
  const thisMonthEntries = entries.filter((entry) => {
    const entryDate = new Date(entry.entry_date)
    const now = new Date()
    return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear()
  }).length

  const allTags = Array.from(new Set(entries.flatMap((entry) => entry.tags.map((tag) => tag.name))))
  const averageMood =
    entries.filter((e) => e.mood_rating).length > 0
      ? entries.filter((e) => e.mood_rating).reduce((sum, e) => sum + (e.mood_rating || 0), 0) /
        entries.filter((e) => e.mood_rating).length
      : 0

  if (viewMode === "form") {
    return (
      <JournalEntryForm
        entry={selectedEntry || undefined}
        onSave={handleSaveEntry}
        onDelete={selectedEntry ? handleDeleteEntry : undefined}
        onCancel={handleBackToList}
        isLoading={isSaving}
      />
    )
  }

  if (viewMode === "view" && selectedEntry) {
    return (
      <JournalEntryViewer
        entry={selectedEntry}
        onEdit={() => setViewMode("form")}
        onDelete={() => handleDeleteEntry(selectedEntry.id)}
        onBack={handleBackToList}
      />
    )
  }

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-black mb-2">Journal</h1>
          <p className="text-gray-600">Capture your thoughts, track your growth</p>
        </div>
        <Button
          onClick={handleNewEntry}
          className="bg-green-500 hover:bg-green-600 border-4 border-black font-bold text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
        >
          <Plus className="h-5 w-5 mr-2" />
          New Entry
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-4 border-black bg-white">
          <CardHeader className="bg-blue-50 border-b-4 border-black pb-2">
            <CardTitle className="text-sm font-bold text-black flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Total Entries
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-black text-black">{totalEntries}</div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black bg-white">
          <CardHeader className="bg-green-50 border-b-4 border-black pb-2">
            <CardTitle className="text-sm font-bold text-black flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              This Month
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-black text-black">{thisMonthEntries}</div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black bg-white">
          <CardHeader className="bg-purple-50 border-b-4 border-black pb-2">
            <CardTitle className="text-sm font-bold text-black flex items-center">
              <Tag className="h-4 w-4 mr-2" />
              Tags Used
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-black text-black">{allTags.length}</div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black bg-white">
          <CardHeader className="bg-yellow-50 border-b-4 border-black pb-2">
            <CardTitle className="text-sm font-bold text-black flex items-center">
              <TrendingUp className="h-4 w-4 mr-2" />
              Avg Mood
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-2xl font-black text-black">{averageMood > 0 ? averageMood.toFixed(1) : "N/A"}</div>
          </CardContent>
        </Card>
      </div>

      {/* Entries List */}
      <JournalEntriesList
        entries={entries}
        onEdit={handleEditEntry}
        onDelete={handleDeleteEntry}
        onView={handleViewEntry}
        isLoading={isLoading}
      />
    </div>
  )
}
