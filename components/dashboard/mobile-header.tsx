"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Menu,
  LayoutDashboard,
  Target,
  Calendar,
  BarChart3,
  BookOpen,
  Settings,
  LogOut,
  Users,
  Bell,
  X,
} from "lucide-react"

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
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="rounded-xl border-3 border-black min-w-[48px] min-h-[48px] bg-white hover:bg-red-50 active:bg-red-100 transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
            >
              <Menu className="h-6 w-6 text-black" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="border-r-4 border-black p-0 w-[320px] bg-white">
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="p-6 border-b-4 border-black bg-gradient-to-r from-red-500 to-red-600 text-white relative">
                <div className="flex items-center justify-between">
                  <Link href="/" className="text-2xl font-black">
                    GRYT
                  </Link>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(false)}
                    className="text-white hover:bg-white/20 rounded-xl min-w-[44px] min-h-[44px]"
                  >
                    <X className="h-6 w-6" />
                  </Button>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex-1 overflow-y-auto p-4">
                <nav className="space-y-3">
                  {navItems.map((item) => (
                    <Link key={item.name} href={item.href} onClick={() => setIsOpen(false)}>
                      <Button
                        variant={isActive(item.href) ? "default" : "ghost"}
                        className={`w-full justify-start gap-3 rounded-xl font-bold min-h-[56px] text-base transition-all duration-200 ${
                          isActive(item.href)
                            ? "bg-red-500 hover:bg-red-600 text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                            : "hover:bg-red-50 text-black border-2 border-transparent hover:border-red-200 active:bg-red-100"
                        }`}
                      >
                        <item.icon className="h-6 w-6" />
                        {item.name}
                      </Button>
                    </Link>
                  ))}
                </nav>

                {/* Quick Actions */}
                <div className="mt-8 p-4 border-2 border-black rounded-xl bg-gradient-to-br from-red-50 to-red-100">
                  <h3 className="font-bold text-black mb-3">Quick Actions</h3>
                  <div className="space-y-2">
                    <Link href="/dashboard/habits/new">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start border-2 border-black rounded-lg font-bold min-h-[44px] hover:bg-red-50"
                        onClick={() => setIsOpen(false)}
                      >
                        <Target className="h-4 w-4 mr-2" />
                        Add Habit
                      </Button>
                    </Link>
                    <Link href="/dashboard/journal/new">
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full justify-start border-2 border-black rounded-lg font-bold min-h-[44px] hover:bg-red-50"
                        onClick={() => setIsOpen(false)}
                      >
                        <BookOpen className="h-4 w-4 mr-2" />
                        New Entry
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t-4 border-black bg-gray-50">
                <Link href="/dashboard/settings" onClick={() => setIsOpen(false)}>
                  <Button
                    variant={isActive("/dashboard/settings") ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 rounded-xl font-bold mb-3 min-h-[52px] ${
                      isActive("/dashboard/settings")
                        ? "bg-red-500 hover:bg-red-600 text-white border-2 border-black"
                        : "hover:bg-red-50 text-black"
                    }`}
                  >
                    <Settings className="h-5 w-5" />
                    Settings
                  </Button>
                </Link>
                <Link href="/">
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-3 rounded-xl font-bold text-red-600 hover:bg-red-50 hover:text-red-700 min-h-[52px] border-2 border-transparent hover:border-red-200"
                  >
                    <LogOut className="h-5 w-5" />
                    Log Out
                  </Button>
                </Link>
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Page Title */}
        <h1 className="text-xl font-bold text-black truncate mx-4">{getPageTitle()}</h1>

        {/* Notification Button */}
        <Button
          variant="outline"
          size="icon"
          className="rounded-xl border-3 border-black min-w-[48px] min-h-[48px] bg-white hover:bg-red-50 active:bg-red-100 transition-all duration-200 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] relative"
        >
          <Bell className="h-6 w-6 text-black" />
          {/* Notification Badge */}
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 border-2 border-white rounded-full flex items-center justify-center">
            <span className="text-xs font-bold text-white">3</span>
          </div>
        </Button>
      </div>
    </div>
  )
}
