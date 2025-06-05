"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Award, Star, Zap, Target, Calendar, Flame, ArrowRight } from "lucide-react"

export default function GamificationDashboard() {
  // Mock user level data
  const userData = {
    level: 12,
    xp: 1240,
    xpToNextLevel: 1500,
    streakDays: 28,
    totalHabitsCompleted: 342,
    perfectDays: 14,
  }

  // Mock achievements data
  const achievements = [
    {
      id: 1,
      name: "Early Bird",
      description: "Complete morning habits for 7 consecutive days",
      icon: <Calendar className="h-5 w-5" />,
      progress: 100,
      completed: true,
      rarity: "common",
    },
    {
      id: 2,
      name: "Habit Master",
      description: "Complete all habits for 5 consecutive days",
      icon: <Trophy className="h-5 w-5" />,
      progress: 100,
      completed: true,
      rarity: "rare",
    },
    {
      id: 3,
      name: "Consistency King",
      description: "Maintain a 30-day streak on any habit",
      icon: <Flame className="h-5 w-5" />,
      progress: 93,
      completed: false,
      rarity: "epic",
    },
    {
      id: 4,
      name: "Habit Century",
      description: "Complete 100 total habits",
      icon: <Target className="h-5 w-5" />,
      progress: 100,
      completed: true,
      rarity: "common",
    },
    {
      id: 5,
      name: "Transformation",
      description: "Complete a habit every day for 90 days",
      icon: <Zap className="h-5 w-5" />,
      progress: 45,
      completed: false,
      rarity: "legendary",
    },
  ]

  // Weekly challenges
  const weeklyChallenges = [
    {
      id: 1,
      name: "Mindfulness Week",
      description: "Complete all mindfulness habits this week",
      reward: "150 GP",
      progress: 60,
      daysLeft: 3,
    },
    {
      id: 2,
      name: "Perfect Morning",
      description: "Complete all morning habits for 7 days",
      reward: "200 GP",
      progress: 40,
      daysLeft: 4,
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800 border-gray-300"
      case "rare":
        return "bg-blue-100 text-blue-800 border-blue-300"
      case "epic":
        return "bg-purple-100 text-purple-800 border-purple-300"
      case "legendary":
        return "bg-yellow-100 text-yellow-800 border-yellow-300"
      default:
        return "bg-gray-100 text-gray-800 border-gray-300"
    }
  }

  const getRarityBadge = (rarity: string) => {
    switch (rarity) {
      case "common":
        return (
          <Badge variant="outline" className="bg-gray-100 border-gray-300">
            Common
          </Badge>
        )
      case "rare":
        return (
          <Badge variant="outline" className="bg-blue-100 border-blue-300">
            Rare
          </Badge>
        )
      case "epic":
        return (
          <Badge variant="outline" className="bg-purple-100 border-purple-300">
            Epic
          </Badge>
        )
      case "legendary":
        return (
          <Badge variant="outline" className="bg-yellow-100 border-yellow-300">
            Legendary
          </Badge>
        )
      default:
        return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* User Level Card */}
      <Card className="border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 text-black">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold">Your Progress</h2>
            <div className="bg-black/20 px-3 py-1 rounded-full text-sm font-bold">Level {userData.level}</div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-yellow-100 p-3 rounded-full">
              <Trophy className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-bold">GP Progress</span>
                <span className="text-sm">
                  {userData.xp} / {userData.xpToNextLevel} GP
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${(userData.xp / userData.xpToNextLevel) * 100}%` }}
                ></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {userData.xpToNextLevel - userData.xp} GP to Level {userData.level + 1}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="border-2 border-black rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{userData.streakDays}</div>
              <div className="text-xs">Day Streak</div>
            </div>
            <div className="border-2 border-black rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{userData.totalHabitsCompleted}</div>
              <div className="text-xs">Habits Completed</div>
            </div>
            <div className="border-2 border-black rounded-xl p-3 text-center">
              <div className="text-2xl font-bold">{userData.perfectDays}</div>
              <div className="text-xs">Perfect Days</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Achievements */}
      <Card className="border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 text-black">
          <div className="flex items-center gap-2">
            <Award className="h-5 w-5" />
            <h2 className="text-lg font-bold">Achievements</h2>
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            {achievements.map((achievement) => (
              <div
                key={achievement.id}
                className={`border-2 rounded-xl p-3 ${
                  achievement.completed ? getRarityColor(achievement.rarity) : "bg-gray-50 border-gray-200"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`
                    p-2 rounded-full flex-shrink-0
                    ${achievement.completed ? "bg-white/50" : "bg-gray-100"}
                  `}
                  >
                    {achievement.icon}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h3 className="font-bold">{achievement.name}</h3>
                      {getRarityBadge(achievement.rarity)}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>

                    {!achievement.completed && (
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Progress</span>
                          <span>{achievement.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-yellow-500 h-2 rounded-full"
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" className="w-full mt-4 rounded-xl border-2 border-black font-bold">
            View All Achievements <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </Card>

      {/* Weekly Challenges */}
      <Card className="border-4 border-black rounded-xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 p-4 text-black">
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5" />
            <h2 className="text-lg font-bold">Weekly Challenges</h2>
          </div>
        </div>

        <div className="p-4">
          <div className="space-y-4">
            {weeklyChallenges.map((challenge) => (
              <div key={challenge.id} className="border-2 border-black rounded-xl p-3 bg-white">
                <div className="flex justify-between">
                  <h3 className="font-bold">{challenge.name}</h3>
                  <Badge className="bg-yellow-100 text-yellow-800 border border-yellow-200">
                    {challenge.daysLeft} days left
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">{challenge.description}</p>

                <div className="flex justify-between items-center mt-3">
                  <div className="flex-1 mr-4">
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{challenge.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: `${challenge.progress}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 px-3 py-1 rounded-lg text-sm font-bold text-yellow-800">
                    {challenge.reward}
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
