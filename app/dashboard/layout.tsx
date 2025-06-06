"use client"

import type { ReactNode } from "react"
import { useState } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import MobileHeader from "@/components/dashboard/mobile-header"
import MobileSidebar from "@/components/dashboard/mobile-sidebar"
import MobileBottomNav from "@/components/dashboard/mobile-bottom-nav"
import NotificationScheduler from "@/components/notifications/notification-scheduler"
import { mockNotificationPreferences } from "@/lib/notifications"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import KeyboardShortcutProvider from "@/components/keyboard/keyboard-shortcut-provider"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <KeyboardShortcutProvider onToggleSidebar={toggleSidebar}>
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-screen">
          {/* Sidebar - Desktop only */}
          <div className="hidden md:block">
            <Sidebar />
          </div>

          {/* Mobile Sidebar */}
          <MobileSidebar
            trigger={
              <Button variant="ghost" size="icon" className="md:hidden" aria-label="Toggle sidebar menu">
                <Menu className="h-6 w-6" />
              </Button>
            }
          />

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Mobile header */}
            <MobileHeader />

            {/* Content area */}
            <main className="flex-1 overflow-y-auto bg-gray-50">
              {/* Desktop padding */}
              <div className="hidden md:block p-4">
                <div className="max-w-6xl mx-auto">{children}</div>
              </div>

              {/* Mobile optimized content */}
              <div className="md:hidden">{children}</div>
            </main>
          </div>
        </div>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />

        {/* Notification Scheduler */}
        <NotificationScheduler
          preferences={mockNotificationPreferences}
          onNotificationTriggered={(type, title, message) => {
            console.log("Notification triggered:", { type, title, message })
          }}
        />
      </div>
    </KeyboardShortcutProvider>
  )
}
