"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Target, Clock, Calendar } from "lucide-react"

export default function NewHabitPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    frequency: "daily",
    targetType: "boolean",
    targetValue: "",
    targetUnit: "",
    timeOfDay: "",
    daysOfWeek: [] as string[],
    reminder: false,
    reminderTime: "",
    difficulty: "medium",
  })

  const handleChange = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the habit to your database
    console.log("Form submitted:", formData)
    router.push("/dashboard/habits")
  }

  const categories = [
    { value: "mindfulness", label: "Mindfulness" },
    { value: "fitness", label: "Fitness" },
    { value: "learning", label: "Learning" },
    { value: "health", label: "Health" },
    { value: "productivity", label: "Productivity" },
    { value: "reflection", label: "Reflection" },
    { value: "social", label: "Social" },
    { value: "creativity", label: "Creativity" },
  ]

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

  const toggleDayOfWeek = (day: string) => {
    if (formData.daysOfWeek.includes(day)) {
      handleChange(
        "daysOfWeek",
        formData.daysOfWeek.filter((d) => d !== day),
      )
    } else {
      handleChange("daysOfWeek", [...formData.daysOfWeek, day])
    }
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/dashboard/habits">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back
          </Link>
        </Button>
        <h1 className="text-2xl sm:text-3xl font-black">Create New Habit</h1>
      </div>

      <Card className="border-4 border-black rounded-xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Basic Information</h2>

            <div className="space-y-2">
              <Label htmlFor="name">Habit Name</Label>
              <Input
                id="name"
                placeholder="e.g., Morning Meditation"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="border-2 border-black rounded-xl"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Why is this habit important to you?"
                value={formData.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="border-2 border-black rounded-xl min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={formData.category} onValueChange={(value) => handleChange("category", value)}>
                <SelectTrigger className="border-2 border-black rounded-xl">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Difficulty</Label>
              <RadioGroup
                value={formData.difficulty}
                onValueChange={(value) => handleChange("difficulty", value)}
                className="flex space-x-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="easy" id="easy" />
                  <Label htmlFor="easy" className="cursor-pointer">
                    Easy
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="medium" id="medium" />
                  <Label htmlFor="medium" className="cursor-pointer">
                    Medium
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="hard" id="hard" />
                  <Label htmlFor="hard" className="cursor-pointer">
                    Hard
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          {/* Frequency & Scheduling */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-red-500" />
              <h2 className="text-xl font-bold">Frequency & Scheduling</h2>
            </div>

            <div className="space-y-2">
              <Label>Frequency</Label>
              <RadioGroup
                value={formData.frequency}
                onValueChange={(value) => handleChange("frequency", value)}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="daily" id="daily" />
                  <Label htmlFor="daily" className="cursor-pointer">
                    Daily
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="weekly" id="weekly" />
                  <Label htmlFor="weekly" className="cursor-pointer">
                    Weekly
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monthly" id="monthly" />
                  <Label htmlFor="monthly" className="cursor-pointer">
                    Monthly
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {formData.frequency === "weekly" && (
              <div className="space-y-2">
                <Label>Days of Week</Label>
                <div className="flex flex-wrap gap-2">
                  {daysOfWeek.map((day) => (
                    <Button
                      key={day}
                      type="button"
                      variant={formData.daysOfWeek.includes(day) ? "default" : "outline"}
                      className={`rounded-xl border-2 ${
                        formData.daysOfWeek.includes(day)
                          ? "bg-red-500 hover:bg-red-600 border-red-500 text-white"
                          : "border-black"
                      }`}
                      onClick={() => toggleDayOfWeek(day)}
                    >
                      {day.substring(0, 3)}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="timeOfDay">Preferred Time of Day</Label>
              <Select value={formData.timeOfDay} onValueChange={(value) => handleChange("timeOfDay", value)}>
                <SelectTrigger className="border-2 border-black rounded-xl">
                  <SelectValue placeholder="Select a time of day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="anytime">Anytime</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Target & Measurement */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Target className="h-5 w-5 text-red-500" />
              <h2 className="text-xl font-bold">Target & Measurement</h2>
            </div>

            <div className="space-y-2">
              <Label>Target Type</Label>
              <RadioGroup
                value={formData.targetType}
                onValueChange={(value) => handleChange("targetType", value)}
                className="flex flex-wrap gap-4"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="boolean" id="boolean" />
                  <Label htmlFor="boolean" className="cursor-pointer">
                    Yes/No Completion
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="count" id="count" />
                  <Label htmlFor="count" className="cursor-pointer">
                    Count (e.g., 8 glasses)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="duration" id="duration" />
                  <Label htmlFor="duration" className="cursor-pointer">
                    Duration (e.g., 30 minutes)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {formData.targetType !== "boolean" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="targetValue">Target Value</Label>
                  <Input
                    id="targetValue"
                    type="number"
                    placeholder="e.g., 8 or 30"
                    value={formData.targetValue}
                    onChange={(e) => handleChange("targetValue", e.target.value)}
                    className="border-2 border-black rounded-xl"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="targetUnit">Unit</Label>
                  <Input
                    id="targetUnit"
                    placeholder="e.g., glasses, minutes, pages"
                    value={formData.targetUnit}
                    onChange={(e) => handleChange("targetUnit", e.target.value)}
                    className="border-2 border-black rounded-xl"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Reminders */}
          <div className="space-y-4 pt-4 border-t border-gray-200">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-red-500" />
              <h2 className="text-xl font-bold">Reminders</h2>
            </div>

            <div className="flex items-start space-x-2">
              <Checkbox
                id="reminder"
                checked={formData.reminder}
                onCheckedChange={(checked) => handleChange("reminder", checked)}
              />
              <div className="grid gap-1.5 leading-none">
                <Label htmlFor="reminder" className="cursor-pointer">
                  Enable Reminders
                </Label>
                <p className="text-sm text-gray-500">Get notified when it's time for this habit</p>
              </div>
            </div>

            {formData.reminder && (
              <div className="space-y-2">
                <Label htmlFor="reminderTime">Reminder Time</Label>
                <Input
                  id="reminderTime"
                  type="time"
                  value={formData.reminderTime}
                  onChange={(e) => handleChange("reminderTime", e.target.value)}
                  className="border-2 border-black rounded-xl"
                />
              </div>
            )}
          </div>
        </form>
      </Card>
    </div>
  )
}
