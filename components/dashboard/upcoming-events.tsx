"use client"

import { Calendar, Clock, Users, Award } from "lucide-react"

interface Event {
  id: number
  title: string
  type: "challenge" | "community" | "milestone" | "reminder"
  date: string
  time?: string
}

export default function UpcomingEvents() {
  const events: Event[] = [
    {
      id: 1,
      title: "30-Day Meditation Challenge",
      type: "challenge",
      date: "2025-06-05",
    },
    {
      id: 2,
      title: "Community Fitness Meetup",
      type: "community",
      date: "2025-06-08",
      time: "10:00 AM",
    },
    {
      id: 3,
      title: "Reading Goal Milestone",
      type: "milestone",
      date: "2025-06-10",
    },
    {
      id: 4,
      title: "Weekly Review Reminder",
      type: "reminder",
      date: "2025-06-07",
      time: "6:00 PM",
    },
  ]

  const getEventIcon = (type: string) => {
    switch (type) {
      case "challenge":
        return <Award className="h-4 w-4 text-purple-500" />
      case "community":
        return <Users className="h-4 w-4 text-blue-500" />
      case "milestone":
        return <Award className="h-4 w-4 text-amber-500" />
      case "reminder":
        return <Clock className="h-4 w-4 text-red-500" />
      default:
        return <Calendar className="h-4 w-4 text-gray-500" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    if (date.toDateString() === today.toDateString()) {
      return "Today"
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow"
    } else {
      return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
    }
  }

  const getDaysUntil = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 0) return "Today"
    if (diffDays === 1) return "Tomorrow"
    return `In ${diffDays} days`
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <div key={event.id} className="border-2 border-black rounded-xl p-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-gray-100 rounded-lg">{getEventIcon(event.type)}</div>
            <div className="flex-1">
              <h3 className="font-bold text-sm">{event.title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-gray-500 flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {formatDate(event.date)}
                </span>
                {event.time && (
                  <span className="text-xs text-gray-500 flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {event.time}
                  </span>
                )}
              </div>
            </div>
            <div className="text-xs font-medium px-2 py-1 bg-gray-100 rounded-full">{getDaysUntil(event.date)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}
