"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, Clock, MousePointer, Eye, TrendingUp } from "lucide-react"

interface EngagementChartProps {
  filters: any
  isDarkMode: boolean
  isLoading: boolean
}

export default function EngagementChart({ filters, isDarkMode, isLoading }: EngagementChartProps) {
  // Mock engagement data
  const engagementData = {
    dailyActiveUsers: [45, 52, 48, 61, 55, 58, 63],
    sessionDurations: [8, 12, 15, 11, 14, 16, 13],
    pageViews: [120, 145, 132, 178, 156, 162, 189],
    interactions: [89, 102, 95, 134, 118, 125, 142],
  }

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

  const engagementMetrics = [
    {
      title: "Daily Active Users",
      value: "58",
      change: "+12%",
      trend: "up",
      icon: <Users className="h-5 w-5" />,
      data: engagementData.dailyActiveUsers,
      color: "red",
    },
    {
      title: "Avg Session Duration",
      value: "13.2m",
      change: "+1.8m",
      trend: "up",
      icon: <Clock className="h-5 w-5" />,
      data: engagementData.sessionDurations,
      color: "blue",
    },
    {
      title: "Page Views",
      value: "162",
      change: "+18%",
      trend: "up",
      icon: <Eye className="h-5 w-5" />,
      data: engagementData.pageViews,
      color: "green",
    },
    {
      title: "User Interactions",
      value: "125",
      change: "+15%",
      trend: "up",
      icon: <MousePointer className="h-5 w-5" />,
      data: engagementData.interactions,
      color: "purple",
    },
  ]

  if (isLoading) {
    return (
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card
            key={index}
            className={`border-3 rounded-xl p-6 animate-pulse ${
              isDarkMode ? "bg-black/50 border-red-600/50" : "bg-white/50 border-black/50"
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
      {engagementMetrics.map((metric, index) => (
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
            <div className="flex items-center justify-between mb-6">
              <div className={`text-3xl font-black ${isDarkMode ? "text-white" : "text-black"}`}>{metric.value}</div>
              <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Last 7 days</div>
            </div>

            {/* Mini Chart */}
            <div className="h-24 flex items-end justify-between gap-1">
              {metric.data.map((value, dataIndex) => {
                const maxValue = Math.max(...metric.data)
                const height = (value / maxValue) * 80

                return (
                  <div key={dataIndex} className="flex flex-col items-center flex-1">
                    <div
                      className={`w-full rounded-t-lg relative border-2 ${
                        isDarkMode
                          ? "bg-gradient-to-t from-gray-800 to-gray-700 border-red-600"
                          : "bg-gradient-to-t from-gray-200 to-gray-300 border-black"
                      }`}
                      style={{ height: "80px" }}
                    >
                      <div
                        className={`rounded-t-lg transition-all duration-500 ease-out ${
                          metric.color === "red"
                            ? "bg-gradient-to-t from-red-500 to-red-400"
                            : metric.color === "blue"
                              ? "bg-gradient-to-t from-blue-500 to-blue-400"
                              : metric.color === "green"
                                ? "bg-gradient-to-t from-green-500 to-green-400"
                                : "bg-gradient-to-t from-purple-500 to-purple-400"
                        }`}
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
  )
}
