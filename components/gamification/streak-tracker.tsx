"use client"

import { Flame, Calendar, Trophy, Target } from "lucide-react"

interface StreakTrackerProps {
  isDarkMode: boolean
}

export default function StreakTracker({ isDarkMode }: StreakTrackerProps) {
  const streaks = [
    {
      habit: "Meditation",
      current: 12,
      best: 15,
      icon: <Target className="h-4 w-4" />,
      color: "green",
    },
    {
      habit: "Reading",
      current: 8,
      best: 20,
      icon: <Calendar className="h-4 w-4" />,
      color: "gray",
    },
    {
      habit: "Exercise",
      current: 5,
      best: 12,
      icon: <Trophy className="h-4 w-4" />,
      color: "green",
    },
  ]

  return (
    <>
      <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white">
        <div className="flex items-center gap-2">
          <Flame className="h-5 w-5" />
          <h2 className="text-lg font-bold">Streak Tracker</h2>
        </div>
      </div>
      <div className="p-4">
        <div className="space-y-4">
          {streaks.map((streak, index) => (
            <div
              key={index}
              className={`border-2 rounded-xl p-3 transition-all duration-300 hover:scale-105 ${
                isDarkMode ? "border-green-600 bg-black/50" : "border-black bg-white"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`p-2 rounded-lg ${
                      streak.color === "green" ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {streak.icon}
                  </div>
                  <span className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>{streak.habit}</span>
                </div>
                <div className="text-right">
                  <div className={`text-lg font-black ${isDarkMode ? "text-white" : "text-black"}`}>
                    {streak.current}
                  </div>
                  <div className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>days</div>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span className={`text-xs ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Personal Best: {streak.best} days
                </span>
                <div className="flex items-center gap-1">
                  <Flame className="h-3 w-3 text-green-500" />
                  <span className="text-xs font-bold text-green-500">
                    {streak.current === streak.best ? "New Record!" : `${streak.best - streak.current} to beat`}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${(streak.current / streak.best) * 100}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
