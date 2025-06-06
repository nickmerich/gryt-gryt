"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Target, Save, X } from "lucide-react"
import type { Goal } from "@/lib/goal-service"
import GoalStreakTracker from "./goal-streak-tracker"

interface GoalManagerProps {
  integrationProvider?: string
  integrationType?: string
  onGoalsUpdate?: (goals: Goal[]) => void
  isDarkMode?: boolean
}

export default function GoalManager({
  integrationProvider,
  integrationType,
  onGoalsUpdate,
  isDarkMode = false,
}: GoalManagerProps) {
  const [goals, setGoals] = useState<Goal[]>([])
  const [showCreateForm, setShowCreateForm] = useState(false)
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null)
  const [loading, setLoading] = useState(true)

  const [formData, setFormData] = useState({
    integrationProvider: integrationProvider || "",
    integrationType: integrationType || "",
    metric: "",
    targetValue: "",
    targetType: "daily" as "daily" | "weekly" | "monthly",
    goalType: "minimum" as "minimum" | "maximum" | "exact",
    color: "#ef4444",
    description: "",
  })

  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/goals")
      const result = await response.json()
      const fetchedGoals = result.goals || []

      // Filter goals if specific integration is provided
      const filteredGoals =
        integrationProvider && integrationType
          ? fetchedGoals.filter(
              (goal: Goal) =>
                goal.integrationProvider === integrationProvider && goal.integrationType === integrationType,
            )
          : fetchedGoals

      setGoals(filteredGoals)
      onGoalsUpdate?.(filteredGoals)
    } catch (error) {
      console.error("Failed to fetch goals:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreateGoal = async () => {
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          targetValue: Number.parseFloat(formData.targetValue),
          isActive: true,
        }),
      })

      if (response.ok) {
        await fetchGoals()
        setShowCreateForm(false)
        resetForm()
      }
    } catch (error) {
      console.error("Failed to create goal:", error)
    }
  }

  const resetForm = () => {
    setFormData({
      integrationProvider: integrationProvider || "",
      integrationType: integrationType || "",
      metric: "",
      targetValue: "",
      targetType: "daily",
      goalType: "minimum",
      color: "#ef4444",
      description: "",
    })
  }

  const getGoalTypeColor = (goalType: string) => {
    switch (goalType) {
      case "minimum":
        return "bg-green-100 text-green-800 border-green-300"
      case "maximum":
        return "bg-red-100 text-red-800 border-red-300"
      case "exact":
        return "bg-blue-100 text-blue-800 border-blue-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const formatTargetValue = (value: number, type: string) => {
    switch (type) {
      case "fitness":
        return value.toLocaleString()
      case "nutrition":
        return `${value} cal`
      case "productivity":
        return `${value}h`
      case "reading":
        return `${value} pages`
      default:
        return value.toString()
    }
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 2 }).map((_, index) => (
          <Card
            key={index}
            className={`border-3 rounded-xl p-6 animate-pulse ${
              isDarkMode ? "bg-black/50 border-green-600/50" : "bg-white/50 border-black/50"
            }`}
          >
            <div className="space-y-4">
              <div className={`h-6 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
              <div className={`h-32 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className={`text-xl font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Goal Management</h3>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Set and track your achievement goals</p>
        </div>

        <Button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-400 rounded-xl"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Goal
        </Button>
      </div>

      {/* Create Goal Form */}
      {showCreateForm && (
        <Card
          className={`border-3 rounded-xl p-6 ${
            isDarkMode
              ? "bg-black/90 border-green-600 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.3)]"
              : "bg-white/95 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
          }`}
        >
          <div className="space-y-4">
            <h4 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Create New Goal</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="metric">Metric</Label>
                <Input
                  id="metric"
                  value={formData.metric}
                  onChange={(e) => setFormData({ ...formData, metric: e.target.value })}
                  placeholder="e.g., steps, calories, pages"
                  className="border-2 border-black rounded-lg"
                />
              </div>

              <div>
                <Label htmlFor="targetValue">Target Value</Label>
                <Input
                  id="targetValue"
                  type="number"
                  value={formData.targetValue}
                  onChange={(e) => setFormData({ ...formData, targetValue: e.target.value })}
                  placeholder="e.g., 10000"
                  className="border-2 border-black rounded-lg"
                />
              </div>

              <div>
                <Label htmlFor="targetType">Time Period</Label>
                <Select
                  value={formData.targetType}
                  onValueChange={(value: any) => setFormData({ ...formData, targetType: value })}
                >
                  <SelectTrigger className="border-2 border-black rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="goalType">Goal Type</Label>
                <Select
                  value={formData.goalType}
                  onValueChange={(value: any) => setFormData({ ...formData, goalType: value })}
                >
                  <SelectTrigger className="border-2 border-black rounded-lg">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minimum">Minimum (at least)</SelectItem>
                    <SelectItem value="maximum">Maximum (no more than)</SelectItem>
                    <SelectItem value="exact">Exact (exactly)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe your goal..."
                className="border-2 border-black rounded-lg"
              />
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleCreateGoal}
                className="bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-400 rounded-xl"
              >
                <Save className="h-4 w-4 mr-2" />
                Create Goal
              </Button>

              <Button
                onClick={() => {
                  setShowCreateForm(false)
                  resetForm()
                }}
                variant="outline"
                className="border-2 border-black font-bold rounded-xl"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Goals List */}
      <div className="space-y-4">
        {goals.length === 0 ? (
          <Card
            className={`border-3 rounded-xl p-8 text-center ${
              isDarkMode
                ? "bg-black/90 border-green-600 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.3)]"
                : "bg-white/95 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
            }`}
          >
            <Target className={`h-12 w-12 mx-auto mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
            <h3 className={`text-lg font-bold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>No Goals Yet</h3>
            <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              Create your first goal to start tracking your achievements and building streaks!
            </p>
          </Card>
        ) : (
          goals.map((goal) => (
            <div key={goal.id} className="space-y-4">
              {/* Goal Info Card */}
              <Card
                className={`border-3 rounded-xl p-6 ${
                  isDarkMode
                    ? "bg-black/90 border-green-600 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.3)]"
                    : "bg-white/95 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-black"
                      style={{ backgroundColor: goal.color }}
                    ></div>
                    <div>
                      <h4 className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                        {goal.description || `${goal.metric} Goal`}
                      </h4>
                      <p className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {goal.goalType} {formatTargetValue(goal.targetValue, goal.integrationType)} {goal.targetType}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge className={getGoalTypeColor(goal.goalType)}>{goal.goalType}</Badge>
                    <Badge variant="outline" className="border-green-500 text-green-600">
                      {goal.targetType}
                    </Badge>
                  </div>
                </div>
              </Card>

              {/* Streak Tracker */}
              <GoalStreakTracker goal={goal} isDarkMode={isDarkMode} />
            </div>
          ))
        )}
      </div>
    </div>
  )
}
