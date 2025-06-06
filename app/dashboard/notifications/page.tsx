"use client"

import { Suspense, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import NotificationSettings from "@/components/notifications/notification-settings"
import EmailPreferences from "@/components/email/email-preferences"
import EmailPreview from "@/components/email/email-preview"
import { Card } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

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

  return (
    <div className="container mx-auto px-4 py-8">
      <Suspense fallback={<LoadingSkeleton />}>
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-gray-100 rounded-xl border-3 border-black p-1">
            <TabsTrigger
              value="push"
              className="rounded-xl font-bold data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:border-2 data-[state=active]:border-black"
            >
              Push Notifications
            </TabsTrigger>
            <TabsTrigger
              value="email"
              className="rounded-xl font-bold data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:border-2 data-[state=active]:border-black"
            >
              Email Settings
            </TabsTrigger>
            <TabsTrigger
              value="preview"
              className="rounded-xl font-bold data-[state=active]:bg-green-600 data-[state=active]:text-white data-[state=active]:border-2 data-[state=active]:border-black"
            >
              Email Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="push">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="email">
            <EmailPreferences userId="user1" />
          </TabsContent>

          <TabsContent value="preview">
            <EmailPreview />
          </TabsContent>
        </Tabs>
      </Suspense>
    </div>
  )
}
