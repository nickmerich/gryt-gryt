export interface NotificationPreferences {
  id: string
  userId: string
  habitReminders: boolean
  dailyReflection: boolean
  weeklyReview: boolean
  achievementAlerts: boolean
  contractReminders: boolean
  reminderTime: string // HH:MM format
  reminderDays: string[] // ['monday', 'tuesday', etc.]
  pushNotifications: boolean
  emailNotifications: boolean
  createdAt: string
  updatedAt: string
}

export interface HabitReminder {
  id: string
  userId: string
  title: string
  message: string
  type: "habit_log" | "daily_reflection" | "weekly_review" | "achievement" | "contract"
  scheduledFor: string
  isRead: boolean
  isActive: boolean
  metadata?: {
    habitId?: string
    achievementId?: string
    contractId?: string
  }
  createdAt: string
  updatedAt: string
}

export interface NotificationSchedule {
  id: string
  userId: string
  type: "habit_reminder" | "daily_check" | "weekly_review"
  title: string
  message: string
  scheduledTime: string // HH:MM
  days: string[] // Days of week
  isActive: boolean
  lastSent?: string
  nextScheduled: string
  createdAt: string
  updatedAt: string
}

// Default notification preferences
export const defaultNotificationPreferences: Omit<
  NotificationPreferences,
  "id" | "userId" | "createdAt" | "updatedAt"
> = {
  habitReminders: true,
  dailyReflection: true,
  weeklyReview: true,
  achievementAlerts: true,
  contractReminders: true,
  reminderTime: "20:00", // 8 PM default
  reminderDays: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
  pushNotifications: true,
  emailNotifications: false,
}

// Notification templates
export const notificationTemplates = {
  habitReminder: {
    title: "Time to Log Your Habits! 📝",
    message: "Take a moment to reflect on your day and log any habits that impacted your goals.",
  },
  dailyReflection: {
    title: "Daily Reflection Time 🌅",
    message: "How did your habits serve your goals today? Log your progress and insights.",
  },
  weeklyReview: {
    title: "Weekly Habit Review 📊",
    message: "Review your habit patterns from this week and plan for continued growth.",
  },
  contractReminder: {
    title: "Personal Contract Check-in 📋",
    message: "Review your personal contract and assess your progress toward your commitments.",
  },
  streakCelebration: {
    title: "Streak Achievement! 🔥",
    message: "Congratulations on maintaining your positive habit streak!",
  },
  goalDeadline: {
    title: "Goal Deadline Approaching ⏰",
    message: "Your goal deadline is coming up. How are your habits supporting your progress?",
  },
}

// Utility functions
export function getNextReminderTime(reminderTime: string, reminderDays: string[]): Date {
  const now = new Date()
  const [hours, minutes] = reminderTime.split(":").map(Number)

  const today = now.getDay()
  const dayNames = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]

  // Find next valid day
  for (let i = 0; i < 7; i++) {
    const checkDay = (today + i) % 7
    const dayName = dayNames[checkDay]

    if (reminderDays.includes(dayName)) {
      const reminderDate = new Date(now)
      reminderDate.setDate(now.getDate() + i)
      reminderDate.setHours(hours, minutes, 0, 0)

      // If it's today but the time has passed, skip to next valid day
      if (i === 0 && reminderDate <= now) {
        continue
      }

      return reminderDate
    }
  }

  // Fallback to tomorrow at the specified time
  const tomorrow = new Date(now)
  tomorrow.setDate(now.getDate() + 1)
  tomorrow.setHours(hours, minutes, 0, 0)
  return tomorrow
}

export function shouldShowNotification(lastShown: string | null, frequency: "daily" | "weekly"): boolean {
  if (!lastShown) return true

  const lastShownDate = new Date(lastShown)
  const now = new Date()

  if (frequency === "daily") {
    return (
      now.getDate() !== lastShownDate.getDate() ||
      now.getMonth() !== lastShownDate.getMonth() ||
      now.getFullYear() !== lastShownDate.getFullYear()
    )
  }

  if (frequency === "weekly") {
    const daysDiff = Math.floor((now.getTime() - lastShownDate.getTime()) / (1000 * 60 * 60 * 24))
    return daysDiff >= 7
  }

  return false
}

// Browser notification utilities
export async function requestNotificationPermission(): Promise<NotificationPermission> {
  if (!("Notification" in window)) {
    console.warn("This browser does not support notifications")
    return "denied"
  }

  if (Notification.permission === "granted") {
    return "granted"
  }

  if (Notification.permission === "denied") {
    return "denied"
  }

  const permission = await Notification.requestPermission()
  return permission
}

export function showBrowserNotification(title: string, message: string, icon?: string) {
  if (Notification.permission === "granted") {
    const notification = new Notification(title, {
      body: message,
      icon: icon || "/images/gryt-logo.png",
      badge: "/images/gryt-logo.png",
      tag: "habit-reminder",
      requireInteraction: false,
      silent: false,
    })

    // Auto-close after 5 seconds
    setTimeout(() => notification.close(), 5000)

    notification.onclick = () => {
      window.focus()
      notification.close()
    }

    return notification
  }
}

// Mock data for development
export const mockNotificationPreferences: NotificationPreferences = {
  id: "1",
  userId: "user1",
  ...defaultNotificationPreferences,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const mockHabitReminders: HabitReminder[] = [
  {
    id: "1",
    userId: "user1",
    title: "Time to Log Your Habits! 📝",
    message: "Take a moment to reflect on your day and log any habits that impacted your goals.",
    type: "habit_log",
    scheduledFor: new Date().toISOString(),
    isRead: false,
    isActive: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: "2",
    userId: "user1",
    title: "Weekly Habit Review 📊",
    message: "Review your habit patterns from this week and plan for continued growth.",
    type: "weekly_review",
    scheduledFor: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(), // 2 hours from now
    isRead: false,
    isActive: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(), // 1 hour ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: "3",
    userId: "user1",
    title: "Personal Contract Check-in 📋",
    message: "Review your personal contract and assess your progress toward your commitments.",
    type: "contract",
    scheduledFor: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // Yesterday
    isRead: true,
    isActive: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 25).toISOString(),
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString(),
  },
]
