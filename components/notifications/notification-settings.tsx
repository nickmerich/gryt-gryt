"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Bell, Clock, Calendar, Smartphone, Mail, Save, Check } from "lucide-react"
import {
  mockNotificationPreferences,
  requestNotificationPermission,
  type NotificationPreferences,
} from "@/lib/notifications"

interface NotificationSettingsProps {
  isDarkMode?: boolean
  onSave?: (preferences: NotificationPreferences) => void
}

export default function NotificationSettings({ isDarkMode = false, onSave }: NotificationSettingsProps) {
  const [preferences, setPreferences] = useState<NotificationPreferences>(mockNotificationPreferences)
  const [browserPermission, setBrowserPermission] = useState<NotificationPermission>(
    Notification?.permission || "default",
  )
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleToggle = (key: keyof NotificationPreferences, value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: value,
      updatedAt: new Date().toISOString(),
    }))
  }

  const handleTimeChange = (time: string) => {
    setPreferences((prev) => ({
      ...prev,
      reminderTime: time,
      updatedAt: new Date().toISOString(),
    }))
  }

  const handleDayToggle = (day: string) => {
    setPreferences((prev) => ({
      ...prev,
      reminderDays: prev.reminderDays.includes(day)
        ? prev.reminderDays.filter((d) => d !== day)
        : [...prev.reminderDays, day],
      updatedAt: new Date().toISOString(),
    }))
  }

  const handleRequestPermission = async () => {
    const permission = await requestNotificationPermission()
    setBrowserPermission(permission)

    if (permission === "granted") {
      setPreferences((prev) => ({
        ...prev,
        pushNotifications: true,
        updatedAt: new Date().toISOString(),
      }))
    }
  }

  const handleSave = async () => {
    setIsSaving(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    onSave?.(preferences)
    setSaved(true)
    setIsSaving(false)

    setTimeout(() => setSaved(false), 2000)
  }

  const timeOptions = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, "0")
    return { value: `${hour}:00`, label: `${i === 0 ? 12 : i > 12 ? i - 12 : i}:00 ${i < 12 ? "AM" : "PM"}` }
  })

  const dayOptions = [
    { key: "monday", label: "Mon" },
    { key: "tuesday", label: "Tue" },
    { key: "wednesday", label: "Wed" },
    { key: "thursday", label: "Thu" },
    { key: "friday", label: "Fri" },
    { key: "saturday", label: "Sat" },
    { key: "sunday", label: "Sun" },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-black"}`}>Notification Settings</h2>
        <p className={`text-lg font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
          Customize how and when you receive habit reminders
        </p>
      </div>

      {/* Browser Permission */}
      {browserPermission !== "granted" && (
        <Card
          className={`border-3 rounded-xl p-6 ${
            isDarkMode
              ? "bg-yellow-950/20 border-yellow-600"
              : "bg-yellow-50 border-yellow-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          }`}
        >
          <div className="flex items-start gap-4">
            <div className="bg-yellow-100 p-2 rounded-xl">
              <Bell className="h-5 w-5 text-yellow-600" />
            </div>
            <div className="flex-1">
              <h3 className={`font-bold text-lg ${isDarkMode ? "text-yellow-400" : "text-yellow-800"}`}>
                Enable Browser Notifications
              </h3>
              <p className={`text-sm mt-1 ${isDarkMode ? "text-yellow-300" : "text-yellow-700"}`}>
                Allow GRYT to send you push notifications to stay on track with your habits.
              </p>
              <Button
                onClick={handleRequestPermission}
                className="mt-3 bg-yellow-600 hover:bg-yellow-700 text-white rounded-xl border-3 border-black font-bold"
              >
                <Smartphone className="h-4 w-4 mr-2" />
                Enable Notifications
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Notification Types */}
      <Card
        className={`border-3 rounded-xl p-6 ${
          isDarkMode ? "bg-black/90 border-green-600" : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        }`}
      >
        <h3 className={`font-bold text-xl mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>Reminder Types</h3>

        <div className="space-y-4">
          {[
            {
              key: "habitReminders" as keyof NotificationPreferences,
              label: "Daily Habit Reminders",
              description: "Get reminded to log your daily habits",
              icon: <Bell className="h-5 w-5" />,
            },
            {
              key: "dailyReflection" as keyof NotificationPreferences,
              label: "Daily Reflection",
              description: "Reflect on your progress each day",
              icon: <Calendar className="h-5 w-5" />,
            },
            {
              key: "weeklyReview" as keyof NotificationPreferences,
              label: "Weekly Review",
              description: "Review your habit patterns weekly",
              icon: <Calendar className="h-5 w-5" />,
            },
            {
              key: "achievementAlerts" as keyof NotificationPreferences,
              label: "Achievement Alerts",
              description: "Celebrate your milestones and achievements",
              icon: <Check className="h-5 w-5" />,
            },
            {
              key: "contractReminders" as keyof NotificationPreferences,
              label: "Contract Check-ins",
              description: "Regular reminders about your personal contract",
              icon: <Bell className="h-5 w-5" />,
            },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">{item.icon}</div>
                <div>
                  <Label className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>{item.label}</Label>
                  <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{item.description}</p>
                </div>
              </div>
              <Switch
                checked={preferences[item.key] as boolean}
                onCheckedChange={(checked) => handleToggle(item.key, checked)}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Timing Settings */}
      <Card
        className={`border-3 rounded-xl p-6 ${
          isDarkMode ? "bg-black/90 border-green-600" : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        }`}
      >
        <h3 className={`font-bold text-xl mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>Timing & Schedule</h3>

        <div className="space-y-6">
          {/* Reminder Time */}
          <div>
            <Label className={`font-bold mb-2 block ${isDarkMode ? "text-white" : "text-black"}`}>
              <Clock className="h-4 w-4 inline mr-2" />
              Daily Reminder Time
            </Label>
            <Select value={preferences.reminderTime} onValueChange={handleTimeChange}>
              <SelectTrigger
                className={`rounded-xl border-2 font-medium ${
                  isDarkMode ? "border-green-600 bg-black/50" : "border-black"
                }`}
              >
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {timeOptions.map((time) => (
                  <SelectItem key={time.value} value={time.value}>
                    {time.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reminder Days */}
          <div>
            <Label className={`font-bold mb-3 block ${isDarkMode ? "text-white" : "text-black"}`}>
              <Calendar className="h-4 w-4 inline mr-2" />
              Reminder Days
            </Label>
            <div className="flex flex-wrap gap-2">
              {dayOptions.map((day) => (
                <Badge
                  key={day.key}
                  variant={preferences.reminderDays.includes(day.key) ? "default" : "outline"}
                  className={`cursor-pointer px-3 py-2 font-medium transition-all ${
                    preferences.reminderDays.includes(day.key)
                      ? "bg-green-600 text-white border-black"
                      : isDarkMode
                        ? "border-green-600 text-green-400 hover:bg-green-600/10"
                        : "border-black text-black hover:bg-gray-50"
                  }`}
                  onClick={() => handleDayToggle(day.key)}
                >
                  {day.label}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </Card>

      {/* Delivery Methods */}
      <Card
        className={`border-3 rounded-xl p-6 ${
          isDarkMode ? "bg-black/90 border-green-600" : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        }`}
      >
        <h3 className={`font-bold text-xl mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>Delivery Methods</h3>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-blue-100 p-2 rounded-lg">
                <Smartphone className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <Label className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Push Notifications</Label>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Receive notifications in your browser
                </p>
              </div>
            </div>
            <Switch
              checked={preferences.pushNotifications && browserPermission === "granted"}
              onCheckedChange={(checked) => handleToggle("pushNotifications", checked)}
              disabled={browserPermission !== "granted"}
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200">
            <div className="flex items-center gap-3">
              <div className="bg-purple-100 p-2 rounded-lg">
                <Mail className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <Label className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>Email Notifications</Label>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
                  Receive reminders via email
                </p>
              </div>
            </div>
            <Switch
              checked={preferences.emailNotifications}
              onCheckedChange={(checked) => handleToggle("emailNotifications", checked)}
            />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          onClick={handleSave}
          disabled={isSaving}
          className={`bg-green-600 hover:bg-green-700 text-white rounded-xl border-3 border-black font-bold px-8 py-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-200 ${
            saved ? "bg-green-700" : ""
          }`}
        >
          {isSaving ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2" />
              Saving...
            </>
          ) : saved ? (
            <>
              <Check className="h-4 w-4 mr-2" />
              Saved!
            </>
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save Settings
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
