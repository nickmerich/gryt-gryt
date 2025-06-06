"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import HabitTracker from "@/components/dashboard/habit-tracker"
import AiGuide from "@/components/dashboard/ai-guide"
import ProgressChart from "@/components/dashboard/progress-chart"
import GamificationStats from "@/components/gamification/gamification-stats"
import AchievementNotifications from "@/components/gamification/achievement-notifications"
import ProgressRings from "@/components/gamification/progress-rings"
import StreakTracker from "@/components/gamification/streak-tracker"
import {
  Target,
  BarChart3,
  BookOpen,
  Zap,
  CheckCircle2,
  ArrowRight,
  Moon,
  Sun,
  Trophy,
  Star,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function DashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [userLevel, setUserLevel] = useState(12)
  const [userGP, setUserGP] = useState(1240)
  const [nextLevelGP] = useState(1500)

  // Check for saved theme preference or system preference on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDarkMode(true)
    }
  }, [])

  const toggleTheme = () => {
    setIsTransitioning(true)

    // Small delay to ensure transition class is applied before theme changes
    setTimeout(() => {
      setIsDarkMode(!isDarkMode)
      localStorage.setItem("theme", !isDarkMode ? "dark" : "light")
    }, 50)

    // Reset transitioning state after animations complete
    setTimeout(() => {
      setIsTransitioning(false)
    }, 800)
  }

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ease-in-out ${
        isDarkMode
          ? "bg-gradient-to-br from-black via-gray-900 to-green-950/20"
          : "bg-gradient-to-br from-gray-50 via-white to-green-50/30"
      }`}
    >
      <div className="space-y-6 sm:space-y-8 pb-8 px-4 sm:px-0">
        {/* Theme Toggle */}
        <div className="flex justify-end pt-4">
          <Button
            onClick={toggleTheme}
            variant="outline"
            size="sm"
            className={`rounded-xl border-2 font-bold min-h-[44px] px-4 transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95 ${
              isDarkMode
                ? "bg-black/50 border-green-600 text-green-400 hover:bg-green-950/50"
                : "bg-white border-black text-black hover:bg-green-50"
            }`}
          >
            <span className="transition-transform duration-500 ease-in-out">
              {isDarkMode ? (
                <Sun className="h-4 w-4 mr-2 animate-spin-slow" />
              ) : (
                <Moon className="h-4 w-4 mr-2 animate-pulse-slow" />
              )}
            </span>
            <span className="transition-opacity duration-300 ease-in-out">{isDarkMode ? "Light" : "Dark"}</span>
          </Button>
        </div>

        {/* Achievement Notifications */}
        <AchievementNotifications isDarkMode={isDarkMode} />

        {/* Welcome Section with Level Progress */}
        <div
          className={`relative overflow-hidden transition-transform duration-500 ease-in-out ${isTransitioning ? "scale-[0.98]" : "scale-100"}`}
        >
          <div
            className={`absolute inset-0 rounded-2xl sm:rounded-3xl transition-all duration-700 ease-in-out ${
              isDarkMode
                ? "bg-gradient-to-r from-green-600/20 via-black/20 to-green-800/20"
                : "bg-gradient-to-r from-green-500/10 via-black/10 to-green-600/10"
            }`}
          ></div>
          <div
            className={`relative backdrop-blur-sm border-3 sm:border-4 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 transition-all duration-500 ease-in-out ${
              isDarkMode
                ? "bg-black/80 border-green-600 shadow-[8px_8px_0px_0px_rgba(34,197,94,0.5)]"
                : "bg-white/90 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
            } ${isTransitioning ? "translate-y-1" : "translate-y-0"}`}
          >
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                    <div className="bg-gradient-to-r from-green-500 to-green-600 p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-500 ease-in-out shadow-glow-green">
                      <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                    </div>
                    <div>
                      <h1
                        className={`text-xl sm:text-2xl lg:text-4xl font-black leading-tight transition-colors duration-500 ease-in-out ${
                          isDarkMode ? "text-white" : "text-black"
                        }`}
                      >
                        Level {userLevel}{" "}
                        <span className="bg-gradient-to-r from-green-500 to-green-600 bg-clip-text text-transparent transition-all duration-500 ease-in-out">
                          Champion
                        </span>
                        !
                      </h1>
                      <p
                        className={`text-sm sm:text-base font-medium transition-colors duration-500 ease-in-out ${
                          isDarkMode ? "text-gray-300" : "text-gray-700"
                        }`}
                      >
                        {userGP} / {nextLevelGP} GP to Level {userLevel + 1}
                      </p>
                    </div>
                  </div>
                  <p
                    className={`text-base sm:text-lg font-medium leading-relaxed transition-colors duration-500 ease-in-out ${
                      isDarkMode ? "text-gray-300" : "text-gray-700"
                    }`}
                  >
                    You're on a{" "}
                    <span
                      className={`font-bold px-2 py-1 rounded-lg transition-all duration-500 ease-in-out ${
                        isDarkMode
                          ? "text-green-300 bg-green-600/20 border border-green-500/30"
                          : "text-green-700 bg-green-50 border border-green-200"
                      }`}
                    >
                      12-day streak
                    </span>{" "}
                    with meditation. Keep building those life-changing habits! 🚀
                  </p>
                </div>

                {/* Level Progress Ring */}
                <div className="flex-shrink-0">
                  <ProgressRings
                    level={userLevel}
                    currentGP={userGP}
                    nextLevelGP={nextLevelGP}
                    isDarkMode={isDarkMode}
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/dashboard/habits/new" className="flex-1 sm:flex-none">
                  <Button
                    className={`w-full sm:w-auto bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl sm:rounded-2xl border-3 border-green-400 font-bold px-4 sm:px-6 py-3 text-sm sm:text-base transition-all duration-500 ease-in-out hover:shadow-lg min-h-[44px] shadow-[4px_4px_0px_0px_rgba(34,197,94,0.5)] hover:shadow-glow-green ${isTransitioning ? "translate-y-1 opacity-90" : "translate-y-0 opacity-100"}`}
                  >
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Add New Habit
                  </Button>
                </Link>
                <Link href="/dashboard/journal/new" className="flex-1 sm:flex-none">
                  <Button
                    variant="outline"
                    className={`w-full sm:w-auto border-3 rounded-xl sm:rounded-2xl font-bold px-4 sm:px-6 py-3 text-sm sm:text-base transition-all duration-500 ease-in-out min-h-[44px] ${
                      isDarkMode
                        ? "bg-black/50 hover:bg-green-950/50 border-green-600 text-green-400"
                        : "bg-white hover:bg-green-50 border-black text-black"
                    } ${isTransitioning ? "translate-y-1 opacity-90" : "translate-y-0 opacity-100"}`}
                  >
                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Quick Journal
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Gamification Stats Overview */}
        <GamificationStats isDarkMode={isDarkMode} isTransitioning={isTransitioning} />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Today's Habits */}
            <Card
              className={`backdrop-blur-sm border-3 sm:border-4 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${
                isDarkMode ? "bg-black/90 border-green-600" : "bg-white/95 border-black"
              } ${isTransitioning ? "translate-y-1 opacity-95 scale-[0.99]" : "translate-y-0 opacity-100 scale-100"}`}
              style={{ transitionDelay: "150ms" }}
            >
              <div className="bg-gradient-to-r from-green-500 via-green-600 to-black p-4 sm:p-6 text-white transition-all duration-700 ease-in-out">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle2 className="h-5 w-5 sm:h-6 sm:w-6" />
                    <h2 className="text-lg sm:text-xl font-bold">Today's Habits</h2>
                  </div>
                  <Link href="/dashboard/habits">
                    <Button
                      variant="ghost"
                      className="text-white hover:bg-white/20 rounded-lg sm:rounded-xl font-bold text-sm sm:text-base min-h-[44px] px-4 transition-all duration-300 ease-in-out"
                    >
                      View All <ArrowRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <HabitTracker isDarkMode={isDarkMode} />
              </div>
            </Card>

            {/* Progress Chart */}
            <Card
              className={`backdrop-blur-sm border-3 sm:border-4 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${
                isDarkMode ? "bg-black/90 border-green-600" : "bg-white/95 border-black"
              } ${isTransitioning ? "translate-y-1 opacity-95 scale-[0.99]" : "translate-y-0 opacity-100 scale-100"}`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="bg-gradient-to-r from-black to-green-600 p-4 sm:p-6 text-white transition-all duration-700 ease-in-out">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <BarChart3 className="h-5 w-5 sm:h-6 sm:w-6" />
                    <h2 className="text-lg sm:text-xl font-bold">Weekly Progress</h2>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white hover:bg-white/20 rounded-lg font-bold text-sm min-h-[36px] px-3 transition-all duration-300 ease-in-out"
                    >
                      Week
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-white/70 hover:bg-white/20 rounded-lg font-bold text-sm min-h-[36px] px-3 transition-all duration-300 ease-in-out"
                    >
                      Month
                    </Button>
                  </div>
                </div>
              </div>
              <div className="p-4 sm:p-6">
                <ProgressChart period="week" isDarkMode={isDarkMode} />
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6 lg:space-y-8">
            {/* Streak Tracker */}
            <div
              className={`backdrop-blur-sm border-3 sm:border-4 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${
                isDarkMode ? "bg-black/90 border-green-600" : "bg-white/95 border-black"
              } ${isTransitioning ? "translate-y-1 opacity-95 scale-[0.99]" : "translate-y-0 opacity-100 scale-100"}`}
              style={{ transitionDelay: "250ms" }}
            >
              <StreakTracker isDarkMode={isDarkMode} />
            </div>

            {/* AI Guide */}
            <div
              className={`backdrop-blur-sm border-3 sm:border-4 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${
                isDarkMode ? "bg-black/90 border-green-600" : "bg-white/95 border-black"
              } ${isTransitioning ? "translate-y-1 opacity-95 scale-[0.99]" : "translate-y-0 opacity-100 scale-100"}`}
              style={{ transitionDelay: "300ms" }}
            >
              <AiGuide isDarkMode={isDarkMode} />
            </div>

            {/* Quick Actions */}
            <Card
              className={`border-3 sm:border-4 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${
                isDarkMode
                  ? "bg-gradient-to-br from-black/80 to-gray-900/80 border-green-600"
                  : "bg-gradient-to-br from-green-50 to-green-100 border-black"
              } ${isTransitioning ? "translate-y-1 opacity-95 scale-[0.99]" : "translate-y-0 opacity-100 scale-100"}`}
              style={{ transitionDelay: "350ms" }}
            >
              <div className="bg-gradient-to-r from-green-500 to-green-600 p-4 text-white transition-all duration-700 ease-in-out">
                <h2 className="text-lg font-bold flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Quick Actions
                </h2>
              </div>
              <div className="p-4 space-y-3">
                {[
                  { icon: <BookOpen className="h-4 w-4" />, label: "View Journal Entries", href: "/dashboard/journal" },
                  {
                    icon: <BarChart3 className="h-4 w-4" />,
                    label: "Habit Impact Tracker",
                    href: "/dashboard/habits/submissions",
                  },
                  {
                    icon: <BarChart3 className="h-4 w-4" />,
                    label: "Analytics Dashboard",
                    href: "/dashboard/analytics",
                  },
                  { icon: <Trophy className="h-4 w-4" />, label: "View Achievements", href: "/dashboard/achievements" },
                  { icon: <Star className="h-4 w-4" />, label: "Personal Leaderboard", href: "/dashboard/leaderboard" },
                  { icon: <FileText className="h-4 w-4" />, label: "Personal Contract", href: "/dashboard/contract" },
                ].map((action, index) => (
                  <Link href={action.href} key={index}>
                    <Button
                      variant="outline"
                      className={`w-full justify-start gap-3 rounded-xl border-2 font-bold min-h-[44px] text-sm transition-all duration-500 ease-in-out ${
                        isDarkMode
                          ? "border-green-600 hover:bg-green-950/50 text-green-400 bg-black/50"
                          : "border-black hover:bg-green-50 text-black"
                      } ${isTransitioning ? "translate-y-1 opacity-90" : "translate-y-0 opacity-100"}`}
                      style={{ transitionDelay: `${400 + index * 50}ms` }}
                    >
                      {action.icon}
                      {action.label}
                    </Button>
                  </Link>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
