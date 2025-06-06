"use client"

import { Suspense, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Bell, Mail, Settings, Volume2 } from "lucide-react"

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div>
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="border-3 rounded-xl p-6">
          <Skeleton className="h-6 w-48 mb-4" />
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <div>
                    <Skeleton className="h-4 w-32 mb-1" />
                    <Skeleton className="h-3 w-48" />
                  </div>
                </div>
                <Skeleton className="h-6 w-12 rounded-full" />
              </div>
            ))}
          </div>
        </Card>
      ))}
    </div>
  )
}

export default function NotificationsPage() {
  const [activeTab, setActiveTab] = useState("push")
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    habitReminders: true,
    achievementAlerts: true,
    weeklyReports: false,
    marketingEmails: false,
  })

  const handleSettingChange = (key: string, value: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-black text-black">Notification Settings</h1>
        <p className="text-gray-600 mt-1">Manage how you receive updates and alerts</p>
      </div>

      <Suspense fallback={<LoadingSkeleton />}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-gray-100 rounded-xl border-3 border-black p-1">
            <TabsTrigger
              value="push"
              className="rounded-xl font-bold data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:border-2 data-[state=active]:border-black"
            >
              <Bell className="h-4 w-4 mr-2" />
              Push Notifications
            </TabsTrigger>
            <TabsTrigger
              value="email"
              className="rounded-xl font-bold data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:border-2 data-[state=active]:border-black"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="push">
            <Card className="border-3 border-black rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-600 p-3 rounded-xl">
                  <Bell className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">Push Notifications</h2>
                  <p className="text-gray-600">Get instant alerts on your device</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Volume2 className="h-5 w-5 text-gray-500" />
                    <div>
                      <Label className="font-bold text-black">Enable Push Notifications</Label>
                      <p className="text-sm text-gray-600">Allow notifications from this app</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.pushNotifications}
                    onCheckedChange={(checked) => handleSettingChange("pushNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-gray-500" />
                    <div>
                      <Label className="font-bold text-black">Habit Reminders</Label>
                      <p className="text-sm text-gray-600">Get reminded about your daily habits</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.habitReminders}
                    onCheckedChange={(checked) => handleSettingChange("habitReminders", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-gray-500" />
                    <div>
                      <Label className="font-bold text-black">Achievement Alerts</Label>
                      <p className="text-sm text-gray-600">Celebrate when you unlock achievements</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.achievementAlerts}
                    onCheckedChange={(checked) => handleSettingChange("achievementAlerts", checked)}
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="email">
            <Card className="border-3 border-black rounded-xl p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="bg-green-600 p-3 rounded-xl">
                  <Mail className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-black">Email Notifications</h2>
                  <p className="text-gray-600">Control what emails you receive</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <div>
                      <Label className="font-bold text-black">Email Notifications</Label>
                      <p className="text-sm text-gray-600">Receive important updates via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => handleSettingChange("emailNotifications", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-gray-500" />
                    <div>
                      <Label className="font-bold text-black">Weekly Reports</Label>
                      <p className="text-sm text-gray-600">Get a summary of your weekly progress</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.weeklyReports}
                    onCheckedChange={(checked) => handleSettingChange("weeklyReports", checked)}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Settings className="h-5 w-5 text-gray-500" />
                    <div>
                      <Label className="font-bold text-black">Marketing Emails</Label>
                      <p className="text-sm text-gray-600">Receive tips and product updates</p>
                    </div>
                  </div>
                  <Switch
                    checked={settings.marketingEmails}
                    onCheckedChange={(checked) => handleSettingChange("marketingEmails", checked)}
                  />
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <Button className="bg-green-600 hover:bg-green-700 text-white rounded-xl border-3 border-black font-bold">
                  Save Email Preferences
                </Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </Suspense>
    </div>
  )
}
