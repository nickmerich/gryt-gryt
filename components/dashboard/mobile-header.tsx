"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, LayoutDashboard, Target, Calendar, BarChart3, BookOpen, Users, Bell } from "lucide-react"
import MobileSidebar from "./mobile-sidebar"

export default function MobileHeader() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Habits", href: "/dashboard/habits", icon: Target },
    { name: "Journal", href: "/dashboard/journal", icon: BookOpen },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
    { name: "Community", href: "/dashboard/community", icon: Users },
  ]

  const isActive = (path: string) => pathname === path

  const getPageTitle = () => {
    const item = navItems.find((item) => item.href === pathname)
    return item ? item.name : "Dashboard"
  }

  return (
    <div className="md:hidden border-b-4 border-black bg-white sticky top-0 z-50">
      <div className="flex justify-between items-center p-4 min-h-[72px]">
        <MobileSidebar
          trigger={
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl border-3 border-black min-w-[48px] min-h-[48px] bg-white hover:bg-green-50 active:bg-green-100 transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
            >
              <Menu className="h-6 w-6 text-black" />
            </Button>
          }
        />

        {/* Page Title */}
        <h1 className="text-xl font-bold text-black truncate mx-4">{getPageTitle()}</h1>

        {/* Notification Button */}
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl border-3 border-black min-w-[48px] min-h-[48px] bg-white hover:bg-green-50 active:bg-green-100 transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] relative"
        >
          <Bell className="h-6 w-6 text-black" />
          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-gryt-green border-2 border-white rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">3</span>
          </div>
        </Button>
      </div>
    </div>
  )
}
