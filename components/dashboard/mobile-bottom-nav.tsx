"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Target, BookOpen, Trophy, Star } from "lucide-react"

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Habits", href: "/dashboard/habits", icon: Target },
  { name: "Journal", href: "/dashboard/journal", icon: BookOpen },
  { name: "Achievements", href: "/dashboard/achievements", icon: Trophy },
  { name: "Leaderboard", href: "/dashboard/leaderboard", icon: Star },
]

export default function MobileBottomNav() {
  const pathname = usePathname()

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black z-50">
      <nav className="flex justify-around items-center py-2 px-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[60px] py-2 px-1 rounded-xl transition-all ${
                isActive
                  ? "bg-gryt-green text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
                  : "text-gray-600 hover:bg-green-50 hover:text-black"
              }`}
            >
              <item.icon className="h-5 w-5 mb-1" />
              <span className="text-xs font-bold">{item.name}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
