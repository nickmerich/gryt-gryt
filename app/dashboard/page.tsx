"use client"

import { useEffect, useState } from "react"
import { MobilePage, MobilePageSection } from "@/components/layouts/mobile-page"
import { MobileOptimizedCardContent } from "@/components/ui/mobile-optimized-card"
import { MobileOptimizedButton } from "@/components/ui/mobile-optimized-button"
import { Target, BookOpen, BarChart3, Flame, Trophy, Calendar } from "lucide-react"
import { MobileTouchFeedback } from "@/components/mobile/mobile-touch-feedback"
import Link from "next/link"

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [greeting, setGreeting] = useState("")
  const [stats, setStats] = useState({
    habitsCompleted: 0,
    habitsTotal: 0,
    currentStreak: 0,
    journalEntries: 0,
    weeklyProgress: 0,
  })

  useEffect(() => {
    // Set greeting based on time of day
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")

    // Simulate loading data
    const timer = setTimeout(() => {
      setStats({
        habitsCompleted: 7,
        habitsTotal: 10,
        currentStreak: 12,
        journalEntries: 5,
        weeklyProgress: 85,
      })
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const quickStats = [
    {
      label: "Habits completed",
      value: `${stats.habitsCompleted}/${stats.habitsTotal}`,
      icon: Target,
      color: "text-gryt-green",
    },
    {
      label: "Current streak",
      value: `${stats.currentStreak} days`,
      icon: Flame,
      color: "text-green-600",
    },
    {
      label: "Journal entries",
      value: stats.journalEntries.toString(),
      icon: BookOpen,
      color: "text-black",
    },
    {
      label: "Weekly progress",
      value: `${stats.weeklyProgress}%`,
      icon: BarChart3,
      color: "text-gryt-green",
    },
  ]

  const quickActions = [
    { label: "Add Habit", href: "/dashboard/habits/new", icon: Target, color: "bg-gryt-green" },
    { label: "New Entry", href: "/dashboard/journal/new", icon: BookOpen, color: "bg-black" },
    { label: "Analytics", href: "/dashboard/analytics", icon: BarChart3, color: "bg-green-600" },
    { label: "Calendar", href: "/dashboard/calendar", icon: Calendar, color: "bg-gray-800" },
  ]

  return (
    <MobilePage isLoading={isLoading}>
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-gryt-green to-green-600 text-white p-6 rounded-3xl mb-6">
        <h1 className="text-2xl font-black mb-2">{greeting}!</h1>
        <p className="text-green-100 text-base">Ready to crush your goals today?</p>
      </div>

      {/* Quick Stats */}
      <MobilePageSection title="Today's Overview">
        <MobileOptimizedCardContent>
          <div className="grid grid-cols-2 gap-4">
            {quickStats.map((stat, index) => (
              <div key={index} className="text-center p-4 border-2 border-black rounded-xl bg-gray-50">
                <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                <div className="text-2xl font-black text-black">{stat.value}</div>
                <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </MobileOptimizedCardContent>
      </MobilePageSection>

      {/* Quick Actions */}
      <MobilePageSection title="Quick Actions">
        <MobileOptimizedCardContent>
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action, index) => (
              <MobileTouchFeedback key={index}>
                <Link href={action.href}>
                  <div className="h-20 flex flex-col items-center justify-center gap-2 rounded-2xl border-3 border-black bg-white font-bold text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <div className={`p-2 rounded-xl ${action.color} text-white`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm">{action.label}</span>
                  </div>
                </Link>
              </MobileTouchFeedback>
            ))}
          </div>
        </MobileOptimizedCardContent>
      </MobilePageSection>

      {/* Progress Summary */}
      <MobilePageSection title="Your Progress">
        <MobileOptimizedCardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium">Weekly Goal Progress</span>
                <span className="text-sm font-bold text-gryt-green">{stats.weeklyProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-gryt-green h-2.5 rounded-full" style={{ width: `${stats.weeklyProgress}%` }}></div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                  <Trophy className="h-5 w-5 text-gryt-green" />
                </div>
                <div>
                  <h3 className="font-bold">Level 5</h3>
                  <p className="text-xs text-gray-600">Growth Points: 450 GP</p>
                </div>
              </div>
              <MobileOptimizedButton variant="outline" size="sm">
                View
              </MobileOptimizedButton>
            </div>
          </div>
        </MobileOptimizedCardContent>
      </MobilePageSection>

      {/* Upcoming Habits */}
      <MobilePageSection title="Today's Habits" subtitle="3 remaining">
        <MobileOptimizedCardContent className="p-0">
          <div className="divide-y">
            {[
              { name: "Morning Meditation", time: "8:00", icon: BookOpen },
              { name: "Evening Run", time: "18:00", icon: Flame },
              { name: "Reading Time", time: "20:00", icon: BookOpen },
            ].map((habit, index) => (
              <div key={index} className="p-4 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-3">
                    <habit.icon className="h-4 w-4 text-black" />
                  </div>
                  <div>
                    <h3 className="font-bold">{habit.name}</h3>
                    <p className="text-xs text-gray-600">Due at {habit.time}</p>
                  </div>
                </div>
                <MobileOptimizedButton variant="outline" size="sm">
                  Complete
                </MobileOptimizedButton>
              </div>
            ))}
          </div>
        </MobileOptimizedCardContent>
      </MobilePageSection>
    </MobilePage>
  )
}
