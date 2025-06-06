"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

export interface SidebarNavItem {
  name: string
  href: string
  icon: ReactNode
}

interface SidebarNavProps {
  items: SidebarNavItem[]
}

export function SidebarNav({ items }: SidebarNavProps) {
  const pathname = usePathname()

  return (
    <nav className="space-y-1">
      {items.map((item) => {
        const isActive = pathname === item.href
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex items-center space-x-3 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200 border-2 border-transparent",
              isActive
                ? "bg-gryt-green text-white border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1),6px_6px_0px_0px_rgba(0,0,0,1)]"
                : "text-gray-700 hover:bg-gray-100 hover:text-gray-900 hover:border-black hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]",
            )}
          >
            {item.icon}
            <span className="font-semibold">{item.name}</span>
          </Link>
        )
      })}
    </nav>
  )
}
