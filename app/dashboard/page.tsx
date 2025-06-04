"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import HabitTracker from "@/components/dashboard/habit-tracker"
import AiGuide from "@/components/dashboard/ai-guide"
import ProgressChart from "@/components/dashboard/progress-chart"
import IntegrationStatus from "@/components/dashboard/integration-status"
import {
  Target,
  Calendar,
  BarChart3,
  Users,
  BookOpen,
  Zap,
  TrendingUp,
  Award,
  Clock,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Moon,
  Sun,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function DashboardPage() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Check for saved theme preference or system preference on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "light" || (!savedTheme && !prefersDark)) {
      setIsDarkMode(false)
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
          ? "bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-900/20"
          : "bg-gradient-to-br from-slate-50 via-white to-sky-50/30"
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
                ? "bg-slate-800/50 border-slate-600 text-slate-200 hover:bg-slate-700/50"
                : "bg-white border-slate-900 text-slate-900 hover:bg-slate-50"
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

        {/* Welcome Section - Enhanced Transitions */}
        <div
          className={`relative overflow-hidden transition-transform duration-500 ease-in-out ${isTransitioning ? "scale-[0.98]" : "scale-100"}`}
        >
          <div
            className={`absolute inset-0 rounded-2xl sm:rounded-3xl transition-all duration-700 ease-in-out ${
              isDarkMode
                ? "bg-gradient-to-r from-emerald-500/20 via-sky-500/20 to-violet-500/20"
                : "bg-gradient-to-r from-emerald-500/10 via-sky-500/10 to-violet-500/10"
            }`}
          ></div>
          <div
            className={`relative backdrop-blur-sm border-3 sm:border-4 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 transition-all duration-500 ease-in-out ${
              isDarkMode
                ? "bg-slate-800/80 border-slate-600 shadow-[8px_8px_0px_0px_rgba(71,85,105,0.5)]"
                : "bg-white/90 border-slate-900 shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]"
            } ${isTransitioning ? "translate-y-1" : "translate-y-0"}`}
          >
            <div className="flex flex-col gap-4 sm:gap-6">
              <div>
                <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                  <div className="bg-gradient-to-r from-emerald-400 to-sky-400 p-2 sm:p-3 rounded-xl sm:rounded-2xl transition-all duration-500 ease-in-out">
                    <Sparkles className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
                  </div>
                  <h1
                    className={`text-xl sm:text-2xl lg:text-4xl font-black leading-tight transition-colors duration-500 ease-in-out ${
                      isDarkMode ? "text-slate-100" : "text-slate-900"
                    }`}
                  >
                    Welcome back,{" "}
                    <span className="bg-gradient-to-r from-emerald-400 to-sky-400 bg-clip-text text-transparent transition-all duration-500 ease-in-out">
                      Alex
                    </span>
                    !
                  </h1>
                </div>
                <p
                  className={`text-base sm:text-lg font-medium leading-relaxed transition-colors duration-500 ease-in-out ${
                    isDarkMode ? "text-slate-300" : "text-slate-700"
                  }`}
                >
                  You're on a{" "}
                  <span
                    className={`font-bold px-2 py-1 rounded-lg transition-all duration-500 ease-in-out ${
                      isDarkMode
                        ? "text-emerald-300 bg-emerald-500/20 border border-emerald-400/30"
                        : "text-emerald-700 bg-emerald-50"
                    }`}
                  >
                    12-day streak
                  </span>{" "}
                  with meditation. Keep building those life-changing habits! 🚀
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/dashboard/habits/new" className="flex-1 sm:flex-none">
                  <Button
                    className={`w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white rounded-xl sm:rounded-2xl border-3 border-emerald-400 font-bold px-4 sm:px-6 py-3 text-sm sm:text-base transition-all duration-500 ease-in-out hover:shadow-lg min-h-[44px] ${isTransitioning ? "translate-y-1 opacity-90" : "translate-y-0 opacity-100"}`}
                  >
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Add New Habit
                  </Button>
                </Link>
                <Link href="/dashboard/journal/new" className="flex-1 sm:flex-none">
                  <Button
                    variant="outline"
                    className={`w-full sm:w-auto border-3 rounded-xl sm:rounded-2xl font-bold px-4 sm:px-6 py-3 text-sm sm:text-base transition-all duration-500 ease-in-out min-h-[44px] ${
                      isDarkMode
                        ? "bg-slate-700/50 hover:bg-slate-600/50 border-slate-500 text-slate-200"
                        : "bg-white hover:bg-slate-50 border-slate-900 text-slate-900"
                    } ${isTransitioning ? "translate-y-1 opacity-90" : "translate-y-0 opacity-100"}`}
                  >
                    <BookOpen className="h-4 w-4 sm:h-5 sm:w-5 mr-2" /> Quick Journal
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Overview - Enhanced Transitions */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          {[
            {
              icon: <Target className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />,
              value: "7",
              label: "Active Habits",
              badge: "+2 today",
              color: "emerald",
              delay: 100,
            },
            {
              icon: <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />,
              value: "12",
              label: "Day Streak",
              badge: "85%",
              color: "sky",
              delay: 150,
            },
            {
              icon: <Award className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />,
              value: "1,247",
              label: "Achievement Points",
              badge: "Level 3",
              color: "violet",
              delay: 200,
            },
            {
              icon: <Clock className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-white" />,
              value: "2h 15m",
              label: "Time Invested",
              badge: "Today",
              color: "amber",
              delay: 250,
            },
          ].map((stat, index) => (
            <Card
              key={index}
              className={`border-3 sm:border-4 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${
                isDarkMode
                  ? "bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-slate-600"
                  : `bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100 border-slate-900`
              } ${isTransitioning ? "translate-y-1 opacity-90 scale-[0.98]" : "translate-y-0 opacity-100 scale-100"}`}
              style={{ transitionDelay: `${stat.delay}ms` }}
            >
              <div className="p-3 sm:p-4 lg:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 sm:mb-4">
                  <div
                    className={`bg-gradient-to-r from-${stat.color}-500 to-${stat.color}-600 p-2 sm:p-3 rounded-lg sm:rounded-xl mb-2 sm:mb-0 w-fit transition-all duration-500 ease-in-out`}
                  >
                    {stat.icon}
                  </div>
                  <div
                    className={`px-2 py-1 rounded-full text-xs font-bold hidden sm:block transition-all duration-500 ease-in-out ${
                      isDarkMode
                        ? `bg-${stat.color}-500/20 text-${stat.color}-300 border border-${stat.color}-400/30`
                        : `bg-${stat.color}-200 text-${stat.color}-900`
                    }`}
                  >
                    {stat.badge}
                  </div>
                </div>
                <div
                  className={`text-2xl sm:text-3xl font-black mb-1 transition-colors duration-500 ease-in-out ${isDarkMode ? "text-slate-100" : "text-slate-900"}`}
                >
                  {stat.value}
                </div>
                <div
                  className={`font-semibold text-xs sm:text-sm transition-colors duration-500 ease-in-out ${isDarkMode ? "text-slate-300" : "text-slate-700"}`}
                >
                  {stat.label}
                </div>
                <div
                  className={`px-2 py-1 rounded-full text-xs font-bold mt-2 sm:hidden w-fit transition-all duration-500 ease-in-out ${
                    isDarkMode
                      ? `bg-${stat.color}-500/20 text-${stat.color}-300 border border-${stat.color}-400/30`
                      : `bg-${stat.color}-200 text-${stat.color}-900`
                  }`}
                >
                  {stat.badge}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content Grid - Enhanced Transitions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">
            {/* Today's Habits */}
            <Card
              className={`backdrop-blur-sm border-3 sm:border-4 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${
                isDarkMode ? "bg-slate-800/90 border-slate-600" : "bg-white/95 border-slate-900"
              } ${isTransitioning ? "translate-y-1 opacity-95 scale-[0.99]" : "translate-y-0 opacity-100 scale-100"}`}
              style={{ transitionDelay: "150ms" }}
            >
              <div className="bg-gradient-to-r from-emerald-500 via-sky-500 to-violet-500 p-4 sm:p-6 text-white transition-all duration-700 ease-in-out">
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
                isDarkMode ? "bg-slate-800/90 border-slate-600" : "bg-white/95 border-slate-900"
              } ${isTransitioning ? "translate-y-1 opacity-95 scale-[0.99]" : "translate-y-0 opacity-100 scale-100"}`}
              style={{ transitionDelay: "200ms" }}
            >
              <div className="bg-gradient-to-r from-sky-500 to-violet-500 p-4 sm:p-6 text-white transition-all duration-700 ease-in-out">
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
            {/* AI Guide */}
            <div
              className={`backdrop-blur-sm border-3 sm:border-4 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${
                isDarkMode ? "bg-slate-800/90 border-slate-600" : "bg-white/95 border-slate-900"
              } ${isTransitioning ? "translate-y-1 opacity-95 scale-[0.99]" : "translate-y-0 opacity-100 scale-100"}`}
              style={{ transitionDelay: "250ms" }}
            >
              <AiGuide isDarkMode={isDarkMode} />
            </div>

            {/* Integration Status */}
            <div
              className={`backdrop-blur-sm border-3 sm:border-4 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${
                isDarkMode ? "bg-slate-800/90 border-slate-600" : "bg-white/95 border-slate-900"
              } ${isTransitioning ? "translate-y-1 opacity-95 scale-[0.99]" : "translate-y-0 opacity-100 scale-100"}`}
              style={{ transitionDelay: "300ms" }}
            >
              <IntegrationStatus isDarkMode={isDarkMode} />
            </div>

            {/* Quick Actions */}
            <Card
              className={`border-3 sm:border-4 rounded-xl sm:rounded-2xl overflow-hidden transition-all duration-500 ease-in-out ${
                isDarkMode
                  ? "bg-gradient-to-br from-slate-800/80 to-slate-700/80 border-slate-600"
                  : "bg-gradient-to-br from-rose-50 to-rose-100 border-slate-900"
              } ${isTransitioning ? "translate-y-1 opacity-95 scale-[0.99]" : "translate-y-0 opacity-100 scale-100"}`}
              style={{ transitionDelay: "350ms" }}
            >
              <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-4 text-white transition-all duration-700 ease-in-out">
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
                    label: "Analytics Dashboard",
                    href: "/dashboard/analytics",
                  },
                  { icon: <Users className="h-4 w-4" />, label: "Join Community", href: "/dashboard/community" },
                  { icon: <Calendar className="h-4 w-4" />, label: "Calendar View", href: "/dashboard/calendar" },
                ].map((action, index) => (
                  <Link href={action.href} key={index}>
                    <Button
                      variant="outline"
                      className={`w-full justify-start gap-3 rounded-xl border-2 font-bold min-h-[44px] text-sm transition-all duration-500 ease-in-out ${
                        isDarkMode
                          ? "border-slate-600 hover:bg-slate-700/50 text-slate-200 bg-slate-800/50"
                          : "border-slate-900 hover:bg-rose-50 text-slate-900"
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
