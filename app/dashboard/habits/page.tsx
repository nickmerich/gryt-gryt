"use client"

import { useState } from "react"
import { Plus, Target, Calendar, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

interface Habit {
  id: string
  name: string
  category: string
  streak: number
  completedToday: boolean
  target: string
  progress: number
  color: string
}

const mockHabits: Habit[] = [
  {
    id: "1",
    name: "Drink 8 glasses of water",
    category: "Health",
    streak: 12,
    completedToday: true,
    target: "8 glasses",
    progress: 75,
    color: "bg-blue-500",
  },
  {
    id: "2",
    name: "Read for 30 minutes",
    category: "Learning",
    streak: 8,
    completedToday: false,
    target: "30 minutes",
    progress: 0,
    color: "bg-purple-500",
  },
  {
    id: "3",
    name: "Exercise",
    category: "Health",
    streak: 5,
    completedToday: true,
    target: "45 minutes",
    progress: 100,
    color: "bg-green-500",
  },
]

export default function HabitsPage() {
  const [habits, setHabits] = useState<Habit[]>(mockHabits)
  const [filter, setFilter] = useState<"all" | "completed" | "pending">("all")

  const toggleHabit = (habitId: string) => {
    setHabits((prev) =>
      prev.map((habit) =>
        habit.id === habitId
          ? {
              ...habit,
              completedToday: !habit.completedToday,
              progress: !habit.completedToday ? 100 : 0,
              streak: !habit.completedToday ? habit.streak + 1 : Math.max(0, habit.streak - 1),
            }
          : habit,
      ),
    )
  }

  const filteredHabits = habits.filter((habit) => {
    if (filter === "completed") return habit.completedToday
    if (filter === "pending") return !habit.completedToday
    return true
  })

  const completedCount = habits.filter((h) => h.completedToday).length
  const totalCount = habits.length

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-black text-black">Habits</h1>
          <p className="text-gray-600 font-medium">
            {completedCount}/{totalCount} completed today
          </p>
        </div>
        <Link href="/dashboard/habits/new">
          <Button className="bg-green-500 hover:bg-green-600 text-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all duration-200 min-w-[44px] min-h-[44px]">
            <Plus className="h-5 w-5" />
          </Button>
        </Link>
      </div>

      {/* Progress Overview */}
      <Card className="mb-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold">Today's Progress</h3>
            <span className="text-2xl font-black text-green-500">
              {Math.round((completedCount / totalCount) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4 border-2 border-black">
            <div
              className="bg-green-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${(completedCount / totalCount) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {[
          { key: "all", label: "All", icon: Target },
          { key: "completed", label: "Completed", icon: TrendingUp },
          { key: "pending", label: "Pending", icon: Calendar },
        ].map(({ key, label, icon: Icon }) => (
          <Button
            key={key}
            variant={filter === key ? "default" : "outline"}
            onClick={() => setFilter(key as any)}
            className={`flex items-center gap-2 rounded-xl border-2 border-black font-bold whitespace-nowrap min-h-[44px] ${
              filter === key
                ? "bg-green-500 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                : "bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
            }`}
          >
            <Icon className="h-4 w-4" />
            {label}
          </Button>
        ))}
      </div>

      {/* Habits List */}
      <div className="space-y-4">
        {filteredHabits.map((habit) => (
          <Card
            key={habit.id}
            className={`border-4 border-black transition-all duration-200 ${
              habit.completedToday
                ? "bg-green-50 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.3)]"
                : "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            }`}
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-black mb-1">{habit.name}</h3>
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="border-black font-medium">
                      {habit.category}
                    </Badge>
                    <span className="text-sm text-gray-600">Target: {habit.target}</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="flex items-center gap-1">
                      🔥 <strong>{habit.streak}</strong> day streak
                    </span>
                    <span className="text-gray-600">Progress: {habit.progress}%</span>
                  </div>
                </div>

                <button
                  onClick={() => toggleHabit(habit.id)}
                  className={`w-12 h-12 rounded-xl border-2 border-black font-bold transition-all duration-200 ${
                    habit.completedToday
                      ? "bg-green-500 text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white hover:bg-gray-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                  }`}
                >
                  {habit.completedToday ? "✓" : "○"}
                </button>
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2 border border-black">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${habit.color}`}
                  style={{ width: `${habit.progress}%` }}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredHabits.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🎯</div>
          <h3 className="text-xl font-bold text-black mb-2">No habits found</h3>
          <p className="text-gray-600 mb-6">
            {filter === "all" ? "Start building better habits today!" : `No ${filter} habits for today.`}
          </p>
          {filter === "all" && (
            <Link href="/dashboard/habits/new">
              <Button className="bg-green-500 hover:bg-green-600 text-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-bold px-6 py-3">
                Create Your First Habit
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  )
}
