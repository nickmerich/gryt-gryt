"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Target, Flame, Star, Award, BarChart3 } from "lucide-react"

interface LeaderboardEntry {
  rank: number
  period: string
  score: number
  metric: string
  improvement: number
  badge?: string
}

export default function LeaderboardPage() {
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "year" | "all">("week")

  // Personal leaderboard data - comparing user's performance across different time periods
  const personalStats = {
    week: [
      { rank: 1, period: "This Week", score: 95, metric: "Completion Rate", improvement: +12, badge: "Personal Best" },
      { rank: 2, period: "Last Week", score: 83, metric: "Completion Rate", improvement: +5 },
      { rank: 3, period: "2 Weeks Ago", score: 78, metric: "Completion Rate", improvement: -2 },
      { rank: 4, period: "3 Weeks Ago", score: 80, metric: "Completion Rate", improvement: +8 },
      { rank: 5, period: "4 Weeks Ago", score: 72, metric: "Completion Rate", improvement: +15 },
    ],
    month: [
      { rank: 1, period: "This Month", score: 1247, metric: "GP Earned", improvement: +23, badge: "New Record" },
      { rank: 2, period: "Last Month", score: 1012, metric: "GP Earned", improvement: +18 },
      { rank: 3, period: "2 Months Ago", score: 856, metric: "GP Earned", improvement: +12 },
      { rank: 4, period: "3 Months Ago", score: 764, metric: "GP Earned", improvement: +8 },
      { rank: 5, period: "4 Months Ago", score: 708, metric: "GP Earned", improvement: +5 },
    ],
    year: [
      { rank: 1, period: "2025", score: 342, metric: "Habits Completed", improvement: +45, badge: "Yearly Champion" },
      { rank: 2, period: "2024", score: 236, metric: "Habits Completed", improvement: +89 },
    ],
    all: [
      { rank: 1, period: "Best Streak", score: 28, metric: "Days", improvement: 0, badge: "Streak Master" },
      { rank: 2, period: "Total GP", score: 12470, metric: "Points", improvement: 0, badge: "GP Legend" },
      { rank: 3, period: "Achievements", score: 23, metric: "Unlocked", improvement: 0, badge: "Achiever" },
      { rank: 4, period: "Perfect Days", score: 45, metric: "Days", improvement: 0, badge: "Perfectionist" },
    ],
  }

  const milestones = [
    {
      title: "First Habit Completed",
      date: "2025-01-15",
      description: "Started your journey with meditation",
      icon: <Target className="h-5 w-5" />,
      gp: 25,
    },
    {
      title: "First Week Streak",
      date: "2025-01-22",
      description: "Maintained consistency for 7 days",
      icon: <Flame className="h-5 w-5" />,
      gp: 100,
    },
    {
      title: "Level 10 Reached",
      date: "2025-03-10",
      description: "Achieved double-digit level",
      icon: <Trophy className="h-5 w-5" />,
      gp: 500,
    },
    {
      title: "1000 GP Milestone",
      date: "2025-05-20",
      description: "Crossed the 1000 GP threshold",
      icon: <Star className="h-5 w-5" />,
      gp: 1000,
    },
  ]

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />
      case 2:
        return <Award className="h-5 w-5 text-gray-400" />
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />
      default:
        return (
          <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center text-xs font-bold">
            {rank}
          </div>
        )
    }
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-500 text-white"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-400 text-white"
      case 3:
        return "bg-gradient-to-r from-amber-500 to-amber-600 text-white"
      default:
        return "bg-white border-2 border-black"
    }
  }

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-black">Personal Leaderboard</h1>
          <p className="text-gray-600 mt-1">Track your progress and celebrate your achievements</p>
        </div>
      </div>

      {/* Current Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <div className="text-3xl font-black text-black">12</div>
            <div className="text-sm text-gray-600">Current Level</div>
            <div className="text-xs text-red-600 font-bold mt-1">+2 this month</div>
          </div>
        </Card>
        <Card className="border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <div className="text-3xl font-black text-black">28</div>
            <div className="text-sm text-gray-600">Best Streak</div>
            <div className="text-xs text-red-600 font-bold mt-1">Personal Record</div>
          </div>
        </Card>
        <Card className="border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <div className="text-3xl font-black text-black">1,247</div>
            <div className="text-sm text-gray-600">Total GP</div>
            <div className="text-xs text-red-600 font-bold mt-1">+235 this week</div>
          </div>
        </Card>
        <Card className="border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <div className="text-3xl font-black text-black">95%</div>
            <div className="text-sm text-gray-600">This Week</div>
            <div className="text-xs text-red-600 font-bold mt-1">+12% improvement</div>
          </div>
        </Card>
      </div>

      {/* Performance Leaderboard */}
      <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <Tabs value={selectedPeriod} onValueChange={(value) => setSelectedPeriod(value as any)} className="w-full">
          <div className="border-b-2 border-black p-4">
            <TabsList className="bg-white/50 border-2 border-black rounded-xl p-1">
              <TabsTrigger
                value="week"
                className="rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white font-bold"
              >
                Weekly
              </TabsTrigger>
              <TabsTrigger
                value="month"
                className="rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white font-bold"
              >
                Monthly
              </TabsTrigger>
              <TabsTrigger
                value="year"
                className="rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white font-bold"
              >
                Yearly
              </TabsTrigger>
              <TabsTrigger
                value="all"
                className="rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white font-bold"
              >
                All Time
              </TabsTrigger>
            </TabsList>
          </div>

          {Object.entries(personalStats).map(([period, stats]) => (
            <TabsContent key={period} value={period} className="p-4">
              <div className="space-y-4">
                {stats.map((entry, index) => (
                  <div
                    key={index}
                    className={`border-2 rounded-xl p-4 transition-all hover:scale-105 ${getRankColor(entry.rank)} ${
                      entry.rank <= 3
                        ? "shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
                        : "shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {getRankIcon(entry.rank)}
                        <div>
                          <h3 className={`font-bold ${entry.rank <= 3 ? "text-white" : "text-black"}`}>
                            {entry.period}
                          </h3>
                          <p className={`text-sm ${entry.rank <= 3 ? "text-white/80" : "text-gray-600"}`}>
                            {entry.metric}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className={`text-2xl font-black ${entry.rank <= 3 ? "text-white" : "text-black"}`}>
                          {entry.score.toLocaleString()}
                        </div>
                        {entry.improvement !== 0 && (
                          <div
                            className={`text-sm font-bold ${
                              entry.improvement > 0
                                ? entry.rank <= 3
                                  ? "text-green-200"
                                  : "text-green-600"
                                : entry.rank <= 3
                                  ? "text-red-200"
                                  : "text-red-600"
                            }`}
                          >
                            {entry.improvement > 0 ? "+" : ""}
                            {entry.improvement}%
                          </div>
                        )}
                      </div>

                      {entry.badge && (
                        <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold text-white">
                          {entry.badge}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      {/* Milestones Timeline */}
      <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            <h2 className="text-lg font-bold">Achievement Milestones</h2>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-4">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-4 border-2 border-black rounded-xl p-4">
                <div className="bg-red-100 p-3 rounded-full text-red-600 flex-shrink-0">{milestone.icon}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-black">{milestone.title}</h3>
                      <p className="text-gray-600 text-sm mt-1">{milestone.description}</p>
                      <p className="text-gray-500 text-xs mt-2">{new Date(milestone.date).toLocaleDateString()}</p>
                    </div>
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      +{milestone.gp} GP
                    </div>
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
