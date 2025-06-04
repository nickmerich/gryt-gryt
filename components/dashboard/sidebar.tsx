"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Target, Calendar, BarChart3, BookOpen, Settings, LogOut, Users } from "lucide-react"

export default function Sidebar() {
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Habits", href: "/dashboard/habits", icon: Target },
    { name: "Journal", href: "/dashboard/journal", icon: BookOpen },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Calendar", href: "/dashboard/calendar", icon: Calendar },
    { name: "Community", href: "/dashboard/community", icon: Users },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <div className="hidden md:flex md:flex-col md:w-64 bg-black border-r-4 border-red-600">
      <div className="p-6 border-b-4 border-red-600 flex justify-center">
        <Link href="/" className="text-2xl font-black text-white">
          GRYT
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href}>
              <Button
                variant={isActive(item.href) ? "default" : "ghost"}
                className={`w-full justify-start gap-3 rounded-xl font-bold text-base py-3 transition-all duration-300 ${
                  isActive(item.href)
                    ? "bg-red-600 hover:bg-red-700 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
                    : "text-gray-300 hover:bg-gray-800 hover:text-white"
                }`}
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </Button>
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t-4 border-red-600">
        <Link href="/dashboard/settings">
          <Button
            variant={isActive("/dashboard/settings") ? "default" : "ghost"}
            className={`w-full justify-start gap-3 rounded-xl font-bold mb-3 text-base py-3 transition-all duration-300 ${
              isActive("/dashboard/settings")
                ? "bg-red-600 hover:bg-red-700 text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)]"
                : "text-gray-300 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <Settings className="h-5 w-5" />
            Settings
          </Button>
        </Link>
        <Link href="/">
          <Button
            variant="ghost"
            className="w-full justify-start gap-3 rounded-xl font-bold text-red-400 hover:bg-red-900 hover:text-red-300 text-base py-3 transition-all duration-300"
          >
            <LogOut className="h-5 w-5" />
            Log Out
          </Button>
        </Link>
      </div>
    </div>
  )
}
