export const dynamic = "force-dynamic"

import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Trophy, Star, Target, Zap } from "lucide-react"

export default function AchievementsPage() {
  const achievements = [
    {
      id: 1,
      name: "First Steps",
      description: "Complete your first habit",
      icon: Target,
      earned: true,
      earnedAt: "2024-01-15",
      rarity: "common",
    },
    {
      id: 2,
      name: "Week Warrior",
      description: "Maintain a 7-day streak",
      icon: Zap,
      earned: true,
      earnedAt: "2024-01-22",
      rarity: "uncommon",
    },
    {
      id: 3,
      name: "Habit Master",
      description: "Complete 100 habits",
      icon: Trophy,
      earned: false,
      progress: 67,
      rarity: "rare",
    },
    {
      id: 4,
      name: "Perfect Month",
      description: "Complete all habits for 30 days",
      icon: Star,
      earned: false,
      progress: 23,
      rarity: "legendary",
    },
  ]

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-800"
      case "uncommon":
        return "bg-green-100 text-green-800"
      case "rare":
        return "bg-blue-100 text-blue-800"
      case "legendary":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Achievements</h1>
        <p className="text-muted-foreground">Track your progress and unlock rewards</p>
      </div>

      <Suspense fallback={<div>Loading achievements...</div>}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {achievements.map((achievement) => {
            const Icon = achievement.icon
            return (
              <Card
                key={achievement.id}
                className={`transition-all duration-200 ${
                  achievement.earned ? "border-green-200 bg-green-50/50" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className={`h-6 w-6 ${achievement.earned ? "text-green-600" : "text-gray-400"}`} />
                      <CardTitle className="text-lg">{achievement.name}</CardTitle>
                    </div>
                    <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                  </div>
                  <CardDescription>{achievement.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  {achievement.earned ? (
                    <div className="flex items-center space-x-2 text-sm text-green-600">
                      <Trophy className="h-4 w-4" />
                      <span>Earned on {achievement.earnedAt}</span>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{achievement.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 transition-all duration-300"
                          style={{ width: `${achievement.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </Suspense>
    </div>
  )
}
