"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Zap, Target, Award, Calendar } from "lucide-react"

interface GrowthMetricsProps {
  filters: any
  isDarkMode: boolean
  isLoading: boolean
}

export default function GrowthMetrics({ filters, isDarkMode, isLoading }: GrowthMetricsProps) {
  // Mock growth data
  const growthData = {
    gpEarned: [45, 62, 58, 71, 65, 78, 83],
    newHabits: [2, 1, 3, 2, 1, 2, 4],
    streakDays: [5, 6, 7, 8, 9, 10, 11],
    completionRate: [78, 82, 85, 88, 87, 90, 92],
  }

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const growthMetrics = [
    {
      title: "Growth Points Earned",
      value: "462 GP",
      change: "+38 GP",
      trend: "up",
      icon: <Zap className="h-5 w-5" />,
      data: growthData.gpEarned,
      total: growthData.gpEarned.reduce((a, b) => a + b, 0),
      description: "Total GP earned this week",
    },
    {
      title: "New Habits Created",
      value: "15",
      change: "+3",
      trend: "up",
      icon: <Target className="h-5 w-5" />,
      data: growthData.newHabits,
      total: growthData.newHabits.reduce((a, b) => a + b, 0),
      description: "Habits added this week",
    },
    {
      title: "Longest Streak",
      value: "11 days",
      change: "+6 days",
      trend: "up",
      icon: <Calendar className="h-5 w-5" />,
      data: growthData.streakDays,
      total: Math.max(...growthData.streakDays),
      description: "Current best streak",
    },
    {
      title: "Completion Rate",
      value: "87%",
      change: "+9%",
      trend: "up",
      icon: <Award className="h-5 w-5" />,
      data: growthData.completionRate,
      total: Math.round(growthData.completionRate.reduce((a, b) => a + b, 0) / growthData.completionRate.length),
      description: "Average completion rate",
    },
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, index) => (
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
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Growth Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {growthMetrics.map((metric, index) => (
          <Card
            key={index}
            className={`border-3 rounded-xl overflow-hidden ${
              isDarkMode
                ? "bg-black/90 border-red-600 shadow-[4px_4px_0px_0px_rgba(220,38,38,0.3)]"
                : "bg-white/95 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
            }`}
          >
            <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {metric.icon}
                  <h3 className="text-lg font-bold">{metric.title}</h3>
                </div>
                <Badge variant="outline" className="border-white/30 text-white bg-white/20">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  {metric.change}
                </Badge>
              </div>
            </div>

            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-black"}`}>{metric.value}</div>
                <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {metric.description}
                </div>
              </div>

              {/* Progress Chart */}
              <div className="h-16 flex items-end justify-between gap-1">
                {metric.data.map((value, dataIndex) => {
                  const maxValue = Math.max(...metric.data)
                  const height = maxValue > 0 ? (value / maxValue) * 50 : 0

                  return (
                    <div key={dataIndex} className="flex flex-col items-center flex-1">
                      <div
                        className={`w-full rounded-t-lg relative border-2 ${
                          isDarkMode
                            ? "bg-gradient-to-t from-gray-800 to-gray-700 border-red-600"
                            : "bg-gradient-to-t from-gray-200 to-gray-300 border-black"
                        }`}
                        style={{ height: "50px" }}
                      >
                        <div
                          className="bg-gradient-to-t from-red-500 to-red-400 rounded-t-lg transition-all duration-500 ease-out"
                          style={{
                            height: `${height}px`,
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                          }}
                        />
                      </div>
                      <span className={`text-xs font-semibold mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {days[dataIndex]}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Growth Velocity Chart */}
      <Card
        className={`border-3 rounded-xl overflow-hidden ${
          isDarkMode
            ? "bg-black/90 border-red-600 shadow-[4px_4px_0px_0px_rgba(220,38,38,0.3)]"
            : "bg-white/95 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
        }`}
      >
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Growth Velocity Trends
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className={`text-3xl font-black mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>+23%</div>
              <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Week over Week Growth
              </div>
              <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50 mt-2">
                Accelerating
              </Badge>
            </div>

            <div className="text-center">
              <div className={`text-3xl font-black mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>+67%</div>
              <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Month over Month Growth
              </div>
              <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50 mt-2">
                Strong Growth
              </Badge>
            </div>

            <div className="text-center">
              <div className={`text-3xl font-black mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>2.4x</div>
              <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Growth Multiplier
              </div>
              <Badge variant="outline" className="border-purple-500 text-purple-600 bg-purple-50 mt-2">
                Exponential
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
