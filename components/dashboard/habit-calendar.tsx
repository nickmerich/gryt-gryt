"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Calendar, CheckCircle2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface Habit {
  id: number
  name: string
  category: string
  streak: number
  target?: string
  frequency: "daily" | "weekly" | "monthly"
  timeOfDay?: string
  completed: boolean
  progress: number
}

interface HabitCalendarProps {
  habits: Habit[]
}

export default function HabitCalendar({ habits }: HabitCalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  // Generate calendar days for current month view
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay()
  }

  const year = currentMonth.getFullYear()
  const month = currentMonth.getMonth()
  const daysInMonth = getDaysInMonth(year, month)
  const firstDayOfMonth = getFirstDayOfMonth(year, month)

  const prevMonth = () => {
    setCurrentMonth(new Date(year, month - 1, 1))
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(year, month + 1, 1))
  }

  // Mock data for calendar completion
  const generateMockCompletionData = () => {
    const data: Record<string, number> = {}
    const today = new Date().getDate()

    for (let i = 1; i <= daysInMonth; i++) {
      // Past days have completion data
      if (i < today) {
        data[i] = Math.random() > 0.3 ? Math.floor(Math.random() * 40) + 60 : Math.floor(Math.random() * 60)
      }
      // Today has current completion data
      else if (i === today) {
        const completedHabits = habits.filter((h) => h.completed).length
        const completionPercentage = habits.length > 0 ? (completedHabits / habits.length) * 100 : 0
        data[i] = completionPercentage
      }
      // Future days have no data
      else {
        data[i] = -1
      }
    }

    return data
  }

  const completionData = generateMockCompletionData()

  const getCompletionColor = (completion: number) => {
    if (completion < 0) return "bg-gray-100"
    if (completion === 0) return "bg-gray-200"
    if (completion < 30) return "bg-red-200"
    if (completion < 70) return "bg-yellow-200"
    if (completion < 100) return "bg-green-200"
    return "bg-green-300"
  }

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]

  return (
    <Card className="border-4 border-black rounded-xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          <h2 className="text-xl font-bold">Habit Calendar</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={prevMonth} className="rounded-xl border-2 border-black">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="font-bold min-w-[120px] text-center">
            {monthNames[month]} {year}
          </span>
          <Button variant="outline" size="sm" onClick={nextMonth} className="rounded-xl border-2 border-black">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center font-bold text-sm py-1">
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {/* Empty cells for days before the first day of month */}
        {Array.from({ length: firstDayOfMonth }).map((_, index) => (
          <div key={`empty-${index}`} className="aspect-square"></div>
        ))}

        {/* Calendar days */}
        {Array.from({ length: daysInMonth }).map((_, index) => {
          const day = index + 1
          const completion = completionData[day]
          const isToday =
            day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear()

          return (
            <div
              key={day}
              className={`
                aspect-square rounded-xl border-2 flex flex-col items-center justify-center
                ${isToday ? "border-red-500 shadow-[2px_2px_0px_0px_rgba(239,68,68,1)]" : "border-gray-200"}
                ${getCompletionColor(completion)}
                ${completion < 0 ? "opacity-50" : ""}
              `}
            >
              <div className="font-bold">{day}</div>
              {completion >= 0 && (
                <div className="text-xs mt-1">
                  {completion === 100 ? (
                    <CheckCircle2 className="h-4 w-4 text-green-600" />
                  ) : (
                    `${Math.round(completion)}%`
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        <Badge className="bg-gray-200 text-gray-700 hover:bg-gray-200">No Data</Badge>
        <Badge className="bg-red-200 text-red-700 hover:bg-red-200">0-30%</Badge>
        <Badge className="bg-yellow-200 text-yellow-700 hover:bg-yellow-200">30-70%</Badge>
        <Badge className="bg-green-200 text-green-700 hover:bg-green-200">70-99%</Badge>
        <Badge className="bg-green-300 text-green-800 hover:bg-green-300">100%</Badge>
      </div>
    </Card>
  )
}
