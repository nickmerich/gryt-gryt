"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Bell, BellRing } from "lucide-react"
import { mockHabitReminders, type HabitReminder } from "@/lib/notifications"
import NotificationCenter from "./notification-center"

interface NotificationBellProps {
  isDarkMode?: boolean
  className?: string
}

export default function NotificationBell({ isDarkMode = false, className = "" }: NotificationBellProps) {
  const [notifications, setNotifications] = useState<HabitReminder[]>(mockHabitReminders)
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = notifications.filter((n) => !n.isRead && n.isActive).length

  // Simulate real-time notifications
  useEffect(() => {
    const interval = setInterval(() => {
      // Randomly add new notifications (for demo purposes)
      if (Math.random() < 0.1) {
        // 10% chance every 30 seconds
        const newNotification: HabitReminder = {
          id: Date.now().toString(),
          userId: "user1",
          title: "Time to Log Your Habits! 📝",
          message: "Take a moment to reflect on your day and log any habits that impacted your goals.",
          type: "habit_log",
          scheduledFor: new Date().toISOString(),
          isRead: false,
          isActive: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }

        setNotifications((prev) => [newNotification, ...prev])
      }
    }, 30000) // Check every 30 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className={`relative p-2 rounded-xl ${className} ${
            isDarkMode
              ? "text-green-400 hover:text-green-300 hover:bg-green-600/10"
              : "text-green-600 hover:text-green-700 hover:bg-green-50"
          }`}
        >
          {unreadCount > 0 ? <BellRing className="h-5 w-5" /> : <Bell className="h-5 w-5" />}

          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs border-2 border-white">
              {unreadCount > 99 ? "99+" : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-96 p-0 border-0 shadow-none" align="end" sideOffset={8}>
        <NotificationCenter isDarkMode={isDarkMode} onClose={() => setIsOpen(false)} />
      </PopoverContent>
    </Popover>
  )
}
