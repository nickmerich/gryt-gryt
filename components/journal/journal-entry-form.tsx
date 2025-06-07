"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import RichTextEditor from "./rich-text-editor"
import { CalendarIcon, X, Plus, Save, Trash2 } from "lucide-react"
import { format } from "date-fns"

interface JournalEntry {
  id?: number
  title: string
  content: string
  entry_date: string
  tags: string[]
  mood_rating?: number
  is_private: boolean
}

interface JournalEntryFormProps {
  entry?: JournalEntry
  onSave: (entry: Omit<JournalEntry, "id">) => Promise<void>
  onDelete?: (id: number) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export default function JournalEntryForm({
  entry,
  onSave,
  onDelete,
  onCancel,
  isLoading = false,
}: JournalEntryFormProps) {
  const [title, setTitle] = useState(entry?.title || "")
  const [content, setContent] = useState(entry?.content || "")
  const [selectedDate, setSelectedDate] = useState<Date>(entry?.entry_date ? new Date(entry.entry_date) : new Date())
  const [tags, setTags] = useState<string[]>(entry?.tags || [])
  const [newTag, setNewTag] = useState("")
  const [moodRating, setMoodRating] = useState<number | undefined>(entry?.mood_rating)
  const [isPrivate, setIsPrivate] = useState(entry?.is_private || false)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddTag()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!title.trim() || !content.trim()) {
      return
    }

    await onSave({
      title: title.trim(),
      content: content.trim(),
      entry_date: format(selectedDate, "yyyy-MM-dd"),
      tags,
      mood_rating: moodRating,
      is_private: isPrivate,
    })
  }

  const handleDelete = async () => {
    if (entry?.id && onDelete && confirm("Are you sure you want to delete this entry?")) {
      await onDelete(entry.id)
    }
  }

  const moodEmojis = ["😢", "😕", "😐", "😊", "😄"]
  const moodLabels = ["Very Sad", "Sad", "Neutral", "Happy", "Very Happy"]

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-black text-black">{entry ? "Edit Entry" : "New Journal Entry"}</h1>
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={onCancel} className="border-2 border-black">
              Cancel
            </Button>
            {entry && onDelete && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleDelete}
                className="bg-red-500 hover:bg-red-600 border-2 border-black"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            )}
            <Button
              type="submit"
              disabled={isLoading || !title.trim() || !content.trim()}
              className="bg-green-500 hover:bg-green-600 border-2 border-black"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? "Saving..." : "Save Entry"}
            </Button>
          </div>
        </div>

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title" className="text-lg font-bold text-black">
            Title *
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="What's on your mind today?"
            className="border-4 border-black text-lg font-semibold"
            required
          />
        </div>

        {/* Date and Mood Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Date Picker */}
          <div className="space-y-2">
            <Label className="text-lg font-bold text-black">Date</Label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start border-4 border-black font-semibold">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {format(selectedDate, "PPP")}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 border-4 border-black" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => {
                    if (date) {
                      setSelectedDate(date)
                      setIsCalendarOpen(false)
                    }
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Mood Rating */}
          <div className="space-y-2">
            <Label className="text-lg font-bold text-black">Mood</Label>
            <Select value={moodRating?.toString()} onValueChange={(value) => setMoodRating(Number.parseInt(value))}>
              <SelectTrigger className="border-4 border-black font-semibold">
                <SelectValue placeholder="How are you feeling?" />
              </SelectTrigger>
              <SelectContent className="border-4 border-black">
                {moodEmojis.map((emoji, index) => (
                  <SelectItem key={index + 1} value={(index + 1).toString()}>
                    <span className="flex items-center gap-2">
                      <span className="text-lg">{emoji}</span>
                      <span>{moodLabels[index]}</span>
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Tags */}
        <div className="space-y-2">
          <Label className="text-lg font-bold text-black">Tags</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-green-100 text-green-800 border-2 border-green-600 px-3 py-1"
              >
                {tag}
                <button type="button" onClick={() => handleRemoveTag(tag)} className="ml-2 hover:text-red-600">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
          <div className="flex gap-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a tag..."
              className="border-2 border-gray-300"
            />
            <Button type="button" onClick={handleAddTag} variant="outline" className="border-2 border-black">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Privacy Toggle */}
        <div className="flex items-center space-x-2">
          <Switch id="private" checked={isPrivate} onCheckedChange={setIsPrivate} />
          <Label htmlFor="private" className="font-semibold text-black">
            Private Entry
          </Label>
        </div>

        {/* Content Editor */}
        <div className="space-y-2">
          <Label className="text-lg font-bold text-black">Content *</Label>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Share your thoughts, experiences, and reflections..."
            className="min-h-[300px]"
          />
        </div>
      </form>
    </div>
  )
}
