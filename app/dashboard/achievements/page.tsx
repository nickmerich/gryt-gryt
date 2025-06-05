"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Target, Calendar, Flame, BookOpen, Clock, TrendingUp, Lock } from "lucide-react"

interface Achievement {
  id: number
  name: string
  description: string
  icon: React.ReactNode
  progress: number
  completed: boolean
  rarity: "common" | "rare" | "epic" | "legendary"
  gpReward: number
  category: string
  unlockedDate?: string
}

export default function AchievementsPage() {
  const [achievements] = useState<Achievement[]>([
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first habit",
      icon: <Target className="h-5 w-5" />,
      progress: 100,
      completed: true,
      rarity: "common",
      gpReward: 25,
      category: "Getting Started",
      unlockedDate: "2025-05-15",
    },
    {
      id: 2,
      name: "Streak Starter",
      description: "Maintain a 7-day streak on any habit",
      icon: <Flame className="h-5 w-5" />,
      progress: 100,
      completed: true,
      rarity: "common",
      gpReward: 50,
      category: "Streaks",
      unlockedDate: "2025-05-22",
    },
    {
      id: 3,
      name: "Habit Master",
      description: "Complete all habits for 5 consecutive days",
      icon: <Trophy className="h-5 w-5" />,
      progress: 100,
      completed: true,
      rarity: "rare",
      gpReward: 100,
      category: "Mastery",
      unlockedDate: "2025-05-28",
    },
    {
      id: 4,
      name: "Consistency King",
      description: "Maintain a 30-day streak on any habit",
      icon: <Calendar className="h-5 w-5" />,
      progress: 93,
      completed: false,
      rarity: "epic",
      gpReward: 200,
      category: "Streaks",
    },
    {
      id: 5,
      name: "Knowledge Seeker",
      description: "Read for 100 total hours",
      icon: <BookOpen className="h-5 w-5" />,
      progress: 67,
      completed: false,
      rarity: "rare",
      gpReward: 150,
      category: "Learning",
    },
    {
      id: 6,
      name: "Time Master",
      description: "Track habits for 90 consecutive days",
      icon: <Clock className="h-5 w-5" />,
      progress: 45,
      completed: false,
      rarity: "epic",
      gpReward: 300,
      category: "Dedication",
    },
    {
      id: 7,
      name: "Transformation",
      description: "Complete a habit every day for 365 days",
      icon: <Star className="h-5 w-5" />,
      progress: 12,
      completed: false,
      rarity: "legendary",
      gpReward: 1000,
      category: "Legendary",
    },
    {
      id: 8,
      name: "Early Bird",
      description: "Complete morning habits for 14 consecutive days",
      icon: <TrendingUp className="h-5 w-5" />,
      progress: 100,
      completed: true,
      rarity: "common",
      gpReward: 75,
      category: "Routines",
      unlockedDate: "2025-06-01",
    },
  ])

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "legendary":
        return "bg-amber-100 text-amber-800 border-amber-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "from-gray-500 to-gray-600"
      case "rare":
        return "from-blue-500 to-blue-600"
      case "epic":
        return "from-purple-500 to-purple-600"
      case "legendary":
        return "from-amber-500 to-amber-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  const completedAchievements = achievements.filter((a) => a.completed)
  const inProgressAchievements = achievements.filter((a) => !a.completed)
  const totalGP = completedAchievements.reduce((sum, a) => sum + a.gpReward, 0)

  const categories = Array.from(new Set(achievements.map((a) => a.category)))

  return (
    <div className="space-y-6 pb-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-black">Achievements</h1>
          <p className="text-gray-600 mt-1">
            {completedAchievements.length} of {achievements.length} unlocked • {totalGP} GP earned
          </p>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <div className="text-3xl font-black text-black">{completedAchievements.length}</div>
            <div className="text-sm text-gray-600">Unlocked</div>
          </div>
        </Card>
        <Card className="border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <div className="text-3xl font-black text-black">{totalGP}</div>
            <div className="text-sm text-gray-600">Total GP</div>
          </div>
        </Card>
        <Card className="border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <div className="text-3xl font-black text-black">
              {Math.round((completedAchievements.length / achievements.length) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
        </Card>
        <Card className="border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="text-center">
            <div className="text-3xl font-black text-black">
              {completedAchievements.filter((a) => a.rarity === "legendary").length}
            </div>
            <div className="text-sm text-gray-600">Legendary</div>
          </div>
        </Card>
      </div>

      {/* Achievements Grid */}
      <Card className="border-4 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        <Tabs defaultValue="all" className="w-full">
          <div className="border-b-2 border-black p-4">
            <TabsList className="bg-white/50 border-2 border-black rounded-xl p-1">
              <TabsTrigger
                value="all"
                className="rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white font-bold"
              >
                All
              </TabsTrigger>
              <TabsTrigger
                value="completed"
                className="rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white font-bold"
              >
                Completed
              </TabsTrigger>
              <TabsTrigger
                value="in-progress"
                className="rounded-lg data-[state=active]:bg-red-500 data-[state=active]:text-white font-bold"
              >
                In Progress
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {achievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="completed" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {completedAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="in-progress" className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {inProgressAchievements.map((achievement) => (
                <AchievementCard key={achievement.id} achievement={achievement} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  )
}

function AchievementCard({ achievement }: { achievement: Achievement }) {
  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "legendary":
        return "bg-amber-100 text-amber-800 border-amber-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getRarityGradient = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "from-gray-500 to-gray-600"
      case "rare":
        return "from-blue-500 to-blue-600"
      case "epic":
        return "from-purple-500 to-purple-600"
      case "legendary":
        return "from-amber-500 to-amber-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <Card
      className={`border-2 rounded-xl overflow-hidden transition-all hover:scale-105 ${
        achievement.completed
          ? `${getRarityColor(achievement.rarity)} shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]`
          : "bg-gray-50 border-gray-200 opacity-75"
      }`}
    >
      <div className={`p-4 text-white bg-gradient-to-r ${getRarityGradient(achievement.rarity)}`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {achievement.completed ? achievement.icon : <Lock className="h-5 w-5" />}
            <Badge className="bg-white/20 text-white border-white/30 text-xs">{achievement.rarity}</Badge>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold">+{achievement.gpReward} GP</div>
          </div>
        </div>
      </div>

      <div className="p-4">
        <h3 className={`font-bold mb-2 ${achievement.completed ? "text-black" : "text-gray-500"}`}>
          {achievement.name}
        </h3>
        <p className={`text-sm mb-3 ${achievement.completed ? "text-gray-700" : "text-gray-400"}`}>
          {achievement.description}
        </p>

        {!achievement.completed && (
          <div className="mb-3">
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{achievement.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${achievement.progress}%` }}
              ></div>
            </div>
          </div>
        )}

        <div className="flex justify-between items-center">
          <Badge variant="outline" className="text-xs">
            {achievement.category}
          </Badge>
          {achievement.completed && achievement.unlockedDate && (
            <span className="text-xs text-gray-500">{new Date(achievement.unlockedDate).toLocaleDateString()}</span>
          )}
        </div>
      </div>
    </Card>
  )
}
