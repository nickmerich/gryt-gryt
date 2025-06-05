"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MobileCard, MobileCardContent, MobileCardHeader, MobileCardTitle } from "@/components/ui/mobile-card"
import { Target, BookOpen, BarChart3, TrendingUp, Flame, Calendar } from "lucide-react"
import Link from "next/link"

interface MobileDashboardLayoutProps {
  children?: React.ReactNode
}

export default function MobileDashboardLayout({ children }: MobileDashboardLayoutProps) {
  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  const quickStats = [
    { label: "Habits completed", value: "7/10", icon: Target, color: "text-gryt-green" },
    { label: "Current streak", value: "12 days", icon: Flame, color: "text-green-600" },
    { label: "Journal entries", value: "5", icon: BookOpen, color: "text-black" },
    { label: "Weekly progress", value: "85%", icon: TrendingUp, color: "text-gryt-green" },
  ]

  const quickActions = [
    { label: "Add Habit", href: "/dashboard/habits/new", icon: Target, color: "bg-gryt-green" },
    { label: "New Entry", href: "/dashboard/journal/new", icon: BookOpen, color: "bg-black" },
    { label: "View Analytics", href: "/dashboard/analytics", icon: BarChart3, color: "bg-green-600" },
    { label: "Calendar", href: "/dashboard/calendar", icon: Calendar, color: "bg-gray-800" },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-gryt-green to-green-600 text-white p-6 rounded-b-3xl">
        <h1 className="text-2xl font-black mb-2">{greeting}!</h1>
        <p className="text-green-100 text-base">Ready to crush your goals today?</p>
      </div>

      <div className="p-4 space-y-6 -mt-4">
        {/* Quick Stats */}
        <MobileCard variant="elevated" className="bg-white">
          <MobileCardHeader>
            <MobileCardTitle>Today's Overview</MobileCardTitle>
          </MobileCardHeader>
          <MobileCardContent>
            <div className="grid grid-cols-2 gap-4">
              {quickStats.map((stat, index) => (
                <div key={index} className="text-center p-4 border-2 border-black rounded-xl bg-gray-50">
                  <stat.icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                  <div className="text-2xl font-black text-black">{stat.value}</div>
                  <div className="text-xs text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </MobileCardContent>
        </MobileCard>

        {/* Quick Actions */}
        <MobileCard variant="default">
          <MobileCardHeader>
            <MobileCardTitle>Quick Actions</MobileCardTitle>
          </MobileCardHeader>
          <MobileCardContent>
            <div className="grid grid-cols-2 gap-3">
              {quickActions.map((action, index) => (
                <Link key={index} href={action.href}>
                  <Button
                    variant="outline"
                    className={`w-full h-20 flex-col gap-2 rounded-2xl border-3 border-black font-bold text-black hover:bg-green-50 active:bg-green-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200`}
                  >
                    <div className={`p-2 rounded-xl ${action.color} text-white`}>
                      <action.icon className="h-5 w-5" />
                    </div>
                    <span className="text-sm">{action.label}</span>
                  </Button>
                </Link>
              ))}
            </div>
          </MobileCardContent>
        </MobileCard>

        {/* Main Content */}
        {children}

        {/* Bottom Spacing for Mobile Navigation */}
        <div className="h-20" />
      </div>
    </div>
  )
}
