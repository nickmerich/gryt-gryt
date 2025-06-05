"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, X, Flame, Target } from "lucide-react"

interface Achievement {
  id: number
  title: string
  description: string
  icon: React.ReactNode
  gpReward: number
  rarity: "common" | "rare" | "epic" | "legendary"
}

interface AchievementNotificationsProps {
  isDarkMode: boolean
}

export default function AchievementNotifications({ isDarkMode }: AchievementNotificationsProps) {
  const [notifications, setNotifications] = useState<Achievement[]>([])
  const [showNotification, setShowNotification] = useState(false)

  // Mock achievement notifications
  useEffect(() => {
    const mockAchievements: Achievement[] = [
      {
        id: 1,
        title: "Streak Master",
        description: "Completed 10 consecutive days of meditation",
        icon: <Flame className="h-5 w-5" />,
        gpReward: 100,
        rarity: "rare",
      },
      {
        id: 2,
        title: "Early Bird",
        description: "Completed morning routine 5 days in a row",
        icon: <Target className="h-5 w-5" />,
        gpReward: 50,
        rarity: "common",
      },
    ]

    // Simulate achievement unlock after 2 seconds
    const timer = setTimeout(() => {
      setNotifications(mockAchievements)
      setShowNotification(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const dismissNotification = (id: number) => {
    setNotifications(notifications.filter((n) => n.id !== id))
    if (notifications.length <= 1) {
      setShowNotification(false)
    }
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return isDarkMode ? "border-gray-500 bg-gray-800/90" : "border-gray-400 bg-gray-50"
      case "rare":
        return isDarkMode ? "border-blue-500 bg-blue-900/90" : "border-blue-400 bg-blue-50"
      case "epic":
        return isDarkMode ? "border-purple-500 bg-purple-900/90" : "border-purple-400 bg-purple-50"
      case "legendary":
        return isDarkMode ? "border-green-500 bg-green-900/90" : "border-green-400 bg-green-50"
      default:
        return isDarkMode ? "border-gray-500 bg-gray-800/90" : "border-gray-400 bg-gray-50"
    }
  }

  if (!showNotification || notifications.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {notifications.map((achievement) => (
        <Card
          key={achievement.id}
          className={`border-3 rounded-xl overflow-hidden animate-in slide-in-from-right-full duration-500 ${getRarityColor(achievement.rarity)} shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]`}
        >
          <div className="bg-gradient-to-r from-green-500 to-green-600 p-3 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Trophy className="h-4 w-4" />
                <span className="font-bold text-sm">Achievement Unlocked!</span>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0 text-white hover:bg-white/20"
                onClick={() => dismissNotification(achievement.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </div>
          <div className="p-3">
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg text-green-600">{achievement.icon}</div>
              <div className="flex-1">
                <h3 className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-black"}`}>{achievement.title}</h3>
                <p className={`text-xs mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
                  {achievement.description}
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                    +{achievement.gpReward} GP
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-bold capitalize ${getRarityColor(achievement.rarity)}`}
                  >
                    {achievement.rarity}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
