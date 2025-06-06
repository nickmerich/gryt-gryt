"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Mail, Clock, Shield, Check, AlertCircle, Save } from "lucide-react"
import { mockEmailPreferences, type EmailPreferencesType } from "@/lib/email-service"

interface EmailPreferencesProps {
  userId: string
  isDarkMode?: boolean
  onSave?: (preferences: EmailPreferencesType) => void
}

export default function EmailPreferences({ userId, isDarkMode = false, onSave }: EmailPreferencesProps) {
  const [preferences, setPreferences] = useState<EmailPreferencesType>(mockEmailPreferences)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchPreferences()
  }, [userId])

  const fetchPreferences = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`/api/email/preferences?userId=${userId}`)
      const data = await response.json()

      if (response.ok) {
        setPreferences(data.preferences)
      } else {
        setError(data.error || "Failed to load preferences")
      }
    } catch (err) {
      setError("Failed to load email preferences")
    } finally {
      setIsLoading(false)
    }
  }

  const handleToggle = (key: keyof EmailPreferencesType["preferences"], value: boolean) => {
    setPreferences((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: value,
      },
      updatedAt: new Date().toISOString(),
    }))
  }

  const handleFrequencyChange = (frequency: EmailPreferencesType["frequency"]) => {
    setPreferences((prev) => ({
      ...prev,
      frequency,
      updatedAt: new Date().toISOString(),
    }))
  }

  const handleEmailChange = (email: string) => {
    setPreferences((prev) => ({
      ...prev,
      email,
      updatedAt: new Date().toISOString(),
    }))
  }

  const handleSave = async () => {
    try {
      setIsSaving(true)
      setError(null)

      const response = await fetch("/api/email/preferences", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, preferences }),
      })

      const data = await response.json()

      if (response.ok) {
        setPreferences(data.preferences)
        setSaved(true)
        onSave?.(data.preferences)
        setTimeout(() => setSaved(false), 2000)
      } else {
        setError(data.error || "Failed to save preferences")
      }
    } catch (err) {
      setError("Failed to save email preferences")
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <Card className="border-3 rounded-xl p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-6 bg-gray-200 rounded w-1/3"></div>
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                <div className="h-6 bg-gray-200 rounded w-12"></div>
              </div>
            ))}
          </div>
        </div>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h3 className={`text-2xl font-black ${isDarkMode ? "text-white" : "text-black"}`}>Email Notifications</h3>
        <p className={`text-lg font-medium ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
          Configure your email notification preferences
        </p>
      </div>

      {error && (
        <Card className="border-3 rounded-xl p-4 bg-red-50 border-red-400">
          <div className="flex items-center gap-2 text-red-700">
            <AlertCircle className="h-5 w-5" />
            <span className="font-medium">{error}</span>
          </div>
        </Card>
      )}

      {/* Email Address */}
      <Card
        className={`border-3 rounded-xl p-6 ${
          isDarkMode ? "bg-black/90 border-green-600" : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        }`}
      >
        <h4 className={`font-bold text-xl mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>Email Address</h4>

        <div className="space-y-4">
          <div>
            <Label className={`font-bold mb-2 block ${isDarkMode ? "text-white" : "text-black"}`}>
              <Mail className="h-4 w-4 inline mr-2" />
              Email Address
            </Label>
            <Input
              type="email"
              value={preferences.email}
              onChange={(e) => handleEmailChange(e.target.value)}
              className={`rounded-xl border-2 font-medium ${
                isDarkMode ? "border-green-600 bg-black/50" : "border-black"
              }`}
              placeholder="your@email.com"
            />
          </div>

          <div className="flex items-center gap-2">
            {preferences.isVerified ? (
              <>
                <Shield className="h-4 w-4 text-green-600" />
                <Badge className="bg-green-100 text-green-800 border-green-600">Verified</Badge>
              </>
            ) : (
              <>
                <AlertCircle className="h-4 w-4 text-yellow-600" />
                <Badge className="bg-yellow-100 text-yellow-800 border-yellow-600">Unverified</Badge>
                <Button variant="outline" size="sm" className="ml-2">
                  Verify Email
                </Button>
              </>
            )}
          </div>
        </div>
      </Card>

      {/* Notification Types */}
      <Card
        className={`border-3 rounded-xl p-6 ${
          isDarkMode ? "bg-black/90 border-green-600" : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        }`}
      >
        <h4 className={`font-bold text-xl mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>Email Types</h4>

        <div className="space-y-4">
          {[
            {
              key: "habitReminders" as keyof EmailPreferencesType["preferences"],
              label: "Habit Reminders",
              description: "Daily reminders to log your habits",
            },
            {
              key: "dailyReflection" as keyof EmailPreferencesType["preferences"],
              label: "Daily Reflection",
              description: "Evening reflection prompts",
            },
            {
              key: "weeklyReview" as keyof EmailPreferencesType["preferences"],
              label: "Weekly Review",
              description: "Weekly habit summary and insights",
            },
            {
              key: "achievementAlerts" as keyof EmailPreferencesType["preferences"],
              label: "Achievement Alerts",
              description: "Notifications when you unlock achievements",
            },
            {
              key: "contractReminders" as keyof EmailPreferencesType["preferences"],
              label: "Contract Reminders",
              description: "Check-ins about your personal contract",
            },
            {
              key: "marketingEmails" as keyof EmailPreferencesType["preferences"],
              label: "Marketing Emails",
              description: "Product updates and tips",
            },
          ].map((item) => (
            <div key={item.key} className="flex items-center justify-between p-4 rounded-xl border-2 border-gray-200">
              <div>
                <Label className={`font-bold ${isDarkMode ? "text-white" : "text-black"}`}>{item.label}</Label>
                <p className={`text-sm ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>{item.description}</p>
              </div>
              <Switch
                checked={preferences.preferences[item.key]}
                onCheckedChange={(checked) => handleToggle(item.key, checked)}
              />
            </div>
          ))}
        </div>
      </Card>

      {/* Frequency Settings */}
      <Card
        className={`border-3 rounded-xl p-6 ${
          isDarkMode ? "bg-black/90 border-green-600" : "bg-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        }`}
      >
        <h4 className={`font-bold text-xl mb-4 ${isDarkMode ? "text-white" : "text-black"}`}>Delivery Frequency</h4>

        <div>
          <Label className={`font-bold mb-2 block ${isDarkMode ? "text-white" : "text-black"}`}>
            <Clock className="h-4 w-4 inline mr-2" />
            How often should we send emails?
          </Label>
          <Select value={preferences.frequency} onValueChange={handleFrequencyChange}>
            <SelectTrigger
              className={`rounded-xl border-2 font-medium ${
                isDarkMode ? "border-green-600 bg-black/50" : "border-black"
              }`}
            >
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="immediate">Immediate - Send emails right away</SelectItem>
              <SelectItem value="daily_digest">Daily Digest - One email per day</SelectItem>
              <SelectItem value="weekly_digest">Weekly Digest - One email per week</SelectItem>
            </SelectContent>
          </Select>
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
              Save Preferences
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
