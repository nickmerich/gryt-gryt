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
          return "bg-violet-500/20 text-violet-300 border border-violet-400/30"
        case "Learning":
          return "bg-sky-500/20 text-sky-300 border border-sky-400/30"
        case "Fitness":
          return "bg-emerald-500/20 text-emerald-300 border border-emerald-400/30"
        case "Health":
          return "bg-rose-500/20 text-rose-300 border border-rose-400/30"
        case "Reflection":
          return "bg-amber-500/20 text-amber-300 border border-amber-400/30"
        default:
          return "bg-slate-500/20 text-slate-300 border border-slate-400/30"
      }
    } else {
      switch (category) {
        case "Mindfulness":
          return "bg-violet-100 text-violet-900 border border-violet-300"
        case "Learning":
          return "bg-sky-100 text-sky-900 border border-sky-300"
        case "Fitness":
          return "bg-emerald-100 text-emerald-900 border border-emerald-300"
        case "Health":
          return "bg-rose-100 text-rose-900 border border-rose-300"
        case "Reflection":
          return "bg-amber-100 text-amber-900 border border-amber-300"
        default:
          return "bg-slate-100 text-slate-900 border border-slate-300"
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
                  ? "bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 border-emerald-400/40 shadow-[3px_3px_0px_0px_rgba(52,211,153,0.2)] sm:shadow-[4px_4px_0px_0px_rgba(52,211,153,0.2)]"
                  : "bg-gradient-to-br from-emerald-50 to-emerald-100 border-slate-900 shadow-[3px_3px_0px_0px_rgba(16,185,129,0.3)] sm:shadow-[4px_4px_0px_0px_rgba(16,185,129,0.3)]"
                : isDarkMode
                  ? "bg-slate-700/50 border-slate-600 shadow-[3px_3px_0px_0px_rgba(71,85,105,0.3)] sm:shadow-[4px_4px_0px_0px_rgba(71,85,105,0.3)] hover:shadow-[4px_4px_0px_0px_rgba(71,85,105,0.4)] sm:hover:shadow-[6px_6px_0px_0px_rgba(71,85,105,0.4)]"
                  : "bg-white border-slate-900 shadow-[3px_3px_0px_0px_rgba(15,23,42,1)] sm:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] hover:shadow-[4px_4px_0px_0px_rgba(15,23,42,1)] sm:hover:shadow-[6px_6px_0px_0px_rgba(15,23,42,1)]"
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
                  <CheckCircle2 className="h-7 w-7 sm:h-8 sm:w-8 text-emerald-500" />
                ) : (
                  <div
                    className={`h-7 w-7 sm:h-8 sm:w-8 border-3 rounded-full hover:border-emerald-500 transition-colors ${
                      isDarkMode ? "border-slate-500" : "border-slate-400"
                    }`}
                  />
                )}
              </Button>

              <div className="flex-1 min-w-0">
                <h3
                  className={`font-bold text-sm sm:text-base leading-tight ${
                    habit.completed
                      ? isDarkMode
                        ? "line-through text-slate-400"
                        : "line-through text-slate-600"
                      : isDarkMode
                        ? "text-slate-200"
                        : "text-slate-900"
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
                        isDarkMode ? "text-slate-400" : "text-slate-600"
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
              <div className={`text-sm sm:text-base font-bold ${isDarkMode ? "text-slate-200" : "text-slate-900"}`}>
                {habit.streak}
              </div>
              <div className={`text-xs font-medium ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
                day streak
              </div>
              <div
                className={`text-xs mt-1 ${
                  habit.completed
                    ? isDarkMode
                      ? "text-emerald-400"
                      : "text-emerald-600"
                    : isDarkMode
                      ? "text-slate-500"
                      : "text-slate-500"
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
