"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Target, BookOpen, Plus, Flame, Award, BarChart3 } from "lucide-react"
import Link from "next/link"

interface DashboardStats {
  habitsCompleted: number
  totalHabits: number
  currentStreak: number
  weeklyProgress: number
  totalGP: number
  level: number
  journalEntries: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    habitsCompleted: 7,
    totalHabits: 10,
    currentStreak: 12,
    weeklyProgress: 85,
    totalGP: 2450,
    level: 8,
    journalEntries: 5,
  })

  const [greeting, setGreeting] = useState("")

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting("Good morning")
    else if (hour < 18) setGreeting("Good afternoon")
    else setGreeting("Good evening")
  }, [])

  const progressPercentage = (stats.habitsCompleted / stats.totalHabits) * 100

  return (
    <div className="min-h-screen bg-gray-50 p-4 pb-20">
      {/* Welcome Header */}
      <div className="bg-white border-4 border-black rounded-3xl p-6 mb-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-3xl font-black text-black mb-2">{greeting}!</h1>
        <p className="text-gray-600 text-lg font-medium">Ready to crush your goals today?</p>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-black text-green-500 mb-1">
              {stats.habitsCompleted}/{stats.totalHabits}
            </div>
            <div className="text-sm font-bold text-black">Habits Today</div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-black text-orange-500 mb-1 flex items-center justify-center gap-1">
              <Flame className="h-6 w-6" />
              {stats.currentStreak}
            </div>
            <div className="text-sm font-bold text-black">Day Streak</div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-black text-purple-500 mb-1">{stats.totalGP}</div>
            <div className="text-sm font-bold text-black">Growth Points</div>
          </CardContent>
        </Card>

        <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
          <CardContent className="p-4 text-center">
            <div className="text-3xl font-black text-blue-500 mb-1">{stats.level}</div>
            <div className="text-sm font-bold text-black">Level</div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Progress */}
      <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 bg-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-black">
            <Target className="h-5 w-5" />
            Today's Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-3">
            <span className="font-bold text-black">Overall Completion</span>
            <span className="text-2xl font-black text-green-500">{Math.round(progressPercentage)}%</span>
          </div>
          <Progress value={progressPercentage} className="h-4 border-2 border-black rounded-full" />
          <p className="text-sm text-gray-600 mt-2 font-medium">
            {stats.totalHabits - stats.habitsCompleted} habits remaining
          </p>
        </CardContent>
      </Card>

      {/* Your Daily Growth Stack */}
      <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 bg-white">
        <CardHeader className="bg-black p-4 border-b-4 border-black">
          <CardTitle className="font-black text-xl">
            <span className="text-white">Your Daily </span>
            <span className="text-green-500">Growth Stack</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-3">
            <Link href="/dashboard/habits">
              <Button
                variant="outline"
                className="w-full h-20 flex-col gap-2 rounded-2xl border-3 border-black font-bold text-black hover:bg-green-50 active:bg-green-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 bg-white"
              >
                <div className="p-2 rounded-xl bg-green-500 text-white">
                  <Target className="h-5 w-5" />
                </div>
                <span className="text-sm">Habits</span>
              </Button>
            </Link>

            <Link href="/dashboard/journal">
              <Button
                variant="outline"
                className="w-full h-20 flex-col gap-2 rounded-2xl border-3 border-black font-bold text-black hover:bg-green-50 active:bg-green-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 bg-white"
              >
                <div className="p-2 rounded-xl bg-black text-white">
                  <BookOpen className="h-5 w-5" />
                </div>
                <span className="text-sm">Journal</span>
              </Button>
            </Link>

            <Link href="/dashboard/analytics">
              <Button
                variant="outline"
                className="w-full h-20 flex-col gap-2 rounded-2xl border-3 border-black font-bold text-black hover:bg-green-50 active:bg-green-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 bg-white"
              >
                <div className="p-2 rounded-xl bg-green-600 text-white">
                  <BarChart3 className="h-5 w-5" />
                </div>
                <span className="text-sm">Analytics</span>
              </Button>
            </Link>

            <Link href="/dashboard/achievements">
              <Button
                variant="outline"
                className="w-full h-20 flex-col gap-2 rounded-2xl border-3 border-black font-bold text-black hover:bg-green-50 active:bg-green-100 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] transition-all duration-200 bg-white"
              >
                <div className="p-2 rounded-xl bg-gray-800 text-white">
                  <Award className="h-5 w-5" />
                </div>
                <span className="text-sm">Achievements</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6 bg-white">
        <CardHeader>
          <CardTitle className="text-black">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Link href="/dashboard/habits/new">
              <Button className="w-full bg-green-500 hover:bg-green-600 text-white border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all duration-200 font-bold py-3 min-h-[52px]">
                <Plus className="h-5 w-5 mr-2" />
                Add New Habit
              </Button>
            </Link>

            <Link href="/dashboard/journal/new">
              <Button
                variant="outline"
                className="w-full border-2 border-black rounded-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-all duration-200 font-bold py-3 min-h-[52px] bg-white text-black hover:bg-gray-50"
              >
                <BookOpen className="h-5 w-5 mr-2" />
                Write Journal Entry
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card className="border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-white">
        <CardHeader>
          <CardTitle className="text-black">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-green-50 rounded-xl border-2 border-black">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <Target className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-black text-sm">Completed "Drink Water"</p>
                <p className="text-xs text-gray-600">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-xl border-2 border-black">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-black text-sm">New journal entry</p>
                <p className="text-xs text-gray-600">Yesterday</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-xl border-2 border-black">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                <Award className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-bold text-black text-sm">Earned "Week Warrior" badge</p>
                <p className="text-xs text-gray-600">2 days ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
