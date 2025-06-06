"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import type { Goal, GoalProgress } from "@/lib/goal-service"
import { Target, Plus, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react"

interface GoalManagerProps {
  integrationProvider?: string
  integrationType?: string
  metric?: string
  onGoalsUpdate?: (goals: Goal[]) => void
  isDarkMode?: boolean
}

export default function GoalManager({
  integrationProvider,
  integrationType,
  metric,
  onGoalsUpdate,
  isDarkMode = false,
}: GoalManagerProps) {
  const [goals, setGoals] = useState<Goal[]>([])
  const [goalProgress, setGoalProgress] = useState<GoalProgress[]>([])
  const [isAddingGoal, setIsAddingGoal] = useState(false)
  const [newGoal, setNewGoal] = useState({
    integrationProvider: integrationProvider || "",
    integrationType: integrationType || "",
    metric: metric || "",
    targetValue: 0,
    targetType: "daily" as const,
    goalType: "minimum" as const,
    color: "#10b981",
    description: "",
  })

  useEffect(() => {
    fetchGoals()
  }, [])

  const fetchGoals = async () => {
    try {
      const response = await fetch("/api/goals")
      const data = await response.json()
      setGoals(data.goals || [])
      onGoalsUpdate?.(data.goals || [])
    } catch (error) {
      console.error("Failed to fetch goals:", error)
    }
  }

  const createGoal = async () => {
    try {
      const response = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...newGoal,
          isActive: true,
        }),
      })

      if (response.ok) {
        await fetchGoals()
        setIsAddingGoal(false)
        setNewGoal({
          integrationProvider: integrationProvider || "",
          integrationType: integrationType || "",
          metric: metric || "",
          targetValue: 0,
          targetType: "daily",
          goalType: "minimum",
          color: "#10b981",
          description: "",
        })
      }
    } catch (error) {
      console.error("Failed to create goal:", error)
    }
  }

  const getStatusColor = (status: GoalProgress["status"]) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100 border-green-200"
      case "on_track":
        return "text-blue-600 bg-blue-100 border-blue-200"
      case "ahead":
        return "text-purple-600 bg-purple-100 border-purple-200"
      case "behind":
        return "text-red-600 bg-red-100 border-red-200"
      default:
        return "text-gray-600 bg-gray-100 border-gray-200"
    }
  }

  const getStatusIcon = (status: GoalProgress["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-4 w-4" />
      case "on_track":
        return <TrendingUp className="h-4 w-4" />
      case "ahead":
        return <TrendingUp className="h-4 w-4" />
      case "behind":
        return <AlertCircle className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  const filteredGoals = goals.filter((goal) => {
    if (integrationProvider && goal.integrationProvider !== integrationProvider) return false
    if (integrationType && goal.integrationType !== integrationType) return false
    if (metric && goal.metric !== metric) return false
    return true
  })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Target className="h-5 w-5 text-green-600" />
          <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Goals & Targets</h3>
        </div>

        <Dialog open={isAddingGoal} onOpenChange={setIsAddingGoal}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="bg-green-500 hover:bg-green-600 text-white border-2 border-green-400 rounded-lg font-bold"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Goal
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Goal</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="provider">Provider</Label>
                  <Select
                    value={newGoal.integrationProvider}
                    onValueChange={(value) => setNewGoal({ ...newGoal, integrationProvider: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select provider" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="strava">Strava</SelectItem>
                      <SelectItem value="fitbit">Fitbit</SelectItem>
                      <SelectItem value="myfitnesspal">MyFitnessPal</SelectItem>
                      <SelectItem value="rescuetime">RescueTime</SelectItem>
                      <SelectItem value="goodreads">Goodreads</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="metric">Metric</Label>
                  <Select value={newGoal.metric} onValueChange={(value) => setNewGoal({ ...newGoal, metric: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select metric" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="steps">Steps</SelectItem>
                      <SelectItem value="calories">Calories</SelectItem>
                      <SelectItem value="focusTime">Focus Time</SelectItem>
                      <SelectItem value="pagesRead">Pages Read</SelectItem>
                      <SelectItem value="screenTime">Screen Time</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="targetValue">Target Value</Label>
                  <Input
                    id="targetValue"
                    type="number"
                    value={newGoal.targetValue}
                    onChange={(e) => setNewGoal({ ...newGoal, targetValue: Number.parseInt(e.target.value) || 0 })}
                    placeholder="Enter target"
                  />
                </div>

                <div>
                  <Label htmlFor="targetType">Period</Label>
                  <Select
                    value={newGoal.targetType}
                    onValueChange={(value: any) => setNewGoal({ ...newGoal, targetType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="goalType">Goal Type</Label>
                  <Select
                    value={newGoal.goalType}
                    onValueChange={(value: any) => setNewGoal({ ...newGoal, goalType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="minimum">Minimum</SelectItem>
                      <SelectItem value="maximum">Maximum</SelectItem>
                      <SelectItem value="exact">Exact</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="color">Color</Label>
                  <Input
                    id="color"
                    type="color"
                    value={newGoal.color}
                    onChange={(e) => setNewGoal({ ...newGoal, color: e.target.value })}
                    className="h-10"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  value={newGoal.description}
                  onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                  placeholder="Describe your goal..."
                  rows={2}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button onClick={createGoal} className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold">
                  Create Goal
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsAddingGoal(false)}
                  className="flex-1 border-2 border-gray-300"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {filteredGoals.length === 0 ? (
        <Card
          className={`border-2 rounded-lg p-6 text-center ${
            isDarkMode ? "border-gray-600 bg-gray-800/50" : "border-gray-200 bg-gray-50"
          }`}
        >
          <Target className={`h-12 w-12 mx-auto mb-3 ${isDarkMode ? "text-gray-500" : "text-gray-400"}`} />
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            No goals set for this integration yet. Create your first goal to track progress!
          </p>
        </Card>
      ) : (
        <div className="space-y-3">
          {filteredGoals.map((goal) => {
            const progress = goalProgress.find((p) => p.goalId === goal.id)

            return (
              <Card
                key={goal.id}
                className={`border-2 rounded-lg p-4 ${
                  isDarkMode ? "border-green-600/50 bg-black/50" : "border-green-200 bg-green-50/50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                      style={{ backgroundColor: goal.color }}
                    />
                    <div>
                      <div className={`font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                        {goal.targetValue.toLocaleString()} {goal.metric} {goal.targetType}
                      </div>
                      <div className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {goal.goalType} target • {goal.integrationProvider}
                      </div>
                    </div>
                  </div>

                  {progress && (
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className={`${getStatusColor(progress.status)} border font-bold`}>
                        {getStatusIcon(progress.status)}
                        <span className="ml-1 capitalize">{progress.status.replace("_", " ")}</span>
                      </Badge>
                      <div className={`text-sm font-semibold ${isDarkMode ? "text-white" : "text-black"}`}>
                        {progress.percentage}%
                      </div>
                    </div>
                  )}
                </div>

                {goal.description && (
                  <p className={`text-sm mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{goal.description}</p>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
