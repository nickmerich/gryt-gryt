"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Target } from "lucide-react"

interface Habit {
  id: number
  name: string
  completed: boolean
  streak: number
  target?: string
  category: string
}

interface HabitTrackerProps {
  isDarkMode?: boolean
}

export default function HabitTracker({ isDarkMode = false }: HabitTrackerProps) {
  const [habits, setHabits] = useState<Habit[]>([
    { id: 1, name: "Morning meditation", completed: true, streak: 12, target: "10 minutes", category: "Mindfulness" },
    { id: 2, name: "Read 20 pages", completed: true, streak: 8, target: "20 pages", category: "Learning" },
    { id: 3, name: "Exercise", completed: true, streak: 5, target: "30 minutes", category: "Fitness" },
    { id: 4, name: "Drink 8 glasses of water", completed: false, streak: 3, target: "8 glasses", category: "Health" },
    { id: 5, name: "Journal", completed: false, streak: 7, target: "10 minutes", category: "Reflection" },
  ])

  const toggleHabit = (id: number) => {
    setHabits(habits.map((habit) => (habit.id === id ? { ...habit, completed: !habit.completed } : habit)))
  }

  const getCategoryColor = (category: string) => {
    if (isDarkMode) {
      switch (category) {
        case "Mindfulness":
          return "bg-green-600/20 text-green-300 border border-green-500/30"
        case "Learning":
          return "bg-gray-600/20 text-gray-300 border border-gray-500/30"
        case "Fitness":
          return "bg-green-500/20 text-green-400 border border-green-400/30"
        case "Health":
          return "bg-gray-700/20 text-gray-400 border border-gray-600/30"
        case "Reflection":
          return "bg-green-700/20 text-green-300 border border-green-600/30"
        default:
          return "bg-gray-500/20 text-gray-300 border border-gray-400/30"
      }
    } else {
      switch (category) {
        case "Mindfulness":
          return "bg-green-100 text-green-900 border border-green-300"
        case "Learning":
          return "bg-gray-100 text-gray-900 border border-gray-300"
        case "Fitness":
          return "bg-green-50 text-green-800 border border-green-200"
        case "Health":
          return "bg-gray-50 text-gray-800 border border-gray-200"
        case "Reflection":
          return "bg-green-200 text-green-900 border border-green-400"
        default:
          return "bg-gray-100 text-gray-900 border border-gray-300"
      }
    }
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      {habits.map((habit) => (
        <div
          key={habit.id}
          className={`
            border-3 rounded-xl sm:rounded-2xl p-3 sm:p-4 transition-all
            ${
              habit.completed
                ? isDarkMode
                  ? "bg-gradient-to-br from-green-600/20 to-green-700/20 border-green-500/40 shadow-[3px_3px_0px_0px_rgba(34,197,94,0.3)] sm:shadow-[4px_4px_0px_0px_rgba(34,197,94,0.3)]"
                  : "bg-gradient-to-br from-green-50 to-green-100 border-black shadow-[3px_3px_0px_0px_rgba(34,197,94,0.3)] sm:shadow-[4px_4px_0px_0px_rgba(34,197,94,0.3)]"
                : isDarkMode
                  ? "bg-black/50 border-green-600 shadow-[3px_3px_0px_0px_rgba(34,197,94,0.2)] sm:shadow-[4px_4px_0px_0px_rgba(34,197,94,0.2)] hover:shadow-[4px_4px_0px_0px_rgba(34,197,94,0.3)] sm:hover:shadow-[6px_6px_0px_0px_rgba(34,197,94,0.3)]"
                  : "bg-white border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] sm:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
            }
          `}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1">
              <Button
                variant="ghost"
                size="sm"
                className="p-0 h-auto min-w-[44px] min-h-[44px] flex items-center justify-center"
                onClick={() => toggleHabit(habit.id)}
              >
                {habit.completed ? (
                  <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 text-green-500 animate-glow" />
                ) : (
                  <div
                    className={`h-7 w-7 sm:h-8 sm:w-8 border-3 rounded-full hover:border-green-500 transition-colors ${
                      isDarkMode ? "border-green-600" : "border-gray-400"
                    }`}
                  />
                )}
              </Button>

              <div className="flex-1 min-w-0">
                <h3
                  className={`font-bold text-sm sm:text-base leading-tight ${
                    habit.completed
                      ? isDarkMode
                        ? "line-through text-gray-400"
                        : "line-through text-gray-600"
                      : isDarkMode
                        ? "text-white"
                        : "text-black"
                  }`}
                >
                  {habit.name}
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mt-1">
                  <span
                    className={`text-xs px-2 py-1 rounded-full font-semibold ${getCategoryColor(habit.category)} w-fit`}
                  >
                    {habit.category}
                  </span>
                  {habit.target && (
                    <span
                      className={`text-xs flex items-center font-medium ${
                        isDarkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      <Target className="h-3 w-3 mr-1" />
                      {habit.target}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="text-right ml-2">
              <div className={`text-sm sm:text-base font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                {habit.streak}
              </div>
              <div className={`text-xs font-medium ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>day streak</div>
              <div
                className={`text-xs mt-1 ${
                  habit.completed
                    ? isDarkMode
                      ? "text-green-400"
                      : "text-green-600"
                    : isDarkMode
                      ? "text-gray-500"
                      : "text-gray-500"
                }`}
              >
                {habit.completed ? "✓ Done" : "Pending"}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
