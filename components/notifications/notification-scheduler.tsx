"use client"

import { useEffect, useState } from "react"
import {
  notificationTemplates,
  shouldShowNotification,
  showBrowserNotification,
  type NotificationPreferences,
} from "@/lib/notifications"

interface NotificationSchedulerProps {
  preferences: NotificationPreferences
  onNotificationTriggered?: (type: string, title: string, message: string) => void
}

export default function NotificationScheduler({ preferences, onNotificationTriggered }: NotificationSchedulerProps) {
  const [lastShown, setLastShown] = useState<Record<string, string>>({})

  useEffect(() => {
    if (!preferences.pushNotifications) return

    const checkNotifications = () => {
      const now = new Date()
      const currentTime = `${now.getHours().toString().padStart(2, "0")}:${now.getMinutes().toString().padStart(2, "0")}`
      const currentDay = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"][now.getDay()]

      // Check if it's time for daily reminders
      if (
        preferences.habitReminders &&
        preferences.reminderTime === currentTime &&
        preferences.reminderDays.includes(currentDay) &&
        shouldShowNotification(lastShown.habitReminder, "daily")
      ) {
        const template = notificationTemplates.habitReminder
        showBrowserNotification(template.title, template.message)
        onNotificationTriggered?.("habit_reminder", template.title, template.message)
        setLastShown((prev) => ({ ...prev, habitReminder: now.toISOString() }))
      }

      // Check for daily reflection (30 minutes after habit reminder)
      const reflectionTime = new Date()
      reflectionTime.setHours(Number.parseInt(preferences.reminderTime.split(":")[0]))
      reflectionTime.setMinutes(Number.parseInt(preferences.reminderTime.split(":")[1]) + 30)

      if (
        preferences.dailyReflection &&
        now.getHours() === reflectionTime.getHours() &&
        now.getMinutes() === reflectionTime.getMinutes() &&
        preferences.reminderDays.includes(currentDay) &&
        shouldShowNotification(lastShown.dailyReflection, "daily")
      ) {
        const template = notificationTemplates.dailyReflection
        showBrowserNotification(template.title, template.message)
        onNotificationTriggered?.("daily_reflection", template.title, template.message)
        setLastShown((prev) => ({ ...prev, dailyReflection: now.toISOString() }))
      }

      // Check for weekly review (Sundays)
      if (
        preferences.weeklyReview &&
        currentDay === "sunday" &&
        preferences.reminderTime === currentTime &&
        shouldShowNotification(lastShown.weeklyReview, "weekly")
      ) {
        const template = notificationTemplates.weeklyReview
        showBrowserNotification(template.title, template.message)
        onNotificationTriggered?.("weekly_review", template.title, template.message)
        setLastShown((prev) => ({ ...prev, weeklyReview: now.toISOString() }))
      }

      // Check for contract reminders (weekly on user's preferred day)
      if (
        preferences.contractReminders &&
        preferences.reminderDays.includes(currentDay) &&
        preferences.reminderTime === currentTime &&
        shouldShowNotification(lastShown.contractReminder, "weekly")
      ) {
        const template = notificationTemplates.contractReminder
        showBrowserNotification(template.title, template.message)
        onNotificationTriggered?.("contract", template.title, template.message)
        setLastShown((prev) => ({ ...prev, contractReminder: now.toISOString() }))
      }
    }

    // Check every minute
    const interval = setInterval(checkNotifications, 60000)

    // Check immediately
    checkNotifications()

    return () => clearInterval(interval)
  }, [preferences, lastShown, onNotificationTriggered])

  // This component doesn't render anything visible
  return null
}
