"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Plus, X, Target, Clock, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

const categories = [
  { id: "health", name: "Health & Fitness", icon: "💪", color: "bg-green-100" },
  { id: "learning", name: "Learning", icon: "📚", color: "bg-blue-100" },
  { id: "productivity", name: "Productivity", icon: "⚡", color: "bg-yellow-100" },
  { id: "mindfulness", name: "Mindfulness", icon: "🧘", color: "bg-purple-100" },
  { id: "social", name: "Social", icon: "👥", color: "bg-pink-100" },
  { id: "creativity", name: "Creativity", icon: "🎨", color: "bg-orange-100" },
  { id: "finance", name: "Finance", icon: "💰", color: "bg-emerald-100" },
  { id: "other", name: "Other", icon: "📝", color: "bg-gray-100" },
]

const frequencies = [
  { id: "daily", name: "Daily", description: "Every day" },
  { id: "weekly", name: "Weekly", description: "Once a week" },
  { id: "custom", name: "Custom", description: "Set your own schedule" },
]

export default function NewHabitPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    frequency: "daily",
    target: "",
    tags: [] as string[],
  })
  const [newTag, setNewTag] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Creating habit:", formData)
    setIsLoading(false)
    router.push("/dashboard/habits")
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }))
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }))
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      {/* Mobile Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.back()}
          className="rounded-xl border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-w-[44px] min-h-[44px]"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-black text-black">Create New Habit</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Basic Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="name" className="text-sm font-bold">
                Habit Name *
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g., Drink 8 glasses of water"
                className="mt-1 border-2 border-black rounded-xl font-medium min-h-[44px]"
                required
              />
            </div>

            <div>
              <Label htmlFor="description" className="text-sm font-bold">
                Description (Optional)
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                placeholder="Why is this habit important to you?"
                className="mt-1 border-2 border-black rounded-xl font-medium min-h-[80px]"
                rows={3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Category Selection */}
        <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle>Choose Category</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {categories.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, category: category.id }))}
                  className={`p-4 rounded-xl border-2 border-black text-left transition-all min-h-[60px] ${
                    formData.category === category.id
                      ? "bg-green-500 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{category.icon}</span>
                    <span className="font-bold text-sm">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Frequency */}
        <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Frequency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {frequencies.map((freq) => (
                <button
                  key={freq.id}
                  type="button"
                  onClick={() => setFormData((prev) => ({ ...prev, frequency: freq.id }))}
                  className={`w-full p-4 rounded-xl border-2 border-black text-left transition-all min-h-[60px] ${
                    formData.frequency === freq.id
                      ? "bg-green-500 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  <div className="font-bold">{freq.name}</div>
                  <div className={`text-sm ${formData.frequency === freq.id ? "text-green-100" : "text-gray-600"}`}>
                    {freq.description}
                  </div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Target/Goal */}
        <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle>Target/Goal</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              value={formData.target}
              onChange={(e) => setFormData((prev) => ({ ...prev, target: e.target.value }))}
              placeholder="e.g., 30 minutes, 10,000 steps, 3 times"
              className="border-2 border-black rounded-xl font-medium min-h-[44px]"
            />
          </CardContent>
        </Card>

        {/* Tags */}
        <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Tags
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                placeholder="Add a tag"
                className="flex-1 border-2 border-black rounded-xl font-medium min-h-[44px]"
              />
              <Button
                type="button"
                onClick={addTag}
                className="bg-green-500 hover:bg-green-600 text-white border-2 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] min-w-[44px] min-h-[44px]"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 bg-gray-100 text-black px-3 py-1 rounded-full border-2 border-black font-medium"
                  >
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="hover:text-red-600 ml-1">
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Submit Button */}
        <div className="sticky bottom-4 bg-gray-50 pt-4">
          <Button
            type="submit"
            disabled={!formData.name.trim() || isLoading}
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all duration-200 min-h-[56px] text-lg"
          >
            {isLoading ? "Creating Habit..." : "Create Habit"}
          </Button>
        </div>
      </form>
    </div>
  )
}
