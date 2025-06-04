"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Target, Plus, Flame } from "lucide-react"
import { Card } from "@/components/ui/card"

interface Habit {
  id: number
  name: string
  completed: boolean
  streak: number
  target?: string
  category: string
  progress?: number
}

interface MobileHabitTrackerProps {
  habits: Habit[]
  onToggle: (id: number) => void
}

export default function MobileHabitTracker({ habits, onToggle }: MobileHabitTrackerProps) {
  const [expandedHabit, setExpandedHabit] = useState<number | null>(null)

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Mindfulness":
        return "bg-red-100 text-red-800 border-red-300"
      case "Learning":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "Fitness":
        return "bg-red-50 text-red-700 border-red-200"
      case "Health":
        return "bg-gray-50 text-gray-700 border-gray-200"
      case "Reflection":
        return "bg-red-200 text-red-900 border-red-400"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const completedCount = habits.filter((h) => h.completed).length
  const totalCount = habits.length
  const completionRate = totalCount > 0 ? (completedCount / totalCount) * 100 : 0

  return (
    <div className="space-y-4">
      {/* Mobile Progress Header */}
      <Card className="border-3 border-black rounded-2xl p-4 bg-gradient-to-r from-red-50 to-red-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-bold text-lg text-black">Today's Progress</h3>
            <p className="text-sm text-gray-600">
              {completedCount} of {totalCount} completed
            </p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-black text-red-600">{Math.round(completionRate)}%</div>
            <div className="text-xs text-gray-500">completion</div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white border-2 border-black rounded-full h-4 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-red-500 to-red-600 transition-all duration-500 ease-out"
            style={{ width: `${completionRate}%` }}
          />
        </div>
      </Card>

      {/* Habit List */}
      <div className="space-y-3">
        {habits.map((habit) => (
          <Card
            key={habit.id}
            className={`border-3 rounded-2xl transition-all duration-300 ${
              habit.completed
                ? "bg-gradient-to-r from-red-50 to-red-100 border-red-400 shadow-[3px_3px_0px_0px_rgba(220,38,38,0.3)]"
                : "bg-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
            }`}
          >
            <div className="p-4">
              {/* Main Habit Row */}
              <div className="flex items-center gap-4">
                {/* Completion Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="min-w-[56px] min-h-[56px] p-0 rounded-2xl hover:bg-red-50 active:bg-red-100 transition-all duration-200"
                  onClick={() => onToggle(habit.id)}
                >
                  {habit.completed ? (
                    <CheckCircle2 className="h-8 w-8 text-red-500" />
                  ) : (
                    <div className="h-8 w-8 border-3 border-gray-300 rounded-full hover:border-red-500 transition-colors" />
                  )}
                </Button>

                {/* Habit Info */}
                <div className="flex-1 min-w-0">
                  <h3
                    className={`font-bold text-base leading-tight ${
                      habit.completed ? "line-through text-gray-500" : "text-black"
                    }`}
                  >
                    {habit.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-2">
                    <span
                      className={`text-xs px-3 py-1 rounded-full font-semibold border ${getCategoryColor(habit.category)}`}
                    >
                      {habit.category}
                    </span>
                    {habit.target && (
                      <span className="text-xs text-gray-500 flex items-center">
                        <Target className="h-3 w-3 mr-1" />
                        {habit.target}
                      </span>
                    )}
                  </div>
                </div>

                {/* Streak Display */}
                <div className="text-right">
                  <div className="flex items-center gap-1 text-red-600">
                    <Flame className="h-5 w-5" />
                    <span className="font-bold text-lg">{habit.streak}</span>
                  </div>
                  <div className="text-xs text-gray-500">day streak</div>
                </div>
              </div>

              {/* Progress Bar for Partial Completion */}
              {habit.progress !== undefined && habit.progress > 0 && habit.progress < 100 && (
                <div className="mt-4">
                  <div className="flex justify-between text-xs mb-2">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-bold text-red-600">{habit.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 border border-black rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-red-500 to-red-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${habit.progress}%` }}
                    />
                  </div>
                </div>
              )}

              {/* Completion Status */}
              <div
                className={`mt-3 text-center text-sm font-medium ${habit.completed ? "text-red-600" : "text-gray-500"}`}
              >
                {habit.completed ? "✓ Completed today" : "Tap to complete"}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add New Habit Button */}
      <Button className="w-full min-h-[56px] bg-red-500 hover:bg-red-600 text-white rounded-2xl border-3 border-black font-bold text-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200">
        <Plus className="h-6 w-6 mr-2" />
        Add New Habit
      </Button>
    </div>
  )
}
