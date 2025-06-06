"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon, Plus, X, CheckCircle2, AlertCircle } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { habitCategories, impactLevels, type HabitCategory, type HabitSubmission } from "@/lib/habit-submissions"

interface HabitSubmissionFormProps {
  onSubmit: (submission: Omit<HabitSubmission, "id" | "userId" | "createdAt" | "updatedAt">) => void
  onCancel: () => void
  isDarkMode?: boolean
}

export default function HabitSubmissionForm({ onSubmit, onCancel, isDarkMode = false }: HabitSubmissionFormProps) {
  const [formData, setFormData] = useState({
    habitName: "",
    description: "",
    date: new Date(),
    impact: "positive" as "positive" | "negative",
    category: "productive" as HabitCategory,
    impactDescription: "",
    goalRelation: "",
    intensity: 3 as 1 | 2 | 3 | 4 | 5,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.habitName.trim()) {
      newErrors.habitName = "Habit name is required"
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required"
    }

    if (!formData.impactDescription.trim()) {
      newErrors.impactDescription = "Impact description is required"
    }

    if (!formData.goalRelation.trim()) {
      newErrors.goalRelation = "Goal relation is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await onSubmit({
        ...formData,
        date: format(formData.date, "yyyy-MM-dd"),
      })
    } catch (error) {
      console.error("Error submitting habit:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const selectedCategory = habitCategories.find((cat) => cat.value === formData.category)
  const selectedImpactLevel = impactLevels.find((level) => level.value === formData.intensity)

  return (
    <Card
      className={`border-3 rounded-2xl p-6 ${
        isDarkMode ? "bg-black/90 border-green-600" : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      }`}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className={`text-2xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Log Habit Impact</h2>
        <Button
          variant="ghost"
          size="icon"
          onClick={onCancel}
          className={`rounded-xl ${isDarkMode ? "hover:bg-green-950/50" : "hover:bg-gray-100"}`}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Impact Type Selection */}
        <div className="space-y-3">
          <Label className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Impact Type</Label>
          <RadioGroup
            value={formData.impact}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, impact: value as "positive" | "negative" }))}
            className="flex gap-4"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="positive" id="positive" />
              <Label htmlFor="positive" className="flex items-center gap-2 cursor-pointer">
                <CheckCircle2 className="h-4 w-4 text-green-600" />
                <span className={isDarkMode ? "text-green-400" : "text-green-700"}>Positive Impact</span>
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="negative" id="negative" />
              <Label htmlFor="negative" className="flex items-center gap-2 cursor-pointer">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <span className={isDarkMode ? "text-red-400" : "text-red-700"}>Negative Impact</span>
              </Label>
            </div>
          </RadioGroup>
        </div>

        {/* Habit Name */}
        <div className="space-y-2">
          <Label htmlFor="habitName" className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
            Habit Name
          </Label>
          <Input
            id="habitName"
            value={formData.habitName}
            onChange={(e) => setFormData((prev) => ({ ...prev, habitName: e.target.value }))}
            placeholder="e.g., Morning meditation, Social media scrolling"
            className={`rounded-xl border-2 font-medium ${
              errors.habitName ? "border-red-500" : isDarkMode ? "border-green-600 bg-black/50" : "border-black"
            }`}
          />
          {errors.habitName && <p className="text-sm text-red-600 font-medium">{errors.habitName}</p>}
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description" className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
            Description
          </Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
            placeholder="Describe what you did and how long it took..."
            rows={3}
            className={`rounded-xl border-2 font-medium resize-none ${
              errors.description ? "border-red-500" : isDarkMode ? "border-green-600 bg-black/50" : "border-black"
            }`}
          />
          {errors.description && <p className="text-sm text-red-600 font-medium">{errors.description}</p>}
        </div>

        {/* Date */}
        <div className="space-y-2">
          <Label className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-medium rounded-xl border-2",
                  !formData.date && "text-muted-foreground",
                  isDarkMode ? "border-green-600 bg-black/50 hover:bg-green-950/50" : "border-black hover:bg-gray-50",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.date ? format(formData.date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.date}
                onSelect={(date) => date && setFormData((prev) => ({ ...prev, date }))}
                disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Category */}
        <div className="space-y-2">
          <Label className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Category</Label>
          <Select
            value={formData.category}
            onValueChange={(value) => setFormData((prev) => ({ ...prev, category: value as HabitCategory }))}
          >
            <SelectTrigger
              className={`rounded-xl border-2 font-medium ${
                isDarkMode ? "border-green-600 bg-black/50" : "border-black"
              }`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {habitCategories.map((category) => (
                <SelectItem key={category.value} value={category.value}>
                  <div className="flex items-center gap-2">
                    <span>{category.icon}</span>
                    <span>{category.label}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {selectedCategory && (
            <Badge className={`${selectedCategory.color} border font-medium`}>
              {selectedCategory.icon} {selectedCategory.label}
            </Badge>
          )}
        </div>

        {/* Impact Intensity */}
        <div className="space-y-3">
          <Label className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Impact Intensity</Label>
          <RadioGroup
            value={formData.intensity.toString()}
            onValueChange={(value) =>
              setFormData((prev) => ({ ...prev, intensity: Number.parseInt(value) as 1 | 2 | 3 | 4 | 5 }))
            }
            className="grid grid-cols-1 gap-3"
          >
            {impactLevels.map((level) => (
              <div key={level.value} className="flex items-center space-x-3">
                <RadioGroupItem value={level.value.toString()} id={`intensity-${level.value}`} />
                <Label htmlFor={`intensity-${level.value}`} className="flex-1 cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>{level.label}</span>
                    <span className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {level.description}
                    </span>
                  </div>
                </Label>
              </div>
            ))}
          </RadioGroup>
          {selectedImpactLevel && (
            <div
              className={`p-3 rounded-xl border-2 ${
                isDarkMode ? "bg-green-950/20 border-green-600" : "bg-green-50 border-green-200"
              }`}
            >
              <p className={`text-sm font-medium ${isDarkMode ? "text-green-400" : "text-green-700"}`}>
                Selected: {selectedImpactLevel.label} - {selectedImpactLevel.description}
              </p>
            </div>
          )}
        </div>

        {/* Impact Description */}
        <div className="space-y-2">
          <Label
            htmlFor="impactDescription"
            className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-black"}`}
          >
            Impact Description
          </Label>
          <Textarea
            id="impactDescription"
            value={formData.impactDescription}
            onChange={(e) => setFormData((prev) => ({ ...prev, impactDescription: e.target.value }))}
            placeholder="How did this habit affect your day, mood, or productivity?"
            rows={3}
            className={`rounded-xl border-2 font-medium resize-none ${
              errors.impactDescription ? "border-red-500" : isDarkMode ? "border-green-600 bg-black/50" : "border-black"
            }`}
          />
          {errors.impactDescription && <p className="text-sm text-red-600 font-medium">{errors.impactDescription}</p>}
        </div>

        {/* Goal Relation */}
        <div className="space-y-2">
          <Label htmlFor="goalRelation" className={`text-sm font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
            Relation to Goals
          </Label>
          <Textarea
            id="goalRelation"
            value={formData.goalRelation}
            onChange={(e) => setFormData((prev) => ({ ...prev, goalRelation: e.target.value }))}
            placeholder="How does this habit relate to your personal goals?"
            rows={3}
            className={`rounded-xl border-2 font-medium resize-none ${
              errors.goalRelation ? "border-red-500" : isDarkMode ? "border-green-600 bg-black/50" : "border-black"
            }`}
          />
          {errors.goalRelation && <p className="text-sm text-red-600 font-medium">{errors.goalRelation}</p>}
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-xl border-3 border-black font-bold py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200"
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Submitting...
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Submit Habit Log
              </div>
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className={`px-6 rounded-xl border-2 font-bold ${
              isDarkMode ? "border-green-600 hover:bg-green-950/50" : "border-black hover:bg-gray-50"
            }`}
          >
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  )
}
