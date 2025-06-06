"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, BellRing, Check, X, Settings, Calendar, Target, FileText, Award } from "lucide-react"
import { format, formatDistanceToNow, parseISO } from "date-fns"
import { mockHabitReminders, type HabitReminder } from "@/lib/notifications"

interface NotificationCenterProps {
  isDarkMode?: boolean
  onClose?: () => void
}

export default function NotificationCenter({ isDarkMode = false, onClose }: NotificationCenterProps) {
  const [notifications, setNotifications] = useState<HabitReminder[]>(mockHabitReminders)
  const [filter, setFilter] = useState<"all" | "unread" | "today">("all")

  const unreadCount = notifications.filter((n) => !n.isRead && n.isActive).length

  const filteredNotifications = notifications
    .filter((notification) => {
      if (!notification.isActive) return false

      switch (filter) {
        case "unread":
          return !notification.isRead
        case "today":
          const today = new Date()
          const notificationDate = parseISO(notification.createdAt)
          return notificationDate.toDateString() === today.toDateString()
        default:
          return true
      }
    })
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, isRead: true, updatedAt: new Date().toISOString() } : notification,
      ),
    )
  }

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        isRead: true,
        updatedAt: new Date().toISOString(),
      })),
    )
  }

  const dismissNotification = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, isActive: false, updatedAt: new Date().toISOString() }
          : notification,
      ),
    )
  }

  const getNotificationIcon = (type: HabitReminder["type"]) => {
    switch (type) {
      case "habit_log":
        return <Target className="h-5 w-5" />
      case "daily_reflection":
        return <Calendar className="h-5 w-5" />
      case "weekly_review":
        return <FileText className="h-5 w-5" />
      case "achievement":
        return <Award className="h-5 w-5" />
      case "contract":
        return <FileText className="h-5 w-5" />
      default:
        return <Bell className="h-5 w-5" />
    }
  }

  const getNotificationColor = (type: HabitReminder["type"]) => {
    switch (type) {
      case "habit_log":
        return "bg-green-100 text-green-700"
      case "daily_reflection":
        return "bg-blue-100 text-blue-700"
      case "weekly_review":
        return "bg-purple-100 text-purple-700"
      case "achievement":
        return "bg-yellow-100 text-yellow-700"
      case "contract":
        return "bg-orange-100 text-orange-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <Card
      className={`w-full max-w-md border-3 rounded-xl ${
        isDarkMode ? "bg-black/95 border-green-600" : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center justify-between p-4 border-b-2 ${
          isDarkMode ? "border-green-600" : "border-black"
        }`}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <BellRing className={`h-6 w-6 ${isDarkMode ? "text-green-400" : "text-green-600"}`} />
            {unreadCount > 0 && (
              <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                {unreadCount}
              </Badge>
            )}
          </div>
          <div>
            <h3 className={`font-bold text-lg ${isDarkMode ? "text-white" : "text-black"}`}>Notifications</h3>
            <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{unreadCount} unread</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            disabled={unreadCount === 0}
            className={`text-xs ${isDarkMode ? "text-green-400 hover:text-green-300" : "text-green-600 hover:text-green-700"}`}
          >
            <Check className="h-4 w-4 mr-1" />
            Mark All Read
          </Button>
          {onClose && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className={`${isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-600 hover:text-black"}`}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className={`flex border-b-2 ${isDarkMode ? "border-green-600" : "border-black"}`}>
        {[
          { key: "all", label: "All", count: filteredNotifications.length },
          { key: "unread", label: "Unread", count: unreadCount },
          {
            key: "today",
            label: "Today",
            count: notifications.filter((n) => {
              const today = new Date()
              const notificationDate = parseISO(n.createdAt)
              return notificationDate.toDateString() === today.toDateString() && n.isActive
            }).length,
          },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as typeof filter)}
            className={`flex-1 px-4 py-3 text-sm font-medium transition-colors ${
              filter === tab.key
                ? isDarkMode
                  ? "bg-green-600/20 text-green-400 border-b-2 border-green-400"
                  : "bg-green-50 text-green-700 border-b-2 border-green-600"
                : isDarkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800/50"
                  : "text-gray-600 hover:text-black hover:bg-gray-50"
            }`}
          >
            {tab.label}
            {tab.count > 0 && (
              <Badge className="ml-2 h-5 w-5 p-0 flex items-center justify-center bg-green-600 text-white text-xs">
                {tab.count}
              </Badge>
            )}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <ScrollArea className="h-96">
        <div className="p-2">
          {filteredNotifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <Bell className={`h-12 w-12 mb-4 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`} />
              <h4 className={`font-bold mb-2 ${isDarkMode ? "text-white" : "text-black"}`}>No notifications</h4>
              <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                {filter === "unread"
                  ? "You're all caught up!"
                  : filter === "today"
                    ? "No notifications today"
                    : "You'll see notifications here when they arrive"}
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`p-4 border-2 rounded-xl transition-all duration-200 cursor-pointer ${
                    notification.isRead
                      ? isDarkMode
                        ? "bg-gray-900/50 border-gray-700 hover:border-gray-600"
                        : "bg-gray-50 border-gray-200 hover:border-gray-300"
                      : isDarkMode
                        ? "bg-green-950/20 border-green-600 hover:border-green-500"
                        : "bg-green-50 border-green-200 hover:border-green-300"
                  }`}
                  onClick={() => !notification.isRead && markAsRead(notification.id)}
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${getNotificationColor(notification.type)}`}>
                      {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className={`font-bold text-sm ${isDarkMode ? "text-white" : "text-black"}`}>
                          {notification.title}
                        </h4>
                        <div className="flex items-center gap-1">
                          {!notification.isRead && <div className="w-2 h-2 bg-green-500 rounded-full" />}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              dismissNotification(notification.id)
                            }}
                            className={`h-6 w-6 p-0 ${
                              isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-black"
                            }`}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>

                      <p className={`text-sm mt-1 ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
                        {notification.message}
                      </p>

                      <div className="flex items-center justify-between mt-2">
                        <p className={`text-xs ${isDarkMode ? "text-gray-500" : "text-gray-500"}`}>
                          {formatDistanceToNow(parseISO(notification.createdAt), { addSuffix: true })}
                        </p>

                        {new Date(notification.scheduledFor) > new Date() && (
                          <Badge variant="outline" className="text-xs">
                            Scheduled for {format(parseISO(notification.scheduledFor), "MMM d, h:mm a")}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className={`p-4 border-t-2 ${isDarkMode ? "border-green-600" : "border-black"}`}>
        <Button
          variant="outline"
          size="sm"
          className={`w-full rounded-xl border-2 font-medium ${
            isDarkMode
              ? "border-green-600 text-green-400 hover:bg-green-600/10"
              : "border-black text-black hover:bg-gray-50"
          }`}
        >
          <Settings className="h-4 w-4 mr-2" />
          Notification Settings
        </Button>
      </div>
    </Card>
  )
}
