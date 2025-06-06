"use client"

import type { ReactNode } from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import MobileBottomNav from "@/components/dashboard/mobile-bottom-nav"
import NotificationScheduler from "@/components/notifications/notification-scheduler"
import { mockNotificationPreferences } from "@/lib/notifications"
import KeyboardShortcutProvider from "@/components/keyboard/keyboard-shortcut-provider"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const toggleSidebar = () => {
    // This will be handled by the Sidebar component internally
  }

  return (
    <KeyboardShortcutProvider onToggleSidebar={toggleSidebar}>
      <div className="min-h-screen bg-gray-50">
        <div className="flex h-screen">
          {/* Unified Sidebar - handles both mobile and desktop */}
          <Sidebar />

          {/* Main content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Content area */}
            <main className="flex-1 overflow-y-auto bg-gray-50">
              {/* Desktop padding */}
              <div className="hidden md:block p-4">
                <div className="max-w-6xl mx-auto">{children}</div>
              </div>

              {/* Mobile optimized content */}
              <div className="md:hidden p-4 pb-20">{children}</div>
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
