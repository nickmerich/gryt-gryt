"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Target, TrendingUp, Calendar, CheckCircle, AlertCircle } from "lucide-react"

interface HabitAnalyticsProps {
  filters: any
  isDarkMode: boolean
  isLoading: boolean
}

export default function HabitAnalytics({ filters, isDarkMode, isLoading }: HabitAnalyticsProps) {
  // Mock habit analytics data
  const habitData = [
    {
      name: "Morning Meditation",
      category: "Mindfulness",
      completionRate: 92,
      streak: 12,
      totalSessions: 28,
      avgDuration: "15m",
      gpEarned: 420,
      trend: "up",
      status: "excellent",
    },
    {
      name: "Daily Exercise",
      category: "Health",
      completionRate: 85,
      streak: 8,
      totalSessions: 25,
      avgDuration: "45m",
      gpEarned: 375,
      trend: "up",
      status: "good",
    },
    {
      name: "Reading",
      category: "Learning",
      completionRate: 78,
      streak: 5,
      totalSessions: 22,
      avgDuration: "30m",
      gpEarned: 330,
      trend: "stable",
      status: "good",
    },
    {
      name: "Journaling",
      category: "Productivity",
      completionRate: 65,
      streak: 3,
      totalSessions: 18,
      avgDuration: "10m",
      gpEarned: 180,
      trend: "down",
      status: "needs-attention",
    },
    {
      name: "Water Intake",
      category: "Health",
      completionRate: 95,
      streak: 15,
      totalSessions: 30,
      avgDuration: "All day",
      gpEarned: 450,
      trend: "up",
      status: "excellent",
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "border-green-500 text-green-600 bg-green-50"
      case "good":
        return "border-blue-500 text-blue-600 bg-blue-50"
      case "needs-attention":
        return "border-red-500 text-red-600 bg-red-50"
      default:
        return "border-gray-500 text-gray-600 bg-gray-50"
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-500" />
      case "down":
        return <TrendingUp className="h-3 w-3 text-red-500 rotate-180" />
      default:
        return <TrendingUp className="h-3 w-3 text-gray-500 rotate-90" />
    }
  }

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card
            key={index}
            className={`border-3 rounded-xl p-6 animate-pulse ${
              isDarkMode ? "bg-black/50 border-red-600/50" : "bg-white/50 border-black/50"
            }`}
          >
            <div className="space-y-4">
              <div className={`h-6 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
              <div className={`h-20 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Habit Performance Overview */}
      <Card
        className={`border-3 rounded-xl overflow-hidden ${
          isDarkMode
            ? "bg-black/90 border-red-600 shadow-[4px_4px_0px_0px_rgba(220,38,38,0.3)]"
            : "bg-white/95 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
        }`}
      >
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Target className="h-5 w-5" />
            Habit Performance Analytics
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className={`text-2xl font-black mb-1 ${isDarkMode ? "text-white" : "text-black"}`}>83%</div>
              <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Avg Completion Rate
              </div>
            </div>

            <div className="text-center">
              <div className={`text-2xl font-black mb-1 ${isDarkMode ? "text-white" : "text-black"}`}>8.6</div>
              <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Avg Streak Days
              </div>
            </div>

            <div className="text-center">
              <div className={`text-2xl font-black mb-1 ${isDarkMode ? "text-white" : "text-black"}`}>1,755</div>
              <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Total GP Earned
              </div>
            </div>

            <div className="text-center">
              <div className={`text-2xl font-black mb-1 ${isDarkMode ? "text-white" : "text-black"}`}>5</div>
              <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Active Habits
              </div>
            </div>
          </div>

          {/* Individual Habit Cards */}
          <div className="space-y-4">
            {habitData.map((habit, index) => (
              <div
                key={index}
                className={`border-2 rounded-xl p-4 transition-all duration-300 ease-in-out ${
                  isDarkMode ? "border-red-600/30 bg-black/30" : "border-black/20 bg-gray-50"
                }`}
              >
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-black"}`}>{habit.name}</h3>
                      <Badge variant="outline" className="border-red-500 text-red-600 bg-red-50">
                        {habit.category}
                      </Badge>
                      <Badge variant="outline" className={getStatusColor(habit.status)}>
                        {habit.status === "excellent" && <CheckCircle className="h-3 w-3 mr-1" />}
                        {habit.status === "needs-attention" && <AlertCircle className="h-3 w-3 mr-1" />}
                        {habit.status.replace("-", " ")}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                      <div>
                        <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          Completion Rate
                        </span>
                        <div className="flex items-center gap-1">
                          <span className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                            {habit.completionRate}%
                          </span>
                          {getTrendIcon(habit.trend)}
                        </div>
                      </div>

                      <div>
                        <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          Current Streak
                        </span>
                        <div className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                          {habit.streak} days
                        </div>
                      </div>

                      <div>
                        <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          Sessions
                        </span>
                        <div className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                          {habit.totalSessions}
                        </div>
                      </div>

                      <div>
                        <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          Avg Duration
                        </span>
                        <div className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                          {habit.avgDuration}
                        </div>
                      </div>

                      <div>
                        <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          GP Earned
                        </span>
                        <div className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                          {habit.gpEarned} GP
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full lg:w-32">
                    <div
                      className={`w-full bg-gray-200 rounded-full h-3 ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
                    >
                      <div
                        className="bg-gradient-to-r from-red-500 to-red-600 h-3 rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${habit.completionRate}%` }}
                      ></div>
                    </div>
                    <div
                      className={`text-xs text-center mt-1 font-medium ${
                        isDarkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      {habit.completionRate}% Complete
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Habit Categories Performance */}
      <Card
        className={`border-3 rounded-xl overflow-hidden ${
          isDarkMode
            ? "bg-black/90 border-red-600 shadow-[4px_4px_0px_0px_rgba(220,38,38,0.3)]"
            : "bg-white/95 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
        }`}
      >
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Category Performance
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { category: "Health & Fitness", completion: 90, habits: 2, gp: 825 },
              { category: "Mindfulness", completion: 92, habits: 1, gp: 420 },
              { category: "Learning", completion: 78, habits: 1, gp: 330 },
              { category: "Productivity", completion: 65, habits: 1, gp: 180 },
            ].map((cat, index) => (
              <div
                key={index}
                className={`border-2 rounded-xl p-4 ${
                  isDarkMode ? "border-red-600/30 bg-black/30" : "border-black/20 bg-gray-50"
                }`}
              >
                <h3 className={`font-bold mb-3 ${isDarkMode ? "text-white" : "text-black"}`}>{cat.category}</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Completion Rate</span>
                    <span className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>{cat.completion}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Active Habits</span>
                    <span className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>{cat.habits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={`text-sm ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>GP Earned</span>
                    <span className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>{cat.gp} GP</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  )
}
