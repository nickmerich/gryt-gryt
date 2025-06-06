"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Flame, Trophy, Calendar, Target, Zap, CheckCircle, XCircle } from "lucide-react"
import type { Goal } from "@/lib/goal-service"
import type { GoalStreak, StreakStats, StreakMilestone } from "@/lib/goal-streak-service"

interface GoalStreakTrackerProps {
  goal: Goal
  isDarkMode?: boolean
  onStreakUpdate?: (streak: GoalStreak) => void
}

export default function GoalStreakTracker({ goal, isDarkMode = false, onStreakUpdate }: GoalStreakTrackerProps) {
  const [streak, setStreak] = useState<GoalStreak | null>(null)
  const [stats, setStats] = useState<StreakStats | null>(null)
  const [nextMilestone, setNextMilestone] = useState<StreakMilestone | null>(null)
  const [achievedMilestones, setAchievedMilestones] = useState<StreakMilestone[]>([])
  const [motivation, setMotivation] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState(false)

  useEffect(() => {
    fetchStreakData()
  }, [goal.id])

  const fetchStreakData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/goals/streaks?goalId=${goal.id}`)
      const data = await response.json()

      if (response.ok) {
        setStreak(data.streak)
        setStats(data.stats)
        setNextMilestone(data.nextMilestone)
        setAchievedMilestones(data.achievedMilestones)
        setMotivation(data.motivation)
      }
    } catch (error) {
      console.error("Failed to fetch streak data:", error)
    } finally {
      setLoading(false)
    }
  }

  const updateStreak = async (achieved: boolean) => {
    try {
      setUpdating(true)
      const response = await fetch("/api/goals/streaks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          goalId: goal.id,
          achieved,
          date: new Date().toISOString(),
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setStreak(data.streak)
        setStats(data.stats)
        setNextMilestone(data.nextMilestone)
        setMotivation(data.motivation)
        onStreakUpdate?.(data.streak)
      }
    } catch (error) {
      console.error("Failed to update streak:", error)
    } finally {
      setUpdating(false)
    }
  }

  const renderStreakCalendar = () => {
    if (!streak) return null

    const today = new Date()
    const last30Days = Array.from({ length: 30 }, (_, i) => {
      const date = new Date(today)
      date.setDate(date.getDate() - (29 - i))
      return date
    })

    return (
      <div className="grid grid-cols-10 gap-1">
        {last30Days.map((date, index) => {
          const isAchieved = streak.achievementDates.some(
            (achievedDate) => new Date(achievedDate).toDateString() === date.toDateString(),
          )
          const isToday = date.toDateString() === today.toDateString()

          return (
            <div
              key={index}
              className={`w-6 h-6 rounded-sm border-2 flex items-center justify-center text-xs font-bold ${
                isAchieved
                  ? "bg-green-500 border-green-400 text-white"
                  : isToday
                    ? isDarkMode
                      ? "border-green-400 bg-green-950/50 text-green-400"
                      : "border-green-500 bg-green-50 text-green-600"
                    : isDarkMode
                      ? "border-gray-600 bg-gray-800 text-gray-400"
                      : "border-gray-300 bg-gray-100 text-gray-500"
              }`}
              title={`${date.toLocaleDateString()} - ${isAchieved ? "Achieved" : "Not achieved"}`}
            >
              {isAchieved ? "✓" : isToday ? "•" : ""}
            </div>
          )
        })}
      </div>
    )
  }

  const renderMilestones = () => {
    if (!nextMilestone && achievedMilestones.length === 0) return null

    return (
      <div className="space-y-4">
        {/* Next Milestone */}
        {nextMilestone && (
          <div
            className={`p-4 rounded-lg border-2 ${
              isDarkMode ? "border-yellow-600 bg-yellow-950/20" : "border-yellow-500 bg-yellow-50"
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{nextMilestone.icon}</span>
                <div>
                  <h4 className={`font-bold ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`}>Next Milestone</h4>
                  <p className={`text-sm ${isDarkMode ? "text-yellow-300" : "text-yellow-700"}`}>
                    {nextMilestone.title}
                  </p>
                </div>
              </div>
              <Badge
                variant="outline"
                className={`${isDarkMode ? "border-yellow-400 text-yellow-400" : "border-yellow-500 text-yellow-600"}`}
              >
                {nextMilestone.days} days
              </Badge>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>{streak?.currentStreak || 0} days</span>
                <span>{nextMilestone.days} days</span>
              </div>
              <Progress value={((streak?.currentStreak || 0) / nextMilestone.days) * 100} className="h-2" />
              <p className={`text-xs ${isDarkMode ? "text-yellow-300" : "text-yellow-700"}`}>
                {nextMilestone.days - (streak?.currentStreak || 0)} days to go • +{nextMilestone.gpReward} GP reward
              </p>
            </div>
          </div>
        )}

        {/* Achieved Milestones */}
        {achievedMilestones.length > 0 && (
          <div>
            <h4 className={`font-bold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>Achieved Milestones</h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {achievedMilestones.slice(-6).map((milestone) => (
                <div
                  key={milestone.days}
                  className={`p-2 rounded-lg border-2 text-center ${
                    isDarkMode ? "border-green-600 bg-green-950/20" : "border-green-500 bg-green-50"
                  }`}
                >
                  <div className="text-lg">{milestone.icon}</div>
                  <div className={`text-xs font-bold ${isDarkMode ? "text-green-400" : "text-green-600"}`}>
                    {milestone.days} days
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <Card
        className={`border-3 rounded-xl p-6 animate-pulse ${
          isDarkMode ? "bg-black/50 border-green-600/50" : "bg-white/50 border-black/50"
        }`}
      >
        <div className="space-y-4">
          <div className={`h-6 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
          <div className={`h-32 rounded ${isDarkMode ? "bg-gray-700" : "bg-gray-300"}`}></div>
        </div>
      </Card>
    )
  }

  if (!streak) {
    return (
      <Card
        className={`border-3 rounded-xl p-6 ${
          isDarkMode
            ? "bg-black/90 border-green-600 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.3)]"
            : "bg-white/95 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
        }`}
      >
        <div className="text-center space-y-4">
          <Flame className={`h-12 w-12 mx-auto ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
          <h3 className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Start Your Streak</h3>
          <p className={`${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
            Begin tracking your goal achievements to build a streak!
          </p>
        </div>
      </Card>
    )
  }

  return (
    <Card
      className={`border-3 rounded-xl overflow-hidden ${
        isDarkMode
          ? "bg-black/90 border-green-600 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.3)]"
          : "bg-white/95 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Flame className="h-6 w-6" />
            <div>
              <h3 className="text-lg font-bold">Goal Streak</h3>
              <p className="text-orange-100 text-sm">{goal.description || goal.metric}</p>
            </div>
          </div>

          <div className="text-right">
            <div className="text-2xl font-black">{streak.currentStreak}</div>
            <div className="text-sm text-orange-100">days</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Current Streak Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div
            className={`p-3 rounded-lg border-2 text-center ${
              isDarkMode ? "border-orange-600 bg-orange-950/20" : "border-orange-500 bg-orange-50"
            }`}
          >
            <Flame className={`h-5 w-5 mx-auto mb-1 ${isDarkMode ? "text-orange-400" : "text-orange-600"}`} />
            <div className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
              {streak.currentStreak}
            </div>
            <div className={`text-xs ${isDarkMode ? "text-orange-400" : "text-orange-600"}`}>Current</div>
          </div>

          <div
            className={`p-3 rounded-lg border-2 text-center ${
              isDarkMode ? "border-yellow-600 bg-yellow-950/20" : "border-yellow-500 bg-yellow-50"
            }`}
          >
            <Trophy className={`h-5 w-5 mx-auto mb-1 ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`} />
            <div className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
              {streak.longestStreak}
            </div>
            <div className={`text-xs ${isDarkMode ? "text-yellow-400" : "text-yellow-600"}`}>Best</div>
          </div>

          <div
            className={`p-3 rounded-lg border-2 text-center ${
              isDarkMode ? "border-green-600 bg-green-950/20" : "border-green-500 bg-green-50"
            }`}
          >
            <Target className={`h-5 w-5 mx-auto mb-1 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
            <div className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
              {stats?.successRate || 0}%
            </div>
            <div className={`text-xs ${isDarkMode ? "text-green-400" : "text-green-600"}`}>Success</div>
          </div>

          <div
            className={`p-3 rounded-lg border-2 text-center ${
              isDarkMode ? "border-blue-600 bg-blue-950/20" : "border-blue-500 bg-blue-50"
            }`}
          >
            <Calendar className={`h-5 w-5 mx-auto mb-1 ${isDarkMode ? "text-blue-400" : "text-blue-600"}`} />
            <div className={`text-lg font-bold ${isDarkMode ? "text-white" : "text-black"}`}>
              {streak.totalAchievements}
            </div>
            <div className={`text-xs ${isDarkMode ? "text-blue-400" : "text-blue-600"}`}>Total</div>
          </div>
        </div>

        {/* Motivation Message */}
        <div
          className={`p-4 rounded-lg border-2 ${
            isDarkMode ? "border-green-600 bg-green-950/20" : "border-green-500 bg-green-50"
          }`}
        >
          <div className="flex items-start gap-3">
            <Zap className={`h-5 w-5 mt-0.5 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
            <p className={`text-sm ${isDarkMode ? "text-green-300" : "text-green-700"}`}>{motivation}</p>
          </div>
        </div>

        {/* Streak Calendar */}
        <div>
          <h4 className={`font-bold mb-3 ${isDarkMode ? "text-white" : "text-black"}`}>Last 30 Days</h4>
          {renderStreakCalendar()}
          <div className="flex items-center justify-between mt-2 text-xs">
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>30 days ago</span>
            <span className={isDarkMode ? "text-gray-400" : "text-gray-500"}>Today</span>
          </div>
        </div>

        {/* Milestones */}
        {renderMilestones()}

        {/* Action Buttons */}
        <div className="flex gap-3">
          <Button
            onClick={() => updateStreak(true)}
            disabled={updating}
            className="flex-1 bg-green-500 hover:bg-green-600 text-white font-bold border-2 border-green-400 rounded-xl"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            {updating ? "Updating..." : "Goal Achieved"}
          </Button>

          <Button
            onClick={() => updateStreak(false)}
            disabled={updating}
            variant="outline"
            className={`flex-1 border-2 font-bold rounded-xl ${
              isDarkMode
                ? "border-red-600 hover:bg-red-950/50 text-red-400"
                : "border-red-500 hover:bg-red-50 text-red-600"
            }`}
          >
            <XCircle className="h-4 w-4 mr-2" />
            Missed Today
          </Button>
        </div>
      </div>
    </Card>
  )
}
