"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import { LayoutDashboard, Target, BookOpen, BarChart3, User } from "lucide-react"

export default function MobileBottomNav() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/dashboard",
      icon: LayoutDashboard,
      label: "Dashboard",
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/habits",
      icon: Target,
      label: "Habits",
      active: pathname.startsWith("/dashboard/habits"),
    },
    {
      href: "/dashboard/journal",
      icon: BookOpen,
      label: "Journal",
      active: pathname.startsWith("/dashboard/journal"),
    },
    {
      href: "/dashboard/analytics",
      icon: BarChart3,
      label: "Analytics",
      active: pathname.startsWith("/dashboard/analytics"),
    },
    {
      href: "/dashboard/profile",
      icon: User,
      label: "Profile",
      active: pathname.startsWith("/dashboard/profile"),
    },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t-4 border-black shadow-[0_-4px_0px_0px_rgba(0,0,0,1)] z-50">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 p-2 rounded-xl transition-all duration-200 min-w-[60px] ${
                item.active
                  ? "bg-green-500 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <Icon className="h-5 w-5" />
              <span className="text-xs font-bold">{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
