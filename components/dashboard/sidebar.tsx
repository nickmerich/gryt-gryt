"use client"

import {
  Bell,
  BarChart3,
  Calendar,
  Home,
  Settings,
  Target,
  BookOpen,
  Trophy,
  FileText,
  Users,
  Keyboard,
} from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useKeyboardShortcutContext } from "@/components/keyboard/keyboard-shortcut-provider"

const navigation = [
  {
    name: "Home",
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

export function Sidebar() {
  const pathname = usePathname()
  const { showShortcutHelp } = useKeyboardShortcutContext()

  const navigationItems = navigation.map((item) => ({
    ...item,
    current: pathname === item.href,
  }))

  return (
    <div className="h-full w-64 border-r-4 border-black bg-white">
      {/* Logo */}
      <div className="p-6 border-b-4 border-black bg-gradient-to-r from-gryt-green to-green-600">
        <h1 className="text-2xl font-black text-white">GRYT</h1>
        <p className="text-green-100 text-sm font-medium">Your Personal Growth Tracker</p>
      </div>

      {/* Navigation */}
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <Link key={item.name} href={item.href}>
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start gap-2 rounded-xl px-4 py-2 font-bold",
                    item.current
                      ? "bg-gryt-green text-white hover:bg-green-600 border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                      : "hover:bg-green-50 text-black border-2 border-transparent hover:border-green-200",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="flex-1 text-left">{item.name}</span>
                  {item.shortcut && (
                    <kbd className="hidden md:inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                      {item.shortcut}
                    </kbd>
                  )}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Keyboard Shortcuts Button */}
      <div className="px-3 py-2 mt-auto border-t-4 border-black">
        <Button
          variant="outline"
          onClick={showShortcutHelp}
          className="w-full justify-start gap-2 border-2 border-black rounded-lg font-bold hover:bg-yellow-50 transition-all duration-200"
        >
          <Keyboard className="h-5 w-5" />
          Keyboard Shortcuts
          <kbd className="ml-auto inline-flex h-5 items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
            ?
          </kbd>
        </Button>
      </div>
    </div>
  )
}
