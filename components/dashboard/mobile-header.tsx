"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { Bell, ChevronLeft } from "lucide-react"
import { MobileTouchFeedback } from "@/components/mobile/mobile-touch-feedback"
import Link from "next/link"
import { MobileDrawer } from "@/components/ui/mobile-drawer"

export default function MobileHeader() {
  const pathname = usePathname()
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [hasBackButton, setHasBackButton] = useState(false)
  const [pageTitle, setPageTitle] = useState("Dashboard")
  const [notificationCount, setNotificationCount] = useState(3)

  // Determine page title and back button based on path
  useEffect(() => {
    // Extract page title from path
    const segments = pathname.split("/").filter(Boolean)
    const currentPage = segments[segments.length - 1]

    if (currentPage) {
      setPageTitle(currentPage.charAt(0).toUpperCase() + currentPage.slice(1))
    } else if (segments.length > 0) {
      setPageTitle(segments[0].charAt(0).toUpperCase() + segments[0].slice(1))
    } else {
      setPageTitle("Dashboard")
    }

    // Show back button for nested routes
    setHasBackButton(segments.length > 1)
  }, [pathname])

  // Get parent path for back button
  const getParentPath = () => {
    const segments = pathname.split("/").filter(Boolean)
    segments.pop()
    return segments.length > 0 ? `/${segments.join("/")}` : "/"
  }

  return (
    <div className="md:hidden border-b-4 border-black bg-white sticky top-0 z-40 safe-area-top">
      <div className="flex justify-between items-center p-4 min-h-[72px]">
        <div className="flex items-center">
          {hasBackButton ? (
            <MobileTouchFeedback className="mr-2">
              <Link href={getParentPath()} className="p-2 -ml-2">
                <ChevronLeft className="h-6 w-6 text-black" />
              </Link>
            </MobileTouchFeedback>
          ) : (
            <div className="h-10 w-10 flex items-center justify-center">
              <span className="font-black text-xl">G</span>
            </div>
          )}
          <h1 className="text-xl font-bold text-black truncate">{pageTitle}</h1>
        </div>

        <MobileTouchFeedback onTap={() => setIsNotificationsOpen(true)}>
          <div className="relative p-2">
            <Bell className="h-6 w-6 text-black" />
            {notificationCount > 0 && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-gryt-green border-2 border-white rounded-full flex items-center justify-center">
                <span className="text-xs font-bold text-white">{notificationCount}</span>
              </div>
            )}
          </div>
        </MobileTouchFeedback>
      </div>

      <MobileDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        position="right"
        width="90%"
      >
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-3 border-2 border-black rounded-xl bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
              >
                <div className="flex items-start">
                  <div className="h-8 w-8 rounded-full bg-gryt-green flex items-center justify-center text-white font-bold mr-3">
                    {i}
                  </div>
                  <div>
                    <h3 className="font-bold">Notification Title {i}</h3>
                    <p className="text-sm text-gray-600">
                      This is a notification message with some details about what happened.
                    </p>
                    <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <MobileTouchFeedback>
              <Link
                href="/dashboard/notifications"
                className="block w-full p-3 text-center rounded-xl bg-gryt-green text-white font-bold"
                onClick={() => setIsNotificationsOpen(false)}
              >
                View All Notifications
              </Link>
            </MobileTouchFeedback>
          </div>
        </div>
      </MobileDrawer>
    </div>
  )
}
