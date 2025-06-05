"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, Target, BookOpen, BarChart3, Trophy, Star, Settings, LogOut, Zap } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Habits", href: "/dashboard/habits", icon: Target },
  { name: "Journal", href: "/dashboard/journal", icon: BookOpen },
  { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
  { name: "Achievements", href: "/dashboard/achievements", icon: Trophy },
  { name: "Leaderboard", href: "/dashboard/leaderboard", icon: Star },
  { name: "AI Studio", href: "/studio", icon: Zap },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
      <div className="flex flex-col flex-grow pt-5 bg-white border-r-4 border-black overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <div className="bg-green-500 p-2 rounded-xl border-2 border-black shadow-brutal">
              <Target className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-black text-black">GRYT</span>
          </Link>
        </div>

        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-2 pb-4 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link key={item.name} href={item.href}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    className={`w-full justify-start gap-3 rounded-xl border-2 font-bold min-h-[44px] transition-all ${
                      isActive
                        ? "bg-green-500 hover:bg-green-600 text-white border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                        : "border-transparent hover:border-black hover:bg-green-50 text-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
                    }`}
                  >
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Button>
                </Link>
              )
            })}
          </nav>

          <div className="px-2 space-y-2">
            <Link href="/dashboard/settings">
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-xl border-2 border-transparent hover:border-black hover:bg-green-50 text-black font-bold min-h-[44px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
              >
                <Settings className="h-5 w-5" />
                Settings
              </Button>
            </Link>
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 rounded-xl border-2 border-transparent hover:border-black hover:bg-green-50 text-black font-bold min-h-[44px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
            >
              <LogOut className="h-5 w-5" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
