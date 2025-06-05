"use client"

import { Card } from "@/components/ui/card"
import { Target, Trophy, Flame, Star } from "lucide-react"

interface GamificationStatsProps {
  isDarkMode: boolean
  isTransitioning: boolean
}

export default function GamificationStats({ isDarkMode, isTransitioning }: GamificationStatsProps) {
  const stats = [
    {
      icon: <Target className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />,
      value: "7",
      label: "Active Habits",
      badge: "+2 today",
      color: "green",
      delay: 100,
      gpValue: "+50 GP",
    },
    {
      icon: <Flame className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />,
      value: "12",
      label: "Day Streak",
      badge: "Personal Best",
      color: "black",
      delay: 150,
      gpValue: "+120 GP",
    },
    {
      icon: <Trophy className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />,
      value: "1,247",
      label: "Total Points",
      badge: "Level 12",
      color: "green",
      delay: 200,
      gpValue: "1,247 GP",
    },
    {
      icon: <Star className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />,
      value: "23",
      label: "Achievements",
      badge: "3 new",
      color: "black",
      delay: 250,
      gpValue: "+300 GP",
    },
  ]

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {stats.map((stat, index) => (
        <Card
          key={index}
          className={`border-3 sm:border-4 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ease-in-out hover:scale-105 ${
            isDarkMode
              ? "bg-gradient-to-br from-black/80 to-gray-900/80 border-green-600 shadow-[4px_4px_0px_0px_rgba(34,197,94,0.3)]"
              : stat.color === "green"
                ? "bg-gradient-to-br from-green-50 to-green-100 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                : "bg-gradient-to-br from-gray-50 to-gray-100 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          } ${isTransitioning ? "translate-y-1 opacity-90 scale-[0.98]" : "translate-y-0 opacity-100 scale-100"}`}
          style={{ transitionDelay: `${stat.delay}ms` }}
        >
          <div className="p-3 sm:p-4 lg:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
              <div
                className={`p-2 sm:p-3 rounded-lg sm:rounded-xl mb-2 sm:mb-0 w-fit transition-all duration-500 ease-in-out ${
                  stat.color === "green"
                    ? "bg-gradient-to-r from-green-500 to-green-600"
                    : "bg-gradient-to-r from-black to-gray-800"
                }`}
              >
                {stat.icon}
              </div>
              <div
                className={`px-2 py-1 rounded-full text-xs font-bold hidden sm:block transition-all duration-500 ease-in-out ${
                  isDarkMode
                    ? stat.color === "green"
                      ? "bg-green-600/20 text-green-300 border border-green-500/30"
                      : "bg-gray-600/20 text-gray-300 border border-gray-500/30"
                    : stat.color === "green"
                      ? "bg-green-100 text-green-800 border border-green-200"
                      : "bg-gray-100 text-gray-800 border border-gray-200"
                }`}
              >
                {stat.badge}
              </div>
            </div>
            <div
              className={`text-2xl sm:text-3xl font-black mb-1 transition-colors duration-500 ease-in-out ${isDarkMode ? "text-white" : "text-black"}`}
            >
              {stat.value}
            </div>
            <div
              className={`font-semibold text-xs sm:text-sm transition-colors duration-500 ease-in-out ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}
            >
              {stat.label}
            </div>
            <div
              className={`text-xs font-bold mt-1 transition-colors duration-500 ease-in-out ${
                isDarkMode ? "text-green-400" : "text-green-600"
              }`}
            >
              {stat.gpValue}
            </div>
            <div
              className={`px-2 py-1 rounded-full text-xs font-bold mt-2 sm:hidden w-fit transition-all duration-500 ease-in-out ${
                isDarkMode
                  ? stat.color === "green"
                    ? "bg-green-600/20 text-green-300 border border-green-500/30"
                    : "bg-gray-600/20 text-gray-300 border border-gray-500/30"
                  : stat.color === "green"
                    ? "bg-green-100 text-green-800 border border-green-200"
                    : "bg-gray-100 text-gray-800 border border-gray-200"
              }`}
            >
              {stat.badge}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
