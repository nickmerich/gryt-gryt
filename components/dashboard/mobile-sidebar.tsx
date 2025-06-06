"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import {
  Home,
  BarChart3,
  Bell,
  Users,
  Calendar,
  Settings,
  Target,
  BookOpen,
  Trophy,
  FileText,
  LogOut,
  X,
  Keyboard,
} from "lucide-react"
import { useKeyboardShortcutContext } from "@/components/keyboard/keyboard-shortcut-provider"

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: Home,
    shortcut: "Alt + D",
  },
  {
    name: "Habits",
    href: "/dashboard/habits",
    icon: Target,
    shortcut: "Alt + H",
  },
  {
    name: "Journal",
    href: "/dashboard/journal",
    icon: BookOpen,
    shortcut: "Alt + J",
  },
  {
    name: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart3,
    shortcut: "Alt + A",
  },
  {
    name: "Achievements",
    href: "/dashboard/achievements",
    icon: Trophy,
    shortcut: "Alt + T",
  },
  {
    name: "Personal Contract",
    href: "/dashboard/contract",
    icon: FileText,
    shortcut: "Alt + C",
  },
  {
    name: "Leaderboard",
    href: "/dashboard/leaderboard",
    icon: Users,
    shortcut: "Alt + L",
  },
  {
    name: "Calendar",
    href: "/dashboard/calendar",
    icon: Calendar,
  },
  {
    name: "Notifications",
    href: "/dashboard/notifications",
    icon: Bell,
  },
  {
    name: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
    shortcut: "Alt + S",
  },
]

interface MobileSidebarProps {
  trigger: React.ReactNode
}

export default function MobileSidebar({ trigger }: MobileSidebarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { showShortcutHelp } = useKeyboardShortcutContext()

  const isActive = (path: string) => pathname === path

  const handleNavigation = () => {
    setIsOpen(false)
  }

  // Listen for keyboard shortcut context
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent side="left" className="w-[320px] p-0 border-r-4 border-black bg-white">
        <div className="h-full flex flex-col">
          {/* Header */}
          <SheetHeader className="p-6 border-b-4 border-black bg-gradient-to-r from-gryt-green to-green-600 text-white">
            <div className="flex items-center justify-between">
              <SheetTitle className="text-2xl font-black text-white">GRYT</SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="text-white hover:bg-white/20 rounded-xl min-w-[44px] min-h-[44px]"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <p className="text-green-100 text-sm font-medium">Your Personal Growth Tracker</p>
          </SheetHeader>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href} onClick={handleNavigation} className="block">
                  <Button
                    variant={isActive(item.href) ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 rounded-xl font-bold min-h-[56px] text-base transition-all duration-200 ${
                      isActive(item.href)
                        ? "bg-gryt-green hover:bg-green-600 text-white border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                        : "hover:bg-green-50 text-black border-2 border-transparent hover:border-green-200 active:bg-green-100"
                    }`}
                  >
                    <item.icon className="h-6 w-6" />
                    <span className="flex-1 text-left">{item.name}</span>
                    {item.shortcut && (
                      <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-2">
                        {item.shortcut}
                      </kbd>
                    )}
                  </Button>
                </Link>
              ))}
            </nav>

            {/* Quick Actions Section */}
            <div className="mt-8 p-4 border-2 border-black rounded-xl bg-gradient-to-br from-green-50 to-green-100">
              <h3 className="font-bold text-black mb-3 text-lg">Quick Actions</h3>
              <div className="space-y-2">
                <Link href="/dashboard/habits/new" onClick={handleNavigation}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-2 border-black rounded-lg font-bold min-h-[44px] hover:bg-green-50 transition-all duration-200"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Add New Habit
                    <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                      Ctrl+Shift+N
                    </kbd>
                  </Button>
                </Link>
                <Link href="/dashboard/journal/new" onClick={handleNavigation}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-2 border-black rounded-lg font-bold min-h-[44px] hover:bg-green-50 transition-all duration-200"
                  >
                    <BookOpen className="h-4 w-4 mr-2" />
                    New Journal Entry
                    <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                      Ctrl+Shift+J
                    </kbd>
                  </Button>
                </Link>
                <Link href="/dashboard/contract/new" onClick={handleNavigation}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start border-2 border-black rounded-lg font-bold min-h-[44px] hover:bg-green-50 transition-all duration-200"
                  >
                    <FileText className="h-4 w-4 mr-2" />
                    Create Contract
                    <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground ml-auto">
                      Ctrl+Shift+C
                    </kbd>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Keyboard Shortcuts Button */}
            <Button
              variant="outline"
              onClick={() => {
                showShortcutHelp()
                setIsOpen(false)
              }}
              className="w-full mt-4 justify-start gap-2 border-2 border-black rounded-lg font-bold min-h-[44px] hover:bg-yellow-50 transition-all duration-200"
            >
              <Keyboard className="h-5 w-5" />
              Keyboard Shortcuts
              <kbd className="ml-auto inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                ?
              </kbd>
            </Button>

            {/* Stats Section */}
            <div className="mt-6 p-4 border-2 border-black rounded-xl bg-gradient-to-br from-gray-50 to-gray-100">
              <h3 className="font-bold text-black mb-3 text-lg">Today's Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Habits Completed</span>
                  <span className="text-lg font-bold text-gryt-green">3/5</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">Current Streak</span>
                  <span className="text-lg font-bold text-gryt-green">12 days</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-gray-700">GP Earned</span>
                  <span className="text-lg font-bold text-gryt-green">+45</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t-4 border-black bg-gray-50">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 rounded-xl font-bold text-red-600 hover:bg-red-50 hover:text-red-700 min-h-[52px] border-2 border-transparent hover:border-red-200 transition-all duration-200"
              onClick={handleNavigation}
            >
              <LogOut className="h-5 w-5" />
              Log Out
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
