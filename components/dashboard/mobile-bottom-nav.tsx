"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Target, BookOpen, BarChart3, Users } from "lucide-react"

export default function MobileBottomNav() {
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Habits", href: "/dashboard/habits", icon: Target },
    { name: "Journal", href: "/dashboard/journal", icon: BookOpen },
    { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
    { name: "Community", href: "/dashboard/community", icon: Users },
  ]

  const isActive = (path: string) => pathname === path

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
      <div className="bg-white border-t-4 border-black">
        <div className="flex items-center justify-around py-2">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[64px] py-3 px-2 rounded-2xl transition-all duration-200 ${
                isActive(item.href)
                  ? "bg-red-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transform translate-y-[-2px]"
                  : "text-gray-600 hover:text-red-600 hover:bg-red-50 active:bg-red-100"
              }`}
            >
              <item.icon className={`h-6 w-6 mb-1 ${isActive(item.href) ? "text-white" : ""}`} />
              <span className={`text-xs font-bold ${isActive(item.href) ? "text-white" : ""}`}>{item.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
