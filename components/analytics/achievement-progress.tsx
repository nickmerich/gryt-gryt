"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Award, Trophy, Star, Target } from "lucide-react"

interface AchievementProgressProps {
  filters: any
  isDarkMode: boolean
  isLoading: boolean
}

export default function AchievementProgress({ filters, isDarkMode, isLoading }: AchievementProgressProps) {
  // Mock achievement data
  const achievementStats = {
    total: 23,
    unlocked: 12,
    inProgress: 6,
    locked: 5,
    totalGP: 1840,
  }

  const recentAchievements = [
    {
      name: "Consistency King",
      description: "Complete habits for 30 consecutive days",
      rarity: "epic",
      progress: 93,
      gpReward: 200,
      unlockedDate: "2024-01-15",
      category: "Streaks",
    },
    {
      name: "Early Bird",
      description: "Complete morning habits for 7 consecutive days",
      rarity: "common",
      progress: 100,
      gpReward: 50,
      unlockedDate: "2024-01-12",
      category: "Getting Started",
    },
    {
      name: "Habit Master",
      description: "Complete all habits for 5 consecutive days",
      rarity: "rare",
      progress: 100,
      gpReward: 100,
      unlockedDate: "2024-01-10",
      category: "Mastery",
    },
    {
      name: "Growth Seeker",
      description: "Earn 1000 Growth Points",
      rarity: "rare",
      progress: 100,
      gpReward: 150,
      unlockedDate: "2024-01-08",
      category: "Growth",
    },
  ]

  const upcomingAchievements = [
    {
      name: "Transformation",
      description: "Complete a habit every day for 90 days",
      rarity: "legendary",
      progress: 45,
      gpReward: 500,
      category: "Streaks",
    },
    {
      name: "Mindful Master",
      description: "Complete 100 mindfulness sessions",
      rarity: "epic",
      progress: 67,
      gpReward: 250,
      category: "Mindfulness",
    },
    {
      name: "Learning Legend",
      description: "Complete learning habits for 60 days",
      rarity: "epic",
      progress: 38,
      gpReward: 300,
      category: "Learning",
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "border-gray-500 text-gray-600 bg-gray-50"
      case "rare":
        return "border-blue-500 text-blue-600 bg-blue-50"
      case "epic":
        return "border-purple-500 text-purple-600 bg-purple-50"
      case "legendary":
        return "border-amber-500 text-amber-600 bg-amber-50"
      default:
        return "border-gray-500 text-gray-600 bg-gray-50"
    }
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case "common":
        return <Target className="h-4 w-4" />
      case "rare":
        return <Star className="h-4 w-4" />
      case "epic":
        return <Award className="h-4 w-4" />
      case "legendary":
        return <Trophy className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
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
      {/* Achievement Overview */}
      <Card
        className={`border-3 rounded-xl overflow-hidden ${
          isDarkMode
            ? "bg-black/90 border-red-600 shadow-[4px_4px_0px_0px_rgba(220,38,38,0.3)]"
            : "bg-white/95 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
        }`}
      >
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <Award className="h-5 w-5" />
            Achievement Progress Overview
          </h2>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center">
              <div className={`text-2xl font-black mb-1 ${isDarkMode ? "text-white" : "text-black"}`}>
                {achievementStats.unlocked}
              </div>
              <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Unlocked</div>
            </div>

            <div className="text-center">
              <div className={`text-2xl font-black mb-1 ${isDarkMode ? "text-white" : "text-black"}`}>
                {achievementStats.inProgress}
              </div>
              <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>In Progress</div>
            </div>

            <div className="text-center">
              <div className={`text-2xl font-black mb-1 ${isDarkMode ? "text-white" : "text-black"}`}>
                {achievementStats.locked}
              </div>
              <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>Locked</div>
            </div>

            <div className="text-center">
              <div className={`text-2xl font-black mb-1 ${isDarkMode ? "text-white" : "text-black"}`}>
                {achievementStats.total}
              </div>
              <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                Total Available
              </div>
            </div>

            <div className="text-center">
              <div className={`text-2xl font-black mb-1 ${isDarkMode ? "text-white" : "text-black"}`}>
                {achievementStats.totalGP}
              </div>
              <div className={`text-sm font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>GP Earned</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Recent Achievements */}
      <Card
        className={`border-3 rounded-xl overflow-hidden ${
          isDarkMode
            ? "bg-black/90 border-red-600 shadow-[4px_4px_0px_0px_rgba(220,38,38,0.3)]"
            : "bg-white/95 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
        }`}
      >
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
          <h2 className="text-lg font-bold">Recently Unlocked</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentAchievements.map((achievement, index) => (
              <div
                key={index}
                className={`border-2 rounded-xl p-4 ${
                  isDarkMode ? "border-red-600/30 bg-black/30" : "border-black/20 bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${isDarkMode ? "bg-red-600/20" : "bg-red-100"}`}>
                    {getRarityIcon(achievement.rarity)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>{achievement.name}</h3>
                      <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                      <Badge variant="outline" className="border-green-500 text-green-600 bg-green-50">
                        +{achievement.gpReward} GP
                      </Badge>
                    </div>

                    <p className={`text-sm mb-2 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                      {achievement.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs">
                      <span className={`font-medium ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
                        Unlocked: {achievement.unlockedDate}
                      </span>
                      <Badge variant="outline" className="border-red-500 text-red-600 bg-red-50">
                        {achievement.category}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Upcoming Achievements */}
      <Card
        className={`border-3 rounded-xl overflow-hidden ${
          isDarkMode
            ? "bg-black/90 border-red-600 shadow-[4px_4px_0px_0px_rgba(220,38,38,0.3)]"
            : "bg-white/95 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
        }`}
      >
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
          <h2 className="text-lg font-bold">In Progress</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {upcomingAchievements.map((achievement, index) => (
              <div
                key={index}
                className={`border-2 rounded-xl p-4 ${
                  isDarkMode ? "border-red-600/30 bg-black/30" : "border-black/20 bg-gray-50"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl ${isDarkMode ? "bg-red-600/20" : "bg-red-100"}`}>
                    {getRarityIcon(achievement.rarity)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>{achievement.name}</h3>
                      <Badge variant="outline" className={getRarityColor(achievement.rarity)}>
                        {achievement.rarity}
                      </Badge>
                      <Badge variant="outline" className="border-blue-500 text-blue-600 bg-blue-50">
                        {achievement.gpReward} GP
                      </Badge>
                    </div>

                    <p className={`text-sm mb-3 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                      {achievement.description}
                    </p>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className={`font-medium ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                          Progress
                        </span>
                        <span className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
                          {achievement.progress}%
                        </span>
                      </div>
                      <div
                        className={`w-full bg-gray-200 rounded-full h-2 ${isDarkMode ? "bg-gray-700" : "bg-gray-200"}`}
                      >
                        <div
                          className="bg-gradient-to-r from-red-500 to-red-600 h-2 rounded-full transition-all duration-500 ease-out"
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
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
