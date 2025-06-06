"use client"

import { Home, Calendar, BarChart3, BookOpen, Menu } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useState } from "react"
import Link from "next/link"
import { MobileTouchFeedback } from "@/components/mobile/mobile-touch-feedback"
import { MobileDrawer } from "@/components/ui/mobile-drawer"

const MobileBottomNav = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    {
      name: "Home",
      href: "/dashboard",
      icon: Home,
      current: pathname === "/dashboard",
    },
    {
      name: "Habits",
      href: "/dashboard/habits",
      icon: BookOpen,
      current: pathname.startsWith("/dashboard/habits"),
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart3,
      current: pathname.startsWith("/dashboard/analytics"),
    },
    {
      name: "Calendar",
      href: "/dashboard/calendar",
      icon: Calendar,
      current: pathname.startsWith("/dashboard/calendar"),
    },
  ]

  const moreNavigation = [
    { name: "Journal", href: "/dashboard/journal" },
    { name: "Achievements", href: "/dashboard/achievements" },
    { name: "Leaderboard", href: "/dashboard/leaderboard" },
    { name: "Personal Contract", href: "/dashboard/contract" },
    { name: "Notifications", href: "/dashboard/notifications" },
    { name: "Settings", href: "/dashboard/settings" },
  ]

  return (
    <>
      <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t z-40 safe-area-bottom">
        <div className="flex items-center justify-between h-16 px-4">
          {navigation.map((item) => (
            <MobileTouchFeedback key={item.name} className="flex-1">
              <Link
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center h-full",
                  item.current ? "text-gryt-green" : "text-gray-500",
                )}
              >
                <item.icon className="h-6 w-6" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            </MobileTouchFeedback>
          ))}
          <MobileTouchFeedback className="flex-1" onTap={() => setIsMenuOpen(true)}>
            <div className="flex flex-col items-center justify-center h-full">
              <Menu className="h-6 w-6 text-gray-500" />
              <span className="text-xs mt-1 text-gray-500">More</span>
            </div>
          </MobileTouchFeedback>
        </div>
      </div>

      <MobileDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        position="bottom"
        height="auto"
        className="max-h-[80vh]"
      >
        <div className="p-4 pt-2">
          <h3 className="text-lg font-bold mb-4">More Options</h3>
          <div className="grid grid-cols-2 gap-3">
            {moreNavigation.map((item) => (
              <MobileTouchFeedback key={item.name}>
                <Link
                  href={item.href}
                  className="flex items-center p-3 rounded-xl border-2 border-black bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="font-medium">{item.name}</span>
                </Link>
              </MobileTouchFeedback>
            ))}
          </div>
          <div className="mt-6 mb-8">
            <MobileTouchFeedback>
              <button
                className="w-full p-3 rounded-xl border-2 border-red-500 text-red-600 font-medium"
                onClick={() => {
                  setIsMenuOpen(false)
                  // Add logout functionality here
                }}
              >
                Log Out
              </button>
            </MobileTouchFeedback>
          </div>
        </div>
      </MobileDrawer>
    </>
  )
}

export default MobileBottomNav
