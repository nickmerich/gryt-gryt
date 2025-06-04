"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Plus,
  Search,
  Filter,
  CheckCircle2,
  Target,
  Calendar,
  Clock,
  BarChart2,
  ArrowRight,
  Trash2,
  Edit,
  MoreHorizontal,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Habit {
  id: number
  name: string
  category: string
  streak: number
  target?: string
  frequency: "daily" | "weekly" | "monthly"
  timeOfDay?: string
  completed: boolean
  progress: number
}

export default function HabitsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [habits, setHabits] = useState<Habit[]>([
    {
      id: 1,
      name: "Morning meditation",
      category: "Mindfulness",
      streak: 12,
      target: "10 minutes",
      frequency: "daily",
      timeOfDay: "Morning",
      completed: true,
      progress: 100,
    },
    {
      id: 2,
      name: "Read",
      category: "Learning",
      streak: 8,
      target: "20 pages",
      frequency: "daily",
      timeOfDay: "Evening",
      completed: true,
      progress: 100,
    },
    {
      id: 3,
      name: "Exercise",
      category: "Fitness",
      streak: 5,
      target: "30 minutes",
      frequency: "daily",
      timeOfDay: "Afternoon",
      completed: true,
      progress: 100,
    },
    {
      id: 4,
      name: "Drink water",
      category: "Health",
      streak: 3,
      target: "8 glasses",
      frequency: "daily",
      completed: false,
      progress: 62.5,
    },
    {
      id: 5,
      name: "Journal",
      category: "Reflection",
      streak: 7,
      target: "10 minutes",
      frequency: "daily",
      timeOfDay: "Evening",
      completed: false,
      progress: 0,
    },
    {
      id: 6,
      name: "Weekly review",
      category: "Productivity",
      streak: 4,
      target: "30 minutes",
      frequency: "weekly",
      timeOfDay: "Sunday",
      completed: false,
      progress: 0,
    },
    {
      id: 7,
      name: "Learn Spanish",
      category: "Learning",
      streak: 15,
      target: "15 minutes",
      frequency: "daily",
      completed: false,
      progress: 0,
    },
  ])

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Mindfulness":
        return "bg-purple-100 text-purple-800"
      case "Learning":
        return "bg-blue-100 text-blue-800"
      case "Fitness":
        return "bg-green-100 text-green-800"
      case "Health":
        return "bg-red-100 text-red-800"
      case "Reflection":
        return "bg-yellow-100 text-yellow-800"
      case "Productivity":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getFrequencyIcon = (frequency: string) => {
    switch (frequency) {
      case "daily":
        return <Calendar className="h-3 w-3 mr-1" />
      case "weekly":
        return <Calendar className="h-3 w-3 mr-1" />
      case "monthly":
        return <Calendar className="h-3 w-3 mr-1" />
      default:
        return <Calendar className="h-3 w-3 mr-1" />
    }
  }

  const filteredHabits = habits.filter(
    (habit) =>
      habit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      habit.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const dailyHabits = filteredHabits.filter((habit) => habit.frequency === "daily")
  const weeklyHabits = filteredHabits.filter((habit) => habit.frequency === "weekly")
  const monthlyHabits = filteredHabits.filter((habit) => habit.frequency === "monthly")

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-black">Habit Tracker</h1>
        <Link href="/dashboard/habits/new">
          <Button className="bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Plus className="h-4 w-4 mr-2" /> Add New Habit
          </Button>
        </Link>
      </div>

      <Card className="border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search habits..."
              className="pl-9 border-2 border-black rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="rounded-xl border-2 border-black font-bold">
            <Filter className="h-4 w-4 mr-2" /> Filter
          </Button>
        </div>

        <Tabs defaultValue="all">
          <TabsList className="bg-white/50 border-2 border-black rounded-xl p-1 mb-4">
            <TabsTrigger
              value="all"
              className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white font-bold"
            >
              All Habits
            </TabsTrigger>
            <TabsTrigger
              value="daily"
              className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white font-bold"
            >
              Daily
            </TabsTrigger>
            <TabsTrigger
              value="weekly"
              className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white font-bold"
            >
              Weekly
            </TabsTrigger>
            <TabsTrigger
              value="monthly"
              className="rounded-lg data-[state=active]:bg-black data-[state=active]:text-white font-bold"
            >
              Monthly
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filteredHabits.length > 0 ? (
              filteredHabits.map((habit) => <HabitCard key={habit.id} habit={habit} />)
            ) : (
              <EmptyState query={searchQuery} />
            )}
          </TabsContent>

          <TabsContent value="daily" className="space-y-4">
            {dailyHabits.length > 0 ? (
              dailyHabits.map((habit) => <HabitCard key={habit.id} habit={habit} />)
            ) : (
              <EmptyState frequency="daily" query={searchQuery} />
            )}
          </TabsContent>

          <TabsContent value="weekly" className="space-y-4">
            {weeklyHabits.length > 0 ? (
              weeklyHabits.map((habit) => <HabitCard key={habit.id} habit={habit} />)
            ) : (
              <EmptyState frequency="weekly" query={searchQuery} />
            )}
          </TabsContent>

          <TabsContent value="monthly" className="space-y-4">
            {monthlyHabits.length > 0 ? (
              monthlyHabits.map((habit) => <HabitCard key={habit.id} habit={habit} />)
            ) : (
              <EmptyState frequency="monthly" query={searchQuery} />
            )}
          </TabsContent>
        </Tabs>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-4 text-white">
            <h2 className="text-lg font-bold">Habit Streaks</h2>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {habits
                .sort((a, b) => b.streak - a.streak)
                .slice(0, 3)
                .map((habit) => (
                  <div
                    key={habit.id}
                    className="flex items-center justify-between border-2 border-black rounded-xl p-3"
                  >
                    <div className="flex items-center gap-3">
                      <div className="bg-amber-100 p-2 rounded-full">
                        <Target className="h-4 w-4 text-amber-600" />
                      </div>
                      <span className="font-bold">{habit.name}</span>
                    </div>
                    <div className="flex items-center gap-1 bg-amber-100 px-3 py-1 rounded-full text-amber-800 font-bold">
                      <span>{habit.streak}</span>
                      <span className="text-xs">days</span>
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-4 text-center">
              <Link href="/dashboard/analytics">
                <Button variant="link" className="text-purple-600">
                  View detailed analytics <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <Card className="border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-gradient-to-r from-green-500 to-teal-500 p-4 text-white">
            <h2 className="text-lg font-bold">Completion Rate</h2>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-center h-40">
              <div className="relative w-32 h-32">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    className="text-gray-200"
                    strokeWidth="10"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                  <circle
                    className="text-green-500"
                    strokeWidth="10"
                    strokeDasharray={`${(3 / 5) * 251.2} 251.2`}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r="40"
                    cx="50"
                    cy="50"
                  />
                </svg>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                  <div className="text-3xl font-bold">60%</div>
                  <div className="text-xs text-gray-500">Today</div>
                </div>
              </div>
            </div>
            <div className="text-center mt-4">
              <p className="text-sm text-gray-600 mb-2">3 of 5 habits completed today</p>
              <Link href="/dashboard/analytics">
                <Button variant="link" className="text-green-600">
                  View history <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>

        <Card className="border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <div className="bg-gradient-to-r from-blue-500 to-indigo-500 p-4 text-white">
            <h2 className="text-lg font-bold">Habit Categories</h2>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">Mindfulness</span>
                <span className="text-sm">1 habit</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: "14%" }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">Learning</span>
                <span className="text-sm">2 habits</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "29%" }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">Fitness</span>
                <span className="text-sm">1 habit</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "14%" }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">Health</span>
                <span className="text-sm">1 habit</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-red-500 h-2 rounded-full" style={{ width: "14%" }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">Reflection</span>
                <span className="text-sm">1 habit</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-yellow-500 h-2 rounded-full" style={{ width: "14%" }}></div>
              </div>

              <div className="flex items-center justify-between">
                <span className="font-bold text-sm">Productivity</span>
                <span className="text-sm">1 habit</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-indigo-500 h-2 rounded-full" style={{ width: "14%" }}></div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

function HabitCard({ habit }: { habit: Habit }) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Mindfulness":
        return "bg-purple-100 text-purple-800"
      case "Learning":
        return "bg-blue-100 text-blue-800"
      case "Fitness":
        return "bg-green-100 text-green-800"
      case "Health":
        return "bg-red-100 text-red-800"
      case "Reflection":
        return "bg-yellow-100 text-yellow-800"
      case "Productivity":
        return "bg-indigo-100 text-indigo-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div
      className={`
      border-2 border-black rounded-xl p-4 transition-all
      ${habit.completed ? "bg-green-50" : "bg-white"}
    `}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="p-0 h-auto">
            {habit.completed ? (
              <CheckCircle2 className="h-6 w-6 text-green-500" />
            ) : (
              <div className="h-6 w-6 border-2 border-gray-300 rounded-full" />
            )}
          </Button>

          <div>
            <h3 className={`font-bold ${habit.completed ? "line-through text-gray-500" : ""}`}>{habit.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(habit.category)}`}>
                {habit.category}
              </span>
              {habit.target && (
                <span className="text-xs text-gray-500 flex items-center">
                  <Target className="h-3 w-3 mr-1" />
                  {habit.target}
                </span>
              )}
              {habit.timeOfDay && (
                <span className="text-xs text-gray-500 flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {habit.timeOfDay}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-sm font-bold">{habit.streak} day streak</div>
            <div className="text-xs text-gray-500">{habit.completed ? "Completed" : "Pending"}</div>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="h-4 w-4 mr-2" /> Edit
              </DropdownMenuItem>
              <DropdownMenuItem>
                <BarChart2 className="h-4 w-4 mr-2" /> View Stats
              </DropdownMenuItem>
              <DropdownMenuItem className="text-red-600">
                <Trash2 className="h-4 w-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {habit.progress > 0 && habit.progress < 100 && (
        <div className="mt-3">
          <div className="flex justify-between text-xs mb-1">
            <span>Progress</span>
            <span>{habit.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${habit.progress}%` }}></div>
          </div>
        </div>
      )}
    </div>
  )
}

function EmptyState({ frequency, query }: { frequency?: string; query: string }) {
  if (query) {
    return (
      <div className="text-center py-8">
        <Search className="h-12 w-12 text-gray-300 mx-auto mb-2" />
        <h3 className="font-bold text-gray-500 mb-2">No habits found</h3>
        <p className="text-gray-500 mb-4">No habits match your search for "{query}"</p>
        <Button
          variant="outline"
          className="rounded-xl border-2 border-black font-bold"
          onClick={() => window.location.reload()}
        >
          Clear search
        </Button>
      </div>
    )
  }

  return (
    <div className="text-center py-8">
      <Target className="h-12 w-12 text-gray-300 mx-auto mb-2" />
      <h3 className="font-bold text-gray-500 mb-2">No {frequency} habits yet</h3>
      <p className="text-gray-500 mb-4">Create your first {frequency} habit to start tracking</p>
      <Link href="/dashboard/habits/new">
        <Button className="bg-black hover:bg-black/80 text-white rounded-xl border-2 border-black font-bold">
          <Plus className="h-4 w-4 mr-2" /> Add New Habit
        </Button>
      </Link>
    </div>
  )
}
