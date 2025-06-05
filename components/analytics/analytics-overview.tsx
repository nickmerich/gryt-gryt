"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown, Users, Target, Award, Clock, Zap, Calendar } from "lucide-react"

interface AnalyticsOverviewProps {
  filters: any
  isDarkMode: boolean
  isLoading: boolean
}

export default function AnalyticsOverview({ filters, isDarkMode, isLoading }: AnalyticsOverviewProps) {
  // Mock KPI data based on filters
  const getKPIData = () => {
    const baseData = {
      totalSessions: 156,
      avgSessionDuration: "12m 34s",
      habitCompletionRate: 87,
      totalGP: 2450,
      activeStreaks: 5,
      achievementsUnlocked: 12,
      weeklyGrowth: 15.3,
      monthlyActive: 28,
    }

    // Simulate filter effects
    if (filters.dateRange === "7d") {
      return {
        ...baseData,
        totalSessions: 42,
        weeklyGrowth: 22.1,
        monthlyActive: 7,
      }
    }

    return baseData
  }

  const kpiData = getKPIData()

  const kpiCards = [
    {
      title: "Total Sessions",
      value: kpiData.totalSessions.toLocaleString(),
      change: "+12%",
      trend: "up",
      icon: <Users className="h-5 w-5" />,
      description: "Active engagement sessions",
    },
    {
      title: "Avg Session Duration",
      value: kpiData.avgSessionDuration,
      change: "+2m 15s",
      trend: "up",
      icon: <Clock className="h-5 w-5" />,
      description: "Time spent per session",
    },
    {
      title: "Completion Rate",
      value: `${kpiData.habitCompletionRate}%`,
      change: "+5%",
      trend: "up",
      icon: <Target className="h-5 w-5" />,
      description: "Habits completed successfully",
    },
    {
      title: "Total Growth Points",
      value: kpiData.totalGP.toLocaleString(),
      change: "+340 GP",
      trend: "up",
      icon: <Zap className="h-5 w-5" />,
      description: "Accumulated growth points",
    },
    {
      title: "Active Streaks",
      value: kpiData.activeStreaks.toString(),
      change: "+2",
      trend: "up",
      icon: <Calendar className="h-5 w-5" />,
      description: "Current habit streaks",
    },
    {
      title: "Achievements",
      value: kpiData.achievementsUnlocked.toString(),
      change: "+3",
      trend: "up",
      icon: <Award className="h-5 w-5" />,
      description: "Unlocked achievements",
    },
  ]

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            key={index}
            className={`border-3 rounded-xl p-6 animate-pulse ${
              isDarkMode ? "bg-black/50 border-yellow-600/50" : "bg-white/50 border-black/50"
            }`}
          >
            <div className="space-y-3">
              <div className={`h-4 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
              <div className={`h-8 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
              <div className={`h-3 rounded w-1/2 ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
            </div>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card
            key={index}
            className={`border-3 rounded-xl overflow-hidden transition-all duration-300 ease-in-out hover:scale-105 ${
              isDarkMode
                ? "bg-black/90 border-yellow-600 shadow-[4px_4px_0px_0px_rgba(234,179,8,0.3)]"
                : "bg-white/95 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
            }`}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl ${isDarkMode ? "bg-yellow-600/20" : "bg-yellow-100"}`}>{kpi.icon}</div>
                <Badge
                  variant="outline"
                  className={`${
                    kpi.trend === "up"
                      ? "border-green-500 text-green-600 bg-green-50"
                      : "border-red-500 text-red-600 bg-red-50"
                  }`}
                >
                  {kpi.trend === "up" ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {kpi.change}
                </Badge>
              </div>

              <div className="space-y-2">
                <h3 className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>{kpi.title}</h3>
                <div className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-black"}`}>{kpi.value}</div>
                <p className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>{kpi.description}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Weekly Overview Chart */}
      <Card
        className={`border-3 rounded-xl overflow-hidden ${
          isDarkMode
            ? "bg-black/90 border-yellow-600 shadow-[4px_4px_0px_0px_rgba(234,179,8,0.3)]"
            : "bg-white/95 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
        }`}
      >
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 text-black">
          <h2 className="text-lg font-bold">Weekly Activity Overview</h2>
        </div>
        <div className="p-6">
          <div className="h-64 flex items-end justify-between gap-2">
            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => {
              const values = [85, 92, 78, 95, 88, 76, 90]
              const height = (values[index] / 100) * 200

              return (
                <div key={day} className="flex flex-col items-center flex-1">
                  <div
                    className={`w-full rounded-t-lg relative border-2 transition-all duration-500 ease-out ${
                      isDarkMode
                        ? "bg-gradient-to-t from-gray-800 to-gray-700 border-yellow-600"
                        : "bg-gradient-to-t from-gray-200 to-gray-300 border-black"
                    }`}
                    style={{ height: "200px" }}
                  >
                    <div
                      className="bg-gradient-to-t from-yellow-500 via-yellow-400 to-yellow-300 rounded-t-lg transition-all duration-500 ease-out"
                      style={{
                        height: `${height}px`,
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                      }}
                    />
                    <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-xs font-bold text-black drop-shadow-lg">
                      {values[index]}%
                    </div>
                  </div>
                  <span className={`text-sm font-semibold mt-2 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                    {day}
                  </span>
                </div>
              )
            })}
          </div>
        </div>
      </Card>
    </div>
  )
}
